/**
 * db-mode — decide si la base de datos es realmente PERSISTENTE.
 *
 * - Postgres/MySQL (Supabase) → siempre persistente.
 * - SQLite en local (next dev, un solo proceso) → persistente durante la sesión,
 *   suficiente para desarrollo y verificación.
 * - SQLite en producción (Vercel serverless, filesystem efímero) → NO persiste
 *   entre invocaciones: el cliente debe caer a localStorage para no perder datos.
 *
 * Así el Command Center funciona hoy en local con DB real, no rompe en producción,
 * y se activa solo cuando pegas la URL de Supabase (DATABASE_URL postgres…).
 */
export function isPersistentDb(): boolean {
  const url = process.env.DATABASE_URL || "";
  if (/^postgres(ql)?:\/\//i.test(url) || /^mysql:\/\//i.test(url)) return true;
  // SQLite: persistente solo fuera de producción (dev = un proceso estable)
  if (url.startsWith("file:")) return process.env.NODE_ENV !== "production";
  return false;
}
