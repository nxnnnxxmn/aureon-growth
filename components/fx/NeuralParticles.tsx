"use client";

import { useEffect, useRef } from "react";

/**
 * NeuralParticles — red neuronal viva en canvas.
 * Nodos flotando con drift orgánico + conexiones que aparecen por proximidad.
 * Los nodos cercanos al cursor se atraen sutilmente (interactive mesh).
 *
 * Performance:
 *  - ~46 nodos, un solo canvas 2D (sin WebGL overhead para este caso)
 *  - Pausa total cuando sale del viewport (IntersectionObserver)
 *  - devicePixelRatio cap a 2
 *  - prefers-reduced-motion → frame estático único
 */
export default function NeuralParticles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0;
    let raf = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999 };

    type Node = { x: number; y: number; vx: number; vy: number; r: number; gold: boolean };
    let nodes: Node[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(46, Math.floor((w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.7,
        gold: Math.random() > 0.45,
      }));
    };

    const LINK = 130;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          // atracción sutil al cursor
          const dx = mouse.x - n.x, dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < 160 && d > 0.001) {
            n.x += (dx / d) * 0.18;
            n.y += (dy / d) * 0.18;
          }
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }

      // conexiones por proximidad
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.16;
            ctx.strokeStyle = a.gold || b.gold
              ? `rgba(214,180,106,${alpha})`
              : `rgba(124,92,191,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodos
      for (const n of nodes) {
        ctx.fillStyle = n.gold ? "rgba(214,180,106,0.55)" : "rgba(159,132,208,0.5)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced && running) raf = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(draw);
    });

    resize();
    draw();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 w-full h-full ${className}`} />;
}
