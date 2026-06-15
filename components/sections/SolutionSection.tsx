"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Compass, Crosshair, Workflow, LineChart } from "lucide-react";
import { A } from "@/lib/ui";

const pillars = [
  { icon: Compass, k: "Brand", v: "Posicionamiento claro y diferenciado.", color: A.gold },
  { icon: Crosshair, k: "Acquisition", v: "Adquisición medible y calificada.", color: A.violet },
  { icon: Workflow, k: "Automation", v: "Seguimiento comercial sin fricciones.", color: A.blue },
  { icon: LineChart, k: "Intelligence", v: "Decisiones basadas en datos reales.", color: A.gold },
];

export default function SolutionSection() {
  return (
    <section id="solucion" className="relative w-full overflow-hidden py-24 lg:py-32" style={{ backgroundColor: A.bg, color: A.text }}>
      <div aria-hidden className="absolute -top-32 -right-32 w-[640px] h-[640px] rounded-full glow-gold pointer-events-none" />
      <div aria-hidden className="absolute -bottom-32 -left-32 w-[560px] h-[560px] rounded-full glow-violet pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: A.gold }} />
            <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>Nuestra solución</span>
          </div>
          <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-8" style={{ color: A.text }}>
            Una firma de growth para convertir{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>
              marca, adquisición y automatización
            </span>{" "}
            en crecimiento medible.
          </h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: A.text2 }}>
            Aureon no vende tácticas aisladas. Unimos estrategia de marca,
            performance, funnels, CRM, automatización e inteligencia artificial
            para construir <span style={{ color: A.text }}>sistemas comerciales</span> que
            atraen, convierten y optimizan oportunidades.
          </p>
          <a href="/metodologia" className="inline-flex items-center gap-2 font-display font-semibold text-sm group focus-ring rounded" style={{ color: A.gold }}>
            Ver el Aureon Growth System
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="glass border-grad rounded-3xl p-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-[0.2em] mb-6" style={{ backgroundColor: "rgba(214,180,106,0.12)", color: A.gold }}>
              <Sparkles className="w-3 h-3" />
              Aureon Growth System
            </div>
            <h3 className="font-display font-semibold text-2xl leading-tight mb-7" style={{ color: A.text }}>
              Cuatro pilares,{" "}
              <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>un solo sistema</span>.
            </h3>
            <div className="space-y-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.k}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl p-4"
                  style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}
                >
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <p.icon className="w-5 h-5" style={{ color: p.color }} />
                  </span>
                  <div>
                    <div className="font-display font-semibold text-sm" style={{ color: A.text }}>{p.k}</div>
                    <div className="text-xs leading-relaxed" style={{ color: A.text2 }}>{p.v}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
