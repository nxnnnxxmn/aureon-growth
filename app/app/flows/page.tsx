"use client";

import { useCallback, useRef, useState } from "react";
import {
  GitBranch, Plus, Trash2, Download, Zap, Bot, Filter, PlayCircle,
  ToggleLeft, ToggleRight, Workflow, Link2,
} from "lucide-react";
import { AppPageHeader, Panel, Button, StatCard, FilterChips } from "@/components/app/primitives";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import { A } from "@/lib/ui";

/* ─────────────────────────────────────────────────────────────────
 * FLOWS — diseñador visual de flujos estilo n8n + reglas de
 * automatización tipo trigger → condición → acción.
 *
 * Honestidad de ejecución: las reglas marcadas "activa (local)" ya
 * corren dentro del Command Center. Las demás requieren backend o
 * n8n — el flujo se exporta en JSON base compatible para montarlo.
 * ───────────────────────────────────────────────────────────────── */

type NodeKind = "trigger" | "condition" | "action" | "agent";
type FlowNode = { id: string; kind: NodeKind; label: string; x: number; y: number };
type FlowEdge = { from: string; to: string };
export type Flow = { id: string; name: string; nodes: FlowNode[]; edges: FlowEdge[]; active: boolean };

type Rule = { id: string; trigger: string; condition: string; action: string; active: boolean; runtime: "local" | "backend" };

const NODE_META: Record<NodeKind, { label: string; color: string; icon: typeof Zap }> = {
  trigger: { label: "Trigger", color: "#D6B46A", icon: Zap },
  condition: { label: "Condición", color: "#4D7CFE", icon: Filter },
  action: { label: "Acción", color: "#7EE2A8", icon: PlayCircle },
  agent: { label: "Agente IA", color: "#C7B8E8", icon: Bot },
};

const TRIGGERS = ["Nuevo lead (formulario web)", "Prospecto marcado contactado", "Mensaje entrante en Inbox", "Deal cambia de etapa", "Nuevo contacto creado"];
const ACTIONS = ["Crear tareas de seguimiento (día 3 y 7)", "Sugerir plantilla en Inbox", "Enviar WhatsApp (requiere Cloud API)", "Enviar email (requiere backend)", "Mover deal de etapa", "Notificar al equipo (requiere backend)"];

/* Reglas del sistema que YA corren en el Command Center */
const SYSTEM_RULES: Rule[] = [
  { id: "sys-1", trigger: "Prospecto marcado contactado", condition: "Siempre", action: "Crear tareas de seguimiento (día 3 y 7)", active: true, runtime: "local" },
  { id: "sys-2", trigger: "Mensaje entrante en Inbox", condition: "Coincide intención (precio, demo, hola…)", action: "Sugerir plantilla en Inbox", active: true, runtime: "local" },
  { id: "sys-3", trigger: "Nuevo lead (formulario web)", condition: "Siempre", action: "Guardar en CRM + notificación email interna", active: true, runtime: "local" },
];

const uid = () => Math.random().toString(36).slice(2, 10);

