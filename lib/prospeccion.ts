/**
 * Prospección — lógica compartida entre /app/prospeccion y /app/cola.
 * Tipos, categorías, pitches por sector, builders de mensajes/URLs,
 * pool persistente de prospectos y seguimientos automáticos (Tareas).
 *
 * Todo el estado vive en localStorage, consistente con el data-source
 * del Command Center (honesto: sin backend, sin datos inventados).
 */
import type { Task } from "@/lib/internal/types";
import { STORE_KEYS } from "@/lib/internal/data-source";

/* ─── Tipos ──────────────────────────────────────────────────────── */
export type Prospect = {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  color: string;
  lat: number;
  lon: number;
  phone?: string;
  website?: string;
  email?: string;
  street?: string;
};

export type PoolItem = Prospect & { zoneLabel: string; addedAt: number };

/* ─── Categorías de negocio (Overpass tags + identidad visual) ──── */
export const CATEGORIES = [
  { id: "restaurant", label: "Restaurantes", query: `nwr["amenity"="restaurant"]`, color: "#D6B46A" },
  { id: "cafe", label: "Cafés", query: `nwr["amenity"="cafe"]`, color: "#E2C58A" },
  { id: "dentist", label: "Odontologías", query: `nwr["amenity"="dentist"]`, color: "#4FB6C7" },
  { id: "clinic", label: "Clínicas", query: `nwr["amenity"="clinic"]`, color: "#7EE2A8" },
  { id: "gym", label: "Gimnasios", query: `nwr["leisure"="fitness_centre"]`, color: "#4D7CFE" },
  { id: "hotel", label: "Hoteles", query: `nwr["tourism"="hotel"]`, color: "#9F84D0" },
  { id: "beauty", label: "Belleza · Spa", query: `nwr["shop"~"beauty|hairdresser"]`, color: "#F0A3C4" },
  { id: "realestate", label: "Inmobiliarias", query: `nwr["office"="estate_agent"]`, color: "#F0C36A" },
  { id: "lawyer", label: "Abogados", query: `nwr["office"="lawyer"]`, color: "#C9CFDA" },
  { id: "car", label: "Concesionarios", query: `nwr["shop"="car"]`, color: "#E08577" },
  { id: "vet", label: "Veterinarias", query: `nwr["amenity"="veterinary"]`, color: "#7C5CBF" },
] as const;

/* ─── Ángulos comerciales por categoría ───────────────────────────
   Cada pitch ATACA una necesidad concreta del sector y ofrece la
   solución Aureon: recepcionista con IA + automatización comercial. */
