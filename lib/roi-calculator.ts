/**
 * ROI CALCULATOR — Calculation engine + industry benchmarks.
 *
 * Strategic intent:
 *   - High-converting lead magnet (typical 25-35% vs 2-3% form)
 *   - Demonstrates analytical rigor (vs. competitors who just say "we make you money")
 *   - Self-qualifies prospects (bad LTV:CAC ratio = bigger growth opportunity)
 *   - Captures email AFTER user already received value (higher trust)
 *
 * Realism notes:
 *   - Projections use conservative midpoints from case study patterns
 *   - All "post-Aureon" numbers shown as ranges, never absolutes
 *   - Industry benchmarks based on public reports (OpenView, Bessemer, etc.)
 */

export type Industry =
  | "saas-b2b"
  | "ecommerce"
  | "fintech"
  | "healthcare"
  | "edtech"
  | "marketplace"
  | "services"
  | "other";

export interface IndustryConfig {
  id: Industry;
  label: string;
  /** Healthy LTV:CAC ratio for the industry */
  healthyLtvCac: number;
  /** Healthy payback period (months) */
  healthyPayback: number;
  /** Typical CAC reduction we generate (decimal, e.g. 0.45 = 45% reduction) */
  cacReduction: { low: number; mid: number; high: number };
  /** Typical conversion multiplier we generate */
  conversionMultiplier: { low: number; mid: number; high: number };
  /** Typical 6-month MRR growth multiplier */
  mrrGrowth6m: { low: number; mid: number; high: number };
  /** Industry-specific narrative */
  narrative: string;
}

export const INDUSTRIES: IndustryConfig[] = [
  {
    id: "saas-b2b",
    label: "SaaS B2B",
    healthyLtvCac: 3,
    healthyPayback: 12,
    cacReduction: { low: 0.3, mid: 0.5, high: 0.7 },
    conversionMultiplier: { low: 1.8, mid: 2.5, high: 4 },
    mrrGrowth6m: { low: 2, mid: 5, high: 12 },
    narrative:
      "En SaaS B2B, el LTV:CAC saludable es >3 con payback bajo 12 meses. Los SaaS que escalamos suelen tener canales saturados de outreach manual.",
  },
  {
    id: "ecommerce",
    label: "E-commerce / DTC",
    healthyLtvCac: 4,
    healthyPayback: 6,
    cacReduction: { low: 0.25, mid: 0.4, high: 0.6 },
    conversionMultiplier: { low: 1.5, mid: 2.2, high: 3.5 },
    mrrGrowth6m: { low: 1.8, mid: 3, high: 6 },
    narrative:
      "En e-commerce, ROAS >3 es el mínimo saludable. Las marcas que escalamos tienen creative testing manual y audiencias mal segmentadas.",
  },
  {
    id: "fintech",
    label: "Fintech (B2C app)",
    healthyLtvCac: 3.5,
    healthyPayback: 6,
    cacReduction: { low: 0.4, mid: 0.6, high: 0.75 },
    conversionMultiplier: { low: 2, mid: 3, high: 5 },
    mrrGrowth6m: { low: 2.5, mid: 5, high: 10 },
    narrative:
      "En fintech B2C, la velocidad de iteración creativa es lo que separa los ganadores de los perdedores. Aplicamos IA + automation para 5× la velocidad.",
  },
  {
    id: "healthcare",
    label: "Healthcare / Servicios",
    healthyLtvCac: 5,
    healthyPayback: 4,
    cacReduction: { low: 0.3, mid: 0.45, high: 0.65 },
    conversionMultiplier: { low: 1.5, mid: 2, high: 3 },
    mrrGrowth6m: { low: 1.5, mid: 2.5, high: 4 },
    narrative:
      "Healthcare depende mucho de paid + referencias. Reducimos la dependencia con SEO técnico y content cluster strategy.",
  },
  {
    id: "edtech",
    label: "EdTech / Learning",
    healthyLtvCac: 3,
    healthyPayback: 8,
    cacReduction: { low: 0.3, mid: 0.45, high: 0.6 },
    conversionMultiplier: { low: 2, mid: 3.5, high: 5 },
    mrrGrowth6m: { low: 2, mid: 4, high: 8 },
    narrative:
      "El trial→paid es la métrica crítica. Implementamos AI personalization para 3-4× la conversión sin gastar más en adquisición.",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    healthyLtvCac: 4,
    healthyPayback: 10,
    cacReduction: { low: 0.3, mid: 0.5, high: 0.65 },
    conversionMultiplier: { low: 1.8, mid: 2.5, high: 4 },
    mrrGrowth6m: { low: 2, mid: 4, high: 7 },
    narrative:
      "Los marketplaces tienen que escalar dos lados a la vez. Diseñamos sistemas de adquisición diferenciados por cohort.",
  },
  {
    id: "services",
    label: "Servicios / Consultoría",
    healthyLtvCac: 4,
    healthyPayback: 6,
    cacReduction: { low: 0.25, mid: 0.4, high: 0.55 },
    conversionMultiplier: { low: 1.5, mid: 2, high: 3 },
    mrrGrowth6m: { low: 1.5, mid: 2.5, high: 4 },
    narrative:
      "Para servicios B2B premium, el enfoque es ABM + content authority. Atraemos leads pre-calificados, no volumen.",
  },
  {
    id: "other",
    label: "Otra industria",
    healthyLtvCac: 3,
    healthyPayback: 10,
    cacReduction: { low: 0.25, mid: 0.4, high: 0.6 },
    conversionMultiplier: { low: 1.5, mid: 2.2, high: 3.5 },
    mrrGrowth6m: { low: 1.8, mid: 3, high: 5 },
    narrative:
      "Aplicamos el mismo framework de growth: research profundo, sistema integrado, métricas comprometidas.",
  },
];

