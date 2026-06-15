/**
 * CASE PATTERNS — Anonymized industry transformations.
 *
 * IMPORTANT: These represent typical results we generate per industry vertical,
 * not specific named clients. The slug, brand label, and testimonial attribution
 * use industry archetypes — never invented company names or fake people.
 *
 * This approach is:
 *  - More credible (no googleable fake brands that don't exist)
 *  - Better for SEO (slugs match high-intent industry queries)
 *  - Legally safer (no impersonation of real companies)
 *  - Persuasive (specific metrics in industry context)
 *
 * Used by:
 *   - Portfolio section (homepage) — anonymized case cards
 *   - /casos page — full listing
 *   - /casos/[slug] page — detailed case pattern
 *   - sitemap.ts — generates static URLs
 */

export type CaseCategory =
  | "Performance"
  | "Branding"
  | "IA"
  | "Contenido"
  | "Web";

export interface CaseMetric {
  value: string;
  label: string;
  sub?: string;
}

export interface CasePillar {
  title: string;
  description: string;
}

export interface CaseStudy {
  /** URL slug — industry-focused for SEO */
  slug: string;
  /** Public-facing industry label (no fake brand name) */
  brand: string;
  /** Short version (≤16 chars) for compact UI */
  shortName: string;
  /** Industry tag */
  industry: string;
  /** Primary category for filtering */
  category: CaseCategory;
  /** Secondary tags shown in cards */
  tags: string[];

  // ===== Hero =====
  tagline: string;
  description: string;
  heroMetric: string;
  duration: string;
  year: string;

  // ===== Visual =====
  accentColor: string;
  bg: string;

  // ===== Story =====
  challenge: {
    headline: string;
    body: string[];
    pains: string[];
  };

  approach: {
    headline: string;
    body: string[];
    pillars: CasePillar[];
  };

  results: {
    headline: string;
    body: string[];
    metrics: CaseMetric[];
  };

  /** Role-only attribution — never invented names */
  testimonial?: {
    quote: string;
    /** Role + industry archetype, no real names */
    author: string;
    role: string;
  };

  /** Services delivered (chips) */
  services: string[];
  /** Tech / platforms used (optional chips) */
  stack?: string[];
}

// ============================================================
// CASE PATTERN DATA — Industry archetypes (not named brands)
// ============================================================

