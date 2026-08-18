import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Tarea individual — actualizar (PATCH) y eliminar (DELETE).
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
    await prisma.task.update({
      where: { id },
      data: {
        title: b.title != null ? String(b.title).slice(0, 200) : undefined,
        description: b.description != null ? String(b.description).slice(0, 2000) : undefined,
        projectId: b.projectId !== undefined ? (b.projectId ? String(b.projectId) : null) : undefined,
        clientId: b.clientId !== undefined ? (b.clientId ? String(b.clientId) : null) : undefined,
        service: b.service != null ? String(b.service).slice(0, 120) : undefined,
        owner: b.owner != null ? String(b.owner).slice(0, 120) : undefined,
        dueDate: b.dueDate != null ? String(b.dueDate).slice(0, 20) : undefined,
        priority: b.priority != null ? String(b.priority).slice(0, 20) : undefined,
        status: b.status != null ? String(b.status).slice(0, 40) : undefined,
        tags: b.tags != null ? JSON.stringify(b.tags) : undefined,
        subtasks: b.subtasks != null ? JSON.stringify(b.subtasks) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("tasks:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("tasks:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
