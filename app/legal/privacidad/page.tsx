import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Aureon Growth. Cómo recopilamos, usamos y protegemos tu información personal.",
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8]">
      <div className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#6B655E] hover:text-[#1A1815] transition-colors mb-12 font-medium"
        >
          <span aria-hidden>&larr;</span> Volver al inicio
        </Link>

        <h1 className="font-display font-bold text-4xl lg:text-5xl text-[#1A1815] tracking-tight mb-4">
          Política de Privacidad
        </h1>
        <p className="text-sm text-[#9A938A] font-mono uppercase tracking-[0.2em] mb-12">
          Última actualización: junio 2026
        </p>

        <div className="prose-legal space-y-8 text-[#1A1815] leading-relaxed">
          <Section title="1. Responsable del tratamiento">
            <p>
              <strong>Aureon Growth</strong> (en adelante, &quot;nosotros&quot;) es responsable del
              tratamiento de los datos personales recopilados a través de este sitio web
              (<strong>aureongrowth.com</strong>).
            </p>
            <p>
              Correo de contacto:{" "}
              <a href="mailto:hola@aureongrowth.com" className="text-[#E04E2C] hover:underline">
                hola@aureongrowth.com
              </a>
            </p>
          </Section>

          <Section title="2. Datos que recopilamos">
            <p>Recopilamos los siguientes datos cuando completas nuestro formulario de contacto:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Teléfono (opcional)</li>
              <li>Nombre de empresa (opcional)</li>
              <li>Tipo de servicio de interés</li>
              <li>Rango de presupuesto (opcional)</li>
              <li>Mensaje descriptivo del proyecto</li>
            </ul>
            <p className="mt-3">
              También recopilamos datos de navegación de forma anonimizada a través de:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Google Analytics 4</strong> — métricas de uso del sitio con IP anonimizada
              </li>
              <li>
                <strong>Microsoft Clarity</strong> — mapas de calor y grabaciones de sesión
                anonimizadas
              </li>
            </ul>
          </Section>

          <Section title="3. Finalidad del tratamiento">
            <p>Tus datos se utilizan exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Responder a tu solicitud de contacto o consulta</li>
              <li>Enviarte una propuesta personalizada</li>
              <li>Mejorar la experiencia del sitio web (analítica)</li>
              <li>Enviarte comunicaciones comerciales si otorgas consentimiento</li>
            </ul>
          </Section>

          <Section title="4. Base legal">
            <p>El tratamiento de tus datos se fundamenta en:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Consentimiento</strong> — al enviar el formulario de contacto o aceptar
                cookies
              </li>
              <li>
                <strong>Interés legítimo</strong> — para responder solicitudes comerciales
              </li>
            </ul>
          </Section>

          <Section title="5. Cookies">
            <p>
              Utilizamos cookies esenciales (funcionamiento básico), analíticas (GA4 + Clarity) y de
              marketing (retargeting). Puedes gestionar tus preferencias desde el banner de cookies
              que aparece en tu primera visita, o contactándonos directamente.
            </p>
            <p>
              Las cookies analíticas y de marketing solo se activan con tu consentimiento explícito.
            </p>
          </Section>

          <Section title="6. Conservación de datos">
            <p>
              Los datos de contacto se conservan durante un máximo de <strong>24 meses</strong> desde
              la última interacción. Los datos analíticos se anonimizar automáticamente según las
              políticas de Google y Microsoft.
            </p>
          </Section>

          <Section title="7. Tus derechos">
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación,
              portabilidad y oposición enviando un correo a{" "}
              <a href="mailto:hola@aureongrowth.com" className="text-[#E04E2C] hover:underline">
                hola@aureongrowth.com
              </a>{" "}
              con el asunto &quot;Derechos ARCO&quot;.
            </p>
            <p>Responderemos en un plazo máximo de 15 días hábiles.</p>
          </Section>

          <Section title="8. Seguridad">
            <p>
              Implementamos medidas técnicas y organizativas para proteger tus datos: cifrado en
              tránsito (HTTPS), acceso restringido a bases de datos, y auditorías periódicas.
            </p>
          </Section>

          <Section title="9. Terceros">
            <p>Podemos compartir datos con los siguientes proveedores de servicio:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Resend</strong> — envío de correos transaccionales
              </li>
              <li>
                <strong>Google (GA4)</strong> — analítica web
              </li>
              <li>
                <strong>Microsoft (Clarity)</strong> — analítica de comportamiento
              </li>
              <li>
                <strong>Vercel</strong> — alojamiento del sitio web
              </li>
            </ul>
            <p className="mt-3">
              Todos los proveedores cumplen con estándares de protección de datos equivalentes o
              superiores a la normativa colombiana y europea.
            </p>
          </Section>

          <Section title="10. Cambios en esta política">
            <p>
              Nos reservamos el derecho de actualizar esta política. Cualquier cambio se publicará en
              esta misma página con la fecha de actualización revisada.
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[rgba(26,24,21,0.1)]">
          <p className="text-sm text-[#9A938A]">
            &copy; {new Date().getFullYear()} Aureon Growth. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display font-semibold text-xl text-[#1A1815] mb-3">{title}</h2>
      <div className="text-[15px] text-[#1A1815]/85 space-y-3">{children}</div>
    </section>
  );
}
