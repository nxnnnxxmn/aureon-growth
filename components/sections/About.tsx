"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Brain, Rocket, Target, Globe, CheckCircle } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PALETTE = {
  bg: "#F5F1E8",
  bgWhite: "#FBF8F1",
  bgAlt: "#EFE9DB",
  text: "#1A1815",
  textMuted: "#6B655E",
  textSoft: "#9A938A",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  forest: "#2D5016",
  hairline: "rgba(26,24,21,0.10)",
  hairlineSoft: "rgba(26,24,21,0.06)",
};

const values = [
  {
    num: "01",
    icon: Brain,
    title: "Inteligencia Estratégica",
    description:
      "Datos + psicología del consumidor + machine learning. Decisiones que generan ventajas competitivas reales.",
    quote: "data-driven, no instinto",
    pattern: "lines",
  },
  {
    num: "02",
    icon: Rocket,
    title: "Velocidad de Ejecución",
    description:
      "Mientras otros planifican, ejecutamos. Sistemas ágiles con resultados medibles en semanas.",
    quote: "ship fast, learn faster",
    pattern: "dots",
  },
  {
    num: "03",
    icon: Target,
    title: "Obsesión por Resultados",
    description:
      "Cada decisión guiada por métricas. Revenue, no vanidad. Posicionamiento real en tu mercado.",
    quote: "revenue > vanidad",
    pattern: "crosshair",
  },
  {
    num: "04",
    icon: Globe,
    title: "Visión Global",
    description:
      "Estrategias probadas en 5 continentes. Adaptadas con precisión a la realidad de cada marca.",
    quote: "pensamiento global",
    pattern: "grid",
  },
];

const stats = [
  { value: 7, suffix: "+", label: "Años operando" },
  { value: 850, suffix: "+", label: "Marcas escaladas" },
  { value: 12, suffix: "", label: "Países alcanzados" },
  { value: 98, suffix: "%", label: "Retención" },
];

const achievements = [
  "Google Premier Partner",
  "Meta Business Partner",
  "HubSpot Diamond",
  "Top 1% LATAM",
  "Effie Awards 2024",
  "ISO 27001",
];

// Background patterns SVG by type
function PatternBg({ type, hovered }: { type: string; hovered: boolean }) {
  const color = hovered ? "rgba(251, 248, 241, 0.18)" : "rgba(26, 24, 21, 0.05)";

  if (type === "lines") {
    return (
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${color} 0px, ${color} 1px, transparent 1px, transparent 14px)`,
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
          backgroundSize: "16px 16px",
          opacity: hovered ? 1 : 0.7,
        }}
      />
    );
  }
  if (type === "crosshair") {
    return (
      <svg className="absolute inset-0 w-full h-full transition-opacity duration-500" style={{ opacity: hovered ? 0.5 : 0.3 }}>
        <defs>
          <pattern id={`crosshair-${type}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="14" fill="none" stroke={color} strokeWidth="0.8" />
            <line x1="25" y1="0" x2="25" y2="14" stroke={color} strokeWidth="0.8" />
            <line x1="25" y1="36" x2="25" y2="50" stroke={color} strokeWidth="0.8" />
            <line x1="0" y1="25" x2="14" y2="25" stroke={color} strokeWidth="0.8" />
            <line x1="36" y1="25" x2="50" y2="25" stroke={color} strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#crosshair-${type})`} />
      </svg>
    );
  }
  if (type === "grid") {
    return (
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: hovered ? 0.7 : 0.45,
        }}
      />
    );
  }
  return null;
}

