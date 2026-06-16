/**
 * MOCK seed data for Aureon Command Center.
 * Replace with real data from Supabase / Prisma when a backend is wired.
 * All numbers are clearly internal samples — no public claims are made.
 */

import type {
  IncomingRequest, Lead, Client, Project, Task, CalendarEvent,
  InternalService, Proposal, Contract, Invoice, Expense, FileRecord, User,
} from "./types";

// ─── USERS ──────────────────────────────────────────────────────────
export const USERS: User[] = [
  { id: "u1", name: "Juan L.", email: "aureongrowthservices@outlook.com", role: "Owner", department: "Leadership", active: true },
  { id: "u2", name: "Camila R.", email: "growth@aureon.local", role: "Strategy", department: "Growth", active: true },
  { id: "u3", name: "Andrés M.", email: "strategy@aureon.local", role: "Strategy", department: "Strategy", active: true },
  { id: "u4", name: "Mariana V.", email: "brand@aureon.local", role: "Design", department: "Brand", active: true },
  { id: "u5", name: "Daniel O.", email: "data@aureon.local", role: "Automation", department: "Data & AI", active: true },
  { id: "u6", name: "Felipe C.", email: "tech@aureon.local", role: "Performance", department: "Tech", active: true },
  { id: "u7", name: "Sebastián R.", email: "ops@aureon.local", role: "Finance", department: "Operations", active: true },
];

// ─── INCOMING REQUESTS ──────────────────────────────────────────────
export const REQUESTS: IncomingRequest[] = [
  { id: "REQ-0012", date: "2026-06-14", name: "Laura Castro", company: "Aetherline", email: "laura@aetherline.co", whatsapp: "+57 312 555 0142", website: "aetherline.co", service: "Brand Authority System", challenge: "Marca sin posicionamiento claro vs competidores.", source: "Diagnóstico web", status: "Nueva", priority: "high", owner: "Juan L.", nextAction: "Llamada de calificación" },
  { id: "REQ-0011", date: "2026-06-13", name: "Mateo Vélez", company: "Núcleo Lab", email: "mateo@nucleo.io", whatsapp: "+57 300 555 9911", service: "Revenue Automation", challenge: "Reciben leads pero no hay seguimiento ni CRM.", source: "WhatsApp", status: "En revisión", priority: "medium", owner: "Camila R.", nextAction: "Programar diagnóstico" },
  { id: "REQ-0010", date: "2026-06-12", name: "Sofía Ramírez", company: "Mira Skincare", email: "sofia@mira.co", whatsapp: "+57 320 555 4477", service: "Acquisition Engine", challenge: "Campañas con CPL alto, sin landing optimizada.", source: "Campaña", status: "Contactada", priority: "high", owner: "Camila R.", nextAction: "Enviar agenda" },
  { id: "REQ-0009", date: "2026-06-11", name: "Diego Ortiz", company: "FinFlow", email: "diego@finflow.app", whatsapp: "+57 301 555 7711", service: "Growth Intelligence", challenge: "Dashboards desconectados y reportes manuales.", source: "Referido", status: "Diagnóstico agendado", priority: "high", owner: "Andrés M.", nextAction: "Diagnóstico 16/06" },
  { id: "REQ-0008", date: "2026-06-10", name: "Camila Soto", company: "Indaba Studio", email: "camila@indaba.studio", whatsapp: "+57 313 555 2102", service: "Brand Authority System", challenge: "Branding sin sistema y mensajes inconsistentes.", source: "LinkedIn", status: "Propuesta enviada", priority: "medium", owner: "Mariana V.", nextAction: "Seguimiento propuesta" },
  { id: "REQ-0007", date: "2026-06-09", name: "Ricardo Pérez", company: "Cobalto SaaS", email: "ricardo@cobalto.io", whatsapp: "+57 311 555 8120", service: "Sistema integral", challenge: "Quieren reconstruir su sistema comercial completo.", source: "Diagnóstico web", status: "Nurturing", priority: "low", owner: "Juan L.", nextAction: "Newsletter mensual" },
  { id: "REQ-0006", date: "2026-06-08", name: "Andrea Gómez", company: "Lúmen Coffee", email: "andrea@lumen.coffee", whatsapp: "+57 314 555 6603", service: "Acquisition Engine", challenge: "Subir tráfico orgánico y mejorar conversión.", source: "Instagram", status: "Ganada", priority: "medium", owner: "Camila R.", nextAction: "Kickoff onboarding" },
  { id: "REQ-0005", date: "2026-06-06", name: "Esteban Ruiz", company: "Verde Salud", email: "esteban@verdesalud.co", whatsapp: "+57 302 555 9100", service: "Revenue Automation", challenge: "Pipeline desordenado y sin nurturing.", source: "Email", status: "Perdida", priority: "low", owner: "Andrés M.", nextAction: "Cerrar caso" },
];

