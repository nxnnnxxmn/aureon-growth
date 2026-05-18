"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Cpu,
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
import SectionHeader from "@/components/common/SectionHeader";
import ParticleField from "@/components/common/ParticleField";

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
    <section id="ia" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#070710]" />

      {/* Particle field */}
      <div className="absolute inset-0 opacity-60">
        <ParticleField count={50} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Large glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {/* Header */}
          <div className="flex flex-col items-center">
            <SectionHeader
              badge="IA & Automatización"
              title="El futuro del marketing "
              titleHighlight="ya está aquí"
              description="Somos pioneros en la aplicación de inteligencia artificial al marketing digital. Nuestros agentes IA trabajan de forma autónoma para maximizar resultados mientras tu equipo se enfoca en estrategia."
            />
          </div>

          {/* Main feature: Agents showcase */}
          <div className="relative">
            <div className="text-center mb-10">
              <h3 className="font-display font-bold text-2xl text-white">
                Nuestros Agentes de IA en Acción
              </h3>
              <p className="text-slate-400 mt-2">Sistemas autónomos operando 24/7 para tu crecimiento</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  className="relative glass-violet border border-violet-500/20 rounded-2xl p-6 group overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6, borderColor: "rgba(139,92,246,0.5)" }}
                >
                  {/* Animated glow dot in top right */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400 font-medium">{agent.status}</span>
                  </div>

                  {/* Icon with animated ring */}
                  <div className="relative inline-flex mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center shadow-glow-violet-sm">
                      <agent.icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className="absolute -inset-1 rounded-xl border border-violet-500/30"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.2, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    />
                  </div>

                  <h4 className="font-display font-bold text-white mb-2">{agent.name}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{agent.description}</p>

                  <div className="px-3 py-2 rounded-lg bg-violet-500/15 border border-violet-500/20">
                    <span className="text-sm font-display font-semibold text-violet-300">{agent.metric}</span>
                  </div>

                  {/* Background icon */}
                  <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <agent.icon className="w-24 h-24 text-violet-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Capabilities grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-5">
              <h3 className="font-display font-bold text-3xl text-white">
                Capacidades que{" "}
                <span className="gradient-text">redefinen el marketing</span>
              </h3>
              <div className="space-y-4">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.title}
                    className="flex items-start gap-4 p-5 glass border border-white/5 rounded-2xl card-hover-glow"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center">
                      <cap.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-white mb-1">{cap.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{cap.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual: Central AI graphic */}
            <motion.div
              className="relative flex items-center justify-center h-[450px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Outer rings */}
              {[280, 220, 160].map((size, i) => (
                <motion.div
                  key={size}
                  className="absolute rounded-full border border-violet-500/20"
                  style={{ width: size, height: size }}
                  animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
                  transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                >
                  {/* Dot on ring */}
                  <div
                    className="absolute w-3 h-3 rounded-full bg-violet-500 shadow-glow-violet-sm"
                    style={{
                      top: "50%",
                      left: "0%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </motion.div>
              ))}

              {/* Core */}
              <motion.div
                className="relative w-32 h-32 rounded-full bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center shadow-glow-violet"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Bot className="w-16 h-16 text-white" />
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-2xl -z-10" />
              </motion.div>

              {/* Floating labels */}
              {[
                { label: "GPT-4o", angle: 0, radius: 160 },
                { label: "Claude", angle: 72, radius: 160 },
                { label: "ML Models", angle: 144, radius: 160 },
                { label: "Analytics", angle: 216, radius: 160 },
                { label: "Automation", angle: 288, radius: 160 },
              ].map((item) => {
                const rad = (item.angle * Math.PI) / 180;
                const x = Math.cos(rad) * item.radius;
                const y = Math.sin(rad) * item.radius;
                return (
                  <motion.div
                    key={item.label}
                    className="absolute px-3 py-1.5 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-display font-semibold whitespace-nowrap"
                    style={{
                      transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                    }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2 + item.angle / 100, repeat: Infinity }}
                  >
                    {item.label}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Tech stack */}
          <div className="space-y-6 text-center">
            <h3 className="font-display font-semibold text-slate-400 text-sm uppercase tracking-widest">
              Stack tecnológico
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 glass border border-white/8 text-slate-300 text-sm rounded-xl font-medium"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ borderColor: "rgba(139,92,246,0.4)", color: "#c4b5fd" }}
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
