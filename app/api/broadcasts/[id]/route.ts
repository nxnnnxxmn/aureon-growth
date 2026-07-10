import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Broadcast individual — PATCH cambia estado y añade contacto al tracking
 * de enviados, DELETE elimina.
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

const STATUSES = new Set(["Borrador", "Activo", "Cerrado"]);

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ ok: false, error: "Cuerpo inválido" }, { status: 400 });
  try {
    const current = await prisma.broadcast.findUnique({ where: { id } });
    if (!current) return NextResponse.json({ ok: false, error: "No existe" }, { status: 404 });

    let sent: string[] = [];
    try { sent = JSON.parse(current.sent); } catch { /* empty */ }

    // Añadir contacto al tracking de enviados (idempotente)
    if (b.markSent && typeof b.markSent === "string") {
      const cid = String(b.markSent).slice(0, 80);
      if (cid && !sent.includes(cid)) sent.push(cid);
    }

    await prisma.broadcast.update({
      where: { id },
      data: {
        name: b.name != null ? String(b.name).slice(0, 160) : undefined,
        status: b.status != null && STATUSES.has(String(b.status)) ? String(b.status) : undefined,
        sent: b.markSent ? JSON.stringify(sent) : undefined,
        // Auto-marcar Activo al primer envío
        ...(b.markSent && current.status === "Borrador" ? { status: "Activo" } : {}),
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("broadcasts:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.broadcast.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("broadcasts:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
