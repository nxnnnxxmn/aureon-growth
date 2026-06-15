// WhatsApp configuration — central place to manage the agency phone + messages

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573212396665";

export const WHATSAPP_PRETTY = "+57 321 239 6665";

export const WA_MESSAGES = {
  default:
    "Hola, quiero solicitar un diagnóstico estratégico para mi empresa. Me interesa revisar cómo mejorar adquisición, conversión, CRM y automatización comercial.",
  consultation:
    "Hola, me interesa agendar un diagnóstico estratégico con Aureon Growth Services.",
  audit:
    "Hola, quiero solicitar un diagnóstico inicial de mi sistema de crecimiento.",
  pricing:
    "Hola, me gustaría conocer las formas de trabajo de Aureon Growth Services.",
  urgent:
    "Hola, tengo un proyecto con timing crítico y quiero hablar con un especialista.",
} as const;

export function waLink(messageKey: keyof typeof WA_MESSAGES = "default"): string {
  const msg = encodeURIComponent(WA_MESSAGES[messageKey]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function waLinkCustom(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