// ─── CRM LEADS ──────────────────────────────────────────────────────
export const LEADS: Lead[] = [
  { id: "L-1001", contact: "Laura Castro", company: "Aetherline", email: "laura@aetherline.co", phone: "+57 312 555 0142", source: "Diagnóstico web", service: "Brand Authority System", budget: "Empresa en crecimiento", pain: "Marca sin diferenciación", stage: "Nuevo lead", probability: 25, value: 14500, nextAction: "Llamada de calificación", nextActionDate: "2026-06-16", owner: "Juan L." },
  { id: "L-1002", contact: "Mateo Vélez", company: "Núcleo Lab", email: "mateo@nucleo.io", phone: "+57 300 555 9911", source: "WhatsApp", service: "Revenue Automation", budget: "Empresa en crecimiento", pain: "Sin CRM ni seguimiento", stage: "Calificado", probability: 45, value: 18000, nextAction: "Agendar diagnóstico", nextActionDate: "2026-06-17", owner: "Camila R." },
  { id: "L-1003", contact: "Sofía Ramírez", company: "Mira Skincare", email: "sofia@mira.co", phone: "+57 320 555 4477", source: "Campaña", service: "Acquisition Engine", budget: "Empresa consolidada", pain: "CPL alto y baja conversión", stage: "Diagnóstico agendado", probability: 55, value: 22000, nextAction: "Diagnóstico 18/06", nextActionDate: "2026-06-18", owner: "Camila R." },
  { id: "L-1004", contact: "Diego Ortiz", company: "FinFlow", email: "diego@finflow.app", phone: "+57 301 555 7711", source: "Referido", service: "Growth Intelligence", budget: "Empresa consolidada", pain: "Reportes manuales", stage: "Diagnóstico realizado", probability: 70, value: 26500, nextAction: "Enviar propuesta", nextActionDate: "2026-06-19", owner: "Andrés M." },
  { id: "L-1005", contact: "Camila Soto", company: "Indaba Studio", email: "camila@indaba.studio", phone: "+57 313 555 2102", source: "LinkedIn", service: "Brand Authority System", budget: "Empresa en crecimiento", pain: "Sin sistema de marca", stage: "Propuesta enviada", probability: 60, value: 17500, nextAction: "Seguimiento propuesta", nextActionDate: "2026-06-20", owner: "Mariana V." },
  { id: "L-1006", contact: "Ricardo Pérez", company: "Cobalto SaaS", email: "ricardo@cobalto.io", phone: "+57 311 555 8120", source: "Diagnóstico web", service: "Sistema integral", budget: "Empresa consolidada", pain: "Sistema comercial fragmentado", stage: "Negociación", probability: 75, value: 38000, nextAction: "Ajustar alcance", nextActionDate: "2026-06-21", owner: "Juan L." },
  { id: "L-1007", contact: "Andrea Gómez", company: "Lúmen Coffee", email: "andrea@lumen.coffee", phone: "+57 314 555 6603", source: "Instagram", service: "Acquisition Engine", budget: "Empresa en crecimiento", pain: "Crecer orgánico y pagado", stage: "Ganado", probability: 100, value: 21000, nextAction: "Kickoff onboarding", nextActionDate: "2026-06-22", owner: "Camila R." },
  { id: "L-1008", contact: "Esteban Ruiz", company: "Verde Salud", email: "esteban@verdesalud.co", phone: "+57 302 555 9100", source: "Email", service: "Revenue Automation", budget: "Empresa en crecimiento", pain: "Pipeline desordenado", stage: "Perdido", probability: 0, value: 0, nextAction: "Cerrar caso", owner: "Andrés M." },
  { id: "L-1009", contact: "Valentina Cifuentes", company: "NoctaWear", email: "vale@noctawear.com", phone: "+57 318 555 0098", source: "Diagnóstico web", service: "Brand Authority System", budget: "Idea / etapa temprana", pain: "Lanzamiento sin marca clara", stage: "Nurturing", probability: 15, value: 9500, nextAction: "Compartir caso de uso", owner: "Mariana V." },
];

