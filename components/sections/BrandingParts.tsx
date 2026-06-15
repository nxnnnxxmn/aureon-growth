"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Compass,
  MessageSquareQuote,
  Palette,
  FileText,
  LayoutTemplate,
  Handshake,
  Check,
  Plus,
  Minus,
} from "lucide-react";

const C = {
  text: "#FBF8F1",
  textMuted: "rgba(251,248,241,0.70)",
  textSoft: "rgba(251,248,241,0.45)",
  accent: "#E04E2C",
  gold: "#C9A961",
  goldBright: "#D6B46A",
  panel: "rgba(251,248,241,0.04)",
  panelSolid: "#221F1B",
  hairline: "rgba(251,248,241,0.12)",
};

// ============================================================
// MODULES — 6 tabs
// ============================================================

const MODULES = [
  {
    icon: Compass,
    name: "Posicionamiento estratégico",
    items: ["Análisis de categoría", "Propuesta de valor", "Diferenciadores", "Audiencia", "Promesa central", "Narrativa competitiva", "Tono estratégico"],
    result: "Una marca que sabe qué representa, para quién existe y por qué debería ser elegida.",
  },
  {
    icon: MessageSquareQuote,
    name: "Identidad verbal y narrativa",
    items: ["Brand voice", "Mensajes clave", "Elevator pitch", "Claims", "Storytelling", "Tono comercial", "Guías de comunicación"],
    result: "Un discurso de marca consistente para web, ventas, contenido y campañas.",
  },
  {
    icon: Palette,
    name: "Sistema visual premium",
    items: ["Dirección creativa", "Paleta cromática", "Tipografía", "Componentes visuales", "Estilo de imágenes", "Iconografía", "Reglas de uso"],
    result: "Una presencia visual clara, sofisticada y coherente en cada punto de contacto.",
  },
  {
    icon: FileText,
    name: "Contenido de marca con intención",
    items: ["Pilares de contenido", "Contenido por etapa de funnel", "Líneas editoriales", "Autoridad temática", "Mensajes de conversión", "Calendario estratégico"],
    result: "Contenido que no solo publica: posiciona, educa y acompaña la conversión.",
  },
  {
    icon: LayoutTemplate,
    name: "Arquitectura de experiencia",
    items: ["Jerarquía de mensajes", "Estructura de landing", "Secciones comerciales", "Recorrido de usuario", "CTAs", "Microcopy"],
    result: "Una marca que se entiende rápido y guía mejor al usuario hacia la acción.",
  },
  {
    icon: Handshake,
    name: "Sistema de aplicación comercial",
    items: ["Guías para el equipo comercial", "Mensajes de WhatsApp", "Mensajes de email", "Argumentos de venta", "Manejo de objeciones", "Scripts de diagnóstico"],
    result: "Una marca que no solo se ve bien, sino que ayuda a vender mejor.",
  },
];

