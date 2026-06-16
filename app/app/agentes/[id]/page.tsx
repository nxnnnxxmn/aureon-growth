import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bot, Plus, FolderPlus } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Panel, StatusBadge } from "@/components/app/primitives";
import AgentWorkspace from "@/components/app/AgentWorkspace";
import { AGENTS, getAgent } from "@/lib/internal/agents";
import { A } from "@/lib/ui";

export function generateStaticParams() {
  return AGENTS.map((a) => ({ id: a.id }));
}

export default async function AgentDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = getAgent(id);
  if (!agent) notFound();

  return (
    <AppShell>
      <AppPageHeader
        title={agent.name}
        subtitle={agent.description}
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Agentes", href: "/app/agentes" }, { label: agent.name }]}
        actions={
          <>
            <Link href="/app/agentes" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-display font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: A.text2, border: `1px solid ${A.border}` }}>
              <ArrowLeft className="w-3.5 h-3.5" /> Catálogo
            </Link>
            <span className="btn-premium inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-display font-semibold" style={{ backgroundColor: A.gold, color: A.bg }}>
              <Plus className="w-3.5 h-3.5" /> Crear tarea con agente
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-display font-semibold" style={{ border: `1px solid ${A.border}`, color: A.text }}>
              <FolderPlus className="w-3.5 h-3.5" /> Asociar a proyecto
            </span>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-1 surface p-5" style={{ backgroundColor: A.surface }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${A.gold}, ${A.violet})` }}>
              <Bot className="w-5 h-5" style={{ color: A.bg }} />
            </span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: A.gold }}>{agent.id}</div>
              <div className="font-display font-bold" style={{ color: A.text }}>{agent.name}</div>
            </div>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: A.textDim }}>Especialidad</div>
          <p className="text-sm mb-4" style={{ color: A.text }}>{agent.specialty}</p>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: A.textDim }}>Estado</div>
          <StatusBadge status={agent.status === "Disponible" ? "Activo" : agent.status === "Requiere integración IA" ? "En revisión" : "Borrador"} />
        </div>

        <div className="lg:col-span-2 surface p-5" style={{ backgroundColor: A.surface }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: A.gold }}>Prompt base</div>
          <pre className="text-xs whitespace-pre-wrap font-mono leading-relaxed rounded-lg p-4 max-h-72 overflow-auto" style={{ backgroundColor: A.bg, color: A.text2, border: `1px solid ${A.border}` }}>{agent.basePrompt}</pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Panel title="Inputs requeridos"><ul className="space-y-2 text-sm">{agent.inputs.map((i) => <li key={i} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: A.gold }} /><span style={{ color: A.text }}>{i}</span></li>)}</ul></Panel>
        <Panel title="Outputs esperados"><ul className="space-y-2 text-sm">{agent.outputs.map((i) => <li key={i} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: A.violet }} /><span style={{ color: A.text }}>{i}</span></li>)}</ul></Panel>
        <Panel title="Checklist de calidad"><ul className="space-y-2 text-sm">{agent.qualityChecklist.map((i) => <li key={i} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: A.blue }} /><span style={{ color: A.text }}>{i}</span></li>)}</ul></Panel>
      </div>

      <Panel title="Servicios relacionados" className="mt-4">
        <div className="flex flex-wrap gap-2">{agent.relatedServices.map((s) => <span key={s} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(214,180,106,0.12)", color: A.gold }}>{s}</span>)}</div>
      </Panel>

      <div className="mt-4">
        <AgentWorkspace agent={agent} />
      </div>
    </AppShell>
  );
}
