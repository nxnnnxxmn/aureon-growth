"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Cookie, Check, ChevronDown, ChevronUp, Shield, BarChart3, Megaphone } from "lucide-react";
import { getConsent, acceptAll, rejectAll, setConsent, DEFAULT_CONSENT, type ConsentState } from "@/lib/consent";
import { A } from "@/lib/ui";

/**
 * Cookie consent banner — premium dark, on the Aureon token palette.
 * Accept / reject non-essential / customize, persisted in localStorage,
 * won't reappear after a choice. Links to /cookies.
 */
export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      const existing = getConsent();
      if (!existing) setVisible(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const handleAcceptAll = () => { acceptAll(); setVisible(false); };
  const handleRejectAll = () => { rejectAll(); setVisible(false); };
  const handleSaveCustom = () => { setConsent({ analytics: draft.analytics, marketing: draft.marketing }); setVisible(false); };

  const ghostBtn = { backgroundColor: "rgba(255,255,255,0.05)", border: `1px solid ${A.border}`, color: A.text2 } as const;
  const goldBtn = { backgroundColor: A.gold, color: A.bg } as const;

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
          <div className="rounded-2xl border-grad overflow-hidden" style={{ backgroundColor: "rgba(13,11,24,0.95)", backdropFilter: "blur(16px)", border: `1px solid ${A.borderActive}`, boxShadow: "0 30px 70px -28px rgba(0,0,0,0.85)" }}>
            <div className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(214,180,106,0.14)" }}>
                  <Cookie className="w-4 h-4" style={{ color: A.gold }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-sm tracking-tight" style={{ color: A.text }}>Usamos cookies</h3>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: A.text2 }}>
                    Usamos cookies necesarias para el funcionamiento del sitio. Las no
                    esenciales solo se activan con tu consentimiento.
                  </p>
                </div>
                <button onClick={handleRejectAll} className="shrink-0 w-6 h-6 -mr-1 rounded-lg flex items-center justify-center transition-colors focus-ring" style={{ color: A.textDim }} aria-label="Rechazar cookies no esenciales">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <AnimatePresence>
                {customizing && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <div className="pt-3 pb-1 space-y-2">
                      <Toggle icon={Shield} title="Necesarias" description="Funcionamiento básico del sitio. Siempre activas." checked={true} disabled onChange={() => {}} />
                      <Toggle icon={BarChart3} title="Analítica" description="Si en el futuro se integra analítica, se activaría aquí." checked={draft.analytics} onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))} />
                      <Toggle icon={Megaphone} title="Marketing" description="Medición publicitaria futura, solo con tu permiso." checked={draft.marketing} onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-2 gap-2 mt-3">
                {customizing ? (
                  <>
                    <button onClick={() => setCustomizing(false)} className="px-3 py-2.5 rounded-xl text-xs font-display font-semibold uppercase tracking-[0.18em] transition-colors focus-ring" style={ghostBtn}>Cancelar</button>
                    <button onClick={handleSaveCustom} className="btn-premium px-3 py-2.5 rounded-xl text-xs font-display font-semibold uppercase tracking-[0.18em] focus-ring" style={goldBtn}>Guardar</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleRejectAll} className="px-3 py-2.5 rounded-xl text-xs font-display font-semibold uppercase tracking-[0.18em] transition-colors focus-ring" style={ghostBtn}>Rechazar no esenciales</button>
                    <button onClick={handleAcceptAll} className="btn-premium px-3 py-2.5 rounded-xl text-xs font-display font-semibold uppercase tracking-[0.18em] focus-ring" style={goldBtn}>Aceptar cookies</button>
                  </>
                )}
              </div>

              {!customizing && (
                <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t" style={{ borderColor: A.border }}>
                  <button onClick={() => setCustomizing(true)} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] font-display font-semibold transition-colors focus-ring rounded" style={{ color: A.gold }}>
                    <ChevronDown className="w-3 h-3" /> Configurar preferencias
                  </button>
                  <Link href="/cookies" className="text-[10px] uppercase tracking-[0.22em] font-display font-semibold transition-colors focus-ring rounded" style={{ color: A.textDim }}>
                    Política de cookies
                  </Link>
                </div>
              )}
              {customizing && (
                <div className="flex items-center justify-end gap-3 mt-3">
                  <button onClick={() => setCustomizing(false)} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] font-display font-semibold transition-colors focus-ring rounded" style={{ color: A.textDim }}>
                    <ChevronUp className="w-3 h-3" /> Cerrar
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

function Toggle({ icon: Icon, title, description, checked, disabled = false, onChange }: {
  icon: typeof Shield; title: string; description: string; checked: boolean; disabled?: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: disabled ? "rgba(214,180,106,0.14)" : "rgba(255,255,255,0.05)", border: `1px solid ${A.border}` }}>
        <Icon className="w-3 h-3" style={{ color: disabled ? A.gold : A.text2 }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display font-bold text-xs tracking-tight" style={{ color: A.text }}>{title}</p>
          <button
            role="switch"
            aria-checked={checked}
            aria-label={`Activar ${title}`}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors focus-ring"
            style={{ backgroundColor: checked ? A.gold : "rgba(255,255,255,0.12)", opacity: disabled ? 0.6 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
          >
            <span className="inline-block h-3.5 w-3.5 transform rounded-full shadow transition-transform mt-0.5" style={{ backgroundColor: checked ? A.bg : "#fff", transform: checked ? "translateX(1rem)" : "translateX(0.25rem)" }}>
              {checked && !disabled && <Check className="w-2.5 h-2.5 m-0.5" style={{ color: A.gold }} strokeWidth={4} />}
            </span>
          </button>
        </div>
        <p className="text-[10px] leading-relaxed mt-0.5" style={{ color: A.textDim }}>{description}</p>
      </div>
    </div>
  );
}
