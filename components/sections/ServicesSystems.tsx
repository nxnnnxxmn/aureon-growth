"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { GROWTH_SYSTEMS } from "@/lib/growth";
import { A } from "@/lib/ui";

// Per-system color identity — gives each card its own visual code
const SYSTEM_COLORS: Record<string, { primary: string; secondary: string; tag: string; tagBg: string }> = {
  "branding-estrategico":             { primary: A.gold,   secondary: A.goldBright, tag: A.gold,   tagBg: "rgba(214,180,106,0.14)" },
  "performance-marketing":            { primary: A.violet, secondary: "#9F84D0",    tag: "#C7B8E8", tagBg: "rgba(124,92,191,0.16)" },
  "automatizacion-crm-ia":            { primary: A.blue,   secondary: A.cyan,       tag: A.cyan,   tagBg: "rgba(79,182,199,0.14)" },
  "analitica-growth-intelligence":    { primary: A.cyan,   secondary: A.blue,       tag: A.cyan,   tagBg: "rgba(79,182,199,0.14)" },
};
const colorsFor = (slug: string) => SYSTEM_COLORS[slug] || SYSTEM_COLORS["branding-estrategico"];

/** Bespoke mini-mockup per system — gives each card its own identity. */
function SystemViz({ slug }: { slug: string }) {
  if (slug === "branding-estrategico") {
    // editorial reticle + brand blocks
    return (
      <svg viewBox="0 0 200 96" className="w-full h-24" aria-hidden>
        <g stroke={A.border} strokeWidth="1">
          <line x1="0" y1="32" x2="200" y2="32" /><line x1="0" y1="64" x2="200" y2="64" />
          <line x1="66" y1="0" x2="66" y2="96" /><line x1="133" y1="0" x2="133" y2="96" />
        </g>
        <rect x="10" y="10" width="46" height="12" rx="2" fill={A.gold} opacity="0.85" />
        <rect x="10" y="40" width="30" height="6" rx="2" fill={A.text2} opacity="0.5" />
        <rect x="76" y="40" width="48" height="16" rx="3" fill="none" stroke={A.violet} strokeWidth="1.4" />
        <circle cx="160" cy="20" r="9" fill={A.violet} opacity="0.7" />
        <rect x="143" y="72" width="46" height="6" rx="2" fill={A.gold} opacity="0.6" />
      </svg>
    );
  }
  if (slug === "performance-marketing") {
    // acquisition flow nodes
    return (
      <svg viewBox="0 0 200 96" className="w-full h-24" aria-hidden>
        <line x1="22" y1="48" x2="178" y2="48" stroke={A.gold} strokeWidth="1" strokeDasharray="3,4" opacity="0.5" />
        {[22, 70, 118, 166].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy="48" r="11" fill="none" stroke={i === 3 ? A.gold : A.violet} strokeWidth="1.6" />
            <circle cx={x} cy="48" r="4" fill={i === 3 ? A.gold : A.violet} />
          </g>
        ))}
        <polygon points="178,42 188,48 178,54" fill={A.gold} />
      </svg>
    );
  }
  if (slug === "automatizacion-crm-ia") {
    // CRM pipeline rows
    return (
      <svg viewBox="0 0 200 96" className="w-full h-24" aria-hidden>
        {[14, 38, 62].map((y, i) => (
          <g key={y}>
            <rect x="10" y={y} width="180" height="16" rx="4" fill="rgba(255,255,255,0.04)" stroke={A.border} />
            <circle cx="22" cy={y + 8} r="3" fill={[A.blue, A.gold, A.positive][i]} />
            <rect x="34" y={y + 5} width="70" height="6" rx="2" fill={A.text2} opacity="0.4" />
            <rect x="150" y={y + 4} width="30" height="8" rx="4" fill={[A.blue, A.gold, A.positive][i]} opacity="0.3" />
          </g>
        ))}
      </svg>
    );
  }
  // analitica — dashboard bars + line
  return (
    <svg viewBox="0 0 200 96" className="w-full h-24" aria-hidden>
      <line x1="10" y1="78" x2="190" y2="78" stroke={A.border} />
      {[20, 50, 80, 110, 140, 170].map((x, i) => (
        <rect key={x} x={x} y={78 - (12 + i * 9)} width="14" height={12 + i * 9} rx="2" fill={i % 2 ? A.violet : A.blue} opacity="0.55" />
      ))}
      <polyline points="20,40 60,30 100,34 140,18 180,12" fill="none" stroke={A.gold} strokeWidth="1.8" />
      {[[20,40],[100,34],[180,12]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="2.5" fill={A.gold} />)}
    </svg>
  );
}

export default function ServicesSystems() {
  return (
    <section id="sistemas" className="relative w-full overflow-hidden py-24 lg:py-32" style={{ backgroundColor: A.bg2, color: A.text }}>
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-40" />
      <div aria-hidden className="absolute -top-32 right-1/4 w-[560px] h-[560px] rounded-full glow-gold pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: A.gold }} />
            <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>Sistemas de crecimiento</span>
          </div>
          <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6" style={{ color: A.text }}>
            Cuatro sistemas que trabajan{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>como uno solo</span>.
          </h2>
          <p className="text-base lg:text-lg leading-relaxed" style={{ color: A.text2 }}>
            No vendemos servicios sueltos. Cada disciplina vive dentro de un
            sistema vendible que se integra con los demás para mover una misma
            métrica: el crecimiento comercial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {GROWTH_SYSTEMS.map((s, i) => {
            const c = colorsFor(s.slug);
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/servicios/${s.slug}`} className="card-3d surface group relative flex flex-col h-full p-7 lg:p-8 focus-ring overflow-hidden" style={{ backgroundColor: A.surface }}>
                  {/* per-system glow accent — esquina superior derecha */}
                  <div aria-hidden className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-60" style={{ background: `radial-gradient(circle, ${c.primary}26 0%, transparent 70%)` }} />

                  {/* mini mockup */}
                  <div className="relative rounded-2xl mb-6 p-4" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}` }}>
                    <SystemViz slug={s.slug} />
                  </div>

                  <div className="relative flex items-start justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: c.primary }}>{s.short}</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: A.textDim }} />
                  </div>
                  <h3 className="relative font-display font-semibold text-xl lg:text-2xl leading-tight mb-3" style={{ color: A.text }}>{s.name}</h3>
                  <p className="relative text-sm leading-relaxed mb-5" style={{ color: A.text2 }}>{s.summary}</p>

                  <div className="relative flex flex-wrap gap-1.5 mb-6">
                    {s.highlights.map((h) => (
                      <span key={h} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: c.tagBg, color: c.tag }}>{h}</span>
                    ))}
                  </div>

                  <div className="relative mt-auto pt-5 border-t flex items-center justify-between gap-3" style={{ borderColor: A.border }}>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-0.5" style={{ color: A.textDim }}>Resultado</div>
                      <div className="text-sm font-medium" style={{ color: A.text }}>{s.outcome}</div>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 text-xs font-display font-semibold" style={{ color: c.primary }}>
                      Explorar <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/servicios" className="btn-premium focus-ring inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-semibold text-sm" style={{ backgroundColor: A.gold, color: A.bg }}>
            Ver todos los servicios <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
