"use client";

import { useRef, useState } from "react";
import { Plus, FileText, Upload, Trash2, Database, HardDrive } from "lucide-react";
import { AppPageHeader, Button, FilterChips, Panel } from "@/components/app/primitives";
import { useFiles } from "@/lib/internal/files-store";
import { useClients } from "@/lib/internal/clients-store";
import type { FileRecord } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const CATS: (FileRecord["category"] | "Todos")[] = ["Todos", "Brief", "Propuesta", "Contrato", "Factura", "Comprobante", "Entregable", "Logo", "Creatividad", "Reporte", "Recurso interno", "Plantilla"];

function humanSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function categoryFor(name: string): FileRecord["category"] {
  const lower = name.toLowerCase();
  if (lower.includes("brief")) return "Brief";
  if (lower.includes("propuesta") || lower.includes("proposal")) return "Propuesta";
  if (lower.includes("contrato") || lower.includes("contract")) return "Contrato";
  if (lower.includes("factura") || lower.includes("inv")) return "Factura";
  if (lower.includes("logo") || lower.endsWith(".svg")) return "Logo";
  if (lower.includes("report") || lower.includes("reporte")) return "Reporte";
  return "Recurso interno";
}

export default function ArchivosPage() {
  const [filter, setFilter] = useState<FileRecord["category"] | "Todos">("Todos");
  const { files, mode, createMany, remove } = useFiles();
  const { clients } = useClients();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const clientName = (id?: string) => (id && clients.find((c) => c.id === id)?.company) || "—";

  const filtered = filter === "Todos" ? files : files.filter((f) => f.category === filter);

  function addFiles(selected: FileList | null) {
    if (!selected) return;
    const today = new Date().toISOString().slice(0, 10);
    const drafts: Omit<FileRecord, "id">[] = Array.from(selected).map((f) => ({
      name: f.name,
      category: categoryFor(f.name),
      size: humanSize(f.size),
      uploadedAt: today,
      owner: "Juan L.",
    }));
    createMany(drafts);
  }

  function removeFile(id: string) {
    remove(id);
  }

  return (
    <>
      <AppPageHeader
        title="Archivos"
        subtitle="Documentos, briefings y entregables. Solo se guardan los metadatos — no hay storage real conectado, así que el archivo en sí no se sube."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Archivos" }]}
        actions={
          <>
            <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); if (inputRef.current) inputRef.current.value = ""; }} />
            <Button variant="outline" onClick={() => inputRef.current?.click()}><Plus className="w-3.5 h-3.5" /> Registrar archivo</Button>
          </>
        }
      />

      {/* Modo de persistencia de METADATOS: base de datos real vs. local (fallback) */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {mode === "db" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(126,226,168,0.12)", color: A.positive, border: `1px solid ${A.border}` }}>
            <Database className="w-3 h-3" /> Metadatos en base de datos — sincroniza entre dispositivos
          </span>
        ) : mode === "local" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(240,195,106,0.10)", color: A.alert, border: `1px solid ${A.border}` }}>
            <HardDrive className="w-3 h-3" /> Metadatos guardados local — conecta Supabase para sincronizar
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: A.textDim, border: `1px solid ${A.border}` }}>
            Cargando…
          </span>
        )}
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        className="rounded-xl p-6 mb-4 text-center cursor-pointer transition-colors focus-ring"
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        style={{
          backgroundColor: dragOver ? "rgba(214,180,106,0.06)" : A.surface,
          border: `2px dashed ${dragOver ? A.gold : A.border}`,
          color: A.text2,
        }}
      >
        <Upload className="w-6 h-6 mx-auto mb-2" style={{ color: A.gold }} />
        <div className="font-display font-semibold text-sm" style={{ color: A.text }}>Arrastra archivos aquí o haz click</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] mt-1" style={{ color: A.textDim }}>
          Storage no configurado · solo se registra nombre, categoría y tamaño
        </div>
      </div>

      <div className="mb-4"><FilterChips value={filter} onChange={setFilter} options={CATS.map((c) => ({ value: c, label: c }))} /></div>

      <Panel title={`${filtered.length} archivos`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((f) => (
            <div key={f.id} className="card-3d p-4 rounded-xl relative group" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <button onClick={() => removeFile(f.id)} aria-label="Eliminar" className="absolute top-2 right-2 p-1 rounded focus-ring opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: A.textDim }}>
                <Trash2 className="w-3.5 h-3.5" />
              </button>
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
    </>
  );
}
