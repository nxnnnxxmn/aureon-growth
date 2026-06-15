"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  BarChart3,
  TrendingUp,
  Search,
  Bot,
  Cpu,
  Share2,
  Video,
  Filter,
  Mail,
  PenTool,
  DollarSign,
  LineChart,
  Brain,
  Monitor,
  Code,
  Users,
  Globe,
  Layers,
  Star,
  Megaphone,
  ShoppingCart,
  Workflow,
  Database,
  ArrowRight,
  ArrowUpRight,
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
  hairlineSoft: "rgba(26,24,21,0.06)",
};

const categories = [
  { id: "all", label: "Todos" },
  { id: "strategy", label: "Estrategia" },
  { id: "performance", label: "Performance" },
  { id: "content", label: "Contenido" },
  { id: "tech", label: "Tecnología" },
  { id: "ai", label: "IA & Data" },
];

const services = [
  {
    id: 1,
    icon: Palette,
    category: "strategy",
    title: "Branding Estratégico",
    description:
      "Construimos identidades de marca que dominan su categoría. Desde el posicionamiento hasta el sistema visual completo.",
    tags: ["Identidad Visual", "Brand Voice", "Posicionamiento"],
  },
  {
    id: 2,
    icon: BarChart3,
    category: "performance",
    title: "Performance Marketing",
    description:
      "Campañas de conversión optimizadas por IA que generan ROI medible. Cada peso invertido trabajando al máximo.",
    tags: ["ROI Optimizado", "A/B Testing", "ROAS 10X"],
  },
  {
    id: 3,
    icon: TrendingUp,
    category: "strategy",
    title: "Growth Marketing",
    description:
      "Sistemas de crecimiento escalables que generan demanda predecible. Pipelines de adquisición que no dependen del azar.",
    tags: ["Acquisition", "Retention", "Referral"],
  },
  {
    id: 4,
    icon: Search,
    category: "performance",
    title: "SEO & Posicionamiento",
    description:
      "Arquitectura SEO técnica de nivel enterprise. Dominamos Google con estrategias de contenido y autoridad.",
    tags: ["Technical SEO", "Content Strategy", "Link Building"],
  },
  {
    id: 5,
    icon: Bot,
    category: "ai",
    title: "Automatización de Marketing",
    description:
      "Flujos de trabajo automatizados que nutren, convierten y fidelizan clientes mientras duermes.",
    tags: ["Lead Nurturing", "Email Flows", "CRM Automation"],
  },
  {
    id: 6,
    icon: Cpu,
    category: "ai",
    title: "IA Aplicada al Marketing",
    description:
      "Agentes de IA que personalizan experiencias, predicen comportamientos y optimizan campañas en tiempo real.",
    tags: ["AI Agents", "Predictive", "Personalization"],
  },
  {
    id: 7,
    icon: Share2,
    category: "content",
    title: "Social Media Management",
    description:
      "Presencia social premium que construye comunidad, genera autoridad y convierte seguidores en clientes.",
    tags: ["Community Building", "Content Calendar", "Engagement"],
  },
  {
    id: 8,
    icon: Video,
    category: "content",
    title: "Producción Audiovisual",
    description:
      "Contenido cinematográfico que detiene el scroll. Videos, Reels, spots y creatividades que impactan y convierten.",
    tags: ["Video Marketing", "Reels", "Brand Films"],
  },
  {
    id: 9,
    icon: Filter,
    category: "performance",
    title: "Funnels de Conversión",
    description:
      "Embudos de venta diseñados con neuromarketing y psicología de persuasión para maximizar conversiones.",
    tags: ["VSL", "Webinars", "Sales Funnels"],
  },
  {
    id: 10,
    icon: Mail,
    category: "performance",
    title: "Email Marketing",
    description:
      "Secuencias de email que nutren relaciones y disparan ventas. El canal con el mayor ROI del marketing digital.",
    tags: ["Sequences", "Segmentación", "30%+ Open Rate"],
  },
  {
    id: 11,
    icon: PenTool,
    category: "content",
    title: "Copywriting Estratégico",
    description:
      "Palabras que venden, convencen y posicionan. Copy diseñado con frameworks probados de persuasión y conversión.",
    tags: ["Sales Copy", "Brand Messaging", "Storytelling"],
  },
  {
    id: 12,
    icon: DollarSign,
    category: "performance",
    title: "Paid Media Avanzado",
    description:
      "Google Ads, Meta Ads, LinkedIn y más. Gestión premium de inversión publicitaria con resultados garantizados.",
    tags: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
  },
  {
    id: 13,
    icon: LineChart,
    category: "ai",
    title: "Analytics & Data",
    description:
      "Dashboards de inteligencia de negocio que revelan oportunidades ocultas y guían decisiones estratégicas.",
    tags: ["GA4", "Looker Studio", "BI Dashboards"],
  },
  {
    id: 14,
    icon: Brain,
    category: "strategy",
    title: "Neuromarketing",
    description:
      "Aplicamos ciencia del comportamiento humano para diseñar experiencias y mensajes que activan la decisión de compra.",
    tags: ["Consumer Behavior", "Cognitive Bias", "Persuasion"],
  },
  {
    id: 15,
    icon: Monitor,
    category: "tech",
    title: "Diseño UX/UI Premium",
    description:
      "Interfaces que convierten. Diseño centrado en el usuario con foco absoluto en experiencia y conversión.",
    tags: ["UI Design", "UX Research", "Prototyping"],
  },
  {
    id: 16,
    icon: Code,
    category: "tech",
    title: "Desarrollo Web",
    description:
      "Sitios web y landing pages de alta conversión. Velocidad, SEO técnico y experiencia visual de clase mundial.",
    tags: ["Next.js", "Conversion Optimized", "99 PageSpeed"],
  },
  {
    id: 17,
    icon: Users,
    category: "strategy",
    title: "CRM & Fidelización",
    description:
      "Ecosistemas de CRM que centralizan datos, automatizan seguimientos y maximizan el lifetime value del cliente.",
    tags: ["HubSpot", "Salesforce", "Automation"],
  },
  {
    id: 18,
    icon: Globe,
    category: "strategy",
    title: "Estrategia Omnicanal",
    description:
      "Experiencias de marca unificadas en todos los touchpoints. Del social al email, del web al offline.",
    tags: ["Integrated Marketing", "Customer Journey", "360°"],
  },
  {
    id: 19,
    icon: Layers,
    category: "content",
    title: "Content Systems",
    description:
      "Máquinas de contenido escalables: procesos, templates y flujos que generan activos de marketing consistentes.",
    tags: ["Content Ops", "Repurposing", "Content Pillars"],
  },
  {
    id: 20,
    icon: Star,
    category: "content",
    title: "Influencer Marketing",
    description:
      "Conexiones estratégicas con creadores auténticos que amplifican tu mensaje a audiencias calificadas.",
    tags: ["Nano, Micro, Macro", "UGC", "Creator Economy"],
  },
  {
    id: 21,
    icon: ShoppingCart,
    category: "performance",
    title: "Optimización CRO",
    description:
      "Convertimos más tráfico en clientes con pruebas sistemáticas, análisis de comportamiento y optimización continua.",
    tags: ["Heatmaps", "A/B Testing", "Session Recording"],
  },
  {
    id: 22,
    icon: Workflow,
    category: "ai",
    title: "Automatización de Ventas",
    description:
      "Secuencias de venta inteligentes que califican, nutren y cierran prospectos con mínima intervención humana.",
    tags: ["Sales Automation", "Lead Scoring", "Pipeline"],
  },
  {
    id: 23,
    icon: Megaphone,
    category: "strategy",
    title: "Community Management",
    description:
      "Construcción y gestión de comunidades activas que generan embajadores de marca y evangelizan tu propuesta.",
    tags: ["Discord", "Facebook Groups", "Brand Advocates"],
  },
  {
    id: 24,
    icon: Database,
    category: "ai",
    title: "Data Marketing",
    description:
      "Estrategias 100% basadas en datos. Audiencias personalizadas, lookalikes, señales de intención y first-party data.",
    tags: ["CDP", "First-Party Data", "Audience Intelligence"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl p-7 overflow-hidden cursor-pointer"
      style={{
        backgroundColor: hovered ? PALETTE.accent : PALETTE.bgWhite,
        boxShadow: hovered
          ? "0 24px 60px -20px rgba(224, 78, 44, 0.38), 0 0 0 1px rgba(224, 78, 44, 0.20)"
          : "0 6px 20px -8px rgba(26, 24, 21, 0.08), 0 0 0 1px rgba(26, 24, 21, 0.06)",
        transition: "background-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${
            hovered ? "rgba(251,248,241,0.18)" : "rgba(26,24,21,0.05)"
          } 1.5px, transparent 0)`,
          backgroundSize: "18px 18px",
          opacity: hovered ? 1 : 0.6,
        }}
      />

      {/* Icon */}
      <div
        className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5 transition-all duration-500"
        style={{
          backgroundColor: hovered ? PALETTE.bgWhite : PALETTE.accent,
          transform: hovered ? "rotate(-8deg) scale(1.05)" : "rotate(0) scale(1)",
        }}
      >
        <service.icon
          className="w-6 h-6 transition-colors duration-500"
          style={{ color: hovered ? PALETTE.accent : PALETTE.bgWhite }}
        />
      </div>

      {/* Content */}
      <h3
        className="relative font-display font-semibold text-lg mb-2.5 leading-snug transition-colors duration-500"
        style={{ color: hovered ? PALETTE.bgWhite : PALETTE.text }}
      >
        {service.title}
      </h3>
      <p
        className="relative text-sm leading-relaxed mb-5 transition-colors duration-500"
        style={{
          color: hovered ? "rgba(251,248,241,0.88)" : PALETTE.textMuted,
        }}
      >
        {service.description}
      </p>

      {/* Tags */}
      <div className="relative flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-500"
            style={{
              backgroundColor: hovered
                ? "rgba(251,248,241,0.15)"
                : PALETTE.accentSoft,
              borderColor: hovered
                ? "rgba(251,248,241,0.25)"
                : "rgba(224,78,44,0.18)",
              color: hovered ? PALETTE.bgWhite : PALETTE.accent,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div
        className="absolute top-6 right-6 transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translate(0,0)" : "translate(-4px, 4px)",
        }}
      >
        <ArrowUpRight className="w-5 h-5" style={{ color: PALETTE.bgWhite }} />
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section
      id="servicios"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: PALETTE.bgAlt, color: PALETTE.text }}
    >
      {/* Decorative soft blobs */}
      <div
        aria-hidden
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full -z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${PALETTE.accentSoft} 0%, transparent 70%)`,
          opacity: 0.4,
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-32 w-[440px] h-[440px] rounded-full -z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #E8DDC9 0%, transparent 70%)",
          opacity: 0.5,
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center gap-12">
          {/* Header */}
          <div className="max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span
                className="h-px w-10"
                style={{ backgroundColor: PALETTE.accent }}
              />
              <span
                className="font-mono text-xs uppercase tracking-[0.28em]"
                style={{ color: PALETTE.accent }}
              >
                Cap. 03 — Servicios
              </span>
              <span
                className="h-px w-10"
                style={{ backgroundColor: PALETTE.accent }}
              />
            </div>
            <h2
              className="font-display font-semibold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ color: PALETTE.text }}
            >
              Todo lo que necesitas para{" "}
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  color: PALETTE.accent,
                }}
              >
                dominar tu mercado
              </span>
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: PALETTE.textMuted }}
            >
              24 disciplinas de marketing fusionadas en un sistema de
              crecimiento integral. Desde la estrategia hasta la ejecución,
              operamos como una extensión premium de tu equipo.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-5 py-2.5 rounded-full text-sm font-display font-medium border transition-all duration-300"
                  style={{
                    backgroundColor: active ? PALETTE.accent : PALETTE.bgWhite,
                    color: active ? PALETTE.bgWhite : PALETTE.textMuted,
                    borderColor: active ? PALETTE.accent : PALETTE.hairline,
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {cat.label}
                </motion.button>
              );
            })}
          </div>

          {/* Services grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6 w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <motion.div
            className="text-center space-y-5 mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p style={{ color: PALETTE.textMuted }} className="text-lg">
              ¿No sabes por dónde empezar?{" "}
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  color: PALETTE.accent,
                }}
              >
                Agenda una consultoría estratégica gratuita.
              </span>
            </p>
            <motion.a
              href="#contacto"
              className="inline-flex items-center gap-3 px-8 py-4 font-display font-semibold rounded-full"
              style={{
                backgroundColor: PALETTE.accent,
                color: PALETTE.bgWhite,
                boxShadow: "0 14px 36px -10px rgba(224, 78, 44, 0.45)",
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Quiero una estrategia personalizada
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
