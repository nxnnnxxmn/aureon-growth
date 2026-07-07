"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Un solo video cinematográfico fijo detrás de TODA la página.
   Al ser fixed, el scroll de las secciones translúcidas encima crea
   paralaje real — profundidad 3D constante durante todo el recorrido. */
const BACKDROP_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4";

export default function GlobalBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();

  /* Reduced-motion: primer frame congelado — cinematográfico sin movimiento */
  useEffect(() => {
    if (reduced) videoRef.current?.pause();
  }, [reduced]);

  return (
    <>
      {/* Capa 0 — video fijo detrás de todo */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
        {!failed ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={BACKDROP_VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setFailed(true)}
          />
        ) : (
          /* Fallback: atmósfera de marca si el video no carga */
          <div className="absolute inset-0" style={{ backgroundColor: "#08070D" }}>
            <div className="absolute inset-0 tech-grid opacity-40" />
            <div className="absolute -top-40 right-[-10%] w-[760px] h-[760px] rounded-full glow-gold" />
            <div className="absolute bottom-[-20%] left-[-12%] w-[680px] h-[680px] rounded-full glow-violet" />
          </div>
        )}
        {/* Veladura base para legibilidad global */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(6,5,10,0.42)" }} />
      </div>

      {/* Guías verticales fijas en los bordes del contenedor (detalle editorial) */}
      <div className="hidden lg:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[700px] w-px bg-white/[0.07] z-[5]" aria-hidden />
      <div className="hidden lg:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[699px] w-px bg-white/[0.07] z-[5]" aria-hidden />
    </>
  );
}
