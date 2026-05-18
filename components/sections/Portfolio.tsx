"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

const filters = ["Todos", "Branding", "Web", "Performance", "Contenido", "IA"];

const projects = [
  {
    id: 1,
    title: "ReachMore SaaS",
    category: "Performance",
    tags: ["Performance", "Web"],
    description: "Plataforma B2B que escaló de 0 a $2M ARR con estrategia de growth y paid media.",
    metric: "+2,400% MQL",
    bg: "from-violet-900/50 to-purple-950/80",
    accentBg: "#7c3aed",
    size: "large",
  },
  {
    id: 2,
    title: "Natura Cosméticos",
    category: "Branding",
    tags: ["Branding", "Contenido"],
    description: "Rebranding completo y estrategia de contenido que triplicó el engagement.",
    metric: "3X Engagement",
    bg: "from-purple-900/50 to-violet-950/80",
    accentBg: "#6d28d9",
    size: "normal",
  },
  {
    id: 3,
    title: "FinFlow App",
    category: "IA",
    tags: ["IA", "Web", "Performance"],
    description: "Sistema de automatización con IA que redujo el CPA en 71% en 45 días.",
    metric: "-71% CPA",
    bg: "from-indigo-900/50 to-violet-950/80",
    accentBg: "#4c1d95",
    size: "normal",
  },
  {
    id: 4,
    title: "Urban Threads",
    category: "Contenido",
    tags: ["Contenido", "Branding"],
    description: "Identidad visual y sistema de contenido para marca de moda emergente.",
    metric: "500K → 2M seguidores",
    bg: "from-violet-950/80 to-purple-900/50",
    accentBg: "#7c3aed",
    size: "normal",
  },
  {
    id: 5,
    title: "MedPro Clinics",
    category: "Web",
    tags: ["Web", "Performance"],
    description: "Desarrollo web + SEO técnico que posicionó 80 keywords en top 3 de Google.",
    metric: "80 Keywords #1-3",
    bg: "from-purple-950/80 to-indigo-900/50",
    accentBg: "#6d28d9",
    size: "large",
  },
  {
    id: 6,
    title: "EduVerse Platform",
    category: "IA",
    tags: ["IA", "Performance", "Web"],
    description: "Funnels inteligentes con personalización IA que cuadruplicaron la conversión.",
    metric: "4X Conversión",
    bg: "from-violet-900/60 to-purple-950/80",
    accentBg: "#7c3aed",
    size: "normal",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("Todos");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered =
    active === "Todos"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="portafolio" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#070710]" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute top-1/2 left-0 w-96 h-96 opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-14">
          {/* Header */}
          <div className="flex flex-col items-center">
            <SectionHeader
              badge="Portafolio"
              title="Proyectos que "
              titleHighlight="definen categorías"
              description="Cada proyecto es una historia de transformación. Aquí, algunas de las marcas que llevamos de la ambición a los resultados."
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2.5 rounded-xl text-sm font-display font-medium transition-all duration-300 ${
                  active === f
                    ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-glow-violet-sm"
                    : "glass border border-white/8 text-slate-400 hover:text-slate-200 hover:border-violet-500/25"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {f}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer group ${
                    project.size === "large" ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                  style={{ minHeight: "280px" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  onHoverStart={() => setHovered(project.id)}
                  onHoverEnd={() => setHovered(null)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.bg}`} />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle at 70% 30%, ${project.accentBg}60, transparent 60%)`,
                    }}
                  />

                  {/* Grid pattern */}
                  <div className="absolute inset-0 grid-bg opacity-30" />

                  {/* Border */}
                  <div className="absolute inset-0 border border-violet-500/20 rounded-3xl group-hover:border-violet-400/50 transition-colors duration-300" />

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-violet-600/10 backdrop-blur-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hovered === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-7 h-full flex flex-col justify-between" style={{ minHeight: "280px" }}>
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <span className="px-3 py-1.5 rounded-xl bg-violet-500/20 border border-violet-500/20 text-violet-300 text-xs font-display font-medium">
                        {project.category}
                      </span>
                      <motion.div
                        className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: hovered === project.id ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>

                    {/* Bottom */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-display font-bold text-xl text-white mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-300/80 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span
                          className="font-display font-black text-2xl"
                          style={{ color: project.accentBg }}
                        >
                          {project.metric}
                        </span>
                        <motion.button
                          className="flex items-center gap-1.5 text-sm text-violet-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Ver caso
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div className="text-center">
            <motion.a
              href="#contacto"
              className="inline-flex items-center gap-3 px-7 py-3.5 glass border border-violet-500/25 text-violet-300 font-display font-medium rounded-xl hover:border-violet-400/50 hover:bg-violet-500/10 transition-all"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver todos los proyectos
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
