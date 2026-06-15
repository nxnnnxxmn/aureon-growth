import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";
import { sendInternalLead, sendClientReply } from "@/lib/email";

// Simple in-memory rate limit (per-IP, 3 req/min). For prod, swap to Upstash/Redis.
const ipHits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + 60_000 });
    return { ok: true, remaining: 2 };
  }
  if (entry.count >= 3) return { ok: false, remaining: 0 };
  entry.count += 1;
  return { ok: true, remaining: 3 - entry.count };
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rl = rateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Demasiados intentos. Intenta de nuevo en un minuto." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Cuerpo inválido" },
        { status: 400 }
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Datos inválidos",
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // Honeypot — silently succeed for bots
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ ok: true, message: "Solicitud recibida." });
    }

    // 1. Save to DB
    let leadId: string | null = null;
    try {
      const lead = await prisma.lead.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company || null,
          service: data.service,
          budget: data.budget || null,
          message: data.message,
          source: data.source || null,
        },
      });
      leadId = lead.id;
    } catch (dbErr) {
      console.error("[contact] DB error:", dbErr);
      // We continue — email is more important than the DB record
    }

    // 2. Send emails in parallel (best effort)
    const [internal, client] = await Promise.all([
      sendInternalLead(data),
      sendClientReply(data),
    ]);

    const emailStatus = {
      internal: internal.ok ? "sent" : internal.skipped ? "skipped" : "failed",
      client: client.ok ? "sent" : client.skipped ? "skipped" : "failed",
    };

    if (internal.skipped) {
      console.warn("[contact] Email skipped — RESEND_API_KEY not configured");
    }
    if (!internal.ok && !internal.skipped) {
      console.error("[contact] Internal email failed:", internal.error);
    }

    return NextResponse.json({
      ok: true,
      message: "Tu solicitud fue recibida. Te contactaremos pronto.",
      leadId,
      emailStatus,
    });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "POST your contact form here." });
}
