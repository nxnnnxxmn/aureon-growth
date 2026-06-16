import { Building2, Mail, Shield, Users as UsersIcon } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { AppPageHeader, Panel, StatusBadge } from "@/components/app/primitives";
import { USERS } from "@/lib/internal/mock-data";
import { A } from "@/lib/ui";

export default function ConfiguracionPage() {
  return (
    <AppShell>
      <AppPageHeader
        title="Configuración"
        subtitle="Datos de la agencia, usuarios, roles, categorías financieras y preferencias."
        breadcrumbs={[{ label: "Aureon", href: "/app" }, { label: "Configuración" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Panel title="Datos de la empresa">
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3"><Building2 className="w-3.5 h-3.5" style={{ color: A.gold }} /><span style={{ color: A.text }}>Aureon Growth Services</span></li>
            <li className="flex items-center gap-3"><Mail className="w-3.5 h-3.5" style={{ color: A.gold }} /><a href="mailto:aureongrowthservices@outlook.com" style={{ color: A.text }}>aureongrowthservices@outlook.com</a></li>
            <li className="flex items-center gap-3"><Shield className="w-3.5 h-3.5" style={{ color: A.gold }} /><span style={{ color: A.text }}>Bogotá, Colombia</span></li>
          </ul>
          <p className="text-xs mt-4" style={{ color: A.textDim }}>El correo oficial es el canal de notificaciones internas y de contacto público.</p>
        </Panel>

        <Panel title="Seguridad">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span style={{ color: A.text }}>Password gate (ADMIN_PASSWORD)</span><StatusBadge status="Activo" /></li>
            <li className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span style={{ color: A.text }}>NextAuth / Supabase Auth</span><StatusBadge status="Borrador" /></li>
            <li className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span style={{ color: A.text }}>Robots disallow /app</span><StatusBadge status="Activo" /></li>
            <li className="flex items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}><span style={{ color: A.text }}>2FA</span><StatusBadge status="Borrador" /></li>
          </ul>
          <p className="text-xs mt-4" style={{ color: A.textDim }}>Reemplazar la contraseña interina por NextAuth, Supabase Auth o Clerk antes de uso real.</p>
        </Panel>
      </div>

      <Panel title="Usuarios y roles">
        <ul className="space-y-2">
          {USERS.map((u) => (
            <li key={u.id} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ backgroundColor: A.bg2, border: `1px solid ${A.border}` }}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: `linear-gradient(135deg, ${A.gold}, ${A.violet})`, color: A.bg }}>{u.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-sm" style={{ color: A.text }}>{u.name}</div>
                <div className="text-xs" style={{ color: A.textDim }}>{u.email}</div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(214,180,106,0.12)", color: A.gold }}>{u.role}</span>
              <span className="font-mono text-[10px]" style={{ color: A.text2 }}>{u.department}</span>
              <StatusBadge status={u.active ? "Activo" : "Pausado"} />
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: A.textDim }}><UsersIcon className="w-3.5 h-3.5" /> Roles disponibles: Owner · Admin · Strategy · Design · Performance · Automation · Finance · Viewer</div>
      </Panel>
    </AppShell>
  );
}
