"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Inbox as InboxIcon, MessageCircle, Instagram, Facebook, Mail, Globe,
  Send, Plus, Sparkles, Bot, X, Search, ArrowDownLeft, ArrowUpRight, Zap,
} from "lucide-react";
import { AppPageHeader, Panel, Button, StatCard } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import { useCfg, CFG, DEFAULTS } from "@/lib/internal/settings";
import { A } from "@/lib/ui";
import { waNumber } from "@/lib/prospeccion";

/* ─────────────────────────────────────────────────────────────────
 * INBOX OMNICANAL — todas las conversaciones en un solo lugar.
 * Canales: WhatsApp (principal), Instagram, Facebook, Email, Web.
 *
 * Honestidad: la entrada AUTOMÁTICA de mensajes requiere las APIs de
 * cada canal (Meta Cloud API para WA — webhook ya desplegado en
 * /api/whatsapp/webhook). Mientras conectas credenciales, registras
 * el mensaje del cliente y respondes desde aquí: los agentes sugieren
 * la respuesta al instante y el envío se abre en el canal con un clic.
 * ───────────────────────────────────────────────────────────────── */

export type Channel = "whatsapp" | "instagram" | "facebook" | "email" | "web";
export type Msg = { id: string; dir: "in" | "out"; text: string; at: number };
export type Conversation = {
  id: string;
  name: string;
  channel: Channel;
  phone?: string;
  handle?: string; // @instagram / página fb / email
  messages: Msg[];
  unread?: boolean;
};

const CHANNELS: Record<Channel, { label: string; icon: typeof MessageCircle; color: string }> = {
  whatsapp: { label: "WhatsApp", icon: MessageCircle, color: "#22C15E" },
  instagram: { label: "Instagram", icon: Instagram, color: "#F0A3C4" },
  facebook: { label: "Facebook", icon: Facebook, color: "#4D7CFE" },
  email: { label: "Email", icon: Mail, color: "#8FAEFF" },
  web: { label: "Web", icon: Globe, color: "#4FB6C7" },
};

/* ── Agentes de respuesta inmediata (reglas por intención) ─────────
   Sugerencias instantáneas basadas en el último mensaje entrante.
   Para respuestas generativas: conectar proveedor de IA (ver Agentes). */
type MsgTemplate = { id: string; name: string; body: string; intents: string[] };

const SEED_TEMPLATES: MsgTemplate[] = [
  { id: "tpl-bienvenida", name: "Bienvenida", intents: ["hola", "buenas", "info", "informacion"], body: "¡Hola! 👋 Gracias por escribir a Aureon Growth Services. Cuéntanos: ¿qué reto comercial quieres resolver? Así te orientamos de una vez." },
  { id: "tpl-precios", name: "Precios", intents: ["precio", "costo", "cuanto", "vale", "tarifa", "planes"], body: "¡Con gusto! Trabajamos con planes según la etapa de tu negocio. Lo más eficiente: un diagnóstico gratuito de 10 minutos y te decimos exactamente qué necesitas y cuánto vale. ¿Te agendo esta semana?" },
  { id: "tpl-demo", name: "Agendar demo", intents: ["demo", "cita", "reunion", "agendar", "llamada", "interesa"], body: "¡Perfecto! Agendemos una demo de 10 minutos. ¿Qué día y hora te quedan bien esta semana? También puedes escribirnos directo al WhatsApp y coordinamos de una." },
  { id: "tpl-recepcionista", name: "Recepcionista IA", intents: ["ia", "inteligencia", "bot", "automatico", "recepcionista", "responder"], body: "Nuestra recepcionista con IA atiende WhatsApp y llamadas 24/7: responde al instante, agenda citas y hace seguimiento sola. La configuramos para tu negocio en menos de una semana. ¿Quieres verla funcionando en una demo?" },
  { id: "tpl-seguimiento", name: "Seguimiento", intents: ["pensarlo", "despues", "luego", "ocupado"], body: "¡Sin problema! Te escribo de nuevo en unos días. Si algo cambia antes, este es nuestro WhatsApp directo. Que tengas excelente día 🙌" },
];

