"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";

const navigation = {
  servicios: [
    { label: "Branding Estratégico", href: "#servicios" },
    { label: "Performance Marketing", href: "#servicios" },
    { label: "SEO Avanzado", href: "#servicios" },
    { label: "Automatización IA", href: "#ia" },
    { label: "Paid Media", href: "#servicios" },
    { label: "Desarrollo Web", href: "#servicios" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#nosotros" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "Proceso", href: "#proceso" },
    { label: "Resultados", href: "#resultados" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Política de Privacidad", href: "#" },
    { label: "Términos de Servicio", href: "#" },
    { label: "Política de Cookies", href: "#" },
  ],
};

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/lancherosstudio" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/lancherosstudio" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com/lancherosstudio" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@lancherosstudio" },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) setNewsletterSent(true);
  };

  return (
    <footer className="relative overflow-hidden bg-[#040408]">
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <motion.a href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center shadow-glow-violet-sm">
                <Zap className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="text-white">LANCHEROS</span>
                <span className="gradient-text"> STUDIO</span>
              </span>
            </motion.a>

            <p className="text-slate-400 leading-relaxed text-sm max-w-xs">
              Agencia de marketing digital premium. Transformamos marcas en imperios digitales
              con estrategia, tecnología e inteligencia artificial de clase mundial.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: Mail, text: "hola@lancherosstudio.com", href: "mailto:hola@lancherosstudio.com" },
                { icon: Phone, text: "+57 300 000 0000", href: "tel:+573000000000" },
                { icon: MapPin, text: "Bogotá, Colombia · Remote Global", href: "#" },
              ].map((c) => (
                <a
                  key={c.text}
                  href={c.href}
                  className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-violet-300 transition-colors group"
                >
                  <c.icon className="w-4 h-4 text-violet-500 shrink-0 group-hover:text-violet-400 transition-colors" />
                  {c.text}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass border border-white/8 rounded-xl flex items-center justify-center text-slate-400 hover:text-violet-300 hover:border-violet-500/40 transition-all"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-white text-sm uppercase tracking-widest">
                Servicios
              </h4>
              <ul className="space-y-2.5">
                {navigation.servicios.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-violet-300 transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-violet-400" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-white text-sm uppercase tracking-widest">
                Empresa
              </h4>
              <ul className="space-y-2.5">
                {navigation.empresa.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-violet-300 transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-violet-400" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <h4 className="font-display font-semibold text-white text-sm uppercase tracking-widest mb-2">
                Newsletter Premium
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Estrategias, tendencias y casos de éxito exclusivos. Solo contenido que mueve el negocio.
              </p>
            </div>

            {!newsletterSent ? (
              <form onSubmit={handleNewsletter} className="space-y-2.5">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="tu@empresa.com"
                  required
                  className="w-full px-4 py-3 glass border border-white/10 rounded-xl text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all"
                />
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-display font-medium text-sm rounded-xl btn-glow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Send className="w-4 h-4" />
                  Suscribirme Gratis
                </motion.button>
                <p className="text-xs text-slate-600 text-center">
                  Sin spam. Cancela cuando quieras.
                </p>
              </form>
            ) : (
              <motion.div
                className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ¡Bienvenido! Revisa tu correo.
              </motion.div>
            )}

            {/* Certifications */}
            <div className="space-y-2">
              <p className="text-xs text-slate-600 uppercase tracking-wider font-medium">Certificaciones</p>
              <div className="flex flex-wrap gap-2">
                {["Google Premier", "Meta Partner", "HubSpot Diamond"].map((cert) => (
                  <span
                    key={cert}
                    className="px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/15 text-violet-400 text-xs font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Lancheros Studio. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {navigation.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