// ─── CLIENTS ────────────────────────────────────────────────────────
export const CLIENTS: Client[] = [
  { id: "C-200", company: "Lúmen Coffee", contact: "Andrea Gómez", email: "andrea@lumen.coffee", phone: "+57 314 555 6603", services: ["Acquisition Engine"], status: "Activo", startDate: "2026-05-15", monthlyValue: 3500, projects: ["P-301"], pendingInvoices: 0 },
  { id: "C-201", company: "Aetherline", contact: "Laura Castro", email: "laura@aetherline.co", phone: "+57 312 555 0142", services: ["Brand Authority System"], status: "Potencial", startDate: "—", monthlyValue: 0, projects: [], pendingInvoices: 0 },
  { id: "C-202", company: "FinFlow", contact: "Diego Ortiz", email: "diego@finflow.app", phone: "+57 301 555 7711", services: ["Growth Intelligence", "Revenue Automation"], status: "Activo", startDate: "2026-04-02", monthlyValue: 8500, projects: ["P-302", "P-303"], pendingInvoices: 1 },
  { id: "C-203", company: "Indaba Studio", contact: "Camila Soto", email: "camila@indaba.studio", phone: "+57 313 555 2102", services: ["Brand Authority System"], status: "Pausado", startDate: "2026-03-10", monthlyValue: 0, projects: ["P-304"], pendingInvoices: 0 },
];

// ─── PROJECTS ───────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  { id: "P-301", name: "Lúmen — Acquisition Engine Q3", clientId: "C-200", service: "Acquisition Engine", owner: "Camila R.", startDate: "2026-05-20", dueDate: "2026-07-30", priority: "high", progress: 35, status: "En progreso", budget: 10500, deliverables: [
    { title: "Plan de medios", done: true },
    { title: "Landing optimizada", done: false },
    { title: "Setup de tracking", done: false },
    { title: "Reporte primer mes", done: false },
  ]},
  { id: "P-302", name: "FinFlow — Dashboard ejecutivo", clientId: "C-202", service: "Growth Intelligence", owner: "Andrés M.", startDate: "2026-05-05", dueDate: "2026-06-30", priority: "high", progress: 70, status: "En revisión", budget: 12000, deliverables: [
    { title: "Plan de medición", done: true },
    { title: "Dashboard v1", done: true },
    { title: "Reporte ejecutivo plantilla", done: false },
  ]},
  { id: "P-303", name: "FinFlow — Automatización CRM", clientId: "C-202", service: "Revenue Automation", owner: "Daniel O.", startDate: "2026-06-01", dueDate: "2026-08-15", priority: "medium", progress: 20, status: "Planeación", budget: 14500, deliverables: [
    { title: "Arquitectura CRM", done: true },
    { title: "Flujos WhatsApp", done: false },
    { title: "Lead scoring", done: false },
  ]},
  { id: "P-304", name: "Indaba — Brand Authority", clientId: "C-203", service: "Brand Authority System", owner: "Mariana V.", startDate: "2026-03-10", dueDate: "2026-06-10", priority: "medium", progress: 80, status: "Esperando cliente", budget: 8500, deliverables: [
    { title: "Diagnóstico de marca", done: true },
    { title: "Sistema verbal", done: true },
    { title: "Dirección visual", done: true },
    { title: "Aplicación comercial", done: false },
  ]},
];

