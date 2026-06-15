/**
 * Commercial plans — Growth Starter / Partner / Empire.
 * Prices are the agency's own commercial offer (set by the business).
 */

export interface Plan {
  num: string;
  name: string;
  tagline: string;
  price: string;
  priceSub: string;
  idealFor: string;
  includes: string[];
  result: string;
  /** how Brand Authority maps to this plan */
  brandRole: string;
  cta: string;
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    num: "01",
    name: "Growth Starter",
    tagline: "Para marcas que necesitan claridad antes de escalar",
    price: "Desde $3.500",
    priceSub: "USD / mes",
    idealFor: "Startups y empresas en validación · etapa temprana",
    includes: [
      "2–4 disciplinas activas (branding, contenido o paid)",
      "Estrategia + ejecución dedicada",
      "Reportes mensuales y revisiones quincenales",
      "Acceso a equipo senior",
      "Sin permanencia obligatoria",
    ],
    result: "Una base estratégica clara para empezar a crecer con orden.",
    brandRole:
      "Posicionamiento, identidad verbal y sistema visual inicial antes de escalar campañas.",
    cta: "Empezar evaluación",
  },
  {
    num: "02",
    name: "Growth Partner",
    tagline: "Sistema completo con equipo dedicado",
    price: "Desde $8.500",
    priceSub: "USD / mes",
    idealFor: "Empresas en escala que integran varios frentes",
    includes: [
      "5–7 disciplinas integradas en un sistema",
      "CSM + estratega + especialistas senior",
      "Onboarding 30 días + plan a 12 meses",
      "Reportes semanales y canal directo",
      "Branding, performance, funnels y automatización",
      "Dashboards de seguimiento conectados",
    ],
    result: "Marca, adquisición y automatización operando como un solo sistema.",
    brandRole:
      "Integra branding con performance, contenido, funnels y automatización en un sistema completo.",
    cta: "Construir mi sistema",
    featured: true,
  },
  {
    num: "03",
    name: "Growth Empire",
    tagline: "Arquitectura de marca y growth a gran escala",
    price: "Personalizado",
    priceSub: "Alcance a medida",
    idealFor: "Empresas consolidadas · expansión multimercado",
    includes: [
      "Stack completo de disciplinas (24+ especialidades)",
      "Equipo ampliado y trabajo por objetivos",
      "Roadmap multimercado y revisiones ejecutivas",
      "Acceso directo a la dirección de la firma",
      "IA, automatización y tooling a medida",
    ],
    result: "Una arquitectura de crecimiento avanzada para liderar la categoría.",
    brandRole:
      "Arquitectura de marca avanzada para expansión, multimercado y growth integral.",
    cta: "Conversación a medida",
  },
];
