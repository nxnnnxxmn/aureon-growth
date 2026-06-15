"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import MagneticButton from "@/components/common/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PALETTE = {
  bg: "#F5F1E8",
  bgWhite: "#FBF8F1",
  bgAlt: "#EFE9DB",
  text: "#1A1815",
  textMuted: "#6B655E",
  textSoft: "#9A938A",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  accentDeep: "#A53B1F",
  gold: "#C9A961",
  hairline: "rgba(26,24,21,0.10)",
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 22 });

  const orbX = useTransform(springX, [-1, 1], [-22, 22]);
  const orbY = useTransform(springY, [-1, 1], [-15, 15]);
  const orbRotate = useTransform(springX, [-1, 1], [-8, 8]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-line", {
          yPercent: 110,
          duration: 1.15,
          ease: "power4.out",
          stagger: 0.09,
          delay: 0.2,
        });
        gsap.from(".hero-fade", {
          opacity: 0,
          y: 20,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.9,
          ease: "power2.out",
        });
        gsap.from(".hero-visual", {
          opacity: 0,
          scale: 0.94,
          duration: 1.3,
          delay: 0.5,
          ease: "power3.out",
        });

        gsap.to(".big-letter-bg", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".dot-pattern", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 2);
    mouseY.set(y * 2);
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      onMouseMove={handleMouseMove}
      className="relative isolate flex flex-col min-h-[100dvh] w-full overflow-hidden pt-24 lg:pt-28 pb-12"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      {/* Paper texture */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      <div
        aria-hidden
        className="dot-pattern absolute top-32 right-[8%] w-72 h-72 -z-10 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${PALETTE.text} 1px, transparent 0)`,
          backgroundSize: "16px 16px",
        }}
      />

      <div
        aria-hidden
        className="big-letter-bg absolute -top-12 -left-12 -z-10 pointer-events-none select-none leading-none"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: "clamp(18rem, 32vw, 36rem)",
          fontWeight: 300,
          color: PALETTE.text,
          opacity: 0.05,
        }}
      >
        A
      </div>

      <div className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT — text column */}
        <div className="lg:col-span-7">
          {/* Eyebrow badge */}
          <div className="hero-fade flex flex-wrap items-center gap-2 mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-[0.22em]"
              style={{
                backgroundColor: PALETTE.bgWhite,
                color: PALETTE.accent,
                border: `1px solid ${PALETTE.hairline}`,
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: PALETTE.accent }}
              />
              Growth Partner · Branding · Performance · IA · Automatización
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-display font-semibold tracking-[-0.025em] leading-[0.98] text-[clamp(2.5rem,6.5vw,5.5rem)] max-w-[18ch]"
            style={{ color: PALETTE.text }}
          >
            <span className="block overflow-hidden pb-2">
              <span className="hero-line block">Construimos</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="hero-line block">
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: PALETTE.accent,
                  }}
                >
                  sistemas
                </span>{" "}
                de crecimiento
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="hero-line block">
                para marcas
                <span style={{ color: PALETTE.accent }}>.</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-fade mt-8 max-w-[58ch] text-lg lg:text-xl leading-[1.55]"
            style={{ color: PALETTE.textMuted }}
          >
            Aureon Growth Services integra{" "}
            <span style={{ color: PALETTE.text, fontWeight: 600 }}>
              branding, performance marketing, funnels, CRM, automatización e
              inteligencia artificial
            </span>{" "}
            para convertir atención en oportunidades comerciales medibles.
          </p>

          {/* CTAs */}
          <div className="hero-fade flex flex-wrap items-center gap-4 mt-10">
            <MagneticButton
              href="#diagnostico"
              strength={0.25}
              innerStrength={0.4}
              radius={120}
              className="group inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-sm rounded-full transition-all duration-300"
              style={{
                backgroundColor: PALETTE.accent,
                color: PALETTE.bgWhite,
                boxShadow: "0 14px 36px -10px rgba(224, 78, 44, 0.45)",
              }}
            >
              Solicitar diagnóstico estratégico
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>

            <MagneticButton
              href="#metodologia"
              strength={0.18}
              innerStrength={0.32}
              radius={110}
              className="group inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-sm rounded-full border-2 transition-colors duration-300"
              style={{
                borderColor: PALETTE.text,
                color: PALETTE.text,
              }}
            >
              Ver metodología
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
          </div>

          {/* Trust microcopy */}
          <p
            className="hero-fade mt-6 text-sm flex items-center gap-2 flex-wrap"
            style={{ color: PALETTE.textSoft }}
          >
            <MessageCircle className="w-3.5 h-3.5" style={{ color: PALETTE.accent }} />
            Diagnóstico inicial sin compromiso · respuesta en menos de 24 horas hábiles.
          </p>

          {/* Pillars strip */}
          <div
            className="hero-fade mt-12 lg:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 pt-8 border-t"
            style={{ borderColor: PALETTE.hairline }}
          >
            {[
              { k: "Brand", v: "Authority System" },
              { k: "Acquisition", v: "Engine" },
              { k: "Revenue", v: "Automation" },
              { k: "Growth", v: "Intelligence" },
            ].map((p) => (
              <div key={p.k}>
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.22em] mb-1"
                  style={{ color: PALETTE.accent }}
                >
                  {p.k}
                </div>
                <div
                  className="font-display font-semibold text-sm lg:text-base"
                  style={{ color: PALETTE.text }}
                >
                  {p.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — abstract orbital visual (no fake image, no false metric) */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <motion.div
            style={{ x: orbX, y: orbY, rotate: orbRotate }}
            className="hero-visual relative aspect-square w-full max-w-md mx-auto"
          >
            {/* Dark canvas with gradient */}
            <div
              className="absolute inset-0 rounded-[2rem]"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #2D2825 0%, #1A1815 60%, #0E0C0A 100%)",
                boxShadow:
                  "0 40px 100px -30px rgba(26, 24, 21, 0.5), inset 0 0 60px rgba(201,169,97,0.05)",
              }}
            />

            {/* Concentric orbit rings */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="heroCore" cx="0.5" cy="0.5">
                  <stop offset="0%" stopColor={PALETTE.accent} />
                  <stop offset="100%" stopColor={PALETTE.accentDeep} />
                </radialGradient>
                <radialGradient id="heroGlow" cx="0.5" cy="0.5">
                  <stop offset="0%" stopColor="rgba(224,78,44,0.35)" />
                  <stop offset="100%" stopColor="rgba(224,78,44,0)" />
                </radialGradient>
              </defs>

              {/* Glow halo */}
              <circle cx="200" cy="200" r="140" fill="url(#heroGlow)" />

              {/* Outer ring */}
              <circle
                cx="200"
                cy="200"
                r="160"
                fill="none"
                stroke={PALETTE.gold}
                strokeWidth="0.8"
                opacity="0.5"
              />
              {/* Mid ring */}
              <circle
                cx="200"
                cy="200"
                r="110"
                fill="none"
                stroke={PALETTE.gold}
                strokeWidth="1"
                opacity="0.8"
              />
              {/* Inner ring */}
              <circle
                cx="200"
                cy="200"
                r="70"
                fill="none"
                stroke={PALETTE.accent}
                strokeWidth="0.7"
                opacity="0.6"
              />

              {/* Core sphere */}
              <circle cx="200" cy="200" r="32" fill="url(#heroCore)" />
              <circle cx="192" cy="192" r="8" fill="rgba(251,248,241,0.55)" />

              {/* Orbital nodes */}
              <circle cx="200" cy="40" r="5" fill={PALETTE.gold} />
              <circle cx="356" cy="232" r="3.5" fill={PALETTE.gold} opacity="0.7" />
              <circle cx="78" cy="285" r="3" fill={PALETTE.accent} opacity="0.9" />
              <circle cx="290" cy="125" r="2.5" fill={PALETTE.gold} opacity="0.6" />

              {/* Connector lines */}
              <line
                x1="200"
                y1="200"
                x2="200"
                y2="40"
                stroke={PALETTE.gold}
                strokeWidth="0.5"
                opacity="0.3"
                strokeDasharray="2,3"
              />
              <line
                x1="200"
                y1="200"
                x2="356"
                y2="232"
                stroke={PALETTE.gold}
                strokeWidth="0.5"
                opacity="0.3"
                strokeDasharray="2,3"
              />
              <line
                x1="200"
                y1="200"
                x2="78"
                y2="285"
                stroke={PALETTE.accent}
                strokeWidth="0.5"
                opacity="0.4"
                strokeDasharray="2,3"
              />
            </svg>

            {/* Top-left label */}
            <div
              className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: "rgba(201,169,97,0.7)" }}
            >
              Aureon
              <br />
              Growth System
            </div>

            {/* Bottom-right label */}
            <div
              className="absolute bottom-6 right-6 text-right font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: "rgba(251,248,241,0.45)" }}
            >
              Brand · Acquisition
              <br />
              Automation · Intelligence
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
