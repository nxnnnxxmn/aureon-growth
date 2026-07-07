"use client";

import type React from "react";
import { useMemo, useState } from "react";
import {
  FileText, Sparkles, Workflow, Copy, Printer, Check, Bot, Info,
  ClipboardList, Search, PenLine, BarChart3, MessageCircle, Mail,
} from "lucide-react";
import { AppPageHeader, Panel, Button, FilterChips } from "@/components/app/primitives";
import { A } from "@/lib/ui";

/* ─────────────────────────────────────────────────────────────────
 * AUTOMATIZACIÓN — el motor operativo de la agencia.
 * Desde los datos del diagnóstico genera: documentos (plantillas),
 * prompts profesionales listos para tu proveedor de IA, y muestra
 * el pipeline completo Diagnóstico → Reporte.
 *
 * Honestidad de datos: los documentos son BORRADORES generados por
 * plantillas locales (sin IA). Los prompts requieren conexión con
 * un proveedor de IA (Claude, GPT) — se declaran como tal.
 * ───────────────────────────────────────────────────────────────── */

const SYSTEMS = [
  "Brand Authority System",
  "Acquisition Engine",
  "Revenue Automation",
  "Growth Intelligence",
] as const;

const EXTRA_SERVICES = [
  "SEO local + Google Business Profile",
  "WhatsApp Business (flujos y catálogo)",
  "Email nurturing (secuencias)",
  "CRO de landing (test A/B)",
  "Social Ads (Meta · TikTok)",
  "Dashboards ejecutivos (Looker Studio)",
  "Contenido orgánico con intención comercial",
  "Chatbot de calificación de leads",
] as const;

type DocType = "diagnostico" | "propuesta" | "brief" | "onboarding" | "reporte";
const DOC_TYPES: { value: DocType; label: string }[] = [
  { value: "diagnostico", label: "Diagnóstico estratégico" },
  { value: "propuesta", label: "Propuesta comercial" },
  { value: "brief", label: "Brief de proyecto" },
  { value: "onboarding", label: "Plan de onboarding" },
  { value: "reporte", label: "Plantilla de reporte mensual" },
];

type Tab = "documentos" | "prompts" | "pipeline";

const today = () => new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });

