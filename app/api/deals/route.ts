import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Deals — persistencia server-side (Prisma). Mismo patrón que Contactos:
 * protegido por cookie de sesión, con flag `persistent` para que el cliente
 * decida modo DB o fallback a localStorage.
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

const ALLOWED_CURRENCY = new Set(["COP", "USD", "EUR", "MXN"]);

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: true, persistent: false, deals: [] });
  try {
    const rows = await prisma.deal.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, deals: rows.map((d) => ({
      id: d.id, name: d.name, contact: d.contact, value: d.value, currency: d.currency,
      stage: d.stage, notes: d.notes || "", country: d.country, createdAt: d.createdAt.getTime(),
    })) });
  } catch (e) {
    console.error("deals:GET", e);
    return NextResponse.json({ ok: false, persistent: false, deals: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, persistent: false, error: "DB no persistente" }, { status: 503 });
  const b = await req.json().catch(() => null);
  if (!b || typeof b.name !== "string" || !b.name.trim()) {
    return NextResponse.json({ ok: false, error: "Falta el nombre" }, { status: 400 });
  }
  try {
    const row = await prisma.deal.create({
      data: {
        name: String(b.name).slice(0, 160),
        contact: b.contact ? String(b.contact).slice(0, 160) : "",
        value: Number.isFinite(Number(b.value)) ? Number(b.value) : 0,
        currency: ALLOWED_CURRENCY.has(String(b.currency)) ? String(b.currency) : "COP",
        stage: b.stage ? String(b.stage).slice(0, 60) : "Nuevo",
        notes: b.notes ? String(b.notes).slice(0, 2000) : null,
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, deal: {
      id: row.id, name: row.name, contact: row.contact, value: row.value, currency: row.currency,
      stage: row.stage, notes: row.notes || "", country: row.country, createdAt: row.createdAt.getTime(),
    } });
  } catch (e) {
    console.error("deals:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
