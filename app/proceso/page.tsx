import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import PageHeader from "@/components/ui/PageHeader";
import { PROCESS } from "@/lib/growth";

export const metadata: Metadata = {
  title: "Proceso · Cómo trabajamos",
  description:
    "El proceso de trabajo de Aureon Growth Services: diagnóstico, blueprint estratégico, implementación, lanzamiento, optimización y escalamiento.",
  alternates: { canonical: "https://aureongrowth.com/proceso" },
  openGraph: {
    title: "Proceso | Aureon Growth Services",
    description: "De diagnóstico a escalamiento, paso a paso.",
    url: "https://aureongrowth.com/proceso",
    type: "article",
  },
};

const PALETTE = {
  bg: "#F5F1E8",
  bgWhite: "#FBF8F1",
  bgAlt: "#EFE9DB",
  text: "#1A1815",
  textMuted: "#6B655E",
  textSoft: "#9A938A",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  gold: "#C9A961",
  hairline: "rgba(26,24,21,0.10)",
};

export default function ProcesoPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Proceso de trabajo"
        title={
          <>
            Un proceso claro, de{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}>
              diagnóstico a escalamiento
            </span>
            .
          </>
        }
        description="Cada fase define qué hacemos, qué recibes y qué decisión te permite tomar. Sin pasos genéricos ni cajas negras."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Proceso" }]}
      />

      <main style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}>
        <section className="max-w-[1100px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="space-y-5">
            {PROCESS.map((step) => (
              <div
                key={step.n}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-3xl p-7 lg:p-9"
                style={{ backgroundColor: PALETTE.bgWhite, border: `1px solid ${PALETTE.hairline}` }}
              >
                <div className="lg:col-span-4 flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: PALETTE.accent }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: PALETTE.bgWhite }} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] tabular-nums mb-1" style={{ color: PALETTE.gold }}>
                      Fase {step.n}
                    </div>
                    <h2 className="font-display font-semibold text-xl leading-tight" style={{ color: PALETTE.text }}>
                      {step.title}
                    </h2>
                    <div
                      className="inline-block mt-2 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]"
                      style={{ backgroundColor: PALETTE.accentSoft, color: PALETTE.accent }}
                    >
                      {step.duration}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 grid sm:grid-cols-3 gap-5">
                  <Detail label="Qué hacemos" value={step.what} />
                  <Detail label="Qué recibes" value={step.deliverable} />
                  <Detail label="Qué decides" value={step.decision} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: PALETTE.accent, color: PALETTE.bgWhite, boxShadow: "0 14px 36px -10px rgba(224,78,44,0.45)" }}
            >
              Empezar por el diagnóstico
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1.5" style={{ color: PALETTE.gold }}>
        {label}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: PALETTE.textMuted }}>
        {value}
      </p>
    </div>
  );
}
