import { NextRequest, NextResponse } from "next/server";

/**
 * Webhook de WhatsApp Business Cloud API (Meta) — infraestructura real.
 *
 * GET  → handshake de verificación de Meta (hub.challenge). Funciona ya:
 *        configura WHATSAPP_VERIFY_TOKEN en Vercel y pega esta URL en
 *        Meta for Developers → WhatsApp → Configuration → Webhook.
 * POST → recepción de mensajes entrantes. Meta exige respuesta 200 rápida.
 *
 * PENDIENTE (requiere decisión de backend): persistir los mensajes
 * entrantes en base de datos para que el Inbox los muestre en vivo y
 * disparar la respuesta automática de agentes. Hoy se registran en logs
 * del servidor (visibles en Vercel → Functions) sin perder el handshake.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  const expected = process.env.WHATSAPP_VERIFY_TOKEN || "";
  if (mode === "subscribe" && expected && token === expected && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ ok: false, error: "Verificación inválida" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  try {
    const entry = body?.entry?.[0]?.changes?.[0]?.value;
    const msg = entry?.messages?.[0];
    if (msg) {
      // Log estructurado — visible en Vercel Functions hasta conectar la DB
      console.log("[whatsapp:webhook] mensaje entrante", {
        from: msg.from,
        type: msg.type,
        text: msg.text?.body?.slice(0, 200),
        timestamp: msg.timestamp,
      });
    }
  } catch (e) {
    console.error("[whatsapp:webhook] parse error", e);
  }
  // Meta reintenta si no recibe 200 rápido — siempre confirmar recepción
  return NextResponse.json({ ok: true });
}
