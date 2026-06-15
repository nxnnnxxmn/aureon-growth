"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Non-invasive UI sound feedback. OFF by default, opt-in, persisted in
 * localStorage. Plays a very soft synthesized click (Web Audio) on clicks of
 * primary controls only. No autoplay, no music, no hover sounds. Respects
 * prefers-reduced-motion.
 */
export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem("aureon-sfx") === "on") setEnabled(true);
    } catch {}
  }, []);

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctor) ctxRef.current = new Ctor();
    }
    return ctxRef.current;
  }, []);

  const blip = useCallback((freq: number) => {
    const ctx = ensureCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }, [ensureCtx]);

  // Delegated click feedback on primary controls only
  useEffect(() => {
    if (!enabled) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest("button, a[href], [role=tab]");
      if (!t) return;
      if (t.getAttribute("data-sfx") === "off") return;
      const isTab = t.getAttribute("role") === "tab";
      blip(isTab ? 660 : 520);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [enabled, blip]);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem("aureon-sfx", next ? "on" : "off");
    } catch {}
    if (next) blip(580); // confirmation on enable (user gesture)
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      data-sfx="off"
      aria-pressed={enabled}
      aria-label={enabled ? "Desactivar sonido de interfaz" : "Activar sonido de interfaz"}
      title={enabled ? "Sonido: activado" : "Sonido: desactivado"}
      className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 focus-ring"
      style={{
        backgroundColor: "rgba(17,16,26,0.85)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${enabled ? "rgba(214,180,106,0.55)" : "rgba(255,255,255,0.1)"}`,
        color: enabled ? "#D6B46A" : "#6F7890",
      }}
    >
      {enabled ? <Volume2 className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} /> : <VolumeX className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />}
    </button>
  );
}
