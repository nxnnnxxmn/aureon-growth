import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import PageHeader from "@/components/ui/PageHeader";
import ServicesMatrix from "@/components/sections/ServicesMatrix";
import Plans from "@/components/sections/Plans";
import { GROWTH_SYSTEMS } from "@/lib/growth";
import { A } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Servicios · Sistemas de crecimiento",
  description:
    "Los cuatro sistemas de Aureon Growth Services: Brand Authority, Acquisition Engine, Revenue Automation y Growth Intelligence. Branding, performance, automatización, CRM e IA.",
  alternates: { canonical: "https://aureon-growth.vercel.app/servicios" },
  openGraph: {
    title: "Servicios | Aureon Growth Services",
    description: "Cuatro sistemas de crecimiento integrados: marca, adquisición, automatización y analítica.",
    url: "https://aureon-growth.vercel.app/servicios",
    type: "website",
  },
};

export default function ServiciosPage() {
  return (
    <>
      <Navbar dark />
      <PageHeader
        eyebrow="Servicios"
        title={<>Sistemas de crecimiento,{" "}<span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>no servicios sueltos</span>.</>}
        description="Agrupamos cada disciplina en cuatro sistemas que se integran entre sí. Puedes contratarlos de forma integral o por sistema, según la etapa de tu empresa."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
      />

      <main style={{ backgroundColor: A.bg, color: A.text }}>
        <section className="relative overflow-hidden max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="space-y-6">
            {GROWTH_SYSTEMS.map((s, i) => (
              <div key={s.slug} className="card-3d surface grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-10" style={{ backgroundColor: A.surface }}>
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${A.gold}, ${A.violet})` }}>
                      <s.icon className="w-6 h-6" style={{ color: A.bg }} strokeWidth={1.6} />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: A.gold }}>0{i + 1} · {s.short}</span>
                  </div>
                  <h2 className="font-display font-semibold text-2xl lg:text-3xl leading-tight mb-3" style={{ color: A.text }}>{s.name}</h2>
                  <p className="text-sm lg:text-base leading-relaxed mb-6" style={{ color: A.text2 }}>{s.summary}</p>
                  <Link href={`/servicios/${s.slug}`} className="btn-premium focus-ring inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-semibold text-sm" style={{ backgroundColor: A.gold, color: A.bg }}>
                    Explorar sistema <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="lg:col-span-7 lg:border-l lg:pl-10" style={{ borderColor: A.border }}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: A.gold }}>Incluye</div>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                    {s.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: A.gold }} strokeWidth={2.5} />
                        <span className="text-sm" style={{ color: A.text }}>{d}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(124,92,191,0.12)", border: `1px solid ${A.border}` }}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: A.gold }}>Resultado esperado</div>
                    <div className="text-sm font-medium" style={{ color: A.text }}>{s.outcome}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/diagnostico" className="btn-premium focus-ring inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm" style={{ backgroundColor: A.gold, color: A.bg, boxShadow: "0 14px 36px -10px rgba(214,180,106,0.45)" }}>
              Diseñar mi sistema de crecimiento <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 24 services catalog */}
        <section className="relative overflow-hidden py-20 lg:py-28" style={{ backgroundColor: A.bg2, borderTop: `1px solid ${A.border}` }}>
          <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-35" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10" style={{ backgroundColor: A.gold }} />
                <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>24 especialidades</span>
              </div>
              <h2 className="font-display font-semibold text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.06] tracking-[-0.02em] mb-5" style={{ color: A.text }}>
                Todas las disciplinas, organizadas por{" "}
                <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>sistema</span>.
              </h2>
              <p className="text-base lg:text-lg leading-relaxed" style={{ color: A.text2 }}>
                Cada especialidad pertenece a uno de los cuatro sistemas. Filtra por categoría para ver cómo se agrupan.
              </p>
            </div>
            <ServicesMatrix />
          </div>
        </section>
      </main>

      <Plans />

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
