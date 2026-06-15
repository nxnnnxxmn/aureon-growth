import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { A } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso del sitio web de Aureon Growth Services.",
  alternates: { canonical: "https://aureon-growth.vercel.app/legal/terminos" },
};

export default function TerminosPage() {
  return (
    <>
      <Navbar dark />
      <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: A.bg, color: A.text }}>
        <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-30" />
        <div aria-hidden className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full glow-violet pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <Link href="/" className="inline-flex items-center gap-2 text-sm transition-colors mb-12 font-medium focus-ring rounded" style={{ color: A.text2 }}>
            <span aria-hidden>&larr;</span> Volver al inicio
          </Link>

          <h1 className="font-display font-bold text-4xl lg:text-5xl tracking-tight mb-4" style={{ color: A.text }}>Términos y Condiciones</h1>
          <p className="text-sm font-mono uppercase tracking-[0.2em] mb-12" style={{ color: A.textDim }}>Última actualización: junio 2026</p>

          <div className="space-y-8 leading-relaxed">
            <Section title="1. Objeto">
              <p>
                Estos términos regulan el uso del sitio web de{" "}
                <strong style={{ color: A.text }}>Aureon Growth Services</strong> (en adelante,
                &quot;Aureon Growth Services&quot;), accesible en{" "}
                <strong style={{ color: A.text }}>aureon-growth.vercel.app</strong>. Al navegar o
                utilizar el sitio aceptas estos términos.
              </p>
            </Section>

            <Section title="2. Naturaleza de la información">
              <p>El contenido del sitio tiene fines informativos sobre nuestros servicios de growth, branding, performance, automatización, CRM e inteligencia artificial aplicada. No constituye una oferta vinculante ni una garantía de resultados específicos.</p>
              <p>Los escenarios de aplicación descritos son ilustrativos y sus resultados son cualitativos y dependientes de las condiciones de cada negocio.</p>
            </Section>

            <Section title="3. Solicitudes y diagnóstico">
              <p>El envío del formulario de diagnóstico no genera obligación contractual para ninguna de las partes. Cualquier alcance, entregable o condición comercial se define por escrito en una propuesta o contrato específico.</p>
            </Section>

            <Section title="4. Propiedad intelectual">
              <p>Las marcas, logotipos, textos, diseños y demás elementos del sitio son propiedad de Aureon Growth Services o se utilizan con autorización. No está permitida su reproducción sin consentimiento previo por escrito.</p>
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
              <p>El sitio puede contener enlaces a plataformas de terceros (por ejemplo, WhatsApp o redes sociales). Aureon Growth Services no es responsable del contenido ni de las políticas de dichos servicios.</p>
            </Section>

            <Section title="7. Limitación de responsabilidad">
              <p>Aureon Growth Services no será responsable por daños derivados del uso o imposibilidad de uso del sitio, en la medida permitida por la legislación aplicable.</p>
            </Section>

            <Section title="8. Modificaciones">
              <p>Podemos actualizar estos términos en cualquier momento. La versión vigente será siempre la publicada en esta página, con su fecha de actualización.</p>
            </Section>

            <Section title="9. Contacto">
              <p>Para cualquier consulta sobre estos términos, escríbenos a{" "}
                <a href="mailto:aureongrowthservices@outlook.com" className="underline" style={{ color: A.gold }}>aureongrowthservices@outlook.com</a>.
              </p>
            </Section>
          </div>

          <div className="mt-16 pt-8 border-t" style={{ borderColor: A.border }}>
            <p className="text-sm" style={{ color: A.textDim }}>&copy; {new Date().getFullYear()} Aureon Growth Services. Todos los derechos reservados.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-semibold text-xl mb-3" style={{ color: A.text }}>{title}</h2>
      <div className="text-[15px] space-y-3" style={{ color: A.text2 }}>{children}</div>
    </section>
  );
}
