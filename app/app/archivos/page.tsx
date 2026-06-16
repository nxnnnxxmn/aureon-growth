"use client";

import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, FilterChips, Panel } from "@/components/app/primitives";
import { FILES, CLIENTS } from "@/lib/internal/mock-data";
import type { FileRecord } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const CATS: (FileRecord["category"] | "Todos")[] = ["Todos", "Brief", "Propuesta", "Contrato", "Factura", "Comprobante", "Entregable", "Logo", "Creatividad", "Reporte", "Recurso interno", "Plantilla"];

const clientName = (id?: string) => (id && CLIENTS.find((c) => c.id === id)?.company) || "—";

export default function ArchivosPage() {
  const [filter, setFilter] = useState<FileRecord["category"] | "Todos">("Todos");
  const filtered = filter === "Todos" ? FILES : FILES.filter((f) => f.category === filter);

  return (
    <AppShell>
      <AppPageHeader
        title="Archivos"
        subtitle="Documentos, briefings, entregables y assets. Almacenamiento real pendiente."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Archivos" }]}
        actions={<Button variant="outline"><Plus className="w-3.5 h-3.5" />Subir archivo</Button>}
      />

      <div className="mb-4"><FilterChips value={filter} onChange={setFilter} options={CATS.map((c) => ({ value: c, label: c }))} /></div>

      <Panel title={`${filtered.length} archivos`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((f) => (
            <div key={f.id} className="card-3d p-4 rounded-xl" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <div className="flex items-start gap-3 mb-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(214,180,106,0.12)" }}><FileText className="w-5 h-5" style={{ color: A.gold }} /></span>
                <div className="min-w-0">
                  <div className="font-display font-semibold text-sm truncate" style={{ color: A.text }}>{f.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.violet }}>{f.category}</div>
                </div>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px]" style={{ color: A.textDim }}>
                <span>{clientName(f.clientId)}</span>
                <span>{f.size}</span>
              </div>
              <div className="font-mono text-[10px] mt-1" style={{ color: A.textDim }}>{f.uploadedAt} · {f.owner}</div>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}
