"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { A } from "@/lib/ui";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/app";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/app-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (res.ok) { router.replace(next); return; }
      const data = await res.json().catch(() => null);
      setError(data?.error || "Acceso denegado");
    } catch { setError("Error de conexión"); }
    finally { setLoading(false); }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden" style={{ backgroundColor: A.bg, color: A.text }}>
      <div aria-hidden className="absolute inset-0 tech-grid opacity-40" />
      <div aria-hidden className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full glow-gold pointer-events-none" />
      <div aria-hidden className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full glow-violet pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <svg width="42" height="42" viewBox="0 0 32 32" aria-hidden>
            <rect width="32" height="32" rx="8" fill="#11101A" stroke="rgba(214,180,106,0.4)" strokeWidth="0.75" />
            <circle cx="16" cy="16" r="11" stroke={A.gold} strokeWidth="1.3" fill="none" opacity="0.8" />
            <circle cx="16" cy="16" r="6" fill="url(#loginCore)" />
            <circle cx="16" cy="5" r="2" fill={A.gold} />
            <defs>
              <linearGradient id="loginCore" x1="11" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={A.gold} /><stop offset="100%" stopColor={A.violet} />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <div className="font-display font-bold text-lg" style={{ color: A.text }}>Aureon</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: A.gold }}>Command Center</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl p-8 glass border-grad">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(214,180,106,0.14)" }}>
              <ShieldCheck className="w-4 h-4" style={{ color: A.gold }} />
            </span>
            <div>
              <div className="font-display font-semibold" style={{ color: A.text }}>Acceso restringido</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: A.textDim }}>Plataforma interna · Aureon</div>
            </div>
          </div>

          <label className="block">
            <span className="block font-display font-medium text-xs uppercase tracking-[0.12em] mb-2" style={{ color: A.text2 }}>Contraseña</span>
            <input type="password" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-[rgba(214,180,106,0.55)]" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }} placeholder="ADMIN_PASSWORD" />
          </label>

          {error && (
            <div className="mt-4 flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: "rgba(240,99,71,0.1)", color: "#F0A36A" }} role="alert">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-premium focus-ring w-full inline-flex items-center justify-center gap-2 mt-6 px-6 py-3.5 rounded-full font-display font-semibold text-sm disabled:opacity-60" style={{ backgroundColor: A.gold, color: A.bg }}>
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verificando…</> : "Entrar al Command Center"}
          </button>

          <p className="text-[11px] leading-relaxed mt-5" style={{ color: A.textDim }}>
            Acceso protegido por contraseña interina (env <code>ADMIN_PASSWORD</code>). Reemplazar con
            NextAuth · Supabase Auth · Clerk antes de uso real en producción.
          </p>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