// ─── TASKS ──────────────────────────────────────────────────────────
export const TASKS: Task[] = [
  { id: "T-401", title: "Revisar landing Lúmen", description: "Validar copy y CTA del hero", projectId: "P-301", clientId: "C-200", service: "Acquisition Engine", owner: "Felipe C.", dueDate: "2026-06-16", priority: "high", status: "En progreso", tags: ["landing", "CRO"] },
  { id: "T-402", title: "Configurar eventos GA4 FinFlow", projectId: "P-302", clientId: "C-202", service: "Growth Intelligence", owner: "Daniel O.", dueDate: "2026-06-17", priority: "high", status: "Pendiente", tags: ["tracking", "GA4"] },
  { id: "T-403", title: "Storyboard reel — Lúmen", projectId: "P-301", clientId: "C-200", service: "Acquisition Engine", owner: "Mariana V.", dueDate: "2026-06-18", priority: "medium", status: "En revisión", tags: ["video", "creative"] },
  { id: "T-404", title: "Diagrama de flujo CRM FinFlow", projectId: "P-303", clientId: "C-202", service: "Revenue Automation", owner: "Andrés M.", dueDate: "2026-06-19", priority: "medium", status: "Pendiente", tags: ["CRM"] },
  { id: "T-405", title: "Entregar dirección visual Indaba", projectId: "P-304", clientId: "C-203", service: "Brand Authority System", owner: "Mariana V.", dueDate: "2026-06-12", priority: "critical", status: "Bloqueada", tags: ["brand"] },
  { id: "T-406", title: "Plan editorial Q3 — Lúmen", projectId: "P-301", clientId: "C-200", service: "Acquisition Engine", owner: "Camila R.", dueDate: "2026-06-22", priority: "low", status: "Pendiente", tags: ["content"] },
  { id: "T-407", title: "Reporte ejecutivo mayo — FinFlow", projectId: "P-302", clientId: "C-202", service: "Growth Intelligence", owner: "Andrés M.", dueDate: "2026-06-15", priority: "high", status: "Completada", tags: ["reporting"] },
];

// ─── CALENDAR EVENTS (week of 16-22 jun 2026) ───────────────────────
export const EVENTS: CalendarEvent[] = [
  { id: "E-001", title: "Diagnóstico — Mira Skincare", date: "2026-06-18", time: "09:30", duration: 60, type: "Diagnóstico", client: "Mira Skincare", owner: "Camila R." },
  { id: "E-002", title: "Kickoff — Lúmen Coffee", date: "2026-06-16", time: "11:00", duration: 60, type: "Reunión", client: "Lúmen Coffee", owner: "Juan L." },
  { id: "E-003", title: "Entrega dirección visual — Indaba", date: "2026-06-19", time: "15:00", duration: 30, type: "Entrega", client: "Indaba Studio", owner: "Mariana V." },
  { id: "E-004", title: "Revisión propuesta — Aetherline", date: "2026-06-20", time: "10:00", duration: 45, type: "Revisión", client: "Aetherline", owner: "Juan L." },
  { id: "E-005", title: "Vencimiento factura INV-0042", date: "2026-06-22", time: "23:59", duration: 0, type: "Facturación", client: "FinFlow", owner: "Sebastián R." },
  { id: "E-006", title: "Diagnóstico — FinFlow Q3", date: "2026-06-17", time: "14:00", duration: 60, type: "Diagnóstico", client: "FinFlow", owner: "Andrés M." },
  { id: "E-007", title: "Reporte ejecutivo — FinFlow", date: "2026-06-21", time: "09:00", duration: 30, type: "Reunión", client: "FinFlow", owner: "Andrés M." },
];

// ─── SERVICES (4 systems + 24 specialties) ──────────────────────────
export const INTERNAL_SERVICES: InternalService[] = [
  { id: "S-001", name: "Brand Authority System", category: "Sistema", system: "Brand Authority", description: "Posicionamiento, identidad verbal, sistema visual y aplicación comercial.", deliverables: ["Diagnóstico de marca", "Sistema verbal", "Dirección visual", "Aplicación comercial"], basePriceRange: "8.5k – 35k USD", estimatedTime: "6–10 semanas", idealOwner: "Brand Lead", agentId: "brand-strategy", checklist: ["Diagnóstico", "Mensajes clave", "Sistema visual", "Aplicación"], active: true },
  { id: "S-002", name: "Acquisition Engine", category: "Sistema", system: "Acquisition Engine", description: "Performance, paid media, funnels, landing y CRO.", deliverables: ["Plan de campañas", "Funnels", "Landing", "Programa CRO"], basePriceRange: "10k – 45k USD", estimatedTime: "8–12 semanas", idealOwner: "Growth Lead", agentId: "performance-marketing", checklist: ["Estructura paid", "Funnel", "Tracking", "Experimentos"], active: true },
  { id: "S-003", name: "Revenue Automation", category: "Sistema", system: "Revenue Automation", description: "CRM, automatización, WhatsApp, email y lead scoring.", deliverables: ["CRM", "Automatizaciones", "Scoring", "Handover"], basePriceRange: "9k – 30k USD", estimatedTime: "6–10 semanas", idealOwner: "Automation Lead", agentId: "sales-automation", checklist: ["Pipeline", "Flujos", "Scoring", "Integraciones"], active: true },
  { id: "S-004", name: "Growth Intelligence", category: "Sistema", system: "Growth Intelligence", description: "Tracking, dashboards, reporting y experimentación.", deliverables: ["Plan de medición", "Dashboards", "Reportes", "Framework experimentos"], basePriceRange: "7k – 25k USD", estimatedTime: "5–8 semanas", idealOwner: "Data Lead", agentId: "dashboard-data", checklist: ["Tracking", "Dashboards", "Reportes", "Experimentos"], active: true },
];

