"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { waLink, WHATSAPP_PRETTY } from "@/lib/whatsapp";
import { GROWTH_SYSTEMS } from "@/lib/growth";
import { A } from "@/lib/ui";

const navigation = {
  servicios: GROWTH_SYSTEMS.map((s) => ({ label: s.short, href: `/servicios/${s.slug}` })),
  empresa: [
    { label: "Servicios", href: "/servicios" },
    { label: "Metodología", href: "/metodologia" },
    { label: "Proceso", href: "/proceso" },
    { label: "Escenarios", href: "/casos" },
    { label: "Diagnóstico", href: "/diagnostico" },
  ],
  legal: [
    { label: "Privacidad", href: "/legal/privacidad" },
    { label: "Términos", href: "/legal/terminos" },
    { label: "Cookies", href: "/legal/cookies" },
  ],
};

const socials = [
  { Icon: Instagram, href: "https://instagram.com/aureongrowth", label: "Instagram" },
  { Icon: Linkedin, href: "https://linkedin.com/company/aureongrowth", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden" style={{ backgroundColor: A.bg, color: A.text, borderTop: `1px solid ${A.border}` }}>
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-30" />
      <div aria-hidden className="absolute -bottom-40 right-[-8%] w-[620px] h-[620px] rounded-full glow-gold pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-20 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: A.gold, boxShadow: `0 0 8px ${A.gold}` }} />
            <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>Aureon Growth Services</span>
          </div>
          <h3 className="font-display font-semibold text-[clamp(1.85rem,4.5vw,3.25rem)] leading-[1.06] tracking-[-0.02em]" style={{ color: A.text }}>
            Estrategia, tecnología y performance para{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>crecimiento medible</span>.
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16 lg:mb-20">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="Aureon Growth Services — Inicio">
              <svg width="36" height="36" viewBox="0 0 32 32" className="flex-shrink-0" aria-hidden>
                <rect width="32" height="32" rx="8" fill="#11101A" stroke="rgba(214,180,106,0.4)" strokeWidth="0.75" />
                <circle cx="16" cy="16" r="11" stroke={A.gold} strokeWidth="1.3" fill="none" opacity="0.8" />
                <circle cx="16" cy="16" r="6" fill="url(#footCore)" />
                <circle cx="16" cy="5" r="2" fill={A.gold} />
                <defs>
                  <linearGradient id="footCore" x1="11" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={A.gold} /><stop offset="100%" stopColor={A.violet} />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-display font-bold text-base tracking-wide" style={{ color: A.text }}>
                AUREON <span style={{ color: A.gold }}>GROWTH</span>
                <span className="block font-normal text-[10px] uppercase tracking-[0.22em]" style={{ color: A.textDim }}>Services</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: A.text2 }}>
              Growth partner que integra branding, performance, automatización e
              inteligencia artificial en un solo sistema comercial medible.
            </p>
            <div className="space-y-3 text-sm">
              <a href="mailto:aureongrowthservices@outlook.com" className="flex items-center gap-3 transition-opacity hover:opacity-100 focus-ring rounded" style={{ color: A.text2 }}>
                <Mail className="w-4 h-4" style={{ color: A.gold }} /> aureongrowthservices@outlook.com
              </a>
              <a href={waLink("default")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-opacity hover:opacity-100 focus-ring rounded" style={{ color: A.text2 }}>
                <MessageCircle className="w-4 h-4" style={{ color: A.gold }} /> {WHATSAPP_PRETTY}
              </a>
              <div className="flex items-center gap-3" style={{ color: A.text2 }}>
                <MapPin className="w-4 h-4" style={{ color: A.gold }} /> Bogotá, Colombia
              </div>
            </div>
          </div>

          <FooterCol title="Servicios" items={navigation.servicios} />
          <FooterCol title="Empresa" items={navigation.empresa} />
          <FooterCol title="Legal" items={navigation.legal} />
        </div>

        <div className="border-t pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4" style={{ borderColor: A.border }}>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: A.textDim }}>
            © {new Date().getFullYear()} Aureon Growth Services · Bogotá, CO
          </div>
          <div className="flex items-center gap-4">
            {socials.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:scale-110 focus-ring" style={{ borderColor: A.border, color: A.text }}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] mb-5" style={{ color: A.gold }}>{title}</h4>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="text-sm transition-opacity hover:opacity-100 focus-ring rounded" style={{ color: A.text2 }}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
