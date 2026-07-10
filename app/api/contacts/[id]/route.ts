import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Contacto individual — actualizar (PATCH) y eliminar (DELETE).
 * Protegido por la cookie de sesión.
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ ok: false, error: "Cuerpo inválido" }, { status: 400 });
  try {
    await prisma.contact.update({
      where: { id },
      data: {
        name: b.name != null ? String(b.name).slice(0, 160) : undefined,
        company: b.company != null ? String(b.company).slice(0, 160) : undefined,
        phone: b.phone != null ? String(b.phone).slice(0, 40) : undefined,
        email: b.email != null ? String(b.email).slice(0, 160) : undefined,
        instagram: b.instagram != null ? String(b.instagram).slice(0, 80) : undefined,
        tags: b.tags != null ? JSON.stringify(b.tags) : undefined,
        fields: b.fields != null ? JSON.stringify(b.fields) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contacts:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.contact.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contacts:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
