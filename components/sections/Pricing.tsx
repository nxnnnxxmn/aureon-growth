"use client";

import { motion } from "framer-motion";
import { Check, Crown, Rocket, ArrowUpRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/common/MagneticButton";

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

const tiers = [
  {
    num: "01",
    name: "Growth Starter",
    tagline: "Para marcas validando su camino al crecimiento",
    price: "Desde $3.500",
    priceSub: "USD/mes",
    features: [
      "2-4 disciplinas activas (paid, contenido, o branding)",
      "Estrategia + ejecución dedicada",
      "Reportes mensuales + revisiones quincenales",
      "Acceso a equipo senior",
      "Sin permanencia obligatoria",
    ],
    ideal: "Startups validadas · $50K-300K MRR",
    cta: "Empezar evaluación",
    highlight: false,
  },
  {
    num: "02",
    name: "Growth Partner",
    tagline: "Sistema completo, equipo dedicado",
    price: "Desde $8.500",
    priceSub: "USD/mes",
    features: [
      "5-7 disciplinas integradas en sistema",
      "CSM + Strategist + 3-5 especialistas senior",
      "Onboarding 30 días + plan 12 meses",
      "Reportes semanales + slack/wa directo",
      "Compromiso 6 meses",
      "Resultados medibles desde mes 2-3",
      "Equipo senior dedicado",
    ],
    ideal: "Marcas en escala · $300K-3M ARR",
    cta: "Construir mi sistema",
    highlight: true,
  },
  {
    num: "03",
    name: "Growth Empire",
    tagline: "Para líderes de categoría que necesitan recursos infinitos",
    price: "Personalizado",
    priceSub: "",
    features: [
      "Stack disciplinas completas (24+ especialidades)",
      "Equipo internacional + war-room",
      "On-site quarterly + roadmap multimercado",
      "Acceso directo a partners (founders + senior)",
      "Custom AI + tooling propietario",
    ],
    ideal: "Líderes de categoría · $5M+ ARR",
    cta: "Conversación a medida",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="inversion"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bgAlt, color: PALETTE.text }}
    >
      <div
        aria-hidden
        className="absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full -z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${PALETTE.accentSoft} 0%, transparent 70%)`,
          opacity: 0.35,
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
              Cap. 06 — Inversión
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: PALETTE.text }}
          >
            Tres formas de{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              trabajar juntos
            </span>
            .
          </h2>
          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            Sin precios ocultos ni paquetes inflados. Tres modelos honestos
            diseñados para distintos momentos de marca — todos con métricas
            verificables y sin permanencia rígida.
          </p>
        </div>

        {/* Tiers grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => {
            const featured = tier.highlight;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-3xl overflow-hidden ${
                  featured ? "lg:-mt-4 lg:mb-4" : ""
                }`}
                style={{
                  backgroundColor: featured ? PALETTE.accent : PALETTE.bgWhite,
                  boxShadow: featured
                    ? "0 30px 70px -20px rgba(224, 78, 44, 0.45), 0 0 0 1px rgba(224, 78, 44, 0.20)"
                    : "0 12px 32px -12px rgba(26, 24, 21, 0.10), 0 0 0 1px rgba(26, 24, 21, 0.06)",
                }}
              >
                {/* Big italic number */}
                <div
                  aria-hidden
                  className="absolute top-4 right-6 select-none pointer-events-none leading-none"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontStyle: "italic",
                    fontSize: "6rem",
                    fontWeight: 300,
                    color: featured ? "rgba(251, 248, 241, 0.50)" : PALETTE.accent,
                    opacity: featured ? 0.7 : 0.45,
                  }}
                >
                  {tier.num}
                </div>

                {/* Featured badge */}
                {featured && (
                  <div
                    className="absolute top-5 left-7 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-semibold"
                    style={{
                      backgroundColor: PALETTE.bgWhite,
                      color: PALETTE.accent,
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    Más Elegido
                  </div>
                )}

                <div className="relative z-10 p-8 lg:p-10">
                  {/* Spacer for badge */}
                  {featured && <div className="h-8" />}

                  <h3
                    className="font-display font-semibold text-2xl lg:text-3xl leading-tight mb-2 mt-8"
                    style={{
                      color: featured ? PALETTE.bgWhite : PALETTE.text,
                    }}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{
                      color: featured ? "rgba(251, 248, 241, 0.85)" : PALETTE.textMuted,
                      fontFamily: "var(--font-cormorant), serif",
                      fontStyle: "italic",
                      fontSize: "1rem",
                    }}
                  >
                    &ldquo;{tier.tagline}&rdquo;
                  </p>

                  {/* Price */}
                  <div className="mb-8 pb-6 border-b" style={{ borderColor: featured ? "rgba(251, 248, 241, 0.20)" : PALETTE.hairline }}>
                    <div
                      className="font-display font-bold text-3xl lg:text-4xl leading-none mb-2"
                      style={{ color: featured ? PALETTE.bgWhite : PALETTE.accent }}
                    >
                      {tier.price}
                    </div>
                    <div
                      className="font-mono text-xs uppercase tracking-[0.18em]"
                      style={{
                        color: featured ? "rgba(251, 248, 241, 0.65)" : PALETTE.textMuted,
                      }}
                    >
                      {tier.priceSub}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm leading-snug"
                        style={{
                          color: featured ? "rgba(251, 248, 241, 0.95)" : PALETTE.text,
                        }}
                      >
                        <Check
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{
                            color: featured ? PALETTE.bgWhite : PALETTE.accent,
                          }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Ideal */}
                  <div
                    className="mb-6 pb-6 border-b font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{
                      borderColor: featured ? "rgba(251, 248, 241, 0.20)" : PALETTE.hairline,
                      color: featured ? "rgba(251, 248, 241, 0.70)" : PALETTE.textMuted,
                    }}
                  >
                    {tier.ideal}
                  </div>

                  {/* CTA */}
                  <MagneticButton
                    href="#contacto"
                    strength={0.18}
                    className="group inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm rounded-full border-2 transition-all w-full justify-center"
                    style={{
                      borderColor: featured ? PALETTE.bgWhite : PALETTE.accent,
                      backgroundColor: featured ? PALETTE.bgWhite : "transparent",
                      color: featured ? PALETTE.accent : PALETTE.accent,
                    }}
                  >
                    {tier.cta}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </MagneticButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
