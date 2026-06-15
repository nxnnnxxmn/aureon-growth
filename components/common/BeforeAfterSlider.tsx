"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Move } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  sub?: string;
}

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeMetrics: Metric[];
  afterMetrics: Metric[];
  /** Title shown above the slider */
  title?: string;
  /** Optional subtitle/description below the title */
  subtitle?: string;
  /** Initial slider position (0–100). Default 50. */
  initialPosition?: number;
}

/**
 * Draggable before/after comparison slider for showing transformation results.
 * Keyboard accessible: left/right arrows move position by 5%.
 * Respects prefers-reduced-motion (snaps without spring).
 *
 * Layout: Both "before" and "after" panels stack at full size in the same
 * container. A clip-path on the "after" panel reveals it left-to-right based
 * on slider position.
 */
export default function BeforeAfterSlider({
  beforeLabel = "Antes",
  afterLabel = "Después",
  beforeMetrics,
  afterMetrics,
  title,
  subtitle,
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  // Global pointer listeners while dragging (so cursor can leave the bar)
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      updateFromClientX(e.clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, updateFromClientX]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  const containerHeight = "min-h-[420px] sm:min-h-[460px]";

  return (
    <div className="w-full space-y-6">
      {(title || subtitle) && (
        <div className="text-center max-w-2xl mx-auto space-y-2">
          {title && (
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-slate-400 leading-relaxed">{subtitle}</p>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        className={`relative w-full ${containerHeight} rounded-3xl overflow-hidden border border-violet-500/20 select-none cursor-ew-resize`}
        onPointerDown={(e) => {
          e.preventDefault();
          setDragging(true);
          updateFromClientX(e.clientX);
        }}
      >
        {/* ============== BEFORE (full size, underneath — OPAQUE) ============== */}
        <div
          className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between"
          style={{
            background:
              "linear-gradient(135deg, #0a0814 0%, #100b1c 60%, #0c0a17 100%)",
          }}
        >
          {/* Mock window chrome */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 opacity-50">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
            </div>
            <span className="px-2.5 py-1 rounded-md bg-slate-700/40 border border-slate-600/40 text-[10px] uppercase tracking-[0.22em] text-slate-400 font-display font-semibold">
              {beforeLabel}
            </span>
          </div>

          {/* Background — dim, desaturated */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 50%, rgba(100,100,120,0.18), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 grid-bg opacity-30" />
          </div>

          {/* Flat declining bar chart */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end gap-2 h-32 opacity-50">
            {[60, 55, 50, 48, 45, 42, 40, 38].map((h, i) => (
              <div
                key={i}
                className="w-4 sm:w-6 rounded-t bg-gradient-to-t from-slate-700 to-slate-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* Metrics — bottom */}
          <div className="relative mt-auto grid grid-cols-3 gap-3 sm:gap-5">
            {beforeMetrics.map((m) => (
              <div key={m.label}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold mb-1">
                  {m.label}
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-slate-400 leading-none">
                  {m.value}
                </div>
                {m.sub && (
                  <div className="text-xs text-slate-600 mt-1">{m.sub}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ============== AFTER (full size, clipped from left — OPAQUE) ============== */}
        <motion.div
          className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between"
          style={{
            clipPath: `inset(0 0 0 ${position}%)`,
            background:
              "linear-gradient(135deg, #1a0e30 0%, #15102a 50%, #0e1a35 100%)",
          }}
          animate={prefersReducedMotion ? {} : { clipPath: `inset(0 0 0 ${position}%)` }}
          transition={{ type: "spring", stiffness: 250, damping: 30 }}
        >
          {/* Mock window chrome */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="px-2.5 py-1 rounded-md bg-violet-500/20 border border-violet-400/40 text-[10px] uppercase tracking-[0.22em] text-violet-200 font-display font-semibold backdrop-blur-sm">
              {afterLabel}
            </span>
          </div>

          {/* Aurora orb */}
          <div
            className="absolute -top-10 -right-10 w-72 h-72 rounded-full opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(128,84,194,0.7) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full opacity-35 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(59,111,212,0.7) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

          {/* Growth chart — rising */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end gap-2 h-40">
            {[20, 30, 28, 45, 55, 72, 85, 100].map((h, i) => (
              <motion.div
                key={i}
                className="w-4 sm:w-6 rounded-t bg-gradient-to-t from-violet-600 via-purple-500 to-electric-500 shadow-glow-violet-sm"
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + i * 0.06,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
          </div>

          {/* Metrics — bottom */}
          <div className="relative mt-auto grid grid-cols-3 gap-3 sm:gap-5">
            {afterMetrics.map((m) => (
              <div key={m.label}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-violet-300 font-semibold mb-1">
                  {m.label}
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl gradient-text leading-none">
                  {m.value}
                </div>
                {m.sub && (
                  <div className="text-xs text-green-400 mt-1 font-medium">{m.sub}</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ============== Slider handle ============== */}
        <motion.div
          role="slider"
          aria-label="Comparar antes y después"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-violet-400 via-purple-300 to-electric-400 cursor-ew-resize z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
          style={{
            left: `${position}%`,
            boxShadow:
              "0 0 18px rgba(167,139,250,0.6), 0 0 36px rgba(128,84,194,0.35)",
          }}
        >
          {/* Handle button */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 border-2 border-white/40 flex items-center justify-center backdrop-blur-md shadow-glow-violet"
            animate={{ scale: dragging ? 1.12 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Move className="w-5 h-5 text-white rotate-90" />
          </motion.div>
        </motion.div>

        {/* Drag hint badge (top-center, fades when interacted) */}
        <motion.div
          aria-hidden
          className="absolute top-5 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-violet-500/30 text-[10px] uppercase tracking-[0.22em] text-violet-200 font-display font-semibold pointer-events-none"
          animate={{ opacity: dragging || position !== initialPosition ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          ← Arrastra para comparar →
        </motion.div>
      </div>
    </div>
  );
}
