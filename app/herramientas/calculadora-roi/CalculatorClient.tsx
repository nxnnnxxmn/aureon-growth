"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  Mail,
  Download,
  Loader2,
} from "lucide-react";
import {
  calculate,
  INDUSTRIES,
  formatMoney,
  formatPercent,
  formatMonths,
  type CalculatorInput,
  type Industry,
} from "@/lib/roi-calculator";
import { trackEvent, trackConversion } from "@/lib/analytics";

// ============================================================
// MAIN COMPONENT
// ============================================================

const TOTAL_STEPS = 4;

type Status = "idle" | "loading" | "success" | "error";

const DEFAULT_INPUT: CalculatorInput = {
  industry: "saas-b2b",
  monthlyRevenue: 50_000,
  cac: 250,
  ltv: 1_800,
  conversionRate: 2.5,
  monthlyMarketingSpend: 8_000,
};

export default function CalculatorClient() {
  const [step, setStep] = useState(0); // 0 = intro, 1-4 = steps, 5 = results
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_INPUT);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState("");

  // Real-time calculation (memo for perf)
  const result = useMemo(() => calculate(input), [input]);

  useEffect(() => {
    if (step === 1) trackEvent("roi_calculator_started");
    if (step === 5) trackEvent("roi_calculator_completed");
  }, [step]);

  const updateInput = (patch: Partial<CalculatorInput>) =>
    setInput((prev) => ({ ...prev, ...patch }));

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setEmailError("Ingresa un correo válido");
      return;
    }
    setEmailStatus("loading");
    setEmailError("");

    try {
      // Reuse the existing /api/contact endpoint with calculator metadata
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Calculadora ROI Lead",
          email,
          phone: "Pendiente",
          company: input.industry,
          service: "Consultoría · Calculadora ROI",
          budget: "",
          message: `Lead generado por calculadora ROI.
Industria: ${result.industry.label}
Revenue mensual: ${formatMoney(input.monthlyRevenue)}
CAC: ${formatMoney(input.cac)} · LTV: ${formatMoney(input.ltv)}
LTV:CAC actual: ${result.current.ltvCac.toFixed(1)}×
Growth Score: ${result.score.total}/100 (${result.score.label})
MRR proyectado 6m: ${formatMoney(result.projected.mrrMid)}`,
          source: "calculadora-roi",
          website: "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setEmailError(data.error || "No pudimos enviar. Intenta de nuevo.");
        setEmailStatus("error");
        return;
      }
      setEmailStatus("success");
      trackConversion("roi_calculator_email_submit", {
        industry: input.industry,
        score: result.score.total,
      });
    } catch {
      setEmailError("Error de conexión. Intenta de nuevo.");
      setEmailStatus("error");
    }
  };

  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 min-h-screen overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,95,179,0.6) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-0 right-[10%] w-72 h-72 rounded-full opacity-12 pointer-events-none hidden lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,97,0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-gold-soft font-display font-semibold uppercase tracking-[0.22em] mb-10 group transition-colors"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Volver al sitio
        </Link>

        {/* HEADER */}
        {step <= 4 && (
          <div className="text-center mb-10">
            <div className="pill pill-gold etched-border inline-flex mb-5">
              <Calculator className="w-3 h-3" />
              Herramienta gratuita
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.04em] text-white mb-5">
              Calcula el ROI proyectado de tu{" "}
              <span className="gradient-text">growth</span>.
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Diagnóstico de unit economics + benchmark vs. tu industria +
              proyección a 6 meses. Toma 2 minutos, sin registro.
            </p>
          </div>
        )}

        {/* PROGRESS BAR (steps 1-4) */}
        {step >= 1 && step <= 4 && (
          <ProgressBar current={step} total={TOTAL_STEPS} />
        )}

        {/* STEP CONTENT */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <IntroBlock key="intro" onStart={() => setStep(1)} />
          )}

          {step === 1 && (
            <StepIndustry
              key="step1"
              value={input.industry}
              onChange={(industry) => updateInput({ industry })}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <StepRevenue
              key="step2"
              value={input.monthlyRevenue}
              onChange={(monthlyRevenue) => updateInput({ monthlyRevenue })}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <StepUnitEconomics
              key="step3"
              input={input}
              onChange={updateInput}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}

          {step === 4 && (
            <StepMarketingSpend
              key="step4"
              value={input.monthlyMarketingSpend}
              onChange={(monthlyMarketingSpend) =>
                updateInput({ monthlyMarketingSpend })
              }
              onBack={() => setStep(3)}
              onNext={() => setStep(5)}
            />
          )}

          {step === 5 && (
            <ResultsBlock
              key="results"
              result={result}
              email={email}
              onEmailChange={setEmail}
              emailStatus={emailStatus}
              emailError={emailError}
              onEmailSubmit={handleEmailSubmit}
              onReset={() => {
                setStep(0);
                setInput(DEFAULT_INPUT);
                setEmail("");
                setEmailStatus("idle");
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================
// PROGRESS BAR
// ============================================================

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-[0.22em] font-display font-semibold">
        <span className="text-gold-soft">
          Paso {current} de {total}
        </span>
        <span className="text-slate-500">
          {Math.round((current / total) * 100)}% completado
        </span>
      </div>
      <div className="h-1 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-violet-400 to-gold"
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

// ============================================================
// INTRO
// ============================================================

function IntroBlock({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto"
    >
      <div className="rounded-3xl glass-elevated border border-white/8 p-8 lg:p-10 etched-border">
        <div className="flex items-center gap-3 mb-5">
          <Sparkles className="w-5 h-5 text-gold" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-display font-semibold">
            · Lo que recibes
          </p>
        </div>
        <ul className="space-y-3 mb-8">
          {[
            "Tu LTV:CAC ratio + benchmark vs tu industria",
            "Tu payback period + comparativa con verticales similares",
            "Proyección de revenue a 6 meses con sistema integrado",
            "Tu Growth Score (0-100) con desglose por dimensión",
            "Top 3-5 insights priorizados para tu negocio",
          ].map((b) => (
            <li key={b} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
              <span className="text-sm text-slate-300 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onStart}
          className="w-full group inline-flex items-center justify-center gap-3 px-7 py-4 bg-gradient-to-r from-violet-600 to-plum text-white font-display font-semibold rounded-2xl btn-glow"
        >
          Iniciar diagnóstico
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[11px] text-center text-slate-500 mt-5 uppercase tracking-[0.22em] font-display font-semibold">
          ⏱ ~2 minutos · Sin registro · 100% gratis
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================
// STEP 1 — INDUSTRY
// ============================================================

function StepIndustry({
  value,
  onChange,
  onNext,
}: {
  value: Industry;
  onChange: (i: Industry) => void;
  onNext: () => void;
}) {
  return (
    <StepShell title="¿En qué industria opera tu negocio?" subtitle="Calibra benchmarks específicos a tu vertical.">
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {INDUSTRIES.map((ind) => {
          const isSelected = value === ind.id;
          return (
            <button
              key={ind.id}
              onClick={() => onChange(ind.id)}
              className={`text-left p-4 rounded-2xl transition-all etched-border ${
                isSelected
                  ? "bg-gradient-to-br from-violet-600/15 to-plum/10 border border-gold-soft"
                  : "glass border border-white/8 hover:border-violet-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-bold text-white text-sm tracking-tight">
                  {ind.label}
                </span>
                {isSelected && <CheckCircle className="w-4 h-4 text-gold" />}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-1">
                LTV:CAC saludable {ind.healthyLtvCac}× · Payback &lt;{ind.healthyPayback}m
              </p>
            </button>
          );
        })}
      </div>
      <button
        onClick={onNext}
        className="w-full group inline-flex items-center justify-center gap-3 px-7 py-4 bg-gradient-to-r from-violet-600 to-plum text-white font-display font-semibold rounded-2xl btn-glow"
      >
        Continuar
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </StepShell>
  );
}

// ============================================================
// STEP 2 — REVENUE
// ============================================================

function StepRevenue({
  value,
  onChange,
  onBack,
  onNext,
}: {
  value: number;
  onChange: (v: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <StepShell title="¿Cuál es tu revenue mensual actual?" subtitle="Aproximación es suficiente — usaremos rangos para la proyección.">
      <div className="mb-8 space-y-5">
        <div className="text-center">
          <div className="font-display font-black text-5xl sm:text-6xl gradient-text-gold tracking-[-0.03em] mb-1">
            {formatMoney(value, true)}
          </div>
          <div className="text-[10px] text-slate-500 uppercase tracking-[0.22em] font-display font-semibold">
            USD / mes
          </div>
        </div>

        <input
          type="range"
          min={5_000}
          max={1_500_000}
          step={5_000}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-violet-500"
        />

        <div className="flex justify-between text-[10px] text-slate-600 uppercase tracking-[0.18em] font-display font-semibold">
          <span>$5K</span>
          <span>$500K</span>
          <span>$1.5M+</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[20_000, 100_000, 300_000, 800_000].map((preset) => (
            <button
              key={preset}
              onClick={() => onChange(preset)}
              className="px-2 py-2 rounded-xl glass border border-white/8 text-xs text-slate-300 hover:border-gold-soft hover:text-gold-soft transition-colors font-display font-semibold"
            >
              {formatMoney(preset, true)}
            </button>
          ))}
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </StepShell>
  );
}

// ============================================================
// STEP 3 — UNIT ECONOMICS
// ============================================================

function StepUnitEconomics({
  input,
  onChange,
  onBack,
  onNext,
}: {
  input: CalculatorInput;
  onChange: (patch: Partial<CalculatorInput>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <StepShell title="Tus unit economics" subtitle="Las 3 métricas que definen si tu negocio escala — usa aproximación si no las conoces exactas.">
      <div className="space-y-5 mb-8">
        <FieldInput
          label="CAC (Customer Acquisition Cost)"
          help="Cuánto cuesta adquirir un cliente nuevo en promedio"
          value={input.cac}
          onChange={(cac) => onChange({ cac })}
          prefix="$"
          step={10}
          min={10}
          max={5_000}
        />
        <FieldInput
          label="LTV (Lifetime Value)"
          help="Revenue total promedio que genera un cliente durante toda su vida"
          value={input.ltv}
          onChange={(ltv) => onChange({ ltv })}
          prefix="$"
          step={50}
          min={100}
          max={50_000}
        />
        <FieldInput
          label="Tasa de conversión"
          help="% de visitantes que se convierten en cliente (web → cliente pagando)"
          value={input.conversionRate}
          onChange={(conversionRate) => onChange({ conversionRate })}
          suffix="%"
          step={0.1}
          min={0.1}
          max={20}
        />
      </div>
      <NavButtons onBack={onBack} onNext={onNext} />
    </StepShell>
  );
}

// ============================================================
// STEP 4 — MARKETING SPEND
// ============================================================

function StepMarketingSpend({
  value,
  onChange,
  onBack,
  onNext,
}: {
  value: number;
  onChange: (v: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <StepShell title="Tu inversión actual en marketing" subtitle="Incluye paid ads, tools, agencia, freelancers — todo lo que sale del marketing budget.">
      <div className="mb-8 space-y-5">
        <div className="text-center">
          <div className="font-display font-black text-5xl sm:text-6xl gradient-text-gold tracking-[-0.03em] mb-1">
            {formatMoney(value, true)}
          </div>
          <div className="text-[10px] text-slate-500 uppercase tracking-[0.22em] font-display font-semibold">
            USD / mes
          </div>
        </div>

        <input
          type="range"
          min={500}
          max={150_000}
          step={500}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-violet-500"
        />

        <div className="flex justify-between text-[10px] text-slate-600 uppercase tracking-[0.18em] font-display font-semibold">
          <span>$500</span>
          <span>$50K</span>
          <span>$150K+</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[2_500, 10_000, 30_000, 70_000].map((preset) => (
            <button
              key={preset}
              onClick={() => onChange(preset)}
              className="px-2 py-2 rounded-xl glass border border-white/8 text-xs text-slate-300 hover:border-gold-soft hover:text-gold-soft transition-colors font-display font-semibold"
            >
              {formatMoney(preset, true)}
            </button>
          ))}
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Ver resultados" />
    </StepShell>
  );
}

// ============================================================
// RESULTS
// ============================================================

function ResultsBlock({
  result,
  email,
  onEmailChange,
  emailStatus,
  emailError,
  onEmailSubmit,
  onReset,
}: {
  result: ReturnType<typeof calculate>;
  email: string;
  onEmailChange: (s: string) => void;
  emailStatus: Status;
  emailError: string;
  onEmailSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}) {
  const { current, projected, score, insights, industry } = result;

  // Score color mapping
  const scoreColor = {
    red: "text-red-400",
    amber: "text-sunset-400",
    green: "text-violet-200",
    gold: "text-gold",
  }[score.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* HEADER */}
      <div className="text-center mb-2">
        <div className="pill pill-gold etched-border inline-flex mb-4">
          <Sparkles className="w-3 h-3" />
          Tu diagnóstico
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.04em] text-white mb-2">
          Tu Growth Score:{" "}
          <span className={scoreColor}>{score.total}</span>
          <span className="text-slate-500">/100</span>
        </h2>
        <p className={`font-serif-display italic text-2xl font-medium mt-3 ${scoreColor}`}>
          {score.label}
        </p>
      </div>

      {/* SCORE BREAKDOWN */}
      <div className="rounded-3xl glass-elevated border border-white/8 p-7 lg:p-8 etched-border">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-display font-semibold mb-5">
          · Desglose por dimensión
        </p>
        <div className="space-y-4">
          <ScoreBar label="LTV:CAC Ratio" value={score.breakdown.ltvCac} max={30} />
          <ScoreBar label="Payback Period" value={score.breakdown.payback} max={25} />
          <ScoreBar label="Conversion Rate" value={score.breakdown.conversion} max={20} />
          <ScoreBar
            label="Spend Efficiency"
            value={score.breakdown.spendEfficiency}
            max={25}
          />
        </div>
      </div>

      {/* CURRENT VS PROJECTED */}
      <div className="rounded-3xl glass-elevated border border-white/8 p-7 lg:p-8 etched-border">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-display font-semibold mb-5">
          · Tu situación actual vs. proyectada con Aureon (6 meses)
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* CURRENT */}
          <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/8">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500 font-display font-semibold">
              Hoy
            </p>
            <MetricLine
              label="LTV:CAC"
              value={`${current.ltvCac.toFixed(1)}×`}
              sub={`Benchmark: ${industry.healthyLtvCac}× saludable`}
            />
            <MetricLine
              label="Payback"
              value={formatMonths(current.payback)}
              sub={`Benchmark: <${industry.healthyPayback}m saludable`}
            />
            <MetricLine
              label="MRR"
              value={formatMoney(result.input.monthlyRevenue, true)}
              sub={`Anual: ${formatMoney(current.annualRevenue, true)}`}
            />
          </div>

          {/* PROJECTED */}
          <div
            className="space-y-4 p-5 rounded-2xl border etched-border-gold relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,95,179,0.10) 0%, rgba(201,169,97,0.08) 100%)",
              borderColor: "rgba(201,169,97,0.32)",
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-gold font-display font-semibold">
              Proyectado · 6 meses
            </p>
            <MetricLine
              label="CAC"
              value={`${formatMoney(projected.cacMid)}`}
              sub={`Rango: ${formatMoney(projected.cacRange[0])}-${formatMoney(projected.cacRange[1])}`}
              accent="gold"
            />
            <MetricLine
              label="Conversion"
              value={formatPercent(projected.conversionMid)}
              sub={`Rango: ${formatPercent(projected.conversionRange[0])}-${formatPercent(projected.conversionRange[1])}`}
              accent="gold"
            />
            <MetricLine
              label="MRR proyectado"
              value={formatMoney(projected.mrrMid, true)}
              sub={`Rango: ${formatMoney(projected.mrrRange[0], true)}-${formatMoney(projected.mrrRange[1], true)}`}
              accent="gold"
            />
          </div>
        </div>

        {/* ADDITIONAL MRR HIGHLIGHT */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-violet-600/15 to-plum/15 border border-gold-soft text-center etched-border-gold">
          <p className="text-[10px] uppercase tracking-[0.22em] text-gold font-display font-semibold mb-2">
            · MRR adicional potencial en 6 meses
          </p>
          <div className="font-display font-black text-4xl sm:text-5xl gradient-text-gold tracking-[-0.03em]">
            +{formatMoney(projected.additionalMrr, true)}
          </div>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="rounded-3xl glass-elevated border border-white/8 p-7 lg:p-8 etched-border">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-display font-semibold mb-5">
          · Insights para tu negocio
        </p>
        <ul className="space-y-4">
          {insights.map((insight, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-display font-black text-xl gradient-text-gold tracking-[-0.02em] leading-none mt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-slate-300 leading-relaxed">
                {insight}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-5 pt-5 border-t border-white/8">
          <p className="text-xs text-slate-400 leading-relaxed italic font-serif-display">
            &ldquo;{industry.narrative}&rdquo;
          </p>
        </div>
      </div>

      {/* EMAIL CAPTURE */}
      <div
        className="rounded-3xl p-7 lg:p-8 relative overflow-hidden etched-border-gold"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,95,179,0.12) 0%, rgba(201,169,97,0.10) 100%)",
          borderColor: "rgba(201,169,97,0.32)",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        {emailStatus === "success" ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold-soft border border-gold-soft flex items-center justify-center etched-border-gold">
              <CheckCircle className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2 tracking-tight">
              Reporte enviado a tu correo
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto mb-6">
              Te enviamos el PDF detallado con tu diagnóstico + recomendaciones
              priorizadas. Un strategist se pondrá en contacto en menos de 24h
              para profundizar.
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-plum text-white font-display font-semibold rounded-2xl btn-glow group"
            >
              Agendar consultoría directamente
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-gold" />
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-display font-semibold">
                · Reporte detallado en PDF
              </p>
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-2 tracking-tight">
              Te enviamos el análisis completo
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Recibe el PDF detallado con tu diagnóstico, recomendaciones
              priorizadas, casos similares en tu industria y los próximos pasos
              concretos.
            </p>
            <form onSubmit={onEmailSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="tu@empresa.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                disabled={emailStatus === "loading"}
                className="w-full px-4 py-3.5 glass border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-gold-soft transition-all disabled:opacity-50"
                required
              />
              {emailError && (
                <p className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="w-3 h-3" />
                  {emailError}
                </p>
              )}
              <button
                type="submit"
                disabled={emailStatus === "loading"}
                className="w-full group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-plum text-white font-display font-semibold rounded-2xl btn-glow disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {emailStatus === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando reporte…
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Enviar reporte completo
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-slate-500 leading-relaxed">
                Sin spam. Solo el reporte + seguimiento de un strategist senior.
              </p>
            </form>
          </>
        )}
      </div>

      {/* RESET */}
      <div className="text-center pt-2">
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-gold-soft uppercase tracking-[0.22em] font-display font-semibold transition-colors"
        >
          ↺ Recalcular con otros valores
        </button>
      </div>
    </motion.div>
  );
}

// ============================================================
// REUSABLE PRIMITIVES
// ============================================================

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto"
    >
      <div className="rounded-3xl glass-elevated border border-white/8 p-7 lg:p-9 etched-border">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-[-0.02em] mb-2 leading-tight">
          {title}
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed mb-7">{subtitle}</p>
        {children}
      </div>
    </motion.div>
  );
}

function NavButtons({
  onBack,
  onNext,
  nextLabel = "Continuar",
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onBack}
        className="px-5 py-3.5 glass border border-white/10 rounded-2xl text-slate-300 font-display font-medium text-sm hover:text-white hover:border-white/20 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      <button
        onClick={onNext}
        className="flex-1 group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-plum text-white font-display font-semibold rounded-2xl btn-glow text-sm"
      >
        {nextLabel}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

function FieldInput({
  label,
  help,
  value,
  onChange,
  prefix,
  suffix,
  step,
  min,
  max,
}: {
  label: string;
  help: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step: number;
  min: number;
  max: number;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.22em] text-gold-soft font-display font-semibold mb-1.5">
        {label}
      </label>
      <p className="text-xs text-slate-500 mb-2 leading-relaxed">{help}</p>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-display font-semibold">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          step={step}
          min={min}
          max={max}
          className={`w-full ${prefix ? "pl-9" : "pl-4"} ${
            suffix ? "pr-12" : "pr-4"
          } py-3.5 glass border border-white/10 rounded-xl text-white text-base font-display font-semibold focus:outline-none focus:border-gold-soft transition-all`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-display font-semibold">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 text-xs">
        <span className="text-slate-300 font-display font-semibold">{label}</span>
        <span className="text-gold-soft font-display font-bold">
          {value}/{max}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-gold"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function MetricLine({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "gold";
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500 font-display font-semibold mb-0.5">
          {label}
        </p>
        {sub && <p className="text-[11px] text-slate-600 leading-tight">{sub}</p>}
      </div>
      <div
        className={`font-display font-black text-xl tracking-[-0.02em] shrink-0 ${
          accent === "gold" ? "gradient-text-gold" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
