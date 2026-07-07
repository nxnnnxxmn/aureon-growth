"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { A } from "@/lib/ui";
import ScrollProgress from "@/components/common/ScrollProgress";

const links = [
  { label: "Servicios", href: "/servicios" },
  { label: "Metodología", href: "/metodologia" },
  { label: "Proceso", href: "/proceso" },
  { label: "Escenarios", href: "/casos" },
  { label: "Diagnóstico", href: "/diagnostico" },
];

/* Navbar v2 — píldora flotante liquid-glass (referencia Aura/DesignPro).
   El cristal se asienta sobre el video global; al scrollear se vuelve
   más denso para mantener legibilidad. `dark` se conserva por compat. */
export default function Navbar({ dark = true }: { dark?: boolean }) {
  void dark;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="max-w-[1240px] w-full mx-auto px-4 lg:px-6 pt-3 lg:pt-4">
        <div
          className="liquid-glass rounded-full flex items-center justify-between gap-3 pl-4 pr-2 lg:pl-6 lg:pr-2.5 h-14 lg:h-[60px] transition-colors duration-500"
          style={{
            backgroundColor: scrolled ? "rgba(8,7,13,0.82)" : "rgba(10,9,16,0.55)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group focus-ring rounded-full shrink-0" aria-label="Aureon Growth Services — Inicio">
            <svg width="34" height="34" viewBox="0 0 32 32" className="flex-shrink-0" aria-hidden>
              <rect width="32" height="32" rx="10" fill="#11101A" stroke="rgba(214,180,106,0.4)" strokeWidth="0.75" />
              <circle cx="16" cy="16" r="11" stroke={A.gold} strokeWidth="1.3" fill="none" opacity="0.8" />
              <circle cx="16" cy="16" r="6" fill="url(#navCore)" />
              <circle cx="16" cy="5" r="2" fill={A.gold} />
              <defs>
                <linearGradient id="navCore" x1="11" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={A.gold} />
                  <stop offset="100%" stopColor={A.violet} />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-display font-bold text-sm tracking-wide leading-tight" style={{ color: A.text }}>
              AUREON <span style={{ color: A.gold }}>GROWTH</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium transition-colors duration-200 group focus-ring rounded"
                style={{ color: A.text2 }}
              >
                <span className="group-hover:text-[#F0EDF8] transition-colors">{link.label}</span>
                <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: A.gold }} />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href={waLink("default")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/5 focus-ring"
              style={{ color: A.text2 }}
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="/diagnostico"
              className="btn-premium focus-ring px-5 py-2.5 text-xs tracking-wide uppercase font-display font-semibold rounded-full"
              style={{ backgroundColor: A.gold, color: A.bg, boxShadow: "0 10px 26px -8px rgba(214,180,106,0.4)" }}
            >
              Solicitar diagnóstico
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center focus-ring"
            style={{ color: A.text, backgroundColor: "rgba(255,255,255,0.05)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu — panel de cristal bajo la píldora */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden liquid-glass rounded-3xl mt-2 overflow-hidden"
              style={{ backgroundColor: "rgba(8,7,13,0.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-6 space-y-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center w-full px-3 py-3.5 -mx-3 text-sm font-medium border-b rounded-lg focus-ring touch-target"
                    style={{ color: A.text, borderColor: A.border, minHeight: 44 }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/diagnostico"
                  className="flex items-center justify-center w-full mt-6 px-6 py-4 text-xs tracking-wide uppercase font-display font-semibold rounded-full"
                  style={{ backgroundColor: A.gold, color: A.bg }}
                  onClick={() => setMobileOpen(false)}
                >
                  Solicitar diagnóstico
                </a>
                <a
                  href={waLink("default")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full mt-2 px-6 py-4 text-xs tracking-wide uppercase font-display font-semibold rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", color: A.text, border: `1px solid ${A.border}` }}
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <ScrollProgress />
    </motion.header>
  );
}
