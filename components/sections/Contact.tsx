"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageCircle,
  Calendar,
  Sparkles,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  contactSchema,
  type ContactFormData,
  SERVICE_OPTIONS,
  BUDGET_OPTIONS,
  SOURCE_OPTIONS,
} from "@/lib/validation";
import { waLink, WHATSAPP_PRETTY } from "@/lib/whatsapp";
import SectionHeader from "@/components/common/SectionHeader";
import CalendarEmbed from "@/components/common/CalendarEmbed";
import { trackConversion, trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";
type View = "calendar" | "form";

const benefits = [
  "Consultoría estratégica gratuita (60 min)",
  "Diagnóstico digital sin costo",
  "Propuesta personalizada en 48 horas",
  "Sin compromisos de permanencia",
  "Resultados medibles desde el día 1",
  "Equipo senior dedicado",
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  // Default to calendar view — agendamiento directo convierte 3-4x más que un form
  const [view, setView] = useState<View>("calendar");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
      source: "",
      website: "",
    },
  });

  const onSubmit = async (values: ContactFormData) => {
    setStatus("loading");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setServerError(json.error || "No pudimos enviar tu solicitud. Intenta de nuevo.");
        setStatus("error");
        trackEvent("lead_form_error", { error: json.error || "unknown" });
        return;
      }
      setStatus("success");
      // Track lead conversion — primary signal for Google Ads / Meta attribution
      trackConversion("lead_form_submit", {
        service: values.service,
        budget: values.budget || "unspecified",
        source: values.source || "direct",
      });
      reset();
    } catch {
      setServerError("Error de conexión. Verifica tu internet e intenta de nuevo.");
      setStatus("error");
      trackEvent("lead_form_network_error");
    }
  };

  return (
    <section
      id="contacto"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: "#F5F1E8", color: "#1A1815" }}
    >
      {/* Decorative soft blobs */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none -z-0"
        style={{
          background:
            "radial-gradient(ellipse, #F2D0C1 0%, transparent 65%)",
          opacity: 0.5,
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ backgroundColor: "#E04E2C" }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: "#E04E2C" }}
            >
              Cap. 10 — Hablemos
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ color: "#1A1815" }}
          >
            Tu próximo nivel{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                color: "#E04E2C",
              }}
            >
              empieza aquí
            </span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "#6B655E" }}>
            Cuéntanos sobre tu marca y los retos que enfrentas. En menos de 24
            horas tendrás una propuesta estratégica diseñada exclusivamente
            para ti.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: calendar OR form (tab-switched) */}
          <motion.div
            className="lg:col-span-7 card-premium rounded-3xl p-5 sm:p-7 lg:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* TAB SWITCHER — premium animated pill */}
            <div
              role="tablist"
              aria-label="Forma de contacto"
              className="relative grid grid-cols-2 p-1.5 rounded-2xl mb-6"
              style={{ backgroundColor: "#EFE9DB" }}
            >
              {/* Animated background indicator */}
              <motion.div
                layout
                aria-hidden
                className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl"
                style={{
                  backgroundColor: "#E04E2C",
                  boxShadow: "0 8px 20px -8px rgba(224,78,44,0.5)",
                }}
                animate={{ left: view === "calendar" ? "6px" : "calc(50% + 0px)" }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />

              <button
                type="button"
                role="tab"
                aria-selected={view === "calendar"}
                aria-controls="contact-panel-calendar"
                onClick={() => {
                  setView("calendar");
                  trackEvent("contact_view_change", { view: "calendar" });
                }}
                className="relative z-10 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-display font-semibold transition-colors"
                style={{ color: view === "calendar" ? "#FBF8F1" : "#6B655E" }}
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Agendar llamada</span>
                <span className="sm:hidden">Agendar</span>
                {view === "calendar" && (
                  <span className="hidden md:inline ml-1 px-1.5 py-0.5 rounded-md bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                    Recomendado
                  </span>
                )}
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={view === "form"}
                aria-controls="contact-panel-form"
                onClick={() => setView("form")}
                className="relative z-10 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-display font-semibold transition-colors"
                style={{ color: view === "form" ? "#FBF8F1" : "#6B655E" }}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Enviar mensaje</span>
                <span className="sm:hidden">Mensaje</span>
              </button>
            </div>

            {/* CALENDAR PANEL */}
            {view === "calendar" && (
              <motion.div
                key="calendar"
                id="contact-panel-calendar"
                role="tabpanel"
                aria-labelledby="tab-calendar"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Header bar */}
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#E04E2C" }}>
                    <Calendar className="w-4 h-4" style={{ color: "#FBF8F1" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-lg leading-tight" style={{ color: "#1A1815" }}>
                      Agenda tu consultoría estratégica
                    </h3>
                    <p className="text-xs leading-relaxed mt-0.5" style={{ color: "#9A938A" }}>
                      60 minutos · Gratuito · Sin compromiso · Diagnóstico personalizado
                    </p>
                  </div>
                </div>

                <CalendarEmbed height={680} />

                <p className="text-[11px] text-center mt-4 leading-relaxed" style={{ color: "#9A938A" }}>
                  Elige el horario que más te convenga. Recibirás un correo de
                  confirmación con el link de Google Meet o Zoom.
                </p>
              </motion.div>
            )}

            {/* FORM PANEL */}
            {view === "form" && (
            <div id="contact-panel-form" role="tabpanel" aria-labelledby="tab-form">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: "#E3EAD8" }}>
                    <CheckCircle className="w-8 h-8" style={{ color: "#2D5016" }} />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3" style={{ color: "#1A1815" }}>
                    ¡Solicitud recibida!
                  </h3>
                  <p className="max-w-md leading-relaxed mb-6" style={{ color: "#6B655E" }}>
                    Hemos enviado un correo de confirmación a tu inbox. Nuestro
                    equipo te contactará en las próximas{" "}
                    <span className="font-semibold" style={{ color: "#E04E2C" }}>24 horas hábiles</span>{" "}
                    con un diagnóstico personalizado.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <a
                      href={waLink("default")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#25d366] text-white text-sm font-semibold rounded-xl hover:bg-[#22c55e] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <a
                      href="/gracias"
                      className="flex-1 flex items-center justify-center px-5 py-3 text-sm font-medium rounded-xl border transition-colors"
                      style={{ backgroundColor: "#FBF8F1", borderColor: "rgba(26,24,21,0.12)", color: "#1A1815" }}
                    >
                      Ver siguientes pasos
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                  noValidate
                >
                  {/* Honeypot — hidden from real users */}
                  <input
                    type="text"
                    {...register("website")}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#E04E2C" }}>
                      <Sparkles className="w-4 h-4" style={{ color: "#FBF8F1" }} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg" style={{ color: "#1A1815" }}>
                        Cuéntanos sobre tu marca
                      </h3>
                      <p className="text-xs" style={{ color: "#9A938A" }}>
                        Todos los campos con * son obligatorios
                      </p>
                    </div>
                  </div>

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Nombre completo *"
                      error={errors.name?.message}
                    >
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        className={`form-input ${errors.name ? "error" : ""}`}
                        {...register("name")}
                      />
                    </Field>
                    <Field
                      label="Correo corporativo *"
                      error={errors.email?.message}
                    >
                      <input
                        type="email"
                        placeholder="tu@empresa.com"
                        className={`form-input ${errors.email ? "error" : ""}`}
                        {...register("email")}
                      />
                    </Field>
                  </div>

                  {/* Phone + Company */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="WhatsApp / Teléfono *"
                      error={errors.phone?.message}
                    >
                      <input
                        type="tel"
                        placeholder="+57 300 000 0000"
                        className={`form-input ${errors.phone ? "error" : ""}`}
                        {...register("phone")}
                      />
                    </Field>
                    <Field
                      label="Empresa o marca"
                      error={errors.company?.message}
                    >
                      <input
                        type="text"
                        placeholder="Nombre de tu empresa"
                        className={`form-input ${errors.company ? "error" : ""}`}
                        {...register("company")}
                      />
                    </Field>
                  </div>

                  {/* Service */}
                  <Field
                    label="¿Qué servicio te interesa? *"
                    error={errors.service?.message}
                  >
                    <select
                      className={`form-input ${errors.service ? "error" : ""}`}
                      {...register("service")}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s} style={{ backgroundColor: "#FBF8F1", color: "#1A1815" }}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* Budget + Source */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Presupuesto aproximado"
                      error={errors.budget?.message}
                    >
                      <select
                        className={`form-input ${errors.budget ? "error" : ""}`}
                        {...register("budget")}
                        defaultValue=""
                      >
                        <option value="" style={{ backgroundColor: "#FBF8F1", color: "#1A1815" }}>
                          Sin definir
                        </option>
                        {BUDGET_OPTIONS.map((b) => (
                          <option key={b} value={b} style={{ backgroundColor: "#FBF8F1", color: "#1A1815" }}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label="¿Cómo nos encontraste?"
                      error={errors.source?.message}
                    >
                      <select
                        className={`form-input ${errors.source ? "error" : ""}`}
                        {...register("source")}
                        defaultValue=""
                      >
                        <option value="" style={{ backgroundColor: "#FBF8F1", color: "#1A1815" }}>
                          Selecciona
                        </option>
                        {SOURCE_OPTIONS.map((s) => (
                          <option key={s} value={s} style={{ backgroundColor: "#FBF8F1", color: "#1A1815" }}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Message */}
                  <Field
                    label="Cuéntanos sobre tu proyecto *"
                    error={errors.message?.message}
                  >
                    <textarea
                      placeholder="¿Cuáles son tus objetivos de crecimiento? ¿Qué retos enfrentas hoy?"
                      rows={4}
                      className={`form-input resize-none ${errors.message ? "error" : ""}`}
                      {...register("message")}
                    />
                  </Field>

                  {/* Server error */}
                  {serverError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || status === "loading"}
                    className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 font-display font-semibold rounded-full overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "#E04E2C",
                      color: "#FBF8F1",
                      boxShadow: "0 14px 36px -10px rgba(224,78,44,0.5)",
                    }}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando solicitud…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar solicitud
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-center leading-relaxed" style={{ color: "#9A938A" }}>
                    Al enviar aceptas nuestra política de privacidad. Sin spam.
                    Cancela o pide eliminar tus datos en cualquier momento.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
            </div>
            )}
          </motion.div>

          {/* Right: info + contact */}
          <motion.div
            className="lg:col-span-5 space-y-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Benefits card */}
            <div className="card-premium rounded-3xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#E04E2C" }} />
                <span className="text-xs font-mono font-semibold uppercase tracking-[0.22em]" style={{ color: "#E04E2C" }}>
                  Lo que recibes
                </span>
              </div>
              <div className="space-y-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#E04E2C" }} />
                    <span className="text-sm leading-relaxed" style={{ color: "#1A1815" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp card */}
            <a
              href={waLink("consultation")}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-3xl p-6 border border-green-500/20 transition-all hover:border-green-500/40"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.02) 100%)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#25d366] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-display font-bold" style={{ color: "#1A1815" }}>
                      ¿Prefieres WhatsApp?
                    </h4>
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold uppercase" style={{ backgroundColor: "#E3EAD8", color: "#2D5016" }}>
                      En línea
                    </span>
                  </div>
                  <p className="text-sm mb-3 leading-relaxed" style={{ color: "#6B655E" }}>
                    Respuesta promedio en menos de 10 minutos en horario laboral.
                  </p>
                  <div className="text-xs font-mono" style={{ color: "#9A938A" }}>{WHATSAPP_PRETTY}</div>
                </div>
              </div>
            </a>

            {/* Direct contact info */}
            <div className="card-premium rounded-3xl p-7 space-y-4">
              <h4 className="font-display font-bold mb-2" style={{ color: "#1A1815" }}>
                Contacto directo
              </h4>
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "aureongrowthservices@outlook.com",
                  href: "mailto:aureongrowthservices@outlook.com",
                },
                {
                  icon: Phone,
                  label: "Teléfono",
                  value: WHATSAPP_PRETTY,
                  href: `tel:+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573212396665"}`,
                },
                {
                  icon: MapPin,
                  label: "Ubicación",
                  value: "Bogotá, Colombia · Remote Global",
                  href: undefined,
                },
                {
                  icon: Calendar,
                  label: "Horario",
                  value: "Lun-Vie · 8am – 7pm COT",
                  href: undefined,
                },
              ].map((c) => {
                const Inner = (
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F2D0C1" }}>
                      <c.icon className="w-4 h-4" style={{ color: "#E04E2C" }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "#9A938A" }}>
                        {c.label}
                      </div>
                      <div className="text-sm font-medium truncate" style={{ color: "#1A1815" }}>
                        {c.value}
                      </div>
                    </div>
                  </div>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} className="block hover:opacity-80 transition-opacity">
                    {Inner}
                  </a>
                ) : (
                  <div key={c.label}>{Inner}</div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-display font-semibold uppercase tracking-widest" style={{ color: "#6B655E" }}>
        {label}
      </label>
      {children}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs text-red-400 mt-1"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.div>
      )}
    </div>
  );
}
