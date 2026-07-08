"use client";

import { useMemo, useState } from "react";
import { Users, Plus, Pencil, Trash2, Tag, Download, MessageCircle, MapPinned } from "lucide-react";
import { AppPageHeader, Panel, Button, StatCard, DataTable } from "@/components/app/primitives";
import Modal, { FormField, inputClass, inputStyle } from "@/components/app/Modal";
import { useStore, STORE_KEYS } from "@/lib/internal/data-source";
import { A } from "@/lib/ui";
import { readPool, waNumber } from "@/lib/prospeccion";

/* ─────────────────────────────────────────────────────────────────
 * CONTACTOS — libreta central. Se alimenta manualmente, desde el
 * pool de Prospección y desde los leads del CRM. Soporta etiquetas
 * y campos personalizados (definidos en Ajustes → Campos y etiquetas).
 * ───────────────────────────────────────────────────────────────── */

export type Contact = {
  id: string;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  tags: string[];
  fields: Record<string, string>;
  source: string;
};
type TagDef = { id: string; name: string; color: string };
type FieldDef = { id: string; name: string; type: "texto" | "número" | "fecha" };

const uid = () => Math.random().toString(36).slice(2, 10);
const emptyContact: Omit<Contact, "id"> = { name: "", company: "", phone: "", email: "", instagram: "", tags: [], fields: {}, source: "Manual" };

