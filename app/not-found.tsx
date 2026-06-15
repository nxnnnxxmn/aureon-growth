import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        {/* AUREON watermark */}
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#9A938A]/40 mb-6">
          AUREON · 404
        </p>

        <h1 className="font-display font-bold text-6xl lg:text-8xl text-[#1A1815] tracking-tight mb-2">
          404
        </h1>
        <p className="text-lg text-[#6B655E] mb-8 leading-relaxed">
          Esta página no existe o fue movida.
          <br />
          Pero tu próximo caso de éxito sí te está esperando.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-7 py-3.5 bg-[#E04E2C] hover:bg-[#A53B1F] text-white font-display font-semibold rounded-full transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            href="/#contacto"
            className="px-7 py-3.5 border border-[rgba(26,24,21,0.15)] text-[#1A1815] font-display font-medium rounded-full hover:bg-[rgba(26,24,21,0.04)] transition-colors"
          >
            Contactar
          </Link>
        </div>
      </div>
    </main>
  );
}
