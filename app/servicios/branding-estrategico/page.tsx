import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Compass,
  MessageSquareQuote,
  Palette,
  FileText,
  Search,
  Target,
  Megaphone,
  Layers,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Crosshair,
  Workflow,
  LineChart,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import ServicesMatrix from "@/components/sections/ServicesMatrix";
import Plans from "@/components/sections/Plans";
import {
  BrandModules,
  BrandDeliverables,
  BeforeAfter,
  ServiceFAQ,
  SectionNav,
} from "@/components/sections/BrandingParts";
import { waLink } from "@/lib/whatsapp";

const C = {
  bgDeep: "#08070D",
  bg: "#0D0B18",
  bgAlt: "#0A0912",
  panel: "rgba(255,255,255,0.045)",
  panelSolid: "#11101A",
  text: "#F0EDF8",
  textMuted: "#A8B4C8",
  textSoft: "#6F7890",
  accent: "#D6B46A",
  accentDeep: "#7C5CBF",
  gold: "#D6B46A",
  goldBright: "#E2C58A",
  blue: "#3B6FD4",
  hairline: "rgba(255,255,255,0.10)",
};

export const metadata: Metadata = {
  title: "Branding Estratégico",
  description:
    "Construimos sistemas de branding estratégico: posicionamiento, identidad verbal, sistema visual, contenido y una marca preparada para crecer. Brand Authority System de Aureon Growth Services.",
  alternates: { canonical: "https://aureon-growth.vercel.app/servicios/branding-estrategico" },
  openGraph: {
    title: "Branding Estratégico | Aureon Growth Services",
    description:
      "Brand Authority System: posicionamiento, identidad verbal, sistema visual y aplicación comercial para vender mejor y diferenciarse.",
    url: "https://aureon-growth.vercel.app/servicios/branding-estrategico",
    type: "article",
  },
};

const PROBLEMS = [
  { icon: Compass, t: "Logo, pero no posicionamiento", d: "Tienen marca visual, pero nadie sabe explicar por qué elegirlos." },
  { icon: FileText, t: "Contenido, pero no narrativa", d: "Publican constante, sin un hilo que construya autoridad." },
  { icon: Palette, t: "Diseño, pero no diferenciación", d: "Se ven bien, pero igual que toda su categoría." },
  { icon: Megaphone, t: "Campañas, pero mensajes débiles", d: "Invierten en anuncios con promesas que no conectan." },
  { icon: ShieldCheck, t: "Web bonita, pero baja confianza", d: "El sitio se ve, pero no transmite solidez ni valor." },
  { icon: Target, t: "Equipo comercial, sin discurso claro", d: "Cada vendedor cuenta una historia distinta de la marca." },
];

const PROCESS_BRAND = [
  { n: "01", icon: Search, t: "Diagnóstico de marca", d: "Revisamos web, redes, mensajes, propuesta de valor, competencia y percepción." },
  { n: "02", icon: Compass, t: "Claridad estratégica", d: "Definimos posicionamiento, audiencia, promesa, diferenciadores y narrativa central." },
  { n: "03", icon: MessageSquareQuote, t: "Sistema verbal", d: "Construimos tono, mensajes, claims, storytelling y arquitectura de comunicación." },
  { n: "04", icon: Palette, t: "Dirección visual", d: "Organizamos estética, paleta, estilo, componentes, referencias y lineamientos." },
  { n: "05", icon: Layers, t: "Aplicación comercial", d: "Llevamos la marca a web, campañas, contenido, WhatsApp, emails y ventas." },
  { n: "06", icon: TrendingUp, t: "Optimización", d: "Revisamos claridad, conversión, consistencia y percepción tras implementar." },
];

