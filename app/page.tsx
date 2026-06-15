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

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ServicesSystems />
      <MethodologySection showCta />
      <AutomationSection />
      <ProcessSection />
      <ScenariosSection limit={3} />
      <WhyAureon />
      <Plans variant="light" />
      <DiagnosticCTA />
      <FAQ limit={5} />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
