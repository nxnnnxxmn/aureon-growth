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
} from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

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
    color: "from-violet-500 to-purple-600",
    accent: "violet",
  },
  {
    id: 2,
    icon: BarChart3,
    category: "performance",
    title: "Performance Marketing",
    description:
      "Campañas de conversión optimizadas por IA que generan ROI medible. Cada peso invertido trabajando al máximo.",
    tags: ["ROI Optimizado", "A/B Testing", "ROAS 10X"],
    color: "from-purple-500 to-violet-600",
    accent: "purple",
  },
  {
    id: 3,
    icon: TrendingUp,
    category: "strategy",
    title: "Growth Marketing",
    description:
      "Sistemas de crecimiento escalables que generan demanda predecible. Pipelines de adquisición que no dependen del azar.",
    tags: ["Acquisition", "Retention", "Referral"],
    color: "from-violet-600 to-indigo-600",
    accent: "indigo",
  },
  {
    id: 4,
    icon: Search,
    category: "performance",
    title: "SEO & Posicionamiento",
    description:
      "Arquitectura SEO técnica de nivel enterprise. Dominamos Google con estrategias de contenido y autoridad.",
    tags: ["Technical SEO", "Content Strategy", "Link Building"],
    color: "from-indigo-500 to-violet-600",
    accent: "violet",
  },
  {
    id: 5,
    icon: Bot,
    category: "ai",
    title: "Automatización de Marketing",
    description:
      "Flujos de trabajo automatizados que nutren, convierten y fidelizan clientes mientras duermes.",
    tags: ["Lead Nurturing", "Email Flows", "CRM Automation"],
    color: "from-violet-500 to-purple-700",
    accent: "purple",
  },
  {
    id: 6,
    icon: Cpu,
    category: "ai",
    title: "IA Aplicada al Marketing",
    description:
      "Agentes de IA que personalizan experiencias, predicen comportamientos y optimizan campañas en tiempo real.",
    tags: ["AI Agents", "Predictive", "Personalization"],
    color: "from-purple-600 to-violet-800",
    accent: "violet",
  },
  {
    id: 7,
    icon: Share2,
    category: "content",
    title: "Social Media Management",
    description:
      "Presencia social premium que construye comunidad, genera autoridad y convierte seguidores en clientes.",
    tags: ["Community Building", "Content Calendar", "Engagement"],
    color: "from-violet-500 to-purple-600",
    accent: "purple",
  },
  {
    id: 8,
    icon: Video,
    category: "content",
    title: "Producción Audiovisual",
    description:
      "Contenido cinematográfico que detiene el scroll. Videos, Reels, spots y creatividades que impactan y convierten.",
    tags: ["Video Marketing", "Reels", "Brand Films"],
    color: "from-purple-500 to-indigo-600",
    accent: "indigo",
  },
  {
    id: 9,
    icon: Filter,
    category: "performance",
    title: "Funnels de Conversión",
    description:
      "Embudos de venta diseñados con neuromarketing y psicología de persuasión para maximizar conversiones.",
    tags: ["VSL", "Webinars", "Sales Funnels"],
    color: "from-violet-600 to-purple-700",
    accent: "violet",
  },
  {
    id: 10,
    icon: Mail,
    category: "performance",
    title: "Email Marketing",
    description:
      "Secuencias de email que nutren relaciones y disparan ventas. El canal con el mayor ROI del marketing digital.",
    tags: ["Sequences", "Segmentación", "30%+ Open Rate"],
    color: "from-indigo-500 to-violet-600",
    accent: "violet",
  },
  {
    id: 11,
    icon: PenTool,
    category: "content",
    title: "Copywriting Estratégico",
    description:
      "Palabras que venden, convencen y posicionan. Copy diseñado con frameworks probados de persuasión y conversión.",
    tags: ["Sales Copy", "Brand Messaging", "Storytelling"],
    color: "from-purple-500 to-violet-700",
    accent: "purple",
  },
  {
    id: 12,
    icon: DollarSign,
    category: "performance",
    title: "Paid Media Avanzado",
    description:
      "Google Ads, Meta Ads, LinkedIn y más. Gestión premium de inversión publicitaria con resultados garantizados.",
    tags: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
    color: "from-violet-600 to-purple-800",
    accent: "violet",
  },
  {
    id: 13,
    icon: LineChart,
    category: "ai",
    title: "Analytics & Data",
    description:
      "Dashboards de inteligencia de negocio que revelan oportunidades ocultas y guían decisiones estratégicas.",
    tags: ["GA4", "Looker Studio", "BI Dashboards"],
    color: "from-purple-600 to-indigo-700",
    accent: "indigo",
  },
  {
    id: 14,
    icon: Brain,
    category: "strategy",
    title: "Neuromarketing",
    description:
      "Aplicamos ciencia del comportamiento humano para diseñar experiencias y mensajes que activan la decisión de compra.",
    tags: ["Consumer Behavior", "Cognitive Bias", "Persuasion"],
    color: "from-violet-500 to-purple-600",
    accent: "purple",
  },
  {
    id: 15,
    icon: Monitor,
    category: "tech",
    title: "Diseño UX/UI Premium",
    description:
      "Interfaces que convierten. Diseño centrado en el usuario con foco absoluto en experiencia y conversión.",
    tags: ["UI Design", "UX Research", "Prototyping"],
    color: "from-purple-500 to-violet-600",
    accent: "violet",
  },
  {
    id: 16,
    icon: Code,
    category: "tech",
    title: "Desarrollo Web",
    description:
      "Sitios web y landing pages de alta conversión. Velocidad, SEO técnico y experiencia visual de clase mundial.",
    tags: ["Next.js", "Conversion Optimized", "99 PageSpeed"],
    color: "from-violet-600 to-indigo-600",
    accent: "indigo",
  },
  {
    id: 17,
    icon: Users,
    category: "strategy",
    title: "CRM & Fidelización",
    description:
      "Ecosistemas de CRM que centralizan datos, automatizan seguimientos y maximizan el lifetime value del cliente.",
    tags: ["HubSpot", "Salesforce", "Automation"],
    color: "from-indigo-500 to-violet-700",
    accent: "violet",
  },
  {
    id: 18,
    icon: Globe,
    category: "strategy",
    title: "Estrategia Omnicanal",
    description:
      "Experiencias de marca unificadas en todos los touchpoints. Del social al email, del web al offline.",
    tags: ["Integrated Marketing", "Customer Journey", "360°"],
    color: "from-violet-500 to-purple-700",
    accent: "purple",
  },
  {
    id: 19,
    icon: Layers,
    category: "content",
    title: "Content Systems",
    description:
      "Máquinas de contenido escalables: procesos, templates y flujos que generan activos de marketing consistentes.",
    tags: ["Content Ops", "Repurposing", "Content Pillars"],
    color: "from-purple-600 to-violet-600",
    accent: "violet",
  },
  {
    id: 20,
    icon: Star,
    category: "content",
    title: "Influencer Marketing",
    description:
      "Conexiones estratégicas con creadores auténticos que amplifican tu mensaje a audiencias calificadas.",
    tags: ["Nano, Micro, Macro", "UGC", "Creator Economy"],
    color: "from-violet-500 to-purple-600",
    accent: "purple",
  },
  {
    id: 21,
    icon: ShoppingCart,
    category: "performance",
    title: "Optimización CRO",
    description:
      "Convertimos más tráfico en clientes con pruebas sistemáticas, análisis de comportamiento y optimización continua.",
    tags: ["Heatmaps", "A/B Testing", "Session Recording"],
    color: "from-purple-500 to-violet-700",
    accent: "violet",
  },
  {
    id: 22,
    icon: Workflow,
    category: "ai",
    title: "Automatización de Ventas",
    description:
      "Secuencias de venta inteligentes que califican, nutren y cierran prospectos con mínima intervención humana.",
    tags: ["Sales Automation", "Lead Scoring", "Pipeline"],
    color: "from-violet-600 to-purple-700",
    accent: "purple",
  },
  {
    id: 23,
    icon: Megaphone,
    category: "strategy",
    title: "Community Management",
    description:
      "Construcción y gestión de comunidades activas que generan embajadores de marca y evangelizan tu propuesta.",
    tags: ["Discord", "Facebook Groups", "Brand Advocates"],
    color: "from-indigo-500 to-violet-600",
    accent: "violet",
  },
  {
    id: 24,
    icon: Database,
    category: "ai",
    title: "Data Marketing",
    description:
      "Estrategias 100% basadas en datos. Audiencias personalizadas, lookalikes, señales de intención y first-party data.",
    tags: ["CDP", "First-Party Data", "Audience Intelligence"],
    color: "from-violet-500 to-purple-800",
    accent: "purple",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="servicios" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#070710]" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-64 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.6) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12">
          {/* Header */}
          <div className="text-center">
            <SectionHeader
              badge="Nuestros Servicios"
              title="Todo lo que necesitas para "
              titleHighlight="dominar tu mercado"
              description="24 disciplinas de marketing fusionadas en un sistema de crecimiento integral. Desde la estrategia hasta la ejecución, operamos como una extensión premium de tu equipo."
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-display font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-glow-violet-sm border border-violet-500/30"
                    : "glass border border-white/8 text-slate-400 hover:text-slate-200 hover:border-violet-500/25"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Services grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((service) => (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  className="group relative glass border border-white/5 rounded-2xl p-6 overflow-hidden card-hover-glow cursor-pointer"
                >
                  {/* Hover gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-violet-500/0 group-hover:border-violet-500/30 transition-all duration-300" />

                  {/* Icon */}
                  <div
                    className={`relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} mb-4 shadow-glow-violet-sm`}
                  >
                    <service.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-semibold text-white text-base mb-2.5 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/15 text-violet-400 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow on hover */}
                  <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 text-violet-400" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-400">
              ¿No sabes por dónde empezar?{" "}
              <span className="text-violet-400 font-medium">
                Agenda una consultoría estratégica gratuita.
              </span>
            </p>
            <motion.a
              href="#contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-display font-semibold rounded-xl btn-glow"
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
