"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, LayoutGrid, Workflow, TrendingUp, ArrowRight } from "lucide-react";

const PALETTE = {
  bg: "#FBF8F1",
  bgAlt: "#F5F1E8",
  text: "#1A1815",
  textMuted: "#6B655E",
  textSoft: "#9A938A",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  gold: "#C9A961",
  hairline: "rgba(26,24,21,0.10)",
};

const phases = [
  {
    n: "01",
    icon: Search,
    title: "Diagnóstico estratégico",
    body: "Analizamos marca, oferta, audiencia, canales activos, tráfico, CRM, funnel y oportunidades comerciales reales.",
    deliverables: [
      "Diagnóstico de marca",
      "Auditoría de canales",
      "Mapa de oportunidades",
    ],
  },
  {
    n: "02",
    icon: LayoutGrid,
    title: "Arquitectura de crecimiento",
    body: "Diseñamos posicionamiento, mensajes, journey, embudos, canales prioritarios y objetivos comerciales medibles.",
    deliverables: [
      "Blueprint estratégico",
      "Mapa de funnel",
      "Plan de medición",
    ],
  },
  {
    n: "03",
    icon: Workflow,
    title: "Implementación del sistema",
    body: "Ejecutamos landing pages, campañas, automatizaciones, CRM, contenidos, tracking y dashboards conectados.",
    deliverables: [
      "Landing & funnels",
      "CRM + automatizaciones",
      "Dashboards en vivo",
    ],
  },
  {
    n: "04",
    icon: TrendingUp,
    title: "Optimización continua",
    body: "Analítica, CRO, experimentación, reportes ejecutivos y escalamiento de los canales con mejor retorno.",
    deliverables: [
      "Reportes ejecutivos",
      "Experimentos CRO",
      "Plan de escalamiento",
    ],
  },
];

export default function MethodologySection({ showCta }: { showCta?: boolean }) {
  return (
    <section
      id="metodologia"
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
              Aureon Growth System
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: PALETTE.text }}
          >
            Metodología propietaria{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              en cuatro fases
            </span>
            .
          </h2>
          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            Un proceso estructurado para convertir marketing y tecnología en un
            sistema comercial medible. Desde el diagnóstico inicial hasta el
            escalamiento de los canales con mejor retorno.
          </p>
        </div>

        {/* Timeline — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[60px] left-[5%] right-[5%] h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${PALETTE.gold} 10%, ${PALETTE.gold} 90%, transparent)`,
              opacity: 0.4,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {phases.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Node */}
                <div className="relative z-10 mb-6 flex lg:justify-center">
                  <div
                    className="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center relative"
                    style={{
                      backgroundColor: PALETTE.bgAlt,
                      border: `2px solid ${PALETTE.gold}`,
                    }}
                  >
                    <p.icon
                      className="w-7 h-7 lg:w-9 lg:h-9"
                      style={{ color: PALETTE.accent }}
                      strokeWidth={1.5}
                    />
                    <span
                      className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full font-mono text-[10px] tabular-nums font-semibold"
                      style={{
                        backgroundColor: PALETTE.accent,
                        color: PALETTE.bg,
                      }}
                    >
                      {p.n}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:text-center">
                  <h3
                    className="font-display font-semibold text-lg lg:text-xl leading-tight mb-3"
                    style={{ color: PALETTE.text }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: PALETTE.textMuted }}
                  >
                    {p.body}
                  </p>

                  <div
                    className="pt-4 border-t space-y-1.5"
                    style={{ borderColor: PALETTE.hairline }}
                  >
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2"
                      style={{ color: PALETTE.gold }}
                    >
                      Entregables
                    </div>
                    {p.deliverables.map((d) => (
                      <div
                        key={d}
                        className="text-xs lg:text-[13px]"
                        style={{ color: PALETTE.textSoft }}
                      >
                        · {d}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {showCta && (
          <div className="mt-14 text-center">
            <Link
              href="/metodologia"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{ border: `1.5px solid ${PALETTE.text}`, color: PALETTE.text }}
            >
              Ver metodología completa
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
