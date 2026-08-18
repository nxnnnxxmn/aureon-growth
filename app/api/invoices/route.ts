import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Facturación — persistencia server-side (Prisma).
 * Protegido por la cookie de sesión del Command Center.
 * GET   → lista (con flag `persistent` para que el cliente sepa el modo)
 * POST  → crea una factura
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

type InvoiceRow = {
  id: string; number: string; clientId: string; concept: string; issueDate: string;
  dueDate: string; subtotal: number; taxes: number; total: number; status: string;
  paymentMethod: string | null; receiptRef: string | null; notes: string | null;
};

function serialize(i: InvoiceRow) {
  return {
    id: i.id, number: i.number, clientId: i.clientId, concept: i.concept, issueDate: i.issueDate,
    dueDate: i.dueDate, subtotal: i.subtotal, taxes: i.taxes, total: i.total, status: i.status,
    paymentMethod: i.paymentMethod || undefined, receiptRef: i.receiptRef || undefined, notes: i.notes || "",
  };
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) {
    return NextResponse.json({ ok: true, persistent: false, invoices: [] });
  }
  try {
    const rows = await prisma.invoice.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, invoices: rows.map(serialize) });
  } catch (e) {
    console.error("invoices:GET", e);
    return NextResponse.json({ ok: false, persistent: false, invoices: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, persistent: false, error: "DB no persistente" }, { status: 503 });
  const b = await req.json().catch(() => null);
  if (!b || typeof b.concept !== "string" || !b.concept.trim()) {
    return NextResponse.json({ ok: false, error: "Falta el concepto" }, { status: 400 });
  }
  try {
    const row = await prisma.invoice.create({
      data: {
        number: b.number ? String(b.number).slice(0, 60) : "",
        clientId: b.clientId ? String(b.clientId) : "",
        concept: String(b.concept).slice(0, 200),
        issueDate: b.issueDate ? String(b.issueDate).slice(0, 20) : "",
        dueDate: b.dueDate ? String(b.dueDate).slice(0, 20) : "",
        subtotal: Number.isFinite(b.subtotal) ? Number(b.subtotal) : 0,
        taxes: Number.isFinite(b.taxes) ? Number(b.taxes) : 0,
        total: Number.isFinite(b.total) ? Number(b.total) : 0,
        status: b.status ? String(b.status).slice(0, 40) : "Borrador",
        paymentMethod: b.paymentMethod ? String(b.paymentMethod).slice(0, 40) : null,
        receiptRef: b.receiptRef ? String(b.receiptRef).slice(0, 200) : null,
        notes: b.notes ? String(b.notes).slice(0, 2000) : null,
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, invoice: serialize(row) });
  } catch (e) {
    console.error("invoices:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