const SCENARIOS_BRAND = [
  { t: "Buen producto, marca que no transmite valor", problem: "El producto es sólido, pero la comunicación no refleja su nivel.", action: "Posicionamiento + sistema visual + narrativa de valor.", result: "Una marca que comunica su calidad antes de vender." },
  { t: "Invierte en anuncios, pero no convierte", problem: "Hay tráfico pagado, pero el mensaje es débil y disperso.", action: "Arquitectura verbal + claims + mensajes por funnel.", result: "Campañas con una promesa clara y consistente." },
  { t: "Redes activas, sin autoridad", problem: "Publican seguido, pero sin narrativa ni diferenciación.", action: "Pilares de contenido + líneas editoriales + tono.", result: "Contenido que construye autoridad temática." },
  { t: "B2B con equipo comercial sin discurso", problem: "Cada vendedor improvisa su versión de la marca.", action: "Discurso de ventas + objeciones + guiones.", result: "Un equipo alineado con un mismo mensaje." },
  { t: "Quiere subir precios, percepción no acompaña", problem: "La estética no respalda un posicionamiento premium.", action: "Dirección creativa + sistema visual premium.", result: "Una percepción acorde al valor que cobra." },
  { t: "Startup con tecnología fuerte, comunicación confusa", problem: "El producto es potente, pero nadie entiende qué hace.", action: "Claridad estratégica + narrativa + mensajes clave.", result: "Una propuesta que se entiende en segundos." },
];

const INTEGRATIONS = [
  { icon: Crosshair, name: "Acquisition Engine", href: "/servicios/performance-marketing", d: "Convierte el posicionamiento en anuncios, landing pages y funnels coherentes." },
  { icon: Workflow, name: "Revenue Automation", href: "/servicios/automatizacion-crm-ia", d: "Transforma el tono de marca en secuencias de WhatsApp, email y CRM." },
  { icon: LineChart, name: "Growth Intelligence", href: "/servicios/analitica-growth-intelligence", d: "Mide qué mensajes, ángulos y propuestas generan más respuesta." },
];

const FAQ_BRAND = [
  { q: "¿Esto es solo diseño de logo?", a: "No. El logo es una parte mínima. Brand Authority System trabaja posicionamiento, narrativa, sistema visual, contenido y aplicación comercial — la marca como herramienta de venta, no solo como estética." },
  { q: "¿Qué diferencia hay entre branding estratégico e identidad visual?", a: "La identidad visual es cómo se ve la marca. El branding estratégico define qué representa, para quién, con qué promesa y con qué mensajes. La identidad visual es una consecuencia de esa estrategia." },
  { q: "¿Puedo contratar solo Brand Authority System?", a: "Sí. Puede contratarse de forma independiente o integrado con los demás sistemas (performance, automatización y analítica) según tu etapa." },
  { q: "¿Este sistema ayuda a mejorar campañas de performance?", a: "Sí. Un posicionamiento y unos mensajes claros mejoran el ángulo creativo, la promesa y la resolución de objeciones en cada campaña." },
  { q: "¿Incluye contenido y mensajes para redes?", a: "Incluye pilares de contenido, líneas editoriales, mensajes por etapa de funnel y guías de comunicación. La producción continua puede sumarse según el plan." },
  { q: "¿Incluye guía visual completa?", a: "Sí: dirección creativa, paleta, tipografía, componentes, estilo de imágenes, iconografía y reglas de uso." },
  { q: "¿Sirve para empresas B2B?", a: "Especialmente. En B2B, un discurso claro y consistente alinea marketing y ventas, y reduce la fricción en ciclos de decisión largos." },
  { q: "¿Sirve si ya tengo logo?", a: "Sí. Partimos de lo existente: auditamos tu marca actual y construimos la estrategia y el sistema alrededor, evitando rehacer lo que ya funciona." },
  { q: "¿Cuánto tiempo puede tomar un proyecto de branding estratégico?", a: "Depende del alcance. Un sistema de marca suele construirse en ciclos de semanas; la aplicación comercial y la optimización son continuas." },
  { q: "¿Cómo se conecta con automatización, CRM y funnels?", a: "El tono y los mensajes de marca alimentan los flujos de automatización, los scripts comerciales y la estructura de cada funnel, para que todo se sienta coherente." },
];

