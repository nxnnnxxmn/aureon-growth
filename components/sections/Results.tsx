"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  TrendingUp,
  Users,
  DollarSign,
  BarChart2,
  Zap,
  Target,
  ArrowUpRight,
} from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";

const PALETTE = {
  bg: "#F5F1E8",
  bgWhite: "#FBF8F1",
  bgAlt: "#EFE9DB",
  text: "#1A1815",
  textMuted: "#6B655E",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  forest: "#2D5016",
  hairline: "rgba(26,24,21,0.10)",
  hairlineSoft: "rgba(26,24,21,0.06)",
};

const stats = [
  {
    num: "01",
    icon: DollarSign,
    value: 50,
    suffix: "M",
    prefix: "$",
    label: "Revenue Generado",
    description: "Ingresos directamente atribuibles a nuestras estrategias en los últimos 12 meses.",
    quote: "el resultado más importante",
    pattern: "dots",
    size: "lg",
    accent: true,
    sub: "+ 1.4M MoM",
  },
  {
    num: "02",
    icon: TrendingUp,
    value: 400,
    suffix: "%",
    label: "ROI Promedio",
    description: "Retorno sobre inversión publicitaria.",
    quote: "cada euro multiplicado",
    pattern: "lines",
    size: "sm",
  },
  {
    num: "03",
    icon: Users,
    value: 850,
    suffix: "+",
    label: "Marcas Transformadas",
    description: "En 12 países.",
    quote: "cada marca, un caso",
    pattern: "crosshair",
    size: "sm",
  },
  {
    num: "04",
    icon: Target,
    value: 98,
    suffix: "%",
    label: "Satisfacción",
    description: "Tasa de retención.",
    quote: "98 de cada 100 vuelven",
    pattern: "grid",
    size: "md",
  },
  {
    num: "05",
    icon: BarChart2,
    value: 12,
    suffix: "X",
    label: "Crecimiento Avg",
    description: "Multiplicador típico en 24 meses.",
    quote: "12x en 2 años",
    pattern: "dots",
    size: "sm",
  },
  {
    num: "06",
    icon: Zap,
    value: 60,
    suffix: " días",
    label: "Time to Results",
    description: "Primer resultado medible.",
    quote: "no esperes meses",
    pattern: "lines",
    size: "sm",
  },
];

const caseHighlights = [
  {
    brand: "TechCorp LATAM",
    industry: "SaaS B2B",
    growth: "+1,200%",
    result: "Crecimiento en MRR",
    period: "8 meses",
    services: ["Growth Marketing", "Paid Media", "CRO"],
  },
  {
    brand: "Moda Premium SA",
    industry: "E-commerce Fashion",
    growth: "18X",
    result: "ROAS en publicidad",
    period: "60 días",
    services: ["Meta Ads", "Google Ads", "Email Marketing"],
  },
  {
    brand: "Fintech Uno",
    industry: "Finanzas",
    growth: "-68%",
    result: "Reducción de CPA",
    period: "3 meses",
    services: ["Performance", "Automation", "Analytics"],
  },
];

function PatternBg({ type, hovered }: { type: string; hovered: boolean }) {
  const color = hovered ? "rgba(251, 248, 241, 0.20)" : "rgba(26, 24, 21, 0.05)";

  if (type === "lines") {
    return (
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 16px)`,
          opacity: hovered ? 0.6 : 0.4,
        }}
      />
    );
  }
  if (type === "dots") {
    return (
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${color} 1.5px, transparent 0)`,
          backgroundSize: "18px 18px",
          opacity: hovered ? 1 : 0.7,
        }}
      />
    );
  }
  if (type === "crosshair") {
    return (
      <svg className="absolute inset-0 w-full h-full transition-opacity duration-500" style={{ opacity: hovered ? 0.5 : 0.3 }}>
        <defs>
          <pattern id={`crosshair-res-${type}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="1" />
            <line x1="30" y1="0" x2="30" y2="14" stroke={color} strokeWidth="1" />
            <line x1="30" y1="46" x2="30" y2="60" stroke={color} strokeWidth="1" />
            <line x1="0" y1="30" x2="14" y2="30" stroke={color} strokeWidth="1" />
            <line x1="46" y1="30" x2="60" y2="30" stroke={color} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#crosshair-res-${type})`} />
      </svg>
    );
  }
  if (type === "grid") {
    return (
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          opacity: hovered ? 0.7 : 0.45,
        }}
      />
    );
  }
  return null;
}

