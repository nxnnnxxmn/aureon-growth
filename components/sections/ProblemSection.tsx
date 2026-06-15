"use client";

import { motion } from "framer-motion";
import {
  Target,
  MailWarning,
  Database,
  Compass,
  MousePointer,
  Plug,
  BarChart2,
  FileQuestion,
} from "lucide-react";
import { A } from "@/lib/ui";

const problems = [
  { icon: Target, title: "Campañas sin estrategia comercial", body: "Inversión activa pero desconectada del pipeline real de oportunidades." },
  { icon: MailWarning, title: "Leads sin seguimiento", body: "Contactos que entran y se pierden en bandejas, hojas y tareas olvidadas." },
  { icon: Database, title: "CRM desordenado o inexistente", body: "Sin trazabilidad por etapa ni reportes confiables del proceso comercial." },
  { icon: Compass, title: "Branding sin posicionamiento", body: "Identidad cuidada pero sin un mensaje que diferencie en su categoría." },
  { icon: MousePointer, title: "Web que no convierte", body: "Sitio bonito que recibe tráfico pero no captura ni califica oportunidades." },
  { icon: Plug, title: "Automatizaciones desconectadas", body: "Herramientas dispersas, integraciones rotas, flujos que no conversan." },
  { icon: BarChart2, title: "Métricas que no ayudan a decidir", body: "Reportes de actividad, no de negocio. Sin insights accionables." },
  { icon: FileQuestion, title: "Contenido sin intención comercial", body: "Se publica constante, pero no mueve oportunidades hacia la decisión." },
];

export default function ProblemSection() {
  return (
    <section id="problema" className="relative w-full overflow-hidden py-24 lg:py-32" style={{ backgroundColor: A.bg2, color: A.text }}>
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-40" />
      <div aria-hidden className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full glow-violet pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 max-w-3xl">
          <Eyebrow>El problema</Eyebrow>
          <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-6" style={{ color: A.text }}>
            El problema no es hacer más marketing.{" "}
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: A.gold }}>
              Es no tener un sistema de crecimiento.
            </span>
          </h2>
          <p className="text-base lg:text-lg leading-relaxed" style={{ color: A.text2 }}>
            Piezas sueltas — campañas, posts, herramientas — que no se conectan
            entre sí. El resultado es esfuerzo disperso sin un sistema comercial
            que lo ordene.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="card-3d surface relative p-6"
              style={{ backgroundColor: A.surface }}
            >
              {/* "disconnected" node marker */}
              <span aria-hidden className="absolute top-5 right-5 w-2 h-2 rounded-full" style={{ backgroundColor: A.textDim, opacity: 0.5 }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(124,92,191,0.14)" }}>
                <p.icon className="w-5 h-5" style={{ color: A.violet }} strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-semibold text-base leading-snug mb-2" style={{ color: A.text }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: A.text2 }}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="h-px w-10" style={{ backgroundColor: A.gold }} />
      <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>{children}</span>
    </div>
  );
}
