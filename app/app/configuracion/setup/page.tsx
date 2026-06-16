"use client";

import { useEffect, useState } from "react";
import { Database, FlaskConical, Save, Trash2, Building2 } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Panel, Button, StatusBadge } from "@/components/app/primitives";
import DataStatus from "@/components/app/DataStatus";
import { enableDemo, disableDemo, isDemoActive } from "@/lib/internal/data-source";
import { useLocal } from "@/lib/internal/storage";
import { A } from "@/lib/ui";

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none focus:border-[rgba(214,180,106,0.55)]";

interface Setup {
  company: string; email: string; phone: string; currency: string; country: string; timezone: string;
  serviceCats: string; expenseCats: string;
}
const DEFAULT_SETUP: Setup = {
  company: "Aureon Growth Services", email: "aureongrowthservices@outlook.com", phone: "",
  currency: "USD", country: "Colombia", timezone: "America/Bogota",
  serviceCats: "Brand Authority, Acquisition Engine, Revenue Automation, Growth Intelligence",
  expenseCats: "Software, Freelancers, Hosting, Herramientas IA, Publicidad, Operación, Impuestos por revisar",
};

export default function SetupPage() {
  const [setup, setSetup] = useLocal<Setup>("aureon_setup_v1", DEFAULT_SETUP);
  const [draft, setDraft] = useState<Setup>(setup);
  const [demo, setDemo] = useState(false);
  const [flash, setFlash] = useState("");

  useEffect(() => { setDemo(isDemoActive()); setDraft(setup); /* eslint-disable-next-line */ }, []);

  function save() { setSetup(draft); setFlash("Configuración guardada ✓"); setTimeout(() => setFlash(""), 1600); }
  function turnOnDemo() { enableDemo(); setDemo(true); setFlash("Modo demo activado · recarga los módulos para ver datos de muestra"); setTimeout(() => setFlash(""), 2600); }
  function turnOffDemo() { disableDemo(); setDemo(false); setFlash("Modo demo desactivado · datos de muestra eliminados"); setTimeout(() => setFlash(""), 2600); }

  return (
    <AppShell>
      <AppPageHeader
        title="Configuración inicial"
        subtitle="Prepara los datos base de Aureon Command Center y controla el modo demo."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Configuración", href: "/app/configuracion" }, { label: "Setup" }]}
      />

      <div className="mb-6"><DataStatus /></div>
      {flash && <div className="mb-4 rounded-xl px-4 py-2.5 text-sm font-display font-semibold" style={{ backgroundColor: "rgba(126,226,168,0.12)", color: A.positive, border: `1px solid ${A.border}` }}>{flash}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="Datos de la empresa" action={<Building2 className="w-4 h-4" style={{ color: A.gold }} />}>
          <div className="space-y-3">
            {([["company", "Nombre de empresa"], ["email", "Correo oficial"], ["phone", "Teléfono"], ["currency", "Moneda"], ["country", "País"], ["timezone", "Zona horaria"]] as [keyof Setup, string][]).map(([k, label]) => (
              <label key={k} className="block">
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>{label}</span>
                <input className={inputClass} style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }} value={draft[k]} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} />
              </label>
            ))}
            <label className="block">
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Categorías de servicios</span>
              <textarea rows={2} className={inputClass} style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text, resize: "vertical" }} value={draft.serviceCats} onChange={(e) => setDraft({ ...draft, serviceCats: e.target.value })} />
            </label>
            <label className="block">
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Categorías de gastos</span>
              <textarea rows={2} className={inputClass} style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text, resize: "vertical" }} value={draft.expenseCats} onChange={(e) => setDraft({ ...draft, expenseCats: e.target.value })} />
            </label>
            <div className="flex justify-end"><Button onClick={save}><Save className="w-3.5 h-3.5" /> Guardar</Button></div>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Modo demo" action={<StatusBadge status={demo ? "Activo" : "Borrador"} />}>
            <p className="text-sm mb-4" style={{ color: A.text2 }}>
              El modo demo carga datos de muestra (clientes, leads, facturas) <strong style={{ color: A.text }}>solo para explorar la interfaz</strong>. Debe estar <strong style={{ color: A.text }}>desactivado</strong> al operar con datos reales.
            </p>
            <div className="flex flex-wrap gap-2">
              {!demo ? (
                <Button onClick={turnOnDemo}><FlaskConical className="w-3.5 h-3.5" /> Activar modo demo</Button>
              ) : (
                <Button variant="outline" onClick={turnOffDemo}><Trash2 className="w-3.5 h-3.5" /> Desactivar y limpiar datos demo</Button>
              )}
            </div>
            <p className="text-[11px] mt-3" style={{ color: A.textDim }}>Estado por defecto en producción: <strong style={{ color: A.text2 }}>desactivado</strong>.</p>
          </Panel>

          <Panel title="Base de datos & integraciones" action={<Database className="w-4 h-4" style={{ color: A.textDim }} />}>
            <ul className="space-y-2 text-sm">
              {[
                ["Base de datos (Supabase / PostgreSQL)", "Pendiente"],
                ["Autenticación (Supabase Auth / NextAuth / Clerk)", "Pendiente"],
                ["Storage de archivos", "Pendiente"],
                ["Proveedor de IA para agentes", "Pendiente"],
                ["Calendario (Google / Cal.com)", "Pendiente"],
                ["Facturación electrónica", "Pendiente"],
              ].map(([label, st]) => (
                <li key={label} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
                  <span className="text-xs" style={{ color: A.text }}>{label}</span>
                  <StatusBadge status={st} />
                </li>
              ))}
            </ul>
            <p className="text-[11px] mt-3" style={{ color: A.textDim }}>La capa de datos vive en <code>lib/internal/data-source.ts</code> y está lista para reemplazar localStorage por repositorios reales.</p>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
