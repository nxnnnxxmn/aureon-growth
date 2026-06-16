"use client";

import { Plus } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Button, DataTable, StatusBadge } from "@/components/app/primitives";
import { CONTRACTS, CLIENTS } from "@/lib/internal/mock-data";
import { A } from "@/lib/ui";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const clientName = (id: string) => CLIENTS.find((c) => c.id === id)?.company || id;

export default function ContratosPage() {
  return (
    <AppShell>
      <AppPageHeader
        title="Contratos"
        subtitle="Acuerdos comerciales, estados y vencimientos. La firma legal real se integra con un proveedor externo."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Contratos" }]}
        actions={<Button variant="outline"><Plus className="w-3.5 h-3.5" />Nuevo contrato</Button>}
      />
      <DataTable
        rows={CONTRACTS}
        columns={[
          { key: "id", label: "ID", render: (r) => <span className="font-mono text-xs" style={{ color: A.gold }}>{r.id}</span> },
          { key: "clientId", label: "Cliente", render: (r) => clientName(r.clientId) },
          { key: "type", label: "Tipo" },
          { key: "startDate", label: "Inicio", render: (r) => <span className="font-mono text-xs">{r.startDate}</span> },
          { key: "endDate", label: "Fin", render: (r) => <span className="font-mono text-xs">{r.endDate || "—"}</span> },
          { key: "value", label: "Valor", render: (r) => <span className="font-mono text-xs tabular-nums" style={{ color: A.gold }}>{money(r.value)}</span> },
          { key: "renewal", label: "Renovación", render: (r) => <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.text2 }}>{r.renewal}</span> },
          { key: "status", label: "Estado", render: (r) => <StatusBadge status={r.status} /> },
        ]}
      />
    </AppShell>
  );
}
