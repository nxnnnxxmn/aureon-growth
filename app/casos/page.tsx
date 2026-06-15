import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { CASES } from "@/lib/cases";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Casos por industria · Patrones de transformación verificables",
  description:
    "Casos representativos por industria: SaaS B2B, fintech, e-commerce, healthcare, fashion, EdTech. Patrones de transformación documentados con métricas y metodología — atribución por sector, confidencialidad respetada.",
  alternates: {
    canonical: "https://aureongrowth.com/casos",
  },
  openGraph: {
    title: "Casos por industria | Aureon Growth",
    description:
      "Patrones de transformación por vertical: SaaS, fintech, e-commerce, healthcare, fashion, EdTech. Métricas y metodología documentadas.",
    url: "https://aureongrowth.com/casos",
    type: "website",
  },
};

export default function CasesListingPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-background">
        {/* Hero */}
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-25" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(128,84,194,0.7) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-violet border border-violet-500/25 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs text-violet-200 font-display font-semibold uppercase tracking-[0.22em]">
                Casos por industria
              </span>
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.04em] text-white mb-6">
              Patrones que generan{" "}
              <span className="gradient-text">resultados reales</span>.
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Cada caso documenta el reto inicial, la estrategia aplicada y las
              métricas que generamos por vertical. Trabajamos bajo NDA con la
              mayoría de nuestros clientes — atribuimos por industria, respetamos
              la confidencialidad.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="relative pb-24 lg:pb-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CASES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/casos/${c.slug}`}
                  className={`group relative rounded-3xl overflow-hidden border border-violet-500/15 hover:border-violet-400/40 transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br ${c.bg}`}
                  style={{ minHeight: "340px" }}
                >
                  {/* Mockup mesh */}
                  <div
                    className="absolute inset-0 opacity-50 pointer-events-none"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 20% 20%, ${c.accentColor}55, transparent 45%),
                        radial-gradient(circle at 80% 30%, ${c.accentColor}40, transparent 50%),
                        radial-gradient(circle at 50% 80%, ${c.accentColor}30, transparent 55%)
                      `,
                    }}
                  />

                  {/* Watermark number / short name */}
                  <div
                    aria-hidden
                    className="absolute bottom-0 right-0 pointer-events-none select-none"
                    style={{
                      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(6rem, 10vw, 10rem)",
                      lineHeight: 0.8,
                      letterSpacing: "-0.05em",
                      color: c.accentColor,
                      opacity: 0.1,
                      transform: "translate(15%, 15%)",
                    }}
                  >
                    {c.shortName.charAt(0)}
                  </div>

                  <div className="absolute inset-0 grid-bg opacity-20" />

                  {/* Content */}
                  <div className="relative z-10 p-7 h-full flex flex-col justify-between">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-2">
                        <span className="inline-flex w-fit px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-violet-500/30 text-violet-200 text-[10px] font-display font-semibold uppercase tracking-wider">
                          {c.category}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-display font-semibold">
                          {c.industry}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover:rotate-45 group-hover:scale-110 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="space-y-3">
                      <h2 className="font-display font-bold text-2xl text-white tracking-tight">
                        {c.brand}
                      </h2>
                      <p className="text-sm text-slate-200/85 leading-relaxed line-clamp-2">
                        {c.tagline}
                      </p>
                      <div className="flex items-end justify-between pt-3 border-t border-white/8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 uppercase tracking-[0.18em] font-semibold mb-0.5">
                            Resultado
                          </span>
                          <span
                            className="font-display font-black text-xl tracking-tight"
                            style={{ color: "#e9d5ff" }}
                          >
                            {c.heroMetric}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                            {c.duration}
                          </div>
                          <div className="text-[10px] text-slate-500">{c.year}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA at bottom */}
            <div className="mt-16 text-center">
              <p className="text-slate-400 mb-5">
                ¿Tu marca podría ser el próximo caso?
              </p>
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-plum text-white font-display font-semibold rounded-2xl btn-glow"
              >
                Agendar consultoría estratégica
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
