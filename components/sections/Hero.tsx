"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Compass, Crosshair, Workflow, LineChart } from "lucide-react";
import { A } from "@/lib/ui";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const MODULES = [
  { icon: Compass, label: "Brand Module", sub: "Positioning", pos: "top-[2%] left-[6%]", float: "aureon-float", color: A.gold },
  { icon: Crosshair, label: "Acquisition Flow", sub: "Funnels · Paid", pos: "top-[8%] right-[2%]", float: "aureon-float-2", color: A.violet },
  { icon: Workflow, label: "CRM Pipeline", sub: "Automation", pos: "bottom-[12%] left-[0%]", float: "aureon-float-3", color: A.blue },
  { icon: LineChart, label: "Intelligence", sub: "Dashboards", pos: "bottom-[2%] right-[8%]", float: "aureon-float", color: A.gold },
];

const PANELS = [
  { label: "Lead flow", value: "Active", tone: A.positive, pos: "top-[40%] left-[-6%]", float: "aureon-float-2" },
  { label: "Tracking", value: "On", tone: A.blue, pos: "top-[24%] right-[-4%]", float: "aureon-float-3" },
  { label: "Strategy map", value: "Synced", tone: A.gold, pos: "bottom-[30%] right-[-6%]", float: "aureon-float" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-line", { yPercent: 115, duration: 1.1, ease: "power4.out", stagger: 0.09, delay: 0.2 });
        gsap.from(".hero-fade", { opacity: 0, y: 22, duration: 0.9, stagger: 0.1, delay: 0.85, ease: "power2.out" });
        gsap.from(".hero-viz", { opacity: 0, scale: 0.92, duration: 1.2, delay: 0.4, ease: "power3.out" });
        gsap.to(".hero-bg-glow", {
          yPercent: -12, ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1 },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative isolate flex flex-col justify-center min-h-[100dvh] w-full overflow-hidden pt-28 pb-16"
      style={{ backgroundColor: A.bg, color: A.text }}
    >
      {/* depth layers */}
      <div aria-hidden className="absolute inset-0 -z-10 tech-grid opacity-[0.55]" />
      <div aria-hidden className="absolute inset-0 -z-10 diag-lines opacity-60" />
      <div aria-hidden className="hero-bg-glow absolute -top-40 right-[-10%] w-[760px] h-[760px] rounded-full -z-10 glow-gold" />
      <div aria-hidden className="hero-bg-glow absolute bottom-[-20%] left-[-12%] w-[680px] h-[680px] rounded-full -z-10 glow-violet" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT */}
        <div className="lg:col-span-6">
          <div className="hero-fade mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-[0.2em] glass"
              style={{ color: A.gold }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: A.gold, boxShadow: `0 0 8px ${A.gold}` }} />
              Engineering-grade growth system
            </span>
          </div>

          <h1 className="font-display font-semibold tracking-[-0.025em] leading-[0.98] text-[clamp(2.5rem,6vw,5rem)]" style={{ color: A.text }}>
            <span className="block overflow-hidden pb-2"><span className="hero-line block">Construimos</span></span>
            <span className="block overflow-hidden pb-2">
              <span className="hero-line block">
                <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontWeight: 400, color: A.gold }}>sistemas</span> de
              </span>
            </span>
            <span className="block overflow-hidden pb-2"><span className="hero-line block">crecimiento<span style={{ color: A.gold }}>.</span></span></span>
          </h1>

          <p className="hero-fade mt-7 max-w-[56ch] text-lg leading-[1.6]" style={{ color: A.text2 }}>
            Aureon Growth Services integra{" "}
            <span style={{ color: A.text, fontWeight: 600 }}>branding, performance, funnels, CRM, automatización e inteligencia artificial</span>{" "}
            en una sola arquitectura comercial medible.
          </p>

          <div className="hero-fade flex flex-wrap items-center gap-3 mt-9">
            <a
              href="/diagnostico"
              className="btn-premium focus-ring inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-sm rounded-full"
              style={{ backgroundColor: A.gold, color: A.bg, boxShadow: "0 16px 40px -12px rgba(214,180,106,0.45)" }}
            >
              Solicitar diagnóstico estratégico
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#sistemas"
              className="focus-ring inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-sm rounded-full border transition-colors"
              style={{ borderColor: A.border, color: A.text }}
            >
              Ver el sistema
            </a>
          </div>

          <p className="hero-fade mt-6 text-sm flex items-center gap-2" style={{ color: A.textDim }}>
            <MessageCircle className="w-3.5 h-3.5" style={{ color: A.gold }} />
            Diagnóstico inicial sin compromiso · respuesta en menos de 24 horas hábiles.
          </p>
        </div>

        {/* RIGHT — system visual */}
        <div className="lg:col-span-6">
          <div className="hero-viz relative mx-auto w-full max-w-[440px] aspect-square" style={{ perspective: "1400px" }}>
            <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(8deg) rotateY(-10deg)" }}>
              {/* connectors */}
              <svg viewBox="0 0 440 440" className="absolute inset-0 w-full h-full" aria-hidden>
                <g stroke={A.gold} strokeWidth="0.7" opacity="0.28" strokeDasharray="3,5">
                  <line x1="220" y1="220" x2="70" y2="55" />
                  <line x1="220" y1="220" x2="385" y2="80" />
                  <line x1="220" y1="220" x2="55" y2="355" />
                  <line x1="220" y1="220" x2="380" y2="395" />
                </g>
                <circle cx="220" cy="220" r="150" fill="none" stroke={A.violet} strokeWidth="0.6" opacity="0.25" />
                <circle cx="220" cy="220" r="105" fill="none" stroke={A.gold} strokeWidth="0.6" opacity="0.3" strokeDasharray="2,4" />
              </svg>

              {/* core */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-3xl flex flex-col items-center justify-center text-center aureon-float border-grad"
                style={{
                  background: "radial-gradient(circle at 30% 25%, #1b1830, #0b0a14)",
                  boxShadow: "0 30px 80px -30px rgba(0,0,0,0.85), inset 0 0 40px rgba(124,92,191,0.12)",
                }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2" style={{ background: `linear-gradient(135deg, ${A.gold}, ${A.violet})` }}>
                  <Compass className="w-6 h-6" style={{ color: A.bg }} />
                </div>
                <div className="font-display font-bold text-xs" style={{ color: A.text }}>Aureon</div>
                <div className="font-mono text-[8px] uppercase tracking-[0.22em]" style={{ color: A.gold }}>System Core</div>
              </div>

              {/* module nodes */}
              {MODULES.map((m) => (
                <div key={m.label} className={`absolute ${m.pos} ${m.float}`} style={{ ["--rot" as string]: "0deg" }}>
                  <div className="surface card-3d px-3.5 py-3 rounded-2xl flex items-center gap-2.5" style={{ backgroundColor: A.surface }}>
                    <span className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                      <m.icon className="w-4 h-4" style={{ color: m.color }} />
                    </span>
                    <span className="leading-tight">
                      <span className="block font-display font-semibold text-[11px]" style={{ color: A.text }}>{m.label}</span>
                      <span className="block font-mono text-[8px] uppercase tracking-[0.16em]" style={{ color: A.textDim }}>{m.sub}</span>
                    </span>
                  </div>
                </div>
              ))}

              {/* floating data panels */}
              {PANELS.map((p) => (
                <div key={p.label} className={`absolute ${p.pos} ${p.float} hidden sm:block`}>
                  <div className="glass px-3 py-2 rounded-xl flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.tone, boxShadow: `0 0 6px ${p.tone}` }} />
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: A.text2 }}>{p.label}</span>
                    <span className="font-mono text-[9px]" style={{ color: p.tone }}>{p.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
