"use client";

import { useState } from "react";
import { Plus, X, Mail, Phone, Calendar, ExternalLink, Save, Database, HardDrive } from "lucide-react";
import { AppPageHeader, Button, StatusBadge, DataTable, Panel } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { FILES } from "@/lib/internal/mock-data";
import { useClients } from "@/lib/internal/clients-store";
import { useTasks } from "@/lib/internal/tasks-store";
import { useProjects } from "@/lib/internal/projects-store";
import { useInvoices } from "@/lib/internal/invoices-store";
import type { Client, ClientStatus } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const STATUSES: ClientStatus[] = ["Activo", "Pausado", "Potencial", "Cerrado"];
const SERVICES = ["Brand Authority System", "Acquisition Engine", "Revenue Automation", "Growth Intelligence"];

const empty: Omit<Client, "id"> = {
  company: "", contact: "", email: "", phone: "", services: [],
  status: "Potencial", startDate: "", monthlyValue: 0, projects: [], pendingInvoices: 0, notes: "",
};

export default function ClientesPage() {
  const { clients, mode, create: createClient } = useClients();
  const { tasks } = useTasks();
  const { projects } = useProjects();
  const { invoices } = useInvoices();
  const [selected, setSelected] = useState<Client | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Omit<Client, "id">>(empty);
  const [servicesText, setServicesText] = useState("");

  async function create() {
    const services = servicesText.split(",").map((s) => s.trim()).filter(Boolean);
    const ok = await createClient({ ...draft, services });
    if (!ok) return;
    setModalOpen(false);
    setDraft(empty);
    setServicesText("");
  }

  return (
    <>
      <AppPageHeader
        title="Clientes"
        subtitle="Cuentas activas, pausadas y potenciales."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Clientes" }]}
        actions={<Button variant="outline" onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Nuevo cliente</Button>}
      />

      {/* Modo de persistencia: base de datos real vs. local (fallback) */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {mode === "db" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(126,226,168,0.12)", color: A.positive, border: `1px solid ${A.border}` }}>
            <Database className="w-3 h-3" /> Base de datos conectada — sincroniza entre dispositivos
          </span>
        ) : mode === "local" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(240,195,106,0.10)", color: A.alert, border: `1px solid ${A.border}` }}>
            <HardDrive className="w-3 h-3" /> Guardado local — conecta Supabase para sincronizar
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: A.textDim, border: `1px solid ${A.border}` }}>
            Cargando…
          </span>
        )}
      </div>

      <DataTable
        rows={clients}
        onRowClick={(r) => setSelected(r)}
        columns={[
          { key: "company", label: "Empresa", render: (r) => (<div><div className="font-display font-semibold text-sm">{r.company}</div><div className="text-xs" style={{ color: A.textDim }}>{r.contact}</div></div>) },
          { key: "email", label: "Email", render: (r) => <a href={`mailto:${r.email}`} className="text-xs" style={{ color: A.gold }}>{r.email}</a> },
          { key: "services", label: "Servicios", render: (r) => <span className="text-xs">{r.services.join(", ")}</span> },
          { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
          { key: "monthlyValue", label: "Valor mensual", render: (r) => <span className="font-mono text-xs tabular-nums" style={{ color: A.gold }}>{money(r.monthlyValue)}</span> },
          { key: "startDate", label: "Inicio", render: (r) => <span className="font-mono text-xs">{r.startDate || "—"}</span> },
          { key: "projects", label: "Proyectos", render: (r) => <span className="text-xs">{projects.filter((p) => p.clientId === r.id).length}</span> },
          { key: "pendingInvoices", label: "Facturas pend.", render: (r) => <span className="text-xs">{r.pendingInvoices}</span> },
        ]}
      />

      {selected && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setSelected(null)} aria-hidden />
          <aside className="fixed top-0 right-0 z-50 h-full w-full sm:w-[520px] overflow-y-auto p-6 border-l" style={{ backgroundColor: A.bg2, borderColor: A.border }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: A.gold }}>{selected.id}</div>
                <h2 className="font-display font-semibold text-xl" style={{ color: A.text }}>{selected.company}</h2>
                <div className="mt-2"><StatusBadge status={selected.status} /></div>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded focus-ring" style={{ color: A.text2 }}><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl p-3" style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: A.textDim }}>Valor mensual</div>
                <div className="font-display font-bold text-lg" style={{ color: A.gold }}>{money(selected.monthlyValue)}</div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1" style={{ color: A.textDim }}>Inicio</div>
                <div className="font-display font-bold text-lg" style={{ color: A.text }}>{selected.startDate || "—"}</div>
              </div>
            </div>

            <Panel title="Contacto">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" style={{ color: A.gold }} /><a href={`mailto:${selected.email}`} style={{ color: A.text }}>{selected.email}</a></div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" style={{ color: A.gold }} /><span style={{ color: A.text }}>{selected.phone}</span></div>
                <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" style={{ color: A.gold }} /><span style={{ color: A.text }}>Inicio: {selected.startDate || "—"}</span></div>
              </div>
            </Panel>

            <Panel title="Proyectos vinculados" className="mt-4">
              <ul className="space-y-2">
                {projects.filter((p) => p.clientId === selected.id).map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                    <span className="text-sm" style={{ color: A.text }}>{p.name}</span>
                    <StatusBadge status={p.status} />
                  </li>
                ))}
                {projects.filter((p) => p.clientId === selected.id).length === 0 && <li className="text-xs" style={{ color: A.textDim }}>Sin proyectos asociados.</li>}
              </ul>
            </Panel>

            <Panel title="Facturación" className="mt-4">
              <ul className="space-y-2">
                {invoices.filter((i) => i.clientId === selected.id).map((i) => (
                  <li key={i.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                    <span className="font-mono text-xs" style={{ color: A.gold }}>{i.number}</span>
                    <span className="text-xs" style={{ color: A.text }}>{money(i.total)}</span>
                    <StatusBadge status={i.status} />
                  </li>
                ))}
                {invoices.filter((i) => i.clientId === selected.id).length === 0 && <li className="text-xs" style={{ color: A.textDim }}>Sin facturas.</li>}
              </ul>
            </Panel>

            <Panel title="Tareas" className="mt-4">
              <ul className="space-y-2">
                {tasks.filter((t) => t.clientId === selected.id).slice(0, 5).map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                    <span className="text-xs" style={{ color: A.text }}>{t.title}</span>
                    <StatusBadge status={t.status} />
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Archivos" className="mt-4">
              <ul className="space-y-2">
                {FILES.filter((f) => f.clientId === selected.id).map((f) => (
                  <li key={f.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                    <span className="text-xs flex items-center gap-2" style={{ color: A.text }}><ExternalLink className="w-3 h-3" style={{ color: A.gold }} />{f.name}</span>
                    <span className="font-mono text-[10px]" style={{ color: A.textDim }}>{f.size}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </aside>
        </>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo cliente" size="lg"
        footer={<><Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button><Button onClick={create}><Save className="w-3.5 h-3.5" /> Guardar</Button></>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Empresa" required><input className={inputClass} style={inputStyle} value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} required /></FormField>
          <FormField label="Contacto principal" required><input className={inputClass} style={inputStyle} value={draft.contact} onChange={(e) => setDraft({ ...draft, contact: e.target.value })} required /></FormField>
          <FormField label="Email" required><input type="email" className={inputClass} style={inputStyle} value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} required /></FormField>
          <FormField label="Teléfono"><input className={inputClass} style={inputStyle} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></FormField>
          <FormField label="Estado"><select className={inputClass} style={inputStyle} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as ClientStatus })}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Inicio"><input type="date" className={inputClass} style={inputStyle} value={draft.startDate} onChange={(e) => setDraft({ ...draft, startDate: e.target.value })} /></FormField>
          <FormField label="Valor mensual (USD)"><input type="number" className={inputClass} style={inputStyle} value={draft.monthlyValue} onChange={(e) => setDraft({ ...draft, monthlyValue: Number(e.target.value) || 0 })} /></FormField>
          <FormField label="Facturas pendientes"><input type="number" className={inputClass} style={inputStyle} value={draft.pendingInvoices} onChange={(e) => setDraft({ ...draft, pendingInvoices: Number(e.target.value) || 0 })} /></FormField>
          <div className="sm:col-span-2">
            <FormField label="Servicios" hint={`Coma separados — ej: ${SERVICES.slice(0, 2).join(", ")}`}>
              <input className={inputClass} style={inputStyle} value={servicesText} onChange={(e) => setServicesText(e.target.value)} placeholder="Brand Authority System, Acquisition Engine" />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField label="Notas"><textarea rows={3} className={inputClass} style={{ ...inputStyle, resize: "vertical" }} value={draft.notes || ""} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} /></FormField>
          </div>
        </div>
      </Modal>
    </>
  );
}
