"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { A } from "@/lib/ui";
import { Button } from "@/components/ds";
import Magnetic from "@/components/fx/Magnetic";
import ShinyText from "@/components/fx/ShinyText";

/* Video cinematográfico de fondo (referencia provista).
   Cambiar aquí para usar un asset propio de marca. */
const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const reduced = useReducedMotion();

  /* Con reduced-motion el video se pausa en su primer frame:
     sigue siendo un fondo cinematográfico, solo que quieto. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduced) v.pause();
  }, [reduced]);

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: easeOut },
        };

  return (
    <section
      id="inicio"
      className="relative isolate flex flex-col h-[100svh] min-h-[640px] w-full overflow-hidden"
      style={{ backgroundColor: "#000000", color: A.text }}
    >
      {/* ── Capa 0: video cinematográfico fullscreen ── */}
      {!videoFailed && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          onError={() => setVideoFailed(true)}
        />
      )}
      {/* Fallback / atmósfera si el video no carga */}
      {videoFailed && (
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-0 tech-grid opacity-50" />
          <div className="absolute -top-40 right-[-10%] w-[760px] h-[760px] rounded-full glow-gold" />
          <div className="absolute bottom-[-20%] left-[-12%] w-[680px] h-[680px] rounded-full glow-violet" />
        </div>
      )}

      {/* ── Capa 1: overlays de legibilidad y marca ── */}
      <div aria-hidden className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.52)" }} />
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 38%, rgba(0,0,0,0.25) 70%, #08070D 100%)" }} />
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(214,180,106,0.10) 0%, transparent 65%)" }} />

      {/* ── Contenido ── */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 lg:pt-32 pb-10">

        {/* Strip superior — dos columnas */}
        <motion.div {...fadeUp(0.15)} className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-start">
          <p className="text-sm md:text-base leading-relaxed max-w-md" style={{ color: "rgba(240,237,248,0.8)" }}>
            Integramos branding, performance, funnels, CRM, automatización e
            inteligencia artificial en una sola arquitectura comercial medible.
          </p>
          <p className="text-sm md:text-base font-display font-medium lg:text-right lg:justify-self-end max-w-xs" style={{ color: "rgba(240,237,248,0.8)" }}>
            Sistemas de crecimiento para Colombia, Latinoamérica, España y EE.&nbsp;UU.
          </p>
        </motion.div>

        {/* Centro — titular monumental */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.p
            {...fadeUp(0.3)}
            className="font-mono uppercase text-xs md:text-sm tracking-[0.24em] mb-6 md:mb-8"
            style={{ color: "rgba(240,237,248,0.8)" }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle" style={{ backgroundColor: A.gold, boxShadow: `0 0 10px ${A.gold}` }} />
            Engineering-grade Growth System
          </motion.p>

          <motion.h1
            {...fadeUp(0.42)}
            className="font-display tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            style={{ lineHeight: 0.85 }}
          >
            <span className="block font-medium" style={{ color: "#FFFFFF" }}>Construimos</span>
            <span className="block font-semibold mt-2 md:mt-3 pb-2">
              <ShinyText text="Sistemas de Crecimiento." speed={3} spread={100} />
            </span>
          </motion.h1>

          <motion.div {...fadeUp(0.58)} className="flex flex-col sm:flex-row items-center gap-3 mt-10 md:mt-12">
            <Magnetic>
              <Button
                href="/diagnostico"
                size="lg"
                className="group px-6 md:px-8 py-3 md:py-4"
                iconRight={<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
              >
                Solicitar diagnóstico estratégico
              </Button>
            </Magnetic>
            <Button href="#sistemas" variant="outline" size="lg" className="backdrop-blur-sm">
              Ver el sistema
            </Button>
          </motion.div>

          <motion.p {...fadeUp(0.7)} className="mt-7 text-sm flex items-center gap-2" style={{ color: "rgba(240,237,248,0.62)" }}>
            <MessageCircle className="w-3.5 h-3.5" style={{ color: A.gold }} />
            Diagnóstico inicial sin compromiso · respuesta en menos de 24 horas hábiles.
          </motion.p>
        </div>

        {/* Scroll hint */}
        <motion.div {...fadeUp(0.85)} aria-hidden className="hidden lg:flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: "rgba(240,237,248,0.55)" }}>Scroll</span>
          <span className="scroll-hint-line" />
        </motion.div>
      </div>
    </section>
  );
}
