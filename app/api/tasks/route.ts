import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Tareas — persistencia server-side (Prisma).
 * Protegido por la cookie de sesión del Command Center.
 * GET   → lista (con flag `persistent` para que el cliente sepa el modo)
 * POST  → crea una tarea
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

type TaskRow = {
  id: string; title: string; description: string | null; projectId: string | null;
  clientId: string | null; service: string | null; owner: string; dueDate: string;
  priority: string; status: string; tags: string; subtasks: string;
};

function serialize(t: TaskRow) {
  return {
    id: t.id, title: t.title, description: t.description || "", projectId: t.projectId || undefined,
    clientId: t.clientId || undefined, service: t.service || undefined, owner: t.owner, dueDate: t.dueDate,
    priority: t.priority, status: t.status,
    tags: safeJson<string[]>(t.tags, []),
    subtasks: safeJson<{ title: string; done: boolean }[]>(t.subtasks, []),
  };
}
function safeJson<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) {
    return NextResponse.json({ ok: true, persistent: false, tasks: [] });
  }
  try {
    const rows = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, tasks: rows.map(serialize) });
  } catch (e) {
    console.error("tasks:GET", e);
    return NextResponse.json({ ok: false, persistent: false, tasks: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, persistent: false, error: "DB no persistente" }, { status: 503 });
  const b = await req.json().catch(() => null);
  if (!b || typeof b.title !== "string" || !b.title.trim()) {
    return NextResponse.json({ ok: false, error: "Falta el título" }, { status: 400 });
  }
  try {
    const row = await prisma.task.create({
      data: {
        title: String(b.title).slice(0, 200),
        description: b.description ? String(b.description).slice(0, 2000) : null,
        projectId: b.projectId ? String(b.projectId) : null,
        clientId: b.clientId ? String(b.clientId) : null,
        service: b.service ? String(b.service).slice(0, 120) : null,
        owner: b.owner ? String(b.owner).slice(0, 120) : "",
        dueDate: b.dueDate ? String(b.dueDate).slice(0, 20) : "",
        priority: b.priority ? String(b.priority).slice(0, 20) : "medium",
        status: b.status ? String(b.status).slice(0, 40) : "Pendiente",
        tags: JSON.stringify(Array.isArray(b.tags) ? b.tags.slice(0, 30) : []),
        subtasks: JSON.stringify(Array.isArray(b.subtasks) ? b.subtasks.slice(0, 100) : []),
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, task: serialize(row) });
  } catch (e) {
    console.error("tasks:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
