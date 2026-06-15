/**
 * AUREON GROWTH SERVICES — central content source of truth.
 *
 * Growth systems, methodology phases, work models, process and FAQs live here
 * so the home page and internal routes stay in sync without duplicating copy.
 */

import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Crosshair,
  Workflow,
  LineChart,
  Search,
  LayoutGrid,
  Rocket,
  TrendingUp,
  ClipboardCheck,
  Layers,
} from "lucide-react";

// ============================================================
// GROWTH SYSTEMS — 4 vendable systems (home cards + detail pages)
// ============================================================

export interface GrowthSystem {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  /** one-line value prop for cards */
  summary: string;
  /** short deliverables for the home card */
  highlights: string[];
  /** expected outcome (qualitative, honest) */
  outcome: string;
  // ---- detail page ----
  metaTitle: string;
  metaDescription: string;
  intro: string;
  capabilities: { title: string; body: string }[];
  deliverables: string[];
  results: string[];
}

export const GROWTH_SYSTEMS: GrowthSystem[] = [
  {
    slug: "branding-estrategico",
    name: "Brand Authority System",
    short: "Branding",
    icon: Compass,
    summary:
      "Construimos una marca más clara, diferenciada y confiable para que tu empresa comunique valor antes de vender.",
    highlights: [
      "Posicionamiento",
      "Identidad verbal",
      "Dirección creativa",
      "Contenido de marca",
    ],
    outcome: "Una marca más clara, diferenciada y confiable.",
    metaTitle: "Brand Authority System · Branding Estratégico",
    metaDescription:
      "Branding estratégico, posicionamiento, identidad verbal y dirección creativa para que tu marca comunique valor antes de vender.",
    intro:
      "El Brand Authority System construye la base sobre la que opera todo crecimiento: una marca que comunica valor con claridad y se diferencia en su categoría antes de invertir un peso en adquisición.",
    capabilities: [
      {
        title: "Posicionamiento estratégico",
        body: "Definimos qué representa tu marca, para quién y por qué importa, con un mensaje central que ordena toda la comunicación.",
      },
      {
        title: "Identidad verbal y narrativa",
        body: "Tono, mensajes clave y narrativa comercial consistentes en cada touchpoint, del sitio al equipo de ventas.",
      },
      {
        title: "Dirección creativa y sistema visual",
        body: "Un sistema visual coherente y premium que transmite el nivel real de tu propuesta de valor.",
      },
      {
        title: "Contenido de marca con intención",
        body: "Contenido organizado por etapa del funnel, diseñado para construir autoridad, no solo para publicar.",
      },
    ],
    deliverables: [
      "Estrategia de posicionamiento",
      "Plataforma de marca y mensajes",
      "Sistema visual y guías de uso",
      "Arquitectura verbal",
      "Líneas de contenido por funnel",
    ],
    results: [
      "Mensaje comercial más claro y consistente",
      "Diferenciación frente a competidores directos",
      "Mayor confianza percibida en cada punto de contacto",
    ],
  },
  {
    slug: "performance-marketing",
    name: "Acquisition Engine",
    short: "Performance",
    icon: Crosshair,
    summary:
      "Diseñamos campañas, funnels y landing pages orientadas a generar oportunidades comerciales más calificadas.",
    highlights: ["Paid media", "Funnels", "Landing pages", "SEO · CRO"],
    outcome: "Más oportunidades comerciales calificadas.",
    metaTitle: "Acquisition Engine · Performance Marketing",
    metaDescription:
      "Performance marketing, paid media, funnels, landing pages, SEO y CRO para generar oportunidades comerciales calificadas.",
    intro:
      "El Acquisition Engine convierte inversión y tráfico en oportunidades comerciales reales, con campañas, funnels y páginas diseñadas alrededor de la conversión, no solo del alcance.",
    capabilities: [
      {
        title: "Performance & paid media",
        body: "Campañas en los canales correctos para tu negocio, estructuradas alrededor de objetivos comerciales medibles.",
      },
      {
        title: "Funnels y landing pages",
        body: "Embudos y páginas de alta conversión, con copy estratégico y arquitectura orientada a capturar oportunidades.",
      },
      {
        title: "SEO y contenido de adquisición",
        body: "Posicionamiento orgánico sostenible que reduce la dependencia exclusiva de medios pagos.",
      },
      {
        title: "CRO y optimización continua",
        body: "Experimentación sistemática para mejorar la tasa de conversión a lo largo del tiempo.",
      },
    ],
    deliverables: [
      "Estructura de campañas y paid media",
      "Funnels de conversión",
      "Landing pages optimizadas",
      "Estrategia SEO y de contenido",
      "Programa de experimentos CRO",
    ],
    results: [
      "Pipeline más calificado por canal",
      "Mejor costo por oportunidad a lo largo del tiempo",
      "Menor dependencia de un solo canal de adquisición",
    ],
  },
  {
    slug: "automatizacion-crm-ia",
    name: "Revenue Automation",
    short: "Automatización & CRM",
    icon: Workflow,
    summary:
      "Conectamos formularios, CRM, WhatsApp, email y automatizaciones para reducir leads perdidos y mejorar el seguimiento comercial.",
    highlights: ["CRM", "WhatsApp flows", "Email nurturing", "Lead scoring"],
    outcome: "Menos leads perdidos y mejor gestión comercial.",
    metaTitle: "Revenue Automation · CRM, Automatización e IA",
    metaDescription:
      "CRM, automatización comercial, WhatsApp flows, email nurturing, lead scoring e integraciones para reducir leads perdidos.",
    intro:
      "Revenue Automation conecta tu captación con tu operación comercial: cada oportunidad queda registrada, nutrida y priorizada, sin depender de procesos manuales ni de la memoria del equipo.",
    capabilities: [
      {
        title: "CRM conectado",
        body: "Centralizamos cada oportunidad con trazabilidad por etapa, conectada a formularios y canales de contacto.",
      },
      {
        title: "Automatización de seguimiento",
        body: "Flujos de WhatsApp y email que dan seguimiento en el momento correcto, reduciendo leads que se enfrían.",
      },
      {
        title: "Lead scoring y priorización",
        body: "Clasificación de oportunidades para que el equipo comercial enfoque su tiempo donde hay más probabilidad de cierre.",
      },
      {
        title: "IA aplicada e integraciones",
        body: "Clasificación asistida por IA y conexión entre tus herramientas para un flujo operativo único.",
      },
    ],
    deliverables: [
      "Implementación o limpieza de CRM",
      "Automatizaciones de WhatsApp y email",
      "Modelo de lead scoring",
      "Integraciones entre herramientas",
      "Flujo de handover comercial",
    ],
    results: [
      "Menos oportunidades perdidas por falta de seguimiento",
      "Operación comercial más predecible",
      "Mejor visibilidad de cada etapa del pipeline",
    ],
  },
  {
    slug: "analitica-growth-intelligence",
    name: "Growth Intelligence",
    short: "Analítica & Data",
    icon: LineChart,
    summary:
      "Creamos dashboards, tracking y análisis para entender qué funciona, qué debe optimizarse y dónde escalar.",
    highlights: ["Dashboards", "Tracking", "Reporting", "Experimentación"],
    outcome: "Decisiones más claras y crecimiento más medible.",
    metaTitle: "Growth Intelligence · Analítica & Data",
    metaDescription:
      "Dashboards, tracking, analítica, reporting y experimentación para tomar decisiones basadas en datos y escalar con control.",
    intro:
      "Growth Intelligence transforma datos dispersos en decisiones. Conectamos tracking, dashboards y reporting para que sepas qué funciona, qué optimizar y dónde invertir el siguiente peso.",
    capabilities: [
      {
        title: "Tracking y medición",
        body: "Implementación de eventos y medición confiable para que cada decisión se base en datos reales, no en intuición.",
      },
      {
        title: "Dashboards ejecutivos",
        body: "Tableros claros con las métricas que mueven el negocio, no con datos de actividad sin contexto.",
      },
      {
        title: "Reporting y lectura de negocio",
        body: "Reportes periódicos que traducen los números en insights accionables y próximos pasos.",
      },
      {
        title: "Experimentación",
        body: "Un proceso estructurado de hipótesis y pruebas para optimizar de forma continua.",
      },
    ],
    deliverables: [
      "Plan de medición y tracking",
      "Dashboards conectados",
      "Reportes ejecutivos periódicos",
      "Framework de experimentación",
      "Lectura de oportunidades de escalamiento",
    ],
    results: [
      "Decisiones basadas en datos confiables",
      "Visibilidad clara del retorno por canal",
      "Identificación de dónde escalar con menor riesgo",
    ],
  },
];

