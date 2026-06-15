import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import PageHeader from "@/components/ui/PageHeader";
import MethodologySection from "@/components/sections/MethodologySection";
import { A } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Metodología · Aureon Growth System",
  description:
    "El Aureon Growth System: metodología propietaria en cuatro fases para convertir marketing y tecnología en un sistema comercial medible.",
  alternates: { canonical: "https://aureon-growth.vercel.app/metodologia" },
  openGraph: {
    title: "Metodología | Aureon Growth Services",
    description:
      "Diagnóstico, arquitectura de crecimiento, implementación y optimización continua.",
    url: "https://aureon-growth.vercel.app/metodologia",
    type: "article",
  },
};

const PALETTE = {
  bg: A.bg2,
  text: A.text,
  textMuted: A.text2,
  accent: A.gold,
  gold: A.gold,
};

export default function MetodologiaPage() {
  return (
    <>
      <Navbar dark />
      <PageHeader
        eyebrow="Aureon Growth System"
        title={
          <>
            Una metodología que convierte marketing en un{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}>
              sistema medible
            </span>
            .
          </>
        }
        description="Cuatro fases que ordenan el crecimiento: del diagnóstico inicial al escalamiento de los canales con mejor retorno."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Metodología" }]}
      />

      <MethodologySection />

      {/* Closing CTA */}
      <section className="py-20 lg:py-28 text-center" style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}>
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <h2
            className="font-display font-semibold text-[clamp(1.75rem,4vw,2.75rem)] leading-tight mb-6"
            style={{ color: PALETTE.text }}
          >
            ¿Listo para aplicar el{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: PALETTE.gold }}>
              sistema
            </span>{" "}
            a tu empresa?
          </h2>
          <p className="text-base lg:text-lg leading-relaxed mb-8" style={{ color: PALETTE.textMuted }}>
            Todo empieza con un diagnóstico estratégico para entender tu punto de partida real.
          </p>
          <Link
            href="/diagnostico"
            className="btn-premium focus-ring inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm"
            style={{ backgroundColor: A.gold, color: A.bg, boxShadow: "0 14px 36px -10px rgba(214,180,106,0.5)" }}
          >
            Solicitar diagnóstico estratégico
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
