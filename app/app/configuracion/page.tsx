"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  User as UserIcon, Shield, Palette, MessageCircle, FileText, Tag,
  DollarSign, Users as UsersIcon, KeyRound, Save, Plus, Trash2, Check,
  Copy, Eye, EyeOff, LogOut, Zap, Instagram, Facebook, Mail, Lock,
} from "lucide-react";
import { AppPageHeader, Panel, Button, FilterChips, StatusBadge } from "@/components/app/primitives";
import { useLocal } from "@/lib/internal/storage";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import { useCfg, CFG, DEFAULTS, applyAppearance, type Appearance } from "@/lib/internal/settings";
import { useRole } from "@/lib/internal/role";
import type { Role, User } from "@/lib/internal/types";
import { A } from "@/lib/ui";

/* ─────────────────────────────────────────────────────────────────
 * AJUSTES — perfil, seguridad, apariencia, canales (WhatsApp/omnicanal),
 * plantillas, campos y etiquetas, deals y moneda, equipo y API keys.
 * Equipo y API Keys: solo visibles para el Owner (CEO).
 * ───────────────────────────────────────────────────────────────── */

const ROLES: Role[] = ["Owner", "Admin", "Strategy", "Design", "Performance", "Automation", "Finance", "Viewer"];
type Tab = "perfil" | "seguridad" | "apariencia" | "canales" | "plantillas" | "campos" | "deals" | "equipo" | "apikeys";

type MsgTemplate = { id: string; name: string; body: string; intents: string[] };
type TagDef = { id: string; name: string; color: string };
type FieldDef = { id: string; name: string; type: "texto" | "número" | "fecha" };
type ApiKey = { id: string; name: string; key: string; createdAt: number; active: boolean };

const uid = () => Math.random().toString(36).slice(2, 10);
const inputCls = "w-full rounded-lg px-3 py-2 text-sm outline-none focus:border-[rgba(214,180,106,0.55)]";
const inputSty: React.CSSProperties = { backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text };
const TAG_COLORS = ["#D6B46A", "#7C5CBF", "#4D7CFE", "#4FB6C7", "#7EE2A8", "#F0A3C4", "#F0C36A", "#E08577"];

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] mb-1.5" style={{ color: A.textDim }}>{label}</span>
      {children}
      {hint && <span className="block text-[10px] mt-1" style={{ color: A.textDim }}>{hint}</span>}
    </label>
  );
}

