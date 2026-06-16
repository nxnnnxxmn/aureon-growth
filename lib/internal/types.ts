/**
 * Aureon Command Center — TypeScript domain model.
 * Single source of truth for the internal app. When a backend is added
 * (Supabase / Prisma), these types map 1:1 to tables.
 */

export type Role = "Owner" | "Admin" | "Strategy" | "Design" | "Performance" | "Automation" | "Finance" | "Viewer";

export type Priority = "low" | "medium" | "high" | "critical";

export type RequestSource = "Diagnóstico web" | "WhatsApp" | "Email" | "Referido" | "Campaña" | "LinkedIn" | "Instagram";

export type RequestStatus =
  | "Nueva"
  | "En revisión"
  | "Contactada"
  | "Diagnóstico agendado"
  | "Propuesta enviada"
  | "Ganada"
  | "Perdida"
  | "Nurturing";

export type CrmStage =
  | "Nuevo lead"
  | "Calificado"
  | "Diagnóstico agendado"
  | "Diagnóstico realizado"
  | "Propuesta enviada"
  | "Negociación"
  | "Ganado"
  | "Perdido"
  | "Nurturing";

export type ClientStatus = "Activo" | "Pausado" | "Potencial" | "Cerrado";

export type ProjectStatus =
  | "Backlog"
  | "Planeación"
  | "En progreso"
  | "En revisión"
  | "Esperando cliente"
  | "Entregado"
  | "Cerrado";

export type TaskStatus = "Pendiente" | "En progreso" | "En revisión" | "Bloqueada" | "Completada";

export type ProposalStatus = "Borrador" | "Enviada" | "En revisión" | "Aprobada" | "Rechazada" | "Vencida";

export type ContractStatus = "Borrador" | "Enviado" | "Firmado" | "Activo" | "Vencido" | "Cancelado";

export type InvoiceStatus = "Borrador" | "Emitida" | "Enviada" | "Pagada" | "Vencida" | "Anulada";

export type ExpenseStatus = "Pendiente" | "Pagado" | "Recurrente" | "En revisión";

export interface IncomingRequest {
  id: string;
  date: string;
  name: string;
  company?: string;
  email: string;
  whatsapp: string;
  website?: string;
  service: string;
  challenge: string;
  source: RequestSource;
  status: RequestStatus;
  priority: Priority;
  owner?: string;
  nextAction?: string;
}

export interface Lead {
  id: string;
  contact: string;
  company: string;
  email: string;
  phone: string;
  source: RequestSource;
  service: string;
  budget: string;
  pain: string;
  stage: CrmStage;
  probability: number;
  value: number;
  nextAction: string;
  nextActionDate?: string;
  notes?: string;
  owner: string;
}

export interface Client {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  services: string[];
  status: ClientStatus;
  startDate: string;
  monthlyValue: number;
  projects: string[]; // ids
  pendingInvoices: number;
  notes?: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  service: string;
  owner: string;
  startDate: string;
  dueDate: string;
  priority: Priority;
  progress: number; // 0-100
  status: ProjectStatus;
  budget: number;
  deliverables: { title: string; done: boolean }[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId?: string;
  clientId?: string;
  service?: string;
  owner: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  tags: string[];
  subtasks?: { title: string; done: boolean }[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO
  time: string; // HH:mm
  duration: number; // minutes
  type: "Reunión" | "Diagnóstico" | "Entrega" | "Facturación" | "Vencimiento" | "Tarea" | "Revisión";
  client?: string;
  owner: string;
}

export interface InternalService {
  id: string;
  name: string;
  category: string;
  system: "Brand Authority" | "Acquisition Engine" | "Revenue Automation" | "Growth Intelligence";
  description: string;
  deliverables: string[];
  basePriceRange: string;
  estimatedTime: string;
  idealOwner: string;
  agentId?: string;
  checklist: string[];
  active: boolean;
}

export interface Proposal {
  id: string;
  clientId: string;
  service: string;
  value: number;
  status: ProposalStatus;
  sentDate?: string;
  dueDate?: string;
  owner: string;
  probability: number;
  notes?: string;
}

export interface Contract {
  id: string;
  clientId: string;
  type: "Retainer" | "Proyecto" | "Consultoría" | "Sprint" | "NDA";
  startDate: string;
  endDate?: string;
  value: number;
  status: ContractStatus;
  renewal?: "Automática" | "Manual" | "No aplica";
  fileRef?: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  concept: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxes: number;
  total: number;
  status: InvoiceStatus;
  paymentMethod?: "Transferencia" | "PSE" | "Tarjeta" | "Wise" | "Stripe" | "Otro";
  receiptRef?: string;
  notes?: string;
}

export interface Expense {
  id: string;
  date: string;
  vendor: string;
  category: string;
  concept: string;
  value: number;
  paymentMethod: string;
  status: ExpenseStatus;
  receiptRef?: string;
  recurrent: boolean;
  notes?: string;
}

export interface FileRecord {
  id: string;
  name: string;
  category:
    | "Brief"
    | "Propuesta"
    | "Contrato"
    | "Factura"
    | "Comprobante"
    | "Entregable"
    | "Logo"
    | "Creatividad"
    | "Reporte"
    | "Recurso interno"
    | "Plantilla";
  clientId?: string;
  projectId?: string;
  size: string;
  uploadedAt: string;
  owner: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  active: boolean;
}

export interface AgentSpec {
  id: string;
  name: string;
  specialty: string;
  description: string;
  basePrompt: string;
  inputs: string[];
  outputs: string[];
  qualityChecklist: string[];
  relatedServices: string[];
  status: "Disponible" | "En preparación" | "Requiere integración IA";
}
