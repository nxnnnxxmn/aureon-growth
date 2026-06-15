import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Calculadora de ROI · Diagnóstico de growth gratuito",
  description:
    "Calcula el ROI proyectado de tu growth con métricas reales por industria. Diagnóstico de unit economics, benchmark vs. tu vertical y proyección de crecimiento a 6 meses. 100% gratis, sin registro.",
  alternates: {
    canonical: "https://aureongrowth.com/herramientas/calculadora-roi",
  },
  openGraph: {
    title: "Calculadora ROI | Aureon Growth",
    description:
      "Diagnóstico de growth en 3 minutos. Calcula tu LTV:CAC, payback period y proyección de crecimiento por industria.",
    url: "https://aureongrowth.com/herramientas/calculadora-roi",
    type: "website",
  },
};

export default function CalculadoraRoiPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-background">
        <CalculatorClient />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
