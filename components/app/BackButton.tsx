"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { A } from "@/lib/ui";

/**
 * BackButton — flecha "volver" consistente en todo el Command Center.
 * En el dashboard (/app) no se muestra (no hay a dónde volver).
 * Usa history.back si hay historial; si no, cae al Dashboard.
 */
export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/app") return null;

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/app");
  };

  return (
    <button
      onClick={goBack}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold focus-ring transition-colors hover:bg-white/5"
      style={{ color: A.text2, border: `1px solid ${A.border}` }}
      aria-label="Volver"
    >
      <ArrowLeft className="w-3.5 h-3.5" /> Volver
    </button>
  );
}
