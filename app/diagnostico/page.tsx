import type { Metadata } from "next";
import { Search, LayoutGrid, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import PageHeader from "@/components/ui/PageHeader";
import DiagnosticForm from "@/components/sections/DiagnosticForm";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Diagnóstico estratégico",
  description:
    "Solicita un diagnóstico estratégico de Aureon Growth Services. Revisamos marca, canales, funnel y CRM, y te entregamos un mapa de oportunidades priorizadas.",
  alternates: { canonical: "https://aureongrowth.com/diagnostico" },
  openGraph: {
    title: "Diagnóstico estratégico | Aureon Growth Services",
    description:
      "Diagnóstico inicial sin compromiso. Respuesta en menos de 24 horas hábiles.",
    url: "https://aureongrowth.com/diagnostico",
    type: "website",
  },
};

const PALETTE = {
  bg: "#F5F1E8",
  bgWhite: "#FBF8F1",
  text: "#1A1815",
  textMuted: "#6B655E",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  gold: "#C9A961",
  hairline: "rgba(26,24,21,0.10)",
};

const steps = [
  {
    icon: Search,
    title: "Revisamos tu contexto",
    body: "Analizamos marca, oferta, canales activos, tráfico, funnel y CRM a partir de tu información.",
  },
  {
    icon: LayoutGrid,
    title: "Identificamos oportunidades",
    body: "Detectamos los puntos de fricción y las palancas con mayor potencial de impacto comercial.",
  },
  {
    icon: FileText,
    title: "Te damos un punto de partida",
    body: "Coordinamos una conversación para compartir hallazgos y posibles próximos pasos.",
  },
];

export default function DiagnosticoPage() {
  return (
    <>
      <Navbar dark />
      <PageHeader
        eyebrow="Diagnóstico estratégico"
        title={
          <>
            Empecemos por entender tu{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}>
              punto de partida
            </span>
            .
          </>
        }
        description="Cuéntanos sobre tu empresa y tu principal reto. Revisaremos tu caso y te contactaremos en menos de 24 horas hábiles para coordinar el diagnóstico."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Diagnóstico" }]}
      />

      <main style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}>
        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: what to expect */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
                <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: PALETTE.accent }}>
                  Qué incluye
                </span>
              </div>
              <h2 className="font-display font-semibold text-2xl lg:text-3xl leading-tight mb-8" style={{ color: PALETTE.text }}>
                Un diagnóstico, tres resultados concretos.
              </h2>
              <div className="space-y-5">
                {steps.map((s, i) => (
                  <div key={s.title} className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: PALETTE.accentSoft, color: PALETTE.accent }}
                    >
                      <s.icon className="w-5 h-5" strokeWidth={1.6} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[11px] tabular-nums" style={{ color: PALETTE.gold }}>
                          0{i + 1}
                        </span>
                        <h3 className="font-display font-semibold text-base" style={{ color: PALETTE.text }}>
                          {s.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: PALETTE.textMuted }}>
                        {s.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-7">
              <DiagnosticForm />
            </div>
          </div>
        </section>
      </main>

      <FAQ />

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
