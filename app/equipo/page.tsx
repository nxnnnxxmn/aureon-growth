import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Linkedin,
  Sparkles,
  Quote,
  ArrowUpRight,
} from "lucide-react";
import { FOUNDER, TEAM, DEPARTMENTS, TEAM_STATS } from "@/lib/team";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import TeamAvatar from "@/components/common/TeamAvatar";

export const metadata: Metadata = {
  title: "Equipo · Las personas detrás del crecimiento",
  description:
    "Conoce al equipo de Aureon Growth: 30+ especialistas senior en growth, brand, tech, data e IA. El equipo que asignamos a tu cuenta tiene en promedio 9+ años de experiencia.",
  alternates: { canonical: "https://aureongrowth.com/equipo" },
  openGraph: {
    title: "El equipo detrás del crecimiento | Aureon Growth",
    description:
      "30+ especialistas senior — growth, brand, tech, data, IA. Promedio de 9+ años de experiencia por persona.",
    url: "https://aureongrowth.com/equipo",
    type: "website",
  },
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-background">
        <HeroBlock />
        <FounderBlock />
        <LeadershipBlock />
        <DepartmentsBlock />
        <CultureBlock />
        <CTABlock />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroBlock() {
  return (
    <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,95,179,0.6) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute top-1/2 right-[10%] w-72 h-72 rounded-full opacity-12 pointer-events-none hidden lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,97,0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="pill pill-gold etched-border inline-flex mb-6">
          <Sparkles className="w-3 h-3" />
          Equipo
        </div>

        <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.04em] text-white mb-6 max-w-4xl mx-auto">
          Las personas detrás{" "}
          <span className="font-serif-display italic text-violet-200 font-medium">
            del
          </span>{" "}
          <span className="gradient-text">crecimiento</span>.
        </h1>

        <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
          Más de 30 especialistas senior trabajando como una extensión premium
          de los equipos ejecutivos de nuestros clientes. Cada cuenta recibe un
          team dedicado con experiencia promedio de 9+ años.
        </p>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-8 border-t border-white/8">
          {[
            { value: `${TEAM_STATS.totalSize}+`, label: "Especialistas" },
            { value: `${TEAM_STATS.averageYears}+ años`, label: "Experiencia promedio" },
            { value: `${TEAM_STATS.countriesActive}`, label: "Países activos" },
            { value: `${TEAM_STATS.languages}`, label: "Idiomas operativos" },
          ].map((s, i) => (
            <div key={s.label} className="text-center">
              <div
                className={`font-display font-black text-3xl lg:text-4xl tracking-[-0.03em] mb-1 ${
                  i % 2 === 0 ? "gradient-text-violet" : "gradient-text-gold"
                }`}
              >
                {s.value}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-[0.22em] font-display font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOUNDER (featured large)
// ============================================================

function FounderBlock() {
  return (
    <section className="relative py-20 lg:py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-25" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative">
              {/* Gold accent ring behind */}
              <div
                className="absolute -inset-3 rounded-3xl opacity-50 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(201,169,97,0.25) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />
              <TeamAvatar member={FOUNDER} size="xl" priority className="relative" />
              {/* Floating credential badge */}
              <div className="absolute -bottom-3 -right-3 pill pill-gold etched-border-gold whitespace-nowrap shadow-lg">
                <span className="text-gold">◆</span>
                Fundador desde {new Date().getFullYear() - FOUNDER.years}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="pill pill-violet etched-border inline-flex">
              <Quote className="w-3 h-3" />
              {FOUNDER.role}
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.04em] text-white">
              {FOUNDER.name}
            </h2>

            <blockquote className="font-serif-display italic text-2xl lg:text-3xl text-slate-200 leading-[1.35] font-medium border-l-2 border-gold-soft pl-6 py-1">
              &ldquo;{FOUNDER.philosophy}&rdquo;
            </blockquote>

            <p className="text-base text-slate-400 leading-relaxed">
              {FOUNDER.credential}.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/manifiesto"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-violet-600 to-plum text-white font-display font-semibold text-sm rounded-xl btn-glow group"
              >
                Leer el manifiesto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              {FOUNDER.linkedin && (
                <a
                  href={FOUNDER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 glass border border-white/10 text-slate-300 font-display font-medium text-sm rounded-xl hover:border-gold-soft hover:text-gold-soft transition-colors etched-border"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LEADERSHIP GRID
// ============================================================

function LeadershipBlock() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-section-b">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute top-1/3 left-0 w-96 h-96 rounded-full opacity-12 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,95,179,0.7) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="pill pill-violet etched-border inline-flex mb-5">
            <Sparkles className="w-3 h-3" />
            Liderazgo
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.04em] text-white mb-4">
            El leadership team que{" "}
            <span className="font-serif-display italic text-violet-200 font-medium">
              co-lidera
            </span>{" "}
            cada cuenta.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            7 directores con +9 años de experiencia promedio. Operamos en
            squads — cada cuenta tiene representación de growth, brand, tech,
            data y operations desde el día uno.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: typeof TEAM[number] }) {
  return (
    <div className="group relative rounded-3xl glass border border-white/8 p-7 hover:border-gold-soft transition-all duration-500 etched-border">
      <div className="flex items-start gap-5">
        <TeamAvatar member={member} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-white text-lg leading-tight tracking-[-0.02em]">
            {member.name}
          </h3>
          <p className="text-sm text-violet-200 font-display font-medium mt-1">
            {member.role}
          </p>
          <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500 uppercase tracking-[0.18em] font-display font-semibold">
            <span>{member.years}+ años</span>
            <span>·</span>
            <span>{member.department}</span>
          </div>
        </div>
      </div>

      <blockquote className="font-serif-display italic text-base text-slate-300 leading-relaxed mt-5 pb-5 border-b border-white/8">
        &ldquo;{member.philosophy}&rdquo;
      </blockquote>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-slate-500 leading-tight max-w-[70%]">
          {member.credential}
        </p>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} en LinkedIn`}
            className="shrink-0 w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold-soft hover:border-gold-soft transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

// ============================================================
// DEPARTMENTS BREAKDOWN
// ============================================================

function DepartmentsBlock() {
  return (
    <section className="relative py-20 lg:py-28 bg-background overflow-hidden">
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,97,0.5) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Sticky title */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-5">
            <div className="pill pill-gold etched-border inline-flex">
              <Sparkles className="w-3 h-3" />
              Departamentos
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.04em] text-white">
              5 disciplinas integradas en{" "}
              <span className="gradient-text">un solo sistema</span>.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              No tercerizamos. Cada disciplina vive bajo el mismo techo —
              growth y brand toman café juntos, tech y data colaboran a
              diario, operations garantiza que el cliente solo ve resultados.
            </p>
          </div>

          {/* Departments stack */}
          <div className="lg:col-span-7 space-y-3">
            {DEPARTMENTS.map((d, i) => (
              <div
                key={d.name}
                className="group relative rounded-2xl glass border border-white/8 p-6 lg:p-7 hover:border-gold-soft transition-colors etched-border"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display font-black text-2xl gradient-text-gold tracking-[-0.02em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display font-bold text-white text-lg lg:text-xl tracking-tight">
                        {d.name}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 ml-9 leading-relaxed">
                      {d.focus}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display font-black text-3xl text-white tracking-[-0.03em]">
                      {d.count}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-[0.22em] font-display font-semibold mt-1">
                      Personas
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CULTURE BLOCK — values short
// ============================================================

function CultureBlock() {
  const values = [
    {
      title: "Excelencia silenciosa",
      body: "No hablamos del nivel — lo entregamos. El cliente nota el cuidado en cada detalle invisible.",
    },
    {
      title: "Honestidad sobre vanidad",
      body: "Reportamos métricas que importan al negocio, no métricas que se ven bonitas en un slide.",
    },
    {
      title: "Sistema sobre heroísmo",
      body: "Construimos procesos que sobreviven cualquier rotación. El sistema es la marca.",
    },
    {
      title: "Curiosidad permanente",
      body: "Cada cuenta nos enseña algo. Documentamos esos aprendizajes para elevar a toda la firma.",
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-section-b overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-25" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="pill pill-violet etched-border inline-flex mb-5">
            <Sparkles className="w-3 h-3" />
            Cultura
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.04em] text-white mb-4">
            4 valores que{" "}
            <span className="font-serif-display italic text-violet-200 font-medium">
              no son
            </span>{" "}
            decoración.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Cada uno se aplica en decisiones reales — desde contratar gente
            hasta cómo escribimos un email a un cliente.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl glass border border-white/8 p-7 etched-border"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-display font-black text-xl gradient-text-gold tracking-[-0.02em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-bold text-white text-lg tracking-tight">
                  {v.title}
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed ml-9">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

function CTABlock() {
  return (
    <section className="relative py-20 theme-aurora overflow-hidden">
      <div className="absolute inset-0 pattern-halftone opacity-30" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="pill pill-gold etched-border inline-flex mb-6">
          <Sparkles className="w-3 h-3" />
          Conoce al team
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-[-0.04em] mb-5">
          ¿Listo para conocer al equipo{" "}
          <span className="font-serif-display italic gradient-text font-medium">
            asignado a tu cuenta
          </span>
          ?
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          En la primera llamada conoces a los directores que liderarán tu
          estrategia. Sin filtros de ventas — directo con quienes ejecutan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-plum text-white font-display font-semibold rounded-2xl btn-glow group"
          >
            Agendar primera reunión
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/manifiesto"
            className="inline-flex items-center gap-2 px-7 py-4 glass border border-violet-500/25 text-slate-200 font-display font-medium rounded-2xl hover:border-gold-soft hover:text-gold-soft transition-colors etched-border"
          >
            <ArrowUpRight className="w-4 h-4" />
            Leer el manifiesto
          </Link>
        </div>
      </div>
    </section>
  );
}