// ─── PROPOSALS ──────────────────────────────────────────────────────
export const PROPOSALS: Proposal[] = [
  { id: "PR-501", clientId: "C-201", service: "Brand Authority System", value: 14500, status: "En revisión", sentDate: "2026-06-13", dueDate: "2026-06-23", owner: "Juan L.", probability: 55 },
  { id: "PR-502", clientId: "C-202", service: "Revenue Automation", value: 18000, status: "Aprobada", sentDate: "2026-05-30", owner: "Daniel O.", probability: 100 },
  { id: "PR-503", clientId: "C-203", service: "Brand Authority System", value: 8500, status: "Vencida", sentDate: "2026-04-25", dueDate: "2026-05-25", owner: "Mariana V.", probability: 20 },
  { id: "PR-504", clientId: "C-200", service: "Acquisition Engine — extensión Q3", value: 9500, status: "Enviada", sentDate: "2026-06-12", dueDate: "2026-06-26", owner: "Camila R.", probability: 60 },
];

// ─── CONTRACTS ──────────────────────────────────────────────────────
export const CONTRACTS: Contract[] = [
  { id: "CT-601", clientId: "C-200", type: "Retainer", startDate: "2026-05-15", endDate: "2026-11-15", value: 21000, status: "Activo", renewal: "Manual" },
  { id: "CT-602", clientId: "C-202", type: "Retainer", startDate: "2026-04-02", endDate: "2027-04-02", value: 102000, status: "Activo", renewal: "Automática" },
  { id: "CT-603", clientId: "C-203", type: "Proyecto", startDate: "2026-03-10", endDate: "2026-06-10", value: 8500, status: "Vencido", renewal: "No aplica" },
];

// ─── INVOICES ───────────────────────────────────────────────────────
export const INVOICES: Invoice[] = [
  { id: "I-701", number: "INV-0042", clientId: "C-202", concept: "Retainer junio — FinFlow", issueDate: "2026-06-01", dueDate: "2026-06-22", subtotal: 8500, taxes: 0, total: 8500, status: "Enviada", paymentMethod: "Transferencia" },
  { id: "I-702", number: "INV-0041", clientId: "C-200", concept: "Retainer mayo — Lúmen", issueDate: "2026-05-15", dueDate: "2026-05-30", subtotal: 3500, taxes: 0, total: 3500, status: "Pagada", paymentMethod: "Wise" },
  { id: "I-703", number: "INV-0040", clientId: "C-203", concept: "Cierre proyecto Indaba", issueDate: "2026-06-08", dueDate: "2026-06-22", subtotal: 2125, taxes: 0, total: 2125, status: "Vencida", paymentMethod: "Transferencia" },
  { id: "I-704", number: "INV-0043", clientId: "C-202", concept: "Setup Revenue Automation", issueDate: "2026-06-15", dueDate: "2026-07-01", subtotal: 6000, taxes: 0, total: 6000, status: "Borrador" },
];

