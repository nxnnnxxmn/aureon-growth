"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, LayoutGrid, Workflow, TrendingUp, ArrowRight } from "lucide-react";
import { A } from "@/lib/ui";

const PHASES = [
  { n: "01", code: "Diagnostic Core", icon: Search, title: "Diagnóstico estratégico", body: "Marca, oferta, audiencia, canales, tráfico, CRM, funnel y oportunidades.", items: ["Diagnóstico de marca", "Auditoría de canales", "Mapa de oportunidades"] },
  { n: "02", code: "Growth Architecture", icon: LayoutGrid, title: "Arquitectura de crecimiento", body: "Posicionamiento, mensajes, journey, embudos, canales y objetivos.", items: ["Blueprint estratégico", "Mapa de funnel", "Plan de medición"] },
  { n: "03", code: "System Deployment", icon: Workflow, title: "Implementación del sistema", body: "Landing, campañas, automatizaciones, CRM, contenidos, tracking y dashboards.", items: ["Landing & funnels", "CRM + automatizaciones", "Dashboards en vivo"] },
  { n: "04", code: "Optimization Loop", icon: TrendingUp, title: "Optimización continua", body: "Analítica, CRO, experimentación, reportes y escalamiento.", items: ["Reportes ejecutivos", "Experimentos CRO", "Plan de escalamiento"] },
];

export default function MethodologySection({ showCta }: { showCta?: boolean }) {
  return (
    <section id="metodologia" className="relative w-full overflow-hidden py-24 lg:py-32" style={{ backgroundColor: A.bg, color: A.text }}>
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-40" />
      <div aria-hidden className="absolute -top-32 left-1/3 w-[560px] h-[560px] rounded-full glow-violet pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: A.gold }} />
            <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>Aureon Growth System</span>
          </div>
          <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6" style={{ color: A.text }}>
            Una arquitectura de crecimiento{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>en cuatro módulos</span>.
          </h2>
          <p className="text-base lg:text-lg leading-relaxed" style={{ color: A.text2 }}>
            No es una lista de pasos. Es un sistema conectado: cada módulo
            alimenta al siguiente, del diagnóstico al escalamiento.
          </p>
        </div>

        <div className="relative">
          {/* connecting rail (desktop) */}
          <div aria-hidden className="hidden lg:block absolute top-[58px] left-[10%] right-[10%] h-px" style={{ background: `linear-gradient(to right, transparent, ${A.gold} 12%, ${A.violet} 50%, ${A.gold} 88%, transparent)`, opacity: 0.5 }} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-5">
            {PHASES.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                {/* node */}
                <div className="relative z-10 mb-6 flex lg:justify-center">
                  <div
                    className="w-[78px] h-[78px] lg:w-[116px] lg:h-[116px] rounded-2xl flex items-center justify-center relative transition-all duration-400"
                    style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}
                  >
                    <p.icon className="w-7 h-7 lg:w-9 lg:h-9 transition-colors" style={{ color: A.gold }} strokeWidth={1.4} />
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full font-mono text-[10px] tabular-nums font-semibold" style={{ backgroundColor: A.gold, color: A.bg }}>{p.n}</span>
                    <span aria-hidden className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `0 0 0 1px ${A.borderActive}, 0 18px 50px -20px rgba(214,180,106,0.4)` }} />
                  </div>
                </div>

                <div className="lg:text-center">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: A.violet }}>{p.code}</div>
                  <h3 className="font-display font-semibold text-lg lg:text-xl leading-tight mb-3" style={{ color: A.text }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: A.text2 }}>{p.body}</p>
                  <div className="pt-4 border-t space-y-1.5" style={{ borderColor: A.border }}>
                    {p.items.map((d) => (
                      <div key={d} className="text-xs lg:text-[13px]" style={{ color: A.textDim }}>· {d}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {showCta && (
          <div className="mt-14 text-center">
            <Link href="/metodologia" className="focus-ring inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-semibold text-sm border transition-colors" style={{ borderColor: A.border, color: A.text }}>
              Ver metodología completa <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
