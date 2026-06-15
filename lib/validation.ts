import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({ message: "El nombre es obligatorio" })
    .min(2, "Mínimo 2 caracteres")
    .max(80, "Máximo 80 caracteres"),
  email: z
    .string({ message: "El correo es obligatorio" })
    .email("Ingresa un correo válido")
    .max(120),
  phone: z
    .string({ message: "El teléfono es obligatorio" })
    .min(7, "Teléfono demasiado corto")
    .max(20, "Teléfono demasiado largo")
    .regex(/^[+0-9\s()-]+$/, "Solo números, espacios, paréntesis o guiones"),
  company: z
    .string()
    .max(120, "Máximo 120 caracteres")
    .optional()
    .or(z.literal("")),
  service: z
    .string({ message: "Selecciona un servicio" })
    .min(2, "Selecciona un servicio"),
  budget: z.string().optional().or(z.literal("")),
  message: z
    .string({ message: "El mensaje es obligatorio" })
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres)")
    .max(1000, "Máximo 1000 caracteres"),
  source: z.string().optional().or(z.literal("")),
  // Honeypot field — must remain empty
  website: z.string().max(0, "Spam detectado").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const SERVICE_OPTIONS = [
  "Branding Estratégico",
  "Performance Marketing",
  "Growth Marketing",
  "SEO & Posicionamiento",
  "Automatización & IA",
  "Diseño Web & UX/UI",
  "Funnels de Conversión",
  "Social Media & Contenido",
  "Estrategia Integral 360°",
  "No estoy seguro / Asesoría",
] as const;

export const BUDGET_OPTIONS = [
  "Menos de $2.000 USD/mes",
  "$2.000 - $5.000 USD/mes",
  "$5.000 - $10.000 USD/mes",
  "$10.000 - $25.000 USD/mes",
  "Más de $25.000 USD/mes",
  "Lo definimos en la consultoría",
] as const;

export const SOURCE_OPTIONS = [
  "Google",
  "Instagram",
  "LinkedIn",
  "Recomendación",
  "TikTok / YouTube",
  "Otro",
] as const;
