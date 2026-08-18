import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Propuesta individual — actualizar (PATCH) y eliminar (DELETE).
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
    await prisma.proposal.update({
      where: { id },
      data: {
        clientId: b.clientId != null ? String(b.clientId) : undefined,
        service: b.service != null ? String(b.service).slice(0, 120) : undefined,
        value: b.value != null && Number.isFinite(b.value) ? Number(b.value) : undefined,
        status: b.status != null ? String(b.status).slice(0, 40) : undefined,
        sentDate: b.sentDate != null ? String(b.sentDate).slice(0, 20) : undefined,
        dueDate: b.dueDate != null ? String(b.dueDate).slice(0, 20) : undefined,
        owner: b.owner != null ? String(b.owner).slice(0, 120) : undefined,
        probability: b.probability != null && Number.isFinite(b.probability) ? Math.min(100, Math.max(0, Number(b.probability))) : undefined,
        notes: b.notes != null ? String(b.notes).slice(0, 2000) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("proposals:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.proposal.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("proposals:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
