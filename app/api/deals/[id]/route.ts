import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

const ALLOWED_CURRENCY = new Set(["COP", "USD", "EUR", "MXN"]);

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ ok: false, error: "Cuerpo inválido" }, { status: 400 });
  try {
    await prisma.deal.update({
      where: { id },
      data: {
        name: b.name != null ? String(b.name).slice(0, 160) : undefined,
        contact: b.contact != null ? String(b.contact).slice(0, 160) : undefined,
        value: b.value != null && Number.isFinite(Number(b.value)) ? Number(b.value) : undefined,
        currency: b.currency != null && ALLOWED_CURRENCY.has(String(b.currency)) ? String(b.currency) : undefined,
        stage: b.stage != null ? String(b.stage).slice(0, 60) : undefined,
        notes: b.notes != null ? String(b.notes).slice(0, 2000) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("deals:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.deal.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("deals:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
