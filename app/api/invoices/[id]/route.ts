import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Factura individual — actualizar (PATCH) y eliminar (DELETE).
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
    await prisma.invoice.update({
      where: { id },
      data: {
        number: b.number != null ? String(b.number).slice(0, 60) : undefined,
        clientId: b.clientId != null ? String(b.clientId) : undefined,
        concept: b.concept != null ? String(b.concept).slice(0, 200) : undefined,
        issueDate: b.issueDate != null ? String(b.issueDate).slice(0, 20) : undefined,
        dueDate: b.dueDate != null ? String(b.dueDate).slice(0, 20) : undefined,
        subtotal: b.subtotal != null && Number.isFinite(b.subtotal) ? Number(b.subtotal) : undefined,
        taxes: b.taxes != null && Number.isFinite(b.taxes) ? Number(b.taxes) : undefined,
        total: b.total != null && Number.isFinite(b.total) ? Number(b.total) : undefined,
        status: b.status != null ? String(b.status).slice(0, 40) : undefined,
        paymentMethod: b.paymentMethod != null ? String(b.paymentMethod).slice(0, 40) : undefined,
        receiptRef: b.receiptRef != null ? String(b.receiptRef).slice(0, 200) : undefined,
        notes: b.notes != null ? String(b.notes).slice(0, 2000) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("invoices:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.invoice.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("invoices:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
