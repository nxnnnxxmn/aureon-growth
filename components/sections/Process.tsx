"use client";

import { motion } from "framer-motion";
import {
  Search,
  Lightbulb,
  Palette,
  Rocket,
  Bot,
  LineChart,
  Check,
} from "lucide-react";

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

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Diagnóstico Estratégico",
    description: "Inmersión profunda en tu marca, mercado, competidores y audiencia. Identificamos oportunidades ocultas y definimos el mapa de batalla.",
    duration: "Semana 1-2",
    deliverables: ["Auditoría digital completa", "Análisis de competencia", "Buyer persona avanzado", "Oportunidades priorizadas"],
    quote: "entender antes de actuar",
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Blueprint de Crecimiento",
    description: "Diseñamos tu roadmap estratégico personalizado: canales, mensajes, embudos y KPIs alineados a tus objetivos de negocio.",
    duration: "Semana 2-3",
    deliverables: ["Estrategia 12 meses", "Arquitectura de funnels", "Plan de contenido", "KPI dashboard"],
    quote: "estrategia clara y medible",
  },
  {
    num: "03",
    icon: Palette,
    title: "Branding & Creatividad",
    description: "Construimos o refinamos tu identidad visual y verbal. Creatividades de alto impacto que diferencian y convierten.",
    duration: "Semana 3-5",
    deliverables: ["Manual de marca", "Assets creativos", "Copy estratégico", "Brandbook digital"],
    quote: "marca con presencia real",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Activación y Lanzamiento",
    description: "Ejecutamos con velocidad y precisión. Activamos canales, lanzamos campañas y desplegamos todos los activos estratégicos.",
    duration: "Semana 5-8",
    deliverables: ["Campañas en vivo", "Contenido activo", "Embudos lanzados", "Tracking configurado"],
    quote: "ejecutar con disciplina",
  },
  {
    num: "05",
    icon: Bot,
    title: "Automatización Inteligente",
    description: "Implementamos sistemas de automatización y agentes IA que trabajan 24/7 para optimizar, personalizar y escalar resultados.",
    duration: "Semana 6-10",
    deliverables: ["Flujos automatizados", "Agentes IA activos", "CRM configurado", "Lead nurturing"],
    quote: "máquina de crecimiento",
  },
  {
    num: "06",
    icon: LineChart,
    title: "Optimización y Escala",
    description: "Analizamos datos, optimizamos continuamente y escalamos lo que funciona. Ciclos de mejora que componen resultados exponenciales.",
    duration: "Mes 3+",
    deliverables: ["Reportes semanales", "A/B tests activos", "Escala de inversión", "Nuevas oportunidades"],
    quote: "siempre mejorando",
  },
];

export default function Process() {
  return (
    <section
      id="proceso"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div
        aria-hidden
        className="absolute top-0 -right-32 w-[500px] h-[500px] rounded-full -z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${PALETTE.accentSoft} 0%, transparent 70%)`,
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              Cap. 07 — Nuestro Proceso
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: PALETTE.text }}
          >
            De la visión al{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              resultado
            </span>{" "}
            en 6 etapas.
          </h2>
          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            Un proceso probado que transforma ambición en resultados medibles.
            Cada etapa diseñada para maximizar velocidad, calidad y
            escalabilidad.
          </p>
        </div>

        {/* Process timeline — vertical zigzag */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2"
            style={{ backgroundColor: PALETTE.hairline }}
          />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative mb-12 lg:mb-16 flex items-start gap-6 lg:gap-12 ${
                  isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Number dot */}
                <div
                  className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-10 w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl"
                  style={{
                    backgroundColor: PALETTE.accent,
                    color: PALETTE.bgWhite,
                    boxShadow: "0 8px 20px -6px rgba(224, 78, 44, 0.40)",
                  }}
                >
                  {step.num}
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 ml-24 lg:ml-0 ${
                    isLeft ? "lg:mr-[calc(50%+3rem)]" : "lg:ml-[calc(50%+3rem)]"
                  }`}
                >
                  <div
                    className="relative rounded-3xl p-7 lg:p-9 overflow-hidden"
                    style={{
                      backgroundColor: PALETTE.bgWhite,
                      boxShadow:
                        "0 12px 32px -12px rgba(26, 24, 21, 0.10), 0 0 0 1px rgba(26, 24, 21, 0.06)",
                    }}
                  >
                    {/* Big italic number */}
                    <div
                      aria-hidden
                      className="absolute top-3 right-6 select-none pointer-events-none leading-none"
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontStyle: "italic",
                        fontSize: "6rem",
                        fontWeight: 300,
                        color: PALETTE.accent,
                        opacity: 0.25,
                      }}
                    >
                      {step.num}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: PALETTE.accent }}
                        >
                          <step.icon
                            className="w-5 h-5"
                            style={{ color: PALETTE.bgWhite }}
                          />
                        </div>
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: PALETTE.accentSoft,
                            color: PALETTE.accent,
                          }}
                        >
                          {step.duration}
                        </span>
                      </div>

                      <h3
                        className="font-display font-semibold text-xl lg:text-2xl leading-tight mb-3"
                        style={{ color: PALETTE.text }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="text-sm lg:text-base leading-relaxed mb-5"
                        style={{ color: PALETTE.textMuted }}
                      >
                        {step.description}
                      </p>

                      {/* Entregables */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                        {step.deliverables.map((d) => (
                          <div key={d} className="flex items-center gap-2.5">
                            <span
                              className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: PALETTE.accentSoft }}
                            >
                              <Check className="w-3 h-3" style={{ color: PALETTE.accent }} />
                            </span>
                            <span
                              className="text-sm"
                              style={{ color: PALETTE.text }}
                            >
                              {d}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div
                        className="pt-3 border-t"
                        style={{ borderColor: PALETTE.hairline }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-cormorant), serif",
                            fontStyle: "italic",
                            fontWeight: 400,
                            fontSize: "0.95rem",
                            color: PALETTE.accent,
                          }}
                        >
                          &ldquo;{step.quote}&rdquo;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
