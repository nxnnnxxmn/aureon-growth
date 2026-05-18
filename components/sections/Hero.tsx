"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import ParticleField from "@/components/common/ParticleField";
import AnimatedCounter from "@/components/common/AnimatedCounter";

const metrics = [
  {
    icon: TrendingUp,
    value: 400,
    suffix: "%",
    label: "ROI Promedio",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Users,
    value: 850,
    suffix: "+",
    label: "Marcas Transformadas",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: DollarSign,
    value: 50,
    suffix: "M+",
    label: "Ingresos Generados",
    prefix: "$",
    color: "from-violet-600 to-indigo-600",
  },
  {
    icon: Star,
    value: 98,
    suffix: "%",
    label: "Satisfacción",
    color: "from-purple-600 to-violet-500",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-100" />

      {/* Particles */}
      <div className="absolute inset-0">
        <ParticleField count={80} />
      </div>

      {/* Glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, rgba(109,40,217,0.08) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.8) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-20 pb-20"
        style={{ y, opacity }}
      >
        <div className="flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <motion.div
            className="flex items-center gap-2 px-5 py-2 rounded-full glass-violet border border-violet-500/25"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            <span className="text-sm font-display font-medium text-violet-300 tracking-wide">
              Agencia Premium de Marketing Digital con IA
            </span>
            <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-semibold">
              NEW 2025
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-3">
            <motion.h1
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Transformamos
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-white">Marcas en </span>
                <span className="relative inline-block">
                  <span className="gradient-text">Imperios</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-violet-500 to-purple-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
              </motion.span>
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Digitales
              </motion.span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            className="max-w-2xl text-lg sm:text-xl text-slate-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            Fusionamos estrategia, tecnología e inteligencia artificial para catapultar tu marca
            al liderazgo digital. No somos una agencia típica — somos el sistema de crecimiento
            más avanzado del mercado.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <motion.a
              href="#contacto"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-display font-semibold text-lg rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  "0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">Iniciar Proyecto Ahora</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </motion.a>

            <motion.a
              href="#portafolio"
              className="inline-flex items-center gap-3 px-8 py-4 glass border border-violet-500/25 text-slate-200 font-display font-medium text-lg rounded-2xl hover:border-violet-400/50 hover:bg-violet-500/10 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver Casos de Éxito
            </motion.a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2.5">
                {["A", "B", "C", "D", "E"].map((l, i) => (
                  <div
                    key={l}
                    className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, hsl(${260 + i * 15}, 70%, 55%), hsl(${280 + i * 15}, 65%, 45%))`,
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-400">
                <span className="text-slate-200 font-semibold">+850</span> marcas confían en nosotros
              </div>
            </div>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-sm text-slate-400 ml-1">4.9/5 en Google</span>
            </div>
          </motion.div>
        </div>

        {/* Metrics floating cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="glass-violet border border-violet-500/15 rounded-2xl p-5 group hover:border-violet-400/40 transition-all duration-300"
              style={{
                animationDelay: `${i * 1.5}s`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(139,92,246,0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${m.color} bg-opacity-20 mb-3`}>
                <m.icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-display font-black text-3xl text-white mb-1">
                <AnimatedCounter
                  end={m.value}
                  prefix={m.prefix || ""}
                  suffix={m.suffix}
                />
              </div>
              <div className="text-sm text-slate-400 font-medium">{m.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-violet-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
