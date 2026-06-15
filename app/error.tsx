"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#F5F1E8] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#9A938A]/40 mb-6">
          AUREON · ERROR
        </p>

        <h1 className="font-display font-bold text-5xl lg:text-7xl text-[#1A1815] tracking-tight mb-2">
          Algo salió mal
        </h1>
        <p className="text-lg text-[#6B655E] mb-8 leading-relaxed">
          Ocurrió un error inesperado.
          <br />
          Intenta de nuevo o vuelve al inicio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-7 py-3.5 bg-[#E04E2C] hover:bg-[#A53B1F] text-white font-display font-semibold rounded-full transition-colors"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="px-7 py-3.5 border border-[rgba(26,24,21,0.15)] text-[#1A1815] font-display font-medium rounded-full hover:bg-[rgba(26,24,21,0.04)] transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </main>
  );
}
