import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Archivo individual — actualizar metadatos (PATCH) y eliminar (DELETE).
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
    await prisma.fileRecord.update({
      where: { id },
      data: {
        name: b.name != null ? String(b.name).slice(0, 200) : undefined,
        category: b.category != null ? String(b.category).slice(0, 60) : undefined,
        clientId: b.clientId !== undefined ? (b.clientId ? String(b.clientId) : null) : undefined,
        projectId: b.projectId !== undefined ? (b.projectId ? String(b.projectId) : null) : undefined,
        size: b.size != null ? String(b.size).slice(0, 40) : undefined,
        uploadedAt: b.uploadedAt != null ? String(b.uploadedAt).slice(0, 20) : undefined,
        owner: b.owner != null ? String(b.owner).slice(0, 120) : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("files:PATCH", e);
    return NextResponse.json({ ok: false, error: "No se pudo actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, error: "DB no persistente" }, { status: 503 });
  const { id } = await params;
  try {
    await prisma.fileRecord.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("files:DELETE", e);
    return NextResponse.json({ ok: false, error: "No se pudo eliminar" }, { status: 500 });
  }
}
