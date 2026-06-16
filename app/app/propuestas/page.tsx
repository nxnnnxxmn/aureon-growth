"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, DataTable, StatusBadge, FilterChips } from "@/components/app/primitives";
import { PROPOSALS, CLIENTS } from "@/lib/internal/mock-data";
import type { ProposalStatus } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const STATUSES: (ProposalStatus | "Todas")[] = ["Todas", "Borrador", "Enviada", "En revisión", "Aprobada", "Rechazada", "Vencida"];
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const clientName = (id: string) => CLIENTS.find((c) => c.id === id)?.company || id;

export default function PropuestasPage() {
  const [filter, setFilter] = useState<ProposalStatus | "Todas">("Todas");
  const filtered = filter === "Todas" ? PROPOSALS : PROPOSALS.filter((p) => p.status === filter);

  return (
    <AppShell>
      <AppPageHeader
        title="Propuestas"
        subtitle="Propuestas comerciales por etapa. Mock interno."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Propuestas" }]}
        actions={<Button variant="outline"><Plus className="w-3.5 h-3.5" />Nueva propuesta</Button>}
      />
      <div className="mb-4"><FilterChips value={filter} onChange={setFilter} options={STATUSES.map((s) => ({ value: s, label: s }))} /></div>
      <DataTable
        rows={filtered}
        columns={[
          { key: "id", label: "ID", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>{r.id}</span> },
          { key: "clientId", label: "Cliente", render: (r) => <span className="text-sm">{clientName(r.clientId)}</span> },
          { key: "service", label: "Servicio" },
          { key: "value", label: "Valor", render: (r) => <span className="font-mono text-xs tabular-nums" style={{ color: A.gold }}>{money(r.value)}</span> },
          { key: "sentDate", label: "Enviada", render: (r) => <span className="font-mono text-xs">{r.sentDate || "—"}</span> },
          { key: "dueDate", label: "Vence", render: (r) => <span className="font-mono text-xs">{r.dueDate || "—"}</span> },
          { key: "probability", label: "Prob.", render: (r) => <span className="font-mono text-xs">{r.probability}%</span> },
          { key: "owner", label: "Owner" },
          { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
        ]}
      />
    </AppShell>
  );
}
