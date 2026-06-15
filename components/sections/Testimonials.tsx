"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";

const PALETTE = {
  bg: "#F5F1E8",
  bgWhite: "#FBF8F1",
  bgAlt: "#EFE9DB",
  text: "#1A1815",
  textMuted: "#6B655E",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  hairline: "rgba(26,24,21,0.10)",
};

const testimonials = [
  {
    id: 1,
    name: "Valentina Ruiz",
    role: "CEO",
    company: "ReachMore SaaS",
    avatar: "VR",
    text: "Aureon Growth no es solo una agencia: son una extensión de nuestro equipo ejecutivo. En 8 meses pasamos de $0 a $2M en ARR. Su enfoque en datos e IA es completamente diferente a lo que había visto antes.",
    metric: "+2,400% MQL",
    metricLabel: "en 8 meses",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Director de Marketing",
    company: "TechCorp LATAM",
    avatar: "CM",
    text: "Triplicamos nuestro MRR en 6 meses. El equipo de Aureon entiende el negocio a un nivel profundo que va mucho más allá del marketing convencional. Son estrategas de primer nivel con ejecución impecable.",
    metric: "3X MRR",
    metricLabel: "en 6 meses",
  },
  {
    id: 3,
    name: "Mariana López",
    role: "Fundadora",
    company: "Natura Cosméticos",
    avatar: "ML",
    text: "Trabajar con Aureon fue transformador para nuestra marca. Pasamos de ser una empresa local a tener presencia en 5 países. Su estrategia de branding y social media es absolutamente premium.",
    metric: "5 mercados",
    metricLabel: "expansión internacional",
  },
  {
    id: 4,
    name: "Andrés Forero",
    role: "CMO",
    company: "FinFlow App",
    avatar: "AF",
    text: "Los sistemas de automatización con IA que implementaron redujeron nuestro CPA en un 71%. Ahora cerramos ventas mientras dormimos. La inversión se pagó sola en el primer mes.",
    metric: "−71% CPA",
    metricLabel: "en 45 días",
  },
  {
    id: 5,
    name: "Isabella Torres",
    role: "Directora General",
    company: "Urban Threads",
    avatar: "IT",
    text: "La identidad visual que crearon captura perfectamente quiénes somos. Y la estrategia de contenido llevó nuestra cuenta de 500K a más de 2 millones de seguidores en 10 meses. Simplemente increíble.",
    metric: "500K → 2M",
    metricLabel: "seguidores en 10 meses",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      id="testimonios"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bgAlt, color: PALETTE.text }}
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full -z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${PALETTE.accentSoft} 0%, transparent 70%)`,
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              Cap. 09 — Voces de Clientes
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: PALETTE.text }}
          >
            Marcas que ya{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              transformaron su futuro
            </span>
            .
          </h2>
          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            No hablamos de resultados que podrían pasar. Compartimos historias
            de éxito que ya sucedieron, con nombre y apellido.
          </p>
        </div>

        {/* Featured testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden p-8 lg:p-14 mb-8"
            style={{
              backgroundColor: PALETTE.bgWhite,
              boxShadow:
                "0 24px 60px -20px rgba(26, 24, 21, 0.12), 0 0 0 1px rgba(26, 24, 21, 0.05)",
            }}
          >
            {/* Big italic decorative quote mark */}
            <div
              aria-hidden
              className="absolute top-4 right-8 select-none pointer-events-none leading-none"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontSize: "clamp(8rem, 16vw, 14rem)",
                fontWeight: 300,
                color: PALETTE.accent,
                opacity: 0.18,
              }}
            >
              &ldquo;
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-8">
                <Quote
                  className="w-8 h-8 mb-6"
                  style={{ color: PALETTE.accent }}
                />
                <blockquote
                  className="font-display font-medium text-xl lg:text-2xl xl:text-3xl leading-snug mb-8"
                  style={{ color: PALETTE.text }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    &ldquo;
                  </span>
                  {t.text}
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    &rdquo;
                  </span>
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-xl"
                    style={{
                      backgroundColor: PALETTE.accent,
                      color: PALETTE.bgWhite,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div
                      className="font-display font-semibold text-base lg:text-lg"
                      style={{ color: PALETTE.text }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="font-mono text-[11px] uppercase tracking-[0.2em] mt-1"
                      style={{ color: PALETTE.textMuted }}
                    >
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metric callout */}
              <div className="lg:col-span-4">
                <div
                  className="rounded-2xl p-6 lg:p-8 text-center"
                  style={{ backgroundColor: PALETTE.accent }}
                >
                  <div
                    className="font-display font-bold text-3xl lg:text-4xl xl:text-5xl leading-none mb-3"
                    style={{ color: PALETTE.bgWhite }}
                  >
                    {t.metric}
                  </div>
                  <div
                    className="font-mono text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: "rgba(251, 248, 241, 0.85)" }}
                  >
                    {t.metricLabel}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Testimonio ${i + 1}`}
                className="transition-all"
                style={{
                  width: current === i ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  backgroundColor: current === i ? PALETTE.accent : PALETTE.hairline,
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all hover:scale-105"
              style={{ borderColor: PALETTE.text, color: PALETTE.text }}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{ backgroundColor: PALETTE.accent, color: PALETTE.bgWhite }}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
