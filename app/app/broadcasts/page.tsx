"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Megaphone, Plus, MessageCircle, ExternalLink, Copy, Check, Trash2, Send, Users } from "lucide-react";
import { AppPageHeader, Panel, Button, StatCard, StatusBadge } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import { A } from "@/lib/ui";
import { waNumber } from "@/lib/prospeccion";
import { useContacts, type Contact } from "@/lib/internal/contacts-store";

/* ─────────────────────────────────────────────────────────────────
 * BROADCASTS — campañas para Meta Ads y difusiones por WhatsApp.
 *
 * Honestidad: la publicación directa en Meta y el envío masivo por la
 * WhatsApp Cloud API requieren credenciales de Meta (plantillas
 * aprobadas). Mientras tanto: el brief de campaña se genera listo para
 * Ads Manager, y la difusión por WhatsApp se ejecuta contacto a
 * contacto con el mensaje precargado (cumple políticas de Meta).
 * ───────────────────────────────────────────────────────────────── */

type MsgTemplate = { id: string; name: string; body: string; intents: string[] };
export type Broadcast = {
  id: string;
  name: string;
  kind: "whatsapp" | "meta-ads";
  audienceTag: string; // "" = todos
  templateId?: string;
  objective?: string;
  budget?: string;
  status: "Borrador" | "Activo" | "Cerrado";
  sent: string[]; // ids de contactos ya contactados en esta difusión
  createdAt: number;
};
type TagDef = { id: string; name: string; color: string };

const uid = () => Math.random().toString(36).slice(2, 10);