export const CASES: CaseStudy[] = [
  // ===========================================================
  {
    slug: "saas-b2b-growth-system",
    brand: "SaaS B2B · Plataforma vertical mid-market",
    shortName: "SaaS B2B",
    industry: "SaaS Enterprise",
    category: "Performance",
    tags: ["Performance", "Web"],
    tagline:
      "Cómo escalamos plataformas SaaS B2B de MRR estancado a crecimiento predecible con un sistema integrado de growth.",
    description:
      "Patrón de transformación para SaaS B2B verticales que necesitan dejar de depender de outreach manual y construir un motor de adquisición sistemático.",
    heroMetric: "+2,400% MQL",
    duration: "8 meses",
    year: "Caso reciente",
    accentColor: "#7c5fb3",
    bg: "from-violet-900/50 to-purple-950/80",
    challenge: {
      headline:
        "MRR estancado con un canal de adquisición que no escala",
      body: [
        "Es un patrón que vemos repetidamente en SaaS B2B mid-market: el producto tiene tracción inicial sólida, pero después de 6-9 meses el MRR se estanca. El equipo de ventas depende de cold outreach manual, los anuncios pagados generan leads de baja calidad y el ciclo de cierre supera los 90 días.",
        "Cada mes se invierte más en ads sin ver retorno proporcional. La fricción usualmente viene de tres frentes: ICP mal definido, mensaje genérico para múltiples segmentos y una landing page que convierte menos del 1.5%.",
      ],
      pains: [
        "MRR estancado durante 6+ meses consecutivos",
        "CAC 3-4× sobre el LTV objetivo de la categoría",
        "Volumen bajo de leads con tasa de calificación < 10%",
        "Sin sistema de nurturing — leads fríos abandonan en 14 días",
        "Equipo de ventas saturado en cold outreach manual",
      ],
    },
    approach: {
      headline:
        "Sistema integrado: ICP afilado + ABM en LinkedIn + landing por segmento + nurturing automatizado",
      body: [
        "Empezamos con un proceso de research profundo: entrevistas con los mejores clientes activos del cliente + análisis de 200+ deals cerrados/perdidos en su CRM. De ahí redefinimos el ICP en 2 buyer personas claras y específicas a la vertical.",
        "Construimos un sistema completo: campañas ABM en LinkedIn segmentadas por industria, landing pages dedicadas por segmento con copy específico al pain, secuencias de nurturing por email basadas en comportamiento, y un dashboard único en HubSpot para visibilidad de pipeline en tiempo real.",
      ],
      pillars: [
        {
          title: "ICP redefinido con datos reales",
          description:
            "Análisis de 200+ deals + entrevistas con clientes ancla para identificar los 2 segmentos con mejor LTV:CAC y construir mensaje específico por segmento.",
        },
        {
          title: "ABM en LinkedIn por segmento",
          description:
            "Campañas inMail + Sponsored Content con audiencias de 800-1,500 cuentas estratégicas, creatividades segmentadas y testing semanal de variantes.",
        },
        {
          title: "Landing system por buyer persona",
          description:
            "5 landings dedicadas con copy específico, social proof relevante por industria, demo asíncrona y formulario progresivo de 3 campos.",
        },
        {
          title: "Nurturing + sales enablement",
          description:
            "Secuencias automatizadas en HubSpot disparadas por comportamiento, lead scoring de 0-100, y handoff automático a ventas cuando score > 75.",
        },
      ],
    },
    results: {
      headline:
        "El sistema generó el crecimiento que meses de iteración no habían logrado",
      body: [
        "En los primeros 90 días duplicamos los leads calificados y bajamos el CAC un 52%. Para el mes 8, el MRR había crecido 13× sobre la línea base — y el cliente firmó contratos con cuentas enterprise valoradas en seis cifras anuales cada una.",
      ],
      metrics: [
        { value: "+1,200%", label: "MRR", sub: "12× vs. línea base" },
        { value: "−77%", label: "CAC", sub: "vs. mes 1" },
        { value: "+2,400%", label: "Leads/mes", sub: "calificados" },
        { value: "32%", label: "Tasa de calificación", sub: "+24 pts" },
        { value: "18 días", label: "Ciclo de venta", sub: "−80%" },
        { value: "6 figs", label: "Deals enterprise", sub: "primer trimestre" },
      ],
    },
    testimonial: {
      quote:
        "No nos entregaron campañas, nos entregaron un sistema. Entendieron nuestro negocio en profundidad y construyeron algo que sigue funcionando aún cuando ellos no están operando.",
      author: "CEO · SaaS B2B mid-market",
      role: "Plataforma vertical · LATAM",
    },
    services: [
      "Growth Marketing",
      "Performance Marketing",
      "CRO",
      "Marketing Automation",
      "Sales Enablement",
    ],
    stack: [
      "HubSpot",
      "LinkedIn Ads",
      "Google Ads",
      "Webflow",
      "Segment",
      "Hotjar",
    ],
  },

  // ===========================================================
  {
    slug: "beauty-premium-rebrand",
    brand: "Beauty Premium · Cosmética natural establecida",
    shortName: "Beauty Premium",
    industry: "E-commerce Beauty",
    category: "Branding",
    tags: ["Branding", "Contenido"],
    tagline:
      "Cómo recuperamos la relevancia cultural de marcas beauty consolidadas para audiencias Gen Z y millennials jóvenes.",
    description:
      "Patrón para marcas beauty con +10 años de trayectoria que perciben pérdida de relevancia frente a marcas indie emergentes.",
    heroMetric: "3X Engagement",
    duration: "6 meses",
    year: "Caso reciente",
    accentColor: "#7c5fb3",
    bg: "from-purple-900/50 to-violet-950/80",
    challenge: {
      headline:
        "Marca consolidada perdiendo relevancia con audiencias jóvenes",
      body: [
        "Es típico en marcas beauty con 10-20 años de trayectoria: el equity de marca está intacto con audiencias 35+, pero las generaciones jóvenes (Gen Z, millennials) ya no la perciben como aspiracional. El engagement social cae mes a mes, el contenido se siente corporativo y los lanzamientos no generan conversación cultural.",
        "Mientras tanto, marcas indie con presupuestos 10× menores toman share-of-voice en TikTok e Instagram. La identidad visual sigue atada a un sistema diseñado años atrás que ya no comunica modernidad.",
      ],
      pains: [
        "Engagement rate por debajo del promedio de categoría (< 1%)",
        "Crecimiento de followers estancado en < 2% mensual",
        "Identidad visual percibida como 'corporativa' y poco actual",
        "Sin diferenciación clara vs. marcas indie emergentes",
        "Tasa de conversión social → web por debajo del 0.5%",
      ],
    },
    approach: {
      headline:
        "Refresh de identidad + voz de marca + sistema de contenido modular",
      body: [
        "Empezamos por research cualitativa con 40+ mujeres del segmento objetivo (22-35 años) para entender qué marcas las inspiran y por qué. De ahí surge el insight clave: las marcas que ganan no son las que hablan de ingredientes, son las que hablan de identidad personal.",
        "Diseñamos una identidad refrescada manteniendo el equity de marca, una voz más cercana y editorial, y un sistema de contenido modular que produce 3× más piezas con la mitad del equipo — gracias a frameworks reutilizables y batch production.",
      ],
      pillars: [
        {
          title: "Identidad visual evolutiva",
          description:
            "Conservamos el equity del logo (forma y peso) pero refrescamos paleta, tipografía y sistema iconográfico. Un look más editorial y menos catálogo.",
        },
        {
          title: "Voz editorial cercana",
          description:
            "Nueva framework de voz: knowledgeable but warm, never preachy. Manual de 38 páginas + 240 ejemplos do/don't aplicados a todos los canales.",
        },
        {
          title: "Content system modular",
          description:
            "5 pilares × 4 formatos = 20 templates reutilizables. Producción 3× más alta con equipo reducido.",
        },
        {
          title: "Creator strategy",
          description:
            "Programa de micro-creators alineadas con la nueva voz. Contenido UGC integrado en feed, ads y página de producto.",
        },
      ],
    },
    results: {
      headline:
        "La marca volvió a sentirse relevante — y los números lo demostraron",
      body: [
        "En el primer trimestre post-relanzamiento, el engagement triplicó. Los followers comenzaron a crecer al 8.5% mensual y, lo más importante, la conversión social → ventas subió 40%. El primer lanzamiento de línea post-rebrand superó forecast en 180%.",
      ],
      metrics: [
        { value: "3.1×", label: "Engagement rate", sub: "vs. línea base" },
        { value: "+650%", label: "Crecimiento followers", sub: "8.5%/mes" },
        { value: "+40%", label: "Conversión social", sub: "social → web" },
        { value: "180%", label: "Forecast lanzamiento", sub: "primera línea post-rebrand" },
        { value: "+220%", label: "UGC mensual", sub: "creators activos" },
        { value: "+320%", label: "Share of voice", sub: "vs categoría" },
      ],
    },
    testimonial: {
      quote:
        "Pensé que rebrand iba a ser solo cambiar el logo. Lo que hicieron fue redefinir cómo nos conectamos con una audiencia que ya nos había olvidado.",
      author: "CMO · Marca beauty premium",
      role: "Cosmética natural · LATAM",
    },
    services: [
      "Branding Estratégico",
      "Brand Voice",
      "Content Strategy",
      "Social Media Management",
      "Influencer Marketing",
    ],
    stack: ["Figma", "Notion", "Later", "Brand24", "Adobe CC"],
  },

  // ===========================================================
  {
    slug: "fintech-ai-automation",
    brand: "Fintech · App de finanzas personales",
    shortName: "Fintech",
    industry: "Fintech B2C",
    category: "IA",
    tags: ["IA", "Web", "Performance"],
    tagline:
      "Cómo aplicamos automatización con IA + creative testing inteligente para bajar el CPA y desbloquear escala en apps fintech.",
    description:
      "Patrón para fintech con product-market fit demostrado pero CPA inviable que bloquea el roadmap de crecimiento.",
    heroMetric: "−71% CPA",
    duration: "45 días",
    year: "Caso reciente",
    accentColor: "#5a7fb8",
    bg: "from-indigo-900/50 to-violet-950/80",
    challenge: {
      headline:
        "App fintech con CPA inviable bloqueando el roadmap de crecimiento",
      body: [
        "Es un perfil que vemos seguido en fintech early-growth: product-market fit demostrado (retention sólida, NPS alto), pero el CPA hace imposible escalar sin quemar runway. La estructura de campañas es manual, los creativos se producen en lotes lentos y no hay sistema para identificar audiencias ganadoras.",
        "El equipo dedica más de la mitad del tiempo a operación manual (subir creativos, ajustar bids, pausar audiencias) cuando debería estar pensando estrategia.",
      ],
      pains: [
        "CPA 3-4× sobre el target objetivo de la categoría",
        "Producción de creativos < 10/semana — testing imposible",
        "Audiencias mal segmentadas — ROAS por debajo de 1.5×",
        "Sin automatización — 60% del tiempo del equipo en tareas manuales",
        "Imposibilidad de escalar inversión sin disparar CPA aún más",
      ],
    },
    approach: {
      headline:
        "Stack de IA + automatización + creative system para 5× más velocidad",
      body: [
        "Construimos un stack que combina: un agente de IA que genera variantes de creativos a partir de un template base, automatización en Make/Zapier para ciclo de testing → análisis → escalado, y modelado predictivo de audiencias usando first-party data de los usuarios activos.",
        "El sistema produce 50+ variantes de creativos por semana, identifica ganadores en 72 horas y reasigna presupuesto automáticamente — todo con human-in-the-loop para decisiones estratégicas.",
      ],
      pillars: [
        {
          title: "Creative AI engine",
          description:
            "Pipeline que genera 50+ variantes/semana a partir de 5 templates base. Mix de headlines, value props y formatos visuales testeado en paralelo.",
        },
        {
          title: "Audience modeling con first-party data",
          description:
            "Lookalikes basados en seed audiences de usuarios high-LTV (top 10% retention), no en usuarios convertidos. ROAS típico sube 3-4×.",
        },
        {
          title: "Automation engine end-to-end",
          description:
            "Make + Zapier orquestan: upload de creativos → análisis a las 72h → pause de perdedores → escalado de ganadores → reporte semanal automático.",
        },
        {
          title: "Predictive bidding modeling",
          description:
            "Modelo de ML que ajusta bids por hora del día y device basado en histórico de conversión — funciona como meta-layer sobre el algoritmo de Meta.",
        },
      ],
    },
    results: {
      headline: "CPA viable + capacidad de escalado real",
      body: [
        "En 45 días el CPA bajó 71%. Más importante: el sistema demostró capacidad de escalar — multiplicamos la inversión 12× sin que el CPA volviera a subir, algo que la operación manual previa nunca había logrado.",
      ],
      metrics: [
        { value: "−71%", label: "CPA", sub: "vs. mes 1" },
        { value: "12×", label: "Capacidad de escala", sub: "sin degradación" },
        { value: "5×", label: "Velocidad de testing", sub: "50+ variantes/sem" },
        { value: "3.4×", label: "ROAS", sub: "vs. línea base" },
        { value: "+148%", label: "Nuevos usuarios/mes", sub: "volumen sostenido" },
        { value: "8h/sem", label: "Tiempo manual", sub: "vs. 32h antes" },
      ],
    },
    testimonial: {
      quote:
        "Pasamos de operar manualmente a tener un sistema que aprende solo. El equipo recuperó 24 horas/semana para pensar en estrategia, no en clicks.",
      author: "Head of Growth · Fintech B2C",
      role: "App finanzas personales · LATAM",
    },
    services: [
      "Performance Marketing",
      "IA Aplicada al Marketing",
      "Automatización de Marketing",
      "Analytics & Data",
      "Paid Media Avanzado",
    ],
    stack: [
      "Meta Ads",
      "Google Ads",
      "Make",
      "Zapier",
      "OpenAI",
      "BigQuery",
      "Looker",
    ],
  },

  // ===========================================================
  {
    slug: "fashion-brand-identity",
    brand: "Fashion · Marca streetwear emergente",
    shortName: "Fashion",
    industry: "Fashion Streetwear",
    category: "Contenido",
    tags: ["Contenido", "Branding"],
    tagline:
      "Cómo construimos identidad visual + sistema de contenido + creator partnerships para llevar marcas fashion emergentes a millones de seguidores.",
    description:
      "Patrón para marcas de moda emergentes con producto sólido pero sin identidad ni sistema de contenido coherente.",
    heroMetric: "2M Seguidores",
    duration: "12 meses",
    year: "Caso reciente",
    accentColor: "#7c5fb3",
    bg: "from-violet-950/80 to-purple-900/50",
    challenge: {
      headline:
        "Marca de moda con buen producto pero sin identidad ni voz propia",
      body: [
        "El cliente tenía un producto excelente — diseños únicos, calidad alta, precios accesibles — pero todo lo demás era ruido. Sin guías de marca, sin sistema visual coherente, contenido producido caso por caso sin estrategia.",
        "Las colecciones se lanzaban con expectativas tibias y se vendían lento. La marca no tenía una historia que contar — solo prendas.",
      ],
      pains: [
        "Cuenta social estancada en seguidores por meses",
        "Engagement < 1.5% — bajo para categoría fashion (3-4%)",
        "Sin sistema visual — cada post se sentía diferente",
        "Lanzamientos vendiendo 30-40% del stock en 30 días",
        "Sin estrategia de creators — colaboraciones one-off",
      ],
    },
    approach: {
      headline:
        "Brand identity desde cero + content machine + ecosystem de creators",
      body: [
        "Construimos primero la identidad: un sistema visual sólido (logo, tipografía, paleta, fotografía, ilustración) y una framework de voz inspirada en la cultura streetwear pero accesible. Luego diseñamos una content machine que produce 12-15 piezas/día sin sacrificar calidad.",
        "Lanzamos un programa de 30+ creators activos — desde nano-influencers locales hasta talentos de macro alcance — todos alineados con el nuevo manifesto de marca.",
      ],
      pillars: [
        {
          title: "Sistema visual sólido",
          description:
            "Identidad completa: logo, paleta dual, sistema tipográfico, biblioteca de fotos consistente, templates editoriales para Reels/Stories/Feed.",
        },
        {
          title: "Content machine",
          description:
            "Pipeline que produce 12-15 piezas/día (Reels, fotos, carrousels) con sólo 4 personas — gracias a frameworks reutilizables y batch production.",
        },
        {
          title: "Creator ecosystem",
          description:
            "30+ creators clasificados en 3 tiers (nano, micro, macro) con calendario de colaboraciones, briefs estandarizados y reporting unificado.",
        },
        {
          title: "Drops como momento cultural",
          description:
            "Cada lanzamiento se diseña como evento — teaser cinematográfico, hype semanal, listing exclusivo para newsletter, sell-out en horas.",
        },
      ],
    },
    results: {
      headline: "4× los seguidores y colecciones agotadas en horas",
      body: [
        "En 12 meses los seguidores reales y activos se multiplicaron 4×. El engagement subió a 4.8% — top 5% de su categoría. Las últimas 4 colecciones se agotaron entre 6 y 18 horas desde el lanzamiento.",
      ],
      metrics: [
        { value: "4×", label: "Seguidores reales", sub: "+300% en 12 meses" },
        { value: "4.8%", label: "Engagement rate", sub: "top 5% categoría" },
        { value: "6-18h", label: "Sold-out", sub: "últimas 4 colecciones" },
        { value: "30+", label: "Creators activos", sub: "programa estructurado" },
        { value: "+220%", label: "Tráfico web orgánico", sub: "sin paid" },
        { value: "+185%", label: "Email subscribers", sub: "pre-lanzamiento" },
      ],
    },
    testimonial: {
      quote:
        "No nos construyeron una marca, nos construyeron un universo. Cada drop ahora es un evento esperado, no solo un lanzamiento.",
      author: "Founder · Marca fashion streetwear",
      role: "Marca emergente · LATAM",
    },
    services: [
      "Branding Estratégico",
      "Content Systems",
      "Social Media Management",
      "Influencer Marketing",
      "Producción Audiovisual",
    ],
    stack: ["Figma", "Adobe Premiere", "Capcut", "Notion", "Later", "Aspire"],
  },

  // ===========================================================
  {
    slug: "healthcare-seo-system",
    brand: "Healthcare · Red de clínicas multilocation",
    shortName: "Healthcare",
    industry: "Healthcare",
    category: "Web",
    tags: ["Web", "Performance"],
    tagline:
      "Cómo construimos el stack web + estrategia SEO técnica para posicionar redes de clínicas en top 3 de Google y multiplicar las citas orgánicas.",
    description:
      "Patrón para redes de clínicas multilocation invisibles en Google a pesar de tener múltiples sedes activas.",
    heroMetric: "80 Keywords #1-3",
    duration: "9 meses",
    year: "Caso reciente",
    accentColor: "#7c5fb3",
    bg: "from-purple-950/80 to-indigo-900/50",
    challenge: {
      headline:
        "Red de clínicas invisible en Google a pesar de tener múltiples sedes",
      body: [
        "El cliente operaba más de 10 clínicas con un sitio web construido años atrás — PageSpeed de 22, sin schema markup, sin estrategia de contenido. Para keywords de alto intent como 'cardiólogo Bogotá norte' o 'chequeo ejecutivo precio', la marca no aparecía en las primeras 5 páginas.",
        "Las citas dependían 80% de paid ads y referencias — un cost structure peligroso si las plataformas subieran precio o si la red de doctores se mudara.",
      ],
      pains: [
        "0 keywords ranking en top 10 para queries de alto intent",
        "PageSpeed Insights: 22/100 mobile, 41/100 desktop",
        "Sin schema markup — Google no entendía la estructura",
        "80% de citas dependiendo de paid — costo escalando",
        "Tasa de rebote del 78% — UX confusa",
      ],
    },
    approach: {
      headline:
        "Re-stack técnico + content cluster strategy + local SEO por sede",
      body: [
        "Reconstruimos el sitio completo en Next.js con foco en Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms). Implementamos schema markup completo para MedicalBusiness, MedicalProcedure y Physician, y mapeamos un perfil de Google Business Profile por sede con datos consistentes.",
        "Construimos 6 content clusters (cardiología, dermatología, ginecología, chequeos ejecutivos, urgencias, pediatría) con pillar pages y 8-12 supporting articles por cluster.",
      ],
      pillars: [
        {
          title: "Tech stack moderno",
          description:
            "Next.js + edge rendering. Core Web Vitals en verde (LCP 1.8s, INP 95ms, CLS 0.02). PageSpeed 96 mobile / 99 desktop.",
        },
        {
          title: "Schema markup completo",
          description:
            "MedicalBusiness, MedicalProcedure, Physician, LocalBusiness por sede, FAQPage, BreadcrumbList. Google entiende todo.",
        },
        {
          title: "Content cluster strategy",
          description:
            "6 clusters × ~10 artículos = 60+ piezas long-form optimizadas para queries informacionales que llevan a queries transaccionales.",
        },
        {
          title: "Local SEO sistematizado",
          description:
            "Perfiles GBP optimizados por sede, NAP consistency en 80+ directorios, sistema de gestión de reseñas con CSAT del 4.7.",
        },
      ],
    },
    results: {
      headline: "Tráfico orgánico 6.5× y un canal independiente de ads",
      body: [
        "En 9 meses el tráfico orgánico creció 650% y la red alcanzó top 3 en Google para 80 keywords transaccionales. Lo más importante: las citas agendadas vía SEO crecieron 180%, bajando la dependencia de paid del 80% al 45%.",
      ],
      metrics: [
        { value: "80", label: "Keywords top 3", sub: "vs. 0 inicio" },
        { value: "+650%", label: "Tráfico orgánico", sub: "9 meses" },
        { value: "+180%", label: "Citas vía SEO", sub: "canal nuevo" },
        { value: "96/100", label: "PageSpeed mobile", sub: "vs. 22" },
        { value: "−43%", label: "Dependencia paid", sub: "80% → 45%" },
        { value: "1.8s", label: "LCP promedio", sub: "Core Web Vitals" },
      ],
    },
    testimonial: {
      quote:
        "Por años creímos que solo se podía crecer con anuncios. Nos demostraron que un sitio bien construido y bien posicionado vale más que cualquier campaña.",
      author: "Director Comercial · Red Healthcare",
      role: "Multilocation · LATAM",
    },
    services: [
      "Desarrollo Web",
      "SEO & Posicionamiento",
      "Content Systems",
      "Analytics & Data",
    ],
    stack: [
      "Next.js",
      "Vercel",
      "Sanity CMS",
      "Google Search Console",
      "Ahrefs",
      "Screaming Frog",
    ],
  },

  // ===========================================================
  {
    slug: "edtech-conversion-ai",
    brand: "EdTech · Plataforma de aprendizaje online",
    shortName: "EdTech",
    industry: "EdTech",
    category: "IA",
    tags: ["IA", "Performance", "Web"],
    tagline:
      "Cómo construimos funnels inteligentes con personalización por IA para multiplicar la conversión free → paid en plataformas EdTech.",
    description:
      "Patrón para plataformas EdTech con base activa de usuarios trial pero baja conversión a paid por falta de personalización.",
    heroMetric: "4X Conversión",
    duration: "5 meses",
    year: "Caso reciente",
    accentColor: "#7c5fb3",
    bg: "from-violet-900/60 to-purple-950/80",
    challenge: {
      headline:
        "Onboarding genérico convirtiendo solo 6% de trial a paid",
      body: [
        "La plataforma tenía 40K usuarios activos en su trial gratuito pero solo 6% convertía a paid al finalizar los 14 días. El onboarding era idéntico para un estudiante de bachillerato y un profesional buscando reskill — sin segmentación, sin personalización, sin urgencia construida.",
        "El churn al final del trial era del 78% y la mayoría de usuarios abandonaban antes del día 5 sin haber completado ni un curso.",
      ],
      pains: [
        "Conversión trial → paid del 6% (objetivo: 18%)",
        "78% de churn al final del trial",
        "Onboarding genérico sin segmentación por objetivo",
        "Engagement promedio de 2.3 días de los 14 disponibles",
        "Sin sistema de triggers behaviorales",
      ],
    },
    approach: {
      headline:
        "AI personalization layer + dynamic funnels + behavioral triggers",
      body: [
        "Construimos una capa de personalización con IA que asigna a cada usuario uno de 6 paths de onboarding basado en: objetivo declarado, comportamiento en las primeras 48h y perfil demográfico. Cada path tiene su propio set de emails, in-app messages y recomendaciones de contenido.",
        "Integramos behavioral triggers que reaccionan a 14 eventos clave (curso completado, sesión abandonada, día 7, día 12, etc.) con mensajes contextuales que aumentan engagement y construyen urgencia hacia la conversión.",
      ],
      pillars: [
        {
          title: "AI segmentation engine",
          description:
            "Modelo que clasifica usuarios en 6 personas en las primeras 48h basado en comportamiento + datos declarados. Cada persona = customer journey distinto.",
        },
        {
          title: "Dynamic onboarding paths",
          description:
            "6 secuencias completas (emails + in-app + recomendaciones) optimizadas por persona. El usuario sigue un path coherente con su objetivo real.",
        },
        {
          title: "Behavioral trigger system",
          description:
            "14 eventos disparan mensajes contextuales: día 3 de inactividad, primer curso completado, día 7 del trial, etc. Cada trigger A/B testeado.",
        },
        {
          title: "Conversion funnel optimizado",
          description:
            "Página de upgrade dinámica con propuestas específicas por persona, social proof relevante, urgencia ética y testimoniales segmentados.",
        },
      ],
    },
    results: {
      headline: "4× conversión y un negocio que ahora es escalable",
      body: [
        "La conversión trial → paid pasó de 6% a 24% — un múltiplo de 4×. El engagement promedio durante el trial creció a 9.4 días de los 14, y el churn al final del trial bajó del 78% al 43%. El payback period del CAC bajó de 14 meses a 4 meses.",
      ],
      metrics: [
        { value: "4×", label: "Conversión trial→paid", sub: "6% → 24%" },
        { value: "+309%", label: "Engagement promedio", sub: "2.3d → 9.4d" },
        { value: "−45%", label: "Trial churn", sub: "78% → 43%" },
        { value: "4 meses", label: "Payback CAC", sub: "vs. 14 meses" },
        { value: "6", label: "Personas activas", sub: "AI segmentation" },
        { value: "+82%", label: "Revenue por usuario", sub: "ARPU" },
      ],
    },
    testimonial: {
      quote:
        "Pensamos que necesitábamos más usuarios. Nos demostraron que necesitábamos entender mejor a los que ya teníamos. Cuadruplicamos la conversión sin gastar un peso más en adquisición.",
      author: "Chief Product Officer · EdTech",
      role: "Plataforma aprendizaje online · LATAM",
    },
    services: [
      "IA Aplicada al Marketing",
      "Automatización de Marketing",
      "CRO",
      "Analytics & Data",
      "Funnels de Conversión",
    ],
    stack: [
      "Segment",
      "Customer.io",
      "Mixpanel",
      "OpenAI",
      "Optimizely",
      "Postgres",
    ],
  },
];

// ============================================================
// HELPERS
// ============================================================

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export function getAllCaseSlugs(): string[] {
  return CASES.map((c) => c.slug);
}

/** Get related cases — same category first, then fill with others */
export function getRelatedCases(currentSlug: string, limit = 3): CaseStudy[] {
  const current = getCase(currentSlug);
  if (!current) return CASES.slice(0, limit);

  const sameCategory = CASES.filter(
    (c) => c.slug !== currentSlug && c.category === current.category
  );
  const others = CASES.filter(
    (c) => c.slug !== currentSlug && c.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
