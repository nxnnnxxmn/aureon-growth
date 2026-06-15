import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import PageHeader from "@/components/ui/PageHeader";
import ScenariosSection from "@/components/sections/ScenariosSection";

export const metadata: Metadata = {
  title: "Escenarios de aplicación",
  description:
    "Escenarios reales donde Aureon Growth Services genera impacto: producto fuerte con pipeline débil, campañas sin CRM, leads que no convierten y más.",
  alternates: { canonical: "https://aureon-growth.vercel.app/casos" },
  openGraph: {
    title: "Escenarios de aplicación | Aureon Growth Services",
    description:
      "Contextos típicos donde nuestra metodología aporta valor, con el sistema activado en cada caso.",
    url: "https://aureon-growth.vercel.app/casos",
    type: "website",
  },
};

export default function CasosPage() {
  return (
    <>
      <Navbar dark />
      <PageHeader
        eyebrow="Escenarios de aplicación"
        title={
          <>
            Dónde un sistema de crecimiento{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}>
              cambia el resultado
            </span>
            .
          </>
        }
        description="Cada negocio llega con un punto de fricción distinto. Estos son los escenarios más recurrentes donde aplicamos nuestra metodología y el sistema que activamos en cada caso."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Escenarios" }]}
      />

      <ScenariosSection />

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
