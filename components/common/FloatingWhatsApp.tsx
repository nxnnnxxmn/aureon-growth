"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { trackConversion } from "@/lib/analytics";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissedTooltip, setDismissedTooltip] = useState(false);

  useEffect(() => {
    // Appear after 1.5s + when user scrolls 400px
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible || dismissedTooltip) return;
    const tooltipTimer = setTimeout(() => setExpanded(true), 4000);
    const closeTimer = setTimeout(() => setExpanded(false), 10000);
    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(closeTimer);
    };
  }, [visible, dismissedTooltip]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Tooltip card */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[280px] glass-elevated rounded-2xl p-4 pr-9 shadow-premium-elevated"
          >
            <button
              onClick={() => {
                setExpanded(false);
                setDismissedTooltip(true);
              }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-semibold uppercase tracking-wide">
                En línea
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed mb-3 font-medium">
              ¿Hablamos por WhatsApp?
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Te respondemos en menos de 10 minutos. Sin formularios, sin esperas.
            </p>
            <a
              href={waLink("default")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setExpanded(false);
                setDismissedTooltip(true);
                trackConversion("whatsapp_click", {
                  source: "floating_tooltip",
                });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#25d366] hover:bg-[#22c55e] text-white text-sm font-semibold rounded-lg transition-colors w-full justify-center"
            >
              Iniciar chat ahora →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.a
        href={waLink("default")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.1, rotate: -8 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          setExpanded(false);
          setDismissedTooltip(true);
          trackConversion("whatsapp_click", { source: "floating_button" });
        }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25d366] text-white wa-float group"
      >
        {/* WhatsApp icon (custom SVG looks more authentic) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Notification dot */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-background">
          1
        </span>
      </motion.a>
    </div>
  );
}
