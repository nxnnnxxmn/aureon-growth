import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  X as XIcon,
  Sparkles,
  Quote,
  Scale,
  AlertTriangle,
  Shield,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Aureon vs. Agencia tradicional · Cuál encaja con tu marca",
  description:
    "Comparación honesta y específica entre un Growth Partner (Aureon) y una agencia de marketing tradicional. 18 dimensiones de diferencia, framework de decisión y casos donde cada modelo encaja mejor.",
  alternates: {
    canonical: "https://aureon-growth.vercel.app/aureon-vs-agencia",
  },
  openGraph: {
    title: "Growth Partner vs. Agencia tradicional | Aureon Growth",
    description:
      "Comparación de 18 dimensiones para tu comité de decisión. Cuándo Aureon encaja, cuándo una agencia tradicional es mejor opción.",
    url: "https://aureon-growth.vercel.app/aureon-vs-agencia",
    type: "article",
  },
};

// ============================================================
// COMPARISON DATA
// ============================================================

interface ComparisonRow {
  category: string;
  dimension: string;
  traditional: string;
  lancheros: string;
}

const COMPARISON: ComparisonRow[] = [
  // === BUSINESS MODEL ===
  {
    category: "Modelo comercial",
    dimension: "Estructura de billing",
    traditional: "Horas o retainer fijo, sin compromisos de outcome",
    lancheros: "Fee mensual con KPIs comprometidos por escrito",
  },
  {
    category: "Modelo comercial",
    dimension: "Compromisos a outcomes",
    traditional: "No comprometen métricas — usan lenguaje aspiracional",
    lancheros: "KPIs firmados en contrato + garantía de 90 días",
  },
  {
    category: "Modelo comercial",
    dimension: "Permanencia mínima",
    traditional: "6-12 meses obligatorios con cláusulas de salida",
    lancheros: "Mes a mes (Starter/Partner) con 30 días de aviso",
  },

  // === TEAM ===
  {
    category: "Equipo asignado",
    dimension: "Seniority del equipo operativo",
    traditional: "AE + 1-2 juniors aprendiendo en tu cuenta",
    lancheros: "CSM + Strategist + 4-5 especialistas con +5 años promedio",
  },
  {
    category: "Equipo asignado",
    dimension: "Acceso al C-suite del partner",
    traditional: "Solo vía cuenta — escalación lenta y filtrada",
    lancheros: "Acceso directo al CSO/CMO — escalación en <24h",
  },
  {
    category: "Equipo asignado",
    dimension: "Disciplinas integradas",
    traditional: "1-2 servicios principales (se contrata el resto)",
    lancheros: "5-7 disciplinas bajo el mismo techo, colaborando",
  },

  // === EXECUTION ===
  {
    category: "Ejecución",
    dimension: "Cadencia operativa",
    traditional: "Reuniones mensuales con review de resultados",
    lancheros: "War room semanal + retro mensual + estrategia trimestral",
  },
  {
    category: "Ejecución",
    dimension: "Onboarding inicial",
    traditional: "Kickoff de 1-2 horas → arrancan ejecutando",
    lancheros: "Inmersión profunda de 14-21 días → strategy doc + KPIs",
  },
  {
    category: "Ejecución",
    dimension: "Velocidad de iteración",
    traditional: "Sprints mensuales de optimización",
    lancheros: "Testing continuo + ajustes semanales basados en data",
  },

  // === DATA ===
  {
    category: "Data y reporting",
    dimension: "Reportes",
    traditional: "Mensuales con métricas de vanidad (impresiones, alcance)",
    lancheros: "Semanales con métricas que mueven revenue del negocio",
  },
  {
    category: "Data y reporting",
    dimension: "Acceso a dashboards",
    traditional: "PDF estático o screenshots",
    lancheros: "Dashboard en tiempo real con drill-down a métricas raw",
  },
  {
    category: "Data y reporting",
    dimension: "Stack de IA y automation",
    traditional: "Tools de terceros comprados ad-hoc",
    lancheros: "Stack propio implementado en tu infraestructura",
  },

  // === STRATEGY ===
  {
    category: "Estrategia",
    dimension: "Diseño de estrategia",
    traditional: "Template cookie-cutter por tipo de cuenta",
    lancheros: "Bespoke por buyer persona + research cualitativa",
  },
  {
    category: "Estrategia",
    dimension: "Visibilidad de pipeline",
    traditional: "El cliente reporta su pipeline al partner",
    lancheros: "El partner ve el CRM en tiempo real y co-lidera",
  },
  {
    category: "Estrategia",
    dimension: "Cultura operativa",
    traditional: "Vendor mindset — ejecutan lo pedido",
    lancheros: "Partner mindset — cuestionan supuestos del negocio",
  },

  // === COMMITMENT ===
  {
    category: "Compromiso y enfoque",
    dimension: "Cuentas activas simultáneas",
    traditional: "150+ cuentas con equipos rotando",
    lancheros: "Cuentas seleccionadas — capacidad limitada por trimestre",
  },
  {
    category: "Compromiso y enfoque",
    dimension: "Garantías explícitas",
    traditional: "Ninguna documentada — solo lenguaje aspiracional",
    lancheros: "90 días o devolución de la diferencia · SLA <24h",
  },
  {
    category: "Compromiso y enfoque",
    dimension: "Métrica interna del partner",
    traditional: "Retención del cliente (renovación)",
    lancheros: "Growth del cliente (revenue movido)",
  },
];

