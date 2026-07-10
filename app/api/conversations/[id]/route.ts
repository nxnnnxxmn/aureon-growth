import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Conversación individual — PATCH para añadir mensaje o cambiar estado,
 * DELETE para eliminar. Mensajes se acumulan en la columna JSON.
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

type Msg = { id: string; dir: "in" | "out"; text: string; at: number };
const uid = () => Math.random().toString(36).slice(2, 10);

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ ok: false, error: "Cuerpo inválido" }, { status: 400 });
  try {
    const current = await prisma.conversation.findUnique({ where: { id } });
    if (!current) return NextResponse.json({ ok: false, error: "No existe" }, { status: 404 });

    let messages: Msg[] = [];
    try { messages = JSON.parse(current.messages); } catch { /* empty */ }

    // Añadir mensaje si viene en el body
    if (b.addMessage && typeof b.addMessage.text === "string" && b.addMessage.text.trim()) {
      const dir = b.addMessage.dir === "out" ? "out" : "in";
      messages.push({ id: uid(), dir, text: String(b.addMessage.text).slice(0, 4000), at: Date.now() });
    }

    await prisma.conversation.update({
      where: { id },
      data: {
        messages: JSON.stringify(messages),
        unread: b.unread != null ? Boolean(b.unread) : undefined,
        assignedTo: b.assignedTo != null ? String(b.assignedTo).slice(0, 120) : undefined,
        name: b.name != null ? String(b.name).slice(0, 160) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("conversations:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.conversation.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("conversations:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
