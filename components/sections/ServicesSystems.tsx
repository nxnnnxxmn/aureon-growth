"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { GROWTH_SYSTEMS } from "@/lib/growth";

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

export default function ServicesSystems() {
  return (
    <section
      id="sistemas"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14 lg:mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              Sistemas de crecimiento
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: PALETTE.text }}
          >
            Cuatro sistemas que trabajan{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              como uno solo
            </span>
            .
          </h2>
          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            No vendemos servicios sueltos. Agrupamos cada disciplina en sistemas
            vendibles que se integran entre sí para mover una misma métrica: el
            crecimiento comercial.
          </p>
        </div>

        {/* 4 system cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {GROWTH_SYSTEMS.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/servicios/${s.slug}`}
                className="group relative flex flex-col h-full rounded-3xl p-7 lg:p-9 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: PALETTE.bgWhite,
                  border: `1px solid ${PALETTE.hairline}`,
                  boxShadow: "0 6px 20px -8px rgba(26,24,21,0.08)",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: PALETTE.accent }}
                  >
                    <s.icon className="w-6 h-6" style={{ color: PALETTE.bgWhite }} strokeWidth={1.6} />
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: PALETTE.textSoft }}
                  />
                </div>

                <div
                  className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2"
                  style={{ color: PALETTE.gold }}
                >
                  {s.short}
                </div>
                <h3
                  className="font-display font-semibold text-xl lg:text-2xl leading-tight mb-3"
                  style={{ color: PALETTE.text }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: PALETTE.textMuted }}
                >
                  {s.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {s.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: PALETTE.accentSoft,
                        color: PALETTE.accent,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div
                  className="mt-auto pt-5 border-t flex items-center justify-between gap-3"
                  style={{ borderColor: PALETTE.hairline }}
                >
                  <div>
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.18em] mb-0.5"
                      style={{ color: PALETTE.textSoft }}
                    >
                      Resultado
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: PALETTE.text }}
                    >
                      {s.outcome}
                    </div>
                  </div>
                  <span
                    className="shrink-0 inline-flex items-center gap-1 text-xs font-display font-semibold"
                    style={{ color: PALETTE.accent }}
                  >
                    Explorar
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: PALETTE.text,
              color: PALETTE.bgAlt,
            }}
          >
            Ver todos los servicios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