function StatCard({ stat, idx }: { stat: typeof stats[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 22 };
  const rotateX = useTransform(useSpring(y, springCfg), [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(useSpring(x, springCfg), [-0.5, 0.5], [-6, 6]);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const isFeatured = stat.size === "lg";
  const isMedium = stat.size === "md";
  const span = isFeatured
    ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
    : isMedium
    ? "md:col-span-2 lg:col-span-2"
    : "lg:col-span-1";

  const minH = isFeatured ? "min-h-[400px]" : "min-h-[220px]";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`group relative rounded-3xl overflow-hidden cursor-default will-change-transform ${span} ${minH}`}
    >
      <div
        className="absolute inset-0 rounded-3xl transition-all duration-500"
        style={{
          backgroundColor: hovered ? PALETTE.accent : PALETTE.bgWhite,
          boxShadow: hovered
            ? "0 30px 70px -20px rgba(224, 78, 44, 0.40), 0 0 0 1px rgba(224, 78, 44, 0.20)"
            : "0 8px 24px -10px rgba(26, 24, 21, 0.08), 0 0 0 1px rgba(26, 24, 21, 0.06)",
        }}
      />
      <PatternBg type={stat.pattern} hovered={hovered} />

      <div
        className="absolute top-5 right-7 select-none leading-none pointer-events-none transition-all duration-500"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: isFeatured ? "7rem" : "4rem",
          fontWeight: 300,
          color: hovered ? "rgba(251, 248, 241, 0.55)" : PALETTE.accent,
          opacity: hovered ? 0.7 : 0.55,
        }}
      >
        {stat.num}
      </div>

      <div className="relative z-10 p-7 lg:p-9 h-full flex flex-col">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500"
          style={{
            backgroundColor: hovered ? PALETTE.bgWhite : PALETTE.accent,
            transform: hovered ? "rotate(-8deg) scale(1.05)" : "rotate(0) scale(1)",
          }}
        >
          <stat.icon
            className="w-6 h-6 transition-colors duration-500"
            style={{ color: hovered ? PALETTE.accent : PALETTE.bgWhite }}
          />
        </div>

        {/* Big metric value */}
        <div
          className={`font-display font-bold leading-none mb-3 tabular-nums transition-colors duration-500 ${
            isFeatured ? "text-6xl lg:text-7xl" : "text-4xl lg:text-5xl"
          }`}
          style={{ color: hovered ? PALETTE.bgWhite : PALETTE.text }}
        >
          <AnimatedCounter
            end={stat.value}
            prefix={stat.prefix || ""}
            suffix={stat.suffix || ""}
          />
        </div>

        <div
          className="font-display font-semibold text-base lg:text-lg mb-2 transition-colors duration-500"
          style={{ color: hovered ? PALETTE.bgWhite : PALETTE.text }}
        >
          {stat.label}
        </div>

        <p
          className="text-sm leading-relaxed transition-colors duration-500"
          style={{
            color: hovered ? "rgba(251, 248, 241, 0.85)" : PALETTE.textMuted,
          }}
        >
          {stat.description}
        </p>

        {/* Pull quote */}
        <div
          className="mt-auto pt-5 border-t flex items-center justify-between gap-2 transition-all duration-500"
          style={{
            borderColor: hovered
              ? "rgba(251, 248, 241, 0.25)"
              : PALETTE.hairlineSoft,
            marginTop: isFeatured ? "auto" : "1.25rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "0.95rem",
              color: hovered ? PALETTE.bgWhite : PALETTE.accent,
            }}
          >
            &ldquo;{stat.quote}&rdquo;
          </span>
          {stat.sub && (
            <span
              className="font-mono text-[10px] uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-500"
              style={{
                color: hovered
                  ? "rgba(251, 248, 241, 0.7)"
                  : PALETTE.textMuted,
              }}
            >
              {stat.sub}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Results() {
  return (
    <section
      id="resultados"
      className="relative w-full overflow-hidden py-24 lg:py-36"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full -z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${PALETTE.accentSoft} 0%, transparent 70%)`,
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              Cap. 04 — Resultados
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ color: PALETTE.text }}
          >
            Números que hablan{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              por sí solos
            </span>
            .
          </h2>
          <p
            className="text-lg lg:text-xl leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            No vendemos promesas. Entregamos métricas. Estos son los rangos
            consistentemente generados a través de industrias y modelos de
            negocio.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 auto-rows-min"
          style={{ perspective: 1500 }}
        >
          {stats.map((s, idx) => (
            <StatCard key={s.label} stat={s} idx={idx} />
          ))}
        </div>

        {/* Casos de Éxito Destacados */}
        <div className="mt-24 lg:mt-32">
          <div className="flex items-center gap-3 mb-10">
            <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
            <h3
              className="font-display font-semibold text-2xl lg:text-3xl"
              style={{ color: PALETTE.text }}
            >
              Casos de éxito{" "}
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  color: PALETTE.accent,
                }}
              >
                destacados
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {caseHighlights.map((c, i) => (
              <motion.div
                key={c.brand}
                className="group relative rounded-3xl p-7 lg:p-8 overflow-hidden cursor-default"
                style={{
                  backgroundColor: PALETTE.bgWhite,
                  boxShadow:
                    "0 8px 24px -10px rgba(26, 24, 21, 0.08), 0 0 0 1px rgba(26, 24, 21, 0.06)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
              >
                {/* Top: industry + period */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: PALETTE.textMuted }}
                  >
                    {c.industry}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide"
                    style={{ backgroundColor: PALETTE.accentSoft, color: PALETTE.accent }}
                  >
                    {c.period}
                  </span>
                </div>

                {/* Brand */}
                <div
                  className="font-display font-bold text-lg mb-1"
                  style={{ color: PALETTE.text }}
                >
                  {c.brand}
                </div>

                {/* Big metric */}
                <div
                  className="font-display font-black text-5xl leading-none mb-2 tabular-nums"
                  style={{ color: PALETTE.accent }}
                >
                  {c.growth}
                </div>
                <div className="text-sm mb-6" style={{ color: PALETTE.textMuted }}>
                  {c.result}
                </div>

                {/* Services */}
                <div
                  className="flex flex-wrap gap-1.5 pt-5 border-t"
                  style={{ borderColor: PALETTE.hairlineSoft }}
                >
                  {c.services.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: PALETTE.accentSoft,
                        borderColor: "rgba(224,78,44,0.18)",
                        color: PALETTE.accent,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
