"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CASES } from "@/lib/cases";

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

const filters = ["Todos", "Branding", "Web", "Performance", "Contenido", "IA"];
const LARGE_SLUGS = new Set(["reachmore-saas", "medpro-clinics"]);

const projects = CASES.map((c, idx) => ({
  slug: c.slug,
  title: c.brand,
  category: c.category,
  tags: c.tags,
  description: c.description,
  metric: c.heroMetric,
  num: String(idx + 1).padStart(2, "0"),
  size: LARGE_SLUGS.has(c.slug) ? "large" : "normal",
}));

function ProjectCard({ project, idx }: { project: typeof projects[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 22 };
  const rotateX = useTransform(useSpring(y, springCfg), [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(useSpring(x, springCfg), [-0.5, 0.5], [-5, 5]);

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

  const isLarge = project.size === "large";

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
      className={`group relative rounded-3xl overflow-hidden cursor-pointer will-change-transform ${
        isLarge ? "md:col-span-2" : ""
      }`}
    >
      <Link href={`/casos/${project.slug}`} className="block h-full">
        <div
          className="relative rounded-3xl overflow-hidden transition-all duration-500 h-full min-h-[420px]"
          style={{
            backgroundColor: hovered ? PALETTE.accent : PALETTE.bgWhite,
            boxShadow: hovered
              ? "0 30px 70px -20px rgba(224, 78, 44, 0.40), 0 0 0 1px rgba(224, 78, 44, 0.20)"
              : "0 12px 32px -12px rgba(26, 24, 21, 0.10), 0 0 0 1px rgba(26, 24, 21, 0.06)",
          }}
        >
          {/* Pattern */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${
                hovered ? "rgba(251,248,241,0.18)" : "rgba(26,24,21,0.05)"
              } 1.5px, transparent 0)`,
              backgroundSize: "18px 18px",
              opacity: hovered ? 1 : 0.65,
            }}
          />

          {/* Big italic number */}
          <div
            className="absolute top-5 right-7 select-none leading-none pointer-events-none transition-all duration-500"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontSize: "5rem",
              fontWeight: 300,
              color: hovered ? "rgba(251, 248, 241, 0.55)" : PALETTE.accent,
              opacity: hovered ? 0.7 : 0.4,
            }}
          >
            {project.num}
          </div>

          <div className="relative z-10 p-7 lg:p-9 h-full flex flex-col">
            {/* Category badge */}
            <div className="mb-6">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 rounded-full inline-block transition-all duration-500"
                style={{
                  backgroundColor: hovered ? PALETTE.bgWhite : PALETTE.accentSoft,
                  color: PALETTE.accent,
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-display font-semibold text-xl lg:text-2xl leading-tight mb-3 transition-colors duration-500"
              style={{ color: hovered ? PALETTE.bgWhite : PALETTE.text }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-6 transition-colors duration-500"
              style={{
                color: hovered
                  ? "rgba(251, 248, 241, 0.85)"
                  : PALETTE.textMuted,
              }}
            >
              {project.description.substring(0, 140)}...
            </p>

            {/* Metric */}
            <div
              className="mt-auto pt-5 border-t flex items-center justify-between transition-all duration-500"
              style={{
                borderColor: hovered
                  ? "rgba(251, 248, 241, 0.25)"
                  : PALETTE.hairline,
              }}
            >
              <div
                className="font-display font-bold text-xl lg:text-2xl leading-none transition-colors duration-500"
                style={{ color: hovered ? PALETTE.bgWhite : PALETTE.accent }}
              >
                {project.metric}
              </div>
              <ArrowUpRight
                className="w-5 h-5 transition-all"
                style={{
                  color: hovered ? PALETTE.bgWhite : PALETTE.accent,
                  transform: hovered ? "translate(3px, -3px)" : "none",
                }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Todos");

  const filtered =
    active === "Todos"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <section
      id="portafolio"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div
        aria-hidden
        className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full -z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${PALETTE.accentSoft} 0%, transparent 70%)`,
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              Cap. 05 — Casos de éxito
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: PALETTE.text }}
          >
            Transformaciones que{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              definen categorías
            </span>
            .
          </h2>
          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            Cada caso documenta el reto, la estrategia y los resultados — un
            patrón de transformación por industria. Trabajamos bajo NDA con la
            mayoría de nuestros clientes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all border-2"
              style={{
                backgroundColor: active === f ? PALETTE.accent : "transparent",
                borderColor: active === f ? PALETTE.accent : PALETTE.hairline,
                color: active === f ? PALETTE.bgWhite : PALETTE.text,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-min"
          style={{ perspective: 1500 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.slice(0, 6).map((p, idx) => (
              <ProjectCard key={p.slug} project={p} idx={idx} />
            ))}
          </AnimatePresence>
        </div>

        {/* See all */}
        <div className="mt-16 text-center">
          <Link
            href="/casos"
            className="group inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-sm rounded-full border-2 transition-colors"
            style={{
              borderColor: PALETTE.text,
              color: PALETTE.text,
            }}
          >
            Ver todos los casos
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
