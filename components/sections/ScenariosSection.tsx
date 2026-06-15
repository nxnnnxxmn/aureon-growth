"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, PhoneOff, PenLine, MousePointer, Layers3, ArrowRight, Workflow } from "lucide-react";
import { A } from "@/lib/ui";

const scenarios = [
  { icon: Sparkles, label: "Producto fuerte · Pipeline débil", problem: "Producto sólido pero pocos leads o leads desalineados con la propuesta.", intervention: "Posicionamiento, narrativa comercial y campañas a buyer persona real.", system: "Brand Authority + Acquisition Engine", outcome: "Pipeline más calificado y conversaciones con mejor encaje." },
  { icon: PhoneOff, label: "Campañas activas · Sin CRM", problem: "Inversión activa pero sin CRM ni proceso comercial para los leads.", intervention: "CRM, automatización de seguimiento y lead scoring básico.", system: "Revenue Automation + Growth Intelligence", outcome: "Menos leads perdidos y mejor lectura de conversión por canal." },
  { icon: PenLine, label: "Mucho contenido · Sin posicionamiento", problem: "Producción constante que no construye autoridad ni mueve oportunidades.", intervention: "Posicionamiento, narrativa y contenido reorganizado por funnel.", system: "Brand Authority + Growth Intelligence", outcome: "Contenido con intención comercial y mejor reconocimiento." },
  { icon: MousePointer, label: "Web bonita · Baja conversión", problem: "Buena estética pero el sitio no captura oportunidades claras.", intervention: "Diseño a conversión, copy estratégico y tracking de eventos.", system: "Acquisition Engine + Growth Intelligence", outcome: "Mayor tasa de captura y mejor lectura del visitante." },
  { icon: Layers3, label: "Leads que no convierten", problem: "Llegan oportunidades pero se pierden por falta de seguimiento.", intervention: "Flujos por etapa, scoring y handover claro al equipo comercial.", system: "Revenue Automation", outcome: "Mejor tasa de cierre y menor tiempo a propuesta." },
  { icon: Workflow, label: "Equipo comercial · Sin automatización", problem: "Operación dependiente de procesos manuales y memoria del equipo.", intervention: "Conexión de formularios, CRM, WhatsApp, email y dashboards.", system: "Revenue Automation + Growth Intelligence", outcome: "Operación más predecible y reportes que ayudan a decidir." },
];

export default function ScenariosSection({ limit }: { limit?: number }) {
  const items = limit ? scenarios.slice(0, limit) : scenarios;
  return (
    <section id="escenarios" className="relative w-full overflow-hidden py-24 lg:py-32" style={{ backgroundColor: A.bg, color: A.text }}>
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-35" />
      <div aria-hidden className="absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full glow-blue pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: A.gold }} />
            <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>Escenarios de aplicación</span>
          </div>
          <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6" style={{ color: A.text }}>
            Casos donde Aureon{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>puede generar impacto</span>.
          </h2>
          <p className="text-base lg:text-lg leading-relaxed" style={{ color: A.text2 }}>
            Cada negocio tiene un punto de fricción distinto. Estos son los más
            recurrentes, con el sistema que activamos en cada caso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="card-3d surface p-7 lg:p-8 flex flex-col"
              style={{ backgroundColor: A.surface }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(124,92,191,0.14)" }}>
                  <s.icon className="w-5 h-5" style={{ color: A.violet }} strokeWidth={1.5} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: A.textDim }}>{s.label}</div>
              </div>
              <div className="space-y-4 flex-1">
                <Block label="Situación" value={s.problem} color={A.text} />
                <Block label="Intervención" value={s.intervention} color={A.text2} />
                <div className="rounded-xl p-3 flex items-start gap-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                  <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: A.gold }} />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: A.gold }}>Sistema activado</div>
                    <div className="font-display font-semibold text-sm leading-tight" style={{ color: A.text }}>{s.system}</div>
                  </div>
                </div>
                <Block label="Resultado esperado" value={s.outcome} color={A.text} bold />
              </div>
            </motion.div>
          ))}
        </div>

        {limit && limit < scenarios.length && (
          <div className="mt-12 text-center">
            <Link href="/casos" className="focus-ring inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-semibold text-sm border transition-colors" style={{ borderColor: A.border, color: A.text }}>
              Ver escenarios de aplicación <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <p className="text-xs text-center mt-12 max-w-2xl mx-auto" style={{ color: A.textDim }}>
          Estos escenarios describen contextos típicos. Los resultados esperados
          son cualitativos y dependen de las condiciones de cada negocio.
        </p>
      </div>
    </section>
  );
}

function Block({ label, value, color, bold }: { label: string; value: string; color: string; bold?: boolean }) {
  return (
    <div>
      <div className="font-display font-semibold text-[11px] uppercase tracking-[0.2em] mb-1.5" style={{ color: A.gold }}>{label}</div>
      <p className={`text-sm leading-relaxed ${bold ? "font-medium" : ""}`} style={{ color }}>{value}</p>
    </div>
  );
}
