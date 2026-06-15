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
    <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden" style={{ backgroundColor: "#08070D", color: "#F0EDF8" }}>
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-40" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full glow-gold pointer-events-none" />
      <div className="relative z-10 max-w-lg text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] mb-6" style={{ color: "rgba(214,180,106,0.6)" }}>AUREON · ERROR</p>
        <h1 className="font-display font-bold text-5xl lg:text-7xl tracking-tight mb-2" style={{ color: "#F0EDF8" }}>Algo salió mal</h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: "#A8B4C8" }}>
          Ocurrió un error inesperado.
          <br />
          Intenta de nuevo o vuelve al inicio.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={reset} className="btn-premium px-7 py-3.5 font-display font-semibold rounded-full" style={{ backgroundColor: "#D6B46A", color: "#08070D" }}>
            Intentar de nuevo
          </button>
          <a href="/" className="px-7 py-3.5 border font-display font-medium rounded-full transition-colors" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#F0EDF8" }}>
            Volver al inicio
          </a>
        </div>
      </div>
    </main>
  );
}