export default function ConfiguracionPage() {
  const { isOwner, role } = useRole();
  const [tab, setTab] = useState<Tab>("perfil");
  const [flash, setFlash] = useState("");
  const ok = (msg: string) => { setFlash(msg); setTimeout(() => setFlash(""), 2500); };

  /* Stores */
  const [profile, setProfile] = useCfg(CFG.profile, DEFAULTS.profile);
  const [appearance, setAppearance] = useCfg(CFG.appearance, DEFAULTS.appearance);
  const [wa, setWa] = useCfg(CFG.whatsapp, DEFAULTS.whatsapp);
  const [channels, setChannels] = useCfg(CFG.channels, DEFAULTS.channels);
  const [commerce, setCommerce] = useCfg(CFG.commerce, DEFAULTS.commerce);
  const [templates, setTemplates] = useStore<MsgTemplate>(STORE_KEYS.msgTemplates);
  const [tags, setTags] = useStore<TagDef>(STORE_KEYS.tags);
  const [fields, setFields] = useStore<FieldDef>(STORE_KEYS.fields);
  const [apikeys, setApikeys] = useStore<ApiKey>(STORE_KEYS.apikeys);
  const [users, setUsers] = useLocal<User[]>("aureon_users_v1", [
    { id: "owner", name: "Juan L.", email: "aureongrowthservices@outlook.com", role: "Owner", department: "Dirección", active: true },
  ]);

  const [showToken, setShowToken] = useState(false);
  const [newTag, setNewTag] = useState({ name: "", color: TAG_COLORS[0] });
  const [newField, setNewField] = useState({ name: "", type: "texto" as FieldDef["type"] });
  const [newStage, setNewStage] = useState("");
  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  useEffect(() => { applyAppearance(appearance); }, [appearance]);

  const logoutAll = async () => {
    await fetch("/api/app-login", { method: "DELETE" });
    window.location.href = "/app/login";
  };

  const tabs: { value: Tab; label: string; ownerOnly?: boolean }[] = [
    { value: "perfil", label: "Perfil" },
    { value: "seguridad", label: "Login y seguridad" },
    { value: "apariencia", label: "Apariencia" },
    { value: "canales", label: "WhatsApp y omnicanal" },
    { value: "plantillas", label: "Plantillas" },
    { value: "campos", label: "Campos y etiquetas" },
    { value: "deals", label: "Deals y moneda" },
    { value: "equipo", label: "Equipo", ownerOnly: true },
    { value: "apikeys", label: "API Keys", ownerOnly: true },
  ];
  const visibleTabs = tabs.filter((t) => !t.ownerOnly || isOwner);

  return (
    <>
      <AppPageHeader
        title="Ajustes"
        subtitle={`Sesión: ${role === "owner" ? "Owner (acceso total)" : "Miembro del equipo (acceso operativo)"}.`}
        breadcrumbs={[{ label: "Command Center", href: "/app" }, { label: "Ajustes" }]}
      />

      <div className="mb-6">
        <FilterChips options={visibleTabs.map((t) => ({ value: t.value, label: t.label }))} value={tab} onChange={setTab} />
      </div>

      {flash && <p className="mb-4 text-xs inline-flex items-center gap-1.5" style={{ color: A.positive }} role="status"><Check className="w-3.5 h-3.5" /> {flash}</p>}

      {/* ═══ PERFIL ═══ */}
      {tab === "perfil" && (
        <Panel title="Tu perfil">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <Field label="Nombre"><input className={inputCls} style={inputSty} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></Field>
            <Field label="Cargo"><input className={inputCls} style={inputSty} value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} /></Field>
            <Field label="Email"><input className={inputCls} style={inputSty} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></Field>
            <Field label="Teléfono"><input className={inputCls} style={inputSty} value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="+57 …" /></Field>
          </div>
          <Button className="mt-5" onClick={() => ok("Perfil guardado")}><Save className="w-3.5 h-3.5" /> Guardar</Button>
          <p className="mt-3 text-[10px]" style={{ color: A.textDim }}>El nombre y las iniciales se reflejan en la barra lateral. Cada persona edita su perfil en su propio navegador.</p>
        </Panel>
      )}

      {/* ═══ SEGURIDAD ═══ */}
      {tab === "seguridad" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Panel title="Acceso y roles">
            <div className="space-y-3 text-sm" style={{ color: A.text2 }}>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(214,180,106,0.07)", border: `1px solid ${A.borderActive}` }}>
                <Lock className="w-4 h-4 shrink-0" style={{ color: A.gold }} />
                <div>
                  <div className="font-display font-semibold" style={{ color: A.text }}>Owner (CEO) — acceso total</div>
                  <div className="text-xs">Entra con <code className="font-mono text-[11px]">ADMIN_PASSWORD</code>. Ve Equipo, API Keys y credenciales de canales.</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}` }}>
                <UsersIcon className="w-4 h-4 shrink-0" style={{ color: A.blue }} />
                <div>
                  <div className="font-display font-semibold" style={{ color: A.text }}>Miembros del equipo — acceso operativo</div>
                  <div className="text-xs">Entran con <code className="font-mono text-[11px]">MEMBER_PASSWORD</code> (configúrala como variable de entorno en Vercel). Sin secciones sensibles.</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed">
                Las contraseñas viven como variables de entorno del servidor — nunca en el código ni en el navegador. Para cambiar una: Vercel → Settings → Environment Variables → redeploy. Logins individuales por persona (con recuperación y 2FA) llegan con el backend de autenticación.
              </p>
            </div>
          </Panel>
          <Panel title="Sesión">
            <div className="space-y-3 text-sm" style={{ color: A.text2 }}>
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}` }}>
                <span>Rol de esta sesión</span>
                <span className="font-mono text-xs uppercase" style={{ color: isOwner ? A.gold : A.blue }}>{role}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}` }}>
                <span>Duración de sesión</span>
                <span className="font-mono text-xs" style={{ color: A.text }}>12 horas</span>
              </div>
              <Button variant="outline" onClick={logoutAll}><LogOut className="w-3.5 h-3.5" /> Cerrar sesión en este dispositivo</Button>
              <p className="text-[10px]" style={{ color: A.textDim }}>
                Datos y modo demo: <Link href="/app/configuracion/setup" className="underline" style={{ color: A.gold }}>gestión de datos del panel</Link>.
              </p>
            </div>
          </Panel>
        </div>
      )}

      {/* ═══ APARIENCIA ═══ */}
      {tab === "apariencia" && (
        <Panel title="Apariencia del Command Center">
          <div className="space-y-6 max-w-2xl">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: A.textDim }}>Color de acento</div>
              <div className="flex gap-2">
                {(["gold", "violet", "electric", "cyan"] as Appearance["accent"][]).map((acc) => {
                  const colors = { gold: "#D6B46A", violet: "#9F84D0", electric: "#4D7CFE", cyan: "#4FB6C7" };
                  return (
                    <button key={acc} onClick={() => setAppearance({ ...appearance, accent: acc })}
                      className="w-12 h-12 rounded-2xl focus-ring transition-transform hover:scale-105"
                      style={{ backgroundColor: colors[acc], border: appearance.accent === acc ? `3px solid #fff` : `2px solid ${A.border}` }}
                      aria-label={`Acento ${acc}`} />
                  );
                })}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: A.textDim }}>Densidad</div>
              <div className="flex gap-2">
                {(["comfortable", "compact"] as const).map((d) => (
                  <button key={d} onClick={() => setAppearance({ ...appearance, density: d })} className="px-4 py-2 rounded-full text-xs focus-ring"
                    style={{ backgroundColor: appearance.density === d ? "rgba(214,180,106,0.14)" : "rgba(255,255,255,0.04)", color: appearance.density === d ? A.gold : A.text2, border: `1px solid ${A.border}` }}>
                    {d === "comfortable" ? "Cómoda" : "Compacta"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: A.textDim }}>Animaciones</div>
              <div className="flex gap-2">
                {(["auto", "reduced"] as const).map((m) => (
                  <button key={m} onClick={() => setAppearance({ ...appearance, motion: m })} className="px-4 py-2 rounded-full text-xs focus-ring"
                    style={{ backgroundColor: appearance.motion === m ? "rgba(214,180,106,0.14)" : "rgba(255,255,255,0.04)", color: appearance.motion === m ? A.gold : A.text2, border: `1px solid ${A.border}` }}>
                    {m === "auto" ? "Automáticas" : "Reducidas"}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[10px]" style={{ color: A.textDim }}>Los cambios se aplican al instante y se guardan en este navegador.</p>
          </div>
        </Panel>
      )}

      {/* ═══ CANALES / OMNICANAL ═══ */}
      {tab === "canales" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Panel title="WhatsApp Business Cloud API (canal principal)">
            {!isOwner ? (
              <p className="text-sm" style={{ color: A.textDim }}>Las credenciales de canales solo las gestiona el Owner.</p>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: wa.phoneNumberId && wa.token ? A.positive : A.alert }} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: wa.phoneNumberId && wa.token ? A.positive : A.alert }}>
                    {wa.phoneNumberId && wa.token ? "Credenciales guardadas — listo para activar envío server-side" : "No conectado"}
                  </span>
                </div>
                <Field label="Phone Number ID" hint="Meta for Developers → WhatsApp → API Setup">
                  <input className={inputCls} style={inputSty} value={wa.phoneNumberId} onChange={(e) => setWa({ ...wa, phoneNumberId: e.target.value })} />
                </Field>
                <Field label="WABA ID (WhatsApp Business Account)">
                  <input className={inputCls} style={inputSty} value={wa.wabaId} onChange={(e) => setWa({ ...wa, wabaId: e.target.value })} />
                </Field>
                <Field label="Access Token" hint="Se guarda solo en este navegador. Para el envío desde el servidor: configúralo como WHATSAPP_TOKEN en Vercel.">
                  <div className="flex gap-2">
                    <input type={showToken ? "text" : "password"} className={inputCls} style={inputSty} value={wa.token} onChange={(e) => setWa({ ...wa, token: e.target.value })} />
                    <button onClick={() => setShowToken(!showToken)} className="px-3 rounded-lg focus-ring" style={{ ...inputSty }} aria-label="Mostrar token">
                      {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </Field>
                <Field label="Número visible"><input className={inputCls} style={inputSty} value={wa.displayPhone} onChange={(e) => setWa({ ...wa, displayPhone: e.target.value })} placeholder="+57 …" /></Field>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: "rgba(124,92,191,0.08)", border: `1px solid ${A.border}` }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: A.text }}>Respuesta automática de agentes</div>
                    <div className="text-[10px]" style={{ color: A.textDim }}>Responde al instante cada mensaje entrante con la plantilla que corresponda. Requiere webhook + envío server-side activos.</div>
                  </div>
                  <button onClick={() => setWa({ ...wa, autoReply: !wa.autoReply })} className="focus-ring rounded shrink-0 ml-3" style={{ color: wa.autoReply ? A.positive : A.textDim }} aria-label="Alternar respuesta automática">
                    <Zap className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-3 rounded-xl text-xs leading-relaxed" style={{ backgroundColor: "rgba(0,0,0,0.25)", border: `1px solid ${A.border}`, color: A.text2 }}>
                  <strong style={{ color: A.gold }}>Webhook (ya desplegado):</strong>
                  <code className="block font-mono text-[11px] mt-1 break-all" style={{ color: A.text }}>https://aureon-growth.vercel.app/api/whatsapp/webhook</code>
                  <span className="block mt-1.5">1. En Vercel crea <code>WHATSAPP_VERIFY_TOKEN</code> (cualquier frase secreta). 2. En Meta → WhatsApp → Configuration pega la URL y el mismo token. 3. Suscribe el campo <code>messages</code>. La verificación de Meta ya funciona contra este endpoint.</span>
                </div>
                <Button onClick={() => ok("Configuración de WhatsApp guardada")}><Save className="w-3.5 h-3.5" /> Guardar</Button>
              </div>
            )}
          </Panel>

          <Panel title="Omnicanal — todos los mensajes en el Inbox">
            <p className="text-xs leading-relaxed mb-4" style={{ color: A.text2 }}>
              El Inbox unifica los 5 canales. WhatsApp es el principal; los demás entran automáticamente al conectar cada API (todas de Meta salvo email).
            </p>
            <div className="space-y-2">
              {[
                { key: "whatsapp" as const, label: "WhatsApp", icon: MessageCircle, color: "#22C15E", state: wa.phoneNumberId && wa.token ? "credenciales guardadas" : "pendiente", fixed: true },
                { key: "instagram" as const, label: "Instagram DM", icon: Instagram, color: "#F0A3C4", state: channels.instagram ? "marcado para conectar" : "pendiente" },
                { key: "facebook" as const, label: "Facebook Messenger", icon: Facebook, color: "#4D7CFE", state: channels.facebook ? "marcado para conectar" : "pendiente" },
                { key: "email" as const, label: "Email (Outlook)", icon: Mail, color: "#8FAEFF", state: channels.email ? "marcado para conectar" : "pendiente" },
              ].map((c) => (
                <div key={c.key} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}` }}>
                  <c.icon className="w-4 h-4 shrink-0" style={{ color: c.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm" style={{ color: A.text }}>{c.label}</div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: /guardadas|conectar/.test(c.state) ? A.positive : A.textDim }}>{c.state}</div>
                  </div>
                  {!c.fixed && isOwner && (
                    <button
                      onClick={() => setChannels({ ...channels, [c.key]: !channels[c.key as "instagram" | "facebook" | "email"] })}
                      className="px-3 py-1.5 rounded-full text-[11px] focus-ring"
                      style={{ backgroundColor: "rgba(255,255,255,0.05)", color: A.text2, border: `1px solid ${A.border}` }}
                    >
                      {channels[c.key as "instagram" | "facebook" | "email"] ? "Quitar" : "Planear"}
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-[10px] leading-relaxed" style={{ color: A.textDim }}>
              Instagram y Messenger usan la misma app de Meta que WhatsApp (Graph API). Al tramitar las credenciales, los tres canales entran al mismo webhook y el Inbox los recibe en vivo con respuesta automática de agentes.
            </p>
          </Panel>
        </div>
      )}

      {/* ═══ PLANTILLAS ═══ */}
      {tab === "plantillas" && (
        <Panel title="Plantillas de mensajes (agentes, broadcasts e inbox)" action={
          <Button size="sm" onClick={() => setTemplates((arr) => [...arr, { id: uid(), name: "Nueva plantilla", body: "", intents: [] }])}><Plus className="w-3.5 h-3.5" /> Nueva</Button>
        }>
          {templates.length === 0 ? (
            <p className="text-sm py-6 text-center" style={{ color: A.textDim }}>Sin plantillas. Abre el Inbox una vez para sembrar las 5 de la casa, o crea la primera aquí.</p>
          ) : (
            <div className="space-y-3">
              {templates.map((t) => (
                <div key={t.id} className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}` }}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Field label="Nombre">
                      <input className={inputCls} style={inputSty} value={t.name} onChange={(e) => setTemplates((arr) => arr.map((x) => (x.id === t.id ? { ...x, name: e.target.value } : x)))} />
                    </Field>
                    <Field label="Intenciones (palabras clave, coma)" hint="El agente la sugiere cuando el mensaje las contiene">
                      <input className={inputCls} style={inputSty} value={t.intents.join(", ")} onChange={(e) => setTemplates((arr) => arr.map((x) => (x.id === t.id ? { ...x, intents: e.target.value.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean) } : x)))} />
                    </Field>
                    <div className="flex items-end justify-end">
                      <button onClick={() => setTemplates((arr) => arr.filter((x) => x.id !== t.id))} className="p-2 rounded focus-ring hover:bg-white/5" style={{ color: A.danger }} aria-label={`Eliminar ${t.name}`}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <Field label="Mensaje ({{nombre}} se personaliza)">
                    <textarea rows={3} className={inputCls} style={inputSty} value={t.body} onChange={(e) => setTemplates((arr) => arr.map((x) => (x.id === t.id ? { ...x, body: e.target.value } : x)))} />
                  </Field>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}

      {/* ═══ CAMPOS Y ETIQUETAS ═══ */}
      {tab === "campos" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Panel title="Etiquetas (tags)">
            <div className="flex gap-2 mb-4">
              <input className={inputCls} style={inputSty} value={newTag.name} onChange={(e) => setNewTag({ ...newTag, name: e.target.value })} placeholder="Ej: Odontología, VIP, Frío…" />
              <select className="rounded-lg px-2 text-sm outline-none" style={inputSty} value={newTag.color} onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}>
                {TAG_COLORS.map((c) => <option key={c} value={c} style={{ backgroundColor: c }}>{c}</option>)}
              </select>
              <Button size="sm" onClick={() => { if (newTag.name.trim()) { setTags((arr) => [...arr, { id: uid(), name: newTag.name.trim(), color: newTag.color }]); setNewTag({ name: "", color: TAG_COLORS[0] }); } }}><Plus className="w-3.5 h-3.5" /></Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: A.text, border: `1px solid ${t.color}` }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />{t.name}
                  <button onClick={() => setTags((arr) => arr.filter((x) => x.id !== t.id))} className="focus-ring rounded" style={{ color: A.textDim }} aria-label={`Eliminar ${t.name}`}><Trash2 className="w-3 h-3" /></button>
                </span>
              ))}
              {tags.length === 0 && <span className="text-xs" style={{ color: A.textDim }}>Sin etiquetas aún.</span>}
            </div>
          </Panel>
          <Panel title="Campos personalizados (contactos)">
            <div className="flex gap-2 mb-4">
              <input className={inputCls} style={inputSty} value={newField.name} onChange={(e) => setNewField({ ...newField, name: e.target.value })} placeholder="Ej: Nº de sillas, Ciudad…" />
              <select className="rounded-lg px-2 text-sm outline-none" style={inputSty} value={newField.type} onChange={(e) => setNewField({ ...newField, type: e.target.value as FieldDef["type"] })}>
                <option value="texto">Texto</option><option value="número">Número</option><option value="fecha">Fecha</option>
              </select>
              <Button size="sm" onClick={() => { if (newField.name.trim()) { setFields((arr) => [...arr, { id: uid(), ...newField, name: newField.name.trim() }]); setNewField({ name: "", type: "texto" }); } }}><Plus className="w-3.5 h-3.5" /></Button>
            </div>
            <ul className="space-y-2">
              {fields.map((f) => (
                <li key={f.id} className="flex items-center justify-between p-2.5 rounded-xl text-sm" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}`, color: A.text }}>
                  <span>{f.name} <span className="font-mono text-[10px]" style={{ color: A.textDim }}>({f.type})</span></span>
                  <button onClick={() => setFields((arr) => arr.filter((x) => x.id !== f.id))} className="p-1 rounded focus-ring hover:bg-white/5" style={{ color: A.danger }} aria-label={`Eliminar ${f.name}`}><Trash2 className="w-3.5 h-3.5" /></button>
                </li>
              ))}
              {fields.length === 0 && <li className="text-xs" style={{ color: A.textDim }}>Sin campos personalizados aún.</li>}
            </ul>
          </Panel>
        </div>
      )}

      {/* ═══ DEALS Y MONEDA ═══ */}
      {tab === "deals" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Panel title="Moneda">
            <div className="flex gap-2">
              {(["COP", "USD", "EUR", "MXN"] as const).map((cur) => (
                <button key={cur} onClick={() => { setCommerce({ ...commerce, currency: cur }); ok(`Moneda: ${cur}`); }} className="px-4 py-2 rounded-full text-sm font-display font-semibold focus-ring"
                  style={{ backgroundColor: commerce.currency === cur ? "rgba(214,180,106,0.14)" : "rgba(255,255,255,0.04)", color: commerce.currency === cur ? A.gold : A.text2, border: `1px solid ${commerce.currency === cur ? A.borderActive : A.border}` }}>
                  <DollarSign className="w-3.5 h-3.5 inline mr-1" />{cur}
                </button>
              ))}
            </div>
          </Panel>
          <Panel title="Etapas del pipeline">
            <div className="flex gap-2 mb-4">
              <input className={inputCls} style={inputSty} value={newStage} onChange={(e) => setNewStage(e.target.value)} placeholder="Nueva etapa…" />
              <Button size="sm" onClick={() => { if (newStage.trim()) { setCommerce({ ...commerce, stages: [...commerce.stages, newStage.trim()] }); setNewStage(""); } }}><Plus className="w-3.5 h-3.5" /></Button>
            </div>
            <ul className="space-y-2">
              {commerce.stages.map((s, i) => (
                <li key={s} className="flex items-center gap-2 p-2.5 rounded-xl text-sm" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}`, color: A.text }}>
                  <span className="font-mono text-[10px] w-5" style={{ color: A.gold }}>{i + 1}</span>
                  <span className="flex-1">{s}</span>
                  <button onClick={() => setCommerce({ ...commerce, stages: commerce.stages.filter((x) => x !== s) })} className="p-1 rounded focus-ring hover:bg-white/5" style={{ color: A.danger }} aria-label={`Eliminar ${s}`}><Trash2 className="w-3.5 h-3.5" /></button>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      )}

      {/* ═══ EQUIPO (owner) ═══ */}
      {tab === "equipo" && isOwner && (
        <Panel title="Miembros del equipo" action={
          <Button size="sm" onClick={() => setUsers([...users, { id: uid(), name: "", email: "", role: "Viewer", department: "", active: true }])}><Plus className="w-3.5 h-3.5" /> Añadir</Button>
        }>
          <p className="text-xs mb-4 leading-relaxed" style={{ color: A.text2 }}>
            Solo tú (Owner) ves y editas esta sección. Los miembros entran con <code className="font-mono">MEMBER_PASSWORD</code> y no ven Equipo, API Keys ni credenciales.
          </p>
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-3 rounded-xl items-end" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}` }}>
                <Field label="Nombre"><input className={inputCls} style={inputSty} value={u.name} onChange={(e) => setUsers(users.map((x) => (x.id === u.id ? { ...x, name: e.target.value } : x)))} /></Field>
                <Field label="Email"><input className={inputCls} style={inputSty} value={u.email} onChange={(e) => setUsers(users.map((x) => (x.id === u.id ? { ...x, email: e.target.value } : x)))} /></Field>
                <Field label="Rol">
                  <select className={inputCls} style={inputSty} value={u.role} onChange={(e) => setUsers(users.map((x) => (x.id === u.id ? { ...x, role: e.target.value as Role } : x)))} disabled={u.id === "owner"}>
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </Field>
                <Field label="Área"><input className={inputCls} style={inputSty} value={u.department || ""} onChange={(e) => setUsers(users.map((x) => (x.id === u.id ? { ...x, department: e.target.value } : x)))} /></Field>
                <div className="flex items-center gap-2 pb-0.5">
                  <StatusBadge status={u.active ? "Activo" : "Pausado"} />
                  {u.id !== "owner" && (
                    <>
                      <button onClick={() => setUsers(users.map((x) => (x.id === u.id ? { ...x, active: !x.active } : x)))} className="p-1.5 rounded focus-ring hover:bg-white/5" style={{ color: A.text2 }} aria-label="Alternar activo"><Shield className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setUsers(users.filter((x) => x.id !== u.id))} className="p-1.5 rounded focus-ring hover:bg-white/5" style={{ color: A.danger }} aria-label="Eliminar"><Trash2 className="w-3.5 h-3.5" /></button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {/* ═══ API KEYS (owner) ═══ */}
      {tab === "apikeys" && isOwner && (
        <Panel title="API Keys" action={
          <Button size="sm" onClick={() => {
            const raw = crypto.getRandomValues(new Uint8Array(24));
            const key = "aureon_sk_" + Array.from(raw, (b) => b.toString(16).padStart(2, "0")).join("");
            const k: ApiKey = { id: uid(), name: `Key ${apikeys.length + 1}`, key, createdAt: Date.now(), active: true };
            setApikeys((arr) => [k, ...arr]);
            setRevealedKey(k.id);
          }}><KeyRound className="w-3.5 h-3.5" /> Generar key</Button>
        }>
          <p className="text-xs mb-4 leading-relaxed" style={{ color: A.text2 }}>
            Claves para integraciones externas (n8n, Zapier, tu backend). Se generan y guardan localmente — <strong style={{ color: A.alert }}>se validarán en el servidor cuando conectes el backend de API</strong>.
          </p>
          <div className="space-y-2">
            {apikeys.map((k) => (
              <div key={k.id} className="flex flex-wrap items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${A.border}` }}>
                <input className="rounded-lg px-2.5 py-1.5 text-sm outline-none w-36" style={inputSty} value={k.name} onChange={(e) => setApikeys((arr) => arr.map((x) => (x.id === k.id ? { ...x, name: e.target.value } : x)))} />
                <code className="font-mono text-[11px] flex-1 min-w-[200px] truncate" style={{ color: A.text2 }}>
                  {revealedKey === k.id ? k.key : k.key.slice(0, 14) + "•".repeat(20)}
                </code>
                <button onClick={() => setRevealedKey(revealedKey === k.id ? null : k.id)} className="p-1.5 rounded focus-ring hover:bg-white/5" style={{ color: A.text2 }} aria-label="Mostrar key">
                  {revealedKey === k.id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button onClick={async () => { await navigator.clipboard.writeText(k.key); ok("Key copiada"); }} className="p-1.5 rounded focus-ring hover:bg-white/5" style={{ color: A.text2 }} aria-label="Copiar key"><Copy className="w-3.5 h-3.5" /></button>
                <StatusBadge status={k.active ? "Activo" : "Pausado"} />
                <button onClick={() => setApikeys((arr) => arr.filter((x) => x.id !== k.id))} className="p-1.5 rounded focus-ring hover:bg-white/5" style={{ color: A.danger }} aria-label="Revocar key"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
            {apikeys.length === 0 && <p className="text-xs" style={{ color: A.textDim }}>Sin keys generadas.</p>}
          </div>
        </Panel>
      )}

      {/* Miembro intentando ver secciones de owner */}
      {(tab === "equipo" || tab === "apikeys") && !isOwner && (
        <Panel title="Sección restringida">
          <p className="text-sm py-6 text-center" style={{ color: A.textDim }}><Shield className="w-5 h-5 inline mr-2" style={{ color: A.gold }} />Solo el Owner (CEO) tiene acceso a esta sección.</p>
        </Panel>
      )}
    </>
  );
}