export const PITCHES: Record<string, { need: string; hook: string }> = {
  restaurant: {
    need: "Pierden reservas y pedidos cuando el teléfono suena ocupado o el WhatsApp queda sin responder en horas pico.",
    hook: "vemos un patrón en restaurantes: se pierden reservas y pedidos cuando el teléfono está ocupado o el WhatsApp queda sin responder en hora pico. Implementamos una recepcionista con IA que responde 24/7, toma reservas y las confirma por WhatsApp automáticamente",
  },
  cafe: {
    need: "Clientes de una sola visita: sin base de datos ni forma de traerlos de vuelta.",
    hook: "trabajamos con cafés que venden bien pero no tienen forma de hacer volver a sus clientes. Montamos un sistema simple: pedidos y reservas por WhatsApp con IA + base de clientes con campañas automáticas de recompra",
  },
  dentist: {
    need: "Citas que no se confirman, no-shows que dejan huecos en la agenda y pacientes que escriben fuera de horario sin respuesta.",
    hook: "en odontologías vemos siempre lo mismo: no-shows que dejan huecos en la agenda y pacientes que escriben de noche y no reciben respuesta hasta el otro día (cuando ya llamaron a otra clínica). Nuestra recepcionista con IA agenda, confirma y recuerda citas por WhatsApp 24/7",
  },
  clinic: {
    need: "Pacientes que llegan por recomendación pero se pierden por falta de respuesta y seguimiento.",
    hook: "las clínicas pierden pacientes nuevos por algo evitable: demora en responder y cero seguimiento después de la primera consulta. Implementamos recepcionista con IA para agendar 24/7 + recordatorios y seguimiento automático por WhatsApp",
  },
  gym: {
    need: "Leads que preguntan precios, no reciben seguimiento y nunca se convierten en membresías.",
    hook: "los gimnasios reciben decenas de personas preguntando precios por WhatsApp e Instagram… y la mayoría se enfría sin seguimiento. Montamos un sistema con IA que responde al instante, agenda la clase de prueba y hace el seguimiento hasta la inscripción",
  },
  hotel: {
    need: "Dependencia de OTAs (Booking, Expedia) que se quedan con la comisión de reservas que podrían ser directas.",
    hook: "los hoteles pagan comisiones enormes a las OTAs por reservas que podrían ser directas. Implementamos una recepcionista con IA en WhatsApp y web que cotiza, responde 24/7 en varios idiomas y convierte consultas en reservas directas",
  },
  beauty: {
    need: "Agenda con huecos por no-shows y clientas que escriben por Instagram sin recibir respuesta a tiempo.",
    hook: "en salones y spas la agenda pierde plata dos veces: no-shows y clientas que escriben por Instagram o WhatsApp y no reciben respuesta a tiempo. Nuestra IA agenda, confirma y recuerda citas sola, y reactiva clientas inactivas",
  },
  realestate: {
    need: "Leads de portales inmobiliarios que se enfrían porque nadie responde en los primeros 5 minutos.",
    hook: "en finca raíz el lead que no se contacta en 5 minutos se enfría. Conectamos sus portales y su WhatsApp a una IA que responde al instante, califica al interesado (presupuesto, zona, crédito) y le agenda la visita al asesor",
  },
  lawyer: {
    need: "Consultas que llegan fuera de horario o por formularios que nadie revisa a tiempo.",
    hook: "las firmas pierden casos porque la consulta llega un sábado por la noche y la respuesta sale el lunes. Implementamos una recepcionista con IA que atiende 24/7, hace la pre-consulta con las preguntas correctas y agenda la cita con el abogado indicado",
  },
  car: {
    need: "Leads digitales que preguntan por un vehículo y reciben respuesta horas después, cuando ya visitaron otro concesionario.",
    hook: "en el sector automotor el comprador escribe a 4 concesionarios a la vez — gana el que responde primero. Nuestra IA responde al instante con ficha y fotos del vehículo, califica al comprador y agenda el test drive",
  },
  vet: {
    need: "Citas y controles que se olvidan, y dueños de mascotas que escriben a toda hora sin respuesta.",
    hook: "en veterinarias los controles y vacunas se pierden porque nadie los recuerda. Montamos recordatorios automáticos por WhatsApp + una recepcionista con IA que agenda citas y responde dudas frecuentes 24/7",
  },
};
export const DEFAULT_PITCH = {
  need: "Mensajes y llamadas de clientes potenciales que quedan sin respuesta oportuna, y cero seguimiento sistemático.",
  hook: "trabajamos con negocios de la zona y el patrón se repite: clientes que escriben o llaman, no reciben respuesta a tiempo y se van con la competencia. Implementamos una recepcionista con IA que atiende 24/7 por WhatsApp y automatizamos el seguimiento comercial",
};

export const pitchFor = (categoryId: string) => PITCHES[categoryId] || DEFAULT_PITCH;

/* ─── Canales de envío ────────────────────────────────────────────── */

/* Normaliza teléfono colombiano a formato wa.me — solo celulares */
export function waNumber(phone?: string): string | null {
  if (!phone) return null;
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("57")) d = d;
  else if (d.length === 10 && d.startsWith("3")) d = "57" + d;
  else return null; // fijos u otros formatos: mejor llamar
  return d.length === 12 ? d : null;
}

export function buildWhatsApp(p: Prospect): string {
  const pitch = pitchFor(p.category);
  return `Hola, ¿hablo con el equipo de ${p.name}? 👋

Soy [Tu nombre], de Aureon Growth Services (Bogotá). Les escribo porque ${pitch.hook} — sin que cambien su forma de trabajar.

¿Les interesa verlo en una demo de 10 minutos esta semana? Sin compromiso.`;
}

export function buildCallScript(p: Prospect): string {
  const pitch = pitchFor(p.category);
  return `Guion de llamada — ${p.name}

1. Apertura: "Buenos días, ¿me comunica con la persona encargada de ${p.name}? Le habla [Tu nombre], de Aureon Growth Services."
2. Permiso: "¿Tiene 40 segundos? Le cuento a qué le llamo y usted decide si le interesa."
3. Necesidad: "${pitch.need}"
4. Solución: "Nosotros implementamos una recepcionista con inteligencia artificial que atiende WhatsApp y llamadas 24/7, agenda y hace seguimiento automático."
5. Cierre: "¿Le parece si le muestro cómo funciona en una demo de 10 minutos esta semana? ¿Qué día le queda mejor?"

Objeción "ya tenemos quien conteste": "Perfecto — esto no reemplaza a su equipo, atiende lo que hoy se queda sin responder: la noche, los fines de semana y las horas pico."`;
}

export function buildEmail(p: Prospect): { subject: string; body: string } {
  const pitch = pitchFor(p.category);
  return {
    subject: `${p.name} — atender 24/7 sin contratar más personal`,
    body: `Hola, equipo de ${p.name}:

Soy [Tu nombre], de Aureon Growth Services (Bogotá).

Les escribo porque ${pitch.hook}.

En concreto, implementamos:
• Recepcionista con IA: responde WhatsApp y llamadas 24/7, agenda y confirma citas
• Automatización comercial: seguimiento de cada cliente potencial sin trabajo manual
• Panel de resultados: saben exactamente cuántos clientes entran y de dónde

¿Les interesa una demo de 10 minutos esta semana? Respondan este correo o escríbannos por WhatsApp y coordinamos.

Saludos,
[Tu nombre]
Aureon Growth Services`,
  };
}

