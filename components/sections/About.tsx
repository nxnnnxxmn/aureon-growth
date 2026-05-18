"use client";

import { motion } from "framer-motion";
import { Brain, Rocket, Target, Globe, CheckCircle, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import AnimatedCounter from "@/components/common/AnimatedCounter";

const values = [
  {
    icon: Brain,
    title: "Inteligencia Estratégica",
    description:
      "Fusionamos datos, psicología del consumidor y machine learning para tomar decisiones que generan ventajas competitivas reales.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Rocket,
    title: "Velocidad de Ejecución",
    description:
      "Mientras otros planifican, nosotros ejecutamos. Nuestros sistemas ágiles garantizan resultados medibles en semanas, no meses.",
    color: "from-purple-500 to-violet-700",
  },
  {
    icon: Target,
    title: "Obsesión por Resultados",
    description:
      "Cada decisión está guiada por métricas reales. No reportamos vanidad — reportamos crecimiento, revenue y posicionamiento.",
    color: "from-violet-600 to-indigo-600",
  },
  {
    icon: Globe,
    title: "Visión Global",
    description:
      "Estrategias probadas en mercados de 5 continentes, adaptadas con precisión quirúrgica a la realidad de cada marca.",
    color: "from-indigo-500 to-violet-600",
  },
];

const stats = [
  { value: 7, suffix: "+", label: "Años de trayectoria" },
  { value: 25, suffix: "+", label: "Especialistas" },
  { value: 12, suffix: "", label: "Países alcanzados" },
  { value: 98, suffix: "%", label: "Clientes fidelizados" },
];

const achievements = [
  "Certificados Google Premier Partner",
  "Meta Business Partner Oficial",
  "HubSpot Diamond Partner",
  "Top 1% agencias de crecimiento LATAM",
  "Finalistas Effie Awards 2024",
  "ISO 27001 en protección de datos",
];

export default function About() {
  return (
    <section id="nosotros" className="relative py-32 overflow-hidden bg-background">
      {/* Top gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div className="space-y-10">
            <SectionHeader
              badge="Sobre Nosotros"
              title="No somos una agencia más. Somos tu "
              titleHighlight="socio estratégico"
              description="Lancheros Studio nació con una misión clara: democratizar el acceso a estrategias de marketing de clase mundial para marcas con ambición global. Hoy, somos el equipo detrás del crecimiento de más de 850 empresas."
              align="left"
            />

            {/* Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <CheckCircle className="w-4 h-4 text-violet-400 shrink-0" />
                  <span className="text-sm text-slate-300 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#servicios"
              className="inline-flex items-center gap-3 text-violet-400 font-display font-semibold hover:text-violet-300 transition-colors group"
              whileHover={{ x: 4 }}
            >
              Conoce nuestros servicios
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Right: Cards + Stats */}
          <div className="space-y-6">
            {/* Stats row */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="glass-violet border border-violet-500/15 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="font-display font-black text-4xl gradient-text mb-2">
                    <AnimatedCounter end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-sm text-slate-400 font-medium">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Value cards */}
            <div className="space-y-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  className="glass border border-white/5 rounded-2xl p-5 flex items-start gap-4 card-hover-glow"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center shadow-glow-violet-sm`}>
                    <v.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1.5">{v.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{v.description}</p>
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
