"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
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
  forest: "#2D5016",
  hairline: "rgba(26,24,21,0.10)",
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse-tracking parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 22 });

  // Distinct ornaments — different intensities
  const orb1X = useTransform(springX, [-1, 1], [-50, 50]);
  const orb1Y = useTransform(springY, [-1, 1], [-50, 50]);
  const orb1Rot = useTransform(springX, [-1, 1], [-12, 12]);

  const orb2X = useTransform(springX, [-1, 1], [30, -30]);
  const orb2Y = useTransform(springY, [-1, 1], [25, -25]);

  const imgX = useTransform(springX, [-1, 1], [-22, 22]);
  const imgY = useTransform(springY, [-1, 1], [-15, 15]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-line", {
          yPercent: 110,
          duration: 1.15,
          ease: "power4.out",
          stagger: 0.09,
          delay: 0.3,
        });
        gsap.from(".hero-fade", {
          opacity: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.1,
          delay: 1.0,
          ease: "power2.out",
        });
        gsap.from(".hero-image", {
          opacity: 0,
          scale: 0.92,
          rotate: -3,
          duration: 1.3,
          delay: 0.6,
          ease: "power3.out",
        });

        // Scroll parallax
        gsap.to(".big-number-bg", {
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

      {/* Dot pattern decorative */}
      <div
        aria-hidden
        className="dot-pattern absolute top-32 right-[8%] w-72 h-72 -z-10 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${PALETTE.text} 1px, transparent 0)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* HUGE editorial number — background watermark */}
      <div
        aria-hidden
        className="big-number-bg absolute -top-12 -left-12 -z-10 pointer-events-none select-none leading-none"
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
          {/* Eyebrow */}
          <div className="hero-fade flex items-center gap-3 mb-6">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: PALETTE.accent }}
            />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              Growth Partner · LATAM · Desde 2019
            </span>
          </div>

          {/* Headline — innovative typography mix */}
          <h1
            className="font-display font-semibold tracking-[-0.025em] leading-[0.98] text-[clamp(2.75rem,8vw,6.5rem)] max-w-[16ch]"
            style={{ color: PALETTE.text }}
          >
            <span className="block overflow-hidden pb-2">
              <span className="hero-line block">
                Lanzamos
              </span>
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
                  marcas
                </span>{" "}
                que
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="hero-line block">
                importan
                <span style={{ color: PALETTE.accent }}>.</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-fade mt-8 max-w-[52ch] text-lg lg:text-xl leading-[1.55]"
            style={{ color: PALETTE.textMuted }}
          >
            En 5 años hemos generado{" "}
            <span style={{ color: PALETTE.text, fontWeight: 600 }}>
              +$50M en revenue
            </span>{" "}
            para 850 marcas. No vendemos servicios — operamos como tu socio
            estratégico de crecimiento.
          </p>

          {/* CTAs */}
          <div className="hero-fade flex flex-wrap items-center gap-4 mt-10">
            <MagneticButton
              href="#contacto"
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
              Conversación gratis
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>

            <MagneticButton
              href="#portafolio"
              strength={0.18}
              innerStrength={0.32}
              radius={110}
              className="group inline-flex items-center gap-2 px-8 py-4 font-display font-semibold text-sm rounded-full border-2 transition-colors duration-300"
              style={{
                borderColor: PALETTE.text,
                color: PALETTE.text,
              }}
            >
              Ver portafolio
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
          </div>

          {/* Inline metric strip */}
          <div className="hero-fade mt-12 lg:mt-14 flex flex-wrap items-end gap-x-8 gap-y-4 pt-8 border-t" style={{ borderColor: PALETTE.hairline }}>
            {[
              { v: 850, s: "+", l: "marcas escaladas" },
              { v: 400, s: "%", l: "ROI promedio" },
              { v: 50, p: "$", s: "M+", l: "revenue generado" },
            ].map((m) => (
              <div key={m.l} className="flex items-baseline gap-2">
                <div
                  className="font-display font-bold text-2xl lg:text-3xl tabular-nums leading-none"
                  style={{ color: PALETTE.text }}
                >
                  <AnimatedCounter end={m.v} prefix={m.p || ""} suffix={m.s} />
                </div>
                <div
                  className="text-xs lg:text-sm"
                  style={{ color: PALETTE.textMuted }}
                >
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — editorial magazine spread composition */}
        <div className="lg:col-span-5 relative">
          <motion.div
            style={{ x: imgX, y: imgY }}
            className="hero-image relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
          >
            {/* Layer 1: Vermillion rounded block — brand color foundation */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                backgroundColor: PALETTE.accent,
                boxShadow: "0 30px 80px -20px rgba(224, 78, 44, 0.35)",
              }}
            />

            {/* Layer 2: Image with duotone treatment — brand-coherent */}
            <div
              className="absolute inset-2 rounded-3xl overflow-hidden"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(251, 248, 241, 0.15)",
              }}
            >
              <img
                src="https://picsum.photos/seed/lancheros-marketing-agency-23/640/800"
                alt="Aureon Growth creative direction"
                className="w-full h-full object-cover"
                style={{
                  filter: "grayscale(100%) brightness(0.95) contrast(1.1)",
                }}
              />
              {/* Duotone vermillion overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, rgba(224, 78, 44, 0.55) 0%, rgba(165, 59, 31, 0.65) 60%, rgba(26, 24, 21, 0.35) 100%)`,
                  mixBlendMode: "multiply",
                }}
              />
              {/* Cream highlight layer */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at top right, rgba(251, 248, 241, 0.25) 0%, transparent 50%)`,
                }}
              />
            </div>

            {/* Layer 3: Editorial typography overlay — "magazine cover" feel */}
            <div className="absolute inset-2 rounded-3xl overflow-hidden pointer-events-none">
              {/* Big serif italic letter — top-left corner */}
              <div
                className="absolute top-3 left-5 select-none leading-none"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  fontSize: "clamp(5rem, 12vw, 8rem)",
                  fontWeight: 300,
                  color: PALETTE.bgWhite,
                  opacity: 0.85,
                }}
              >
                A
              </div>
              {/* Small mono label — top right */}
              <div
                className="absolute top-5 right-5 font-mono text-[10px] uppercase tracking-[0.25em] text-right"
                style={{ color: PALETTE.bgWhite, opacity: 0.85 }}
              >
                Vol. 01<br />
                Marketing<br />
                & Growth
              </div>
              {/* Bottom catalog footer */}
              <div
                className="absolute bottom-5 left-5 right-5 flex justify-between items-end"
              >
                <div
                  className="font-display font-bold text-2xl leading-none"
                  style={{ color: PALETTE.bgWhite }}
                >
                  AUREON<br />
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "0.65em",
                    }}
                  >
                    growth
                  </span>
                </div>
                <div
                  className="font-mono text-[9px] uppercase tracking-[0.25em] text-right"
                  style={{ color: PALETTE.bgWhite, opacity: 0.7 }}
                >
                  Ed. MMXXVI<br />
                  Bogotá
                </div>
              </div>
              {/* Decorative line */}
              <div
                className="absolute top-32 left-5 right-5 h-px"
                style={{ backgroundColor: PALETTE.bgWhite, opacity: 0.3 }}
              />
            </div>

            {/* Floating quote card */}
            <motion.div
              style={{
                x: orb2X,
                y: orb2Y,
                backgroundColor: PALETTE.bgWhite,
                boxShadow: "0 20px 50px -15px rgba(26, 24, 21, 0.18)",
              }}
              className="absolute -bottom-8 -left-8 lg:-left-16 max-w-[280px] p-6 rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Sparkles
                className="w-5 h-5 mb-3"
                style={{ color: PALETTE.accent }}
              />
              <p
                className="text-sm leading-snug font-medium mb-3"
                style={{ color: PALETTE.text }}
              >
                &ldquo;Aureon llevó nuestro revenue de{" "}
                <span style={{ color: PALETTE.accent }}>$2M a $14M</span> en 18
                meses.&rdquo;
              </p>
              <div
                className="text-[10px] uppercase tracking-[0.2em] font-mono"
                style={{ color: PALETTE.textMuted }}
              >
                — Founder, Marca DTC
              </div>
            </motion.div>

            {/* Floating metric pill */}
            <motion.div
              style={{
                x: orb1X,
                y: orb1Y,
                rotate: orb1Rot,
                backgroundColor: PALETTE.accent,
                color: PALETTE.bgWhite,
                boxShadow: "0 16px 40px -10px rgba(224, 78, 44, 0.50)",
              }}
              className="absolute -top-6 -right-6 lg:-right-10 p-5 rounded-2xl flex items-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6, ease: "backOut" }}
            >
              <TrendingUp className="w-7 h-7" />
              <div>
                <div className="font-display font-bold text-2xl leading-none">
                  +400%
                </div>
                <div className="text-[10px] uppercase tracking-wider opacity-85">
                  ROI promedio
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
