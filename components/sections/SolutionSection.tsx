"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const PALETTE = {
  bg: "#1A1815",
  text: "#FBF8F1",
  textMuted: "rgba(251, 248, 241, 0.70)",
  textSoft: "rgba(251, 248, 241, 0.45)",
  accent: "#E04E2C",
  gold: "#C9A961",
  hairline: "rgba(251, 248, 241, 0.12)",
};

const pillars = [
  { k: "Brand", v: "Posicionamiento claro y diferenciado." },
  { k: "Acquisition", v: "Adquisición medible y calificada." },
  { k: "Automation", v: "Seguimiento comercial sin fricciones." },
  { k: "Intelligence", v: "Decisiones basadas en datos reales." },
];

export default function SolutionSection() {
  return (
    <section
      id="solucion"
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      {/* Decorative radial glow */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(224,78,44,0.18) 0%, transparent 60%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(201,169,97,0.10) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — copy */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10" style={{ backgroundColor: PALETTE.gold }} />
              <span
                className="font-mono text-xs uppercase tracking-[0.28em]"
                style={{ color: PALETTE.gold }}
              >
                Nuestra solución
              </span>
            </div>

            <h2
              className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-8"
              style={{ color: PALETTE.text }}
            >
              Una firma de growth para convertir{" "}
              <span
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  color: PALETTE.gold,
                }}
              >
                marca, adquisición y automatización
              </span>{" "}
              en crecimiento medible.
            </h2>

            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: PALETTE.textMuted }}
            >
              Aureon Growth Services no vende tácticas aisladas. Unimos
              estrategia de marca, performance marketing, funnels, CRM,
              automatización e inteligencia artificial para construir
              <span style={{ color: PALETTE.text }}> sistemas comerciales</span>{" "}
              que atraen, convierten y optimizan oportunidades de negocio.
            </p>

            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: PALETTE.textSoft }}
            >
              Trabajamos como un equipo extendido de tu operación: con foco en
              claridad estratégica, ejecución precisa y optimización continua.
            </p>

            <a
              href="#metodologia"
              className="inline-flex items-center gap-2 font-display font-semibold text-sm group"
              style={{ color: PALETTE.gold }}
            >
              Ver el Aureon Growth System
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* RIGHT — pillars card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl p-8 lg:p-10"
              style={{
                backgroundColor: "rgba(251, 248, 241, 0.04)",
                border: `1px solid ${PALETTE.hairline}`,
                backdropFilter: "blur(6px)",
              }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-[0.22em] mb-6"
                style={{
                  backgroundColor: "rgba(224, 78, 44, 0.12)",
                  color: PALETTE.accent,
                }}
              >
                <Sparkles className="w-3 h-3" />
                Aureon Growth System
              </div>

              <h3
                className="font-display font-semibold text-2xl lg:text-3xl leading-tight mb-8"
                style={{ color: PALETTE.text }}
              >
                Cuatro pilares,{" "}
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontStyle: "italic",
                    color: PALETTE.gold,
                  }}
                >
                  un solo sistema
                </span>
                .
              </h3>

              <div className="space-y-5">
                {pillars.map((p, i) => (
                  <motion.div
                    key={p.k}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-4 pb-5 border-b last:border-b-0 last:pb-0"
                    style={{ borderColor: PALETTE.hairline }}
                  >
                    <div
                      className="font-mono text-xs tabular-nums shrink-0 mt-1"
                      style={{ color: PALETTE.gold }}
                    >
                      0{i + 1}
                    </div>
                    <div>
                      <div
                        className="font-display font-semibold text-base mb-1"
                        style={{ color: PALETTE.text }}
                      >
                        {p.k}
                      </div>
                      <div
                        className="text-sm leading-relaxed"
                        style={{ color: PALETTE.textMuted }}
                      >
                        {p.v}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
