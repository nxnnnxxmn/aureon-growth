import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Contactos — persistencia server-side (Prisma).
 * Protegido por la cookie de sesión del Command Center.
 * GET   → lista (con flag `persistent` para que el cliente sepa el modo)
 * POST  → crea un contacto
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

type ContactRow = {
  id: string; name: string; company: string | null; phone: string | null;
  email: string | null; instagram: string | null; tags: string; fields: string;
  source: string; country: string;
};

function serialize(c: ContactRow) {
  return {
    id: c.id, name: c.name, company: c.company || "", phone: c.phone || "",
    email: c.email || "", instagram: c.instagram || "",
    tags: safeJson<string[]>(c.tags, []), fields: safeJson<Record<string, string>>(c.fields, {}),
    source: c.source, country: c.country,
  };
}
function safeJson<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) {
    // Producción sin Postgres: el cliente usa localStorage. No mentimos con datos efímeros.
    return NextResponse.json({ ok: true, persistent: false, contacts: [] });
  }
  try {
    const rows = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, contacts: rows.map(serialize) });
  } catch (e) {
    console.error("contacts:GET", e);
    return NextResponse.json({ ok: false, persistent: false, contacts: [] }, { status: 500 });
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
    const row = await prisma.contact.create({
      data: {
        name: String(b.name).slice(0, 160),
        company: b.company ? String(b.company).slice(0, 160) : null,
        phone: b.phone ? String(b.phone).slice(0, 40) : null,
        email: b.email ? String(b.email).slice(0, 160) : null,
        instagram: b.instagram ? String(b.instagram).slice(0, 80) : null,
        tags: JSON.stringify(Array.isArray(b.tags) ? b.tags.slice(0, 30) : []),
        fields: JSON.stringify(b.fields && typeof b.fields === "object" ? b.fields : {}),
        source: b.source ? String(b.source).slice(0, 80) : "Manual",
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, contact: serialize(row) });
  } catch (e) {
    console.error("contacts:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