export function getIndustry(id: Industry): IndustryConfig {
  return INDUSTRIES.find((i) => i.id === id) ?? INDUSTRIES[INDUSTRIES.length - 1];
}

// ============================================================
// INPUT / OUTPUT TYPES
// ============================================================

export interface CalculatorInput {
  industry: Industry;
  monthlyRevenue: number;
  cac: number;
  ltv: number;
  conversionRate: number; // percentage (e.g. 2.5 means 2.5%)
  monthlyMarketingSpend: number;
}

export interface CalculatorResult {
  industry: IndustryConfig;
  input: CalculatorInput;
  current: {
    ltvCac: number;
    payback: number; // months
    monthlyNewCustomers: number;
    annualRevenue: number;
  };
  projected: {
    cacRange: [number, number]; // [low, high]
    cacMid: number;
    conversionRange: [number, number];
    conversionMid: number;
    mrrRange: [number, number]; // projected MRR in 6 months
    mrrMid: number;
    additionalMrr: number; // mrrMid - current MRR
  };
  score: {
    total: number; // 0-100
    breakdown: {
      ltvCac: number; // 0-30
      payback: number; // 0-25
      conversion: number; // 0-20
      spendEfficiency: number; // 0-25
    };
    label: string; // "Sub-óptimo", "Saludable", etc.
    color: "red" | "amber" | "green" | "gold";
  };
  insights: string[];
}

// ============================================================
// CORE CALCULATION
// ============================================================

