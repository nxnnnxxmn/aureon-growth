"use client";

/**
 * Rol del usuario autenticado — leído de la cookie no-httpOnly `aureon_role`
 * que setea /api/app-login. Dos niveles reales:
 *   owner  → ADMIN_PASSWORD (CEO: acceso total)
 *   member → MEMBER_PASSWORD (empleados: sin Equipo, API Keys ni credenciales)
 * Sesiones antiguas sin cookie de rol se tratan como owner (compatibilidad).
 */
import { useEffect, useState } from "react";

export type AppRole = "owner" | "member";

export function getRole(): AppRole {
  if (typeof document === "undefined") return "owner";
  const m = document.cookie.match(/(?:^|;\s*)aureon_role=([^;]+)/);
  return m?.[1] === "member" ? "member" : "owner";
}

export function useRole(): { role: AppRole; isOwner: boolean; hydrated: boolean } {
  const [role, setRole] = useState<AppRole>("owner");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setRole(getRole()); setHydrated(true); }, []);
  return { role, isOwner: role === "owner", hydrated };
}
