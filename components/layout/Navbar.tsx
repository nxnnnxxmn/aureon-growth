"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomCursor from "@/components/common/CustomCursor";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Resultados", href: "#resultados" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Proceso", href: "#proceso" },
  { label: "IA & Automatización", href: "#ia" },
  { label: "Nosotros", href: "#nosotros" },
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
      <CustomCursor />
      <motion.header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#050507]/80 backdrop-blur-xl border-b border-violet-500/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center shadow-glow-violet-sm">
                  <Zap className="w-5 h-5 text-white" fill="currentColor" />
                </div>
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="text-white">LANCHEROS</span>
                <span className="gradient-text"> STUDIO</span>
              </span>
            </motion.a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    activeLink === link.href
                      ? "text-violet-300"
                      : "text-slate-400 hover:text-slate-100"
                  )}
                  onClick={() => setActiveLink(link.href)}
                  whileHover={{ scale: 1.02 }}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-violet-500/10"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* CTA Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href="mailto:hola@lancherosstudio.com"
                className="text-sm text-slate-400 hover:text-violet-300 transition-colors font-medium"
                whileHover={{ scale: 1.03 }}
              >
                hola@lancherosstudio.com
              </motion.a>
              <motion.a
                href="#contacto"
                className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-700 text-white text-sm font-display font-medium rounded-xl btn-glow transition-all duration-300 hover:shadow-glow-violet"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Iniciar Proyecto
              </motion.a>
            </div>

            {/* Mobile toggle */}
            <motion.button
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-violet-500/10 transition-colors"
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
              className="lg:hidden bg-[#0c0c14]/95 backdrop-blur-xl border-t border-violet-500/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-2">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-violet-300 hover:bg-violet-500/10 transition-all font-medium"
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
                  className="flex items-center justify-center w-full mt-4 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-display font-medium rounded-xl btn-glow"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Iniciar Proyecto
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
