"use client";

import { motion } from "framer-motion";
import { Layers, Network, Gauge, FileText, ShieldCheck } from "lucide-react";
import { A } from "@/lib/ui";

const reasons = [
  { icon: Layers, title: "No vendemos tácticas aisladas", body: "Diseñamos sistemas comerciales completos, no piezas sueltas." },
  { icon: Network, title: "Integramos todo el sistema", body: "Marca, adquisición, automatización y medición como una sola máquina." },
  { icon: Gauge, title: "Foco en claridad y ejecución", body: "Estrategia accionable y optimización continua basada en datos." },
  { icon: FileText, title: "Entregables y reportes definidos", body: "Proceso transparente y reportes ejecutivos en cada etapa." },
  { icon: ShieldCheck, title: "Enfoque consultivo y honesto", body: "Aceptamos proyectos donde podemos generar impacto real." },
];

export default function WhyAureon() {
  return (
    <section id="por-que" className="relative w-full overflow-hidden py-24 lg:py-32" style={{ backgroundColor: A.bg2, color: A.text }}>
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-30" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: A.gold }} />
            <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>Por qué Aureon</span>
          </div>
          <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6" style={{ color: A.text }}>
            Confianza construida con{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>método, no con promesas</span>.
          </h2>
          <p className="text-base lg:text-lg leading-relaxed" style={{ color: A.text2 }}>
            Sin métricas infladas ni certificaciones decorativas. Nuestra
            credibilidad está en cómo trabajamos: un sistema claro, entregables
            definidos y decisiones basadas en datos.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`card-3d surface p-6 ${i === reasons.length - 1 ? "sm:col-span-2" : ""}`}
                style={{ backgroundColor: A.surface }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(214,180,106,0.12)" }}>
                  <r.icon className="w-5 h-5" style={{ color: A.gold }} strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-semibold text-base mb-2" style={{ color: A.text }}>{r.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: A.text2 }}>{r.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