export function calculate(input: CalculatorInput): CalculatorResult {
  const industry = getIndustry(input.industry);

  // Current state
  const ltvCac = input.cac > 0 ? input.ltv / input.cac : 0;
  const avgCustomerValue = input.ltv / 12; // approximate monthly contribution
  const monthlyNewCustomers =
    avgCustomerValue > 0 ? input.monthlyRevenue / avgCustomerValue : 0;
  // Payback in months: how many months to recover CAC from monthly margin
  const payback = avgCustomerValue > 0 ? input.cac / avgCustomerValue : 99;

  // Projected (with Aureon)
  const cacLow = input.cac * (1 - industry.cacReduction.high);
  const cacHigh = input.cac * (1 - industry.cacReduction.low);
  const cacMid = input.cac * (1 - industry.cacReduction.mid);

  const conversionLow = input.conversionRate * industry.conversionMultiplier.low;
  const conversionHigh = input.conversionRate * industry.conversionMultiplier.high;
  const conversionMid = input.conversionRate * industry.conversionMultiplier.mid;

  const mrrLow = input.monthlyRevenue * industry.mrrGrowth6m.low;
  const mrrHigh = input.monthlyRevenue * industry.mrrGrowth6m.high;
  const mrrMid = input.monthlyRevenue * industry.mrrGrowth6m.mid;

  // Growth Score (0-100)
  const ltvCacScore = Math.min(30, (ltvCac / industry.healthyLtvCac) * 30);
  const paybackScore =
    payback === 0
      ? 0
      : Math.max(0, Math.min(25, (industry.healthyPayback / payback) * 25));
  const conversionScore = Math.min(20, input.conversionRate * 4); // 5% = 20 pts
  const spendEfficiencyScore =
    input.monthlyMarketingSpend > 0
      ? Math.min(
          25,
          ((input.monthlyRevenue / input.monthlyMarketingSpend) * 25) / 5
        )
      : 0;

  const totalScore = Math.round(
    ltvCacScore + paybackScore + conversionScore + spendEfficiencyScore
  );

  // Score label + color
  let label = "Sub-óptimo";
  let color: "red" | "amber" | "green" | "gold" = "red";
  if (totalScore >= 80) {
    label = "Excelente";
    color = "gold";
  } else if (totalScore >= 60) {
    label = "Saludable";
    color = "green";
  } else if (totalScore >= 40) {
    label = "Mejorable";
    color = "amber";
  }

  // Generate insights
  const insights: string[] = [];
  if (ltvCac < industry.healthyLtvCac) {
    insights.push(
      `Tu LTV:CAC actual (${ltvCac.toFixed(1)}×) está por debajo del benchmark saludable de tu industria (${industry.healthyLtvCac}×). Es el problema #1 que ataca nuestro sistema de growth.`
    );
  } else {
    insights.push(
      `Tu LTV:CAC (${ltvCac.toFixed(1)}×) supera el benchmark de tu industria — tienes unit economics sanos para escalar agresivamente.`
    );
  }

  if (payback > industry.healthyPayback) {
    insights.push(
      `Tu payback de ${payback.toFixed(1)} meses es alto para tu vertical (saludable: <${industry.healthyPayback}m). Reducir CAC = más cash runway para escalar.`
    );
  }

  if (input.conversionRate < 2.5) {
    insights.push(
      `Tu tasa de conversión (${input.conversionRate}%) sugiere oportunidad en optimización de funnel y landing pages dedicadas.`
    );
  }

  if (input.monthlyMarketingSpend > input.monthlyRevenue * 0.3) {
    insights.push(
      `Tu inversión en marketing es ${((input.monthlyMarketingSpend / input.monthlyRevenue) * 100).toFixed(0)}% del revenue — muy por encima del 15-25% recomendado. Hay margen de eficiencia.`
    );
  }

  return {
    industry,
    input,
    current: {
      ltvCac,
      payback,
      monthlyNewCustomers,
      annualRevenue: input.monthlyRevenue * 12,
    },
    projected: {
      cacRange: [cacLow, cacHigh],
      cacMid,
      conversionRange: [conversionLow, conversionHigh],
      conversionMid,
      mrrRange: [mrrLow, mrrHigh],
      mrrMid,
      additionalMrr: mrrMid - input.monthlyRevenue,
    },
    score: {
      total: totalScore,
      breakdown: {
        ltvCac: Math.round(ltvCacScore),
        payback: Math.round(paybackScore),
        conversion: Math.round(conversionScore),
        spendEfficiency: Math.round(spendEfficiencyScore),
      },
      label,
      color,
    },
    insights,
  };
}

// ============================================================
// FORMATTING HELPERS
// ============================================================

export function formatMoney(n: number, compact = false): string {
  if (compact && n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (compact && n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}

export function formatMonths(n: number): string {
  if (n >= 99) return "—";
  return `${n.toFixed(1)} mes${n >= 2 ? "es" : ""}`;
}
