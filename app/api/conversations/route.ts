import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Conversaciones del Inbox omnicanal — mismo patrón que Contactos/Deals.
 * Mensajes viajan como JSON en la fila (portable + sin migración por campo).
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

const CHANNELS = new Set(["whatsapp", "instagram", "facebook", "email", "web"]);

type Msg = { id: string; dir: "in" | "out"; text: string; at: number };

function serialize(row: {
  id: string; name: string; channel: string; phone: string | null;
  handle: string | null; messages: string; unread: boolean; country: string;
}) {
  let messages: Msg[] = [];
  try { messages = JSON.parse(row.messages); } catch { /* empty */ }
  return {
    id: row.id, name: row.name, channel: row.channel,
    phone: row.phone || undefined, handle: row.handle || undefined,
    messages, unread: row.unread, country: row.country,
  };
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: true, persistent: false, conversations: [] });
  try {
    const rows = await prisma.conversation.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, conversations: rows.map(serialize) });
  } catch (e) {
    console.error("conversations:GET", e);
    return NextResponse.json({ ok: false, persistent: false, conversations: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, persistent: false, error: "DB no persistente" }, { status: 503 });
  const b = await req.json().catch(() => null);
  if (!b || typeof b.name !== "string" || !b.name.trim()) {
    return NextResponse.json({ ok: false, error: "Falta el nombre" }, { status: 400 });
  }
  const channel = CHANNELS.has(String(b.channel)) ? String(b.channel) : "whatsapp";
  const firstMsg = typeof b.firstMsg === "string" ? b.firstMsg.trim() : "";
  const initialMessages: Msg[] = firstMsg
    ? [{ id: Math.random().toString(36).slice(2, 10), dir: "in", text: firstMsg.slice(0, 4000), at: Date.now() }]
    : [];
  try {
    const row = await prisma.conversation.create({
      data: {
        name: String(b.name).slice(0, 160),
        channel,
        phone: b.phone ? String(b.phone).slice(0, 40) : null,
        handle: b.handle ? String(b.handle).slice(0, 120) : null,
        messages: JSON.stringify(initialMessages),
        unread: initialMessages.length > 0,
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, conversation: serialize(row) });
  } catch (e) {
    console.error("conversations:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
