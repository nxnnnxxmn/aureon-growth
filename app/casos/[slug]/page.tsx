import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Quote,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  CheckCircle,
  X as XIcon,
} from "lucide-react";
import {
  getCase,
  getAllCaseSlugs,
  getRelatedCases,
  type CaseStudy,
} from "@/lib/cases";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import MagneticButton from "@/components/common/MagneticButton";

// ============================================================
// STATIC GENERATION + METADATA
// ============================================================

export async function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "Caso no encontrado" };

  const title = `${c.brand} · Caso de éxito · ${c.heroMetric}`;
  const description = c.tagline;

  return {
    title,
    description,
    openGraph: {
      title: `${c.brand} — ${c.heroMetric}`,
      description,
      type: "article",
      url: `https://aureongrowth.com/casos/${c.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.brand} — ${c.heroMetric}`,
      description,
    },
    alternates: {
      canonical: `https://aureongrowth.com/casos/${c.slug}`,
    },
  };
}

// ============================================================
// PAGE
// ============================================================

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const related = getRelatedCases(slug, 3);

  // Article JSON-LD for SEO rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.brand} — ${c.heroMetric}`,
    description: c.tagline,
    author: {
      "@type": "Organization",
      name: "Aureon Growth",
      url: "https://aureongrowth.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Aureon Growth",
      logo: { "@type": "ImageObject", url: "https://aureongrowth.com/logo.png" },
    },
    datePublished: `${c.year.split("-")[0]}-01-01`,
    mainEntityOfPage: `https://aureongrowth.com/casos/${c.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="relative overflow-hidden bg-background">
        <HeroBlock c={c} />
        <QuickStatsBar c={c} />
        <ChallengeBlock c={c} />
        <ApproachBlock c={c} />
        <ResultsBlock c={c} />
        {c.testimonial && <TestimonialBlock c={c} />}
        <StackBlock c={c} />
        <RelatedBlock related={related} />
        <FinalCTABlock />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

// ============================================================
// BLOCKS
// ============================================================

function HeroBlock({ c }: { c: CaseStudy }) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Brand-tinted background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${c.bg}`} />
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Big accent orb */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-25 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${c.accentColor}80 0%, transparent 70%)`,
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${c.accentColor}60 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* GIANT watermark — short name */}
      <div
        aria-hidden
        className="absolute -bottom-12 -right-8 lg:right-12 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(10rem, 22vw, 24rem)",
          lineHeight: 0.8,
          letterSpacing: "-0.07em",
          color: c.accentColor,
          opacity: 0.06,
        }}
      >
        {c.shortName}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/casos"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-300 font-medium mb-10 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Todos los casos
        </Link>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT */}
          <div className="lg:col-span-7 space-y-7">
            {/* Industry + category */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-white/8 backdrop-blur-sm border border-white/12 text-xs text-slate-300 font-display font-semibold uppercase tracking-[0.2em]">
                {c.industry}
              </span>
              <span
                className="px-3 py-1.5 rounded-xl text-xs text-white font-display font-bold uppercase tracking-[0.2em]"
                style={{
                  background: `${c.accentColor}30`,
                  border: `1px solid ${c.accentColor}50`,
                }}
              >
                {c.category}
              </span>
            </div>

            {/* Brand name — massive */}
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-white">
              {c.brand}
            </h1>

            {/* Tagline */}
            <p className="text-lg lg:text-2xl text-slate-300 leading-relaxed max-w-2xl font-light">
              {c.tagline}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400 pt-2">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {c.year}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {c.duration}
              </span>
              <span className="inline-flex items-center gap-2">
                <Target className="w-4 h-4" />
                {c.services.length} servicios
              </span>
            </div>
          </div>

          {/* RIGHT — hero metric card */}
          <div className="lg:col-span-5">
            <div
              className="rounded-3xl p-8 lg:p-10 border backdrop-blur-md relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${c.accentColor}22 0%, rgba(0,0,0,0.4) 100%)`,
                borderColor: `${c.accentColor}40`,
              }}
            >
              {/* Inner glow */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${c.accentColor}60 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />

              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300/80 font-display font-semibold mb-3">
                  · Resultado clave
                </p>
                <div
                  className="font-display font-black text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight mb-4"
                  style={{ color: c.accentColor === "#7c3aed" || c.accentColor === "#6d28d9" ? "#e9d5ff" : "#ffffff" }}
                >
                  {c.heroMetric}
                </div>
                <p className="text-sm text-slate-300/80 leading-relaxed">
                  Logrado en {c.duration} de partnership integral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickStatsBar({ c }: { c: CaseStudy }) {
  const top4 = c.results.metrics.slice(0, 4);
  return (
    <section className="relative py-12 border-y border-violet-500/15 bg-[#06050a]/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {top4.map((m) => (
            <div key={m.label} className="text-center lg:text-left">
              <div className="font-display font-black text-3xl lg:text-4xl gradient-text leading-none mb-1.5">
                {m.value}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-[0.18em] font-display font-semibold mb-0.5">
                {m.label}
              </div>
              {m.sub && <div className="text-[11px] text-slate-600">{m.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChallengeBlock({ c }: { c: CaseStudy }) {
  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Label + Title */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sunset-500/10 border border-sunset-400/25 text-[11px] uppercase tracking-[0.22em] text-sunset-300 font-display font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-sunset-400" />
              El reto
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              {c.challenge.headline}
            </h2>
          </div>

          {/* Body + Pains */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose-content space-y-4">
              {c.challenge.body.map((p, i) => (
                <p key={i} className="text-lg text-slate-300/85 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="rounded-2xl border border-sunset-400/20 bg-gradient-to-br from-sunset-500/5 to-transparent p-6 lg:p-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-sunset-300 font-display font-semibold mb-4">
                Pain points identificados
              </p>
              <ul className="space-y-3">
                {c.challenge.pains.map((pain, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-sunset-500/15 border border-sunset-400/30 flex items-center justify-center mt-0.5">
                      <XIcon className="w-3 h-3 text-sunset-300" />
                    </span>
                    <span className="text-sm text-slate-300/90 leading-relaxed">
                      {pain}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApproachBlock({ c }: { c: CaseStudy }) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-section-b">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(128,84,194,0.7) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/25 text-[11px] uppercase tracking-[0.22em] text-violet-300 font-display font-semibold mb-5">
            <Sparkles className="w-3 h-3" />
            Nuestra aproximación
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight mb-5">
            {c.approach.headline}
          </h2>
          {c.approach.body.map((p, i) => (
            <p
              key={i}
              className="text-lg text-slate-300/85 leading-relaxed mb-4 last:mb-0"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {c.approach.pillars.map((p, i) => (
            <div
              key={p.title}
              className="group relative rounded-2xl glass border border-white/8 p-7 hover:border-violet-500/40 transition-colors overflow-hidden"
            >
              {/* Number watermark */}
              <span
                aria-hidden
                className="absolute -top-3 -right-1 font-display font-black text-7xl text-violet-500/8 select-none pointer-events-none"
                style={{ letterSpacing: "-0.05em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative space-y-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-plum text-white text-xs font-display font-black shadow-glow-violet-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-bold text-lg text-white leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsBlock({ c }: { c: CaseStudy }) {
  return (
    <section className="relative py-24 lg:py-32 theme-data overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-500/10 border border-lime-400/25 text-[11px] uppercase tracking-[0.22em] text-lime-400 font-display font-semibold mb-5">
            <TrendingUp className="w-3 h-3" />
            Resultados
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight mb-5">
            {c.results.headline}
          </h2>
          {c.results.body.map((p, i) => (
            <p
              key={i}
              className="text-lg text-slate-300/85 leading-relaxed mb-4 last:mb-0"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Metrics bento */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {c.results.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`relative rounded-2xl glass border border-violet-500/15 p-6 lg:p-7 overflow-hidden ${
                i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-1" : ""
              }`}
            >
              {/* Subtle accent corner */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${
                    i % 3 === 0
                      ? "rgba(128,84,194,0.6)"
                      : i % 3 === 1
                      ? "rgba(59,111,212,0.6)"
                      : "rgba(196,245,78,0.5)"
                  } 0%, transparent 70%)`,
                  filter: "blur(30px)",
                }}
              />
              <div className="relative space-y-1.5">
                <div className="font-display font-black text-4xl lg:text-5xl gradient-text leading-none">
                  {m.value}
                </div>
                <div className="font-display font-semibold text-white text-base">
                  {m.label}
                </div>
                {m.sub && (
                  <div className="text-xs text-slate-500 font-medium">{m.sub}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialBlock({ c }: { c: CaseStudy }) {
  if (!c.testimonial) return null;
  const initial = c.testimonial.author.charAt(0).toUpperCase();
  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${c.accentColor}80 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Quote
          className="w-12 h-12 mx-auto mb-8"
          style={{ color: c.accentColor, opacity: 0.5 }}
        />
        <blockquote className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-[1.25] tracking-tight mb-10">
          “{c.testimonial.quote}”
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-white text-lg border-2 border-white/20"
            style={{
              background: `linear-gradient(135deg, ${c.accentColor}, #4a2972)`,
            }}
          >
            {initial}
          </div>
          <div className="text-left">
            <div className="font-display font-bold text-white text-base">
              {c.testimonial.author}
            </div>
            <div className="text-sm text-slate-400">{c.testimonial.role}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackBlock({ c }: { c: CaseStudy }) {
  return (
    <section className="relative py-20 bg-background border-t border-violet-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Services */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-violet-300 font-display font-semibold mb-4">
              · Servicios entregados
            </p>
            <div className="flex flex-wrap gap-2">
              {c.services.map((s) => (
                <span
                  key={s}
                  className="px-3.5 py-1.5 rounded-xl bg-violet-500/10 border border-violet-400/25 text-sm text-violet-200 font-display font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Stack */}
          {c.stack && c.stack.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-electric-400 font-display font-semibold mb-4">
                · Stack & herramientas
              </p>
              <div className="flex flex-wrap gap-2">
                {c.stack.map((s) => (
                  <span
                    key={s}
                    className="px-3.5 py-1.5 rounded-xl bg-electric-500/10 border border-electric-400/25 text-sm text-electric-400 font-display font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RelatedBlock({ related }: { related: CaseStudy[] }) {
  if (related.length === 0) return null;
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-violet-300 font-display font-semibold">
              · Sigue explorando
            </span>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2">
              Otros casos de éxito
            </h3>
          </div>
          <Link
            href="/casos"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200 font-display font-semibold group transition-colors"
          >
            Ver todos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/casos/${r.slug}`}
              className={`group relative rounded-2xl overflow-hidden border border-violet-500/15 hover:border-violet-400/40 transition-all p-7 bg-gradient-to-br ${r.bg} hover:-translate-y-1 duration-300`}
              style={{ minHeight: "260px" }}
            >
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 70% 30%, ${r.accentColor}55, transparent 60%)`,
                }}
              />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <span className="inline-flex w-fit px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-violet-500/30 text-violet-200 text-[10px] font-display font-semibold uppercase tracking-wider">
                  {r.category}
                </span>
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xl text-white tracking-tight">
                    {r.brand}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display font-black text-2xl"
                      style={{ color: "#e9d5ff" }}
                    >
                      {r.heroMetric}
                    </span>
                    <ArrowRight className="w-4 h-4 text-violet-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTABlock() {
  return (
    <section className="relative py-24 theme-aurora overflow-hidden">
      <div className="absolute inset-0 pattern-halftone opacity-40" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/25 mb-6">
          <Zap className="w-3.5 h-3.5 text-violet-300" />
          <span className="text-xs text-violet-200 font-display font-semibold uppercase tracking-[0.22em]">
            Tu marca, próxima
          </span>
        </span>
        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-5">
          ¿Listo para escribir{" "}
          <span className="gradient-text-multi">tu caso de éxito</span>?
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Cada historia que ves aquí empezó con una conversación. Cuéntanos los
          retos de tu marca y diseñemos juntos el sistema que la llevará al
          siguiente nivel.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <MagneticButton
            href="/#contacto"
            strength={0.35}
            innerStrength={0.55}
            className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-plum text-white font-display font-semibold text-base rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 0 30px rgba(128,84,194,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <span>Agendar consultoría estratégica</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>

          <Link
            href="/casos"
            className="inline-flex items-center gap-2 px-7 py-4 glass border border-violet-500/25 text-slate-200 font-display font-medium text-base rounded-2xl hover:border-violet-400/50 hover:bg-violet-500/10 transition-all"
          >
            <CheckCircle className="w-4 h-4 text-violet-400" />
            Ver más casos
          </Link>
        </div>
      </div>
    </section>
  );
}
