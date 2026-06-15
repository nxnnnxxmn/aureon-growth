"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import ScrollProgress from "@/components/common/ScrollProgress";

const PALETTE = {
  bg: "#F5F1E8",
  text: "#1A1815",
  cream: "#F5F1E8",
  accent: "#E04E2C",
  gold: "#C9A961",
  hairline: "rgba(26,24,21,0.10)",
};

const links = [
  { label: "Servicios", href: "/servicios" },
  { label: "Metodología", href: "/metodologia" },
  { label: "Proceso", href: "/proceso" },
  { label: "Escenarios", href: "/casos" },
  { label: "Diagnóstico", href: "/diagnostico" },
];

/** `dark` = page renders a dark header behind the (transparent) navbar at top. */
export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text adapts to the surface behind it: cream over a dark hero, charcoal over cream.
  const topText = dark ? PALETTE.cream : PALETTE.text;
  const textColor = scrolled ? PALETTE.text : topText;

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(245, 241, 232, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottomColor: scrolled ? PALETTE.hairline : "transparent",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 border-b"
          style={{ borderColor: scrolled ? PALETTE.hairline : "transparent" }}
        >
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group" aria-label="Aureon Growth Services — Inicio">
              <svg width="36" height="36" viewBox="0 0 32 32" className="flex-shrink-0" aria-hidden>
                <rect width="32" height="32" rx="8" fill="#1A1815" />
                <circle cx="16" cy="16" r="11" stroke="#c9a961" strokeWidth="1.5" fill="none" />
                <circle cx="16" cy="16" r="6" fill="url(#aureonCoreNav)" />
                <circle cx="16" cy="5" r="2" fill="#c9a961" />
                <defs>
                  <linearGradient id="aureonCoreNav" x1="11" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#E04E2C" />
                    <stop offset="100%" stopColor="#A53B1F" />
                  </linearGradient>
                </defs>
              </svg>
              <span
                className="font-display font-bold text-sm lg:text-base tracking-wide leading-tight transition-colors duration-300"
                style={{ color: textColor }}
              >
                AUREON <span style={{ color: PALETTE.accent }}>GROWTH</span>
                <span
                  className="hidden md:inline ml-1 font-normal text-[10px] uppercase tracking-[0.22em] align-middle"
                  style={{ color: PALETTE.gold }}
                >
                  · Services
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-7">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
                  style={{ color: textColor }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={waLink("default")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs tracking-wide uppercase font-medium transition-opacity hover:opacity-70"
                style={{ color: textColor }}
                aria-label="Contactar por WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden xl:inline">WhatsApp</span>
              </a>
              <a
                href="/diagnostico"
                className="px-6 py-3 text-xs tracking-wide uppercase font-display font-semibold transition-all duration-200 rounded-full"
                style={{
                  backgroundColor: PALETTE.accent,
                  color: PALETTE.bg,
                  boxShadow: "0 8px 20px -6px rgba(224, 78, 44, 0.35)",
                }}
              >
                Solicitar diagnóstico
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 transition-colors"
              style={{ color: textColor }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden border-t"
              style={{ backgroundColor: PALETTE.bg, borderColor: PALETTE.hairline }}
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
                    className="block px-0 py-3 text-sm font-medium border-b transition-colors"
                    style={{ color: PALETTE.text, borderColor: PALETTE.hairline }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/diagnostico"
                  className="flex items-center justify-center w-full mt-6 px-6 py-4 text-xs tracking-wide uppercase font-display font-semibold rounded-full"
                  style={{ backgroundColor: PALETTE.accent, color: PALETTE.bg }}
                  onClick={() => setMobileOpen(false)}
                >
                  Solicitar diagnóstico
                </a>
                <a
                  href={waLink("default")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full mt-2 px-6 py-4 text-xs tracking-wide uppercase font-display font-semibold rounded-full"
                  style={{ backgroundColor: "#25d366", color: PALETTE.bg }}
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollProgress />
      </motion.header>
    </>
  );
}
