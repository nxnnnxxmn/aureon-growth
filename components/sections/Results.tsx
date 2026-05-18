"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, BarChart2, Zap, Target } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import AnimatedCounter from "@/components/common/AnimatedCounter";

const stats = [
  {
    icon: TrendingUp,
    value: 400,
    suffix: "%",
    label: "ROI Promedio",
    description: "Retorno sobre inversión generado para clientes en los últimos 12 meses",
    color: "from-violet-500 to-purple-600",
    barWidth: "85%",
  },
  {
    icon: DollarSign,
    value: 50,
    suffix: "M",
    prefix: "$",
    label: "Revenue Generado",
    description: "Ingresos directamente atribuibles a nuestras estrategias para clientes",
    color: "from-purple-500 to-violet-700",
    barWidth: "92%",
  },
  {
    icon: Users,
    value: 12,
    suffix: "M+",
    label: "Leads Generados",
    description: "Prospectos calificados entregados a los equipos de ventas de nuestros clientes",
    color: "from-violet-600 to-indigo-600",
    barWidth: "78%",
  },
  {
    icon: BarChart2,
    value: 850,
    suffix: "+",
    label: "Marcas Transformadas",
    description: "Empresas que escalaron con nuestros sistemas de crecimiento",
    color: "from-indigo-500 to-violet-600",
    barWidth: "95%",
  },
  {
    icon: Zap,
    value: 98,
    suffix: "%",
    label: "Satisfacción",
    description: "Tasa de satisfacción y retención de clientes en toda la agencia",
    color: "from-violet-500 to-purple-800",
    barWidth: "98%",
  },
  {
    icon: Target,
    value: 3.8,
    suffix: "X",
    label: "Crecimiento Promedio",
    description: "Multiplicador de crecimiento en tráfico orgánico durante el primer año",
    color: "from-purple-600 to-violet-700",
    barWidth: "76%",
    decimals: 1,
  },
];

const caseHighlights = [
  {
    brand: "TechCorp LATAM",
    industry: "SaaS B2B",
    result: "+1,200% en MRR",
    period: "8 meses",
    metric: "MRR",
    growth: "+1,200%",
    services: ["Growth Marketing", "Paid Media", "CRO"],
    color: "from-violet-600 to-purple-700",
  },
  {
    brand: "Moda Premium SA",
    industry: "E-commerce Fashion",
    result: "ROAS 18X",
    period: "60 días",
    metric: "ROAS",
    growth: "18X",
    services: ["Meta Ads", "Google Ads", "Email Marketing"],
    color: "from-purple-600 to-violet-800",
  },
  {
    brand: "Fintech Uno",
    industry: "Finanzas",
    result: "-68% CPA",
    period: "3 meses",
    metric: "CPA",
    growth: "-68%",
    services: ["Performance", "Automation", "Analytics"],
    color: "from-violet-700 to-indigo-700",
  },
];

export default function Results() {
  return (
    <section id="resultados" className="relative py-32 overflow-hidden bg-background">
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Glow */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,1) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {/* Header */}
          <div className="flex flex-col items-center">
            <SectionHeader
              badge="Resultados Reales"
              title="Números que "
              titleHighlight="hablan por sí solos"
              description="No vendemos promesas — entregamos métricas. Estos son los resultados reales que hemos generado para nuestros clientes en los últimos 7 años."
            />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-violet border border-violet-500/15 rounded-2xl p-7 space-y-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: "rgba(139,92,246,0.35)" }}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-glow-violet-sm`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                </div>

                <div>
                  <div className="font-display font-black text-5xl gradient-text mb-1">
                    <AnimatedCounter
                      end={s.value}
                      prefix={s.prefix || ""}
                      suffix={s.suffix}
                      decimals={s.decimals || 0}
                    />
                  </div>
                  <div className="font-display font-semibold text-white text-lg">{s.label}</div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Percentil de la industria</span>
                    <span className="text-violet-400 font-medium">{s.barWidth}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: s.barWidth }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Case highlights */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-2xl text-white text-center">
              Casos de Éxito Destacados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseHighlights.map((c, i) => (
                <motion.div
                  key={c.brand}
                  className="relative overflow-hidden rounded-2xl border border-violet-500/20 p-6 group cursor-pointer"
                  style={{ background: "rgba(12,12,20,0.8)" }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-8 transition-opacity duration-500`} />

                  {/* Top tag */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {c.industry}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
                      {c.period}
                    </span>
                  </div>

                  {/* Brand */}
                  <div className="font-display font-bold text-xl text-white mb-1">{c.brand}</div>

                  {/* Big metric */}
                  <div className={`font-display font-black text-5xl bg-gradient-to-r ${c.color} bg-clip-text text-transparent mb-5`}>
                    {c.growth}
                  </div>
                  <div className="text-sm text-slate-400 mb-5">{c.result}</div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1.5">
                    {c.services.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/15 text-violet-400 text-xs"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