export function getSystem(slug: string) {
  return GROWTH_SYSTEMS.find((s) => s.slug === slug);
}

// ============================================================
// METHODOLOGY — Aureon Growth System (4 phases)
// ============================================================

export interface Phase {
  n: string;
  icon: LucideIcon;
  title: string;
  body: string;
  deliverables: string[];
}

export const METHODOLOGY: Phase[] = [
  {
    n: "01",
    icon: Search,
    title: "Diagnóstico estratégico",
    body: "Analizamos marca, oferta, audiencia, canales activos, tráfico, CRM, funnel y oportunidades comerciales reales.",
    deliverables: ["Diagnóstico de marca", "Auditoría de canales", "Mapa de oportunidades"],
  },
  {
    n: "02",
    icon: LayoutGrid,
    title: "Arquitectura de crecimiento",
    body: "Diseñamos posicionamiento, mensajes, journey, embudos, canales prioritarios y objetivos comerciales medibles.",
    deliverables: ["Blueprint estratégico", "Mapa de funnel", "Plan de medición"],
  },
  {
    n: "03",
    icon: Workflow,
    title: "Implementación del sistema",
    body: "Ejecutamos landing pages, campañas, automatizaciones, CRM, contenidos, tracking y dashboards conectados.",
    deliverables: ["Landing & funnels", "CRM + automatizaciones", "Dashboards en vivo"],
  },
  {
    n: "04",
    icon: TrendingUp,
    title: "Optimización continua",
    body: "Analítica, CRO, experimentación, reportes ejecutivos y escalamiento de los canales con mejor retorno.",
    deliverables: ["Reportes ejecutivos", "Experimentos CRO", "Plan de escalamiento"],
  },
];

