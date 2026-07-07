import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Convierte un prospecto del mapa (OpenStreetMap) en un Lead del CRM.
 * Protegido: requiere la cookie de sesión del Command Center.
 *
 * Honestidad de datos: los prospectos de OSM no traen email; se guarda
 * un placeholder interno inequívoco (@prospecto.interno) que ningún
 * flujo de email puede confundir con una dirección real.
 */
export async function POST(req: NextRequest) {
  const auth = req.cookies.get("aureon_auth");
  if (!auth?.value) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ ok: false, error: "Falta el nombre del prospecto" }, { status: 400 });
  }

  const name: string = body.name.trim().slice(0, 120);
  const category: string = (body.category || "Negocio").toString().slice(0, 60);
  const zone: string = (body.zone || "Bogotá").toString().slice(0, 60);
  const phone: string = (body.phone || "").toString().slice(0, 40);
  const website: string = (body.website || "").toString().slice(0, 200);
  const address: string = (body.address || "").toString().slice(0, 160);
  const notes: string = (body.notes || "").toString().slice(0, 500);

  const message = [
    `Prospecto captado desde el mapa de Prospección (fuente: OpenStreetMap).`,
    `Categoría: ${category}`,
    `Zona: ${zone}`,
    address && `Dirección: ${address}`,
    website && `Sitio web: ${website}`,
    notes && `Notas: ${notes}`,
    `Pendiente: verificar datos y registrar canal de primer contacto.`,
  ].filter(Boolean).join("\n");

  try {
    // Evitar duplicados obvios (mismo nombre + misma fuente)
    const existing = await prisma.lead.findFirst({
      where: { name, source: "Prospección mapa" },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json({ ok: true, id: existing.id, duplicated: true });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email: "sin-email@prospecto.interno", // placeholder inequívoco — OSM no provee email
        phone: phone || "Sin teléfono registrado",
        company: name,
        service: `Prospección — ${category}`,
        message,
        source: "Prospección mapa",
        status: "new",
      },
    });
    return NextResponse.json({ ok: true, id: lead.id, duplicated: false });
  } catch (e) {
    console.error("prospeccion/lead:", e);
    return NextResponse.json({ ok: false, error: "No se pudo guardar el lead" }, { status: 500 });
  }
}
