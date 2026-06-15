"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROCESS } from "@/lib/growth";

const PALETTE = {
  bg: "#FBF8F1",
  bgAlt: "#F5F1E8",
  text: "#1A1815",
  textMuted: "#6B655E",
  textSoft: "#9A938A",
  accent: "#E04E2C",
  gold: "#C9A961",
  hairline: "rgba(26,24,21,0.10)",
};

/** Home variant: compact 6-step strip. Full detail lives in /proceso. */
export default function ProcessSection() {
  return (
    <section
      id="proceso"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
              <span
                className="font-mono text-xs uppercase tracking-[0.28em]"
                style={{ color: PALETTE.accent }}
              >
                Proceso de trabajo
              </span>
            </div>
            <h2
              className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
              style={{ color: PALETTE.text }}
            >
              Del diagnóstico al{" "}
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  color: PALETTE.accent,
                }}
              >
                escalamiento
              </span>
              .
            </h2>
          </div>
          <Link
            href="/proceso"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{ border: `1.5px solid ${PALETTE.text}`, color: PALETTE.text }}
          >
            Conocer el proceso completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-5 flex flex-col"
              style={{
                backgroundColor: PALETTE.bgAlt,
                border: `1px solid ${PALETTE.hairline}`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(224,78,44,0.10)" }}
                >
                  <step.icon className="w-5 h-5" style={{ color: PALETTE.accent }} strokeWidth={1.6} />
                </div>
                <span
                  className="font-mono text-[11px] tabular-nums"
                  style={{ color: PALETTE.gold }}
                >
                  {step.n}
                </span>
              </div>
              <h3
                className="font-display font-semibold text-sm leading-snug mb-1.5"
                style={{ color: PALETTE.text }}
              >
                {step.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: PALETTE.textMuted }}
              >
                {step.what}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
