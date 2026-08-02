import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import InstagramCarousel from "@/components/sections/InstagramCarousel";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Carrusel de Posts · Instagram",
  description: "8 posts premium para Instagram de Aureon Growth Services",
};

export default function InstagramCarouselPage() {
  return (
    <>
      <Navbar dark />
      <PageHeader
        eyebrow="Social"
        title="Posts para Instagram"
        description="8 posts creativos y premium listos para publicar. Combina insights estratégicos, tips accionables, datos motivacionales y descripción de sistemas."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Instagram Carousel" }]}
      />

      <main style={{ backgroundColor: "#0a0813", color: "#fff", minHeight: "60vh", paddingTop: "60px", paddingBottom: "60px" }}>
        <InstagramCarousel />
      </main>

      <Footer />
    </>
  );
}