export default function FlowsPage() {
  const [tab, setTab] = useState<"reglas" | "canvas">("reglas");
  const [rules, setRules] = useStore<Rule>(STORE_KEYS.autoRules);
  const [flows, setFlows] = useStore<Flow>(STORE_KEYS.flows);
  const [activeFlowId, setActiveFlowId] = useState<string | null>(null);
  const [connectFrom, setConnectFrom] = useState<string | null>(null);
  const dragRef = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const flow = flows.find((f) => f.id === activeFlowId) || flows[0] || null;

  const updateFlow = useCallback((id: string, fn: (f: Flow) => Flow) => {
    setFlows((arr) => arr.map((f) => (f.id === id ? fn(f) : f)));
  }, [setFlows]);

  const newFlow = () => {
    const f: Flow = {
      id: uid(), name: `Flujo ${flows.length + 1}`, active: false,
      nodes: [{ id: uid(), kind: "trigger", label: TRIGGERS[2], x: 40, y: 60 }],
      edges: [],
    };
    setFlows((arr) => [...arr, f]);
    setActiveFlowId(f.id);
    setTab("canvas");
  };

  const addNode = (kind: NodeKind) => {
    if (!flow) return;
    const label = kind === "trigger" ? TRIGGERS[0] : kind === "action" ? ACTIONS[1] : kind === "agent" ? "Responder con agente (requiere proveedor IA)" : "Si el mensaje contiene…";
    updateFlow(flow.id, (f) => ({ ...f, nodes: [...f.nodes, { id: uid(), kind, label, x: 60 + f.nodes.length * 30, y: 60 + f.nodes.length * 40 }] }));
  };

  /* Drag de nodos (pointer events) */
  const onNodeDown = (e: React.PointerEvent, n: FlowNode) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = { id: n.id, dx: e.clientX - rect.left - n.x, dy: e.clientY - rect.top - n.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onCanvasMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!d || !rect || !flow) return;
    const x = Math.max(0, Math.min(rect.width - 200, e.clientX - rect.left - d.dx));
    const y = Math.max(0, Math.min(rect.height - 70, e.clientY - rect.top - d.dy));
    updateFlow(flow.id, (f) => ({ ...f, nodes: f.nodes.map((n) => (n.id === d.id ? { ...n, x, y } : n)) }));
  };
  const onUp = () => { dragRef.current = null; };

  const connect = (nodeId: string) => {
    if (!flow) return;
    if (!connectFrom) { setConnectFrom(nodeId); return; }
    if (connectFrom !== nodeId && !flow.edges.some((e) => e.from === connectFrom && e.to === nodeId)) {
      updateFlow(flow.id, (f) => ({ ...f, edges: [...f.edges, { from: connectFrom, to: nodeId }] }));
    }
    setConnectFrom(null);
  };

  const removeNode = (nodeId: string) => {
    if (!flow) return;
    updateFlow(flow.id, (f) => ({ ...f, nodes: f.nodes.filter((n) => n.id !== nodeId), edges: f.edges.filter((e) => e.from !== nodeId && e.to !== nodeId) }));
  };

  const exportJson = () => {
    if (!flow) return;
    const n8nish = {
      name: flow.name,
      nodes: flow.nodes.map((n, i) => ({ id: n.id, name: n.label, type: `aureon.${n.kind}`, position: [n.x, n.y], parameters: {}, index: i })),
      connections: flow.edges.map((e) => ({ source: e.from, target: e.to })),
      meta: { exportedFrom: "Aureon Command Center", note: "Base JSON para reconstruir el flujo en n8n" },
    };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(n8nish, null, 2)], { type: "application/json" }));
    a.download = `${flow.name.replace(/\s+/g, "-").toLowerCase()}.flow.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const addRule = () => setRules((arr) => [...arr, { id: uid(), trigger: TRIGGERS[0], condition: "Siempre", action: ACTIONS[2], active: false, runtime: "backend" }]);

  const allRules = [...SYSTEM_RULES, ...rules];

  return (
    <>
      <AppPageHeader
        title="Flows y automatizaciones"
        subtitle="Reglas trigger → condición → acción, y diseñador visual de flujos. Lo local ya corre; lo demás se exporta a n8n o se activa con backend."
        breadcrumbs={[{ label: "Command Center", href: "/app" }, { label: "Flows" }]}
        actions={<Button onClick={newFlow}><Plus className="w-3.5 h-3.5" /> Nuevo flujo</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Reglas activas (local)" value={allRules.filter((r) => r.active && r.runtime === "local").length} icon={Zap} accent="positive" source="real" hint="Corriendo en el panel" />
        <StatCard label="Reglas pendientes" value={allRules.filter((r) => r.runtime === "backend").length} icon={Workflow} accent="alert" source="pendiente" hint="Requieren backend / n8n" />
        <StatCard label="Flujos diseñados" value={flows.length} icon={GitBranch} accent="gold" source="manual" />
        <StatCard label="Nodos del flujo actual" value={flow?.nodes.length || 0} icon={Bot} accent="violet" source="manual" />
      </div>

      <div className="mb-5">
        <FilterChips
          options={[{ value: "reglas" as const, label: "Reglas de automatización", count: allRules.length }, { value: "canvas" as const, label: "Diseñador visual (canvas)", count: flows.length }]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {tab === "reglas" ? (
        <Panel title="Reglas — cuando pasa X, haz Y" action={<Button variant="ghost" size="sm" onClick={addRule}><Plus className="w-3.5 h-3.5" /> Nueva regla</Button>}>
          <div className="space-y-2">
            {allRules.map((r) => {
              const isSystem = r.id.startsWith("sys-");
              return (
                <div key={r.id} className="liquid-glass rounded-xl p-4" style={{ backgroundColor: "rgba(15,14,22,0.55)" }}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase" style={{ backgroundColor: "rgba(214,180,106,0.12)", color: A.gold }}>
                      <Zap className="w-3 h-3" /> {r.trigger}
                    </span>
                    <span style={{ color: A.textDim }}>→</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase" style={{ backgroundColor: "rgba(77,124,254,0.12)", color: "#8FAEFF" }}>
                      <Filter className="w-3 h-3" /> {r.condition}
                    </span>
                    <span style={{ color: A.textDim }}>→</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase" style={{ backgroundColor: "rgba(126,226,168,0.12)", color: A.positive }}>
                      <PlayCircle className="w-3 h-3" /> {r.action}
                    </span>
                    <span className="ml-auto inline-flex items-center gap-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: r.runtime === "local" ? A.positive : A.alert }}>
                        {r.runtime === "local" ? "activa (local)" : "requiere backend / n8n"}
                      </span>
                      {!isSystem && (
                        <>
                          <button onClick={() => setRules((arr) => arr.map((x) => (x.id === r.id ? { ...x, active: !x.active } : x)))} className="focus-ring rounded" style={{ color: r.active ? A.positive : A.textDim }} aria-label="Alternar regla">
                            {r.active ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                          </button>
                          <button onClick={() => setRules((arr) => arr.filter((x) => x.id !== r.id))} className="p-1 rounded focus-ring hover:bg-white/5" style={{ color: A.danger }} aria-label="Eliminar regla">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      {isSystem && <span className="font-mono text-[9px]" style={{ color: A.textDim }}>sistema</span>}
                    </span>
                  </div>
                  {!isSystem && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                      <select value={r.trigger} onChange={(e) => setRules((arr) => arr.map((x) => (x.id === r.id ? { ...x, trigger: e.target.value } : x)))} className="rounded-lg px-2.5 py-1.5 text-xs outline-none" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }}>
                        {TRIGGERS.map((t) => <option key={t}>{t}</option>)}
                      </select>
                      <input value={r.condition} onChange={(e) => setRules((arr) => arr.map((x) => (x.id === r.id ? { ...x, condition: e.target.value } : x)))} className="rounded-lg px-2.5 py-1.5 text-xs outline-none" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }} placeholder="Condición" />
                      <select value={r.action} onChange={(e) => setRules((arr) => arr.map((x) => (x.id === r.id ? { ...x, action: e.target.value, runtime: /requiere/.test(e.target.value) ? "backend" : x.runtime } : x)))} className="rounded-lg px-2.5 py-1.5 text-xs outline-none" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }}>
                        {ACTIONS.map((a) => <option key={a}>{a}</option>)}
                      </select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Panel>
      ) : (
        <Panel
          title={flow ? `Canvas — ${flow.name}` : "Canvas"}
          action={flow && (
            <div className="flex gap-2 items-center">
              <select value={flow.id} onChange={(e) => setActiveFlowId(e.target.value)} className="rounded-lg px-2.5 py-1.5 text-xs outline-none" style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }}>
                {flows.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
              <Button variant="ghost" size="sm" onClick={exportJson}><Download className="w-3.5 h-3.5" /> Exportar JSON (n8n)</Button>
            </div>
          )}
        >
          {!flow ? (
            <p className="text-sm py-8 text-center" style={{ color: A.textDim }}>Crea tu primer flujo con el botón de arriba.</p>
          ) : (
            <>
              {/* Paleta */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {(Object.keys(NODE_META) as NodeKind[]).map((k) => {
                  const m = NODE_META[k];
                  return (
                    <button key={k} onClick={() => addNode(k)} className="focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] border transition-colors hover:bg-white/5" style={{ borderColor: m.color, color: m.color }}>
                      <m.icon className="w-3 h-3" /> + {m.label}
                    </button>
                  );
                })}
                <span className="font-mono text-[10px] ml-2" style={{ color: connectFrom ? A.gold : A.textDim }}>
                  <Link2 className="w-3 h-3 inline mr-1" />
                  {connectFrom ? "Ahora haz clic en el punto de ENTRADA del nodo destino" : "Conectar: clic en punto de salida → punto de entrada"}
                </span>
              </div>

              {/* Canvas */}
              <div ref={canvasRef} onPointerMove={onCanvasMove} onPointerUp={onUp}
                className="relative w-full h-[480px] rounded-2xl overflow-hidden tech-grid-faint"
                style={{ backgroundColor: "rgba(0,0,0,0.3)", border: `1px solid ${A.border}`, touchAction: "none" }}>
                {/* Edges */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {flow.edges.map((e, i) => {
                    const from = flow.nodes.find((n) => n.id === e.from);
                    const to = flow.nodes.find((n) => n.id === e.to);
                    if (!from || !to) return null;
                    const x1 = from.x + 190, y1 = from.y + 30, x2 = to.x + 4, y2 = to.y + 30;
                    const mx = (x1 + x2) / 2;
                    return <path key={i} d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`} fill="none" stroke={A.gold} strokeWidth="1.5" opacity="0.6" />;
                  })}
                </svg>
                {/* Nodes */}
                {flow.nodes.map((n) => {
                  const m = NODE_META[n.kind];
                  return (
                    <div key={n.id} className="absolute liquid-glass rounded-xl select-none" style={{ left: n.x, top: n.y, width: 194, backgroundColor: "rgba(15,14,22,0.85)", border: `1px solid ${m.color}44` }}>
                      <div onPointerDown={(e) => onNodeDown(e, n)} className="flex items-center gap-2 px-3 py-2 cursor-grab active:cursor-grabbing" style={{ borderBottom: `1px solid ${A.border}` }}>
                        <m.icon className="w-3.5 h-3.5 shrink-0" style={{ color: m.color }} />
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: m.color }}>{m.label}</span>
                        <button onClick={() => removeNode(n.id)} className="ml-auto p-0.5 rounded focus-ring hover:bg-white/10" style={{ color: A.textDim }} aria-label="Eliminar nodo">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="px-3 py-2">
                        <input
                          value={n.label}
                          onChange={(e) => updateFlow(flow.id, (f) => ({ ...f, nodes: f.nodes.map((x) => (x.id === n.id ? { ...x, label: e.target.value } : x)) }))}
                          className="w-full bg-transparent text-[11px] outline-none leading-snug"
                          style={{ color: A.text }}
                        />
                      </div>
                      {/* Puertos */}
                      <button onClick={() => connect(n.id)} aria-label="Puerto de salida"
                        className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full focus-ring"
                        style={{ backgroundColor: connectFrom === n.id ? A.gold : "rgba(255,255,255,0.15)", border: `2px solid ${m.color}` }} />
                      <button onClick={() => connect(n.id)} aria-label="Puerto de entrada"
                        className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full focus-ring"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)", border: `2px solid ${A.border}` }} />
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-[10px] leading-relaxed" style={{ color: A.textDim }}>
                Diseñador de flujos: arrastra nodos, edita sus etiquetas y conéctalos. La ejecución de flujos personalizados requiere backend o n8n — usa Exportar JSON como base para montarlo allí. Los nodos "Agente IA" requieren conexión con proveedor de IA.
              </p>
            </>
          )}
        </Panel>
      )}
    </>
  );
}
