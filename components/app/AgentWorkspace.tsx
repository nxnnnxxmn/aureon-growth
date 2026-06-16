"use client";

import { useMemo, useState } from "react";
import { Copy, Eraser, FilePlus2, RefreshCw, Save, Wand2 } from "lucide-react";
import { Button, Panel } from "@/components/app/primitives";
import { useLocal } from "@/lib/internal/storage";
import type { AgentSpec } from "@/lib/internal/types";
import { A } from "@/lib/ui";

/**
 * Local agent workspace — no live LLM. Lets the operator:
 *  1) tune the base prompt for this engagement
 *  2) fill the required context inputs
 *  3) preview the final "system + user" prompt
 *  4) copy it to clipboard so it can be pasted into any provider
 */
export default function AgentWorkspace({ agent }: { agent: AgentSpec }) {
  const promptKey = `aureon_agent_${agent.id}_prompt`;
  const ctxKey = `aureon_agent_${agent.id}_ctx`;
  const [prompt, setPrompt, resetPrompt] = useLocal<string>(promptKey, agent.basePrompt);
  const [context, setContext, resetCtx] = useLocal<Record<string, string>>(ctxKey, Object.fromEntries(agent.inputs.map((i) => [i, ""])));
  const [copied, setCopied] = useState(false);

  const finalPrompt = useMemo(() => {
    const ctxBlock = Object.entries(context)
      .filter(([, v]) => v && v.trim().length > 0)
      .map(([k, v]) => `• ${k}: ${v.trim()}`)
      .join("\n") || "[Sin datos de contexto cargados — el agente debe pedirlos]";

    return `SYSTEM\n${prompt}\n\nCONTEXTO ENTREGADO POR EL OPERADOR\n${ctxBlock}\n\nOUTPUTS ESPERADOS\n${agent.outputs.map((o) => `· ${o}`).join("\n")}\n\nCHECKLIST DE CALIDAD\n${agent.qualityChecklist.map((c) => `· ${c}`).join("\n")}`;
  }, [prompt, context, agent]);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(finalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <Panel title="Workspace del agente" action={
      <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: A.textDim }}>
        Sin LLM conectado · ejecución manual
      </span>
    }>
      <p className="text-sm mb-5" style={{ color: A.text2 }}>
        Edita el prompt para este encargo, completa el contexto y copia el resultado
        para pegarlo en tu proveedor LLM. Todo se guarda localmente.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Prompt editor */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-display font-medium text-xs uppercase tracking-[0.12em]" style={{ color: A.text2 }}>Prompt base</span>
            <button onClick={resetPrompt} className="inline-flex items-center gap-1 text-[10px] font-display font-semibold" style={{ color: A.gold }}>
              <RefreshCw className="w-3 h-3" /> Restaurar
            </button>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={10}
            className="w-full rounded-xl px-3 py-2 text-xs leading-relaxed font-mono outline-none focus:border-[rgba(214,180,106,0.55)] resize-y"
            style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text2 }}
          />
        </div>

        {/* Context inputs */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-display font-medium text-xs uppercase tracking-[0.12em]" style={{ color: A.text2 }}>Contexto requerido</span>
            <button onClick={resetCtx} className="inline-flex items-center gap-1 text-[10px] font-display font-semibold" style={{ color: A.gold }}>
              <Eraser className="w-3 h-3" /> Vaciar
            </button>
          </div>
          <div className="space-y-2">
            {agent.inputs.map((field) => (
              <label key={field} className="block">
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: A.textDim }}>{field}</span>
                <input
                  type="text"
                  value={context[field] || ""}
                  onChange={(e) => setContext({ ...context, [field]: e.target.value })}
                  className="w-full rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[rgba(214,180,106,0.55)]"
                  style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }}
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Final prompt preview */}
      <div className="rounded-xl p-4" style={{ backgroundColor: A.bg, border: `1px dashed ${A.border}` }}>
        <div className="flex items-center justify-between mb-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: A.gold }}>Prompt final compuesto</div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={copyPrompt}>
              <Copy className="w-3 h-3" /> {copied ? "Copiado" : "Copiar"}
            </Button>
          </div>
        </div>
        <pre className="text-[11px] leading-relaxed whitespace-pre-wrap font-mono max-h-72 overflow-auto" style={{ color: A.text2 }}>{finalPrompt}</pre>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        <Button><FilePlus2 className="w-3.5 h-3.5" /> Crear tarea con este prompt</Button>
        <Button variant="outline"><Save className="w-3.5 h-3.5" /> Guardar como plantilla</Button>
        <Button variant="ghost"><Wand2 className="w-3.5 h-3.5" /> Conectar LLM (pendiente)</Button>
      </div>
    </Panel>
  );
}
