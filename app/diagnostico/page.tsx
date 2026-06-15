import type { Metadata } from "next";
import { Compass, Crosshair, Database, Workflow, LineChart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import PageHeader from "@/components/ui/PageHeader";
import DiagnosticForm from "@/components/sections/DiagnosticForm";
import FAQ from "@/components/sections/FAQ";
import { A } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Diagnóstico estratégico",
  description:
    "Solicita un diagnóstico estratégico de Aureon Growth Services. Revisamos marca, canales, funnel y CRM, y te entregamos un mapa de oportunidades priorizadas.",
  alternates: { canonical: "https://aureongrowth.com/diagnostico" },
  openGraph: { title: "Diagnóstico estratégico | Aureon Growth Services", description: "Diagnóstico inicial sin compromiso. Respuesta en menos de 24 horas hábiles.", url: "https://aureongrowth.com/diagnostico", type: "website" },
};

const PREVIEW = [
  { icon: Compass, label: "Brand clarity", note: "Posicionamiento y mensaje", color: A.gold },
  { icon: Crosshair, label: "Lead acquisition", note: "Canales y campañas", color: A.violet },
  { icon: Database, label: "CRM tracking", note: "Pipeline y seguimiento", color: A.blue },
  { icon: Workflow, label: "Automation readiness", note: "Flujos e integraciones", color: A.gold },
  { icon: LineChart, label: "Analytics maturity", note: "Medición y reporting", color: A.blue },
];

export default function DiagnosticoPage() {
  return (
    <>
      <Navbar dark />
      <PageHeader
        eyebrow="Diagnóstico estratégico"
        title={<>Empecemos por entender tu{" "}<span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>punto de partida</span>.</>}
        description="Cuéntanos sobre tu empresa y tu principal reto. Revisaremos tu caso y te contactaremos en menos de 24 horas hábiles para coordinar el diagnóstico."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Diagnóstico" }]}
      />

      <main className="relative overflow-hidden" style={{ backgroundColor: A.bg, color: A.text }}>
        <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-30" />
        <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Diagnostic preview panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="glass border-grad rounded-3xl p-7 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: A.gold }}>Diagnostic Preview</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: A.textDim }}>5 dimensiones</span>
                </div>

                <div className="space-y-3">
                  {PREVIEW.map((p) => (
                    <div key={p.label} className="flex items-center gap-3 rounded-2xl px-4 py-3.5" style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}>
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                        <p.icon className="w-4.5 h-4.5" style={{ color: p.color, width: 18, height: 18 }} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold text-sm" style={{ color: A.text }}>{p.label}</div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>{p.note}</div>
                      </div>
                      <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: A.text2 }}>
                        To evaluate
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs leading-relaxed mt-6" style={{ color: A.textDim }}>
                  Vista previa del tipo de análisis. Los estados reales se completan
                  durante tu diagnóstico — no son resultados automáticos.
                </p>
              </div>
            </div>

            {/* Form */}
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
