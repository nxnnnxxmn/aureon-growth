/**
 * Layered technical backdrop (Nivel 1 depth): grid + radial glows + diagonal lines.
 * Purely decorative, server-rendered, pointer-events none.
 */
export default function TechBackdrop({
  grid = true,
  glow = "gold",
  variant = "default",
}: {
  grid?: boolean;
  glow?: "gold" | "violet" | "blue" | "none";
  variant?: "default" | "top" | "split";
}) {
  return (
    <div aria-hidden className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
      {grid && <div className="absolute inset-0 tech-grid opacity-[0.5]" />}
      <div className="absolute inset-0 diag-lines opacity-60" />
      {glow !== "none" && variant !== "split" && (
        <div
          className={`absolute ${variant === "top" ? "-top-40" : "-top-32"} -right-32 w-[680px] h-[680px] rounded-full glow-${glow}`}
        />
      )}
      {glow !== "none" && variant === "split" && (
        <>
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full glow-gold" />
          <div className="absolute -bottom-40 -left-32 w-[560px] h-[560px] rounded-full glow-violet" />
        </>
      )}
    </div>
  );
}
