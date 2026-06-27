"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, MessageCircle } from "lucide-react";
import { SERVICE_OPTIONS, STAGE_OPTIONS } from "@/lib/validation";
import { waLink } from "@/lib/whatsapp";
import { A } from "@/lib/ui";

type Status = "idle" | "loading" | "success" | "error";

const initial = {
  name: "", company: "", email: "", phone: "", channel: "",
  service: "", stage: "", challenge: "", message: "", website: "",
};

export default function DiagnosticForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k: keyof typeof initial, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const composedMessage = [
      form.challenge && `Reto principal: ${form.challenge}`,
      form.channel && `Sitio / Instagram: ${form.channel}`,
      form.message && `Mensaje: ${form.message}`,
    ].filter(Boolean).join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone, company: form.company,
          service: form.service, budget: form.stage,
          message: composedMessage || "Solicitud de diagnóstico estratégico.",
          source: "Diagnóstico web", website: form.website,
        }),
      });
      if (res.ok) { setStatus("success"); setForm(initial); return; }
      const data = await res.json().catch(() => null);
      setErrorMsg(data?.error || "No pudimos enviar tu solicitud. Intenta de nuevo.");
      setStatus("error");
    } catch {
      setErrorMsg("Error de conexión. Escríbenos por WhatsApp y te atendemos directo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl p-8 lg:p-12 text-center glass border-grad" role="status">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: A.gold }}>
          <CheckCircle2 className="w-8 h-8" style={{ color: A.bg }} />
        </div>
        <h3 className="font-display font-semibold text-2xl mb-3" style={{ color: A.text }}>Recibimos tu solicitud</h3>
        <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: A.text2 }}>
          Revisaremos tu caso y te contactaremos en menos de 24 horas para coordinar el diagnóstico estratégico.
        </p>
      </motion.div>
    );
  }

  const inputBase = "w-full rounded-xl px-4 py-3 text-sm transition-colors outline-none focus:border-[rgba(214,180,106,0.55)]";
  const inputStyle = { backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl p-7 lg:p-9 surface" style={{ backgroundColor: A.surface }} noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden value={form.website} onChange={(e) => set("website", e.target.value)} style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nombre" required>
          <input className={inputBase} style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Tu nombre" required autoComplete="name" />
        </Field>
        <Field label="Empresa">
          <input className={inputBase} style={inputStyle} value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Nombre de tu empresa" autoComplete="organization" />
        </Field>
        <Field label="Email" required>
          <input type="email" className={inputBase} style={inputStyle} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="tu@empresa.com" required autoComplete="email" />
        </Field>
        <Field label="WhatsApp" required>
          <input type="tel" className={inputBase} style={inputStyle} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+57 300 000 0000" required autoComplete="tel" />
        </Field>
        <Field label="Sitio web o Instagram" className="sm:col-span-2">
          <input className={inputBase} style={inputStyle} value={form.channel} onChange={(e) => set("channel", e.target.value)} placeholder="https://tuempresa.com  ·  @tuempresa" />
        </Field>
        <Field label="Servicio de interés" required>
          <select className={inputBase} style={inputStyle} value={form.service} onChange={(e) => set("service", e.target.value)} required>
            <option value="">Selecciona…</option>
            {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Etapa de la empresa">
          <select className={inputBase} style={inputStyle} value={form.stage} onChange={(e) => set("stage", e.target.value)}>
            <option value="">Selecciona…</option>
            {STAGE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Principal reto" className="sm:col-span-2">
          <input className={inputBase} style={inputStyle} value={form.challenge} onChange={(e) => set("challenge", e.target.value)} placeholder="Ej: recibo leads pero no convierto, no tengo CRM, etc." />
        </Field>
        <Field label="Mensaje adicional" className="sm:col-span-2">
          <textarea className={inputBase} style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Cuéntanos brevemente tu contexto y objetivos." rows={4} />
        </Field>
      </div>

      {status === "error" && (
        <div id="form-error" className="mt-5 flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: "rgba(240,99,71,0.1)", color: "#F0A36A" }} role="alert" aria-live="polite">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <button type="submit" disabled={status === "loading"} aria-describedby={status === "error" ? "form-error" : undefined} className="btn-premium focus-ring w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm disabled:opacity-60" style={{ backgroundColor: A.gold, color: A.bg, boxShadow: "0 14px 36px -10px rgba(214,180,106,0.45)" }}>
          {status === "loading" ? (<><Loader2 className="w-4 h-4 animate-spin" /> Enviando…</>) : (<>Solicitar diagnóstico estratégico <ArrowRight className="w-4 h-4" /></>)}
        </button>
        <a href={waLink("default")} target="_blank" rel="noopener noreferrer" className="focus-ring w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-display font-semibold text-sm border transition-colors" style={{ borderColor: A.border, color: A.text }}>
          <MessageCircle className="w-4 h-4" /> Prefiero WhatsApp
        </a>
      </div>

      <p className="mt-4 text-xs" style={{ color: A.textDim }}>
        Al enviar aceptas nuestra <a href="/legal/privacidad" className="underline" style={{ color: A.gold }}>política de privacidad</a>. Respondemos en menos de 24 horas hábiles.
      </p>
    </form>
  );
}

function Field({ label, required, className = "", children }: { label: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="block font-display font-medium text-xs uppercase tracking-[0.12em] mb-2" style={{ color: A.text2 }}>
        {label}{required && <span style={{ color: A.gold }}> *</span>}
      </span>
      {children}
    </label>
  );
}
