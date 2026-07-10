"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, CircleMarker, FeatureGroup } from "leaflet";
import {
  MapPin, Search, Download, Copy, Phone, Globe, Loader2, Info,
  X, MessageCircle, PhoneCall, ExternalLink, UserPlus, Check, Sparkles, Mail,
} from "lucide-react";
import { AppPageHeader, StatCard, Panel, Button, SourceTag } from "@/components/app/primitives";
import { A } from "@/lib/ui";
import {
  type Prospect, CATEGORIES, pitchFor, waNumber,
  buildWhatsApp, buildCallScript, buildEmail, buildWebMessage,
  outlookComposeUrl, googleMapsUrl, googleContactUrl, instagramSearchUrl,
  scheduleFollowUps,
} from "@/lib/prospeccion";
import { usePool } from "@/lib/internal/pool-store";

/* ─────────────────────────────────────────────────────────────────
 * PROSPECCIÓN — descubrimiento automático de clientes potenciales
 * Fuente: OpenStreetMap via Overpass API (datos reales, licencia ODbL).
 * Segmentación por categoría de negocio y zona de Bogotá en mapa vivo.
 * ───────────────────────────────────────────────────────────────── */

const ZONES = [
  { id: "toda", label: "Toda la ciudad", lat: 4.6533, lon: -74.0836, radius: 9000 },
  { id: "chapinero", label: "Chapinero", lat: 4.6486, lon: -74.0628, radius: 2500 },
  { id: "chico", label: "Chicó · Zona Rosa", lat: 4.6664, lon: -74.0536, radius: 2000 },
  { id: "usaquen", label: "Usaquén", lat: 4.7050, lon: -74.0310, radius: 2800 },
  { id: "centro", label: "Centro · Candelaria", lat: 4.5981, lon: -74.0758, radius: 2200 },
  { id: "teusaquillo", label: "Teusaquillo · Salitre", lat: 4.6486, lon: -74.0961, radius: 2800 },
  { id: "suba", label: "Suba", lat: 4.7570, lon: -74.0830, radius: 3500 },
  { id: "kennedy", label: "Kennedy", lat: 4.6097, lon: -74.1469, radius: 3200 },
] as const;

/* CATEGORIES, Prospect y los builders de mensajes viven en lib/prospeccion
   (compartidos con la Cola del día). */

/* ── Motor Overpass resiliente ────────────────────────────────────
   4 mirrors públicos rotados con timeout por intento y backoff.
   overpass-api.de va de último: es el más saturado del mundo. */
const OVERPASS_MIRRORS = [
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass-api.de/api/interpreter",
];

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 min — los negocios no cambian por minuto

type OverpassElement = { type: string; id: number; lat?: number; lon?: number; center?: { lat: number; lon: number }; tags?: Record<string, string> };

async function queryOverpass(
  body: string,
  onStatus: (msg: string) => void,
): Promise<{ elements: OverpassElement[]; mirror: string }> {
  let lastError: unknown = null;
  for (let i = 0; i < OVERPASS_MIRRORS.length; i++) {
    const url = OVERPASS_MIRRORS[i];
    const host = new URL(url).hostname;
    onStatus(`Consultando ${host} (${i + 1}/${OVERPASS_MIRRORS.length})…`);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 22000);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `data=${encodeURIComponent(body)}`,
        signal: ctrl.signal,
      });
      if (res.ok) {
        const data = await res.json();
        return { elements: (data.elements || []) as OverpassElement[], mirror: host };
      }
      lastError = new Error(`HTTP ${res.status} en ${host}`);
      // 400 = query inválida: rotar servidores no la arregla
      if (res.status === 400) throw lastError;
    } catch (e) {
      if (e instanceof Error && /HTTP 400/.test(e.message)) throw e;
      lastError = e;
    } finally {
      clearTimeout(timer);
    }
    // backoff breve antes del siguiente mirror
    if (i < OVERPASS_MIRRORS.length - 1) await new Promise((r) => setTimeout(r, 700));
  }
  throw lastError ?? new Error("Todos los servidores Overpass fallaron");
}