export function BrandModules() {
  const [active, setActive] = useState(0);
  const m = MODULES[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Tab list */}
      <div className="lg:col-span-5 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-1 px-1">
        {MODULES.map((mod, i) => {
          const isActive = i === active;
          return (
            <button
              key={mod.name}
              onClick={() => setActive(i)}
              className="shrink-0 lg:w-full text-left rounded-2xl p-4 lg:p-5 transition-all duration-300 flex items-center gap-3"
              style={{
                backgroundColor: isActive ? "rgba(224,78,44,0.12)" : C.panel,
                border: `1px solid ${isActive ? C.accent : C.hairline}`,
              }}
              aria-pressed={isActive}
            >
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: isActive ? C.accent : "rgba(251,248,241,0.06)" }}
              >
                <mod.icon className="w-4.5 h-4.5" style={{ color: isActive ? C.text : C.gold, width: 18, height: 18 }} />
              </span>
              <span className="font-display font-semibold text-sm leading-snug whitespace-nowrap lg:whitespace-normal" style={{ color: isActive ? C.text : C.textMuted }}>
                <span className="font-mono text-[10px] mr-2" style={{ color: C.gold }}>0{i + 1}</span>
                {mod.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl p-7 lg:p-9 h-full"
            style={{ backgroundColor: C.panelSolid, border: `1px solid ${C.hairline}` }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: C.accent }}>
                <m.icon className="w-5 h-5" style={{ color: C.text }} />
              </span>
              <h3 className="font-display font-semibold text-xl lg:text-2xl" style={{ color: C.text }}>
                {m.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-7">
              {m.items.map((it) => (
                <div key={it} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: C.gold }} strokeWidth={2.5} />
                  <span className="text-sm" style={{ color: C.textMuted }}>{it}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(201,169,97,0.10)", border: `1px solid rgba(201,169,97,0.2)` }}>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: C.goldBright }}>
                Resultado
              </div>
              <p className="text-sm font-medium leading-relaxed" style={{ color: C.text }}>
                {m.result}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================
// DELIVERABLES — tabs by category
// ============================================================

const DELIVERABLES = [
  {
    cat: "Estrategia",
    items: ["Diagnóstico de marca", "Análisis de categoría", "Mapa de posicionamiento", "Propuesta de valor", "Diferenciadores", "Audiencia estratégica"],
  },
  {
    cat: "Identidad verbal",
    items: ["Tono de voz", "Mensajes clave", "Manifiesto de marca", "Claims", "Storytelling", "Elevator pitch", "Arquitectura verbal"],
  },
  {
    cat: "Sistema visual",
    items: ["Dirección creativa", "Guía visual", "Paleta", "Tipografía", "Moodboard", "Lineamientos gráficos", "Estilo de imágenes"],
  },
  {
    cat: "Contenido y comunicación",
    items: ["Pilares de contenido", "Calendario editorial base", "Mensajes por funnel", "Guías de publicación", "Ideas de campañas", "Narrativa para redes y web"],
  },
  {
    cat: "Aplicación comercial",
    items: ["Discurso de ventas", "Guiones de WhatsApp", "Mensajes de email", "Objeciones y respuestas", "Estructura de landing", "CTAs y microcopy"],
  },
];

export function BrandDeliverables() {
  const [active, setActive] = useState(0);
  const d = DELIVERABLES[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {DELIVERABLES.map((cat, i) => {
          const isActive = i === active;
          return (
            <button
              key={cat.cat}
              onClick={() => setActive(i)}
              className="px-4 py-2.5 rounded-full text-sm font-display font-medium transition-all"
              style={{
                backgroundColor: isActive ? C.accent : C.panel,
                color: isActive ? C.text : C.textMuted,
                border: `1px solid ${isActive ? C.accent : C.hairline}`,
              }}
            >
              {cat.cat}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
        >
          {d.items.map((it) => (
            <div
              key={it}
              className="flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{ backgroundColor: C.panel, border: `1px solid ${C.hairline}` }}
            >
              <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(201,169,97,0.14)" }}>
                <Check className="w-3.5 h-3.5" style={{ color: C.goldBright }} strokeWidth={2.5} />
              </span>
              <span className="text-sm" style={{ color: C.text }}>{it}</span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// BEFORE / AFTER
// ============================================================

const BEFORE = [
  "Mensajes dispersos",
  "Diseño inconsistente",
  "Baja diferenciación",
  "Contenido improvisado",
  "Campañas sin narrativa",
  "Ventas con argumentos débiles",
  "Web que no transmite confianza",
];
const AFTER = [
  "Posicionamiento claro",
  "Identidad coherente",
  "Narrativa comercial sólida",
  "Contenido con intención",
  "Campañas más consistentes",
  "Equipo comercial alineado",
  "Experiencia digital más confiable",
];

export function BeforeAfter() {
  const [side, setSide] = useState<"after" | "before">("after");
  const isAfter = side === "after";
  const list = isAfter ? AFTER : BEFORE;

  return (
    <div>
      {/* Toggle */}
      <div className="inline-flex p-1 rounded-full mb-8" style={{ backgroundColor: C.panel, border: `1px solid ${C.hairline}` }}>
        <button
          onClick={() => setSide("before")}
          className="px-6 py-2.5 rounded-full text-sm font-display font-semibold transition-all"
          style={{ backgroundColor: !isAfter ? "rgba(251,248,241,0.10)" : "transparent", color: !isAfter ? C.text : C.textSoft }}
        >
          Antes
        </button>
        <button
          onClick={() => setSide("after")}
          className="px-6 py-2.5 rounded-full text-sm font-display font-semibold transition-all"
          style={{ backgroundColor: isAfter ? C.accent : "transparent", color: isAfter ? C.text : C.textSoft }}
        >
          Después
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={side}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
        >
          {list.map((it) => (
            <div
              key={it}
              className="flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{
                backgroundColor: isAfter ? "rgba(224,78,44,0.10)" : C.panel,
                border: `1px solid ${isAfter ? "rgba(224,78,44,0.28)" : C.hairline}`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: isAfter ? C.accent : C.textSoft }}
              />
              <span className="text-sm" style={{ color: isAfter ? C.text : C.textMuted }}>{it}</span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// FAQ accordion (accepts items)
// ============================================================

export function ServiceFAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.panel, border: `1px solid ${C.hairline}` }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display font-semibold text-base lg:text-lg" style={{ color: C.text }}>
                {item.q}
              </span>
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: isOpen ? C.accent : "rgba(251,248,241,0.06)", color: isOpen ? C.text : C.gold }}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="px-6 pb-6 text-sm lg:text-base leading-relaxed" style={{ color: C.textMuted }}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// STICKY SECTION NAV (scrollspy)
// ============================================================

const NAV_ITEMS = [
  { id: "vision", label: "Visión general" },
  { id: "modulos", label: "Módulos" },
  { id: "entregables", label: "Entregables" },
  { id: "servicios-24", label: "24 servicios" },
  { id: "proceso-marca", label: "Proceso" },
  { id: "planes", label: "Planes" },
  { id: "faq", label: "FAQ" },
];

export function SectionNav() {
  const [active, setActive] = useState("vision");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    NAV_ITEMS.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="sticky top-16 lg:top-20 z-40 backdrop-blur-md border-y"
      style={{ backgroundColor: "rgba(16,13,10,0.85)", borderColor: C.hairline }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <nav className="flex gap-1 overflow-x-auto no-scrollbar py-3" aria-label="Secciones del servicio">
          {NAV_ITEMS.map((n) => {
            const isActive = active === n.id;
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-display font-medium transition-all"
                style={{
                  backgroundColor: isActive ? "rgba(224,78,44,0.15)" : "transparent",
                  color: isActive ? C.text : C.textSoft,
                  border: `1px solid ${isActive ? "rgba(224,78,44,0.4)" : "transparent"}`,
                }}
              >
                {n.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
