import { Resend } from "resend";
import type { ContactFormData } from "./validation";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Accept both CONTACT_* (current convention) and EMAIL_* (legacy) for backwards compat
const FROM =
  process.env.CONTACT_FROM_EMAIL ||
  process.env.EMAIL_FROM ||
  "Aureon Growth Services <onboarding@resend.dev>";
const TO =
  process.env.CONTACT_TO_EMAIL ||
  process.env.EMAIL_TO ||
  "aureongrowthservices@outlook.com";

if (!apiKey && process.env.NODE_ENV !== "production") {
  console.warn(
    "[email] RESEND_API_KEY is not set — emails will be skipped. " +
      "Get a free key at https://resend.com and set it in .env"
  );
}

interface SendResult {
  ok: boolean;
  skipped?: boolean;
  error?: string;
}

const BRAND_PURPLE = "#8054c2";
const BRAND_DARK = "#08070d";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function internalLeadTemplate(data: ContactFormData): string {
  const rows = [
    ["Nombre", data.name],
    ["Correo", data.email],
    ["Teléfono", data.phone],
    ["Empresa / Marca", data.company || "—"],
    ["Servicio de interés", data.service],
    ["Presupuesto", data.budget || "—"],
    ["Fuente", data.source || "—"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #1e1934;color:#a89cc7;font-size:13px;width:38%;font-weight:500;">${escapeHtml(label)}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #1e1934;color:#ece7f5;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Nuevo lead — Aureon Growth Services</title>
</head>
<body style="margin:0;background:${BRAND_DARK};font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="background:linear-gradient(180deg,#13101e 0%,#0e0c17 100%);border:1px solid rgba(128,84,194,0.18);border-radius:18px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.4);">
      <div style="background:linear-gradient(135deg,${BRAND_PURPLE} 0%,#3d1d72 100%);padding:24px 28px;">
        <div style="display:inline-block;background:rgba(255,255,255,0.18);color:#fff;padding:4px 10px;border-radius:8px;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">⚡ Nuevo Lead</div>
        <h1 style="margin:12px 0 0;color:#ffffff;font-size:22px;font-weight:700;">Acaba de llegar una solicitud</h1>
      </div>
      <div style="padding:28px;">
        <p style="color:#cdb6ec;font-size:14px;margin:0 0 18px;line-height:1.6;">
          Un prospecto envió el formulario de contacto en aureon-growth.vercel.app.
          Responder en menos de <strong style="color:#fff;">2 horas</strong> aumenta la conversión hasta 7×.
        </p>
        <table style="width:100%;border-collapse:collapse;background:rgba(128,84,194,0.04);border:1px solid rgba(128,84,194,0.15);border-radius:12px;overflow:hidden;">
          ${rowsHtml}
        </table>
        <div style="margin-top:24px;padding:16px 18px;background:rgba(128,84,194,0.06);border-left:3px solid ${BRAND_PURPLE};border-radius:8px;">
          <div style="color:#a89cc7;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">Mensaje del cliente</div>
          <div style="color:#ece7f5;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
        </div>
        <div style="margin-top:24px;display:flex;gap:8px;">
          <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:linear-gradient(135deg,${BRAND_PURPLE} 0%,#522a8f 100%);color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:600;">Responder ahora →</a>
          <a href="https://wa.me/57${escapeHtml(data.phone.replace(/\D/g, ""))}" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:600;">WhatsApp</a>
        </div>
      </div>
      <div style="padding:16px 28px;background:rgba(0,0,0,0.3);text-align:center;color:#776a93;font-size:11px;">
        Aureon Growth Services · Lead capturado ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}
      </div>
    </div>
  </div>
</body>
</html>`;
}

function clientReplyTemplate(name: string): string {
  const firstName = name.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Recibimos tu solicitud — Aureon Growth Services</title>
</head>
<body style="margin:0;background:${BRAND_DARK};font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="background:linear-gradient(180deg,#13101e 0%,#0e0c17 100%);border:1px solid rgba(128,84,194,0.18);border-radius:18px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.4);">

      <div style="background:linear-gradient(135deg,${BRAND_PURPLE} 0%,#3d1d72 100%);padding:32px 28px;text-align:center;">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.18);padding:6px 14px;border-radius:999px;color:#fff;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:18px;">
          ⚡ AUREON GROWTH
        </div>
        <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;line-height:1.2;">
          ${escapeHtml(firstName)}, recibimos tu solicitud ✨
        </h1>
        <p style="margin:12px 0 0;color:#e2d3f4;font-size:15px;line-height:1.5;">
          Gracias por confiar en nosotros para acelerar el crecimiento de tu marca.
        </p>
      </div>

      <div style="padding:32px 28px;">
        <p style="color:#cdb6ec;font-size:15px;line-height:1.7;margin:0 0 18px;">
          Hola <strong style="color:#fff;">${escapeHtml(firstName)}</strong>,
        </p>
        <p style="color:#cdb6ec;font-size:15px;line-height:1.7;margin:0 0 18px;">
          Tu solicitud ya fue recibida por nuestro equipo de estrategia. En las próximas
          <strong style="color:#fff;">24 horas hábiles</strong> uno de nuestros consultores senior
          revisará tu caso a profundidad y te contactará con:
        </p>
        <ul style="color:#cdb6ec;font-size:14px;line-height:1.8;padding-left:0;list-style:none;margin:0 0 24px;">
          <li style="padding:8px 0 8px 28px;position:relative;">
            <span style="position:absolute;left:0;top:10px;width:18px;height:18px;border-radius:6px;background:${BRAND_PURPLE};color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:18px;">✓</span>
            Un diagnóstico inicial sin costo de tu situación digital
          </li>
          <li style="padding:8px 0 8px 28px;position:relative;">
            <span style="position:absolute;left:0;top:10px;width:18px;height:18px;border-radius:6px;background:${BRAND_PURPLE};color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:18px;">✓</span>
            Las 3 oportunidades clave que detectamos en tu marca
          </li>
          <li style="padding:8px 0 8px 28px;position:relative;">
            <span style="position:absolute;left:0;top:10px;width:18px;height:18px;border-radius:6px;background:${BRAND_PURPLE};color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:18px;">✓</span>
            Una propuesta estratégica personalizada
          </li>
        </ul>

        <div style="background:rgba(128,84,194,0.08);border:1px solid rgba(128,84,194,0.2);border-radius:14px;padding:20px 22px;margin-bottom:24px;">
          <div style="color:#fff;font-size:14px;font-weight:600;margin-bottom:8px;">
            ¿Necesitas algo urgente?
          </div>
          <p style="color:#cdb6ec;font-size:13px;line-height:1.6;margin:0 0 12px;">
            Si tu proyecto tiene un timing crítico, escríbenos directamente por WhatsApp y
            agendamos una llamada hoy mismo.
          </p>
          <a href="https://wa.me/573212396665?text=Hola%2C%20env%C3%AD%C3%A9%20el%20formulario%20y%20quiero%20agendar%20una%20llamada%20pronto." style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:600;">
            💬 Escribir por WhatsApp
          </a>
        </div>

        <p style="color:#cdb6ec;font-size:14px;line-height:1.7;margin:0 0 6px;">
          Bienvenido a la familia.
        </p>
        <p style="color:#fff;font-size:14px;line-height:1.7;font-weight:600;margin:0;">
          El equipo de Aureon Growth Services
        </p>
      </div>

      <div style="padding:18px 28px;background:rgba(0,0,0,0.3);border-top:1px solid rgba(128,84,194,0.1);text-align:center;">
        <p style="margin:0 0 6px;color:#776a93;font-size:11px;">
          Aureon Growth Services · Estrategia, tecnología y performance
        </p>
        <p style="margin:0;color:#776a93;font-size:11px;">
          aureongrowthservices@outlook.com · +57 321 239 6665
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function sendInternalLead(data: ContactFormData): Promise<SendResult> {
  if (!resend) return { ok: false, skipped: true, error: "RESEND_API_KEY no configurada" };
  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject: `🚀 Nuevo lead: ${data.name} — ${data.service}`,
      html: internalLeadTemplate(data),
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Error desconocido" };
  }
}

export async function sendClientReply(data: ContactFormData): Promise<SendResult> {
  if (!resend) return { ok: false, skipped: true, error: "RESEND_API_KEY no configurada" };
  try {
    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: `✨ ${data.name.split(" ")[0]}, recibimos tu solicitud — Aureon Growth Services`,
      html: clientReplyTemplate(data.name),
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Error desconocido" };
  }
}
