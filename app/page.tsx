import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Results from "@/components/sections/Results";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import AiAutomation from "@/components/sections/AiAutomation";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Results />
      <Portfolio />
      <Process />
      <AiAutomation />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