// Group by category
const CATEGORIES = Array.from(new Set(COMPARISON.map((c) => c.category)));

export default function ComparisonPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-background">
        <HeroBlock />
        <TldrBlock />
        <ComparisonTable />
        <DeepDiveBlock />
        <WhenTraditionalBlock />
        <DecisionFrameworkBlock />
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
    <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 pointer-events-none"
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-gold-soft font-display font-semibold uppercase tracking-[0.22em] mb-10 group transition-colors"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Volver al sitio
        </Link>

        <div className="pill pill-gold etched-border inline-flex mb-6">
          <Scale className="w-3 h-3" />
          Comparación honesta
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.04em] text-white mb-6">
          Growth Partner{" "}
          <span className="font-serif-display italic text-violet-200 font-medium">
            vs.
          </span>{" "}
          <span className="gradient-text">Agencia tradicional</span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Si tu comité de decisión te pidió justificar la inversión en un growth
          partner premium vs. una agencia convencional, esta página fue diseñada
          para que la compartas.
        </p>

        <p className="text-xs text-slate-500 italic font-serif-display max-w-md mx-auto">
          18 dimensiones de diferencia · Framework de decisión · Casos donde
          cada modelo encaja mejor.
        </p>
      </div>
    </section>
  );
}

// ============================================================
// TL;DR SUMMARY
// ============================================================

