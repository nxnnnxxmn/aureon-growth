"use client";

import { useEffect, useRef } from "react";

/**
 * Animated gradient mesh — premium "video-like" background using canvas.
 * Renders slowly-shifting radial gradient orbs that create the feel of a high-end
 * motion graphics piece, without the cost (or autoplay constraints) of a real video.
 *
 * Inspiration: Linear, Stripe, Vercel, Anthropic homepage backgrounds.
 *
 * Performance:
 * - DPR-aware canvas sizing
 * - 30 FPS frame cap (mesh moves slowly, no need for 60)
 * - Pauses when offscreen (IntersectionObserver) and when prefers-reduced-motion
 * - Stops the RAF loop on visibilitychange (background tab)
 */
export default function AnimatedMesh({
  className = "",
  opacity = 0.7,
}: {
  className?: string;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const tabActiveRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Refined orbs — premium palette only (violet depths + gold whisper)
    // No more bright electric or saturated colors.
    const orbs = [
      {
        color: "rgba(124, 95, 179, 0.48)", // amethyst primary
        baseX: 0.25,
        baseY: 0.35,
        radius: 0.55,
        motion: 0.10,
        speed: 0.00016,
        phase: 0,
      },
      {
        color: "rgba(74, 41, 114, 0.42)", // plum deep
        baseX: 0.75,
        baseY: 0.6,
        radius: 0.5,
        motion: 0.09,
        speed: 0.00020,
        phase: 1.2,
      },
      {
        color: "rgba(90, 127, 184, 0.20)", // steel — restrained
        baseX: 0.55,
        baseY: 0.2,
        radius: 0.45,
        motion: 0.07,
        speed: 0.00023,
        phase: 2.5,
      },
      {
        color: "rgba(176, 148, 219, 0.30)", // soft amethyst
        baseX: 0.15,
        baseY: 0.8,
        radius: 0.4,
        motion: 0.08,
        speed: 0.00018,
        phase: 3.4,
      },
      {
        color: "rgba(201, 169, 97, 0.16)", // gold whisper — luxury micro-accent
        baseX: 0.85,
        baseY: 0.25,
        radius: 0.42,
        motion: 0.06,
        speed: 0.00021,
        phase: 4.7,
      },
    ];

    // 30 FPS cap (frame interval in ms)
    const FRAME_INTERVAL = 1000 / 30;
    let lastFrame = 0;

    const draw = (time: number) => {
      // Clear with subtle dark base
      ctx.clearRect(0, 0, width, height);

      orbs.forEach((o) => {
        const t = time * o.speed + o.phase;
        const cx = (o.baseX + Math.cos(t) * o.motion) * width;
        const cy = (o.baseY + Math.sin(t * 0.85) * o.motion) * height;
        const r = Math.min(width, height) * o.radius;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, o.color);
        grad.addColorStop(1, "rgba(8, 7, 13, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });
    };

    const loop = (time: number) => {
      if (!visibleRef.current || !tabActiveRef.current) {
        rafRef.current = null;
        return;
      }
      if (time - lastFrame >= FRAME_INTERVAL) {
        lastFrame = time;
        draw(time);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (rafRef.current != null) return;
      lastFrame = 0;
      rafRef.current = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    // Initial paint (one frame even if reduced-motion)
    draw(0);

    if (!reduced) {
      // Pause when offscreen
      const io = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) start();
          else stop();
        },
        { threshold: 0.01 }
      );
      io.observe(canvas);

      // Pause when tab inactive
      const onVis = () => {
        tabActiveRef.current = document.visibilityState === "visible";
        if (tabActiveRef.current) start();
        else stop();
      };
      document.addEventListener("visibilitychange", onVis);

      start();

      return () => {
        stop();
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
      };
    }

    // Reduced motion path: static single paint
    return () => {
      stop();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none w-full h-full ${className}`}
      style={{ opacity }}
    />
  );
}