export default function BroadcastsPage() {
  const [broadcasts, setBroadcasts] = useStore<Broadcast>(STORE_KEYS.broadcasts);
  const { contacts } = useContacts();
  const [templates] = useStore<MsgTemplate>(STORE_KEYS.msgTemplates);
  const [tags] = useStore<TagDef>(STORE_KEYS.tags);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState({ name: "", kind: "whatsapp" as Broadcast["kind"], audienceTag: "", templateId: "", objective: "Generar leads calificados", budget: "" });

  const active = broadcasts.find((b) => b.id === activeId) || null;

  const audienceOf = (b: Broadcast) =>
    contacts.filter((c) => (!b.audienceTag || c.tags.includes(b.audienceTag)));

  const create = () => {
    if (!draft.name.trim()) return;
    const b: Broadcast = { id: uid(), name: draft.name.trim(), kind: draft.kind, audienceTag: draft.audienceTag, templateId: draft.templateId || undefined, objective: draft.objective, budget: draft.budget, status: "Borrador", sent: [], createdAt: Date.now() };
    setBroadcasts((arr) => [b, ...arr]);
    setModalOpen(false);
    setActiveId(b.id);
    setDraft({ name: "", kind: "whatsapp", audienceTag: "", templateId: "", objective: "Generar leads calificados", budget: "" });
  };

  const markSent = (bId: string, contactId: string) =>
    setBroadcasts((arr) => arr.map((b) => (b.id === bId ? { ...b, status: "Activo", sent: [...new Set([...b.sent, contactId])] } : b)));

  const setStatus = (bId: string, status: Broadcast["status"]) =>
    setBroadcasts((arr) => arr.map((b) => (b.id === bId ? { ...b, status } : b)));

  const metaBrief = (b: Broadcast) => {
    const aud = audienceOf(b);
    return `BRIEF DE CAMPAÑA — ${b.name}
Fecha: ${new Date().toLocaleDateString("es-CO")}

Plataforma: Meta Ads (Facebook + Instagram)
Objetivo: ${b.objective || "Generar leads calificados"}
Presupuesto orientativo: ${b.budget || "[definir]"}
Audiencia semilla: ${aud.length} contactos${b.audienceTag ? ` con etiqueta "${b.audienceTag}"` : ""} (subir como Custom Audience → crear Lookalike 1-3%)

Estructura recomendada:
- Campaña: Leads · CBO
- Conjunto 1: Lookalike de clientes · intereses del sector
- Conjunto 2: Retargeting visitantes web 30 días
- Creativos: 2 videos cortos (hook 3s) + 2 estáticos con oferta de diagnóstico gratuito

Mensaje base:
${templates.find((t) => t.id === b.templateId)?.body || "[elegir plantilla]"}

Notas: destino WhatsApp (click-to-WhatsApp) para respuesta inmediata de agentes.`;
  };

  return (
    <>
      <AppPageHeader
        title="Broadcasts"
        subtitle="Campañas para Meta y difusiones por WhatsApp con plantillas. La publicación directa se activa al conectar la API de Meta."
        breadcrumbs={[{ label: "Command Center", href: "/app" }, { label: "Broadcasts" }]}
        actions={<Button onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Nueva campaña</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Campañas" value={broadcasts.length} icon={Megaphone} accent="gold" source="manual" />
        <StatCard label="Activas" value={broadcasts.filter((b) => b.status === "Activo").length} icon={Send} accent="positive" source="manual" />
        <StatCard label="Contactos alcanzables" value={contacts.length} icon={Users} accent="blue" source="manual" hint="Desde Contactos" />
        <StatCard label="Plantillas" value={templates.length} icon={Copy} accent="violet" source="manual" hint="Ajustes → Plantillas" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-4">
          <Panel title="Campañas">
            {broadcasts.length === 0 ? (
              <p className="text-sm py-6 text-center" style={{ color: A.textDim }}>Crea tu primera campaña. Necesitarás contactos (Contactos) y plantillas (Ajustes).</p>
            ) : (
              <ul className="space-y-2">
                {broadcasts.map((b) => (
                  <li key={b.id}>
                    <button onClick={() => setActiveId(b.id)} className="w-full text-left p-3 rounded-xl focus-ring transition-colors hover:bg-white/[0.04]"
                      style={{ backgroundColor: activeId === b.id ? "rgba(214,180,106,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${activeId === b.id ? A.borderActive : A.border}` }}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium truncate" style={{ color: A.text }}>{b.name}</span>
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="text-[11px] mt-1" style={{ color: A.textDim }}>
                        {b.kind === "whatsapp" ? "Difusión WhatsApp" : "Meta Ads"} · {audienceOf(b).length} contactos · {b.sent.length} enviados
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>

        <div className="xl:col-span-8">
          {!active ? (
            <Panel title="Selecciona una campaña"><p className="text-sm py-8 text-center" style={{ color: A.textDim }}>Elige o crea una campaña para trabajarla.</p></Panel>
          ) : active.kind === "meta-ads" ? (
            <Panel title={`${active.name} — Meta Ads`} action={
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={async () => { await navigator.clipboard.writeText(metaBrief(active)); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copiar brief
                </Button>
                <a href="https://adsmanager.facebook.com/adsmanager/manage/campaigns" target="_blank" rel="noopener noreferrer"
                  className="btn-premium focus-ring inline-flex items-center gap-2 px-4 py-2 rounded-full font-display font-semibold text-xs" style={{ backgroundColor: A.gold, color: A.bg }}>
                  <ExternalLink className="w-3.5 h-3.5" /> Abrir Ads Manager
                </a>
              </div>
            }>
              <pre className="whitespace-pre-wrap text-xs leading-relaxed font-sans p-4 rounded-xl max-h-[440px] overflow-y-auto" style={{ backgroundColor: "rgba(0,0,0,0.25)", color: A.text2, border: `1px solid ${A.border}` }}>
                {metaBrief(active)}
              </pre>
              <div className="flex gap-2 mt-4">
                {(["Borrador", "Activo", "Cerrado"] as const).map((s) => (
                  <button key={s} onClick={() => setStatus(active.id, s)} className="px-3 py-1.5 rounded-full text-xs focus-ring"
                    style={{ backgroundColor: active.status === s ? "rgba(214,180,106,0.14)" : "rgba(255,255,255,0.04)", color: active.status === s ? A.gold : A.text2, border: `1px solid ${A.border}` }}>
                    {s}
                  </button>
                ))}
                <button onClick={() => { setBroadcasts((arr) => arr.filter((x) => x.id !== active.id)); setActiveId(null); }} className="ml-auto p-2 rounded focus-ring hover:bg-white/5" style={{ color: A.danger }} aria-label="Eliminar campaña">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Panel>
          ) : (
            <Panel title={`${active.name} — Difusión WhatsApp (${active.sent.length}/${audienceOf(active).length})`}>
              {(() => {
                const tpl = templates.find((t) => t.id === active.templateId);
                const aud = audienceOf(active);
                if (!tpl) return <p className="text-sm" style={{ color: A.alert }}>Esta campaña no tiene plantilla. Edita las plantillas en Ajustes y crea la campaña de nuevo.</p>;
                if (aud.length === 0) return <p className="text-sm" style={{ color: A.textDim }}>Sin audiencia{active.audienceTag ? ` con la etiqueta "${active.audienceTag}"` : ""}. Añade contactos en <Link href="/app/contactos" className="underline" style={{ color: A.gold }}>Contactos</Link>.</p>;
                return (
                  <>
                    <div className="p-3 rounded-xl mb-4 text-xs leading-relaxed" style={{ backgroundColor: "rgba(124,92,191,0.08)", color: A.text2, border: `1px solid ${A.border}` }}>
                      <strong style={{ color: "#C7B8E8" }}>Plantilla:</strong> {tpl.body}
                    </div>
                    <ul className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                      {aud.map((c) => {
                        const wa = waNumber(c.phone);
                        const done = active.sent.includes(c.id);
                        const personalized = tpl.body.replace(/\{\{nombre\}\}/gi, c.name);
                        return (
                          <li key={c.id} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: `1px solid ${A.border}`, opacity: done ? 0.55 : 1 }}>
                            <span className="text-sm flex-1 truncate" style={{ color: A.text }}>{c.name}</span>
                            {done ? (
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase" style={{ color: A.positive }}><Check className="w-3 h-3" /> Enviado</span>
                            ) : wa ? (
                              <a href={`https://wa.me/${wa}?text=${encodeURIComponent(personalized)}`} target="_blank" rel="noopener noreferrer" onClick={() => markSent(active.id, c.id)}
                                className="focus-ring inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display font-semibold text-[11px]" style={{ backgroundColor: "#22C15E", color: "#06130A" }}>
                                <MessageCircle className="w-3 h-3" /> Enviar
                              </a>
                            ) : (
                              <span className="font-mono text-[10px]" style={{ color: A.textDim }}>Sin WhatsApp</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                    <p className="mt-3 text-[10px] leading-relaxed" style={{ color: A.textDim }}>
                      Envío contacto a contacto con mensaje precargado (cumple políticas de Meta). El envío masivo automático requiere plantillas aprobadas en la WhatsApp Cloud API. Respeta Habeas Data: contacta solo a quien puede esperar tu mensaje.
                    </p>
                  </>
                );
              })()}
            </Panel>
          )}
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nueva campaña">
        <div className="space-y-4">
          <FormField label="Nombre" required>
            <input className={inputClass} style={inputStyle} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Ej: Odontologías Chapinero — Julio" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tipo">
              <select className={inputClass} style={inputStyle} value={draft.kind} onChange={(e) => setDraft({ ...draft, kind: e.target.value as Broadcast["kind"] })}>
                <option value="whatsapp">Difusión WhatsApp</option>
                <option value="meta-ads">Campaña Meta Ads</option>
              </select>
            </FormField>
            <FormField label="Audiencia (etiqueta)">
              <select className={inputClass} style={inputStyle} value={draft.audienceTag} onChange={(e) => setDraft({ ...draft, audienceTag: e.target.value })}>
                <option value="">Todos los contactos</option>
                {tags.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
              </select>
            </FormField>
          </div>
          {draft.kind === "whatsapp" ? (
            <FormField label="Plantilla de mensaje" required hint="Usa {{nombre}} para personalizar">
              <select className={inputClass} style={inputStyle} value={draft.templateId} onChange={(e) => setDraft({ ...draft, templateId: e.target.value })}>
                <option value="">Selecciona…</option>
                {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </FormField>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Objetivo">
                <input className={inputClass} style={inputStyle} value={draft.objective} onChange={(e) => setDraft({ ...draft, objective: e.target.value })} />
              </FormField>
              <FormField label="Presupuesto">
                <input className={inputClass} style={inputStyle} value={draft.budget} onChange={(e) => setDraft({ ...draft, budget: e.target.value })} placeholder="Ej: $1.500.000 COP / mes" />
              </FormField>
            </div>
          )}
          <Button onClick={create} className="w-full justify-center"><Plus className="w-4 h-4" /> Crear campaña</Button>
        </div>
      </Modal>
    </>
  );
}
