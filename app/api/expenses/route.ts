import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Gastos — persistencia server-side (Prisma).
 * Protegido por la cookie de sesión del Command Center.
 * GET   → lista (con flag `persistent` para que el cliente sepa el modo)
 * POST  → crea un gasto
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

type ExpenseRow = {
  id: string; date: string; vendor: string; category: string; concept: string;
  value: number; paymentMethod: string; status: string; receiptRef: string | null;
  recurrent: boolean; notes: string | null;
};

function serialize(e: ExpenseRow) {
  return {
    id: e.id, date: e.date, vendor: e.vendor, category: e.category, concept: e.concept,
    value: e.value, paymentMethod: e.paymentMethod, status: e.status,
    receiptRef: e.receiptRef || undefined, recurrent: e.recurrent, notes: e.notes || "",
  };
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) {
    return NextResponse.json({ ok: true, persistent: false, expenses: [] });
  }
  try {
    const rows = await prisma.expense.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, expenses: rows.map(serialize) });
  } catch (e) {
    console.error("expenses:GET", e);
    return NextResponse.json({ ok: false, persistent: false, expenses: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, persistent: false, error: "DB no persistente" }, { status: 503 });
  const b = await req.json().catch(() => null);
  if (!b || typeof b.vendor !== "string" || !b.vendor.trim()) {
    return NextResponse.json({ ok: false, error: "Falta el proveedor" }, { status: 400 });
  }
  try {
    const row = await prisma.expense.create({
      data: {
        date: b.date ? String(b.date).slice(0, 20) : "",
        vendor: String(b.vendor).slice(0, 160),
        category: b.category ? String(b.category).slice(0, 80) : "",
        concept: b.concept ? String(b.concept).slice(0, 200) : "",
        value: Number.isFinite(b.value) ? Number(b.value) : 0,
        paymentMethod: b.paymentMethod ? String(b.paymentMethod).slice(0, 40) : "",
        status: b.status ? String(b.status).slice(0, 40) : "Pendiente",
        receiptRef: b.receiptRef ? String(b.receiptRef).slice(0, 200) : null,
        recurrent: !!b.recurrent,
        notes: b.notes ? String(b.notes).slice(0, 2000) : null,
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, expense: serialize(row) });
  } catch (e) {
    console.error("expenses:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
