"use client";

import { motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { waLink, WHATSAPP_PRETTY } from "@/lib/whatsapp";

const PALETTE = {
  bgDark: "#1A1815",
  cream: "#F5F1E8",
  textMuted: "rgba(245, 241, 232, 0.65)",
  textSoft: "rgba(245, 241, 232, 0.40)",
  accent: "#E04E2C",
  hairline: "rgba(245, 241, 232, 0.10)",
};

const navigation = {
  servicios: [
    { label: "Branding Estratégico", href: "#servicios" },
    { label: "Performance Marketing", href: "#servicios" },
    { label: "SEO Avanzado", href: "#servicios" },
    { label: "Automatización IA", href: "#ia" },
    { label: "Desarrollo Web", href: "#servicios" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#nosotros" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "Proceso", href: "#proceso" },
    { label: "Resultados", href: "#resultados" },
    { label: "Testimonios", href: "#testimonios" },
  ],
  legal: [
    { label: "Política de Privacidad", href: "/privacidad" },
    { label: "Términos y Condiciones", href: "/terminos" },
    { label: "Cookies", href: "/cookies" },
  ],
};

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: PALETTE.bgDark, color: PALETTE.cream }}
    >
      {/* Big editorial letter watermark */}
      <div
        aria-hidden
        className="absolute -bottom-12 -right-12 select-none pointer-events-none leading-none"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: "clamp(20rem, 35vw, 32rem)",
          fontWeight: 300,
          color: PALETTE.accent,
          opacity: 0.10,
        }}
      >
        A
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-10">
        {/* Top — big statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-20 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: PALETTE.accent }}
            />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: PALETTE.accent }}
            >
              Aureon Growth · 2026
            </span>
          </div>
          <h3
            className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
            style={{ color: PALETTE.cream }}
          >
            Transformamos marcas{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: PALETTE.accent,
              }}
            >
              en sistemas
            </span>{" "}
            de crecimiento.
          </h3>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16 lg:mb-20">
          {/* Logo + contact */}
          <div className="col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-6">
              <svg
                width="36"
                height="36"
                viewBox="0 0 32 32"
                className="flex-shrink-0"
                aria-hidden
              >
                <rect width="32" height="32" rx="8" fill="#1A1815" />
                <circle cx="16" cy="16" r="11" stroke="#c9a961" strokeWidth="1.5" fill="none" />
                <circle cx="16" cy="16" r="6" fill="url(#aureonCoreFooter)" />
                <circle cx="16" cy="5" r="2" fill="#c9a961" />
                <defs>
                  <linearGradient id="aureonCoreFooter" x1="11" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#E04E2C" />
                    <stop offset="100%" stopColor="#A53B1F" />
                  </linearGradient>
                </defs>
              </svg>
              <span
                className="font-display font-bold text-base tracking-wide"
                style={{ color: PALETTE.cream }}
              >
                AUREON{" "}
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: PALETTE.accent,
                  }}
                >
                  growth
                </span>
              </span>
            </a>
            <p
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ color: PALETTE.textMuted }}
            >
              Growth partner premium para marcas con ambición real. LATAM, USA
              y Europa.
            </p>

            {/* Contact rows */}
            <div className="space-y-3 text-sm">
              <a
                href="mailto:hola@aureongrowth.com"
                className="flex items-center gap-3 hover:text-current transition-colors"
                style={{ color: PALETTE.textMuted }}
              >
                <Mail
                  className="w-4 h-4"
                  style={{ color: PALETTE.accent }}
                />
                hola@aureongrowth.com
              </a>
              <a
                href={waLink("default")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors"
                style={{ color: PALETTE.textMuted }}
              >
                <MessageCircle
                  className="w-4 h-4"
                  style={{ color: PALETTE.accent }}
                />
                {WHATSAPP_PRETTY}
              </a>
              <div
                className="flex items-center gap-3"
                style={{ color: PALETTE.textMuted }}
              >
                <MapPin
                  className="w-4 h-4"
                  style={{ color: PALETTE.accent }}
                />
                Bogotá, Colombia
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div>
            <h4
              className="font-mono text-[11px] uppercase tracking-[0.22em] mb-5"
              style={{ color: PALETTE.accent }}
            >
              Servicios
            </h4>
            <ul className="space-y-3">
              {navigation.servicios.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm hover:opacity-100 transition-opacity"
                    style={{ color: PALETTE.textMuted }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-mono text-[11px] uppercase tracking-[0.22em] mb-5"
              style={{ color: PALETTE.accent }}
            >
              Empresa
            </h4>
            <ul className="space-y-3">
              {navigation.empresa.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm transition-opacity"
                    style={{ color: PALETTE.textMuted }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-mono text-[11px] uppercase tracking-[0.22em] mb-5"
              style={{ color: PALETTE.accent }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm transition-opacity"
                    style={{ color: PALETTE.textMuted }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
          style={{ borderColor: PALETTE.hairline }}
        >
          <div
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: PALETTE.textSoft }}
          >
            © Aureon Growth MMXXVI · Bogotá, CO
          </div>
          <div className="flex items-center gap-4">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:scale-110"
                style={{
                  borderColor: PALETTE.hairline,
                  color: PALETTE.cream,
                }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