// 3D Tilt card — premium hover physics with rich backgrounds
function TiltCard({ value }: { value: typeof values[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 20 };
  const rotateX = useTransform(useSpring(y, springConfig), [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(useSpring(x, springConfig), [-0.5, 0.5], [-10, 10]);
  const [hovered, setHovered] = useState(false);

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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="value-card relative rounded-3xl overflow-hidden will-change-transform cursor-default min-h-[280px]"
    >
      {/* Card surface */}
      <div
        className="absolute inset-0 rounded-3xl transition-all duration-500"
        style={{
          backgroundColor: hovered ? PALETTE.accent : PALETTE.bgWhite,
          boxShadow: hovered
            ? "0 30px 70px -20px rgba(224, 78, 44, 0.40), 0 0 0 1px rgba(224, 78, 44, 0.20)"
            : "0 8px 24px -10px rgba(26, 24, 21, 0.08), 0 0 0 1px rgba(26, 24, 21, 0.06)",
        }}
      />

      {/* Pattern background */}
      <PatternBg type={value.pattern} hovered={hovered} />

      {/* Big decorative number — corner accent */}
      <div
        className="absolute top-5 right-7 select-none leading-none pointer-events-none transition-all duration-500"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: "5rem",
          fontWeight: 300,
          color: hovered ? "rgba(251, 248, 241, 0.50)" : PALETTE.accent,
          opacity: hovered ? 0.65 : 0.55,
        }}
      >
        {value.num}
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500"
          style={{
            backgroundColor: hovered ? PALETTE.bgWhite : PALETTE.accent,
            transform: hovered ? "rotate(-8deg) scale(1.05)" : "rotate(0) scale(1)",
          }}
        >
          <value.icon
            className="w-6 h-6 transition-colors duration-500"
            style={{ color: hovered ? PALETTE.accent : PALETTE.bgWhite }}
          />
        </div>

        <h3
          className="font-display font-semibold text-xl lg:text-2xl leading-tight mb-3 transition-colors duration-500"
          style={{ color: hovered ? PALETTE.bgWhite : PALETTE.text }}
        >
          {value.title}
        </h3>

        <p
          className="text-sm lg:text-base leading-relaxed mb-5 transition-colors duration-500"
          style={{
            color: hovered ? "rgba(251, 248, 241, 0.85)" : PALETTE.textMuted,
          }}
        >
          {value.description}
        </p>

        {/* Pull quote — italic Cormorant */}
        <div
          className="mt-auto pt-4 border-t flex items-center gap-2 transition-all duration-500"
          style={{
            borderColor: hovered ? "rgba(251, 248, 241, 0.25)" : PALETTE.hairlineSoft,
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
            &ldquo;{value.quote}&rdquo;
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  // Entry animations via framer-motion whileInView at component level (more reliable on anchor navigation)

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative w-full overflow-hidden py-24 lg:py-36"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      {/* Soft decorative blob — top right */}
      <div
        aria-hidden
        className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-30 -z-0 pointer-events-none"
        style={{ backgroundColor: PALETTE.accentSoft, filter: "blur(80px)" }}
      />
      {/* Soft decorative blob — bottom left */}
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-25 -z-0 pointer-events-none"
        style={{ backgroundColor: "#E8DDC9", filter: "blur(90px)" }}
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="about-header mb-16 lg:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              Cap. 02 — Sobre Nosotros
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ color: PALETTE.text }}
          >
            Una agencia que opera{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              como tu socio
            </span>
            .
          </h2>
          <p
            className="text-lg lg:text-xl leading-relaxed mb-5"
            style={{ color: PALETTE.textMuted }}
          >
            Cada campaña, cada decisión, cada línea de código está alineada a un
            objetivo:{" "}
            <span style={{ color: PALETTE.text, fontWeight: 500 }}>
              multiplicar tu revenue
            </span>{" "}
            y posicionarte como líder en tu mercado.
          </p>
          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            Aureon Growth nació con una misión clara: democratizar el acceso
            a estrategias de marketing de clase mundial para marcas con ambición
            global. Hoy, somos el equipo detrás del crecimiento de{" "}
            <span style={{ color: PALETTE.text, fontWeight: 500 }}>
              más de 850 empresas
            </span>
            .
          </p>
        </div>

        {/* Values — 2x2 grid con 3D tilt */}
        <div
          className="values-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24 lg:mb-32"
          style={{ perspective: 1500 }}
        >
          {values.map((v) => (
            <TiltCard key={v.title} value={v} />
          ))}
        </div>

        {/* Stats — clean editorial row, large numbers */}
        <div
          className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-24 lg:mb-32 py-12 lg:py-16 border-y"
          style={{ borderColor: PALETTE.hairline }}
        >
          {stats.map((s) => (
            <div key={s.label} className="stat-cell">
              <div
                className="font-display font-semibold text-5xl lg:text-6xl leading-none mb-4 tabular-nums"
                style={{ color: PALETTE.accent }}
              >
                <AnimatedCounter
                  end={s.value}
                  prefix=""
                  suffix={s.suffix}
                />
              </div>
              <div
                className="font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: PALETTE.textMuted }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements — pills no rectangles */}
        <div className="achievements-list">
          <div
            className="mb-6 font-mono text-xs uppercase tracking-[0.22em]"
            style={{ color: PALETTE.textMuted }}
          >
            Certificaciones · Reconocimientos
          </div>
          <div className="flex flex-wrap gap-3">
            {achievements.map((a) => (
              <div
                key={a}
                className="achievement-pill inline-flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: PALETTE.hairline,
                  backgroundColor: PALETTE.bgWhite,
                  color: PALETTE.text,
                }}
              >
                <CheckCircle
                  className="w-4 h-4"
                  style={{ color: PALETTE.accent }}
                />
                <span className="text-sm font-medium">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
