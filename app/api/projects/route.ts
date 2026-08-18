import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Proyectos — persistencia server-side (Prisma).
 * Protegido por la cookie de sesión del Command Center.
 * GET   → lista (con flag `persistent` para que el cliente sepa el modo)
 * POST  → crea un proyecto
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

type ProjectRow = {
  id: string; name: string; clientId: string; service: string; owner: string;
  startDate: string; dueDate: string; priority: string; progress: number;
  status: string; budget: number; deliverables: string;
};

function serialize(p: ProjectRow) {
  return {
    id: p.id, name: p.name, clientId: p.clientId, service: p.service, owner: p.owner,
    startDate: p.startDate, dueDate: p.dueDate, priority: p.priority, progress: p.progress,
    status: p.status, budget: p.budget,
    deliverables: safeJson<{ title: string; done: boolean }[]>(p.deliverables, []),
  };
}
function safeJson<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) {
    return NextResponse.json({ ok: true, persistent: false, projects: [] });
  }
  try {
    const rows = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, projects: rows.map(serialize) });
  } catch (e) {
    console.error("projects:GET", e);
    return NextResponse.json({ ok: false, persistent: false, projects: [] }, { status: 500 });
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
    const row = await prisma.project.create({
      data: {
        name: String(b.name).slice(0, 200),
        clientId: b.clientId ? String(b.clientId) : "",
        service: b.service ? String(b.service).slice(0, 120) : "",
        owner: b.owner ? String(b.owner).slice(0, 120) : "",
        startDate: b.startDate ? String(b.startDate).slice(0, 20) : "",
        dueDate: b.dueDate ? String(b.dueDate).slice(0, 20) : "",
        priority: b.priority ? String(b.priority).slice(0, 20) : "medium",
        progress: Number.isFinite(b.progress) ? Math.min(100, Math.max(0, Number(b.progress))) : 0,
        status: b.status ? String(b.status).slice(0, 40) : "Backlog",
        budget: Number.isFinite(b.budget) ? Number(b.budget) : 0,
        deliverables: JSON.stringify(Array.isArray(b.deliverables) ? b.deliverables.slice(0, 100) : []),
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, project: serialize(row) });
  } catch (e) {
    console.error("projects:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
