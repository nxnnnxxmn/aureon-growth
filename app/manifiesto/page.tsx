import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Linkedin, Sparkles } from "lucide-react";
import { FOUNDER } from "@/lib/team";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import TeamAvatar from "@/components/common/TeamAvatar";

export const metadata: Metadata = {
  title: "Manifiesto · Por qué construimos Aureon Growth",
  description:
    "Una carta personal del fundador de Aureon Growth sobre por qué construimos una agencia diferente: filosofía, principios y compromiso con las marcas que confían en nosotros.",
  alternates: { canonical: "https://aureon-growth.vercel.app/manifiesto" },
  openGraph: {
    title: "Manifiesto Aureon Growth | Carta del fundador",
    description:
      "Por qué construimos un growth partner distinto: filosofía, principios y la promesa que hacemos a cada marca.",
    url: "https://aureon-growth.vercel.app/manifiesto",
    type: "article",
  },
};

export default function ManifestoPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-background">
        <HeaderBlock />
        <LetterBlock />
        <SignatureBlock />
        <CTABlock />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

// ============================================================
// HEADER
// ============================================================

function HeaderBlock() {
  return (
    <section className="relative pt-32 pb-10 lg:pt-40 lg:pb-12 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,95,179,0.6) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-0 right-[20%] w-72 h-72 rounded-full opacity-10 pointer-events-none hidden lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,97,0.6) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Back link */}
        <Link
          href="/equipo"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-gold-soft font-display font-semibold uppercase tracking-[0.22em] mb-10 group transition-colors"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Equipo
        </Link>

        <div className="pill pill-gold etched-border inline-flex mb-6">
          <Sparkles className="w-3 h-3" />
          Manifiesto
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.04em] text-white mb-6">
          Por qué construimos{" "}
          <span className="font-serif-display italic text-violet-200 font-medium">
            Aureon
          </span>{" "}
          <span className="gradient-text">Growth</span>.
        </h1>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto">
          Una carta personal sobre el problema que vimos en el mercado, lo que
          decidimos construir distinto, y la promesa que hacemos a cada marca
          que confía en nosotros.
        </p>

        {/* Subtle divider */}
        <div className="divider-gold w-32 mx-auto mt-12" />
      </div>
    </section>
  );
}

// ============================================================
// LETTER — the main body
// ============================================================

function LetterBlock() {
  return (
    <article className="relative pb-20 bg-background overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial intro — drop cap style */}
        <p className="text-xs uppercase tracking-[0.28em] text-gold font-display font-semibold mb-8 text-center">
          · Carta del fundador
        </p>

        <div className="space-y-8 text-slate-300">
          {/* Opening — large editorial */}
          <p className="font-serif-display italic text-2xl sm:text-3xl text-slate-100 leading-[1.4] font-medium border-l-2 border-gold-soft pl-6 py-1">
            Aureon no empezó como una agencia. Empezó como una frustración.
          </p>

          {/* Body paragraphs */}
          <Paragraph>
            Durante años trabajé dentro de las agencias y del lado del cliente.
            Vi el mismo patrón repetirse: marcas con producto excelente y
            ambición real contratando proveedores que les vendían{" "}
            <span className="marker-violet">entregables</span>, no{" "}
            <span className="marker-gold">resultados</span>. Reportes
            mensuales con métricas vanity. Strategists que solo veían un canal.
            Equipos que rotaban cada seis meses. Promesas grandes y
            ejecuciones tibias.
          </Paragraph>

          <Paragraph>
            En el mundo del growth, la diferencia entre una marca que escala y
            una que se estanca pocas veces es presupuestaria. Es operativa. Es
            sobre quién está al lado del founder o el CMO pensando el negocio
            como propio, no facturando por hora.
          </Paragraph>

          <SectionBreak />

          <Heading>El problema con las agencias</Heading>

          <Paragraph>
            Las agencias tradicionales están diseñadas para escalar utility,
            no resultados. Su modelo de billing castiga la eficiencia: si
            terminan el trabajo en menos horas, ganan menos. Su estructura
            premia la complejidad: más servicios, más facturación. Su métrica
            interna es retención del cliente, no growth del cliente.
          </Paragraph>

          <Paragraph>
            El resultado lo conoces. Decks impecables que nadie lee. Reuniones
            semanales que repiten lo mismo. Estrategias que parecen brillantes
            en PowerPoint pero que nunca pasan al ejecutivo de cuenta. Y la
            métrica final del año: &ldquo;¿Renuevan el contrato?&rdquo;.
          </Paragraph>

          <SectionBreak />

          <Heading>Lo que decidimos construir distinto</Heading>

          <Paragraph>
            Aureon Growth se construyó alrededor de una pregunta sencilla:{" "}
            <em className="font-serif-display text-gold-soft not-italic font-medium">
              ¿qué pasaría si una firma operara como una extensión real del
              equipo ejecutivo del cliente?
            </em>
          </Paragraph>

          <Paragraph>
            No outsourcing. No vendor management. Co-liderazgo. Un partner que
            se sienta a la mesa de las decisiones de revenue, que entienda el
            cash runway, que sepa cuál es la pregunta que mantiene despierto
            al CEO un martes a las 11 de la noche.
          </Paragraph>

          <Paragraph>
            Decidimos cuatro cosas el primer día y las mantenemos hasta hoy:
          </Paragraph>

          {/* Principles list — editorial style */}
          <ol className="space-y-6 my-12">
            <Principle
              num="01"
              title="Co-liderazgo, no servicios"
              body="Operamos como C-level externos. Acceso al CEO. Visibilidad sobre KPIs reales del negocio. Compromiso con métricas de revenue, no de campaña."
            />
            <Principle
              num="02"
              title="Sistema, no entregables"
              body="Construimos motores que siguen funcionando aún cuando salimos. Documentación, procesos, dashboards, automation. El sistema es la marca."
            />
            <Principle
              num="03"
              title="Honestidad sobre vanidad"
              body="Reportamos métricas que mueven el negocio, no métricas que se ven bonitas. Si algo no funciona, lo decimos antes que nos pregunten."
            />
            <Principle
              num="04"
              title="Tamaño con propósito"
              body="No queremos ser la firma más grande, queremos ser la firma más útil. Trabajamos con cuentas seleccionadas, no con todas las que pagan."
            />
          </ol>

          <SectionBreak />

          <Heading>La promesa que hacemos</Heading>

          <Paragraph>
            Cuando una marca entra a Aureon, hacemos cinco compromisos que
            firmamos por escrito en el primer mes:
          </Paragraph>

          <ul className="space-y-3 my-6">
            <Promise>
              Asignamos un equipo senior con experiencia comprobada en tu
              vertical. Sin juniors aprendiendo en tu cuenta.
            </Promise>
            <Promise>
              Te entregamos un strategy doc en las primeras 4 semanas con KPIs
              comprometidos a 90, 180 y 365 días.
            </Promise>
            <Promise>
              Reportes semanales con métricas reales — sin maquillaje, sin
              datos de vanidad. Si algo no está funcionando, lo verás antes
              que cualquier slide.
            </Promise>
            <Promise>
              Acceso directo al leadership de la firma. Cualquier escalación
              llega a un partner senior en menos de 24 horas.
            </Promise>
            <Promise>
              Si en 90 días no entregamos lo prometido, cancelas sin penalidad
              y devolvemos la diferencia. Está en el contrato.
            </Promise>
          </ul>

          <SectionBreak />

          <Heading>A quiénes elegimos</Heading>

          <Paragraph>
            No trabajamos con todas las marcas que nos contactan — trabajamos
            con las que comparten una premisa: el crecimiento se merece la
            misma seriedad que cualquier otra función crítica del negocio.
          </Paragraph>

          <Paragraph>
            Si estás buscando un proveedor que ejecute lo que ya tienes en
            mente, hay alternativas excelentes en el mercado. Si estás
            buscando un partner que cuestione tus supuestos, te ayude a
            redefinir hacia dónde vas y se comprometa con llevarte ahí — eso
            es lo que hacemos nosotros.
          </Paragraph>

          <Paragraph>
            Si llegaste hasta acá, probablemente lo sentiste. Esta no es la
            página de &ldquo;Sobre Nosotros&rdquo; típica. Es la promesa que
            hacemos a cada conversación que arranca.
          </Paragraph>

          <Paragraph className="pt-4">
            Gracias por leer.
          </Paragraph>
        </div>
      </div>
    </article>
  );
}