export default function ContactosPage() {
  const [contacts, setContacts] = useStore<Contact>(STORE_KEYS.contacts);
  const [tags] = useStore<TagDef>(STORE_KEYS.tags);
  const [fields] = useStore<FieldDef>(STORE_KEYS.fields);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<Contact, "id">>(emptyContact);
  const [tagFilter, setTagFilter] = useState<string>("");
  const [importMsg, setImportMsg] = useState("");

  const visible = useMemo(
    () => contacts.filter((c) => !tagFilter || c.tags.includes(tagFilter)),
    [contacts, tagFilter],
  );

  const openNew = () => { setEditing(null); setDraft(emptyContact); setModalOpen(true); };
  const openEdit = (c: Contact) => { setEditing(c.id); setDraft({ ...c }); setModalOpen(true); };

  const save = () => {
    if (!draft.name.trim()) return;
    if (editing) setContacts((arr) => arr.map((c) => (c.id === editing ? { ...c, ...draft } : c)));
    else setContacts((arr) => [{ id: uid(), ...draft }, ...arr]);
    setModalOpen(false);
  };
  const remove = (id: string) => setContacts((arr) => arr.filter((c) => c.id !== id));

  /* Importar desde el pool de Prospección (dedup por nombre+teléfono) */
  const importFromPool = () => {
    const pool = readPool();
    const known = new Set(contacts.map((c) => `${c.name}|${c.phone || ""}`));
    const nuevos: Contact[] = pool
      .filter((p) => !known.has(`${p.name}|${p.phone || ""}`))
      .map((p) => ({
        id: uid(), name: p.name, company: p.name, phone: p.phone, email: p.email,
        instagram: "", tags: [], fields: {}, source: `Prospección · ${p.categoryLabel}`,
      }));
    if (nuevos.length) setContacts((arr) => [...nuevos, ...arr]);
    setImportMsg(nuevos.length ? `${nuevos.length} contactos importados del pool.` : "Nada nuevo que importar (todo ya existía).");
    setTimeout(() => setImportMsg(""), 3500);
  };

  const exportCSV = () => {
    const fieldNames = fields.map((f) => f.name);
    const rows = [
      ["Nombre", "Empresa", "Teléfono", "Email", "Instagram", "Etiquetas", "Origen", ...fieldNames],
      ...contacts.map((c) => [c.name, c.company || "", c.phone || "", c.email || "", c.instagram || "", c.tags.join("; "), c.source, ...fieldNames.map((fn) => c.fields[fn] || "")]),
    ];
    const csv = rows.map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    a.download = `contactos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const tagColor = (name: string) => tags.find((t) => t.name === name)?.color || A.textDim;

  return (
    <>
      <AppPageHeader
        title="Contactos"
        subtitle="Libreta central con etiquetas y campos personalizados. Se alimenta de Prospección y de los leads del sitio."
        breadcrumbs={[{ label: "Command Center", href: "/app" }, { label: "Contactos" }]}
        actions={
          <>
            <Button variant="ghost" onClick={importFromPool}><MapPinned className="w-3.5 h-3.5" /> Importar del pool</Button>
            <Button variant="ghost" onClick={exportCSV} disabled={contacts.length === 0}><Download className="w-3.5 h-3.5" /> CSV</Button>
            <Button onClick={openNew}><Plus className="w-3.5 h-3.5" /> Nuevo contacto</Button>
          </>
        }
      />

      {importMsg && <p className="mb-4 text-xs" style={{ color: A.positive }} role="status">{importMsg}</p>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Contactos" value={contacts.length} icon={Users} accent="gold" source="manual" />
        <StatCard label="Con WhatsApp" value={contacts.filter((c) => waNumber(c.phone)).length} icon={MessageCircle} accent="positive" source="manual" />
        <StatCard label="Etiquetas definidas" value={tags.length} icon={Tag} accent="violet" source="manual" hint="Ajustes → Campos y etiquetas" />
        <StatCard label="Campos personalizados" value={fields.length} icon={Pencil} accent="blue" source="manual" />
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          <button onClick={() => setTagFilter("")} className="px-3 py-1.5 rounded-full text-xs focus-ring" style={{ backgroundColor: !tagFilter ? "rgba(214,180,106,0.14)" : "rgba(255,255,255,0.04)", color: !tagFilter ? A.gold : A.text2, border: `1px solid ${A.border}` }}>Todos</button>
          {tags.map((t) => (
            <button key={t.id} onClick={() => setTagFilter(t.name)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs focus-ring"
              style={{ backgroundColor: tagFilter === t.name ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)", color: A.text2, border: `1px solid ${tagFilter === t.name ? t.color : A.border}` }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} /> {t.name}
            </button>
          ))}
        </div>
      )}

      <DataTable<Contact>
        columns={[
          { key: "name", label: "Nombre", render: (c) => <span className="font-medium" style={{ color: A.text }}>{c.name}</span> },
          { key: "phone", label: "Teléfono", render: (c) => c.phone ? (
            <span className="inline-flex items-center gap-2">{c.phone}{waNumber(c.phone) && <MessageCircle className="w-3 h-3" style={{ color: "#22C15E" }} />}</span>
          ) : <span style={{ color: A.textDim }}>—</span> },
          { key: "email", label: "Email", render: (c) => c.email || <span style={{ color: A.textDim }}>—</span> },
          { key: "tags", label: "Etiquetas", render: (c) => c.tags.length ? (
            <span className="flex flex-wrap gap-1">{c.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: A.text2 }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tagColor(t) }} />{t}
              </span>
            ))}</span>
          ) : <span style={{ color: A.textDim }}>—</span> },
          { key: "source", label: "Origen", render: (c) => <span className="font-mono text-[10px]" style={{ color: A.textDim }}>{c.source}</span> },
          { key: "acciones", label: "", className: "w-24", render: (c) => (
            <span className="flex gap-1 justify-end">
              <button onClick={(e) => { e.stopPropagation(); openEdit(c); }} className="p-1.5 rounded focus-ring hover:bg-white/5" style={{ color: A.text2 }} aria-label={`Editar ${c.name}`}><Pencil className="w-3.5 h-3.5" /></button>
              <button onClick={(e) => { e.stopPropagation(); remove(c.id); }} className="p-1.5 rounded focus-ring hover:bg-white/5" style={{ color: A.danger }} aria-label={`Eliminar ${c.name}`}><Trash2 className="w-3.5 h-3.5" /></button>
            </span>
          )},
        ]}
        rows={visible}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar contacto" : "Nuevo contacto"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Nombre" required>
            <input className={inputClass} style={inputStyle} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </FormField>
          <FormField label="Empresa">
            <input className={inputClass} style={inputStyle} value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} />
          </FormField>
          <FormField label="Teléfono">
            <input className={inputClass} style={inputStyle} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="+57 300 000 0000" />
          </FormField>
          <FormField label="Email">
            <input className={inputClass} style={inputStyle} value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
          </FormField>
          <FormField label="Instagram">
            <input className={inputClass} style={inputStyle} value={draft.instagram} onChange={(e) => setDraft({ ...draft, instagram: e.target.value })} placeholder="@usuario" />
          </FormField>
          <FormField label="Etiquetas">
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.length === 0 && <span className="text-xs" style={{ color: A.textDim }}>Define etiquetas en Ajustes</span>}
              {tags.map((t) => {
                const on = draft.tags.includes(t.name);
                return (
                  <button key={t.id} type="button" onClick={() => setDraft({ ...draft, tags: on ? draft.tags.filter((x) => x !== t.name) : [...draft.tags, t.name] })}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] focus-ring"
                    style={{ backgroundColor: on ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)", color: A.text2, border: `1px solid ${on ? t.color : A.border}` }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.color }} />{t.name}
                  </button>
                );
              })}
            </div>
          </FormField>
          {fields.map((f) => (
            <FormField key={f.id} label={`${f.name} (${f.type})`}>
              <input className={inputClass} style={inputStyle} type={f.type === "número" ? "number" : f.type === "fecha" ? "date" : "text"}
                value={draft.fields[f.name] || ""} onChange={(e) => setDraft({ ...draft, fields: { ...draft.fields, [f.name]: e.target.value } })} />
            </FormField>
          ))}
        </div>
        <div className="mt-5">
          <Button onClick={save} className="w-full justify-center">{editing ? "Guardar cambios" : "Crear contacto"}</Button>
        </div>
      </Modal>
    </>
  );
}
