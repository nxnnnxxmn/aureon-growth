import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Cliente individual — actualizar (PATCH) y eliminar (DELETE).
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
    await prisma.client.update({
      where: { id },
      data: {
        company: b.company != null ? String(b.company).slice(0, 160) : undefined,
        contact: b.contact != null ? String(b.contact).slice(0, 160) : undefined,
        email: b.email != null ? String(b.email).slice(0, 160) : undefined,
        phone: b.phone != null ? String(b.phone).slice(0, 40) : undefined,
        services: b.services != null ? JSON.stringify(b.services) : undefined,
        status: b.status != null ? String(b.status).slice(0, 40) : undefined,
        startDate: b.startDate != null ? String(b.startDate).slice(0, 20) : undefined,
        monthlyValue: b.monthlyValue != null && Number.isFinite(b.monthlyValue) ? Number(b.monthlyValue) : undefined,
        projects: b.projects != null ? JSON.stringify(b.projects) : undefined,
        pendingInvoices: b.pendingInvoices != null && Number.isFinite(b.pendingInvoices) ? Number(b.pendingInvoices) : undefined,
        notes: b.notes != null ? String(b.notes).slice(0, 2000) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("clients:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.client.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("clients:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
