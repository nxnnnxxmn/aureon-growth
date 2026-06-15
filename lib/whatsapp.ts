// WhatsApp configuration — central place to manage the agency phone + messages

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573212396665";

export const WHATSAPP_PRETTY = "+57 321 239 6665";

export const WA_MESSAGES = {
  default:
    "Hola, quiero recibir información sobre los servicios de marketing y crecimiento de Aureon Growth.",
  consultation:
    "Hola, me interesa agendar una consultoría estratégica gratuita con Aureon Growth.",
  audit:
    "Hola, quiero solicitar un diagnóstico digital gratuito para mi marca.",
  pricing:
    "Hola, me gustaría conocer los planes y precios de Aureon Growth.",
  urgent:
    "Hola, tengo un proyecto urgente y quiero hablar con un estratega ahora.",
} as const;

export function waLink(messageKey: keyof typeof WA_MESSAGES = "default"): string {
  const msg = encodeURIComponent(WA_MESSAGES[messageKey]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function waLinkCustom(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
