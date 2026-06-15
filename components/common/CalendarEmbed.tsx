"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Loader2, ExternalLink } from "lucide-react";

interface CalendarEmbedProps {
  /** Cal.com link in the form "username/event-slug". Falls back to NEXT_PUBLIC_CAL_LINK. */
  calLink?: string;
  /** Iframe height in px. Default 720. */
  height?: number;
}

/**
 * Cal.com calendar embed — dependency-free iframe with branded loading state.
 *
 * Setup:
 *   1. Sign up at https://cal.com (free)
 *   2. Create an event type (e.g. "consulta-estrategica-30")
 *   3. Set NEXT_PUBLIC_CAL_LINK="your-username/consulta-estrategica-30" in .env
 *
 * The iframe inherits the dark theme + violet brand color via URL params, so the
 * widget visually matches the site without extra styling work.
 *
 * If no link is configured, renders a graceful fallback CTA pointing to the form.
 */
export default function CalendarEmbed({
  calLink,
  height = 720,
}: CalendarEmbedProps) {
  const link = calLink || process.env.NEXT_PUBLIC_CAL_LINK || "";
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Graceful fallback when no calendar is configured yet
  if (!link) {
    return (
      <div
        className="relative w-full rounded-2xl p-10 lg:p-12 flex flex-col items-center justify-center text-center min-h-[500px]"
        style={{ backgroundColor: "#F5F1E8", boxShadow: "inset 0 0 0 1px rgba(26,24,21,0.08)" }}
        role="status"
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: "#E04E2C", boxShadow: "0 14px 36px -10px rgba(224,78,44,0.45)" }}>
          <Calendar className="w-8 h-8" style={{ color: "#FBF8F1" }} />
        </div>
        <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#1A1815" }}>
          Calendario en configuración
        </h3>
        <p className="text-sm max-w-md leading-relaxed mb-6" style={{ color: "#6B655E" }}>
          Para coordinar tu diagnóstico estratégico, escríbenos por WhatsApp o
          completa el formulario. Te confirmaremos disponibilidad en menos de
          24 horas hábiles.
        </p>
        <a
          href="#contacto"
          className="px-7 py-3.5 rounded-full font-display font-semibold text-sm transition-colors"
          style={{ backgroundColor: "#E04E2C", color: "#FBF8F1" }}
        >
          Solicitar diagnóstico
        </a>
      </div>
    );
  }

  // Cal.com supports theme + brandColor URL params for white-label feel
  const url = `https://cal.com/${link}?theme=light&brandColor=E04E2C&hideEventTypeDetails=false&layout=month_view`;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ minHeight: height, backgroundColor: "#F5F1E8", boxShadow: "inset 0 0 0 1px rgba(26,24,21,0.08)" }}
    >
      {/* Loading skeleton — visible until the iframe fires onLoad */}
      {!loaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          style={{ backgroundColor: "#F5F1E8" }}
        >
          <div className="relative">
            <div
              className="absolute -inset-12 rounded-full opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(224,78,44,0.3) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#E04E2C", boxShadow: "0 14px 36px -10px rgba(224,78,44,0.45)" }}>
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#FBF8F1" }} />
            </div>
          </div>
          <p className="mt-5 text-sm font-display font-medium" style={{ color: "#6B655E" }}>
            Cargando calendario…
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.22em]" style={{ color: "#9A938A" }}>
            Disponibilidad en tiempo real
          </p>
        </motion.div>
      )}

      {/* Render iframe only after first client mount to avoid SSR mismatch / faster TTI */}
      {mounted && (
        <iframe
          src={url}
          title="Agendar consultoría estratégica"
          allow="camera; microphone; autoplay; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="w-full block border-0"
          style={{ height, minHeight: height }}
        />
      )}

      {/* Fallback link if user has issues with iframe (e.g. blocked by browser policies) */}
      <a
        href={`https://cal.com/${link}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg backdrop-blur-md text-[11px] transition-colors"
        style={{ backgroundColor: "rgba(251,248,241,0.9)", border: "1px solid rgba(26,24,21,0.12)", color: "#E04E2C" }}
      >
        Abrir en Cal.com
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
