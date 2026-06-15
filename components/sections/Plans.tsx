import Link from "next/link";
import { Check, Sparkles, ArrowUpRight } from "lucide-react";
import { PLANS } from "@/lib/plans";

type Variant = "light" | "dark";

const THEMES: Record<Variant, Record<string, string>> = {
  light: {
    sectionBg: "#EFE9DB",
    card: "#FBF8F1",
    cardBorder: "rgba(26,24,21,0.10)",
    text: "#1A1815",
    textMuted: "#6B655E",
    textSoft: "#9A938A",
    accent: "#E04E2C",
    gold: "#C9A961",
    hairline: "rgba(26,24,21,0.10)",
    onAccent: "#FBF8F1",
  },
  dark: {
    sectionBg: "transparent",
    card: "rgba(251,248,241,0.04)",
    cardBorder: "rgba(251,248,241,0.12)",
    text: "#FBF8F1",
    textMuted: "rgba(251,248,241,0.70)",
    textSoft: "rgba(251,248,241,0.45)",
    accent: "#E04E2C",
    gold: "#C9A961",
    hairline: "rgba(251,248,241,0.14)",
    onAccent: "#FBF8F1",
  },
};

export default function Plans({
  variant = "light",
  showBrandRole = false,
  heading = true,
  id = "planes",
}: {
  variant?: Variant;
  showBrandRole?: boolean;
  heading?: boolean;
  id?: string;
}) {
  const c = THEMES[variant];

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: c.sectionBg, color: c.text }}
    >
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        {heading && (
          <div className="mb-14 lg:mb-16 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10" style={{ backgroundColor: c.accent }} />
              <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: c.accent }}>
                Planes
              </span>
            </div>
            <h2
              className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ color: c.text }}
            >
              Tres formas de{" "}
              <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: c.accent }}>
                trabajar juntos
              </span>
              .
            </h2>
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: c.textMuted }}>
              Precios de referencia, sin paquetes inflados. Cada plan define para
              quién es, qué incluye y qué resultado busca. El alcance se ajusta a
              tu etapa.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-start">
          {PLANS.map((p) => {
            const featured = !!p.featured;
            const cardBg = featured ? c.accent : c.card;
            const onCard = featured ? c.onAccent : c.text;
            const onCardMuted = featured ? "rgba(251,248,241,0.85)" : c.textMuted;
            const divider = featured ? "rgba(251,248,241,0.22)" : c.hairline;
            return (
              <div
                key={p.name}
                className={`group relative rounded-3xl p-8 lg:p-9 transition-all duration-300 hover:-translate-y-1.5 ${featured ? "lg:-mt-4" : ""}`}
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${featured ? c.accent : c.cardBorder}`,
                  boxShadow: featured
                    ? "0 30px 70px -22px rgba(224,78,44,0.45)"
                    : variant === "dark"
                    ? "0 18px 50px -28px rgba(0,0,0,0.6)"
                    : "0 12px 32px -14px rgba(26,24,21,0.12)",
                }}
              >
                {featured && (
                  <div
                    className="absolute -top-3 left-8 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-semibold"
                    style={{ backgroundColor: c.gold, color: "#1A1815" }}
                  >
                    <Sparkles className="w-3 h-3" />
                    Recomendado
                  </div>
                )}

                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-display font-semibold text-xl lg:text-2xl" style={{ color: onCard }}>
                    {p.name}
                  </h3>
                  <span
                    className="font-mono text-xs tabular-nums"
                    style={{ color: featured ? "rgba(251,248,241,0.6)" : c.textSoft }}
                  >
                    {p.num}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{
                    color: onCardMuted,
                    fontFamily: "var(--font-cormorant), serif",
                    fontStyle: "italic",
                    fontSize: "0.98rem",
                  }}
                >
                  &ldquo;{p.tagline}&rdquo;
                </p>

                <div className="mb-6 pb-6 border-b" style={{ borderColor: divider }}>
                  <div className="font-display font-bold text-3xl lg:text-4xl leading-none mb-1.5" style={{ color: featured ? c.onAccent : c.accent }}>
                    {p.price}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: featured ? "rgba(251,248,241,0.7)" : c.textSoft }}>
                    {p.priceSub}
                  </div>
                </div>

                {/* Ideal for */}
                <div
                  className="inline-block mb-5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{
                    backgroundColor: featured ? "rgba(251,248,241,0.15)" : variant === "dark" ? "rgba(201,169,97,0.12)" : "#F2D0C1",
                    color: featured ? c.onAccent : c.accent,
                  }}
                >
                  {p.idealFor}
                </div>

                <ul className="space-y-3 mb-6">
                  {p.includes.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm leading-snug" style={{ color: featured ? "rgba(251,248,241,0.95)" : onCard }}>
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: featured ? c.onAccent : c.accent }} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                {showBrandRole && (
                  <div className="mb-6 rounded-2xl p-4" style={{ backgroundColor: featured ? "rgba(251,248,241,0.12)" : variant === "dark" ? "rgba(251,248,241,0.04)" : "#F5F1E8" }}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: featured ? c.gold : c.gold }}>
                      Branding en este plan
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: featured ? "rgba(251,248,241,0.9)" : onCardMuted }}>
                      {p.brandRole}
                    </p>
                  </div>
                )}

                <div className="mb-6 pb-6 border-b" style={{ borderColor: divider }}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: featured ? "rgba(251,248,241,0.7)" : c.textSoft }}>
                    Resultado esperado
                  </div>
                  <p className="text-sm font-medium" style={{ color: onCard }}>
                    {p.result}
                  </p>
                </div>

                <Link
                  href="/diagnostico"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full font-display font-semibold text-sm transition-all"
                  style={
                    featured
                      ? { backgroundColor: c.onAccent, color: c.accent }
                      : { border: `1.5px solid ${c.accent}`, color: c.accent }
                  }
                >
                  {p.cta}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
