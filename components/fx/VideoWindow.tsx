/* VideoWindow — ventana transparente entre secciones donde el video fijo
   global se ve a pantalla completa. El scroll sobre estas ventanas crea el
   efecto de paralaje profundo (las secciones "flotan" sobre la escena). */
export default function VideoWindow({
  kicker,
  height = "h-[34vh]",
}: {
  kicker?: string;
  height?: string;
}) {
  return (
    <section className={`video-window relative w-full overflow-hidden ${height} flex items-center justify-center`} aria-hidden={!kicker}>
      <div aria-hidden className="absolute inset-x-0 top-0 h-24" style={{ background: "linear-gradient(180deg, rgba(10,9,16,0.88) 0%, transparent 100%)" }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24" style={{ background: "linear-gradient(0deg, rgba(10,9,16,0.88) 0%, transparent 100%)" }} />
      {kicker && (
        <p className="relative z-10 font-mono text-xs uppercase tracking-[0.32em]" style={{ color: "rgba(240,237,248,0.7)" }}>
          {kicker}
        </p>
      )}
    </section>
  );
}
