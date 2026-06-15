"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Bot, Workflow, LineChart, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { A } from "@/lib/ui";

const tabs = [
  {
    id: "crm", label: "CRM", icon: Database,
    title: "CRM conectado a cada oportunidad",
    body: "Formularios, WhatsApp y email centralizados en un pipeline con trazabilidad por etapa.",
    rows: [
      { name: "Oportunidad · Empresa A", stage: "Calificada", tone: A.gold },
      { name: "Oportunidad · Empresa B", stage: "En propuesta", tone: A.violet },
      { name: "Oportunidad · Empresa C", stage: "Nuevo lead", tone: A.textDim },
    ],
  },
  {
    id: "ia", label: "IA", icon: Bot,
    title: "Clasificación de leads asistida por IA",
    body: "Priorización automática según señales de intención y encaje con tu oferta.",
    rows: [
      { name: "Lead score · alto", stage: "92 / 100", tone: A.positive },
      { name: "Lead score · medio", stage: "64 / 100", tone: A.gold },
      { name: "Lead score · bajo", stage: "28 / 100", tone: A.textDim },
    ],
  },
  {
    id: "automation", label: "Automatización", icon: Workflow,
    title: "Seguimiento automático sin fricción",
    body: "Flujos de WhatsApp y email que nutren cada oportunidad en el momento correcto.",
    rows: [
      { name: "Flujo · Bienvenida", stage: "Activo", tone: A.positive },
      { name: "Flujo · Nurturing 7 días", stage: "Activo", tone: A.positive },
      { name: "Flujo · Reactivación", stage: "Programado", tone: A.gold },
    ],
  },
  {
    id: "analytics", label: "Analytics", icon: LineChart,
    title: "Dashboards ejecutivos en vivo",
    body: "Métricas de negocio conectadas en tiempo real para decidir con datos.",
    rows: [
      { name: "Oportunidades / mes", stage: "Tendencia ↑", tone: A.blue },
      { name: "Costo por oportunidad", stage: "Tendencia ↓", tone: A.positive },
      { name: "Conversión por canal", stage: "En análisis", tone: A.gold },
    ],
  },
] as const;

export default function AutomationSection() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section id="automatizacion" className="relative w-full overflow-hidden py-24 lg:py-32" style={{ backgroundColor: A.bg, color: A.text }}>
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-40" />
      <div aria-hidden className="absolute -bottom-32 -left-32 w-[560px] h-[560px] rounded-full glow-blue pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: A.blue }} />
            <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.blue }}>Automatización & IA</span>
          </div>
          <h2 className="font-display font-semibold text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.06] tracking-[-0.02em] mb-6" style={{ color: A.text }}>
            Tecnología aplicada al{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>crecimiento comercial</span>.
          </h2>
          <p className="text-base lg:text-lg leading-relaxed mb-8" style={{ color: A.text2 }}>
            CRM, IA, automatización y analítica conectados en un mismo flujo para
            que ninguna oportunidad se pierda y cada decisión se base en datos.
          </p>

          <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Capacidades">
            {tabs.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className="focus-ring inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-display font-medium transition-all"
                  style={{
                    backgroundColor: isActive ? A.gold : "rgba(255,255,255,0.05)",
                    color: isActive ? A.bg : A.text2,
                    border: `1px solid ${isActive ? A.gold : A.border}`,
                  }}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>

          <Link href="/servicios/automatizacion-crm-ia" className="inline-flex items-center gap-2 font-display font-semibold text-sm group focus-ring rounded" style={{ color: A.gold }}>
            Explorar automatización e IA
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl p-2 glass border-grad">
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${A.border}` }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.18)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.18)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.18)" }} />
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: A.textDim }}>Aureon · Control Center</span>
            </div>

            <div className="p-6 lg:p-8 rounded-b-2xl min-h-[340px]" style={{ backgroundColor: A.surface }}>
              <AnimatePresence mode="wait">
                <motion.div key={tab.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(214,180,106,0.14)" }}>
                      <tab.icon className="w-5 h-5" style={{ color: A.gold }} />
                    </div>
                    <h3 className="font-display font-semibold text-lg" style={{ color: A.text }}>{tab.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-6 max-w-lg" style={{ color: A.text2 }}>{tab.body}</p>

                  <div className="space-y-3">
                    {tab.rows.map((row) => (
                      <div key={row.name} className="flex items-center justify-between gap-4 rounded-xl px-4 py-3.5" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}` }}>
                        <div className="flex items-center gap-3 min-w-0">
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: row.tone }} />
                          <span className="text-sm truncate" style={{ color: A.text }}>{row.name}</span>
                        </div>
                        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full" style={{ color: row.tone, backgroundColor: "rgba(255,255,255,0.05)" }}>{row.stage}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
