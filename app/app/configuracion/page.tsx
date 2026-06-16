"use client";

import { useState } from "react";
import { Building2, Mail, Shield, Users as UsersIcon, Save, Plus, Trash2 } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Panel, StatusBadge, Button } from "@/components/app/primitives";
import { useLocal } from "@/lib/internal/storage";
import type { Role, User } from "@/lib/internal/types";
import { A } from "@/lib/ui";

const ROLES: Role[] = ["Owner", "Admin", "Strategy", "Design", "Performance", "Automation", "Finance", "Viewer"];

// Honest default: only the account owner. No fabricated team members.
const DEFAULT_USERS: User[] = [
  { id: "owner", name: "Owner", email: "aureongrowthservices@outlook.com", role: "Owner", department: "Dirección", active: true },
];

const inputClass = "w-full rounded-lg px-3 py-2 text-sm outline-none focus:border-[rgba(214,180,106,0.55)]";

interface CompanyInfo {
  name: string;
  email: string;
  location: string;
  tagline: string;
}

const DEFAULT_COMPANY: CompanyInfo = {
  name: "Aureon Growth Services",
  email: "aureongrowthservices@outlook.com",
  location: "Bogotá, Colombia",
  tagline: "Estrategia, tecnología y performance para crecimiento medible.",
};

export default function ConfiguracionPage() {
  const [company, setCompany] = useLocal<CompanyInfo>("aureon_company_v1", DEFAULT_COMPANY);
  const [draft, setDraft] = useState<CompanyInfo>(company);
  const [users, setUsers] = useLocal<User[]>("aureon_users_v1", DEFAULT_USERS);
  const [savedFlash, setSavedFlash] = useState(false);

  function saveCompany() {
    setCompany(draft);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  }

  function toggleUser(id: string) {
    setUsers((arr) => arr.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
  }

  function updateUserRole(id: string, role: Role) {
    setUsers((arr) => arr.map((u) => (u.id === id ? { ...u, role } : u)));
  }

  function addUser() {
    const id = `u${users.length + 1}-${Date.now().toString().slice(-4)}`;
    setUsers((arr) => [...arr, { id, name: "Nuevo miembro", email: "nuevo@aureon.local", role: "Viewer", department: "Operaciones", active: true }]);
  }

  function removeUser(id: string) {
    setUsers((arr) => arr.filter((u) => u.id !== id));
  }

  return (
    <AppShell>
      <AppPageHeader
        title="Configuración"
        subtitle="Datos de la agencia, usuarios, roles, categorías financieras y preferencias. Cambios guardados en localStorage."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Configuración" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Panel title="Datos de la empresa" action={
          savedFlash ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: A.positive }}>Guardado ✓</span>
          ) : null
        }>
          <div className="space-y-3">
            <label className="block">
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Nombre legal</span>
              <input className={inputClass} style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </label>
            <label className="block">
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Correo oficial</span>
              <input type="email" className={inputClass} style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }} value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
            </label>
            <label className="block">
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Ubicación</span>
              <input className={inputClass} style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text }} value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} />
            </label>
            <label className="block">
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5" style={{ color: A.textDim }}>Tagline</span>
              <textarea rows={2} className={inputClass} style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text, resize: "vertical" }} value={draft.tagline} onChange={(e) => setDraft({ ...draft, tagline: e.target.value })} />
            </label>
            <div className="pt-2 flex items-center justify-end">
              <Button onClick={saveCompany}><Save className="w-3.5 h-3.5" /> Guardar</Button>
            </div>
          </div>
          <p className="text-xs mt-4" style={{ color: A.textDim }}>
            Estos datos se usan como referencia interna del Command Center. La web pública mantiene su propio canonical y JSON-LD.
          </p>
        </Panel>

        <Panel title="Seguridad">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <div>
                <div style={{ color: A.text }}>Password gate</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>ADMIN_PASSWORD env</div>
              </div>
              <StatusBadge status="Activo" />
            </li>
            <li className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <div>
                <div style={{ color: A.text }}>NextAuth / Supabase Auth</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>Pendiente para producción</div>
              </div>
              <StatusBadge status="Borrador" />
            </li>
            <li className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <div>
                <div style={{ color: A.text }}>Robots disallow /app</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>/app, /admin, /command-center</div>
              </div>
              <StatusBadge status="Activo" />
            </li>
            <li className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <div>
                <div style={{ color: A.text }}>2FA</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: A.textDim }}>Pendiente con el proveedor de auth</div>
              </div>
              <StatusBadge status="Borrador" />
            </li>
          </ul>
        </Panel>
      </div>

      <Panel title="Usuarios y roles" action={<Button variant="outline" onClick={addUser}><Plus className="w-3.5 h-3.5" /> Añadir</Button>}>
        <ul className="space-y-2">
          {users.map((u) => (
            <li key={u.id} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: `linear-gradient(135deg, ${A.gold}, ${A.violet})`, color: A.bg }}>
                {u.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-sm" style={{ color: A.text }}>{u.name}</div>
                <div className="text-xs truncate" style={{ color: A.textDim }}>{u.email}</div>
              </div>
              <select
                value={u.role}
                onChange={(e) => updateUserRole(u.id, e.target.value as Role)}
                className="font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded-full focus-ring"
                style={{ backgroundColor: "rgba(214,180,106,0.12)", color: A.gold, border: `1px solid ${A.border}` }}
              >
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <span className="hidden sm:inline font-mono text-[10px]" style={{ color: A.text2 }}>{u.department}</span>
              <button onClick={() => toggleUser(u.id)} className="focus-ring rounded">
                <StatusBadge status={u.active ? "Activo" : "Pausado"} />
              </button>
              <button onClick={() => removeUser(u.id)} className="p-1.5 rounded focus-ring transition-colors hover:bg-white/5" style={{ color: A.textDim }} aria-label="Eliminar">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: A.textDim }}>
          <UsersIcon className="w-3.5 h-3.5" /> Roles disponibles: {ROLES.join(" · ")}
        </div>
      </Panel>

      <Panel title="Referencia rápida" className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-3"><Building2 className="w-3.5 h-3.5" style={{ color: A.gold }} /><span style={{ color: A.text }}>{company.name}</span></div>
          <div className="flex items-center gap-3"><Mail className="w-3.5 h-3.5" style={{ color: A.gold }} /><a href={`mailto:${company.email}`} style={{ color: A.text }}>{company.email}</a></div>
          <div className="flex items-center gap-3"><Shield className="w-3.5 h-3.5" style={{ color: A.gold }} /><span style={{ color: A.text }}>{company.location}</span></div>
        </div>
      </Panel>
    </AppShell>
  );
}
