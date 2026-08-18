import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Gasto individual — actualizar (PATCH) y eliminar (DELETE).
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
    await prisma.expense.update({
      where: { id },
      data: {
        date: b.date != null ? String(b.date).slice(0, 20) : undefined,
        vendor: b.vendor != null ? String(b.vendor).slice(0, 160) : undefined,
        category: b.category != null ? String(b.category).slice(0, 80) : undefined,
        concept: b.concept != null ? String(b.concept).slice(0, 200) : undefined,
        value: b.value != null && Number.isFinite(b.value) ? Number(b.value) : undefined,
        paymentMethod: b.paymentMethod != null ? String(b.paymentMethod).slice(0, 40) : undefined,
        status: b.status != null ? String(b.status).slice(0, 40) : undefined,
        receiptRef: b.receiptRef != null ? String(b.receiptRef).slice(0, 200) : undefined,
        recurrent: b.recurrent != null ? !!b.recurrent : undefined,
        notes: b.notes != null ? String(b.notes).slice(0, 2000) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("expenses:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.expense.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("expenses:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
