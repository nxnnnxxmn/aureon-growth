import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Pool de prospectos — POST hace upsert masivo por osmId (una búsqueda del
 * mapa devuelve N negocios; si ya estaban en el pool no se duplican).
 * GET devuelve el pool completo con el flag contactado.
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

function serialize(row: {
  id: string; osmId: string; name: string; category: string; categoryLabel: string;
  color: string; lat: number; lon: number; phone: string | null; website: string | null;
  email: string | null; street: string | null; zoneLabel: string; country: string;
  contacted: boolean; leadId: string | null; createdAt: Date;
}) {
  return {
    id: row.osmId, // el UI usa osmId como identificador estable
    dbId: row.id,
    name: row.name, category: row.category, categoryLabel: row.categoryLabel,
    color: row.color, lat: row.lat, lon: row.lon,
    phone: row.phone || undefined, website: row.website || undefined,
    email: row.email || undefined, street: row.street || undefined,
    zoneLabel: row.zoneLabel, country: row.country,
    contacted: row.contacted, leadId: row.leadId || undefined,
    addedAt: row.createdAt.getTime(),
  };
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: true, persistent: false, pool: [] });
  try {
    const rows = await prisma.poolItem.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, pool: rows.map(serialize) });
  } catch (e) {
    console.error("pool:GET", e);
    return NextResponse.json({ ok: false, persistent: false, pool: [] }, { status: 500 });
  }
}

type Incoming = {
  id: string;               // osmId (viene del cliente como id)
  name: string;
  category: string;
  categoryLabel: string;
  color?: string;
  lat: number; lon: number;
  phone?: string; website?: string; email?: string; street?: string;
  zoneLabel: string;
  country?: string;
};

/** Upsert por batch — el cliente manda TODOS los prospectos de la búsqueda. */
export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, persistent: false, error: "DB no persistente" }, { status: 503 });
  const b = await req.json().catch(() => null);
  if (!b || !Array.isArray(b.items)) {
    return NextResponse.json({ ok: false, error: "Falta items[]" }, { status: 400 });
  }
  const items: Incoming[] = b.items.slice(0, 500);
  let created = 0;
  let existed = 0;
  try {
    for (const it of items) {
      if (!it.id || !it.name || typeof it.lat !== "number" || typeof it.lon !== "number") continue;
      const osmId = String(it.id).slice(0, 80);
      // upsert: crea si no existe, no toca contacted/leadId si ya existe
      const before = await prisma.poolItem.findUnique({ where: { osmId }, select: { id: true } });
      if (before) { existed++; continue; }
      await prisma.poolItem.create({
        data: {
          osmId,
          name: String(it.name).slice(0, 200),
          category: String(it.category).slice(0, 40),
          categoryLabel: String(it.categoryLabel).slice(0, 60),
          color: it.color ? String(it.color).slice(0, 20) : "#D6B46A",
          lat: it.lat, lon: it.lon,
          phone: it.phone ? String(it.phone).slice(0, 40) : null,
          website: it.website ? String(it.website).slice(0, 300) : null,
          email: it.email ? String(it.email).slice(0, 160) : null,
          street: it.street ? String(it.street).slice(0, 200) : null,
          zoneLabel: String(it.zoneLabel).slice(0, 80),
          country: it.country ? String(it.country).slice(0, 4) : "CO",
        },
      });
      created++;
    }
    return NextResponse.json({ ok: true, created, existed, total: created + existed });
  } catch (e) {
    console.error("pool:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo guardar" }, { status: 500 });
  }
}
