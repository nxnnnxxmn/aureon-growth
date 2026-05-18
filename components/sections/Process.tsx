"use client";

import { motion } from "framer-motion";
import {
  Search,
  Lightbulb,
  Palette,
  Rocket,
  Bot,
  LineChart,
} from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Diagnóstico Estratégico",
    description:
      "Inmersión profunda en tu marca, mercado, competidores y audiencia. Identificamos oportunidades ocultas y definimos el mapa de batalla.",
    deliverables: ["Auditoría digital completa", "Análisis de competencia", "Buyer persona avanzado", "Oportunidades priorizadas"],
    color: "from-violet-500 to-purple-600",
    duration: "Semana 1-2",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Blueprint de Crecimiento",
    description:
      "Diseñamos tu roadmap estratégico personalizado: canales, mensajes, embudos y KPIs alineados a tus objetivos de negocio.",
    deliverables: ["Estrategia 12 meses", "Arquitectura de funnels", "Plan de contenido", "KPI dashboard"],
    color: "from-purple-500 to-violet-700",
    duration: "Semana 2-3",
  },
  {
    num: "03",
    icon: Palette,
    title: "Branding & Creatividad",
    description:
      "Construimos o refinamos tu identidad visual y verbal. Creatividades de alto impacto que diferencian y convierten.",
    deliverables: ["Manual de marca", "Assets creativos", "Copy estratégico", "Brandbook digital"],
    color: "from-violet-600 to-indigo-600",
    duration: "Semana 3-5",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Activación y Lanzamiento",
    description:
      "Ejecutamos con velocidad y precisión. Activamos canales, lanzamos campañas y desplegamos todos los activos estratégicos.",
    deliverables: ["Campañas en vivo", "Contenido activo", "Embudos lanzados", "Tracking configurado"],
    color: "from-indigo-500 to-violet-600",
    duration: "Semana 5-8",
  },
  {
    num: "05",
    icon: Bot,
    title: "Automatización Inteligente",
    description:
      "Implementamos sistemas de automatización y agentes IA que trabajan 24/7 para optimizar, personalizar y escalar resultados.",
    deliverables: ["Flujos automatizados", "Agentes IA activos", "CRM configurado", "Lead nurturing"],
    color: "from-violet-500 to-purple-800",
    duration: "Semana 6-10",
  },
  {
    num: "06",
    icon: LineChart,
    title: "Optimización y Escala",
    description:
      "Analizamos datos, optimizamos continuamente y escalamos lo que funciona. Ciclos de mejora que componen resultados exponenciales.",
    deliverables: ["Reportes semanales", "A/B tests activos", "Escala de inversión", "Nuevas oportunidades"],
    color: "from-purple-600 to-violet-700",
    duration: "Mes 3+",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="relative py-32 overflow-hidden bg-background">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Glow */}
      <div
        className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,1) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {/* Header */}
          <div className="flex flex-col items-center">
            <SectionHeader
              badge="Nuestro Proceso"
              title="De la visión al "
              titleHighlight="resultado en 6 etapas"
              description="Un proceso probado que transforma ambición en resultados medibles. Cada etapa está diseñada para maximizar velocidad, calidad y escalabilidad."
            />
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Vertical line for desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent -translate-x-1/2" />

            <div className="space-y-8 lg:space-y-0">
              {steps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.num}
                    className={`relative lg:flex lg:items-center lg:gap-8 ${
                      isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Card */}
                    <div className="lg:w-[calc(50%-3rem)] glass border border-white/5 rounded-2xl p-7 space-y-5 card-hover-glow mb-8 lg:mb-16">
                      {/* Header */}
                      <div className="flex items-start gap-4">
                        <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-glow-violet-sm`}>
                          <step.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-violet-400 font-display font-medium mb-1">{step.duration}</div>
                          <h3 className="font-display font-bold text-xl text-white">{step.title}</h3>
                        </div>
                      </div>

                      <p className="text-slate-400 leading-relaxed text-sm">{step.description}</p>

                      {/* Deliverables */}
                      <div className="grid grid-cols-2 gap-2">
                        {step.deliverables.map((d) => (
                          <div
                            key={d}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-500/8 border border-violet-500/10"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                            <span className="text-xs text-slate-300 font-medium">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Center node */}
                    <div className="hidden lg:flex w-24 shrink-0 items-center justify-center">
                      <motion.div
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-glow-violet font-display font-black text-white text-lg border-4 border-background z-10`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                      >
                        {step.num}
                      </motion.div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block lg:w-[calc(50%-3rem)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
