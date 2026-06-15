import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Cómo Aureon Growth Services utiliza cookies y tecnologías similares en su sitio web.",
  alternates: { canonical: "https://aureongrowth.com/legal/cookies" },
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8]">
      <div className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#6B655E] hover:text-[#1A1815] transition-colors mb-12 font-medium"
        >
          <span aria-hidden>&larr;</span> Volver al inicio
        </Link>

        <h1 className="font-display font-bold text-4xl lg:text-5xl text-[#1A1815] tracking-tight mb-4">
          Política de Cookies
        </h1>
        <p className="text-sm text-[#9A938A] font-mono uppercase tracking-[0.2em] mb-12">
          Última actualización: junio 2026
        </p>

        <div className="space-y-8 text-[#1A1815] leading-relaxed">
          <Section title="1. Qué son las cookies">
            <p>
              Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando visitas un
              sitio web. Permiten que el sitio funcione correctamente y nos ayudan a entender cómo se
              utiliza.
            </p>
          </Section>

          <Section title="2. Tipos de cookies que utilizamos">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Esenciales</strong> — necesarias para el funcionamiento básico del sitio. No
                requieren consentimiento.
              </li>
              <li>
                <strong>Analíticas</strong> — nos ayudan a medir el uso del sitio de forma anonimizada
                (por ejemplo, Google Analytics 4 y Microsoft Clarity).
              </li>
              <li>
                <strong>Marketing</strong> — permiten medir campañas y mostrar contenido relevante.
                Solo se activan con tu consentimiento.
              </li>
            </ul>
          </Section>

          <Section title="3. Gestión del consentimiento">
            <p>
              En tu primera visita mostramos un banner para que aceptes o rechaces las cookies
              analíticas y de marketing. Las cookies no esenciales solo se activan con tu
              consentimiento explícito.
            </p>
            <p>
              Puedes cambiar tu decisión en cualquier momento borrando las cookies de tu navegador o
              escribiéndonos directamente.
            </p>
          </Section>

          <Section title="4. Cookies de terceros">
            <p>
              Algunos proveedores pueden instalar cookies propias cuando usas funciones del sitio:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Google (GA4)</strong> — analítica web.
              </li>
              <li>
                <strong>Microsoft (Clarity)</strong> — analítica de comportamiento.
              </li>
            </ul>
          </Section>

          <Section title="5. Cómo desactivar las cookies">
            <p>
              Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que
              desactivar ciertas cookies puede afectar el funcionamiento del sitio.
            </p>
          </Section>

          <Section title="6. Más información">
            <p>
              Para más detalles sobre cómo tratamos tus datos, consulta nuestra{" "}
              <a href="/legal/privacidad" className="text-[#E04E2C] hover:underline">
                Política de Privacidad
              </a>
              . Para cualquier consulta, escríbenos a{" "}
              <a href="mailto:hola@aureongrowth.com" className="text-[#E04E2C] hover:underline">
                hola@aureongrowth.com
              </a>
              .
            </p>
          </Section>
        </div>

        <div className="mt-16 pt-8 border-t border-[rgba(26,24,21,0.1)]">
          <p className="text-sm text-[#9A938A]">
            &copy; {new Date().getFullYear()} Aureon Growth Services. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-semibold text-xl text-[#1A1815] mb-3">{title}</h2>
      <div className="text-[15px] text-[#1A1815]/85 space-y-3">{children}</div>
    </section>
  );
}
