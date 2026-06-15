"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";
import ScrollProgress from "@/components/common/ScrollProgress";

const PALETTE = {
  bg: "#F5F1E8",
  bgDark: "#1A1815",
  cream: "#1A1815",     // ahora "cream" = texto (charcoal)
  gold: "#E04E2C",       // vermillion (CTA accent)
  green: "#2D5016",
  hairline: "rgba(26,24,21,0.10)",
};

const links = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Casos", href: "/casos" },
  { label: "Equipo", href: "/equipo" },
  { label: "Inversión", href: "/#inversion" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          style={{ borderColor: PALETTE.hairline }}
        >
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo — sólido cream, sin gradient */}
            <motion.a
              href="/"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 32 32"
                className="flex-shrink-0"
                aria-hidden
              >
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
                className="font-display font-bold text-sm lg:text-base tracking-wide"
                style={{ color: PALETTE.cream }}
              >
                AUREON{" "}
                <span style={{ color: PALETTE.gold }}>GROWTH</span>
              </span>
            </motion.a>

            {/* Desktop nav — sin gradients, texto cream, active state en gold */}
            <div className="hidden lg:flex items-center gap-6">
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative px-0 py-2 text-sm font-medium transition-colors duration-200"
                  style={{
                    color:
                      activeLink === link.href ? PALETTE.gold : PALETTE.cream,
                  }}
                  onClick={() => setActiveLink(link.href)}
                  whileHover={{ scale: 1.02 }}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ backgroundColor: PALETTE.gold }}
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* CTA Desktop — oro sólido, no gradient */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href={waLink("default")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs tracking-wide uppercase font-medium transition-colors duration-200"
                style={{ color: PALETTE.cream }}
                whileHover={{ scale: 1.03 }}
                aria-label="Contactar por WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden xl:inline">WhatsApp</span>
              </motion.a>
              <motion.a
                href="#contacto"
                className="px-6 py-3 text-xs tracking-wide uppercase font-display font-semibold transition-all duration-200 border"
                style={{
                  backgroundColor: PALETTE.gold,
                  color: PALETTE.bg,
                  borderColor: PALETTE.gold,
                }}
                whileHover={{
                  scale: 1.04,
                  backgroundColor: PALETTE.bg,
                  color: PALETTE.gold,
                }}
                whileTap={{ scale: 0.97 }}
              >
                Iniciar Proyecto
              </motion.a>
            </div>

            {/* Mobile toggle */}
            <motion.button
              className="lg:hidden p-2 transition-colors"
              style={{ color: PALETTE.cream }}
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden border-t"
              style={{
                backgroundColor: PALETTE.bg,
                borderColor: PALETTE.hairline,
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-6 space-y-3">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block px-0 py-3 text-sm font-medium border-b transition-colors"
                    style={{
                      color: PALETTE.cream,
                      borderColor: PALETTE.hairline,
                    }}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contacto"
                  className="flex items-center justify-center w-full mt-6 px-6 py-4 text-xs tracking-wide uppercase font-display font-semibold border transition-all"
                  style={{
                    backgroundColor: PALETTE.gold,
                    color: PALETTE.bg,
                    borderColor: PALETTE.gold,
                  }}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Iniciar Proyecto
                </motion.a>
                <motion.a
                  href={waLink("default")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full mt-2 px-6 py-4 text-xs tracking-wide uppercase font-display font-semibold border transition-all"
                  style={{
                    backgroundColor: "#25d366",
                    color: PALETTE.bg,
                    borderColor: "#25d366",
                  }}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll progress indicator — bottom edge of navbar */}
        <ScrollProgress />
      </motion.header>
    </>
  );
}
