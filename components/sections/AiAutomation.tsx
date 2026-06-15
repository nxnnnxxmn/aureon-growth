"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Network,
  MessageSquare,
  Target,
  BarChart3,
  Workflow,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";
import AIDashboard from "@/components/sections/AIDashboard";

const PALETTE = {
  bg: "#F5F1E8",
  bgWhite: "#FBF8F1",
  bgAlt: "#EFE9DB",
  text: "#1A1815",
  textMuted: "#6B655E",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  forest: "#2D5016",
  hairline: "rgba(26,24,21,0.10)",
  hairlineSoft: "rgba(26,24,21,0.06)",
};

const agents = [
  {
    icon: MessageSquare,
    name: "Agent Conversión",
    description: "Califica leads y personaliza mensajes en tiempo real basándose en señales de comportamiento.",
    status: "Activo",
    metric: "3.2X más conversiones",
  },
  {
    icon: Target,
    name: "Agent Targeting",
    description: "Optimiza audiencias y pujas publicitarias de forma autónoma para maximizar el ROAS.",
    status: "Activo",
    metric: "ROAS +180%",
  },
  {
    icon: BarChart3,
    name: "Agent Analytics",
    description: "Analiza datos en tiempo real y genera insights accionables sin intervención humana.",
    status: "Activo",
    metric: "10X velocidad análisis",
  },
  {
    icon: Workflow,
    name: "Agent Contenido",
    description: "Genera, personaliza y publica contenido optimizado para cada canal y audiencia.",
    status: "Activo",
    metric: "100+ piezas/semana",
  },
];

const capabilities = [
  {
    icon: Brain,
    title: "Machine Learning Predictivo",
    description:
      "Modelos de ML que predicen comportamientos de compra con 87% de precisión para anticiparte a la competencia.",
  },
  {
    icon: Network,
    title: "Integración Omnicanal",
    description:
      "Conectamos todos tus canales digitales en un ecosistema unificado que aprende y se optimiza solo.",
  },
  {
    icon: Shield,
    title: "Datos Seguros y Compliance",
    description:
      "Arquitectura de datos que cumple con GDPR, CCPA y regulaciones locales. Tu data siempre protegida.",
  },
  {
    icon: Clock,
    title: "Operación 24/7/365",
    description:
      "Sistemas autónomos que trabajan sin parar, optimizando campañas incluso mientras tu equipo duerme.",
  },
  {
    icon: TrendingUp,
    title: "Aprendizaje Continuo",
    description:
      "Los agentes mejoran solos con cada interacción. Cuanto más tiempo operan, mejores resultados generan.",
  },
  {
    icon: Zap,
    title: "Velocidad de Respuesta",
    description:
      "Reacciones en milisegundos a cambios del mercado. Ajustes de pujas, creatividades y audiencias instantáneos.",
  },
];

const techStack = [
  "OpenAI GPT-4o", "Claude 3.5", "Gemini Ultra", "Vertex AI", "HubSpot AI",
  "Make.com", "Zapier", "n8n", "Segment", "Amplitude", "Mixpanel", "BigQuery",
];

export default function AiAutomation() {
  return (
    <section
      id="ia"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: PALETTE.bgAlt, color: PALETTE.text }}
    >
      {/* Decorative soft blobs */}
      <div
        aria-hidden
        className="absolute left-1/4 top-1/3 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none -z-0"
        style={{
          background: `radial-gradient(ellipse, ${PALETTE.accentSoft} 0%, transparent 65%)`,
          opacity: 0.5,
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        className="absolute right-1/4 bottom-1/4 w-[500px] h-[400px] pointer-events-none -z-0"
        style={{
          background: "radial-gradient(ellipse, #E8DDC9 0%, transparent 65%)",
          opacity: 0.6,
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="space-y-20">
          {/* Header */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
              <span
                className="font-mono text-xs uppercase tracking-[0.28em]"
                style={{ color: PALETTE.accent }}
              >
                Cap. 07 — IA & Automatización
              </span>
            </div>
            <h2
              className="font-display font-semibold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ color: PALETTE.text }}
            >
              El futuro del marketing{" "}
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  color: PALETTE.accent,
                }}
              >
                ya está aquí
              </span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: PALETTE.textMuted }}>
              Somos pioneros en la aplicación de inteligencia artificial al
              marketing digital. Nuestros agentes IA trabajan de forma autónoma
              para maximizar resultados mientras tu equipo se enfoca en
              estrategia.
            </p>
          </div>

          {/* Agents showcase */}
          <div>
            <div className="mb-10">
              <h3
                className="font-display font-bold text-2xl mb-2"
                style={{ color: PALETTE.text }}
              >
                Nuestros Agentes de IA en Acción
              </h3>
              <p style={{ color: PALETTE.textMuted }}>
                Sistemas autónomos operando 24/7 para tu crecimiento
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  className="relative rounded-3xl p-6 group overflow-hidden"
                  style={{
                    backgroundColor: PALETTE.bgWhite,
                    boxShadow:
                      "0 6px 20px -8px rgba(26, 24, 21, 0.08), 0 0 0 1px rgba(26, 24, 21, 0.06)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                >
                  {/* Status dot */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: PALETTE.forest }}
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: PALETTE.forest }}
                    >
                      {agent.status}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-[-8deg] group-hover:scale-105"
                    style={{ backgroundColor: PALETTE.accent }}
                  >
                    <agent.icon className="w-6 h-6" style={{ color: PALETTE.bgWhite }} />
                  </div>

                  <h4
                    className="font-display font-bold mb-2"
                    style={{ color: PALETTE.text }}
                  >
                    {agent.name}
                  </h4>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: PALETTE.textMuted }}
                  >
                    {agent.description}
                  </p>

                  <div
                    className="px-3 py-2 rounded-full inline-block"
                    style={{ backgroundColor: PALETTE.accentSoft }}
                  >
                    <span
                      className="text-sm font-display font-semibold"
                      style={{ color: PALETTE.accent }}
                    >
                      {agent.metric}
                    </span>
                  </div>

                  {/* Background icon */}
                  <div className="absolute -bottom-4 -right-4 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity">
                    <agent.icon className="w-24 h-24" style={{ color: PALETTE.accent }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Capabilities + Dashboard */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-5">
              <h3
                className="font-display font-bold text-3xl"
                style={{ color: PALETTE.text }}
              >
                Capacidades que{" "}
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontStyle: "italic",
                    color: PALETTE.accent,
                  }}
                >
                  redefinen el marketing
                </span>
              </h3>
              <div className="space-y-4">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.title}
                    className="flex items-start gap-4 p-5 rounded-2xl"
                    style={{
                      backgroundColor: PALETTE.bgWhite,
                      boxShadow: "0 0 0 1px rgba(26, 24, 21, 0.06)",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: PALETTE.accent }}
                    >
                      <cap.icon className="w-5 h-5" style={{ color: PALETTE.bgWhite }} />
                    </div>
                    <div>
                      <h4
                        className="font-display font-semibold mb-1"
                        style={{ color: PALETTE.text }}
                      >
                        {cap.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: PALETTE.textMuted }}
                      >
                        {cap.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI dashboard visual */}
            <AIDashboard />
          </div>

          {/* Tech stack */}
          <div className="space-y-6 text-center">
            <h3
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.textMuted }}
            >
              Stack tecnológico
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 rounded-full text-sm font-medium border"
                  style={{
                    backgroundColor: PALETTE.bgWhite,
                    borderColor: PALETTE.hairline,
                    color: PALETTE.text,
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{
                    borderColor: PALETTE.accent,
                    color: PALETTE.accent,
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
