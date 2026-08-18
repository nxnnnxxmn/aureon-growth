import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPersistentDb } from "@/lib/db-mode";

/**
 * Contratos — persistencia server-side (Prisma).
 * Protegido por la cookie de sesión del Command Center.
 * GET   → lista (con flag `persistent` para que el cliente sepa el modo)
 * POST  → crea un contrato
 */
function authed(req: NextRequest) {
  return !!req.cookies.get("aureon_auth")?.value;
}

type ContractRow = {
  id: string; clientId: string; type: string; startDate: string; endDate: string | null;
  value: number; status: string; renewal: string | null; fileRef: string | null; notes: string | null;
};

function serialize(c: ContractRow) {
  return {
    id: c.id, clientId: c.clientId, type: c.type, startDate: c.startDate, endDate: c.endDate || undefined,
    value: c.value, status: c.status, renewal: c.renewal || undefined, fileRef: c.fileRef || undefined,
    notes: c.notes || "",
  };
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) {
    return NextResponse.json({ ok: true, persistent: false, contracts: [] });
  }
  try {
    const rows = await prisma.contract.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ ok: true, persistent: true, contracts: rows.map(serialize) });
  } catch (e) {
    console.error("contracts:GET", e);
    return NextResponse.json({ ok: false, persistent: false, contracts: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  if (!isPersistentDb()) return NextResponse.json({ ok: false, persistent: false, error: "DB no persistente" }, { status: 503 });
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ ok: false, error: "Cuerpo inválido" }, { status: 400 });
  try {
    const row = await prisma.contract.create({
      data: {
        clientId: b.clientId ? String(b.clientId) : "",
        type: b.type ? String(b.type).slice(0, 40) : "Retainer",
        startDate: b.startDate ? String(b.startDate).slice(0, 20) : "",
        endDate: b.endDate ? String(b.endDate).slice(0, 20) : null,
        value: Number.isFinite(b.value) ? Number(b.value) : 0,
        status: b.status ? String(b.status).slice(0, 40) : "Borrador",
        renewal: b.renewal ? String(b.renewal).slice(0, 40) : null,
        fileRef: b.fileRef ? String(b.fileRef).slice(0, 200) : null,
        notes: b.notes ? String(b.notes).slice(0, 2000) : null,
        country: b.country ? String(b.country).slice(0, 4) : "CO",
      },
    });
    return NextResponse.json({ ok: true, contract: serialize(row) });
  } catch (e) {
    console.error("contracts:POST", e);
    return NextResponse.json({ ok: false, error: "No se pudo crear" }, { status: 500 });
  }
}
