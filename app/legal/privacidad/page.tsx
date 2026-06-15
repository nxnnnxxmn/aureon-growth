import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { A } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Aureon Growth Services. Cómo recopilamos, usamos y protegemos tu información personal.",
  alternates: { canonical: "https://aureon-growth.vercel.app/legal/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <>
      <Navbar dark />
      <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: A.bg, color: A.text }}>
        <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-30" />
        <div aria-hidden className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full glow-gold pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <Link href="/" className="inline-flex items-center gap-2 text-sm transition-colors mb-12 font-medium focus-ring rounded" style={{ color: A.text2 }}>
            <span aria-hidden>&larr;</span> Volver al inicio
          </Link>

          <h1 className="font-display font-bold text-4xl lg:text-5xl tracking-tight mb-4" style={{ color: A.text }}>
            Política de Privacidad
          </h1>
          <p className="text-sm font-mono uppercase tracking-[0.2em] mb-12" style={{ color: A.textDim }}>
            Última actualización: junio 2026
          </p>

          <div className="space-y-8 leading-relaxed">
            <Section title="1. Responsable del tratamiento">
              <p>
                <strong style={{ color: A.text }}>Aureon Growth Services</strong> (en adelante,
                &quot;Aureon Growth Services&quot; o &quot;nosotros&quot;) es responsable del
                tratamiento de los datos personales recopilados a través de este sitio web
                (<strong style={{ color: A.text }}>aureon-growth.vercel.app</strong>).
              </p>
              <p>
                Correo de contacto:{" "}
                <a href="mailto:aureongrowthservices@outlook.com" className="underline" style={{ color: A.gold }}>
                  aureongrowthservices@outlook.com
                </a>
              </p>
            </Section>

            <Section title="2. Datos que recopilamos">
              <p>Recopilamos los datos que nos compartes voluntariamente a través del formulario de diagnóstico:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nombre</li>
                <li>Correo electrónico</li>
                <li>Teléfono / WhatsApp</li>
                <li>Empresa (opcional)</li>
                <li>Sitio web o Instagram (opcional)</li>
                <li>Servicio de interés y etapa de la empresa</li>
                <li>Mensaje y reto principal que nos describas</li>
              </ul>
            </Section>

            <Section title="3. Finalidad del tratamiento">
              <p>Tus datos se utilizan exclusivamente para:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Responder a tu solicitud de diagnóstico o contacto</li>
                <li>Coordinar una conversación y, si aplica, una propuesta</li>
                <li>Dar seguimiento comercial a tu solicitud</li>
              </ul>
            </Section>

            <Section title="4. Base legal">
              <p>El tratamiento de tus datos se fundamenta en tu <strong style={{ color: A.text }}>consentimiento</strong> al enviar el formulario y en el <strong style={{ color: A.text }}>interés legítimo</strong> de responder solicitudes comerciales.</p>
            </Section>

            <Section title="5. Cookies y analítica">
              <p>
                Actualmente el sitio puede utilizar cookies necesarias para su funcionamiento. En el
                futuro, Aureon Growth Services podría integrar herramientas de analítica, formularios,
                CRM o medición publicitaria, siempre que sean configuradas y comunicadas de forma
                correspondiente.
              </p>
              <p>
                Cualquier cookie no esencial se activaría únicamente con tu consentimiento. Consulta más
                detalle en nuestra{" "}
                <a href="/legal/cookies" className="underline" style={{ color: A.gold }}>Política de Cookies</a>.
              </p>
            </Section>

            <Section title="6. Conservación de datos">
              <p>Conservamos los datos de contacto durante el tiempo necesario para atender tu solicitud y mantener la relación comercial, o hasta que solicites su eliminación.</p>
            </Section>

            <Section title="7. Tus derechos">
              <p>
                Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación,
                portabilidad y oposición escribiendo a{" "}
                <a href="mailto:aureongrowthservices@outlook.com" className="underline" style={{ color: A.gold }}>aureongrowthservices@outlook.com</a>. Responderemos en un plazo razonable.
              </p>
            </Section>

            <Section title="8. Seguridad">
              <p>Aplicamos medidas razonables para proteger tu información, incluyendo cifrado en tránsito (HTTPS) y acceso restringido a los datos.</p>
            </Section>

            <Section title="9. Proveedores">
              <p>Para operar el sitio y atender solicitudes podemos apoyarnos en proveedores de servicio como el alojamiento del sitio y el envío de correos transaccionales. Estos proveedores tratan los datos únicamente para prestar dichos servicios.</p>
            </Section>

            <Section title="10. Cambios en esta política">
              <p>Podemos actualizar esta política. Cualquier cambio se publicará en esta página con la fecha de actualización revisada.</p>
            </Section>
          </div>

          <div className="mt-16 pt-8 border-t" style={{ borderColor: A.border }}>
            <p className="text-sm" style={{ color: A.textDim }}>
              &copy; {new Date().getFullYear()} Aureon Growth Services. Todos los derechos reservados.
            </p>
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