function cacheKey(zoneId: string, cats: string[]) {
  return `aureon:prospeccion:${zoneId}:${[...cats].sort().join(",")}`;
}
function readCache(key: string): OverpassElement[] | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { t, elements } = JSON.parse(raw);
    if (Date.now() - t > CACHE_TTL_MS) { sessionStorage.removeItem(key); return null; }
    return elements;
  } catch { return null; }
}
function writeCache(key: string, elements: OverpassElement[]) {
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), elements })); } catch {}
}

export default function ProspeccionPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<LeafletMap | null>(null);
  const markersRef = useRef<FeatureGroup | null>(null);

  const [zone, setZone] = useState<(typeof ZONES)[number]>(ZONES[1]);
  const [selectedCats, setSelectedCats] = useState<string[]>(["restaurant"]);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const { addBatch: addToPool, markContacted: markContactedDb, markLead: markLeadDb } = usePool();

  /* ── Camino prospecto → lead ── */
  const [selected, setSelected] = useState<Prospect | null>(null);
  const [draft, setDraft] = useState("");
  const [contacted, setContacted] = useState<Record<string, true>>({});
  const [savedLeads, setSavedLeads] = useState<Record<string, true>>({});
  const [savingLead, setSavingLead] = useState(false);
  const [leadMsg, setLeadMsg] = useState("");

  // Estados persistentes entre sesiones
  useEffect(() => {
    try {
      setContacted(JSON.parse(localStorage.getItem("aureon:prospeccion:contactados") || "{}"));
      setSavedLeads(JSON.parse(localStorage.getItem("aureon:prospeccion:leads") || "{}"));
    } catch {}
  }, []);
  const markContacted = (p: Prospect) => {
    // Al primer contacto se programan seguimientos día 3 y día 7 en Tareas
    scheduleFollowUps(p, zone.label);
    // Persiste en DB (o en localStorage vía fallback del hook)
    void markContactedDb(p.id);
    setContacted((prev) => {
      const next = { ...prev, [p.id]: true as const };
      try { localStorage.setItem("aureon:prospeccion:contactados", JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const markLead = (id: string, leadId?: string) => {
    void markLeadDb(id, leadId || "local");
    setSavedLeads((prev) => {
      const next = { ...prev, [id]: true as const };
      try { localStorage.setItem("aureon:prospeccion:leads", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  // Al abrir un prospecto, el borrador arranca con el mensaje del mejor canal
  useEffect(() => {
    if (!selected) return;
    setLeadMsg("");
    setDraft(waNumber(selected.phone) ? buildWhatsApp(selected) : selected.website ? buildWebMessage(selected) : buildWhatsApp(selected));
  }, [selected]);

  const saveLead = async (p: Prospect) => {
    setSavingLead(true);
    setLeadMsg("");
    try {
      const r = await fetch("/api/prospeccion/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: p.name,
          category: p.categoryLabel,
          zone: zone.label,
          phone: p.phone,
          website: p.website,
          address: p.street,
          notes: `Necesidad detectada (${p.categoryLabel}): ${pitchFor(p.category).need}`,
        }),
      });
      const j = await r.json();
      if (j.ok) {
        markLead(p.id, j.id);
        setLeadMsg(j.duplicated ? "Ya existía como lead — no se duplicó." : "Lead creado en el CRM ✓");
      } else {
        setLeadMsg(j.error || "No se pudo guardar el lead.");
      }
    } catch {
      setLeadMsg("Error de red al guardar el lead.");
    } finally {
      setSavingLead(false);
    }
  };

  /* ── Inicializar mapa (Leaflet importado en cliente, tiles dark de CARTO) ── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapRef.current || mapInstance.current) return;
      const map = L.map(mapRef.current, { zoomControl: true, attributionControl: true }).setView([zone.lat, zone.lon], 13);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);
      markersRef.current = L.featureGroup().addTo(map);
      mapInstance.current = map;
    })();
    return () => {
      cancelled = true;
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Volar a la zona seleccionada ── */
  useEffect(() => {
    mapInstance.current?.flyTo([zone.lat, zone.lon], zone.id === "toda" ? 12 : 14, { duration: 1.2 });
  }, [zone]);

  /* ── Buscar negocios reales (mirrors + caché de sesión) ── */
  const search = useCallback(async () => {
    if (selectedCats.length === 0) { setError("Selecciona al menos una categoría."); return; }
    setLoading(true);
    setError("");
    setStatus("");
    try {
      const cats = CATEGORIES.filter((c) => selectedCats.includes(c.id));
      const body = `[out:json][timeout:25];(${cats
        .map((c) => `${c.query}(around:${zone.radius},${zone.lat},${zone.lon});`)
        .join("")});out center 300;`;

      const key = cacheKey(zone.id, selectedCats);
      let elements = readCache(key);
      if (elements) {
        setSource("caché de sesión (30 min)");
      } else {
        const result = await queryOverpass(body, setStatus);
        elements = result.elements;
        writeCache(key, elements);
        setSource(result.mirror);
      }

      const found: Prospect[] = [];
      for (const el of elements) {
        const tags = el.tags || {};
        if (!tags.name) continue;
        const lat = el.lat ?? el.center?.lat;
        const lon = el.lon ?? el.center?.lon;
        if (lat == null || lon == null) continue;
        const cat =
          cats.find((c) => c.query.includes(tags.amenity || " ") || c.query.includes(tags.shop || " ") || c.query.includes(tags.leisure || " ") || c.query.includes(tags.tourism || " ") || c.query.includes(tags.office || " ")) || cats[0];
        found.push({
          id: `${el.type}-${el.id}`,
          name: tags.name,
          category: cat.id,
          categoryLabel: cat.label,
          color: cat.color,
          lat, lon,
          phone: tags.phone || tags["contact:phone"],
          website: tags.website || tags["contact:website"],
          email: tags.email || tags["contact:email"],
          street: [tags["addr:street"], tags["addr:housenumber"]].filter(Boolean).join(" "),
        });
      }
      setProspects(found);
      // Cada búsqueda alimenta el pool de outreach (para la Cola del día)
      addToPool(found, zone.label);

      /* pintar marcadores */
      const L = (await import("leaflet")).default;
      markersRef.current?.clearLayers();
      found.forEach((p) => {
        const m: CircleMarker = L.circleMarker([p.lat, p.lon], {
          radius: 6, color: p.color, weight: 1.5, fillColor: p.color, fillOpacity: 0.55,
        });
        m.bindPopup(
          `<strong>${p.name}</strong><br/><span style="opacity:.7">${p.categoryLabel}</span>` +
          (p.street ? `<br/>${p.street}` : "") +
          (p.phone ? `<br/>📞 ${p.phone}` : "") +
          (p.website ? `<br/><a href="${p.website}" target="_blank" rel="noopener">Sitio web</a>` : ""),
        );
        m.on("click", () => setSelected(p));
        markersRef.current?.addLayer(m);
      });
      // Encuadrar el mapa a los resultados encontrados
      if (found.length && markersRef.current && mapInstance.current) {
        mapInstance.current.fitBounds(markersRef.current.getBounds().pad(0.08));
      }
      if (found.length === 0) {
        setStatus("La zona respondió pero no hay negocios con nombre en esas categorías. Prueba otra zona o categoría.");
      } else {
        setStatus("");
      }
    } catch (e) {
      const detail = e instanceof Error ? e.message : "";
      setError(
        /HTTP 400/.test(detail)
          ? "La consulta fue rechazada por el servidor (error de sintaxis). Reporta este caso."
          : "Los 4 servidores de OpenStreetMap están saturados en este momento. Espera ~30 segundos y reintenta.",
      );
      setStatus("");
    } finally {
      setLoading(false);
    }
  }, [selectedCats, zone]);

  const toggleCat = (id: string) =>
    setSelectedCats((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  const exportCSV = () => {
    const rows = [
      ["Nombre", "Categoría", "Dirección", "Teléfono", "Email", "Sitio web", "Lat", "Lon"],
      ...prospects.map((p) => [p.name, p.categoryLabel, p.street || "", p.phone || "", p.email || "", p.website || "", p.lat, p.lon]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `prospectos-${zone.id}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copyText = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1600);
  };

  const copyProspect = async (p: Prospect) => {
    await navigator.clipboard.writeText(
      `${p.name} · ${p.categoryLabel}${p.street ? ` · ${p.street}` : ""}${p.phone ? ` · ${p.phone}` : ""}${p.website ? ` · ${p.website}` : ""}`,
    );
    setCopied(p.id);
    setTimeout(() => setCopied(null), 1500);
  };

  const withPhone = prospects.filter((p) => p.phone).length;
  const withWeb = prospects.filter((p) => p.website).length;

  return (
    <>
      <AppPageHeader
        title="Prospección"
        subtitle="Descubre clientes potenciales reales en el mapa de Bogotá, segmentados por categoría de negocio y zona. Fuente: OpenStreetMap."
        breadcrumbs={[{ label: "Command Center", href: "/app" }, { label: "Prospección" }]}
        actions={
          <Button onClick={exportCSV} disabled={prospects.length === 0}>
            <Download className="w-3.5 h-3.5" /> Exportar CSV
          </Button>
        }
      />

      {/* KPIs de la búsqueda */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Prospectos encontrados" value={prospects.length} icon={MapPin} accent="gold" source="importado" hint="OpenStreetMap" />
        <StatCard label="Con teléfono" value={withPhone} icon={Phone} accent="positive" source="importado" />
        <StatCard label="Con sitio web" value={withWeb} icon={Globe} accent="blue" source="importado" />
        <StatCard label="Zona activa" value={zone.label} icon={Search} accent="violet" source="manual" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Controles + resultados */}
        <div className="xl:col-span-4 space-y-5">
          <Panel title="Segmentación">
            <div className="mb-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: A.textDim }}>Zona</div>
              <div className="flex flex-wrap gap-1.5">
                {ZONES.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setZone(z)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus-ring"
                    style={{
                      backgroundColor: zone.id === z.id ? "rgba(214,180,106,0.16)" : "rgba(255,255,255,0.04)",
                      color: zone.id === z.id ? A.gold : A.text2,
                      border: `1px solid ${zone.id === z.id ? A.borderActive : A.border}`,
                    }}
                  >
                    {z.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: A.textDim }}>Categorías (multiselección)</div>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => {
                  const on = selectedCats.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleCat(c.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus-ring"
                      style={{
                        backgroundColor: on ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                        color: on ? A.text : A.text2,
                        border: `1px solid ${on ? c.color : A.border}`,
                      }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <Button onClick={search} disabled={loading} className="w-full justify-center">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {loading ? "Buscando negocios reales…" : "Buscar prospectos"}
            </Button>
            {loading && status && (
              <p className="mt-3 text-xs font-mono" style={{ color: A.text2 }} role="status" aria-live="polite">{status}</p>
            )}
            {!loading && status && (
              <p className="mt-3 text-xs" style={{ color: A.text2 }} role="status">{status}</p>
            )}
            {error && (
              <div className="mt-3 rounded-xl p-3 flex items-start gap-2.5" style={{ backgroundColor: "rgba(240,195,106,0.08)", border: `1px solid rgba(240,195,106,0.25)` }} role="alert">
                <div className="flex-1">
                  <p className="text-xs leading-relaxed" style={{ color: A.alert }}>{error}</p>
                  <button onClick={search} className="mt-2 inline-flex items-center gap-1.5 text-xs font-display font-semibold focus-ring rounded" style={{ color: A.gold }}>
                    <Search className="w-3 h-3" /> Reintentar ahora
                  </button>
                </div>
              </div>
            )}
            {source && !error && (
              <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.14em]" style={{ color: A.textDim }}>
                Fuente: {source}
              </p>
            )}
            <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed" style={{ color: A.textDim }}>
              <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: A.gold }} />
              Datos de negocios provenientes de OpenStreetMap (licencia ODbL). Verifica cada dato antes de contactar y cumple la normativa de contacto comercial (Ley 1581 de 2012 — Habeas Data).
            </p>
          </Panel>

          <Panel title={`Resultados (${prospects.length})`}>
            {prospects.length === 0 ? (
              <p className="text-sm py-6 text-center" style={{ color: A.textDim }}>
                Selecciona zona y categorías, luego pulsa <span style={{ color: A.gold }}>Buscar prospectos</span>.
              </p>
            ) : (
              <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {prospects.map((p) => (
                  <li key={p.id} className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-white/[0.05]" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${selected?.id === p.id ? A.borderActive : A.border}` }}>
                    <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: p.color }} />
                    <button onClick={() => setSelected(p)} className="min-w-0 flex-1 text-left focus-ring rounded cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate" style={{ color: A.text }}>{p.name}</span>
                        {savedLeads[p.id] && (
                          <span className="shrink-0 px-1.5 py-0.5 rounded-full font-mono text-[8px] uppercase tracking-[0.1em]" style={{ backgroundColor: "rgba(126,226,168,0.14)", color: A.positive }}>Lead ✓</span>
                        )}
                        {!savedLeads[p.id] && contacted[p.id] && (
                          <span className="shrink-0 px-1.5 py-0.5 rounded-full font-mono text-[8px] uppercase tracking-[0.1em]" style={{ backgroundColor: "rgba(59,111,212,0.16)", color: A.blue }}>Contactado</span>
                        )}
                      </div>
                      <div className="text-[11px] truncate" style={{ color: A.textDim }}>
                        {p.categoryLabel}{p.street ? ` · ${p.street}` : ""}{p.phone ? ` · ${p.phone}` : ""}
                      </div>
                    </button>
                    <button
                      onClick={() => copyProspect(p)}
                      className="p-1.5 rounded-lg focus-ring transition-colors hover:bg-white/5 shrink-0"
                      style={{ color: copied === p.id ? A.positive : A.text2 }}
                      aria-label={`Copiar datos de ${p.name}`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>

        {/* Mapa */}
        <div className="xl:col-span-8">
          <div className="liquid-glass rounded-2xl overflow-hidden relative" style={{ backgroundColor: "rgba(15,14,22,0.55)" }}>
            <div ref={mapRef} className="w-full h-[560px] xl:h-[680px]" aria-label="Mapa de prospectos en Bogotá" />
            <div className="absolute bottom-3 left-3 z-[1000] flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.16em]" style={{ backgroundColor: "rgba(8,7,13,0.85)", color: A.text2, border: `1px solid ${A.border}` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: A.gold }} />
              {prospects.length} prospectos en el mapa
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ DRAWER: dossier del prospecto → contacto → lead ══════════ */}
      {selected && (
        <>
          <div className="fixed inset-0 z-[1150] bg-black/50" onClick={() => setSelected(null)} aria-hidden />
          <aside
            className="fixed inset-y-0 right-0 z-[1200] w-full sm:w-[440px] overflow-y-auto liquid-glass"
            style={{ backgroundColor: "rgba(10,9,16,0.96)", borderLeft: `1px solid ${A.border}` }}
            role="dialog"
            aria-label={`Detalle del prospecto ${selected.name}`}
          >
            <div className="p-6 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: selected.color }} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: selected.color }}>{selected.categoryLabel}</span>
                  </div>
                  <h2 className="font-display font-semibold text-xl leading-tight" style={{ color: A.text }}>{selected.name}</h2>
                  <div className="text-xs mt-1" style={{ color: A.textDim }}>
                    {zone.label}{selected.street ? ` · ${selected.street}` : ""}
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 rounded-lg focus-ring hover:bg-white/5 shrink-0" style={{ color: A.text2 }} aria-label="Cerrar detalle">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Estado */}
              <div className="flex flex-wrap gap-1.5">
                {savedLeads[selected.id] && <span className="px-2 py-1 rounded-full font-mono text-[9px] uppercase tracking-[0.12em]" style={{ backgroundColor: "rgba(126,226,168,0.14)", color: A.positive }}>Lead en CRM ✓</span>}
                {contacted[selected.id] && <span className="px-2 py-1 rounded-full font-mono text-[9px] uppercase tracking-[0.12em]" style={{ backgroundColor: "rgba(59,111,212,0.16)", color: A.blue }}>Contactado</span>}
                <span className="px-2 py-1 rounded-full font-mono text-[9px] uppercase tracking-[0.12em]" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: A.textDim }}>Fuente: OpenStreetMap</span>
              </div>

              {/* Ángulo comercial — la necesidad que atacamos */}
              <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(214,180,106,0.07)", border: `1px solid rgba(214,180,106,0.22)` }}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: A.gold }} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: A.gold }}>Necesidad típica del sector</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: A.text2 }}>{pitchFor(selected.category).need}</p>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: A.textDim }}>
                  Oferta: recepcionista con IA (atiende 24/7, agenda y confirma) + automatización del seguimiento comercial.
                </p>
              </div>

              {/* Mensaje editable */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: A.textDim }}>
                  Mensaje de presentación (editable — reemplaza [Tu nombre])
                </div>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={9}
                  className="w-full rounded-xl px-3.5 py-3 text-[13px] leading-relaxed outline-none transition-colors focus:border-[rgba(214,180,106,0.55)]"
                  style={{ backgroundColor: A.bg, border: `1px solid ${A.border}`, color: A.text, resize: "vertical" }}
                />
              </div>

              {/* Canales disponibles */}
              <div className="space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: A.textDim }}>Contactar por los canales disponibles</div>

                {waNumber(selected.phone) && (
                  <>
                    <a
                      href={`https://wa.me/${waNumber(selected.phone)}?text=${encodeURIComponent(draft)}`}
                      target="_blank" rel="noopener noreferrer"
                      onClick={() => markContacted(selected)}
                      className="btn-premium focus-ring w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full font-display font-semibold text-sm"
                      style={{ backgroundColor: "#22C15E", color: "#06130A" }}
                    >
                      <MessageCircle className="w-4 h-4" /> Enviar por WhatsApp (mensaje listo)
                    </a>
                    <a
                      href={`https://web.whatsapp.com/send?phone=${waNumber(selected.phone)}&text=${encodeURIComponent(draft)}`}
                      target="_blank" rel="noopener noreferrer"
                      onClick={() => markContacted(selected)}
                      className="focus-ring w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full font-display font-semibold text-[11px] border transition-colors hover:bg-white/5"
                      style={{ borderColor: "rgba(34,193,94,0.35)", color: "#7EE2A8" }}
                    >
                      <Globe className="w-3 h-3" /> Abrir en WhatsApp Web (navegador)
                    </a>
                  </>
                )}

                {selected.phone && (
                  <div className="flex gap-2">
                    <a
                      href={`tel:${selected.phone.replace(/[^\d+]/g, "")}`}
                      onClick={() => markContacted(selected)}
                      className="focus-ring flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-display font-semibold text-xs border transition-colors hover:bg-white/5"
                      style={{ borderColor: A.border, color: A.text }}
                    >
                      <PhoneCall className="w-3.5 h-3.5" style={{ color: A.gold }} /> Llamar {selected.phone}
                    </a>
                    <button
                      onClick={() => copyText(`script-${selected.id}`, buildCallScript(selected))}
                      className="focus-ring flex items-center gap-1.5 px-3 py-2.5 rounded-full text-xs border transition-colors hover:bg-white/5"
                      style={{ borderColor: A.border, color: copied === `script-${selected.id}` ? A.positive : A.text2 }}
                      title="Copiar guion de llamada"
                    >
                      {copied === `script-${selected.id}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Guion
                    </button>
                  </div>
                )}

                {/* Outlook Web — correo redactado directo en tu cuenta */}
                <div className="flex gap-2">
                  <a
                    href={outlookComposeUrl(selected)}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => { if (selected.email) markContacted(selected); }}
                    className="focus-ring flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-display font-semibold text-xs border transition-colors hover:bg-white/5"
                    style={{ borderColor: "rgba(77,124,254,0.4)", color: "#8FAEFF" }}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {selected.email ? `Redactar en Outlook → ${selected.email}` : "Redactar en Outlook (pega el destinatario)"}
                  </a>
                  {selected.email && (
                    <a
                      href={`mailto:${selected.email}?subject=${encodeURIComponent(buildEmail(selected).subject)}&body=${encodeURIComponent(buildEmail(selected).body)}`}
                      onClick={() => markContacted(selected)}
                      className="focus-ring flex items-center px-3 py-2.5 rounded-full text-xs border transition-colors hover:bg-white/5"
                      style={{ borderColor: A.border, color: A.text2 }}
                      title="Abrir en tu cliente de correo predeterminado"
                    >
                      App
                    </a>
                  )}
                </div>

                {selected.website && (
                  <div className="flex gap-2">
                    <a
                      href={selected.website}
                      target="_blank" rel="noopener noreferrer"
                      className="focus-ring flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-display font-semibold text-xs border transition-colors hover:bg-white/5"
                      style={{ borderColor: A.border, color: A.text }}
                    >
                      <Globe className="w-3.5 h-3.5" style={{ color: A.blue }} /> Abrir sitio web
                    </a>
                    <button
                      onClick={() => { copyText(`web-${selected.id}`, buildWebMessage(selected)); markContacted(selected); }}
                      className="focus-ring flex items-center gap-1.5 px-3 py-2.5 rounded-full text-xs border transition-colors hover:bg-white/5"
                      style={{ borderColor: A.border, color: copied === `web-${selected.id}` ? A.positive : A.text2 }}
                      title="Copiar mensaje para su formulario de contacto"
                    >
                      {copied === `web-${selected.id}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Msj
                    </button>
                  </div>
                )}

                <a
                  href={googleMapsUrl(selected)}
                  target="_blank" rel="noopener noreferrer"
                  className="focus-ring w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-display font-semibold text-xs border transition-colors hover:bg-white/5"
                  style={{ borderColor: A.border, color: A.text2 }}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Ver el negocio en Google Maps (ficha, reseñas, teléfono)
                </a>

                {/* Buscador de canales — SIEMPRE hay un camino para llegarles */}
                <div className="pt-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: !selected.phone && !selected.website && !selected.email ? A.gold : A.textDim }}>
                    {!selected.phone && !selected.website && !selected.email
                      ? "OSM no trae canales — encuéntralos aquí"
                      : "Encontrar más canales"}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={googleContactUrl(selected, zone.label)}
                      target="_blank" rel="noopener noreferrer"
                      className="focus-ring flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full font-display font-semibold text-[11px] border transition-colors hover:bg-white/5"
                      style={{ borderColor: A.border, color: A.text }}
                    >
                      <Search className="w-3 h-3" style={{ color: A.gold }} /> Teléfono / WhatsApp en Google
                    </a>
                    <a
                      href={instagramSearchUrl(selected)}
                      target="_blank" rel="noopener noreferrer"
                      className="focus-ring flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full font-display font-semibold text-[11px] border transition-colors hover:bg-white/5"
                      style={{ borderColor: A.border, color: A.text }}
                    >
                      <ExternalLink className="w-3 h-3" style={{ color: "#F0A3C4" }} /> Instagram del negocio
                    </a>
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed" style={{ color: A.textDim }}>
                    Encontraste el número o el correo → cópialo, vuelve aquí y usa los botones de arriba con el mensaje ya listo.
                  </p>
                </div>
              </div>

              {/* Convertir en lead */}
              <div className="pt-4 border-t" style={{ borderColor: A.border }}>
                <Button
                  onClick={() => saveLead(selected)}
                  disabled={savingLead || !!savedLeads[selected.id]}
                  className="w-full justify-center"
                >
                  {savingLead ? <Loader2 className="w-4 h-4 animate-spin" /> : savedLeads[selected.id] ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {savedLeads[selected.id] ? "Ya es lead en el CRM" : "Guardar como lead en el CRM"}
                </Button>
                {leadMsg && (
                  <p className="mt-2 text-xs text-center" style={{ color: /✓|existía/.test(leadMsg) ? A.positive : A.alert }} role="status">
                    {leadMsg}{/✓/.test(leadMsg) && <> · <a href="/app/solicitudes" className="underline" style={{ color: A.gold }}>Ver en Solicitudes</a></>}
                  </p>
                )}
                <p className="mt-3 text-[10px] leading-relaxed" style={{ color: A.textDim }}>
                  Verifica los datos antes del primer contacto y respeta la normativa de contacto comercial (Habeas Data, Ley 1581 de 2012). Los mensajes son borradores: personalízalos.
                </p>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
