import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Clientes — persistencia server-side (Prisma).
 * Protegido por la cookie de sesión del Command Center.
 * GET   → lista (con flag `persistent` para que el cliente sepa el modo)
 * POST  → crea un cliente
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

type ClientRow = {
  id: string; company: string; contact: string; email: string | null; phone: string | null;
  services: string; status: string; startDate: string; monthlyValue: number;
  projects: string; pendingInvoices: number; notes: string | null; country: string;
};

function serialize(c: ClientRow) {
  return {
    id: c.id, company: c.company, contact: c.contact, email: c.email || "", phone: c.phone || "",
    services: safeJson<string[]>(c.services, []), status: c.status, startDate: c.startDate,
    monthlyValue: c.monthlyValue, projects: safeJson<string[]>(c.projects, []),
    pendingInvoices: c.pendingInvoices, notes: c.notes || "", country: c.country,
  };
}
function safeJson<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) {
    // Producción sin Postgres: el cliente usa localStorage. No mentimos con datos efímeros.
    return NextResponse.json({ ok: true, persistent: false, clients: [] });
  }
  try {
    const rows = await prisma.client.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, clients: rows.map(serialize) });
  } catch (e) {
    console.error("clients:GET", e);
    return NextResponse.json({ ok: false, persistent: false, clients: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, persistent: false, error: "DB no persistente" }, { status: 503 });
  const b = await req.json().catch(() => null);
  if (!b || typeof b.company !== "string" || !b.company.trim()) {
    return NextResponse.json({ ok: false, error: "Falta la empresa" }, { status: 400 });
  }
  try {
    const row = await prisma.client.create({
      data: {
        company: String(b.company).slice(0, 160),
        contact: b.contact ? String(b.contact).slice(0, 160) : "",
        email: b.email ? String(b.email).slice(0, 160) : null,
        phone: b.phone ? String(b.phone).slice(0, 40) : null,
        services: JSON.stringify(Array.isArray(b.services) ? b.services.slice(0, 30) : []),
        status: b.status ? String(b.status).slice(0, 40) : "Potencial",
        startDate: b.startDate ? String(b.startDate).slice(0, 20) : "",
        monthlyValue: Number.isFinite(b.monthlyValue) ? Number(b.monthlyValue) : 0,
        projects: JSON.stringify(Array.isArray(b.projects) ? b.projects.slice(0, 200) : []),
        pendingInvoices: Number.isFinite(b.pendingInvoices) ? Number(b.pendingInvoices) : 0,
        notes: b.notes ? String(b.notes).slice(0, 2000) : null,
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, client: serialize(row) });
  } catch (e) {
    console.error("clients:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
