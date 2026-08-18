import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Contrato individual — actualizar (PATCH) y eliminar (DELETE).
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
    await prisma.contract.update({
      where: { id },
      data: {
        clientId: b.clientId != null ? String(b.clientId) : undefined,
        type: b.type != null ? String(b.type).slice(0, 40) : undefined,
        startDate: b.startDate != null ? String(b.startDate).slice(0, 20) : undefined,
        endDate: b.endDate != null ? String(b.endDate).slice(0, 20) : undefined,
        value: b.value != null && Number.isFinite(b.value) ? Number(b.value) : undefined,
        status: b.status != null ? String(b.status).slice(0, 40) : undefined,
        renewal: b.renewal != null ? String(b.renewal).slice(0, 40) : undefined,
        fileRef: b.fileRef != null ? String(b.fileRef).slice(0, 200) : undefined,
        notes: b.notes != null ? String(b.notes).slice(0, 2000) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contracts:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.contract.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contracts:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
