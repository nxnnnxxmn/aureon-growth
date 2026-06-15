"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Check } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import MagneticButton from "@/components/common/MagneticButton";

const PALETTE = {
  bg: "#F5F1E8",
  bgWhite: "#FBF8F1",
  bgDark: "#1A1815",
  text: "#1A1815",
  textOnDark: "#F5F1E8",
  textMuted: "#6B655E",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
};

const proofs = [
  { value: "850+", label: "Marcas escaladas" },
  { value: "400%", label: "ROI promedio" },
  { value: "98%", label: "Retención" },
  { value: "<24h", label: "Respuesta" },
];

const benefits = [
  "Consultoría estratégica gratuita (60 min)",
  "Diagnóstico digital sin costo",
  "Propuesta personalizada en 48 horas",
  "Sin contratos de permanencia mínima",
  "Resultados medibles desde el primer mes",
  "Equipo senior asignado exclusivamente",
];

export default function CTA() {
  return (
    <section
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg }}
    >
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        <motion.div
          className="relative rounded-3xl overflow-hidden p-10 lg:p-16"
          style={{ backgroundColor: PALETTE.bgDark }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative big letter */}
          <div
            aria-hidden
            className="absolute -top-8 -right-8 select-none pointer-events-none leading-none"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontSize: "clamp(15rem, 30vw, 28rem)",
              fontWeight: 300,
              color: PALETTE.accent,
              opacity: 0.18,
            }}
          >
            &amp;
          </div>

          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${PALETTE.textOnDark} 1.5px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: PALETTE.accent }}
              />
              <span
                className="font-mono text-xs uppercase tracking-[0.28em]"
                style={{ color: PALETTE.accent }}
              >
                Cap. 11 — Hablemos
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-display font-semibold leading-[1.02] tracking-[-0.025em] text-[clamp(2.25rem,6vw,4.5rem)] mb-8"
              style={{ color: PALETTE.textOnDark }}
            >
              ¿Listo para escalar{" "}
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: PALETTE.accent,
                }}
              >
                en serio
              </span>
              ?
            </h2>

            {/* Subtitle */}
            <p
              className="text-lg lg:text-xl leading-relaxed max-w-2xl mb-10"
              style={{ color: "rgba(245, 241, 232, 0.75)" }}
            >
              Agenda una consultoría estratégica gratuita.{" "}
              <span style={{ color: PALETTE.textOnDark, fontWeight: 500 }}>
                30 minutos de análisis honesto
              </span>{" "}
              sobre cómo multiplicar tu revenue. Sin compromiso.
            </p>

            {/* Benefits checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-2xl">
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: PALETTE.accent }}
                  >
                    <Check className="w-3 h-3" style={{ color: PALETTE.textOnDark }} />
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "rgba(245, 241, 232, 0.85)" }}
                  >
                    {b}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <MagneticButton
                href="#contacto"
                strength={0.25}
                innerStrength={0.4}
                radius={120}
                className="group inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-sm rounded-full transition-all duration-300"
                style={{
                  backgroundColor: PALETTE.accent,
                  color: PALETTE.textOnDark,
                  boxShadow: "0 14px 36px -10px rgba(224, 78, 44, 0.55)",
                }}
              >
                Agendar consultoría gratis
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </MagneticButton>

              <MagneticButton
                href={waLink("default")}
                strength={0.2}
                innerStrength={0.35}
                radius={110}
                className="group inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-sm rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: PALETTE.textOnDark,
                  color: PALETTE.textOnDark,
                }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp directo
              </MagneticButton>
            </div>

            {/* Trust strip */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-8 border-t"
              style={{ borderColor: "rgba(245, 241, 232, 0.15)" }}
            >
              {proofs.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <div
                    className="font-display font-bold text-2xl lg:text-3xl tabular-nums mb-1"
                    style={{ color: PALETTE.accent }}
                  >
                    {p.value}
                  </div>
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: "rgba(245, 241, 232, 0.6)" }}
                  >
                    {p.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
