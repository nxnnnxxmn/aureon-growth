"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

const testimonials = [
  {
    id: 1,
    name: "Valentina Ruiz",
    role: "CEO",
    company: "ReachMore SaaS",
    avatar: "VR",
    color: "from-violet-600 to-purple-700",
    stars: 5,
    text: "Lancheros Studio no es solo una agencia — son una extensión de nuestro equipo ejecutivo. En 8 meses pasamos de $0 a $2M en ARR. Su enfoque en datos e IA es completamente diferente a lo que había visto antes.",
    metric: "+2,400% MQL",
    metricLabel: "en 8 meses",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Director de Marketing",
    company: "TechCorp LATAM",
    avatar: "CM",
    color: "from-purple-600 to-violet-800",
    stars: 5,
    text: "Triplicamos nuestro MRR en 6 meses. El equipo de Lancheros entiende el negocio a un nivel profundo que va mucho más allá del marketing convencional. Son estrategas de primer nivel con ejecución impecable.",
    metric: "3X MRR",
    metricLabel: "en 6 meses",
  },
  {
    id: 3,
    name: "Mariana López",
    role: "Fundadora",
    company: "Natura Cosméticos",
    avatar: "ML",
    color: "from-violet-500 to-indigo-600",
    stars: 5,
    text: "Trabajar con Lancheros fue transformador para nuestra marca. Pasamos de ser una empresa local a tener presencia en 5 países. Su estrategia de branding y social media es absolutamente premium.",
    metric: "5 mercados",
    metricLabel: "expansión internacional",
  },
  {
    id: 4,
    name: "Andrés Forero",
    role: "CMO",
    company: "FinFlow App",
    avatar: "AF",
    color: "from-indigo-500 to-violet-700",
    stars: 5,
    text: "Los sistemas de automatización con IA que implementaron redujeron nuestro CPA en un 71%. Ahora cerramos ventas mientras dormimos. La inversión se pagó sola en el primer mes.",
    metric: "-71% CPA",
    metricLabel: "en solo 45 días",
  },
  {
    id: 5,
    name: "Isabella Torres",
    role: "Directora General",
    company: "Urban Threads",
    avatar: "IT",
    color: "from-purple-500 to-violet-700",
    stars: 5,
    text: "La identidad visual que crearon captura perfectamente quiénes somos. Y la estrategia de contenido llevó nuestra cuenta de 500K a más de 2 millones de seguidores en 10 meses. Simplemente increíble.",
    metric: "500K → 2M",
    metricLabel: "seguidores en 10 meses",
  },
];

const brandLogos = [
  "ReachMore", "TechCorp", "FinFlow", "Natura", "Urban Threads",
  "MedPro", "EduVerse", "Fintech Uno", "Moda Premium", "Global Solutions",
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section id="testimonios" className="relative py-32 overflow-hidden bg-background">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Header */}
          <div className="flex flex-col items-center">
            <SectionHeader
              badge="Testimonios"
              title="Marcas que ya "
              titleHighlight="transformaron su futuro"
              description="No hablamos de resultados que podrían pasar — compartimos historias de éxito que ya sucedieron."
            />
          </div>

          {/* Main testimonial */}
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                className="relative glass-violet border border-violet-500/20 rounded-3xl p-8 sm:p-12"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Quote icon */}
                <div className="absolute top-8 right-8 opacity-10">
                  <Quote className="w-20 h-20 text-violet-400 fill-violet-400" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-8 font-light">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Author + Metric */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center font-display font-bold text-white text-lg shadow-glow-violet-sm`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-lg">{t.name}</div>
                      <div className="text-sm text-slate-400">
                        {t.role} — {t.company}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 px-6 py-3 rounded-2xl bg-violet-500/15 border border-violet-500/25 text-center">
                    <div className="font-display font-black text-2xl gradient-text">{t.metric}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{t.metricLabel}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-violet-500 w-8"
                        : "bg-white/20 w-4 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <motion.button
                  onClick={prev}
                  className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-violet-300 hover:border-violet-500/40 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={next}
                  className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-violet-300 hover:border-violet-500/40 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Brand logos strip */}
          <div className="space-y-6">
            <p className="text-center text-sm text-slate-500 uppercase tracking-widest font-medium">
              Marcas que confían en Lancheros Studio
            </p>
            <div className="relative overflow-hidden">
              <div
                className="flex gap-8 items-center"
                style={{
                  animation: "marquee 20s linear infinite",
                }}
              >
                {[...brandLogos, ...brandLogos].map((logo, i) => (
                  <div
                    key={`${logo}-${i}`}
                    className="shrink-0 px-6 py-3 glass border border-white/6 rounded-xl text-slate-500 font-display font-semibold text-sm whitespace-nowrap hover:text-slate-300 hover:border-violet-500/20 transition-colors"
                  >
                    {logo}
                  </div>
                ))}
              </div>
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