// ─── EXPENSES ───────────────────────────────────────────────────────
export const EXPENSES: Expense[] = [
  { id: "E-801", date: "2026-06-01", vendor: "Vercel", category: "Hosting", concept: "Vercel Pro", value: 20, paymentMethod: "Tarjeta", status: "Recurrente", recurrent: true },
  { id: "E-802", date: "2026-06-01", vendor: "Resend", category: "Software", concept: "Resend mensual", value: 20, paymentMethod: "Tarjeta", status: "Recurrente", recurrent: true },
  { id: "E-803", date: "2026-06-03", vendor: "Figma", category: "Software", concept: "Plan equipo", value: 75, paymentMethod: "Tarjeta", status: "Recurrente", recurrent: true },
  { id: "E-804", date: "2026-06-04", vendor: "Freelance — Edit Reel", category: "Freelancers", concept: "Edición video Lúmen", value: 320, paymentMethod: "Transferencia", status: "Pagado", recurrent: false },
  { id: "E-805", date: "2026-06-05", vendor: "Anthropic", category: "Herramientas IA", concept: "Plan Claude", value: 120, paymentMethod: "Tarjeta", status: "Recurrente", recurrent: true },
  { id: "E-806", date: "2026-06-10", vendor: "Notion", category: "Software", concept: "Plan equipo", value: 40, paymentMethod: "Tarjeta", status: "Recurrente", recurrent: true },
  { id: "E-807", date: "2026-06-12", vendor: "Café Operaciones", category: "Operación", concept: "Reuniones cliente", value: 35, paymentMethod: "Tarjeta", status: "Pagado", recurrent: false },
  { id: "E-808", date: "2026-06-14", vendor: "Impuestos por revisar", category: "Impuestos por revisar", concept: "Provisión revisión contador", value: 600, paymentMethod: "Otro", status: "En revisión", recurrent: false },
];

// ─── FILES ──────────────────────────────────────────────────────────
export const FILES: FileRecord[] = [
  { id: "F-901", name: "Brief — Aetherline Brand.pdf", category: "Brief", clientId: "C-201", size: "412 KB", uploadedAt: "2026-06-13", owner: "Juan L." },
  { id: "F-902", name: "Propuesta Indaba v3.pdf", category: "Propuesta", clientId: "C-203", size: "1.2 MB", uploadedAt: "2026-04-25", owner: "Mariana V." },
  { id: "F-903", name: "Contrato FinFlow.pdf", category: "Contrato", clientId: "C-202", size: "289 KB", uploadedAt: "2026-04-02", owner: "Sebastián R." },
  { id: "F-904", name: "INV-0042 — FinFlow.pdf", category: "Factura", clientId: "C-202", size: "112 KB", uploadedAt: "2026-06-01", owner: "Sebastián R." },
  { id: "F-905", name: "Logo Lúmen — sistema.svg", category: "Logo", clientId: "C-200", size: "44 KB", uploadedAt: "2026-05-22", owner: "Mariana V." },
  { id: "F-906", name: "Reporte mayo — FinFlow.pdf", category: "Reporte", clientId: "C-202", size: "780 KB", uploadedAt: "2026-06-05", owner: "Andrés M." },
  { id: "F-907", name: "Plantilla onboarding cliente.docx", category: "Plantilla", size: "62 KB", uploadedAt: "2026-05-01", owner: "Sebastián R." },
];

// ─── SUMMARY KPIs ───────────────────────────────────────────────────
export const KPIS = {
  newRequests: REQUESTS.filter((r) => r.status === "Nueva" || r.status === "En revisión").length,
  activeLeads: LEADS.filter((l) => !["Ganado", "Perdido"].includes(l.stage)).length,
  pendingDiagnostics: REQUESTS.filter((r) => r.status === "Diagnóstico agendado").length,
  activeProjects: PROJECTS.filter((p) => ["En progreso", "En revisión", "Planeación", "Esperando cliente"].includes(p.status)).length,
  overdueTasks: TASKS.filter((t) => t.status !== "Completada" && t.dueDate < "2026-06-15").length,
  monthRevenueEstimated: INVOICES.filter((i) => i.issueDate.startsWith("2026-06")).reduce((s, i) => s + (i.status === "Pagada" ? i.total : 0), 0),
  accountsReceivable: INVOICES.filter((i) => ["Enviada", "Vencida"].includes(i.status)).reduce((s, i) => s + i.total, 0),
  monthExpenses: EXPENSES.filter((e) => e.date.startsWith("2026-06")).reduce((s, e) => s + e.value, 0),
  upcomingEvents: EVENTS.length,
  activeAgents: 24,
};
