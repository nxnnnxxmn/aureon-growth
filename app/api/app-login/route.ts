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
  const expectedPwd = expected();
  if (!expectedPwd) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD no está configurado en este entorno." },
      { status: 500 }
    );
  }
  if (!safeEqual(body.password, expectedPwd)) {
    return NextResponse.json({ ok: false, error: "Contraseña incorrecta" }, { status: 401 });
  }

  const token = createHash("sha256").update(`${expectedPwd}|${Date.now()}`).digest("hex");
  const res = NextResponse.json({ ok: true });
  res.cookies.set("aureon_auth", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h session
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("aureon_auth", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  return res;
}
