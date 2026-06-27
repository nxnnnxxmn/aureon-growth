import { Check, Sparkles, ArrowUpRight, Star } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { Tk } from "@/lib/design-tokens";
import { Button } from "@/components/ds";

/**
 * Plans — featured plan ahora es contundente:
 *  - Escala 1.04 (lg-up)
 *  - Glow dorado radial detrás
 *  - Top crown badge
 *  - Borde dorado pleno (no gradient)
 *  - Surface elevada (no surface estándar)
 *  - Sombra elev-6 (premium top)
 */
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
    <section id={id} className={`relative w-full overflow-hidden ${Tk.space.section.lg}`} style={{ backgroundColor: Tk.color.bg2, color: Tk.color.text }}>
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid-faint" />
      <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full glow-gold pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        {heading && (
          <div className="mb-16 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10" style={{ backgroundColor: Tk.color.gold }} />
              <span className={Tk.type.eyebrow} style={{ color: Tk.color.gold }}>Planes</span>
            </div>
            <h2 className={`${Tk.type.h2} font-display mb-6`} style={{ color: Tk.color.text }}>
              Tres formas de{" "}
              <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: Tk.color.gold }}>trabajar juntos</span>.
            </h2>
            <p className={Tk.type.bodyLg} style={{ color: Tk.color.text2 }}>
              Precios de referencia, sin paquetes inflados. Cada plan define para
              quién es, qué incluye y qué resultado busca. El alcance se ajusta a tu etapa.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {PLANS.map((p) => {
            const featured = !!p.featured;
            return (
              <div
                key={p.name}
                className={`relative rounded-3xl p-8 lg:p-9 flex flex-col card-3d ${featured ? "lg:scale-[1.04] lg:z-10" : ""}`}
                style={{
                  backgroundColor: featured ? Tk.color.surfaceElev : Tk.color.surface,
                  border: `1px solid ${featured ? Tk.color.borderActive : Tk.color.border}`,
                  boxShadow: featured ? "var(--elev-6)" : "var(--elev-3)",
                }}
              >
                {/* Glow radial detrás del featured */}
                {featured && (
                  <div aria-hidden className="absolute -inset-px rounded-3xl pointer-events-none" style={{
                    background: `radial-gradient(circle at 50% 0%, rgba(214,180,106,0.18) 0%, transparent 60%)`,
                  }} />
                )}

                {/* Top crown badge para featured */}
                {featured && (
                  <div className="absolute left-1/2 -translate-x-1/2 -top-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-bold" style={{ backgroundColor: Tk.color.gold, color: Tk.color.bg, boxShadow: "0 8px 24px -6px rgba(214,180,106,0.55)" }}>
                    <Star className="w-3 h-3 fill-current" />
                    Recomendado
                  </div>
                )}

                <div className="relative flex items-baseline justify-between mb-1">
                  <h3 className={`${Tk.type.h4} font-display`} style={{ color: Tk.color.text }}>{p.name}</h3>
                  <span className="font-mono text-xs tabular-nums" style={{ color: Tk.color.textDim }}>{p.num}</span>
                </div>
                <p className="relative text-sm leading-relaxed mb-6" style={{ color: Tk.color.text2, fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: "0.98rem" }}>
                  &ldquo;{p.tagline}&rdquo;
                </p>

                <div className="relative mb-6 pb-6 border-b" style={{ borderColor: Tk.color.border }}>
                  <div className="font-display font-bold text-3xl lg:text-4xl leading-none mb-1.5" style={{ color: featured ? Tk.color.goldBright : Tk.color.gold }}>{p.price}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: Tk.color.textDim }}>{p.priceSub}</div>
                </div>

                <div className="relative inline-block self-start mb-5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(124,92,191,0.16)", color: "#C7B8E8" }}>
                  {p.idealFor}
                </div>

                <ul className="relative space-y-3 mb-6">
                  {p.includes.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm leading-snug" style={{ color: Tk.color.text }}>
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: featured ? Tk.color.goldBright : Tk.color.gold }} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                {showBrandRole && (
                  <div className="relative mb-6 rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${Tk.color.border}` }}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: Tk.color.gold }}>Branding en este plan</div>
                    <p className="text-xs leading-relaxed" style={{ color: Tk.color.text2 }}>{p.brandRole}</p>
                  </div>
                )}

                <div className="relative mb-6 pb-6 border-b" style={{ borderColor: Tk.color.border }}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1" style={{ color: Tk.color.textDim }}>Resultado esperado</div>
                  <p className="text-sm font-medium" style={{ color: Tk.color.text }}>{p.result}</p>
                </div>

                <div className="relative mt-auto">
                  <Button
                    href="/diagnostico"
                    variant={featured ? "primary" : "outline"}
                    fullWidth
                    iconRight={<ArrowUpRight className="w-4 h-4" />}
                  >
                    {p.cta}
                  </Button>
                </div>

                {featured && (
                  <div className="relative mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: Tk.color.gold }}>
                    <Sparkles className="inline w-3 h-3 mr-1" /> Más elegido por empresas en escala
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
