"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Clock,
  Mail,
  Instagram,
  Linkedin,
} from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import ParticleField from "@/components/common/ParticleField";

const nextSteps = [
  {
    icon: Mail,
    title: "Revisa tu correo",
    description:
      "Te enviamos una confirmación con el resumen de tu solicitud. Si no la encuentras, revisa la carpeta de promociones o spam.",
  },
  {
    icon: Clock,
    title: "Esperamos máximo 24h",
    description:
      "Un consultor senior revisará tu caso y te contactará con un diagnóstico inicial y propuesta personalizada.",
  },
  {
    icon: MessageCircle,
    title: "¿Algo urgente?",
    description:
      "Escríbenos directamente por WhatsApp y agendamos una llamada hoy mismo si tu proyecto tiene un timing crítico.",
  },
];

export default function GraciasPage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 opacity-40">
        <ParticleField count={50} />
      </div>
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse, rgba(106,58,168,0.2) 0%, rgba(61,29,114,0.06) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-3xl w-full">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 to-plum mb-8 shadow-glow-violet"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
              <span className="text-white">¡Solicitud </span>
              <span className="gradient-text">recibida</span>
              <span className="text-white">! ✨</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Gracias por confiar en Aureon Growth. Tu solicitud ya está siendo
              revisada por nuestro equipo de estrategia.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="card-premium rounded-3xl p-7 sm:p-10 mb-8"
          >
            <h2 className="font-display font-bold text-xl text-white mb-6 text-center">
              ¿Qué sigue ahora?
            </h2>
            <div className="space-y-5">
              {nextSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-violet-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href={waLink("urgent")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25d366] hover:bg-[#22c55e] text-white font-display font-semibold rounded-xl transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              Hablar ahora por WhatsApp
            </a>
            <Link
              href="/"
              className="group flex items-center justify-center gap-2 px-7 py-3.5 glass border border-violet-500/25 text-slate-200 font-display font-medium rounded-xl hover:border-violet-400/50 hover:bg-violet-500/10 transition-all w-full sm:w-auto"
            >
              Volver al inicio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 text-center"
          >
            <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
              Mientras esperas, conéctate con nosotros
            </p>
            <div className="flex items-center justify-center gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com/aureongrowth", label: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com/company/aureongrowth", label: "LinkedIn" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass border border-white/8 rounded-xl flex items-center justify-center text-slate-400 hover:text-violet-300 hover:border-violet-500/40 transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