export default function BrandingEstrategicoPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Branding Estratégico — Brand Authority System",
    description: metadata.description,
    provider: { "@type": "Organization", name: "Aureon Growth Services", url: "https://aureon-growth.vercel.app" },
    areaServed: ["Colombia", "Latinoamérica", "España", "Estados Unidos"],
    url: "https://aureon-growth.vercel.app/servicios/branding-estrategico",
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_BRAND.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://aureon-growth.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Servicios", item: "https://aureon-growth.vercel.app/servicios" },
      { "@type": "ListItem", position: 3, name: "Branding Estratégico", item: "https://aureon-growth.vercel.app/servicios/branding-estrategico" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Navbar dark />

      <main style={{ backgroundColor: C.bgDeep, color: C.text }}>
        {/* ===================== HERO ===================== */}
        <section id="vision" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          {/* glows + grid */}
          <div aria-hidden className="absolute -top-40 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(214,180,106,0.18) 0%, transparent 60%)" }} />
          <div aria-hidden className="absolute -bottom-40 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(201,169,97,0.12) 0%, transparent 60%)" }} />
          <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${C.gold} 1px, transparent 0)`, backgroundSize: "28px 28px" }} />

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
            {/* breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.18em]">
                <li><Link href="/" style={{ color: C.textSoft }}>Inicio</Link></li>
                <li style={{ color: C.hairline }}>/</li>
                <li><Link href="/servicios" style={{ color: C.textSoft }}>Servicios</Link></li>
                <li style={{ color: C.hairline }}>/</li>
                <li style={{ color: C.gold }}>Branding Estratégico</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* copy */}
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-[0.22em] mb-6" style={{ backgroundColor: "rgba(124,92,191,0.16)", color: C.accent }}>
                  <Sparkles className="w-3 h-3" />
                  Servicio estratégico · Brand Authority System
                </span>
                <h1 className="font-display font-semibold text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] mb-6" style={{ color: C.text }}>
                  Branding estratégico para marcas más{" "}
                  <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: C.gold }}>
                    claras, confiables
                  </span>{" "}
                  y preparadas para crecer.
                </h1>
                <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: C.textMuted }}>
                  El Brand Authority System convierte posicionamiento, identidad
                  verbal, narrativa, contenido y dirección visual en una base
                  estratégica para vender mejor, diferenciarse y escalar con
                  consistencia.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/diagnostico" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5" style={{ backgroundColor: C.gold, color: C.bg, boxShadow: "0 14px 36px -10px rgba(214,180,106,0.5)" }}>
                    Solicitar diagnóstico de marca
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="#entregables" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-display font-semibold text-sm transition-colors" style={{ border: `1.5px solid ${C.hairline}`, color: C.text }}>
                    Ver entregables del sistema
                  </a>
                </div>
                <p className="mt-5 text-sm flex items-center gap-2" style={{ color: C.textSoft }}>
                  <MessageCircle className="w-3.5 h-3.5" style={{ color: C.accent }} />
                  Diagnóstico inicial sin compromiso · enfoque estratégico, visual y comercial.
                </p>
              </div>

              {/* 3D-ish floating system mockup */}
              <div className="lg:col-span-6">
                <div className="relative mx-auto max-w-md aspect-square" style={{ perspective: "1200px" }}>
                  {/* central core */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-3xl flex flex-col items-center justify-center text-center aureon-float" style={{ background: "radial-gradient(circle at 30% 30%, #2D2825, #14110E)", border: `1px solid ${C.hairline}`, boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7)" }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2" style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})` }}>
                      <Compass className="w-6 h-6" style={{ color: C.text }} />
                    </div>
                    <div className="font-display font-bold text-sm" style={{ color: C.text }}>Brand Authority</div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: C.gold }}>System</div>
                  </div>

                  {/* floating module chips */}
                  <FloatChip className="aureon-float-2" style={{ top: "2%", left: "4%", "--rot": "-6deg" } as React.CSSProperties} icon={<MessageSquareQuote className="w-4 h-4" style={{ color: C.gold }} />} label="Identidad verbal" />
                  <FloatChip className="aureon-float-3" style={{ top: "8%", right: "0%", "--rot": "5deg" } as React.CSSProperties} icon={<Palette className="w-4 h-4" style={{ color: C.gold }} />} label="Sistema visual" />
                  <FloatChip className="aureon-float" style={{ bottom: "10%", left: "0%", "--rot": "4deg" } as React.CSSProperties} icon={<FileText className="w-4 h-4" style={{ color: C.gold }} />} label="Contenido por funnel" />
                  <FloatChip className="aureon-float-2" style={{ bottom: "2%", right: "6%", "--rot": "-5deg" } as React.CSSProperties} icon={<Target className="w-4 h-4" style={{ color: C.gold }} />} label="Posicionamiento" />

                  {/* connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" aria-hidden>
                    <g stroke={C.gold} strokeWidth="0.6" opacity="0.25" strokeDasharray="3,4">
                      <line x1="200" y1="200" x2="80" y2="60" />
                      <line x1="200" y1="200" x2="330" y2="80" />
                      <line x1="200" y1="200" x2="70" y2="330" />
                      <line x1="200" y1="200" x2="330" y2="350" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== STICKY SECTION NAV ===================== */}
        <SectionNav />

        {/* ===================== PROBLEM ===================== */}
        <section className="py-20 lg:py-28" style={{ backgroundColor: C.bg }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-14">
              <Eyebrow>El problema</Eyebrow>
              <H2>
                El problema no es solo verse mejor. Es no tener una marca que{" "}
                <Ital>ordene la venta</Ital>.
              </H2>
              <Lead>
                Muchas empresas tienen piezas sueltas — logo, contenido, campañas —
                pero no un sistema de marca que las conecte y les dé dirección comercial.
              </Lead>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROBLEMS.map((p) => (
                <div key={p.t} className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: C.panel, border: `1px solid ${C.hairline}` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(124,92,191,0.16)" }}>
                    <p.icon className="w-5 h-5" style={{ color: C.accent }} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-2" style={{ color: C.text }}>{p.t}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== WHAT IS ===================== */}
        <section className="py-20 lg:py-28" style={{ backgroundColor: C.bgDeep }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Eyebrow>Qué es</Eyebrow>
              <H2>
                Brand Authority System: la marca como{" "}
                <Ital>herramienta comercial</Ital>.
              </H2>
              <Lead>
                No es solo diseño gráfico. Es el sistema de branding estratégico de
                Aureon Growth Services: clarifica el posicionamiento, ordena los
                mensajes, construye confianza visual y crea una narrativa consistente
                para campañas, contenido, ventas, web y automatización.
              </Lead>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Estrategia de marca", "Arquitectura verbal", "Identidad visual", "Contenido", "UX", "Performance", "Funnels", "Ventas", "Confianza comercial"].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(201,169,97,0.10)", color: C.goldBright, border: `1px solid rgba(201,169,97,0.2)` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl p-8" style={{ backgroundColor: C.panelSolid, border: `1px solid ${C.hairline}` }}>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-5" style={{ color: C.gold }}>De la estrategia a la venta</div>
                <div className="space-y-3">
                  {[
                    { k: "Estrategia", v: "Posicionamiento + promesa + diferenciadores" },
                    { k: "Lenguaje", v: "Narrativa + mensajes + tono" },
                    { k: "Visual", v: "Dirección creativa + sistema gráfico" },
                    { k: "Aplicación", v: "Web, campañas, contenido, CRM y ventas" },
                  ].map((row, i) => (
                    <div key={row.k} className="flex items-center gap-4 rounded-2xl px-5 py-4" style={{ backgroundColor: C.panel, border: `1px solid ${C.hairline}` }}>
                      <span className="font-mono text-xs tabular-nums" style={{ color: C.gold }}>0{i + 1}</span>
                      <div>
                        <div className="font-display font-semibold text-sm" style={{ color: C.text }}>{row.k}</div>
                        <div className="text-xs" style={{ color: C.textMuted }}>{row.v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== MODULES ===================== */}
        <section id="modulos" className="py-20 lg:py-28" style={{ backgroundColor: C.bg }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-12">
              <Eyebrow>Módulos del sistema</Eyebrow>
              <H2>Seis módulos que construyen <Ital>autoridad de marca</Ital>.</H2>
            </div>
            <BrandModules />
          </div>
        </section>

        {/* ===================== DELIVERABLES ===================== */}
        <section id="entregables" className="py-20 lg:py-28" style={{ backgroundColor: C.bgDeep }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-12">
              <Eyebrow>Entregables</Eyebrow>
              <H2>Lo que puede <Ital>incluir el sistema</Ital>.</H2>
              <Lead>Agrupados por categoría. El alcance exacto se define en el diagnóstico según tu etapa y objetivos.</Lead>
            </div>
            <BrandDeliverables />
          </div>
        </section>

        {/* ===================== 24 SERVICES MATRIX ===================== */}
        <section id="servicios-24" className="py-20 lg:py-28" style={{ backgroundColor: C.bg }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-12">
              <Eyebrow>Integración</Eyebrow>
              <H2>Cómo el branding conecta con los <Ital>24 servicios</Ital> de Aureon.</H2>
              <Lead>El branding estratégico no trabaja aislado: es la base que da coherencia a cada disciplina. Filtra por categoría y pasa el cursor para ver la conexión.</Lead>
            </div>
            <ServicesMatrix variant="dark" showRelation />
          </div>
        </section>

        {/* ===================== PROCESS ===================== */}
        <section id="proceso-marca" className="py-20 lg:py-28" style={{ backgroundColor: C.bgDeep }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-14">
              <Eyebrow>Proceso del servicio</Eyebrow>
              <H2>Cómo construimos <Ital>autoridad de marca</Ital>.</H2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROCESS_BRAND.map((s) => (
                <div key={s.n} className="rounded-2xl p-6" style={{ backgroundColor: C.panel, border: `1px solid ${C.hairline}` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(124,92,191,0.16)" }}>
                      <s.icon className="w-5 h-5" style={{ color: C.accent }} strokeWidth={1.6} />
                    </div>
                    <span className="font-mono text-xs tabular-nums" style={{ color: C.gold }}>{s.n}</span>
                  </div>
                  <h3 className="font-display font-semibold text-base mb-1.5" style={{ color: C.text }}>{s.t}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== BEFORE / AFTER ===================== */}
        <section className="py-20 lg:py-28" style={{ backgroundColor: C.bg }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-10">
              <Eyebrow>Antes / Después</Eyebrow>
              <H2>El impacto de tener un <Ital>sistema de marca</Ital>.</H2>
            </div>
            <BeforeAfter />
          </div>
        </section>

        {/* ===================== SCENARIOS ===================== */}
        <section className="py-20 lg:py-28" style={{ backgroundColor: C.bgDeep }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-12">
              <Eyebrow>Escenarios de aplicación</Eyebrow>
              <H2>Dónde el branding estratégico <Ital>cambia el resultado</Ital>.</H2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SCENARIOS_BRAND.map((s) => (
                <div key={s.t} className="rounded-3xl p-7 flex flex-col" style={{ backgroundColor: C.panel, border: `1px solid ${C.hairline}` }}>
                  <h3 className="font-display font-semibold text-base leading-snug mb-4" style={{ color: C.text }}>{s.t}</h3>
                  <div className="space-y-3 flex-1 text-sm leading-relaxed">
                    <Row label="Situación" value={s.problem} />
                    <Row label="Intervención" value={s.action} />
                  </div>
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: C.hairline }}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: C.gold }}>Resultado</div>
                    <p className="text-sm font-medium" style={{ color: C.text }}>{s.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== INTEGRATION RADIAL ===================== */}
        <section className="py-20 lg:py-28" style={{ backgroundColor: C.bg }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-14">
              <Eyebrow>Sistema integrado</Eyebrow>
              <H2>El branding como <Ital>base del crecimiento</Ital>.</H2>
              <Lead>Brand Authority alimenta a los demás sistemas de Aureon: una sola estrategia de marca recorre adquisición, automatización y analítica.</Lead>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* radial diagram */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-sm aspect-square">
                  <svg viewBox="0 0 320 320" className="w-full h-full" aria-hidden>
                    <defs>
                      <radialGradient id="bGlow" cx="0.5" cy="0.5"><stop offset="0%" stopColor="rgba(214,180,106,0.35)" /><stop offset="100%" stopColor="rgba(214,180,106,0)" /></radialGradient>
                    </defs>
                    <circle cx="160" cy="160" r="120" fill="url(#bGlow)" />
                    <circle cx="160" cy="160" r="120" fill="none" stroke={C.gold} strokeWidth="0.6" opacity="0.4" strokeDasharray="3,4" />
                    {[[160,40],[280,230],[40,230]].map(([x,y],i)=>(
                      <line key={i} x1="160" y1="160" x2={x} y2={y} stroke={C.gold} strokeWidth="0.6" opacity="0.3" />
                    ))}
                    <circle cx="160" cy="40" r="6" fill={C.accent} />
                    <circle cx="280" cy="230" r="6" fill={C.gold} />
                    <circle cx="40" cy="230" r="6" fill={C.blue} />
                  </svg>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full flex flex-col items-center justify-center text-center" style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`, boxShadow: "0 0 40px rgba(214,180,106,0.4)" }}>
                    <Compass className="w-6 h-6 mb-1" style={{ color: C.text }} />
                    <span className="font-display font-bold text-xs leading-tight" style={{ color: C.text }}>Brand<br/>Authority</span>
                  </div>
                </div>
              </div>
              {/* connections */}
              <div className="lg:col-span-7 space-y-4">
                {INTEGRATIONS.map((it) => (
                  <Link key={it.name} href={it.href} className="group flex items-start gap-4 rounded-2xl p-6 transition-all hover:-translate-y-1" style={{ backgroundColor: C.panel, border: `1px solid ${C.hairline}` }}>
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(201,169,97,0.12)" }}>
                      <it.icon className="w-5 h-5" style={{ color: C.gold }} strokeWidth={1.6} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-base" style={{ color: C.text }}>{it.name}</h3>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: C.textSoft }} />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{it.d}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== PLANS (dark) ===================== */}
        <div style={{ backgroundColor: C.bgDeep }}>
          <Plans variant="dark" showBrandRole />
        </div>

        {/* ===================== FAQ ===================== */}
        <section id="faq" className="py-20 lg:py-28" style={{ backgroundColor: C.bg }}>
          <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
            <div className="max-w-2xl mb-12">
              <Eyebrow>Preguntas frecuentes</Eyebrow>
              <H2>Branding estratégico, <Ital>sin rodeos</Ital>.</H2>
            </div>
            <ServiceFAQ items={FAQ_BRAND} />
          </div>
        </section>

        {/* ===================== CTA ===================== */}
        <section className="py-24 lg:py-32 text-center relative overflow-hidden" style={{ backgroundColor: C.bgDeep }}>
          <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(214,180,106,0.16) 0%, transparent 60%)" }} />
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12">
            <H2>
              Tu marca no necesita verse más bonita. Necesita{" "}
              <Ital>comunicar mejor y sostener la venta</Ital>.
            </H2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto mt-6 mb-10" style={{ color: C.textMuted }}>
              Diferénciate con claridad y construye un sistema de marca que pueda escalar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/diagnostico" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm transition-all hover:-translate-y-0.5" style={{ backgroundColor: C.gold, color: C.bg, boxShadow: "0 14px 36px -10px rgba(214,180,106,0.5)" }}>
                Solicitar diagnóstico de marca
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/servicios" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-display font-semibold text-sm transition-colors" style={{ border: `1.5px solid ${C.hairline}`, color: C.text }}>
                Ver todos los servicios
              </Link>
            </div>
            <a href={waLink("default")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 text-sm" style={{ color: C.textSoft }}>
              <MessageCircle className="w-4 h-4" style={{ color: C.accent }} />
              O escríbenos por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

// ---- small presentational helpers (server) ----
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-10" style={{ backgroundColor: C.accent }} />
      <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: C.accent }}>{children}</span>
    </div>
  );
}
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-semibold text-[clamp(1.85rem,4.5vw,3.25rem)] leading-[1.06] tracking-[-0.02em]" style={{ color: C.text }}>
      {children}
    </h2>
  );
}
function Ital({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: C.gold }}>{children}</span>;
}
function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-base lg:text-lg leading-relaxed mt-5 max-w-2xl" style={{ color: C.textMuted }}>{children}</p>;
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-0.5" style={{ color: C.gold }}>{label}</div>
      <p style={{ color: C.textMuted }}>{value}</p>
    </div>
  );
}
function FloatChip({ className = "", style, icon, label }: { className?: string; style?: React.CSSProperties; icon: React.ReactNode; label: string }) {
  return (
    <div className={`absolute ${className}`} style={style}>
      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl" style={{ backgroundColor: "rgba(34,31,27,0.9)", border: `1px solid ${C.hairline}`, boxShadow: "0 18px 40px -20px rgba(0,0,0,0.8)" }}>
        {icon}
        <span className="font-display font-semibold text-xs whitespace-nowrap" style={{ color: C.text }}>{label}</span>
      </div>
    </div>
  );
}
