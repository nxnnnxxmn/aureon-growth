import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Broadcasts — campañas Meta Ads y difusiones WhatsApp por plantilla.
 * Mismo patrón que Contactos/Deals/Conversations.
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

const KINDS = new Set(["whatsapp", "meta-ads"]);
const STATUSES = new Set(["Borrador", "Activo", "Cerrado"]);

function serialize(row: {
  id: string; name: string; kind: string; audienceTag: string;
  templateId: string | null; objective: string | null; budget: string | null;
  status: string; sent: string; country: string; createdAt: Date;
}) {
  let sent: string[] = [];
  try { sent = JSON.parse(row.sent); } catch { /* empty */ }
  return {
    id: row.id, name: row.name, kind: row.kind, audienceTag: row.audienceTag,
    templateId: row.templateId || undefined, objective: row.objective || undefined,
    budget: row.budget || undefined, status: row.status, sent, country: row.country,
    createdAt: row.createdAt.getTime(),
  };
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: true, persistent: false, broadcasts: [] });
  try {
    const rows = await prisma.broadcast.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, broadcasts: rows.map(serialize) });
  } catch (e) {
    console.error("broadcasts:GET", e);
    return NextResponse.json({ ok: false, persistent: false, broadcasts: [] }, { status: 500 });
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
    const row = await prisma.broadcast.create({
      data: {
        name: String(b.name).slice(0, 160),
        kind: KINDS.has(String(b.kind)) ? String(b.kind) : "whatsapp",
        audienceTag: b.audienceTag ? String(b.audienceTag).slice(0, 80) : "",
        templateId: b.templateId ? String(b.templateId).slice(0, 80) : null,
        objective: b.objective ? String(b.objective).slice(0, 200) : null,
        budget: b.budget ? String(b.budget).slice(0, 80) : null,
        status: "Borrador",
        sent: "[]",
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, broadcast: serialize(row) });
  } catch (e) {
    console.error("broadcasts:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
