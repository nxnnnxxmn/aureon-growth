import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import ServicesSystems from "@/components/sections/ServicesSystems";
import MethodologySection from "@/components/sections/MethodologySection";
import AutomationSection from "@/components/sections/AutomationSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ScenariosSection from "@/components/sections/ScenariosSection";
import WhyAureon from "@/components/sections/WhyAureon";
import Plans from "@/components/sections/Plans";
import DiagnosticCTA from "@/components/sections/DiagnosticCTA";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import GlobalBackdrop from "@/components/fx/GlobalBackdrop";
import VideoWindow from "@/components/fx/VideoWindow";
import WatermarkStatement from "@/components/sections/WatermarkStatement";

export default function Home() {
  return (
    /* .immersive: las secciones se vuelven veladuras translúcidas sobre el
       video fijo de GlobalBackdrop — el fondo cinematográfico respira
       durante TODO el scroll (paralaje de profundidad constante). */
    <main className="immersive relative overflow-hidden">
      <GlobalBackdrop />
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ServicesSystems />
      <MethodologySection showCta />
      <VideoWindow kicker="El sistema en movimiento" />
      <AutomationSection />
      <ProcessSection />
      <ScenariosSection limit={3} />
      <WhyAureon />
      <WatermarkStatement />
      <Plans variant="light" />
      <DiagnosticCTA />
      <FAQ limit={5} />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
