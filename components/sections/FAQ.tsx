"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle, ArrowUpRight } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import MagneticButton from "@/components/common/MagneticButton";

const PALETTE = {
  bg: "#F5F1E8",
  bgWhite: "#FBF8F1",
  text: "#1A1815",
  textMuted: "#6B655E",
  accent: "#E04E2C",
  hairline: "rgba(26,24,21,0.10)",
};

const faqs = [
  { q: "¿Cómo trabajan con sus clientes?", a: "Operamos como tu socio estratégico de crecimiento (growth partner), no como un proveedor más. Empezamos con un diagnóstico profundo, diseñamos un blueprint personalizado a 12 meses y ejecutamos por fases — branding, captación, automatización y escala. Tienes acceso directo a tu equipo senior por Slack/WhatsApp y reportes en vivo con dashboards." },
  { q: "¿En cuánto tiempo veo resultados?", a: "Los primeros indicadores de mejora aparecen en las semanas 4-6 (tráfico, leads, engagement). Resultados comerciales claros — pipeline calificado, reducción de CPA, crecimiento de revenue — suelen consolidarse entre el mes 2 y 4." },
  { q: "¿Cuánto cuesta trabajar con Aureon Growth?", a: "Nuestros engagements parten desde $2.000 USD/mes para soluciones puntuales y escalan según alcance, canales y velocidad requerida. La mayoría de nuestros clientes invierten entre $5.000 y $25.000 USD/mes." },
  { q: "¿Qué los diferencia de otras agencias?", a: "Tres cosas. Primero: data + IA en el core. Segundo: equipos senior dedicados, sin pasantes. Tercero: filosofía de growth partner — nos pagan por resultados, no por publicar posts. Por eso el 98% de nuestros clientes renueva año tras año." },
  { q: "¿Trabajan con empresas pequeñas o solo grandes marcas?", a: "Trabajamos con empresas de todos los tamaños siempre que exista ambición real de escalar. Tenemos clientes desde startups con $50K MRR hasta corporativos con presencia en 15 países." },
  { q: "¿Hay contratos de permanencia mínima?", a: "Solo en proyectos donde la naturaleza del trabajo requiere tiempo (SEO, automatización compleja). Para campañas, branding y proyectos puntuales, trabajamos sin contratos atados. Confiamos en que nuestros resultados nos retengan, no las cláusulas." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LEFT — Header */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
              <span
                className="font-mono text-xs uppercase tracking-[0.28em]"
                style={{ color: PALETTE.accent }}
              >
                Cap. 10 — Dudas
              </span>
            </div>
            <h2
              className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ color: PALETTE.text }}
            >
              Preguntas{" "}
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  color: PALETTE.accent,
                }}
              >
                frecuentes
              </span>
              .
            </h2>
            <p
              className="text-base lg:text-lg leading-relaxed mb-8"
              style={{ color: PALETTE.textMuted }}
            >
              Todo lo que necesitas saber antes de empezar. ¿Te quedaste con
              más dudas?
            </p>

            <MagneticButton
              href={waLink("default")}
              strength={0.2}
              className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-sm rounded-full border-2"
              style={{
                borderColor: PALETTE.text,
                color: PALETTE.text,
              }}
            >
              <MessageCircle className="w-4 h-4" />
              Pregúntanos por WhatsApp
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT — Accordion */}
        <div className="lg:col-span-7 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl border overflow-hidden transition-all"
                style={{
                  backgroundColor: isOpen ? PALETTE.bgWhite : "transparent",
                  borderColor: isOpen ? PALETTE.accent : PALETTE.hairline,
                  boxShadow: isOpen
                    ? "0 12px 32px -12px rgba(224, 78, 44, 0.18)"
                    : "none",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 lg:px-7 lg:py-6 text-left transition-colors"
                  style={{ color: PALETTE.text }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span
                      className="font-mono text-xs tabular-nums"
                      style={{
                        color: isOpen ? PALETTE.accent : PALETTE.textMuted,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display font-semibold text-base lg:text-lg leading-tight">
                      {faq.q}
                    </span>
                  </div>
                  <Plus
                    className="w-5 h-5 transition-transform flex-shrink-0"
                    style={{
                      color: PALETTE.accent,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-6 lg:px-7 pb-6 pt-0 text-sm lg:text-base leading-relaxed"
                        style={{ color: PALETTE.textMuted, paddingLeft: "calc(1.5rem + 28px)" }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
