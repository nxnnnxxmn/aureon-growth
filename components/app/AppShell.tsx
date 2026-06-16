"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Inbox, Workflow, Users, FolderKanban, CheckSquare,
  Calendar, Layers, Bot, Settings2, FileText, ShieldCheck, Receipt,
  Calculator, LineChart, CreditCard, BarChart3, Folder, Sliders,
  HelpCircle, Search, Menu, X, ChevronRight, LogOut,
} from "lucide-react";
import { A } from "@/lib/ui";

const NAV = [
  { group: "Operación", items: [
    { href: "/app", label: "Dashboard", icon: LayoutDashboard },
    { href: "/app/solicitudes", label: "Solicitudes", icon: Inbox },
    { href: "/app/crm", label: "CRM", icon: Workflow },
    { href: "/app/clientes", label: "Clientes", icon: Users },
    { href: "/app/proyectos", label: "Proyectos", icon: FolderKanban },
    { href: "/app/tareas", label: "Tareas", icon: CheckSquare },
    { href: "/app/calendario", label: "Calendario", icon: Calendar },
  ]},
  { group: "Catálogo", items: [
    { href: "/app/servicios", label: "Servicios", icon: Layers },
    { href: "/app/agentes", label: "Agentes", icon: Bot },
    { href: "/app/operaciones", label: "Operaciones", icon: Settings2 },
  ]},
  { group: "Comercial", items: [
    { href: "/app/propuestas", label: "Propuestas", icon: FileText },
    { href: "/app/contratos", label: "Contratos", icon: ShieldCheck },
  ]},
  { group: "Finanzas", items: [
    { href: "/app/facturacion", label: "Facturación", icon: Receipt },
    { href: "/app/contabilidad", label: "Contabilidad", icon: Calculator },
    { href: "/app/finanzas", label: "Finanzas", icon: LineChart },
    { href: "/app/gastos", label: "Gastos", icon: CreditCard },
  ]},
  { group: "Sistema", items: [
    { href: "/app/reportes", label: "Reportes", icon: BarChart3 },
    { href: "/app/archivos", label: "Archivos", icon: Folder },
    { href: "/app/configuracion", label: "Configuración", icon: Sliders },
    { href: "/app/ayuda", label: "Ayuda", icon: HelpCircle },
  ]},
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);

  async function logout() {
    await fetch("/api/app-login", { method: "DELETE" });
    router.replace("/app/login");
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: A.bg, color: A.text }}>
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-[260px] shrink-0 flex flex-col border-r transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ backgroundColor: A.bg2, borderColor: A.border }}
      >
        {/* Brand */}
        <div className="px-5 py-4 flex items-center gap-3 border-b" style={{ borderColor: A.border }}>
          <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden>
            <rect width="32" height="32" rx="8" fill="#11101A" stroke="rgba(214,180,106,0.4)" strokeWidth="0.75" />
            <circle cx="16" cy="16" r="11" stroke={A.gold} strokeWidth="1.3" fill="none" opacity="0.8" />
            <circle cx="16" cy="16" r="6" fill="url(#sidebarCore)" />
            <circle cx="16" cy="5" r="2" fill={A.gold} />
            <defs>
              <linearGradient id="sidebarCore" x1="11" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={A.gold} />
                <stop offset="100%" stopColor={A.violet} />
              </linearGradient>
            </defs>
          </svg>
          <div className="leading-tight">
            <div className="font-display font-bold text-sm" style={{ color: A.text }}>Aureon</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: A.gold }}>Command Center</div>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden ml-auto p-1 rounded focus-ring" style={{ color: A.text2 }} aria-label="Cerrar menú">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {NAV.map((g) => (
            <div key={g.group}>
              <div className="px-3 mb-1.5 font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: A.textDim }}>{g.group}</div>
              <div className="space-y-0.5">
                {g.items.map((it) => {
                  const isActive = pathname === it.href || (it.href !== "/app" && pathname.startsWith(it.href + "/"));
                  return (
                    <Link key={it.href} href={it.href} className="group flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors focus-ring" style={{
                      backgroundColor: isActive ? "rgba(214,180,106,0.10)" : "transparent",
                      color: isActive ? A.text : A.text2,
                      border: `1px solid ${isActive ? A.borderActive : "transparent"}`,
                    }}>
                      <it.icon className="w-4 h-4" style={{ color: isActive ? A.gold : A.text2 }} strokeWidth={1.6} />
                      <span className="flex-1 truncate">{it.label}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5" style={{ color: A.gold }} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-3 border-t" style={{ borderColor: A.border }}>
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl" style={{ backgroundColor: A.surface, border: `1px solid ${A.border}` }}>
            <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `linear-gradient(135deg, ${A.gold}, ${A.violet})`, color: A.bg }}>JL</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-display font-semibold truncate" style={{ color: A.text }}>Juan L.</div>
              <div className="text-[10px] truncate" style={{ color: A.textDim }}>Owner · Aureon</div>
            </div>
            <button onClick={logout} className="p-1.5 rounded focus-ring transition-colors hover:bg-white/5" style={{ color: A.text2 }} aria-label="Cerrar sesión" title="Cerrar sesión">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} aria-hidden />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 backdrop-blur-md border-b" style={{ backgroundColor: "rgba(13,11,24,0.85)", borderColor: A.border }}>
          <div className="flex items-center gap-3 px-4 lg:px-8 h-14">
            <button onClick={() => setOpen(true)} className="lg:hidden p-1.5 rounded focus-ring" style={{ color: A.text2 }} aria-label="Abrir menú">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1 relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: A.textDim }} />
              <input
                type="search"
                placeholder="Buscar clientes, proyectos, leads, facturas…"
                className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none transition-colors"
                style={{ backgroundColor: A.surface, border: `1px solid ${A.border}`, color: A.text }}
              />
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.16em]" style={{ backgroundColor: "rgba(126,226,168,0.12)", color: A.positive }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: A.positive }} /> Mock data
            </span>
          </div>
        </header>

        <main className="px-4 lg:px-8 py-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