function suggestReplies(lastIn: string | undefined, templates: MsgTemplate[]): MsgTemplate[] {
  if (!templates.length) return [];
  if (!lastIn) return templates.slice(0, 3);
  const text = lastIn.toLowerCase();
  const scored = templates
    .map((t) => ({ t, score: t.intents.reduce((s, kw) => s + (text.includes(kw) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score);
  const top = scored.filter((x) => x.score > 0).map((x) => x.t);
  return (top.length ? top : templates).slice(0, 3);
}

const uid = () => Math.random().toString(36).slice(2, 10);

export default function InboxPage() {
  const [convos, setConvos] = useStore<Conversation>(STORE_KEYS.conversations);
  const [templates, setTemplates] = useStore<MsgTemplate>(STORE_KEYS.msgTemplates);
  const [wa] = useCfg(CFG.whatsapp, DEFAULTS.whatsapp);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Channel | "todos">("todos");
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState("");
  const [inboundDraft, setInboundDraft] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [nc, setNc] = useState({ name: "", channel: "whatsapp" as Channel, phone: "", handle: "", firstMsg: "" });

  /* Sembrar plantillas de la casa la primera vez (contenido propio, no datos) */
  useEffect(() => {
    if (templates.length === 0) {
      const raw = localStorage.getItem(STORE_KEYS.msgTemplates);
      if (!raw || raw === "[]") setTemplates(SEED_TEMPLATES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates.length]);

  const active = convos.find((c) => c.id === activeId) || null;
  const lastIn = active?.messages.filter((m) => m.dir === "in").at(-1)?.text;
  const suggestions = useMemo(() => suggestReplies(lastIn, templates), [lastIn, templates]);

  const visible = useMemo(
    () =>
      convos
        .filter((c) => (filter === "todos" || c.channel === filter))
        .filter((c) => !q || c.name.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => (b.messages.at(-1)?.at || 0) - (a.messages.at(-1)?.at || 0)),
    [convos, filter, q],
  );

  const waConnected = !!(wa.phoneNumberId && wa.token);
  const unreadCount = convos.filter((c) => c.unread).length;

  const createConvo = () => {
    if (!nc.name.trim() || !nc.firstMsg.trim()) return;
    const c: Conversation = {
      id: uid(), name: nc.name.trim(), channel: nc.channel,
      phone: nc.phone.trim() || undefined, handle: nc.handle.trim() || undefined,
      messages: [{ id: uid(), dir: "in", text: nc.firstMsg.trim(), at: Date.now() }],
      unread: true,
    };
    setConvos((arr) => [c, ...arr]);
    setActiveId(c.id);
    setModalOpen(false);
    setNc({ name: "", channel: "whatsapp", phone: "", handle: "", firstMsg: "" });
  };

  const addMsg = (dir: "in" | "out", text: string) => {
    if (!active || !text.trim()) return;
    setConvos((arr) =>
      arr.map((c) =>
        c.id === active.id
          ? { ...c, unread: dir === "in", messages: [...c.messages, { id: uid(), dir, text: text.trim(), at: Date.now() }] }
          : c,
      ),
    );
  };

  const sendReply = () => {
    if (!active || !draft.trim()) return;
    addMsg("out", draft);
    // Envío real por el canal disponible
    if (active.channel === "whatsapp" && waNumber(active.phone)) {
      window.open(`https://wa.me/${waNumber(active.phone)}?text=${encodeURIComponent(draft)}`, "_blank", "noopener");
    } else if (active.channel === "email" && active.handle) {
      window.open(`https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(active.handle)}&body=${encodeURIComponent(draft)}`, "_blank", "noopener");
    } else if (active.channel === "instagram" && active.handle) {
      window.open(`https://www.instagram.com/${active.handle.replace(/^@/, "")}/`, "_blank", "noopener");
    }
    setDraft("");
  };

  const markRead = (id: string) => setConvos((arr) => arr.map((c) => (c.id === id ? { ...c, unread: false } : c)));

  return (
    <>
      <AppPageHeader
        title="Inbox omnicanal"
        subtitle="Todas las conversaciones — WhatsApp primero. Los agentes sugieren la respuesta al instante; tú apruebas y sale por el canal."
        breadcrumbs={[{ label: "Command Center", href: "/app" }, { label: "Inbox" }]}
        actions={<Button onClick={() => setModalOpen(true)}><Plus className="w-3.5 h-3.5" /> Nueva conversación</Button>}
      />

      {/* Estado de conexión omnicanal */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]"
          style={{ backgroundColor: waConnected ? "rgba(126,226,168,0.12)" : "rgba(240,195,106,0.10)", color: waConnected ? A.positive : A.alert, border: `1px solid ${A.border}` }}>
          <MessageCircle className="w-3 h-3" /> WhatsApp API: {waConnected ? "credenciales guardadas" : "no conectada"}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em]" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: A.textDim, border: `1px solid ${A.border}` }}>
          <Bot className="w-3 h-3" /> Respuesta automática: se activa al conectar el canal
        </span>
        <Link href="/app/configuracion" className="text-xs font-display font-semibold focus-ring rounded" style={{ color: A.gold }}>
          Conectar canales →
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Conversaciones" value={convos.length} icon={InboxIcon} accent="gold" source="manual" />
        <StatCard label="Sin responder" value={unreadCount} icon={ArrowDownLeft} accent={unreadCount ? "alert" : "positive"} source="manual" />
        <StatCard label="Plantillas de agentes" value={templates.length} icon={Sparkles} accent="violet" source="manual" />
        <StatCard label="Canales activos" value={waConnected ? "1 / 5" : "0 / 5"} icon={Zap} accent="blue" source="manual" hint="WA · IG · FB · Email · Web" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5" style={{ minHeight: 520 }}>
        {/* ── Lista de conversaciones ── */}
        <div className="xl:col-span-4">
          <Panel title="Conversaciones">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: A.textDim }} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar…" className={`${inputClass} pl-9`} style={inputStyle} />
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(["todos", "whatsapp", "instagram", "facebook", "email", "web"] as const).map((ch) => (
                <button key={ch} onClick={() => setFilter(ch)} className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.1em] focus-ring transition-colors"
                  style={{ backgroundColor: filter === ch ? "rgba(214,180,106,0.14)" : "rgba(255,255,255,0.04)", color: filter === ch ? A.gold : A.text2, border: `1px solid ${filter === ch ? A.borderActive : A.border}` }}>
                  {ch === "todos" ? "Todos" : CHANNELS[ch].label}
                </button>
              ))}
            </div>
            {visible.length === 0 ? (
              <p className="text-sm py-8 text-center" style={{ color: A.textDim }}>
                Sin conversaciones. Crea una con el mensaje que te llegó, o conecta la API de WhatsApp para que entren solas.
              </p>
            ) : (
              <ul className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                {visible.map((c) => {
                  const Ch = CHANNELS[c.channel];
                  const last = c.messages.at(-1);
                  return (
                    <li key={c.id}>
                      <button onClick={() => { setActiveId(c.id); markRead(c.id); }} className="w-full text-left p-3 rounded-xl focus-ring transition-colors hover:bg-white/[0.04]"
                        style={{ backgroundColor: activeId === c.id ? "rgba(214,180,106,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${activeId === c.id ? A.borderActive : A.border}` }}>
                        <div className="flex items-center gap-2">
                          <Ch.icon className="w-3.5 h-3.5 shrink-0" style={{ color: Ch.color }} />
                          <span className="text-sm font-medium truncate flex-1" style={{ color: A.text }}>{c.name}</span>
                          {c.unread && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: A.gold }} />}
                        </div>
                        {last && <div className="text-[11px] truncate mt-1" style={{ color: A.textDim }}>{last.dir === "out" ? "Tú: " : ""}{last.text}</div>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>
        </div>

        {/* ── Hilo activo ── */}
        <div className="xl:col-span-8">
          {!active ? (
            <Panel title="Selecciona una conversación">
              <p className="text-sm py-10 text-center" style={{ color: A.textDim }}>Elige una conversación de la lista o crea una nueva.</p>
            </Panel>
          ) : (
            <Panel
              title={`${active.name} · ${CHANNELS[active.channel].label}${active.phone ? ` · ${active.phone}` : ""}${active.handle ? ` · ${active.handle}` : ""}`}
              action={<button onClick={() => setActiveId(null)} className="p-1.5 rounded focus-ring hover:bg-white/5" style={{ color: A.text2 }} aria-label="Cerrar hilo"><X className="w-4 h-4" /></button>}
            >
              {/* Mensajes */}
              <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1 mb-4">
                {active.messages.map((m) => (
                  <div key={m.id} className={`flex ${m.dir === "out" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed"
                      style={m.dir === "out"
                        ? { backgroundColor: "rgba(214,180,106,0.14)", color: A.text, border: `1px solid ${A.borderActive}` }
                        : { backgroundColor: "rgba(255,255,255,0.04)", color: A.text2, border: `1px solid ${A.border}` }}>
                      <div className="flex items-center gap-1.5 mb-1 font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: A.textDim }}>
                        {m.dir === "out" ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownLeft className="w-2.5 h-2.5" />}
                        {m.dir === "out" ? "Enviado" : "Recibido"} · {new Date(m.at).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Registrar entrante (mientras la API no entra sola) */}
              <div className="flex gap-2 mb-4">
                <input value={inboundDraft} onChange={(e) => setInboundDraft(e.target.value)} placeholder="Registrar mensaje que te llegó del cliente…" className={inputClass} style={inputStyle}
                  onKeyDown={(e) => { if (e.key === "Enter") { addMsg("in", inboundDraft); setInboundDraft(""); } }} />
                <Button variant="ghost" size="sm" onClick={() => { addMsg("in", inboundDraft); setInboundDraft(""); }}><ArrowDownLeft className="w-3.5 h-3.5" /> Entrante</Button>
              </div>

              {/* Agentes: respuestas inmediatas */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: A.gold }} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: A.gold }}>Agentes — respuesta inmediata sugerida</span>
                  <span className="font-mono text-[9px]" style={{ color: A.textDim }}>(reglas por intención · IA generativa requiere proveedor)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <button key={s.id} onClick={() => setDraft(s.body)} className="px-3 py-1.5 rounded-full text-[11px] focus-ring transition-colors hover:bg-white/5 text-left"
                      style={{ backgroundColor: "rgba(124,92,191,0.10)", color: "#C7B8E8", border: `1px solid ${A.border}` }}>
                      <Bot className="w-3 h-3 inline mr-1" /> {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Composer */}
              <div className="flex gap-2 items-end">
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} placeholder="Escribe o elige una respuesta de agente…"
                  className={`${inputClass} resize-y`} style={inputStyle} />
                <Button onClick={sendReply} disabled={!draft.trim()}><Send className="w-3.5 h-3.5" /> Enviar</Button>
              </div>
              <p className="mt-2 text-[10px]" style={{ color: A.textDim }}>
                {active.channel === "whatsapp" && waNumber(active.phone)
                  ? "El envío abre WhatsApp con el mensaje listo. Con la Cloud API conectada, saldrá directo desde el servidor."
                  : active.channel === "email"
                    ? "El envío abre Outlook con el correo redactado."
                    : "Registra aquí la conversación y responde en el canal original — la respuesta queda en el historial."}
              </p>
            </Panel>
          )}
        </div>
      </div>

      {/* Modal nueva conversación */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nueva conversación">
        <div className="space-y-4">
          <FormField label="Nombre del contacto">
            <input className={inputClass} style={inputStyle} value={nc.name} onChange={(e) => setNc({ ...nc, name: e.target.value })} placeholder="Ej: Clínica Sonrisa" />
          </FormField>
          <FormField label="Canal">
            <select className={inputClass} style={inputStyle} value={nc.channel} onChange={(e) => setNc({ ...nc, channel: e.target.value as Channel })}>
              {(Object.keys(CHANNELS) as Channel[]).map((ch) => <option key={ch} value={ch}>{CHANNELS[ch].label}</option>)}
            </select>
          </FormField>
          {nc.channel === "whatsapp" ? (
            <FormField label="Teléfono (WhatsApp)">
              <input className={inputClass} style={inputStyle} value={nc.phone} onChange={(e) => setNc({ ...nc, phone: e.target.value })} placeholder="+57 300 000 0000" />
            </FormField>
          ) : (
            <FormField label={nc.channel === "email" ? "Email" : "Usuario / página"}>
              <input className={inputClass} style={inputStyle} value={nc.handle} onChange={(e) => setNc({ ...nc, handle: e.target.value })} placeholder={nc.channel === "email" ? "cliente@correo.com" : "@usuario"} />
            </FormField>
          )}
          <FormField label="Mensaje recibido">
            <textarea className={inputClass} style={inputStyle} rows={3} value={nc.firstMsg} onChange={(e) => setNc({ ...nc, firstMsg: e.target.value })} placeholder="Pega aquí lo que escribió el cliente" />
          </FormField>
          <Button onClick={createConvo} className="w-full justify-center"><Plus className="w-4 h-4" /> Crear conversación</Button>
        </div>
      </Modal>
    </>
  );
}