// ============================================================
// PROCESS — full working process (6 steps)
// ============================================================

export interface ProcessStep {
  n: string;
  icon: LucideIcon;
  title: string;
  what: string;
  deliverable: string;
  decision: string;
  duration: string;
}

export const PROCESS: ProcessStep[] = [
  {
    n: "01",
    icon: Search,
    title: "Diagnóstico",
    what: "Revisamos marca, canales, funnel, CRM y datos para entender el punto de partida real.",
    deliverable: "Diagnóstico con hallazgos y oportunidades priorizadas.",
    decision: "Saber dónde está la fricción y qué mover primero.",
    duration: "1–2 semanas",
  },
  {
    n: "02",
    icon: LayoutGrid,
    title: "Blueprint estratégico",
    what: "Diseñamos el sistema de crecimiento: posicionamiento, funnel, canales y objetivos.",
    deliverable: "Blueprint con plan de implementación y métricas objetivo.",
    decision: "Validar el plan antes de ejecutar.",
    duration: "2–3 semanas",
  },
  {
    n: "03",
    icon: Workflow,
    title: "Implementación",
    what: "Construimos landing, campañas, automatizaciones, CRM, tracking y contenidos.",
    deliverable: "Sistema comercial montado y conectado.",
    decision: "Pasar de la estrategia a un sistema operativo.",
    duration: "3–6 semanas",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Lanzamiento",
    what: "Activamos campañas y flujos con medición desde el primer día.",
    deliverable: "Sistema en producción con dashboards en vivo.",
    decision: "Empezar a capturar datos reales de desempeño.",
    duration: "Continuo",
  },
  {
    n: "05",
    icon: ClipboardCheck,
    title: "Optimización",
    what: "Analizamos resultados, ejecutamos experimentos y ajustamos lo que no funciona.",
    deliverable: "Reportes ejecutivos y experimentos documentados.",
    decision: "Mejorar el retorno de forma continua.",
    duration: "Continuo",
  },
  {
    n: "06",
    icon: TrendingUp,
    title: "Escalamiento",
    what: "Reforzamos los canales con mejor retorno y ampliamos el sistema.",
    deliverable: "Plan de escalamiento basado en datos.",
    decision: "Crecer con control y menor riesgo.",
    duration: "Continuo",
  },
];

// ============================================================
// WORK MODELS — honest "formas de trabajo" (no invented prices)
// ============================================================

