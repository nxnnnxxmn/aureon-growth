"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, TrendingUp, Zap, Brain, Target, LineChart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
  id: number;
  type: "insight" | "tip" | "data" | "motivational" | "system";
  title?: string;
  headline: string;
  body?: string;
  icon?: React.ReactNode;
  accentColor: string;
  gradient: string;
  cta?: string;
}

const posts: Post[] = [
  {
    id: 1,
    type: "insight",
    headline: "El 87% de las startups falla por falta de sistema, no por falta de producto.",
    body: "No fracasan porque sus soluciones no funcionan. Fracasan porque no saben cómo llevar eso que funciona a los clientes correctos, de forma consistente.",
    accentColor: "#c9a961",
    gradient: "from-[#0a0813] via-[#2d1b4e] to-[#0a0813]",
  },
  {
    id: 2,
    type: "tip",
    headline: "Tu marca comunica antes de que vendas",
    body: "Inviertes en ads, landing pages y sales. Pero si tu marca no es clara, todo cuesta 3x más y convierte a la mitad.\n\n¿Primer paso? Definir tu posicionamiento.",
    accentColor: "#7c5fb3",
    gradient: "from-[#1a0f2e] via-[#0a0813] to-[#1a0f2e]",
    cta: "Auditoría de marca",
  },
  {
    id: 3,
    type: "data",
    headline: "Datos que mueven negocios",
    body: "Empresas con tracking implementado: +40% mejor retorno en ads.\nEmpresas sin tracking: adivinando.",
    accentColor: "#ff7a59",
    gradient: "from-[#2d1b1a] via-[#0a0813] to-[#1a0f2e]",
  },
  {
    id: 4,
    type: "system",
    headline: "El sistema Brand Authority",
    body: "Posicionamiento → Identidad verbal → Dirección creativa → Contenido estratégico\n\nResultado: Una marca que comunica valor antes de invertir un peso en adquisición.",
    accentColor: "#c9a961",
    gradient: "from-[#0a0813] via-[#2d1b4e] to-[#0a0813]",
  },
  {
    id: 5,
    type: "motivational",
    headline: "No crezcas rápido. Crece con control.",
    body: "El crecimiento sostenible no es un sprint. Es un sistema donde cada decisión se basa en datos, no en intuición.\n\nAsí es como escalamos.",
    accentColor: "#7c5fb3",
    gradient: "from-[#1a0f2e] via-[#0a0813] to-[#1a0f2e]",
  },
  {
    id: 6,
    type: "tip",
    headline: "Leads que se enfrían = dinero que pierdes",
    body: "El 60% de los leads nunca se contactan en las primeras 48 horas.\n\nAutomatización de WhatsApp + Email scoring = leads que no se pierden.",
    accentColor: "#5a7fb8",
    gradient: "from-[#1a1f2e] via-[#0a0813] to-[#1a0f2e]",
  },
  {
    id: 7,
    type: "insight",
    headline: "Crecimiento sin medición es solo esperanza",
    body: "No es suficiente tener campañas 'activas'.\n\nNecesitas: tracking confiable → dashboards claros → decisiones basadas en datos.",
    accentColor: "#c4f54e",
    gradient: "from-[#1f2e0a] via-[#0a0813] to-[#1a0f2e]",
  },
  {
    id: 8,
    type: "system",
    headline: "El sistema Acquisition Engine",
    body: "Paid media → Funnels de conversión → Landing pages optimizadas → CRO continua\n\nResultado: Más oportunidades comerciales calificadas.",
    accentColor: "#ff7a59",
    gradient: "from-[#2d1b1a] via-[#0a0813] to-[#1a0f2e]",
  },
];

export default function InstagramCarousel() {
  const [current, setCurrent] = useState(0);
  const post = posts[current];

  const next = () => setCurrent((current + 1) % posts.length);
  const prev = () => setCurrent((current - 1 + posts.length) % posts.length);

  const getIcon = (type: string) => {
    switch (type) {
      case "insight":
        return <Brain className="w-6 h-6" />;
      case "tip":
        return <Zap className="w-6 h-6" />;
      case "data":
        return <LineChart className="w-6 h-6" />;
      case "motivational":
        return <Target className="w-6 h-6" />;
      case "system":
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <Check className="w-6 h-6" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "insight":
        return "Insight";
      case "tip":
        return "Tips";
      case "data":
        return "Data";
      case "motivational":
        return "Motivacional";
      case "system":
        return "Sistemas";
      default:
        return "Post";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      {/* Instagram-like Square Container */}
      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-gradient-to-br ${post.gradient} p-8 lg:p-12 flex flex-col justify-between`}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${post.accentColor}22`, color: post.accentColor }}
                >
                  {getIcon(post.type)}
                </div>
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: post.accentColor }}>
                  {getTypeLabel(post.type)}
                </span>
              </div>
              <div className="text-xs text-gray-500 font-mono">@aureon</div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2
                  className="text-3xl lg:text-4xl font-display font-bold leading-tight tracking-[-0.02em]"
                  style={{ color: post.accentColor }}
                >
                  {post.headline}
                </h2>
              </motion.div>

              {post.body && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm lg:text-base leading-relaxed text-gray-300 whitespace-pre-line">
                    {post.body}
                  </p>
                </motion.div>
              )}

              {post.cta && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div
                    className="inline-block px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
                    style={{ backgroundColor: post.accentColor, color: "#0a0813" }}
                  >
                    {post.cta}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom indicators */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {posts.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${i === current ? "w-6" : "w-2"}`}
                    style={{
                      backgroundColor: i === current ? post.accentColor : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-mono">
                {current + 1} / {posts.length}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prev}
          className="p-3 rounded-full border border-gray-600 hover:border-gray-400 hover:bg-gray-900 transition-all"
          aria-label="Previous post"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">Carrusel de Posts</p>
          <p className="text-sm text-gray-300 font-medium">{post.headline.substring(0, 40)}...</p>
        </div>

        <button
          onClick={next}
          className="p-3 rounded-full border border-gray-600 hover:border-gray-400 hover:bg-gray-900 transition-all"
          aria-label="Next post"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Info */}
      <div className="mt-12 text-center text-xs text-gray-500 max-w-md mx-auto">
        <p>
          8 posts premium listos para Instagram. Combina insights estratégicos, tips accionables, datos y motivación. Actualiza mensualmente según tus focos.
        </p>
      </div>
    </div>
  );
}
