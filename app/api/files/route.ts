import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Archivos — persistencia server-side (Prisma). SOLO METADATOS: no hay
 * Supabase Storage (u otro bucket) conectado, así que esto nunca almacena
 * los bytes reales del archivo — solo nombre/categoría/tamaño reportado.
 * Protegido por la cookie de sesión del Command Center.
 * GET   → lista (con flag `persistent` para que el cliente sepa el modo)
 * POST  → crea el registro de metadatos (NO sube el archivo)
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

type FileRow = {
  id: string; name: string; category: string; clientId: string | null;
  projectId: string | null; size: string; uploadedAt: string; owner: string;
};

function serialize(f: FileRow) {
  return {
    id: f.id, name: f.name, category: f.category, clientId: f.clientId || undefined,
    projectId: f.projectId || undefined, size: f.size, uploadedAt: f.uploadedAt, owner: f.owner,
  };
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) {
    return NextResponse.json({ ok: true, persistent: false, files: [] });
  }
  try {
    const rows = await prisma.fileRecord.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, files: rows.map(serialize) });
  } catch (e) {
    console.error("files:GET", e);
    return NextResponse.json({ ok: false, persistent: false, files: [] }, { status: 500 });
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
    const row = await prisma.fileRecord.create({
      data: {
        name: String(b.name).slice(0, 200),
        category: b.category ? String(b.category).slice(0, 60) : "Recurso interno",
        clientId: b.clientId ? String(b.clientId) : null,
        projectId: b.projectId ? String(b.projectId) : null,
        size: b.size ? String(b.size).slice(0, 40) : "",
        uploadedAt: b.uploadedAt ? String(b.uploadedAt).slice(0, 20) : "",
        owner: b.owner ? String(b.owner).slice(0, 120) : "",
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, file: serialize(row) });
  } catch (e) {
    console.error("files:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
