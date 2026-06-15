/**
 * TEAM DATA — Source of truth for the /equipo page.
 *
 * PLACEHOLDERS: Names, photos, and LinkedIn URLs are templates.
 * REPLACE with real data before launch. Search "REPLACE:" comments.
 *
 * Photo strategy:
 *   - Add real photos to /public/team/{slug}.jpg (square, 600x600px min)
 *   - Set `photo` field to "/team/{slug}.jpg"
 *   - If photo is undefined, the page renders an elegant gradient avatar
 *     with the person's initials — production-safe fallback.
 */

export interface TeamMember {
  /** URL-safe identifier */
  slug: string;
  /** Full name — REPLACE with real */
  name: string;
  /** Role / title */
  role: string;
  /** 1-2 sentence professional philosophy (their voice) */
  philosophy: string;
  /** Single credential / proof line */
  credential: string;
  /** Years in industry */
  years: number;
  /** LinkedIn URL — REPLACE with real */
  linkedin?: string;
  /** Path to photo in /public/team/ — leave undefined for gradient fallback */
  photo?: string;
  /** Tailwind gradient for fallback avatar */
  fallbackGradient: string;
  /** Department classification */
  department: "Leadership" | "Growth" | "Brand" | "Tech" | "Data" | "Operations";
}

// ============================================================
// FOUNDER
// ============================================================

export const FOUNDER: TeamMember = {
  slug: "juan-lancheros",
  // REPLACE: Real founder name
  name: "Juan Lancheros",
  role: "Fundador & CEO",
  philosophy:
    "Construimos Aureon porque las marcas con ambición real necesitan un partner que opere con ellas, no un proveedor que les facture por hora.",
  credential: "+10 años escalando marcas en LATAM, EU y EE.UU.",
  years: 10,
  linkedin: "https://linkedin.com/in/aureongrowth", // REPLACE with real URL
  photo: undefined, // REPLACE: add "/team/juan-lancheros.jpg"
  fallbackGradient: "from-violet-600 via-plum to-violet-900",
  department: "Leadership",
};

// ============================================================
// LEADERSHIP TEAM
// ============================================================

export const TEAM: TeamMember[] = [
  {
    slug: "head-of-growth",
    // REPLACE: Real name
    name: "Camila Restrepo",
    role: "Head of Growth",
    philosophy:
      "El growth no es magia — es un sistema de hipótesis testeadas con disciplina y reportadas con honestidad.",
    credential: "Diseñó pipelines de crecimiento para +40 SaaS B2B",
    years: 8,
    linkedin: "https://linkedin.com/in/aureongrowth",
    photo: undefined,
    fallbackGradient: "from-violet-700 to-plum",
    department: "Growth",
  },
  {
    slug: "chief-strategy-officer",
    // REPLACE: Real name
    name: "Andrés Morales",
    role: "Chief Strategy Officer",
    philosophy:
      "Antes de cualquier táctica, el posicionamiento. Sin claridad estratégica, ninguna ejecución salva la marca.",
    credential: "Ex-Director de Estrategia en agencias top 10 LATAM",
    years: 14,
    linkedin: "https://linkedin.com/in/aureongrowth",
    photo: undefined,
    fallbackGradient: "from-plum to-violet-800",
    department: "Leadership",
  },
  {
    slug: "head-of-brand",
    // REPLACE: Real name
    name: "Mariana Vélez",
    role: "Head of Brand",
    philosophy:
      "Una marca premium no se ve, se siente. Cada touchpoint debe transmitir el mismo nivel de cuidado.",
    credential: "Brand lead para marcas con valuación >$500M USD",
    years: 11,
    linkedin: "https://linkedin.com/in/aureongrowth",
    photo: undefined,
    fallbackGradient: "from-violet-600 to-plum",
    department: "Brand",
  },
  {
    slug: "head-of-data",
    // REPLACE: Real name
    name: "Daniel Ortega",
    role: "Head of Data & AI",
    philosophy:
      "Los datos sin contexto son ruido. Lo que importa es el insight accionable que mueve la métrica del negocio.",
    credential: "Implementó +25 stacks de data + IA aplicada al marketing",
    years: 9,
    linkedin: "https://linkedin.com/in/aureongrowth",
    photo: undefined,
    fallbackGradient: "from-violet-700 to-plum",
    department: "Data",
  },
  {
    slug: "head-of-tech",
    // REPLACE: Real name
    name: "Felipe Cárdenas",
    role: "Head of Tech",
    philosophy:
      "Un sitio rápido y bien construido no es bonus — es la base sobre la que cualquier estrategia digital funciona.",
    credential: "Lideró el desarrollo de +60 plataformas web enterprise",
    years: 12,
    linkedin: "https://linkedin.com/in/aureongrowth",
    photo: undefined,
    fallbackGradient: "from-plum to-violet-800",
    department: "Tech",
  },
  {
    slug: "head-of-creative",
    // REPLACE: Real name
    name: "Valentina Suárez",
    role: "Head of Creative",
    philosophy:
      "El gran creativo no es el más original, es el que conecta una idea con la métrica del negocio sin perder alma.",
    credential: "Creative direction para campañas premiadas en LATAM",
    years: 10,
    linkedin: "https://linkedin.com/in/aureongrowth",
    photo: undefined,
    fallbackGradient: "from-violet-600 to-plum",
    department: "Brand",
  },
  {
    slug: "head-of-operations",
    // REPLACE: Real name
    name: "Sebastián Rojas",
    role: "Head of Operations",
    philosophy:
      "La excelencia operativa es lo que separa una buena agencia de un partner real. El proceso debe ser invisible para el cliente.",
    credential: "Operations lead en agencias con +150 cuentas activas",
    years: 13,
    linkedin: "https://linkedin.com/in/aureongrowth",
    photo: undefined,
    fallbackGradient: "from-violet-700 to-plum",
    department: "Operations",
  },
];

// ============================================================
// DEPARTMENTS — for summary stats
// ============================================================

export const DEPARTMENTS = [
  { name: "Growth & Performance", count: 8, focus: "ABM · Paid · CRO · Automation" },
  { name: "Brand & Creative", count: 7, focus: "Identity · Voice · Production" },
  { name: "Tech & Engineering", count: 6, focus: "Next.js · CMS · Integraciones" },
  { name: "Data & AI", count: 5, focus: "Analytics · ML · IA aplicada" },
  { name: "Strategy & Operations", count: 4, focus: "Liderazgo · CSM · Procesos" },
];

export const TEAM_STATS = {
  totalSize: 30,
  averageYears: 9,
  countriesActive: 12,
  languages: 4,
};

// ============================================================
// HELPERS
// ============================================================

export function getMemberInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
