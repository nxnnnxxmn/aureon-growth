import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Password gate for Aureon Command Center.
 * Compare against ADMIN_PASSWORD env var (fallback dev password only when
 * NODE_ENV !== 'production'). Sets an HttpOnly cookie on success.
 */
const DEV_PASSWORD = "aureon-admin-2026";

function expected(): string {
  return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== "production" ? DEV_PASSWORD : "");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  try {
    return timingSafeEqual(ab, bb);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.password !== "string") {
    return NextResponse.json({ ok: false, error: "Falta contraseña" }, { status: 400 });
  }
  const ownerPwd = expected();
  if (!ownerPwd) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD no está configurado en este entorno." },
      { status: 500 }
    );
  }

  /* Dos niveles de acceso:
     - ADMIN_PASSWORD  → owner (CEO): acceso total
     - MEMBER_PASSWORD → member (empleados): sin secciones sensibles
     Un solo campo de contraseña; el rol se deduce de cuál coincide. */
  const memberPwd = process.env.MEMBER_PASSWORD || "";
  let role: "owner" | "member" | null = null;
  if (safeEqual(body.password, ownerPwd)) role = "owner";
  else if (memberPwd && safeEqual(body.password, memberPwd)) role = "member";

  if (!role) {
    return NextResponse.json({ ok: false, error: "Contraseña incorrecta" }, { status: 401 });
  }

  const token = createHash("sha256").update(`${ownerPwd}|${role}|${Date.now()}`).digest("hex");
  const res = NextResponse.json({ ok: true, role });
  const cookieBase = {
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h session
  };
  res.cookies.set("aureon_auth", token, { ...cookieBase, httpOnly: true });
  // Cookie de rol legible por el cliente para gating de UI (no es secreto)
  res.cookies.set("aureon_role", role, { ...cookieBase, httpOnly: false });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("aureon_auth", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  res.cookies.set("aureon_role", "", { sameSite: "lax", path: "/", maxAge: 0 });
  return res;
}