export interface WorkModel {
  name: string;
  icon: LucideIcon;
  forWho: string;
  includes: string[];
  outcome: string;
  featured?: boolean;
}

export const WORK_MODELS: WorkModel[] = [
  {
    name: "Growth Diagnostic",
    icon: Search,
    forWho: "Empresas que quieren claridad antes de invertir.",
    includes: [
      "Auditoría estratégica inicial",
      "Diagnóstico de marca, canales y funnel",
      "Mapa de oportunidades priorizadas",
    ],
    outcome: "Un punto de partida claro y accionable.",
  },
  {
    name: "Growth Build",
    icon: Layers,
    forWho: "Empresas listas para implementar su sistema.",
    includes: [
      "Blueprint estratégico",
      "Implementación de landing, funnels y campañas",
      "CRM, automatización y tracking",
    ],
    outcome: "Un sistema de crecimiento montado y funcionando.",
    featured: true,
  },
  {
    name: "Growth Partner",
    icon: TrendingUp,
    forWho: "Empresas que buscan acompañamiento continuo.",
    includes: [
      "Optimización continua y CRO",
      "Reportes ejecutivos periódicos",
      "Escalamiento de canales con mejor retorno",
    ],
    outcome: "Optimización y escalamiento sostenidos.",
  },
  {
    name: "Automation & CRM Sprint",
    icon: Workflow,
    forWho: "Empresas con captación pero sin seguimiento.",
    includes: [
      "Implementación de CRM",
      "Automatización de WhatsApp y email",
      "Lead scoring e integraciones",
    ],
    outcome: "Menos leads perdidos y mejor gestión comercial.",
  },
];

// ============================================================
// FAQ
// ============================================================

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: "¿Aureon Growth Services es una agencia de marketing o un growth partner?",
    a: "Operamos como growth partner: en lugar de vender piezas sueltas, construimos un sistema comercial que integra marca, adquisición, automatización y medición, y trabajamos con foco en resultados de negocio.",
  },
  {
    q: "¿Qué diferencia a Aureon de una agencia tradicional?",
    a: "No vendemos tácticas aisladas. Diseñamos sistemas de crecimiento completos y priorizamos claridad estratégica, ejecución y optimización continua basada en datos.",
  },
  {
    q: "¿Trabajan solo branding o también performance y automatización?",
    a: "Trabajamos los cuatro frentes a través de nuestros sistemas: Brand Authority, Acquisition Engine, Revenue Automation y Growth Intelligence. Pueden contratarse de forma integral o por sistema.",
  },
  {
    q: "¿Pueden ayudar si ya tengo campañas activas?",
    a: "Sí. En muchos casos partimos de lo que ya existe: revisamos campañas, funnel y seguimiento, y conectamos las piezas que hoy operan de forma aislada.",
  },
  {
    q: "¿Implementan CRM y automatizaciones?",
    a: "Sí. Implementamos o reorganizamos tu CRM, conectamos formularios, WhatsApp y email, y montamos automatizaciones de seguimiento y lead scoring.",
  },
  {
    q: "¿Qué incluye el diagnóstico estratégico?",
    a: "Una revisión de marca, oferta, canales, tráfico, funnel y CRM, junto con un mapa de oportunidades priorizadas. Es el punto de partida para diseñar tu sistema de crecimiento.",
  },
  {
    q: "¿Cuánto tiempo toma ver mejoras?",
    a: "Depende del punto de partida y del alcance. Algunas mejoras operativas se ven en las primeras semanas; los resultados comerciales sostenidos requieren ciclos de implementación y optimización.",
  },
  {
    q: "¿Trabajan con empresas pequeñas, medianas o grandes?",
    a: "Trabajamos con empresas que tienen ambición real de crecer y disposición a operar con un sistema. El alcance se adapta a la etapa de cada negocio.",
  },
  {
    q: "¿Se necesita tener una web o CRM antes de empezar?",
    a: "No es indispensable. Si no existen, los implementamos como parte del sistema. Si ya existen, los auditamos y los conectamos al resto del flujo.",
  },
  {
    q: "¿Cómo se mide el resultado del trabajo?",
    a: "Con tracking confiable y dashboards conectados a métricas de negocio. Definimos objetivos desde el blueprint y reportamos avances de forma transparente.",
  },
];
