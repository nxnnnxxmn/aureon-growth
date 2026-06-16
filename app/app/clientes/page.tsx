"use client";

import { useState } from "react";
import { Plus, X, Mail, Phone, Calendar, ExternalLink } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, StatusBadge, DataTable, Panel } from "@/components/app/primitives";
import { CLIENTS, PROJECTS, INVOICES, TASKS, FILES } from "@/lib/internal/mock-data";
import type { Client } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function ClientesPage() {
  const [selected, setSelected] = useState<Client | null>(null);

  return (
    <AppShell>
      <AppPageHeader
        title="Clientes"
        subtitle="Cuentas activas, pausadas y potenciales. Mock interno."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Clientes" }]}
        actions={<Button variant="outline"><Plus className="w-3.5 h-3.5" />Nuevo cliente</Button>}
      />

      <DataTable
        rows={CLIENTS}
        onRowClick={(r) => setSelected(r)}
        columns={[
          { key: "company", label: "Empresa", render: (r) => (<div><div className="font-display font-semibold text-sm">{r.company}</div><div className="text-xs" style={{ color: A.textDim }}>{r.contact}</div></div>) },
          { key: "email", label: "Email", render: (r) => <a href={`mailto:${r.email}`} className="text-xs" style={{ color: A.gold }}>{r.email}</a> },
          { key: "services", label: "Servicios", render: (r) => <span className="text-xs">{r.services.join(", ")}</span> },
          { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
          { key: "monthlyValue", label: "Valor mensual", render: (r) => <span className="font-mono text-xs tabular-nums" style={{ color: A.gold }}>{money(r.monthlyValue)}</span> },
          { key: "startDate", label: "Inicio", render: (r) => <span className="font-mono text-xs">{r.startDate}</span> },
          { key: "projects", label: "Proyectos", render: (r) => <span className="text-xs">{r.projects.length}</span> },
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
                <div className="font-display font-bold text-lg" style={{ color: A.text }}>{selected.startDate}</div>
              </div>
            </div>

            <Panel title="Contacto">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" style={{ color: A.gold }} /><a href={`mailto:${selected.email}`} style={{ color: A.text }}>{selected.email}</a></div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" style={{ color: A.gold }} /><span style={{ color: A.text }}>{selected.phone}</span></div>
                <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" style={{ color: A.gold }} /><span style={{ color: A.text }}>Inicio: {selected.startDate}</span></div>
              </div>
            </Panel>

            <Panel title="Proyectos vinculados" className="mt-4">
              <ul className="space-y-2">
                {PROJECTS.filter((p) => p.clientId === selected.id).map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                    <span className="text-sm" style={{ color: A.text }}>{p.name}</span>
                    <StatusBadge status={p.status} />
                  </li>
                ))}
                {PROJECTS.filter((p) => p.clientId === selected.id).length === 0 && <li className="text-xs" style={{ color: A.textDim }}>Sin proyectos asociados.</li>}
              </ul>
            </Panel>

            <Panel title="Facturación" className="mt-4">
              <ul className="space-y-2">
                {INVOICES.filter((i) => i.clientId === selected.id).map((i) => (
                  <li key={i.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                    <span className="font-mono text-xs" style={{ color: A.gold }}>{i.number}</span>
                    <span className="text-xs" style={{ color: A.text }}>{money(i.total)}</span>
                    <StatusBadge status={i.status} />
                  </li>
                ))}
                {INVOICES.filter((i) => i.clientId === selected.id).length === 0 && <li className="text-xs" style={{ color: A.textDim }}>Sin facturas.</li>}
              </ul>
            </Panel>

            <Panel title="Tareas" className="mt-4">
              <ul className="space-y-2">
                {TASKS.filter((t) => t.clientId === selected.id).slice(0, 5).map((t) => (
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
    </AppShell>
  );
}