export default function AutomatizacionPage() {
  const [tab, setTab] = useState<Tab>("documentos");

  /* Datos del cliente — una sola fuente para documentos y prompts */
  const [client, setClient] = useState({ empresa: "", industria: "", contacto: "", reto: "", objetivo: "" });
  const [systems, setSystems] = useState<string[]>([SYSTEMS[0]]);
  const [extras, setExtras] = useState<string[]>([]);
  const [docType, setDocType] = useState<DocType>("diagnostico");
  const [copied, setCopied] = useState<string | null>(null);

  const set = (k: keyof typeof client, v: string) => setClient((c) => ({ ...c, [k]: v }));
  const toggle = (list: string[], setList: (v: string[]) => void, item: string) =>
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

  const doc = useMemo(() => buildDocument(docType, client, systems, extras), [docType, client, systems, extras]);
  const prompts = useMemo(() => buildPrompts(client, systems), [client, systems]);

  const copyText = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1600);
  };

  const printDoc = () => {
    const w = window.open("", "_blank", "width=800,height=900");
    if (!w) return;
    w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${doc.title}</title>
      <style>body{font-family:Georgia,serif;max-width:720px;margin:40px auto;padding:0 24px;color:#1a1a1a;line-height:1.6}
      h1{font-size:1.6rem;border-bottom:2px solid #D6B46A;padding-bottom:8px}h2{font-size:1.1rem;margin-top:28px;color:#6b5410}
      li{margin:4px 0}.meta{color:#777;font-size:.85rem}.disclaimer{margin-top:40px;padding:12px;background:#faf6ec;border:1px solid #e5d9b8;font-size:.78rem;color:#6b5410}</style>
      </head><body>${doc.html}<div class="disclaimer">Borrador generado por plantilla en Aureon Command Center. Revisar y ajustar antes de enviar al cliente. No constituye contrato ni documento legal.</div></body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <>
      <AppPageHeader
        title="Automatización"
        subtitle="El motor de la agencia: desde el diagnóstico genera documentos, análisis y prompts profesionales para cada etapa del cliente."
        breadcrumbs={[{ label: "Command Center", href: "/app" }, { label: "Automatización" }]}
      />

      <div className="mb-6">
        <FilterChips
          options={[
            { value: "documentos" as Tab, label: "Documentos" },
            { value: "prompts" as Tab, label: "Prompts profesionales", count: prompts.length },
            { value: "pipeline" as Tab, label: "Pipeline" },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {/* ── Datos del cliente (compartidos por todos los generadores) ── */}
      {tab !== "pipeline" && (
        <Panel title="Datos del cliente (alimentan todo)" className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Empresa"><input className={inputCls} style={inputStyle} value={client.empresa} onChange={(e) => set("empresa", e.target.value)} placeholder="Nombre de la empresa" /></Field>
            <Field label="Industria"><input className={inputCls} style={inputStyle} value={client.industria} onChange={(e) => set("industria", e.target.value)} placeholder="Ej: clínica dental, restaurante…" /></Field>
            <Field label="Contacto"><input className={inputCls} style={inputStyle} value={client.contacto} onChange={(e) => set("contacto", e.target.value)} placeholder="Nombre del decisor" /></Field>
            <Field label="Reto principal" className="lg:col-span-2"><input className={inputCls} style={inputStyle} value={client.reto} onChange={(e) => set("reto", e.target.value)} placeholder="Ej: recibe leads pero no convierte, sin CRM…" /></Field>
            <Field label="Objetivo"><input className={inputCls} style={inputStyle} value={client.objetivo} onChange={(e) => set("objetivo", e.target.value)} placeholder="Ej: duplicar citas en 6 meses" /></Field>
          </div>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: A.textDim }}>Sistemas Aureon</div>
              <div className="flex flex-wrap gap-1.5">
                {SYSTEMS.map((s) => <Chip key={s} on={systems.includes(s)} onClick={() => toggle(systems, setSystems, s)}>{s}</Chip>)}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: A.textDim }}>Servicios complementarios</div>
              <div className="flex flex-wrap gap-1.5">
                {EXTRA_SERVICES.map((s) => <Chip key={s} on={extras.includes(s)} onClick={() => toggle(extras, setExtras, s)}>{s}</Chip>)}
              </div>
            </div>
          </div>
        </Panel>
      )}

      {/* ════════ TAB: DOCUMENTOS ════════ */}
      {tab === "documentos" && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-4">
            <Panel title="Tipo de documento">
              <div className="space-y-2">
                {DOC_TYPES.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setDocType(d.value)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-colors focus-ring"
                    style={{
                      backgroundColor: docType === d.value ? "rgba(214,180,106,0.10)" : "rgba(255,255,255,0.03)",
                      color: docType === d.value ? A.text : A.text2,
                      border: `1px solid ${docType === d.value ? A.borderActive : A.border}`,
                    }}
                  >
                    <FileText className="w-4 h-4 shrink-0" style={{ color: docType === d.value ? A.gold : A.textDim }} />
                    {d.label}
                  </button>
                ))}
              </div>
              <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed" style={{ color: A.textDim }}>
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: A.gold }} />
                Borradores generados por plantillas locales con tus datos. Revisar y ajustar antes de enviar. No constituyen documentos legales.
              </p>
            </Panel>
          </div>
          <div className="xl:col-span-8">
            <Panel
              title={doc.title}
              action={
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => copyText("doc", doc.markdown)}>
                    {copied === "doc" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copiar
                  </Button>
                  <Button size="sm" onClick={printDoc}><Printer className="w-3.5 h-3.5" /> Imprimir / PDF</Button>
                </div>
              }
            >
              <pre className="whitespace-pre-wrap text-[13px] leading-relaxed font-sans max-h-[560px] overflow-y-auto p-4 rounded-xl" style={{ backgroundColor: "rgba(0,0,0,0.25)", color: A.text2, border: `1px solid ${A.border}` }}>
                {doc.markdown}
              </pre>
            </Panel>
          </div>
        </div>
      )}

      {/* ════════ TAB: PROMPTS ════════ */}
      {tab === "prompts" && (
        <>
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(124,92,191,0.14)", color: "#C7B8E8", border: `1px solid ${A.border}` }}>
            <Bot className="w-3.5 h-3.5" /> Requiere conexión con proveedor de IA (Claude, GPT) — copia y pega el prompt
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {prompts.map((p) => (
              <Panel key={p.id} title={p.title} action={
                <Button variant="ghost" size="sm" onClick={() => copyText(p.id, p.prompt)}>
                  {copied === p.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === p.id ? "Copiado" : "Copiar"}
                </Button>
              }>
                <div className="flex items-center gap-2 mb-3">
                  <p.icon className="w-4 h-4" style={{ color: p.color }} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: p.color }}>{p.category}</span>
                </div>
                <pre className="whitespace-pre-wrap text-xs leading-relaxed font-sans max-h-48 overflow-y-auto p-3 rounded-lg" style={{ backgroundColor: "rgba(0,0,0,0.25)", color: A.text2, border: `1px solid ${A.border}` }}>
                  {p.prompt}
                </pre>
              </Panel>
            ))}
          </div>
        </>
      )}

      {/* ════════ TAB: PIPELINE ════════ */}
      {tab === "pipeline" && (
        <Panel title="Pipeline de automatización — del diagnóstico al reporte">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {PIPELINE.map((s, i) => (
              <div key={s.title} className="liquid-glass rounded-2xl p-5" style={{ backgroundColor: "rgba(15,14,22,0.55)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm" style={{ backgroundColor: "rgba(214,180,106,0.12)", color: A.gold }}>{i + 1}</span>
                  <div className="font-display font-semibold text-sm" style={{ color: A.text }}>{s.title}</div>
                </div>
                <ul className="space-y-1.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: A.text2 }}>
                      <Check className="w-3 h-3 mt-0.5 shrink-0" style={{ color: A.positive }} /> {it}
                    </li>
                  ))}
                </ul>
                <a href={s.href} className="inline-flex items-center gap-1.5 mt-4 text-xs font-display font-semibold focus-ring rounded" style={{ color: A.gold }}>
                  {s.cta} →
                </a>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </>
  );
}

/* ─── UI helpers ─────────────────────────────────────────────────── */
const inputCls = "w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[rgba(214,180,106,0.55)]";
const inputStyle: React.CSSProperties = { backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text };

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] mb-1.5" style={{ color: A.textDim }}>{label}</span>
      {children}
    </label>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus-ring"
      style={{ backgroundColor: on ? "rgba(214,180,106,0.14)" : "rgba(255,255,255,0.04)", color: on ? A.gold : A.text2, border: `1px solid ${on ? A.borderActive : A.border}` }}>
      {children}
    </button>
  );
}