export function buildWebMessage(p: Prospect): string {
  const pitch = pitchFor(p.category);
  return `Hola, equipo de ${p.name}. Soy [Tu nombre], de Aureon Growth Services. Les escribo por su formulario porque ${pitch.hook}. ¿Les interesa una demo de 10 minutos? Mi WhatsApp: [tu número]. Gracias.`;
}

/* Outlook Web: deeplink de redacción con asunto y cuerpo ya escritos */
export function outlookComposeUrl(p: Prospect): string {
  const { subject, body } = buildEmail(p);
  const params = new URLSearchParams();
  if (p.email) params.set("to", p.email);
  params.set("subject", subject);
  params.set("body", body);
  return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
}

/* Google Maps: busca el NOMBRE del negocio centrado en sus coordenadas
   exactas — aparece la ficha real (reseñas, horario, teléfono). */
export function googleMapsUrl(p: Prospect): string {
  return `https://www.google.com/maps/search/${encodeURIComponent(p.name)}/@${p.lat},${p.lon},18z`;
}

export function googleContactUrl(p: Prospect, zoneLabel: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(`"${p.name}" ${zoneLabel} Bogotá teléfono WhatsApp contacto`)}`;
}
export function instagramSearchUrl(p: Prospect): string {
  return `https://www.google.com/search?q=${encodeURIComponent(`"${p.name}" Bogotá site:instagram.com`)}`;
}

/* ─── Estado compartido (localStorage) ────────────────────────────── */
export const POOL_KEY = "aureon:prospeccion:pool";
export const CONTACTED_KEY = "aureon:prospeccion:contactados";
export const LEADS_KEY = "aureon:prospeccion:leads";
const POOL_CAP = 800;

export function readPool(): PoolItem[] {
  try { return JSON.parse(localStorage.getItem(POOL_KEY) || "[]"); } catch { return []; }
}

/** Cada búsqueda alimenta el pool (dedup por id, cap 800, FIFO). */
export function addToPool(prospects: Prospect[], zoneLabel: string): number {
  try {
    const pool = readPool();
    const known = new Set(pool.map((x) => x.id));
    const now = Date.now();
    for (const p of prospects) {
      if (!known.has(p.id)) {
        pool.push({ ...p, zoneLabel, addedAt: now });
        known.add(p.id);
      }
    }
    const trimmed = pool.slice(-POOL_CAP);
    localStorage.setItem(POOL_KEY, JSON.stringify(trimmed));
    return trimmed.length;
  } catch { return 0; }
}

export function readFlags(key: string): Record<string, true> {
  try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch { return {}; }
}
export function writeFlag(key: string, id: string) {
  try {
    const flags = readFlags(key);
    flags[id] = true;
    localStorage.setItem(key, JSON.stringify(flags));
  } catch {}
}

/* ─── Seguimientos automáticos → tareas reales del módulo Tareas ──
   Al marcar un prospecto como contactado se crean dos tareas con
   vencimiento a 3 y 7 días. Guard anti-duplicados por id de prospecto. */
const isoDate = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

export function scheduleFollowUps(p: Prospect, zoneLabel: string): boolean {
  try {
    const raw = localStorage.getItem(STORE_KEYS.tasks);
    const tasks: Task[] = raw ? JSON.parse(raw) : [];
    const baseId = `T-FU-${p.id}`;
    if (tasks.some((t) => t.id.startsWith(baseId))) return false; // ya programado

    const channels = [
      p.phone && `Tel: ${p.phone}`,
      p.website && `Web: ${p.website}`,
      p.email && `Email: ${p.email}`,
    ].filter(Boolean).join(" · ") || "Canales: buscar en Google Maps / Instagram";

    const mk = (suffix: string, days: number, priority: Task["priority"]): Task => ({
      id: `${baseId}-${suffix}`,
      title: `Seguimiento ${suffix} — ${p.name}`,
      description: `Prospecto de ${p.categoryLabel} en ${zoneLabel} contactado el ${isoDate(0)}. ${channels}. Ángulo: ${pitchFor(p.category).need}`,
      owner: "Juan L.",
      dueDate: isoDate(days),
      priority,
      status: "Pendiente",
      tags: ["prospección", "seguimiento"],
    });

    tasks.unshift(mk("día 3", 3, "medium"), mk("día 7", 7, "high"));
    localStorage.setItem(STORE_KEYS.tasks, JSON.stringify(tasks));
    return true;
  } catch { return false; }
}
