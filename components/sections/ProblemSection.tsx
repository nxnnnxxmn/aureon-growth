"use client";

import { motion } from "framer-motion";
import {
  Target,
  MailWarning,
  Database,
  Compass,
  MousePointer,
  Plug,
  BarChart2,
  FileQuestion,
} from "lucide-react";

const PALETTE = {
  bg: "#FBF8F1",
  bgAlt: "#F5F1E8",
  text: "#1A1815",
  textMuted: "#6B655E",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  gold: "#C9A961",
  hairline: "rgba(26,24,21,0.10)",
};

const problems = [
  {
    icon: Target,
    title: "Campañas sin estrategia comercial",
    body: "Inversión publicitaria activa pero desconectada del pipeline real de oportunidades.",
  },
  {
    icon: MailWarning,
    title: "Leads sin seguimiento estructurado",
    body: "Contactos que entran al formulario y se pierden en bandejas, hojas de cálculo o tareas olvidadas.",
  },
  {
    icon: Database,
    title: "CRM desordenado o inexistente",
    body: "Sin trazabilidad de cada oportunidad, etapas comerciales informales y reportes manuales.",
  },
  {
    icon: Compass,
    title: "Branding sin posicionamiento",
    body: "Identidad visual cuidada pero sin un mensaje claro que diferencie a la marca en su categoría.",
  },
  {
    icon: MousePointer,
    title: "Web que no convierte",
    body: "Sitio bonito que recibe tráfico pero no captura ni califica oportunidades comerciales.",
  },
  {
    icon: Plug,
    title: "Automatizaciones desconectadas",
    body: "Herramientas dispersas, integraciones rotas y flujos que no conversan entre sí.",
  },
  {
    icon: BarChart2,
    title: "Métricas que no ayudan a decidir",
    body: "Reportes con datos de actividad, no de negocio. Sin insights accionables.",
  },
  {
    icon: FileQuestion,
    title: "Contenido sin intención comercial",
    body: "Publicaciones constantes que no nutren el funnel ni mueven oportunidades hacia decisión de compra.",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problema"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              El problema
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: PALETTE.text }}
          >
            El problema no es hacer más marketing.{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.accent,
              }}
            >
              Es no tener un sistema de crecimiento.
            </span>
          </h2>
          <p
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: PALETTE.textMuted }}
          >
            La mayoría de empresas no necesita más campañas, más posts ni más
            herramientas. Necesita conectar marca, adquisición, conversión y
            seguimiento en un único sistema comercial medible.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: PALETTE.bgAlt,
                border: `1px solid ${PALETTE.hairline}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  backgroundColor: PALETTE.accentSoft,
                  color: PALETTE.accent,
                }}
              >
                <p.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3
                className="font-display font-semibold text-base leading-snug mb-2"
                style={{ color: PALETTE.text }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: PALETTE.textMuted }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
