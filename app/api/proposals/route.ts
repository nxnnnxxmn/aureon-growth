import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Propuestas — persistencia server-side (Prisma).
 * Protegido por la cookie de sesión del Command Center.
 * GET   → lista (con flag `persistent` para que el cliente sepa el modo)
 * POST  → crea una propuesta
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

type ProposalRow = {
  id: string; clientId: string; service: string; value: number; status: string;
  sentDate: string | null; dueDate: string | null; owner: string; probability: number; notes: string | null;
};

function serialize(p: ProposalRow) {
  return {
    id: p.id, clientId: p.clientId, service: p.service, value: p.value, status: p.status,
    sentDate: p.sentDate || undefined, dueDate: p.dueDate || undefined, owner: p.owner,
    probability: p.probability, notes: p.notes || "",
  };
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) {
    return NextResponse.json({ ok: true, persistent: false, proposals: [] });
  }
  try {
    const rows = await prisma.proposal.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, proposals: rows.map(serialize) });
  } catch (e) {
    console.error("proposals:GET", e);
    return NextResponse.json({ ok: false, persistent: false, proposals: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, persistent: false, error: "DB no persistente" }, { status: 503 });
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ ok: false, error: "Cuerpo inválido" }, { status: 400 });
  try {
    const row = await prisma.proposal.create({
      data: {
        clientId: b.clientId ? String(b.clientId) : "",
        service: b.service ? String(b.service).slice(0, 120) : "",
        value: Number.isFinite(b.value) ? Number(b.value) : 0,
        status: b.status ? String(b.status).slice(0, 40) : "Borrador",
        sentDate: b.sentDate ? String(b.sentDate).slice(0, 20) : null,
        dueDate: b.dueDate ? String(b.dueDate).slice(0, 20) : null,
        owner: b.owner ? String(b.owner).slice(0, 120) : "",
        probability: Number.isFinite(b.probability) ? Math.min(100, Math.max(0, Number(b.probability))) : 0,
        notes: b.notes ? String(b.notes).slice(0, 2000) : null,
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, proposal: serialize(row) });
  } catch (e) {
    console.error("proposals:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
