import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del sitio web de Aureon Growth Services.",
  alternates: { canonical: "https://aureongrowth.com/legal/terminos" },
};

export default function TerminosPage() {
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
          Términos y Condiciones
        </h1>
        <p className="text-sm text-[#9A938A] font-mono uppercase tracking-[0.2em] mb-12">
          Última actualización: junio 2026
        </p>

        <div className="space-y-8 text-[#1A1815] leading-relaxed">
          <Section title="1. Objeto">
            <p>
              Estos términos regulan el uso del sitio web de{" "}
              <strong>Aureon Growth Services</strong> (en adelante, &quot;Aureon&quot;), accesible en{" "}
              <strong>aureongrowth.com</strong>. Al navegar o utilizar el sitio aceptas estos términos.
            </p>
          </Section>

          <Section title="2. Naturaleza de la información">
            <p>
              El contenido del sitio tiene fines informativos sobre nuestros servicios de growth,
              branding, performance, automatización, CRM e inteligencia artificial aplicada. No
              constituye una oferta vinculante ni una garantía de resultados específicos.
            </p>
            <p>
              Los escenarios de aplicación descritos son ilustrativos y sus resultados son
              cualitativos y dependientes de las condiciones de cada negocio.
            </p>
          </Section>

          <Section title="3. Solicitudes y diagnóstico">
            <p>
              El envío del formulario de diagnóstico no genera obligación contractual para ninguna de
              las partes. Cualquier alcance, entregable o condición comercial se define por escrito en
              una propuesta o contrato específico.
            </p>
          </Section>

          <Section title="4. Propiedad intelectual">
            <p>
              Las marcas, logotipos, textos, diseños y demás elementos del sitio son propiedad de
              Aureon o se utilizan con autorización. No está permitida su reproducción sin
              consentimiento previo por escrito.
            </p>
          </Section>

          <Section title="5. Uso aceptable">
            <p>Al usar el sitio te comprometes a no:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Utilizarlo con fines ilícitos o fraudulentos.</li>
              <li>Intentar vulnerar su seguridad o disponibilidad.</li>
              <li>Enviar información falsa a través de los formularios.</li>
            </ul>
          </Section>

          <Section title="6. Enlaces de terceros">
            <p>
              El sitio puede contener enlaces a plataformas de terceros (por ejemplo, WhatsApp o redes
              sociales). Aureon no es responsable del contenido ni de las políticas de dichos
              servicios.
            </p>
          </Section>

          <Section title="7. Limitación de responsabilidad">
            <p>
              Aureon no será responsable por daños derivados del uso o imposibilidad de uso del sitio,
              en la medida permitida por la legislación aplicable.
            </p>
          </Section>

          <Section title="8. Modificaciones">
            <p>
              Podemos actualizar estos términos en cualquier momento. La versión vigente será siempre
              la publicada en esta página, con su fecha de actualización.
            </p>
          </Section>

          <Section title="9. Contacto">
            <p>
              Para cualquier consulta sobre estos términos, escríbenos a{" "}
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
