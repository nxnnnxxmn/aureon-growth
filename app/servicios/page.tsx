import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import PageHeader from "@/components/ui/PageHeader";
import { GROWTH_SYSTEMS } from "@/lib/growth";

export const metadata: Metadata = {
  title: "Servicios · Sistemas de crecimiento",
  description:
    "Los cuatro sistemas de Aureon Growth Services: Brand Authority, Acquisition Engine, Revenue Automation y Growth Intelligence. Branding, performance, automatización, CRM e IA.",
  alternates: { canonical: "https://aureongrowth.com/servicios" },
  openGraph: {
    title: "Servicios | Aureon Growth Services",
    description:
      "Cuatro sistemas de crecimiento integrados: marca, adquisición, automatización y analítica.",
    url: "https://aureongrowth.com/servicios",
    type: "website",
  },
};

const PALETTE = {
  bg: "#F5F1E8",
  bgWhite: "#FBF8F1",
  text: "#1A1815",
  textMuted: "#6B655E",
  textSoft: "#9A938A",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  gold: "#C9A961",
  hairline: "rgba(26,24,21,0.10)",
};

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Servicios"
        title={
          <>
            Sistemas de crecimiento,{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}>
              no servicios sueltos
            </span>
            .
          </>
        }
        description="Agrupamos cada disciplina en cuatro sistemas que se integran entre sí. Puedes contratarlos de forma integral o por sistema, según la etapa de tu empresa."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
      />

      <main style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}>
        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="space-y-6">
            {GROWTH_SYSTEMS.map((s, i) => (
              <div
                key={s.slug}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl p-8 lg:p-10"
                style={{
                  backgroundColor: PALETTE.bgWhite,
                  border: `1px solid ${PALETTE.hairline}`,
                }}
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: PALETTE.accent }}
                    >
                      <s.icon className="w-6 h-6" style={{ color: PALETTE.bgWhite }} strokeWidth={1.6} />
                    </div>
                    <span
                      className="font-mono text-[11px] uppercase tracking-[0.22em]"
                      style={{ color: PALETTE.gold }}
                    >
                      0{i + 1} · {s.short}
                    </span>
                  </div>
                  <h2
                    className="font-display font-semibold text-2xl lg:text-3xl leading-tight mb-3"
                    style={{ color: PALETTE.text }}
                  >
                    {s.name}
                  </h2>
                  <p className="text-sm lg:text-base leading-relaxed mb-6" style={{ color: PALETTE.textMuted }}>
                    {s.summary}
                  </p>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: PALETTE.accent, color: PALETTE.bgWhite }}
                  >
                    Explorar sistema
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="lg:col-span-7 lg:border-l lg:pl-10" style={{ borderColor: PALETTE.hairline }}>
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4"
                    style={{ color: PALETTE.gold }}
                  >
                    Incluye
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                    {s.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PALETTE.accent }} strokeWidth={2.5} />
                        <span className="text-sm" style={{ color: PALETTE.text }}>
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="rounded-2xl p-4"
                    style={{ backgroundColor: PALETTE.accentSoft }}
                  >
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1"
                      style={{ color: PALETTE.accent }}
                    >
                      Resultado esperado
                    </div>
                    <div className="text-sm font-medium" style={{ color: PALETTE.text }}>
                      {s.outcome}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: PALETTE.accent,
                color: PALETTE.bgWhite,
                boxShadow: "0 14px 36px -10px rgba(224,78,44,0.45)",
              }}
            >
              Diseñar mi sistema de crecimiento
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
