"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { A } from "@/lib/ui";

export default function DiagnosticCTA() {
  return (
    <section id="diagnostico" className="relative w-full overflow-hidden py-24 lg:py-32" style={{ backgroundColor: A.bg, color: A.text }}>
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full glow-gold pointer-events-none" />
      <div aria-hidden className="absolute inset-0 -z-0 tech-dots opacity-50" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block font-mono text-xs uppercase tracking-[0.28em] mb-6" style={{ color: A.gold }}>
            Siguiente paso
          </span>
          <h2 className="font-display font-semibold text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] mb-6" style={{ color: A.text }}>
            Tu empresa no necesita más tácticas aisladas. Necesita un{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>sistema de crecimiento</span>.
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: A.text2 }}>
            Un diagnóstico estratégico para revisar cómo conectar marca,
            adquisición, automatización y ventas en un solo sistema medible.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/diagnostico"
              className="btn-premium focus-ring w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm"
              style={{ backgroundColor: A.gold, color: A.bg, boxShadow: "0 16px 40px -12px rgba(214,180,106,0.5)" }}
            >
              Solicitar diagnóstico estratégico
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={waLink("default")}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-display font-semibold text-sm border transition-colors"
              style={{ borderColor: A.border, color: A.text }}
            >
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm" style={{ color: A.textDim }}>
            Diagnóstico inicial sin compromiso · respuesta en menos de 24 horas hábiles.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
