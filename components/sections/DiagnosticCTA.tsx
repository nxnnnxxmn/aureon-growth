"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

const PALETTE = {
  bg: "#1A1815",
  text: "#FBF8F1",
  textMuted: "rgba(251, 248, 241, 0.70)",
  accent: "#E04E2C",
  gold: "#C9A961",
  hairline: "rgba(251, 248, 241, 0.14)",
};

export default function DiagnosticCTA() {
  return (
    <section
      id="diagnostico"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(224,78,44,0.16) 0%, transparent 60%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${PALETTE.gold} 1px, transparent 0)`,
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="inline-block font-mono text-xs uppercase tracking-[0.28em] mb-6"
            style={{ color: PALETTE.gold }}
          >
            Siguiente paso
          </span>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: PALETTE.text }}
          >
            Tu empresa no necesita más tácticas aisladas. Necesita un{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: PALETTE.gold,
              }}
            >
              sistema de crecimiento
            </span>
            .
          </h2>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: PALETTE.textMuted }}
          >
            Un diagnóstico estratégico para revisar cómo conectar marca,
            adquisición, automatización y ventas en un solo sistema medible.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/diagnostico"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: PALETTE.accent,
                color: PALETTE.text,
                boxShadow: "0 14px 36px -10px rgba(224,78,44,0.5)",
              }}
            >
              Solicitar diagnóstico estratégico
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={waLink("default")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-display font-semibold text-sm transition-colors"
              style={{ border: `1.5px solid ${PALETTE.hairline}`, color: PALETTE.text }}
            >
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </a>
          </div>

          <p className="mt-6 text-sm" style={{ color: "rgba(251,248,241,0.45)" }}>
            Diagnóstico inicial sin compromiso · respuesta en menos de 24 horas hábiles.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
