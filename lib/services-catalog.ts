/**
 * The 24 services of Aureon Growth Services, mapped to a category (for filtering)
 * and to one of the four growth systems. `brandRelation` explains how the
 * Brand Authority System connects to each service (used in the branding page).
 */

export type ServiceCategory =
  | "Estrategia"
  | "Performance"
  | "Contenido"
  | "Tecnología"
  | "IA & Data";

export type SystemKey =
  | "branding-estrategico"
  | "performance-marketing"
  | "automatizacion-crm-ia"
  | "analitica-growth-intelligence";

export interface CatalogService {
  id: number;
  title: string;
  category: ServiceCategory;
  system: SystemKey;
  brandRelation: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Estrategia",
  "Performance",
  "Contenido",
  "Tecnología",
  "IA & Data",
];

export const SERVICES_CATALOG: CatalogService[] = [
  {
    id: 1,
    title: "Branding Estratégico",
    category: "Estrategia",
    system: "branding-estrategico",
    brandRelation: "Es el núcleo: define posicionamiento, narrativa y sistema visual.",
  },
  {
    id: 2,
    title: "Performance Marketing",
    category: "Performance",
    system: "performance-marketing",
    brandRelation: "El posicionamiento define qué promesa comunica el anuncio y qué objeción resuelve.",
  },
  {
    id: 3,
    title: "Growth Marketing",
    category: "Estrategia",
    system: "performance-marketing",
    brandRelation: "La narrativa de marca enmarca cada hipótesis y experimento de crecimiento.",
  },
  {
    id: 4,
    title: "SEO & Posicionamiento",
    category: "Performance",
    system: "performance-marketing",
    brandRelation: "La autoridad temática nace de una narrativa de marca diferenciada.",
  },
  {
    id: 5,
    title: "Automatización de Marketing",
    category: "Tecnología",
    system: "automatizacion-crm-ia",
    brandRelation: "El tono de marca da consistencia a los flujos automatizados.",
  },
  {
    id: 6,
    title: "IA Aplicada al Marketing",
    category: "IA & Data",
    system: "automatizacion-crm-ia",
    brandRelation: "Los modelos se entrenan sobre mensajes y ángulos definidos por la marca.",
  },
  {
    id: 7,
    title: "Social Media Management",
    category: "Contenido",
    system: "branding-estrategico",
    brandRelation: "Cada pieza social refuerza la identidad verbal y visual de la marca.",
  },
  {
    id: 8,
    title: "Producción Audiovisual",
    category: "Contenido",
    system: "branding-estrategico",
    brandRelation: "La dirección creativa marca el estilo, tono y estética del contenido.",
  },
  {
    id: 9,
    title: "Funnels de Conversión",
    category: "Performance",
    system: "performance-marketing",
    brandRelation: "La identidad verbal ordena los mensajes en cada etapa del embudo.",
  },
  {
    id: 10,
    title: "Email Marketing",
    category: "Performance",
    system: "automatizacion-crm-ia",
    brandRelation: "El brand voice hace que cada correo se sienta coherente y confiable.",
  },
  {
    id: 11,
    title: "Copywriting Estratégico",
    category: "Estrategia",
    system: "branding-estrategico",
    brandRelation: "El copy parte de los mensajes clave y claims definidos por la marca.",
  },
  {
    id: 12,
    title: "Paid Media Avanzado",
    category: "Performance",
    system: "performance-marketing",
    brandRelation: "La promesa de marca define el ángulo creativo de cada campaña.",
  },
  {
    id: 13,
    title: "Analytics & Data",
    category: "IA & Data",
    system: "analitica-growth-intelligence",
    brandRelation: "Permite medir qué mensajes y ángulos de marca generan más respuesta.",
  },
  {
    id: 14,
    title: "Neuromarketing",
    category: "Estrategia",
    system: "branding-estrategico",
    brandRelation: "Aplica principios de percepción para reforzar el posicionamiento.",
  },
  {
    id: 15,
    title: "Diseño UX/UI Premium",
    category: "Tecnología",
    system: "performance-marketing",
    brandRelation: "El sistema visual se traduce en una experiencia digital coherente.",
  },
  {
    id: 16,
    title: "Desarrollo Web",
    category: "Tecnología",
    system: "performance-marketing",
    brandRelation: "La arquitectura de mensajes define la estructura de cada página.",
  },
  {
    id: 17,
    title: "CRM & Fidelización",
    category: "Tecnología",
    system: "automatizacion-crm-ia",
    brandRelation: "El tono de marca hace que el seguimiento se sienta consistente.",
  },
  {
    id: 18,
    title: "Estrategia Omnicanal",
    category: "Estrategia",
    system: "branding-estrategico",
    brandRelation: "La marca unifica el mensaje en todos los puntos de contacto.",
  },
  {
    id: 19,
    title: "Content Systems",
    category: "Contenido",
    system: "branding-estrategico",
    brandRelation: "Los pilares de contenido derivan de la narrativa de marca.",
  },
  {
    id: 20,
    title: "Influencer Marketing",
    category: "Contenido",
    system: "performance-marketing",
    brandRelation: "Los mensajes de marca guían el brief de cada creador.",
  },
  {
    id: 21,
    title: "Optimización CRO",
    category: "Performance",
    system: "performance-marketing",
    brandRelation: "Una propuesta de valor clara mejora la conversión de cada página.",
  },
  {
    id: 22,
    title: "Automatización de Ventas",
    category: "Tecnología",
    system: "automatizacion-crm-ia",
    brandRelation: "El discurso comercial de marca alimenta los scripts y secuencias.",
  },
  {
    id: 23,
    title: "Community Management",
    category: "Contenido",
    system: "branding-estrategico",
    brandRelation: "La voz de marca define cómo se conversa con la comunidad.",
  },
  {
    id: 24,
    title: "Data Marketing",
    category: "IA & Data",
    system: "analitica-growth-intelligence",
    brandRelation: "Las audiencias se construyen sobre el posicionamiento de la marca.",
  },
];

export const SYSTEM_LABEL: Record<SystemKey, string> = {
  "branding-estrategico": "Brand Authority",
  "performance-marketing": "Acquisition Engine",
  "automatizacion-crm-ia": "Revenue Automation",
  "analitica-growth-intelligence": "Growth Intelligence",
};
