"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { WORK_MODELS } from "@/lib/growth";

const PALETTE = {
  bg: "#EFE9DB",
  bgWhite: "#FBF8F1",
  bgAlt: "#F5F1E8",
  text: "#1A1815",
  textMuted: "#6B655E",
  textSoft: "#9A938A",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  gold: "#C9A961",
  hairline: "rgba(26,24,21,0.10)",
};

export default function WorkModels() {
  return (
    <section
      id="formas-de-trabajo"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-14 lg:mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              Formas de trabajo
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: PALETTE.text }}
          >
            Distintas puertas de entrada,{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              un mismo estándar
            </span>
            .
          </h2>
          <p className="text-base lg:text-lg leading-relaxed" style={{ color: PALETTE.textMuted }}>
            El alcance se adapta a la etapa de tu empresa. Cada modalidad define
            con claridad para quién es, qué incluye y qué resultado busca.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {WORK_MODELS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col rounded-3xl p-7"
              style={{
                backgroundColor: m.featured ? PALETTE.text : PALETTE.bgWhite,
                border: `1px solid ${m.featured ? PALETTE.text : PALETTE.hairline}`,
                boxShadow: m.featured
                  ? "0 24px 60px -24px rgba(26,24,21,0.45)"
                  : "0 6px 20px -8px rgba(26,24,21,0.08)",
              }}
            >
              {m.featured && (
                <span
                  className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: PALETTE.accent, color: PALETTE.bgWhite }}
                >
                  Popular
                </span>
              )}

              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  backgroundColor: m.featured ? "rgba(251,248,241,0.12)" : PALETTE.accentSoft,
                  color: m.featured ? PALETTE.gold : PALETTE.accent,
                }}
              >
                <m.icon className="w-5 h-5" strokeWidth={1.6} />
              </div>

              <h3
                className="font-display font-semibold text-lg mb-2"
                style={{ color: m.featured ? PALETTE.bgWhite : PALETTE.text }}
              >
                {m.name}
              </h3>
              <p
                className="text-xs leading-relaxed mb-5"
                style={{ color: m.featured ? "rgba(251,248,241,0.65)" : PALETTE.textSoft }}
              >
                {m.forWho}
              </p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {m.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: m.featured ? PALETTE.gold : PALETTE.accent }}
                      strokeWidth={2.5}
                    />
                    <span
                      className="text-sm leading-snug"
                      style={{ color: m.featured ? "rgba(251,248,241,0.85)" : PALETTE.textMuted }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="pt-4 border-t"
                style={{ borderColor: m.featured ? "rgba(251,248,241,0.14)" : PALETTE.hairline }}
              >
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1"
                  style={{ color: m.featured ? PALETTE.gold : PALETTE.textSoft }}
                >
                  Resultado
                </div>
                <p
                  className="text-sm font-medium"
                  style={{ color: m.featured ? PALETTE.bgWhite : PALETTE.text }}
                >
                  {m.outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/diagnostico"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: PALETTE.accent,
              color: PALETTE.bgWhite,
              boxShadow: "0 14px 36px -10px rgba(224,78,44,0.45)",
            }}
          >
            Solicitar diagnóstico estratégico
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
