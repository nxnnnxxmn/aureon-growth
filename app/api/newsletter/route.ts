import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email("Correo inválido").max(180).toLowerCase().trim(),
  // Honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

// Lightweight in-memory rate limit (5/min/IP). Replace with Upstash for prod.
const hits = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string) {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || e.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (e.count >= 5) return false;
  e.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Demasiados intentos. Intenta en un minuto." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Cuerpo inválido" }, { status: 400 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Datos inválidos",
        },
        { status: 422 }
      );
    }

    const { email, website } = parsed.data;

    // Honeypot — silent success for bots
    if (website && website.length > 0) {
      return NextResponse.json({ ok: true, message: "Suscripción confirmada." });
    }

    // Upsert: if exists, mark active; if not, create
    const existing = await prisma.subscriber.findUnique({ where: { email } });

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          {
            ok: false,
            error: "Este correo ya está suscrito a nuestro newsletter.",
            duplicate: true,
          },
          { status: 409 }
        );
      }
      await prisma.subscriber.update({
        where: { email },
        data: { active: true },
      });
      return NextResponse.json({
        ok: true,
        message: "¡Suscripción reactivada! Bienvenido de vuelta.",
      });
    }

    await prisma.subscriber.create({ data: { email } });
    return NextResponse.json({
      ok: true,
      message: "¡Listo! Revisa tu correo para recibir contenido exclusivo.",
    });
  } catch (err) {
    console.error("[newsletter] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "POST { email } to subscribe." });
}
