import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Proyecto individual — actualizar (PATCH) y eliminar (DELETE).
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
    await prisma.project.update({
      where: { id },
      data: {
        name: b.name != null ? String(b.name).slice(0, 200) : undefined,
        clientId: b.clientId != null ? String(b.clientId) : undefined,
        service: b.service != null ? String(b.service).slice(0, 120) : undefined,
        owner: b.owner != null ? String(b.owner).slice(0, 120) : undefined,
        startDate: b.startDate != null ? String(b.startDate).slice(0, 20) : undefined,
        dueDate: b.dueDate != null ? String(b.dueDate).slice(0, 20) : undefined,
        priority: b.priority != null ? String(b.priority).slice(0, 20) : undefined,
        progress: b.progress != null && Number.isFinite(b.progress) ? Math.min(100, Math.max(0, Number(b.progress))) : undefined,
        status: b.status != null ? String(b.status).slice(0, 40) : undefined,
        budget: b.budget != null && Number.isFinite(b.budget) ? Number(b.budget) : undefined,
        deliverables: b.deliverables != null ? JSON.stringify(b.deliverables) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("projects:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("projects:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
