"use client";

import { usePathname } from "next/navigation";
import AppShell from "./AppShell";

/**
 * AppShellGate — decide si envolver la página en el AppShell (sidebar +
 * topbar) o no. El login (/app/login) se renderiza pelado; todo lo demás
 * lleva el shell. Fuente única: elimina el patrón de envolver AppShell
 * página por página (que dejaba las páginas nuevas sin sidebar).
 */
export default function AppShellGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/app/login") return <>{children}</>;
  return <AppShell>{children}</AppShell>;
}
