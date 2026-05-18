"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle, Calendar, MessageCircle } from "lucide-react";
import ParticleField from "@/components/common/ParticleField";

const benefits = [
  "Consultoría estratégica gratuita (60 min)",
  "Diagnóstico digital sin costo",
  "Propuesta personalizada en 48 horas",
  "Sin contratos de permanencia mínima",
  "Resultados medibles desde el primer mes",
  "Equipo senior asignado exclusivamente",
];

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contacto" className="relative py-32 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#040408]" />
      <div className="absolute inset-0 opacity-70">
        <ParticleField count={60} />
      </div>
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Large central glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, rgba(109,40,217,0.1) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-12">
          {/* Badge */}
          <motion.div
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/15 border border-violet-500/25"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            <span className="text-sm text-violet-300 font-display font-medium">
              Solo 3 plazas disponibles este mes
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight">
              <span className="text-white">¿Listo para ser el </span>
              <span className="gradient-text">líder</span>
              <br />
              <span className="text-white">de tu industria?</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Las marcas que dominan su mercado no esperan el momento perfecto — lo crean.
              Agenda una sesión estratégica y descubre exactamente cómo multiplicaremos tu crecimiento.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <CheckCircle className="w-4 h-4 text-violet-400 shrink-0" />
                <span className="text-sm text-slate-300 font-medium text-left">{b}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Actions */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.a
              href="https://calendly.com/lancherosstudio"
              className="group relative flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-display font-semibold text-lg rounded-2xl overflow-hidden w-full"
              style={{
                boxShadow:
                  "0 0 40px rgba(139,92,246,0.4), 0 0 80px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Calendar className="w-5 h-5" />
              <span>Agendar Consultoría Gratuita</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </motion.a>

            <motion.a
              href="https://wa.me/573000000000"
              className="flex items-center justify-center gap-2.5 px-7 py-4 glass border border-violet-500/25 text-slate-200 font-display font-medium text-lg rounded-2xl hover:border-violet-400/50 hover:bg-violet-500/10 transition-all w-full sm:w-auto whitespace-nowrap"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              WhatsApp
            </motion.a>
          </motion.div>

          {/* Email quick capture */}
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="text-sm text-slate-500 mb-3">
                  O déjanos tu email y te contactamos en menos de 2 horas
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@empresa.com"
                    required
                    className="flex-1 px-5 py-3 glass border border-white/10 rounded-xl text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all"
                  />
                  <motion.button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-display font-medium text-sm rounded-xl btn-glow whitespace-nowrap"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Enviar
                  </motion.button>
                </div>
              </form>
            ) : (
              <motion.div
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">¡Recibido! Te contactamos pronto.</span>
              </motion.div>
            )}
          </motion.div>

          {/* Trust signal */}
          <motion.p
            className="text-sm text-slate-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Sin spam. Sin compromisos. Solo conversaciones que transforman marcas.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
