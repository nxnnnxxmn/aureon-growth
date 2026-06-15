import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import PageHeader from "@/components/ui/PageHeader";
import { GROWTH_SYSTEMS, getSystem } from "@/lib/growth";

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

export function generateStaticParams() {
  return GROWTH_SYSTEMS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSystem(slug);
  if (!s) return { title: "Servicio no encontrado" };
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `https://aureongrowth.com/servicios/${s.slug}` },
    openGraph: {
      title: `${s.name} | Aureon Growth Services`,
      description: s.metaDescription,
      url: `https://aureongrowth.com/servicios/${s.slug}`,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSystem(slug);
  if (!s) notFound();

  // Service JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Aureon Growth Services",
      url: "https://aureongrowth.com",
    },
    areaServed: ["Colombia", "Latinoamérica", "España", "Estados Unidos"],
    url: `https://aureongrowth.com/servicios/${s.slug}`,
  };

  const others = GROWTH_SYSTEMS.filter((x) => x.slug !== s.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <PageHeader
        eyebrow={s.short}
        title={s.name}
        description={s.intro}
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: s.short },
        ]}
      />

      <main style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}>
        {/* Capabilities */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
                <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: PALETTE.accent }}>
                  Capacidades
                </span>
              </div>
              <div className="space-y-5">
                {s.capabilities.map((c, i) => (
                  <div
                    key={c.title}
                    className="rounded-2xl p-6"
                    style={{ backgroundColor: PALETTE.bgWhite, border: `1px solid ${PALETTE.hairline}` }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="font-mono text-xs tabular-nums shrink-0 mt-1"
                        style={{ color: PALETTE.gold }}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-display font-semibold text-lg mb-1.5" style={{ color: PALETTE.text }}>
                          {c.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: PALETTE.textMuted }}>
                          {c.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar: deliverables + results */}
            <aside className="lg:col-span-5 space-y-6">
              <div
                className="rounded-3xl p-7"
                style={{ backgroundColor: PALETTE.bgWhite, border: `1px solid ${PALETTE.hairline}` }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: PALETTE.gold }}>
                  Entregables
                </div>
                <ul className="space-y-3">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PALETTE.accent }} strokeWidth={2.5} />
                      <span className="text-sm" style={{ color: PALETTE.text }}>
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-3xl p-7"
                style={{ backgroundColor: PALETTE.text, color: PALETTE.bgWhite }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: PALETTE.gold }}>
                  Resultados esperados
                </div>
                <ul className="space-y-3">
                  {s.results.map((r) => (
                    <li key={r} className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: PALETTE.gold }} />
                      <span className="text-sm leading-snug" style={{ color: "rgba(251,248,241,0.85)" }}>
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/diagnostico"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: PALETTE.accent,
                  color: PALETTE.bgWhite,
                  boxShadow: "0 14px 36px -10px rgba(224,78,44,0.45)",
                }}
              >
                Solicitar diagnóstico
                <ArrowRight className="w-4 h-4" />
              </Link>
            </aside>
          </div>
        </section>

        {/* Other systems */}
        <section
          className="py-16 lg:py-20"
          style={{ backgroundColor: PALETTE.bgAlt, borderTop: `1px solid ${PALETTE.hairline}` }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-semibold text-xl lg:text-2xl" style={{ color: PALETTE.text }}>
                Otros sistemas
              </h2>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-1.5 text-sm font-display font-semibold"
                style={{ color: PALETTE.accent }}
              >
                <ArrowLeft className="w-4 h-4" />
                Todos los servicios
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/servicios/${o.slug}`}
                  className="group rounded-2xl p-6 transition-all hover:-translate-y-1"
                  style={{ backgroundColor: PALETTE.bgWhite, border: `1px solid ${PALETTE.hairline}` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: PALETTE.accentSoft, color: PALETTE.accent }}
                  >
                    <o.icon className="w-5 h-5" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-1.5" style={{ color: PALETTE.text }}>
                    {o.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: PALETTE.textMuted }}>
                    {o.outcome}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
