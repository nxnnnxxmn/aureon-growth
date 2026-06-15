"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  PhoneOff,
  PenLine,
  MousePointer,
  Layers3,
  ArrowRight,
  Workflow,
} from "lucide-react";

const PALETTE = {
  bg: "#F5F1E8",
  bgAlt: "#EFE9DB",
  bgWhite: "#FBF8F1",
  text: "#1A1815",
  textMuted: "#6B655E",
  textSoft: "#9A938A",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  gold: "#C9A961",
  hairline: "rgba(26,24,21,0.10)",
};

const scenarios = [
  {
    icon: Sparkles,
    label: "Producto fuerte · Pipeline débil",
    problem:
      "Empresa con un producto sólido pero que recibe pocos leads o leads desalineados con su propuesta de valor.",
    intervention:
      "Posicionamiento, narrativa comercial y campañas de adquisición orientadas a buyer persona real.",
    system: "Brand Authority + Acquisition Engine",
    outcome:
      "Pipeline más calificado y conversaciones comerciales con mejor encaje.",
  },
  {
    icon: PhoneOff,
    label: "Campañas activas · Sin CRM",
    problem:
      "Marca con inversión publicitaria activa pero sin CRM ni proceso comercial estructurado para los leads que entran.",
    intervention:
      "Implementación de CRM, automatización de seguimiento por WhatsApp y email, y lead scoring básico.",
    system: "Revenue Automation + Growth Intelligence",
    outcome:
      "Menos leads perdidos y mejor visibilidad sobre la conversión real por canal.",
  },
  {
    icon: PenLine,
    label: "Mucho contenido · Sin posicionamiento",
    problem:
      "Negocio con producción constante de contenido que no construye autoridad ni mueve oportunidades.",
    intervention:
      "Estrategia de posicionamiento, narrativa de marca y reorganización del contenido por etapa de funnel.",
    system: "Brand Authority + Growth Intelligence",
    outcome:
      "Contenido con intención comercial y mejor reconocimiento en su categoría.",
  },
  {
    icon: MousePointer,
    label: "Web bonita · Baja conversión",
    problem:
      "Sitio con buena estética pero que recibe tráfico sin capturar oportunidades comerciales claras.",
    intervention:
      "Diseño centrado en conversión, copy estratégico, formularios optimizados y tracking de eventos clave.",
    system: "Acquisition Engine + Growth Intelligence",
    outcome:
      "Tasa de captura más alta y mejor lectura del comportamiento del visitante.",
  },
  {
    icon: Layers3,
    label: "Leads que no convierten",
    problem:
      "Empresa que sí recibe oportunidades pero las pierde por falta de seguimiento, nurturing o calificación.",
    intervention:
      "Flujos de email y WhatsApp por etapa, scoring de oportunidades y handover claro al equipo comercial.",
    system: "Revenue Automation",
    outcome:
      "Mejor tasa de cierre y menor tiempo entre primer contacto y propuesta.",
  },
  {
    icon: Workflow,
    label: "Equipo comercial · Sin automatización",
    problem:
      "Operación comercial dependiente de procesos manuales, hojas de cálculo y memoria del equipo.",
    intervention:
      "Conexión de formularios, CRM, WhatsApp, email y dashboards en un único flujo operativo.",
    system: "Revenue Automation + Growth Intelligence",
    outcome:
      "Operación comercial más predecible y reportes que ayudan a decidir.",
  },
];

export default function ScenariosSection({ limit }: { limit?: number }) {
  const items = limit ? scenarios.slice(0, limit) : scenarios;
  return (
    <section
      id="escenarios"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              Escenarios de aplicación
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: PALETTE.text }}
          >
            Casos donde Aureon{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              puede generar impacto
            </span>
            .
          </h2>
          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            Cada negocio tiene un punto de fricción distinto. Estos son los
            escenarios más recurrentes donde nuestra metodología aporta valor
            real, junto con el sistema que activamos en cada caso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-7 lg:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: PALETTE.bgWhite,
                border: `1px solid ${PALETTE.hairline}`,
                boxShadow: "0 6px 20px -8px rgba(26,24,21,0.06)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: PALETTE.accentSoft,
                    color: PALETTE.accent,
                  }}
                >
                  <s.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: PALETTE.textSoft }}
                >
                  {s.label}
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <div
                    className="font-display font-semibold text-[11px] uppercase tracking-[0.2em] mb-1.5"
                    style={{ color: PALETTE.gold }}
                  >
                    Situación
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: PALETTE.text }}>
                    {s.problem}
                  </p>
                </div>

                <div>
                  <div
                    className="font-display font-semibold text-[11px] uppercase tracking-[0.2em] mb-1.5"
                    style={{ color: PALETTE.gold }}
                  >
                    Intervención
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: PALETTE.textMuted }}>
                    {s.intervention}
                  </p>
                </div>

                <div
                  className="rounded-xl p-3 flex items-start gap-2"
                  style={{
                    backgroundColor: PALETTE.bgAlt,
                    border: `1px solid ${PALETTE.hairline}`,
                  }}
                >
                  <ArrowRight
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: PALETTE.accent }}
                  />
                  <div>
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1"
                      style={{ color: PALETTE.accent }}
                    >
                      Sistema activado
                    </div>
                    <div
                      className="font-display font-semibold text-sm leading-tight"
                      style={{ color: PALETTE.text }}
                    >
                      {s.system}
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    className="font-display font-semibold text-[11px] uppercase tracking-[0.2em] mb-1.5"
                    style={{ color: PALETTE.gold }}
                  >
                    Resultado esperado
                  </div>
                  <p
                    className="text-sm leading-relaxed font-medium"
                    style={{ color: PALETTE.text }}
                  >
                    {s.outcome}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {limit && limit < scenarios.length && (
          <div className="mt-12 text-center">
            <Link
              href="/casos"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{ border: `1.5px solid ${PALETTE.text}`, color: PALETTE.text }}
            >
              Ver escenarios de aplicación
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Footer note */}
        <p
          className="text-xs text-center mt-12 max-w-2xl mx-auto"
          style={{ color: PALETTE.textSoft }}
        >
          Estos escenarios describen contextos típicos donde aplicamos nuestra
          metodología. Los resultados esperados son cualitativos y dependen de
          las condiciones de cada negocio.
        </p>
      </div>
    </section>
  );
}
