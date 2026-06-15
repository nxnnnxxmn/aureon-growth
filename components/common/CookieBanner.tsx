"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  Cookie,
  Check,
  ChevronDown,
  ChevronUp,
  Shield,
  BarChart3,
  Megaphone,
} from "lucide-react";
import {
  getConsent,
  acceptAll,
  rejectAll,
  setConsent,
  DEFAULT_CONSENT,
  type ConsentState,
} from "@/lib/consent";

/**
 * Cookie consent banner — LGPD/GDPR compliant, premium on-brand design.
 *
 * UX rationale:
 *   - Bottom-right corner (not full-width) — less intrusive
 *   - 3 primary buttons: Accept all, Reject all, Customize
 *   - Customize expands inline (no modal nightmare)
 *   - Won't show again after consent stored
 *   - Doesn't block content (page is usable while banner shown)
 */
export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_CONSENT);

  // Mount + check existing consent
  useEffect(() => {
    setMounted(true);
    // Small delay so banner appears AFTER initial paint (less jarring)
    const timer = setTimeout(() => {
      const existing = getConsent();
      if (!existing) setVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const handleAcceptAll = () => {
    acceptAll();
    setVisible(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setVisible(false);
  };

  const handleSaveCustom = () => {
    setConsent({
      analytics: draft.analytics,
      marketing: draft.marketing,
    });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="dialog"
          aria-label="Preferencias de cookies"
          aria-live="polite"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-[60] max-w-md"
        >
          <div className="rounded-2xl border bg-[#0d0a1a]/95 backdrop-blur-xl etched-border-gold border-gold-soft shadow-2xl overflow-hidden">
            {/* Compact header */}
            <div className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-9 h-9 rounded-xl bg-gold-soft border border-gold-soft flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-white text-sm tracking-tight">
                    Usamos cookies
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Para mejorar tu experiencia y entender cómo usas el sitio.
                    Necesarias siempre activas.
                  </p>
                </div>
                <button
                  onClick={() => handleRejectAll()}
                  className="shrink-0 w-6 h-6 -mr-1 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors"
                  aria-label="Rechazar cookies opcionales"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Customize panel — slides open */}
              <AnimatePresence>
                {customizing && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-1 space-y-2">
                      <Toggle
                        icon={Shield}
                        title="Necesarias"
                        description="Funcionalidad básica del sitio. Siempre activas."
                        checked={true}
                        disabled
                        onChange={() => {}}
                      />
                      <Toggle
                        icon={BarChart3}
                        title="Analítica"
                        description="GA4 + Microsoft Clarity. Métricas anonimizadas."
                        checked={draft.analytics}
                        onChange={(v) =>
                          setDraft((d) => ({ ...d, analytics: v }))
                        }
                      />
                      <Toggle
                        icon={Megaphone}
                        title="Marketing"
                        description="Pixels de retargeting (Meta, LinkedIn, Google Ads)."
                        checked={draft.marketing}
                        onChange={(v) =>
                          setDraft((d) => ({ ...d, marketing: v }))
                        }
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                {customizing ? (
                  <>
                    <button
                      onClick={() => setCustomizing(false)}
                      className="px-3 py-2.5 glass border border-white/10 rounded-xl text-slate-300 hover:text-white hover:border-white/20 transition-colors text-xs font-display font-semibold uppercase tracking-[0.18em]"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveCustom}
                      className="px-3 py-2.5 bg-gradient-to-r from-violet-600 to-plum text-white rounded-xl text-xs font-display font-semibold uppercase tracking-[0.18em] hover:shadow-glow-violet-sm transition-shadow"
                    >
                      Guardar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleRejectAll}
                      className="px-3 py-2.5 glass border border-white/10 rounded-xl text-slate-300 hover:text-white hover:border-white/20 transition-colors text-xs font-display font-semibold uppercase tracking-[0.18em]"
                    >
                      Solo necesarias
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-3 py-2.5 bg-gradient-to-r from-violet-600 to-plum text-white rounded-xl text-xs font-display font-semibold uppercase tracking-[0.18em] hover:shadow-glow-violet-sm transition-shadow"
                    >
                      Aceptar todo
                    </button>
                  </>
                )}
              </div>

              {/* Footer row — customize toggle + privacy link */}
              {!customizing && (
                <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-white/8">
                  <button
                    onClick={() => setCustomizing(true)}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-gold-soft hover:text-gold font-display font-semibold transition-colors"
                  >
                    <ChevronDown className="w-3 h-3" />
                    Personalizar
                  </button>
                  <Link
                    href="/legal/privacidad"
                    className="text-[10px] uppercase tracking-[0.22em] text-slate-500 hover:text-slate-300 font-display font-semibold transition-colors"
                  >
                    Privacidad
                  </Link>
                </div>
              )}
              {customizing && (
                <div className="flex items-center justify-end gap-3 mt-3">
                  <button
                    onClick={() => setCustomizing(false)}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-slate-500 hover:text-slate-300 font-display font-semibold transition-colors"
                  >
                    <ChevronUp className="w-3 h-3" />
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// TOGGLE COMPONENT
// ============================================================

function Toggle({
  icon: Icon,
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  icon: typeof Shield;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div
        className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
          disabled
            ? "bg-gold-soft border border-gold-soft"
            : "bg-white/5 border border-white/10"
        }`}
      >
        <Icon
          className={`w-3 h-3 ${disabled ? "text-gold" : "text-slate-400"}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display font-bold text-white text-xs tracking-tight">
            {title}
          </p>
          <button
            role="switch"
            aria-checked={checked}
            aria-label={`Toggle ${title}`}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
              checked
                ? "bg-gradient-to-r from-violet-600 to-plum"
                : "bg-white/10"
            } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                checked ? "translate-x-4" : "translate-x-1"
              } mt-0.5`}
            >
              {checked && !disabled && (
                <Check className="w-2.5 h-2.5 text-violet-600 m-0.5" strokeWidth={4} />
              )}
            </span>
          </button>
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}
