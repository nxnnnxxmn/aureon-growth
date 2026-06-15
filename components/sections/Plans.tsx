import Link from "next/link";
import { Check, Sparkles, ArrowUpRight } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { A } from "@/lib/ui";

/** Dark, token-based pricing. `variant` kept for API compatibility (ignored). */
export default function Plans({
  showBrandRole = false,
  heading = true,
  id = "planes",
}: {
  variant?: "light" | "dark";
  showBrandRole?: boolean;
  heading?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className="relative w-full overflow-hidden py-24 lg:py-32" style={{ backgroundColor: A.bg2, color: A.text }}>
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-35" />
      <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full glow-gold pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        {heading && (
          <div className="mb-14 lg:mb-16 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10" style={{ backgroundColor: A.gold }} />
              <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>Planes</span>
            </div>
            <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6" style={{ color: A.text }}>
              Tres formas de{" "}
              <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>trabajar juntos</span>.
            </h2>
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: A.text2 }}>
              Precios de referencia, sin paquetes inflados. Cada plan define para
              quién es, qué incluye y qué resultado busca. El alcance se ajusta a tu etapa.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-start">
          {PLANS.map((p) => {
            const featured = !!p.featured;
            return (
              <div
                key={p.name}
                className={`card-3d relative rounded-3xl p-8 lg:p-9 ${featured ? "lg:-mt-4 border-grad" : ""}`}
                style={{
                  backgroundColor: featured ? A.surface : A.surface,
                  border: `1px solid ${featured ? A.borderActive : A.border}`,
                  boxShadow: featured ? "0 30px 70px -26px rgba(214,180,106,0.3)" : "0 18px 50px -30px rgba(0,0,0,0.7)",
                }}
              >
                {featured && (
                  <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ backgroundColor: A.gold, color: A.bg }}>
                    <Sparkles className="w-3 h-3" /> Recomendado
                  </div>
                )}

                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-display font-semibold text-xl lg:text-2xl" style={{ color: A.text }}>{p.name}</h3>
                  <span className="font-mono text-xs tabular-nums" style={{ color: A.textDim }}>{p.num}</span>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: A.text2, fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: "0.98rem" }}>
                  &ldquo;{p.tagline}&rdquo;
                </p>

                <div className="mb-6 pb-6 border-b" style={{ borderColor: A.border }}>
                  <div className="font-display font-bold text-3xl lg:text-4xl leading-none mb-1.5" style={{ color: A.gold }}>{p.price}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: A.textDim }}>{p.priceSub}</div>
                </div>

                <div className="inline-block mb-5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(124,92,191,0.16)", color: "#C7B8E8" }}>
                  {p.idealFor}
                </div>

                <ul className="space-y-3 mb-6">
                  {p.includes.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm leading-snug" style={{ color: A.text }}>
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: A.gold }} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                {showBrandRole && (
                  <div className="mb-6 rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}` }}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: A.gold }}>Branding en este plan</div>
                    <p className="text-xs leading-relaxed" style={{ color: A.text2 }}>{p.brandRole}</p>
                  </div>
                )}

                <div className="mb-6 pb-6 border-b" style={{ borderColor: A.border }}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: A.textDim }}>Resultado esperado</div>
                  <p className="text-sm font-medium" style={{ color: A.text }}>{p.result}</p>
                </div>

                <Link
                  href="/diagnostico"
                  className={`focus-ring inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full font-display font-semibold text-sm ${featured ? "btn-premium" : ""}`}
                  style={featured ? { backgroundColor: A.gold, color: A.bg } : { border: `1.5px solid ${A.gold}`, color: A.gold }}
                >
                  {p.cta} <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
