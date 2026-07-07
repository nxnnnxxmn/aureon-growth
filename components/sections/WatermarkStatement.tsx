/* WatermarkStatement — declaración tipográfica monumental sobre el video fijo.
   Sección transparente (clase video-window): el backdrop respira a pantalla
   completa mientras el titular gigante con gradiente dorado + grano flota encima. */
export default function WatermarkStatement() {
  return (
    <section className="video-window relative w-full overflow-hidden py-28 lg:py-40" aria-label="Aureon Growth System">
      {/* Grano cinematográfico para el gradiente (filtro SVG scoped) */}
      <svg width="0" height="0" aria-hidden>
        <filter id="aureon-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
          <feComponentTransfer><feFuncA type="linear" slope="0.075" /></feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      {/* Feather superior e inferior hacia la veladura de las secciones vecinas */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-28" style={{ background: "linear-gradient(180deg, rgba(10,9,16,0.88) 0%, transparent 100%)" }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-28" style={{ background: "linear-gradient(0deg, rgba(10,9,16,0.88) 0%, transparent 100%)" }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 text-center">
        <div className="aureon-watermark" style={{ filter: "url(#aureon-noise)" }}>
          <span className="block" style={{ color: "#FFFFFF" }}>Un sistema.</span>
          <span className="block aureon-watermark-gold">Cuatro motores.</span>
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "rgba(240,237,248,0.65)" }}>
          Brand · Acquisition · Automation · Intelligence
        </p>
      </div>
    </section>
  );
}