function TldrBlock() {
  return (
    <section className="relative py-16 bg-background overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-elevated border border-white/8 p-7 lg:p-10 etched-border-gold">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-gold" />
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-display font-semibold">
              · Si solo lees una sección, lee esta
            </p>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-[-0.02em] mb-5 leading-tight">
            La diferencia se reduce a{" "}
            <span className="font-serif-display italic text-gold-soft font-medium">
              tres palabras
            </span>
            .
          </h2>

          <div className="space-y-4 text-base text-slate-300/90 leading-relaxed">
            <p>
              <strong className="text-white font-display font-bold">
                Una agencia tradicional
              </strong>{" "}
              vende horas y entregables. Su modelo de billing castiga la
              eficiencia: si terminan rápido, ganan menos. Su métrica interna
              es retención del cliente, no growth del cliente. Su equipo
              asignado rota.
            </p>
            <p>
              <strong className="text-gold font-display font-bold">
                Un growth partner
              </strong>{" "}
              vende co-liderazgo. Se compromete con KPIs de revenue, opera
              como C-level externo del cliente, y diseña sistemas que
              funcionan aún cuando el partner no está. El cliente no paga por
              horas — paga por movimiento de la métrica del negocio.
            </p>
            <p className="pt-2 font-serif-display italic text-violet-200 text-lg leading-[1.5]">
              No todas las marcas necesitan un partner. Las que sí —
              normalmente lo saben antes de comparar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MAIN COMPARISON TABLE
// ============================================================

function ComparisonTable() {
  return (
    <section className="relative py-20 bg-section-b overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute top-1/3 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,95,179,0.7) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="pill pill-violet etched-border inline-flex mb-5">
            <Sparkles className="w-3 h-3" />
            La comparación
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-[-0.04em]">
            18 dimensiones de diferencia.
          </h2>
        </div>

        {/* Comparison cards by category */}
        <div className="space-y-10">
          {CATEGORIES.map((category, catIdx) => {
            const rows = COMPARISON.filter((r) => r.category === category);
            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-display font-black text-3xl gradient-text-gold tracking-[-0.03em] leading-none">
                    {String(catIdx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white tracking-[-0.02em]">
                    {category}
                  </h3>
                </div>

                {/* Header row — sticky-like */}
                <div className="hidden md:grid grid-cols-12 gap-3 mb-3 px-2">
                  <div className="col-span-4 text-[10px] uppercase tracking-[0.22em] text-slate-500 font-display font-semibold">
                    Dimensión
                  </div>
                  <div className="col-span-4 text-[10px] uppercase tracking-[0.22em] text-slate-500 font-display font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <XIcon className="w-3 h-3" />
                      Agencia tradicional
                    </span>
                  </div>
                  <div className="col-span-4 text-[10px] uppercase tracking-[0.22em] text-gold font-display font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="w-3 h-3" />
                      Aureon
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {rows.map((row) => (
                    <ComparisonRowCard key={row.dimension} row={row} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComparisonRowCard({ row }: { row: ComparisonRow }) {
  return (
    <div className="rounded-2xl glass border border-white/8 p-5 md:p-6 etched-border">
      <div className="grid md:grid-cols-12 gap-4 md:gap-3 items-start">
        {/* Dimension */}
        <div className="md:col-span-4">
          <p className="font-display font-bold text-white text-sm md:text-base tracking-tight leading-tight">
            {row.dimension}
          </p>
        </div>

        {/* Traditional */}
        <div className="md:col-span-4 flex items-start gap-2.5">
          <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
            <XIcon className="w-2.5 h-2.5 text-slate-400" />
          </span>
          <p className="text-sm text-slate-400 leading-relaxed">
            {row.traditional}
          </p>
        </div>

        {/* Aureon */}
        <div className="md:col-span-4 flex items-start gap-2.5">
          <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-gold-soft border border-gold-soft flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-gold" strokeWidth={3} />
          </span>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {row.lancheros}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DEEP DIVE — top 3 differences explained
// ============================================================

function DeepDiveBlock() {
  const deepDives = [
    {
      num: "01",
      title: "El billing por horas castiga el resultado",
      body: "Una agencia tradicional cobra por hora trabajada. Su incentivo financiero es que el proyecto consuma más horas — no que termine bien y rápido. Un growth partner cobra por movimiento de métricas comprometidas, no por horas dedicadas. Es la diferencia entre pagarle al cirujano por minuto de operación o por éxito de la cirugía.",
      quote:
        "Si quieres ver el verdadero incentivo de tu partner, mira cómo factura — no cómo se vende.",
    },
    {
      num: "02",
      title: "Vendor vs Partner mindset",
      body: "El vendor ejecuta lo que se le pide. El partner cuestiona los supuestos del cliente. Es la diferencia entre un proveedor que te entrega 50 piezas de contenido al mes y un partner que te pregunta '¿estás seguro que necesitas más contenido o necesitas mejor distribución?'. El primero te factura. El segundo te hace ganar dinero.",
      quote:
        "Un vendor optimiza su producto. Un partner optimiza tu negocio.",
    },
    {
      num: "03",
      title: "Equipo dedicado vs equipo rotativo",
      body: "Las agencias grandes asignan AEs que rotan cada 6-12 meses. Cada rotación es un costo invisible — el nuevo equipo necesita meses para entender tu negocio. Un growth partner mantiene el mismo equipo senior durante toda la relación, con knowledge management formal para garantizar continuidad incluso ante salidas.",
      quote:
        "La continuidad del equipo es la única forma de acumular contexto sobre tu negocio.",
    },
  ];

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,97,0.5) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="pill pill-gold etched-border inline-flex mb-5">
            <Quote className="w-3 h-3" />
            Las 3 diferencias críticas
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-[-0.04em]">
            Si tienes que recordar{" "}
            <span className="font-serif-display italic gradient-text font-medium">
              solo tres
            </span>
            , son estas.
          </h2>
        </div>

        <div className="space-y-6">
          {deepDives.map((d) => (
            <div
              key={d.num}
              className="rounded-3xl glass-elevated border border-white/8 p-7 lg:p-9 etched-border"
            >
              <div className="flex items-start gap-5 mb-5">
                <span className="shrink-0 font-display font-black text-4xl gradient-text-gold tracking-[-0.03em] leading-none">
                  {d.num}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-[-0.02em] leading-tight pt-1">
                  {d.title}
                </h3>
              </div>
              <p className="text-base text-slate-300/90 leading-relaxed mb-5 ml-0 sm:ml-16">
                {d.body}
              </p>
              <blockquote className="font-serif-display italic text-base sm:text-lg text-violet-200 leading-relaxed border-l-2 border-gold-soft pl-5 ml-0 sm:ml-16">
                &ldquo;{d.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHEN TRADITIONAL MAKES SENSE — honest acknowledgment
// ============================================================

function WhenTraditionalBlock() {
  return (
    <section className="relative py-20 bg-section-b overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-25" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-elevated border border-white/8 p-7 lg:p-10 etched-border">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-4 h-4 text-sunset-400" />
            <p className="text-[11px] uppercase tracking-[0.22em] text-sunset-400 font-display font-semibold">
              · Lo que un partner premium no admite, pero deberíamos
            </p>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-[-0.02em] mb-5 leading-tight">
            Una agencia tradicional puede ser{" "}
            <span className="font-serif-display italic text-violet-200 font-medium">
              la mejor opción
            </span>{" "}
            para ti.
          </h2>

          <p className="text-base text-slate-300/90 leading-relaxed mb-6">
            No todas las marcas necesitan un growth partner. Si te identificas
            con alguno de estos casos, una agencia convencional puede ser más
            costo-efectiva:
          </p>

          <ul className="space-y-4">
            {[
              {
                title: "Necesitas ejecución, no estrategia",
                body: "Si ya tienes tu estrategia clara y solo necesitas alguien que ejecute campañas específicas, una agencia tradicional ofrece eso con menos overhead.",
              },
              {
                title: "Presupuesto bajo $3K USD/mes",
                body: "Un growth partner no escala económicamente por debajo de cierto umbral. Una agencia volume-driven o un freelancer senior pueden ser mejor opción.",
              },
              {
                title: "Necesitas un único servicio específico",
                body: "Si solo necesitas SEO técnico, branding o producción audiovisual aislada, especialistas focalizados pueden entregar más profundidad por menos.",
              },
              {
                title: "Tu equipo interno ya lidera",
                body: "Si tienes CMO + Head of Growth interno con visión clara, lo que necesitas son brazos para ejecutar — no más cabezas para estrategia.",
              },
            ].map((c) => (
              <li
                key={c.title}
                className="flex gap-3 pb-4 border-b border-white/8 last:border-b-0 last:pb-0"
              >
                <Check className="w-4 h-4 text-violet-300 mt-0.5 shrink-0" />
                <div>
                  <p className="font-display font-bold text-white text-base mb-1 tracking-tight">
                    {c.title}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 pt-6 border-t border-white/8 text-sm italic font-serif-display text-slate-400 leading-relaxed">
            &ldquo;Para que el modelo funcione, las dos partes deben encajar.
            Si no encajas en nuestro perfil de cuenta, lo decimos en la primera
            llamada — y te ayudamos a encontrar quién sí.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DECISION FRAMEWORK
// ============================================================

function DecisionFrameworkBlock() {
  const checklist = [
    "Tu marca tiene product-market fit demostrado y un objetivo claro de crecimiento agresivo (>2× en 12 meses)",
    "Tu presupuesto de marketing es ≥ $5,000 USD/mes y tu founder o C-suite está dispuesto a colaborar de cerca",
    "Necesitas integración entre 4+ disciplinas (branding, performance, contenido, automation, data)",
    "Tu equipo interno está saturado o no tiene la seniority necesaria para diseñar estrategia",
    "Buscas comprometer KPIs específicos (no solo deliverables) y firmar garantías por escrito",
    "Valoras tener un partner que cuestione tus supuestos del negocio, no solo ejecute lo pedido",
    "Tu industria opera bajo NDAs y necesitas un partner con cultura de confidencialidad demostrada",
  ];

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,95,179,0.6) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="pill pill-gold etched-border inline-flex mb-5">
            <Shield className="w-3 h-3" />
            Framework de decisión
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-[-0.04em] mb-4">
            ¿Encajas con{" "}
            <span className="font-serif-display italic gradient-text font-medium">
              Aureon
            </span>
            ?
          </h2>
          <p className="text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
            Si marcas 4 o más, somos probablemente la mejor opción para tu
            etapa actual.
          </p>
        </div>

        <div className="rounded-3xl glass-elevated border border-white/8 p-7 lg:p-9 etched-border-gold">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-display font-semibold mb-5">
            · Checklist honesto
          </p>
          <ul className="space-y-4">
            {checklist.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 pb-4 border-b border-white/8 last:border-b-0 last:pb-0"
              >
                <span className="shrink-0 w-6 h-6 rounded-lg bg-gold-soft border border-gold-soft flex items-center justify-center font-display font-black text-[10px] gradient-text-gold tracking-[-0.02em] mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm sm:text-base text-slate-300/90 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
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
          Siguiente paso
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-[-0.04em] mb-5">
          Si llegaste hasta acá,{" "}
          <span className="font-serif-display italic gradient-text font-medium">
            probablemente lo sentiste
          </span>
          .
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          La primera reunión es 60 minutos con el director que liderará tu
          cuenta. Sin filtros de ventas, sin pitch corporativo. Directo al
          diagnóstico — y si no encajas, te lo decimos en la misma llamada.
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
            href="/herramientas/calculadora-roi"
            className="inline-flex items-center gap-2 px-7 py-4 glass border border-violet-500/25 text-slate-200 font-display font-medium rounded-2xl hover:border-gold-soft hover:text-gold-soft transition-colors etched-border"
          >
            Calcular ROI primero
          </Link>
        </div>
      </div>
    </section>
  );
}