/* ─── Generador de documentos (plantillas locales, sin IA) ───────── */
function buildDocument(type: DocType, c: { empresa: string; industria: string; contacto: string; reto: string; objetivo: string }, systems: string[], extras: string[]) {
  const empresa = c.empresa || "[Empresa]";
  const industria = c.industria || "[industria]";
  const contacto = c.contacto || "[Contacto]";
  const reto = c.reto || "[reto principal]";
  const objetivo = c.objetivo || "[objetivo]";
  const sys = systems.length ? systems.join(", ") : "[sistemas por definir]";
  const ext = extras.length ? extras.map((e) => `- ${e}`).join("\n") : "- (sin servicios complementarios seleccionados)";

  const M: Record<DocType, { title: string; md: string }> = {
    diagnostico: {
      title: `Diagnóstico estratégico — ${empresa}`,
      md: `# Diagnóstico estratégico — ${empresa}
Fecha: ${today()} · Preparado para: ${contacto}

## 1. Contexto
${empresa} opera en el sector de ${industria}. El reto principal identificado: ${reto}.

## 2. Objetivo declarado
${objetivo}

## 3. Hallazgos por dimensión (completar en sesión)
- Marca y posicionamiento: [hallazgos]
- Adquisición (canales, tráfico, campañas): [hallazgos]
- Conversión (web, funnels, CRO): [hallazgos]
- CRM y seguimiento comercial: [hallazgos]
- Automatización e integraciones: [hallazgos]
- Medición y analítica: [hallazgos]

## 4. Sistemas recomendados
${sys}

## 5. Servicios complementarios sugeridos
${ext}

## 6. Ruta propuesta (90 días)
- Días 1–15: setup, accesos, tracking base
- Días 16–45: implementación núcleo del sistema
- Días 46–90: optimización, reporting y escalamiento

## 7. Próximo paso
Sesión de presentación del diagnóstico con ${contacto} y definición del plan.`,
    },
    propuesta: {
      title: `Propuesta comercial — ${empresa}`,
      md: `# Propuesta comercial — ${empresa}
Fecha: ${today()} · Dirigida a: ${contacto}

## 1. Entendimiento del problema
${empresa} (${industria}) enfrenta: ${reto}. El objetivo del engagement: ${objetivo}.

## 2. Solución propuesta — Aureon Growth System
Sistemas activados: ${sys}

## 3. Alcance complementario
${ext}

## 4. Entregables por fase
- Fase 1 (Diagnóstico y estrategia): mapa de crecimiento, priorización, KPIs
- Fase 2 (Implementación): activos, campañas, CRM y automatizaciones
- Fase 3 (Optimización): reporting ejecutivo mensual y mejora continua

## 5. Inversión
[Definir según plan: Sistema Inicial / Growth Partner / Proyecto a medida — ver planes vigentes]

## 6. Condiciones
- Vigencia de la propuesta: 15 días
- No incluye pauta publicitaria (se factura directo al medio)
- Requiere accesos y contraparte del cliente

## 7. Aceptación
Nombre: ______________  Firma: ______________  Fecha: ______`,
    },
    brief: {
      title: `Brief de proyecto — ${empresa}`,
      md: `# Brief de proyecto — ${empresa}
Fecha: ${today()}

## Cliente
- Empresa: ${empresa} · Industria: ${industria}
- Contacto decisor: ${contacto}

## Problema y objetivo
- Reto: ${reto}
- Objetivo: ${objetivo}

## Sistemas contratados
${sys}

## Servicios complementarios
${ext}

## Stakeholders y accesos requeridos
- [ ] Sitio web / hosting
- [ ] Meta Business / Google Ads
- [ ] CRM actual (si existe)
- [ ] Analytics / Tag Manager
- [ ] Redes sociales

## Riesgos y supuestos
- [completar]

## Criterios de éxito (medibles)
- [KPI 1] · [KPI 2] · [KPI 3]`,
    },
    onboarding: {
      title: `Plan de onboarding — ${empresa}`,
      md: `# Plan de onboarding — ${empresa}
Fecha de inicio: ${today()}

## Semana 1 — Kickoff y accesos
- Reunión de kickoff con ${contacto}
- Recolección de accesos (web, ads, CRM, analytics)
- Setup de canal de comunicación y tablero de proyecto

## Semana 2 — Fundaciones
- Auditoría técnica de activos digitales
- Instalación de tracking (GTM, píxeles, eventos)
- Configuración inicial de CRM y pipeline

## Semanas 3–4 — Activación
- Sistemas en marcha: ${sys}
- Primeras automatizaciones y flujos
${ext}

## Rituales
- Weekly de 30 min · Reporte ejecutivo mensual · Revisión trimestral de estrategia`,
    },
    reporte: {
      title: `Reporte mensual — ${empresa} (plantilla)`,
      md: `# Reporte mensual — ${empresa}
Periodo: [mes/año] · Preparado por: Aureon Growth Services

## 1. Resumen ejecutivo
[3–5 líneas: qué pasó, qué significa, qué sigue]

## 2. KPIs del sistema
| KPI | Meta | Resultado | Δ vs mes anterior |
|---|---|---|---|
| Leads calificados | — | — | — |
| Tasa de conversión | — | — | — |
| CAC | — | — | — |
| Pipeline generado | — | — | — |

## 3. Avances por sistema
${systems.length ? systems.map((s) => `### ${s}\n- [avances]`).join("\n") : "- [sistemas]"}

## 4. Aprendizajes y decisiones
- [aprendizaje] → [decisión tomada]

## 5. Plan del siguiente mes
- [prioridad 1] · [prioridad 2] · [prioridad 3]

> Nota: los datos deben provenir de fuentes verificables (Analytics, CRM, plataformas de ads). No presentar estimaciones como resultados.`,
    },
  };

  const chosen = M[type];
  const html = chosen.md
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/\n{2,}/g, "<br/><br/>");
  return { title: chosen.title, markdown: chosen.md, html };
}

/* ─── Prompts profesionales (para usar con proveedor de IA) ──────── */
function buildPrompts(c: { empresa: string; industria: string; reto: string; objetivo: string }, systems: string[]) {
  const empresa = c.empresa || "[Empresa]";
  const industria = c.industria || "[industria]";
  const reto = c.reto || "[reto principal]";
  const objetivo = c.objetivo || "[objetivo]";
  const sys = systems.join(", ") || "[sistemas]";

  return [
    { id: "p1", category: "Diagnóstico", icon: ClipboardList, color: A.gold, title: "Análisis profundo del negocio",
      prompt: `Actúa como consultor senior de growth para agencias. Analiza el negocio "${empresa}" del sector ${industria}. Su reto principal: ${reto}. Su objetivo: ${objetivo}.\n\nEntrega: (1) diagnóstico de las 6 dimensiones (marca, adquisición, conversión, CRM, automatización, medición), (2) los 3 cuellos de botella más probables con hipótesis verificables, (3) quick wins de 30 días, (4) preguntas críticas que debo hacerle al cliente en la sesión de diagnóstico. Formato: informe ejecutivo en español, directo, sin relleno.` },
    { id: "p2", category: "Competencia", icon: Search, color: A.blue, title: "Análisis competitivo local",
      prompt: `Actúa como analista de inteligencia competitiva. Para una empresa de ${industria} en Bogotá ("${empresa}"), identifica: (1) los patrones de posicionamiento típicos del sector, (2) ángulos de diferenciación poco explotados, (3) qué prometen los competidores en sus landing pages y dónde fallan, (4) una matriz de mensajes recomendados (dolor → promesa → prueba). Si necesitas datos que no tienes, dime exactamente qué buscar y dónde.` },
    { id: "p3", category: "Estrategia", icon: Workflow, color: A.violet, title: "Plan de crecimiento 90 días",
      prompt: `Eres el estratega principal de Aureon Growth Services. Diseña un plan de 90 días para "${empresa}" (${industria}) activando estos sistemas: ${sys}. Reto: ${reto}. Objetivo: ${objetivo}.\n\nEstructura: mes a mes, con iniciativas priorizadas por impacto/esfuerzo, KPIs por iniciativa, dependencias y riesgos. Termina con el ritual de seguimiento semanal recomendado.` },
    { id: "p4", category: "Copy · Ads", icon: PenLine, color: A.goldBright, title: "Ángulos y copys de campaña",
      prompt: `Actúa como copywriter directo de respuesta para ${industria}. Cliente: "${empresa}". Reto: ${reto}.\n\nGenera: (1) 5 ángulos de campaña distintos (dolor, aspiración, prueba social, urgencia honesta, contraste), (2) para cada ángulo: 2 headlines + 1 primary text para Meta Ads + 1 variante para Google Ads, (3) 3 hooks de video de 5 segundos. Español colombiano, sin promesas de resultados que no se puedan garantizar.` },
    { id: "p5", category: "CRM · Automatización", icon: MessageCircle, color: A.cyan, title: "Flujos de seguimiento WhatsApp + Email",
      prompt: `Eres especialista en automatización comercial. Para "${empresa}" (${industria}), diseña el flujo completo de seguimiento de leads: (1) respuesta inmediata post-formulario (WhatsApp + email), (2) secuencia de nurturing de 5 toques para leads que no agendan, (3) flujo de recuperación para citas no asistidas, (4) handover a humano: cuándo y con qué contexto. Incluye los mensajes textuales listos para usar, con variables {{nombre}} y {{servicio}}.` },
    { id: "p6", category: "Contenido", icon: Sparkles, color: "#F0A3C4", title: "Calendario de contenido comercial",
      prompt: `Actúa como estratega de contenido B2C/B2B para ${industria}. Cliente: "${empresa}", objetivo: ${objetivo}.\n\nCrea un calendario de 4 semanas (3 piezas/semana) donde CADA pieza tiene intención comercial explícita: awareness → consideración → decisión. Para cada pieza: formato, hook, estructura, CTA y a qué etapa del funnel empuja. Nada de contenido decorativo.` },
    { id: "p7", category: "Análisis", icon: BarChart3, color: A.positive, title: "Lectura ejecutiva de métricas",
      prompt: `Eres analista de growth. Te voy a pegar datos de campañas/analytics de "${empresa}". Analízalos así: (1) qué está funcionando y por qué (con números), (2) qué está drenando presupuesto, (3) 3 decisiones concretas para el próximo ciclo con impacto estimado, (4) qué dato falta para decidir mejor. Si los datos están incompletos o inconsistentes, dilo explícitamente antes de concluir.\n\n[PEGAR DATOS AQUÍ]` },
    { id: "p8", category: "Propuesta", icon: FileText, color: A.gold, title: "Refinar propuesta comercial",
      prompt: `Actúa como director comercial de una agencia premium. Te pego el borrador de propuesta para "${empresa}". Mejórala: (1) reescribe el entendimiento del problema para que el cliente se sienta leído, (2) convierte entregables en resultados de negocio, (3) añade manejo de las 3 objeciones más probables en ${industria}, (4) sugiere estructura de precios con anclaje. Mantén honestidad: sin garantizar resultados.\n\n[PEGAR BORRADOR AQUÍ]` },
    { id: "p9", category: "Email", icon: Mail, color: A.blue, title: "Secuencia de cierre post-diagnóstico",
      prompt: `Copywriter de email B2B. Contexto: acabamos de presentar el diagnóstico a "${empresa}" (${industria}) y quedaron de decidir. Escribe una secuencia de 4 emails (día 1, 3, 7, 14): (1) resumen de valor + próximo paso, (2) caso de uso relevante del sector (marcado como ejemplo ilustrativo), (3) manejo de la objeción principal, (4) cierre honesto de ciclo. Tono: consultivo, cero presión artificial.` },
  ];
}

/* ─── Pipeline de automatización ─────────────────────────────────── */
const PIPELINE = [
  { title: "Diagnóstico", cta: "Generar documento", href: "/app/automatizacion", items: ["Formulario web → lead en CRM (automático)", "Documento de diagnóstico desde plantilla", "Prompt de análisis profundo para IA"] },
  { title: "Prospección", cta: "Abrir mapa", href: "/app/prospeccion", items: ["Búsqueda automática de negocios reales (OSM)", "Segmentación por categoría y zona en mapa", "Exportación CSV para campañas de outreach"] },
  { title: "Propuesta", cta: "Ver propuestas", href: "/app/propuestas", items: ["Propuesta comercial desde plantilla", "Prompt de refinamiento con IA", "Seguimiento de estado en el módulo"] },
  { title: "Contrato y onboarding", cta: "Ver contratos", href: "/app/contratos", items: ["Plan de onboarding generado", "Checklist de accesos y kickoff", "Brief de proyecto para el equipo"] },
  { title: "Ejecución", cta: "Ver proyectos", href: "/app/proyectos", items: ["Flujos de seguimiento WhatsApp/Email (prompts)", "Calendario de contenido comercial", "Tareas y proyectos en el módulo"] },
  { title: "Reporte", cta: "Ver reportes", href: "/app/reportes", items: ["Plantilla de reporte mensual", "Prompt de lectura ejecutiva de métricas", "Regla: solo datos verificables, nunca estimaciones como resultados"] },
];
