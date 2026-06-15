import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import PageHeader from "@/components/ui/PageHeader";
import { GROWTH_SYSTEMS, getSystem } from "@/lib/growth";
import { A } from "@/lib/ui";

export function generateStaticParams() {
  // branding-estrategico has its own dedicated rich page (static route wins).
  return GROWTH_SYSTEMS.filter((s) => s.slug !== "branding-estrategico").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSystem(slug);
  if (!s) return { title: "Servicio no encontrado" };
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `https://aureongrowth.com/servicios/${s.slug}` },
    openGraph: { title: `${s.name} | Aureon Growth Services`, description: s.metaDescription, url: `https://aureongrowth.com/servicios/${s.slug}`, type: "article" },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSystem(slug);
  if (!s) notFound();

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Service", name: s.name, description: s.metaDescription,
    provider: { "@type": "Organization", name: "Aureon Growth Services", url: "https://aureongrowth.com" },
    areaServed: ["Colombia", "Latinoamérica", "España", "Estados Unidos"], url: `https://aureongrowth.com/servicios/${s.slug}`,
  };
  const others = GROWTH_SYSTEMS.filter((x) => x.slug !== s.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar dark />
      <PageHeader eyebrow={s.short} title={s.name} description={s.intro} crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios", href: "/servicios" }, { label: s.short }]} />

      <main className="relative overflow-hidden" style={{ backgroundColor: A.bg, color: A.text }}>
        <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-30" />
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-10" style={{ backgroundColor: A.gold }} />
                <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>Capacidades</span>
              </div>
              <div className="space-y-5">
                {s.capabilities.map((c, i) => (
                  <div key={c.title} className="card-3d surface p-6" style={{ backgroundColor: A.surface }}>
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs tabular-nums shrink-0 mt-1" style={{ color: A.gold }}>0{i + 1}</span>
                      <div>
                        <h3 className="font-display font-semibold text-lg mb-1.5" style={{ color: A.text }}>{c.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: A.text2 }}>{c.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-5 space-y-6">
              <div className="surface rounded-3xl p-7" style={{ backgroundColor: A.surface }}>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: A.gold }}>Entregables</div>
                <ul className="space-y-3">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: A.gold }} strokeWidth={2.5} />
                      <span className="text-sm" style={{ color: A.text }}>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl p-7 border-grad" style={{ background: "linear-gradient(155deg, rgba(124,92,191,0.12), rgba(8,7,13,0.4))", border: `1px solid ${A.border}` }}>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: A.gold }}>Resultados esperados</div>
                <ul className="space-y-3">
                  {s.results.map((r) => (
                    <li key={r} className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: A.gold }} />
                      <span className="text-sm leading-snug" style={{ color: A.text2 }}>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/diagnostico" className="btn-premium focus-ring flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-display font-semibold text-sm" style={{ backgroundColor: A.gold, color: A.bg, boxShadow: "0 14px 36px -10px rgba(214,180,106,0.45)" }}>
                Solicitar diagnóstico <ArrowRight className="w-4 h-4" />
              </Link>
            </aside>
          </div>
        </section>

        <section className="relative z-10 py-16 lg:py-20" style={{ backgroundColor: A.bg2, borderTop: `1px solid ${A.border}` }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-semibold text-xl lg:text-2xl" style={{ color: A.text }}>Otros sistemas</h2>
              <Link href="/servicios" className="inline-flex items-center gap-1.5 text-sm font-display font-semibold focus-ring rounded" style={{ color: A.gold }}>
                <ArrowLeft className="w-4 h-4" /> Todos los servicios
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {others.map((o) => (
                <Link key={o.slug} href={`/servicios/${o.slug}`} className="card-3d surface group p-6" style={{ backgroundColor: A.surface }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(124,92,191,0.14)" }}>
                    <o.icon className="w-5 h-5" style={{ color: A.violet }} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-1.5" style={{ color: A.text }}>{o.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: A.text2 }}>{o.outcome}</p>
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
