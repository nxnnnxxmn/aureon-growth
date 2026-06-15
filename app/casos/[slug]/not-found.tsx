import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export default function CaseNotFound() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-background pt-24 pb-16">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-15 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(128,84,194,0.7) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Big 404 watermark */}
          <div
            aria-hidden
            className="absolute -top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(10rem, 22vw, 18rem)",
              lineHeight: 0.8,
              letterSpacing: "-0.07em",
              background:
                "linear-gradient(180deg, rgba(128,84,194,0.15) 0%, rgba(128,84,194,0) 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </div>

          <div className="relative pt-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-plum mb-6 shadow-glow-violet-sm">
              <Search className="w-6 h-6 text-white" />
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight mb-4">
              Este caso no existe (aún)
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-md mx-auto">
              El caso que buscas se mudó, lo retiramos o nunca existió. Pero
              tenemos otros casos reales con métricas verificadas esperando por
              ti.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/casos"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-plum text-white font-display font-semibold rounded-2xl btn-glow"
              >
                Ver todos los casos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 glass border border-violet-500/25 text-slate-200 font-display font-medium rounded-2xl hover:border-violet-400/50 hover:bg-violet-500/10 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
