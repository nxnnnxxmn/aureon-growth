"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CookieBanner = dynamic(() => import("@/components/common/CookieBanner"), { ssr: false });
const SoundToggle = dynamic(() => import("@/components/common/SoundToggle"), { ssr: false });

/**
 * DeferredExtras — monta los componentes no críticos (banner de cookies,
 * toggle de sonido) DESPUÉS del primer idle del hilo principal.
 * Reduce el Total Blocking Time del load inicial: su JS no compite
 * con la hidratación del contenido que el usuario ve primero.
 */
export default function DeferredExtras() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 1500);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;
  return (
    <>
      <CookieBanner />
      <SoundToggle />
    </>
  );
}