// ============================================================
// SIGNATURE
// ============================================================

function SignatureBlock() {
  return (
    <section className="relative pb-20 bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divider-gold w-32 mb-12" />

        <div className="flex items-center gap-5">
          <TeamAvatar member={FOUNDER} size="md" />
          <div>
            {/* Hand-signed style */}
            <div
              className="font-serif-display italic text-3xl text-white font-medium leading-tight"
              style={{ letterSpacing: "-0.01em" }}
            >
              {FOUNDER.name}
            </div>
            <div className="text-sm text-slate-400 font-display font-medium mt-1">
              {FOUNDER.role} · Aureon Growth
            </div>
            {FOUNDER.linkedin && (
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-gold-soft hover:text-gold font-display font-semibold uppercase tracking-[0.22em] mt-2 group"
              >
                <Linkedin className="w-3 h-3" />
                Conectar en LinkedIn
              </a>
            )}
          </div>
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
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-[-0.04em] mb-6">
          Si esto resuena contigo,{" "}
          <span className="font-serif-display italic gradient-text font-medium">
            conversemos
          </span>
          .
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          La primera reunión es 60 minutos con el director que liderará tu
          cuenta. Sin filtros de ventas, sin pitch corporativo. Directo
          al diagnóstico.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-plum text-white font-display font-semibold rounded-2xl btn-glow group"
          >
            Agendar primera conversación
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/equipo"
            className="inline-flex items-center gap-2 px-7 py-4 glass border border-violet-500/25 text-slate-200 font-display font-medium rounded-2xl hover:border-gold-soft hover:text-gold-soft transition-colors etched-border"
          >
            Conocer al equipo completo
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRIMITIVES
// ============================================================

function Paragraph({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-base sm:text-lg leading-[1.75] text-slate-300/90 ${className}`}>
      {children}
    </p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-[-0.02em] leading-tight">
      {children}
    </h2>
  );
}

function SectionBreak() {
  return (
    <div className="flex items-center justify-center py-4">
      <span className="font-serif-display italic text-3xl text-gold opacity-60 leading-none">
        ✦ ✦ ✦
      </span>
    </div>
  );
}

function Principle({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-5">
      <span className="shrink-0 font-display font-black text-2xl gradient-text-gold tracking-[-0.02em] leading-none mt-1">
        {num}
      </span>
      <div>
        <h3 className="font-display font-bold text-white text-lg tracking-tight mb-1.5">
          {title}
        </h3>
        <p className="text-base text-slate-400 leading-relaxed">{body}</p>
      </div>
    </li>
  );
}

function Promise({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-gold" />
      <span className="text-base text-slate-300/90 leading-relaxed">
        {children}
      </span>
    </li>
  );
}
