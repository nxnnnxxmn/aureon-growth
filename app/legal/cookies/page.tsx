import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { A } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Cómo Aureon Growth Services utiliza cookies y tecnologías similares en su sitio web.",
  alternates: { canonical: "https://aureon-growth.vercel.app/legal/cookies" },
};

export default function CookiesPage() {
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

          <h1 className="font-display font-bold text-4xl lg:text-5xl tracking-tight mb-4" style={{ color: A.text }}>Política de Cookies</h1>
          <p className="text-sm font-mono uppercase tracking-[0.2em] mb-12" style={{ color: A.textDim }}>Última actualización: junio 2026</p>

          <div className="space-y-8 leading-relaxed">
            <Section title="1. Qué son las cookies">
              <p>Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten que el sitio funcione correctamente y, en su caso, ayudan a entender cómo se utiliza.</p>
            </Section>

            <Section title="2. Cookies que utilizamos">
              <p>
                Actualmente el sitio puede utilizar cookies necesarias para su funcionamiento. En el
                futuro, Aureon Growth Services podría integrar herramientas de analítica, formularios,
                CRM o medición publicitaria, siempre que sean configuradas y comunicadas de forma
                correspondiente.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong style={{ color: A.text }}>Esenciales</strong> — necesarias para el funcionamiento básico del sitio. No requieren consentimiento.</li>
                <li><strong style={{ color: A.text }}>Opcionales (futuras)</strong> — analítica o medición publicitaria que solo se activarían con tu consentimiento explícito y se comunicarían en su momento.</li>
              </ul>
            </Section>

            <Section title="3. Gestión del consentimiento">
              <p>En tu primera visita mostramos un banner para que aceptes o rechaces las cookies no esenciales. Las cookies no esenciales solo se activan con tu consentimiento, y tu preferencia se guarda en tu navegador.</p>
              <p>Puedes cambiar tu decisión en cualquier momento borrando las cookies de tu navegador o escribiéndonos directamente.</p>
            </Section>

            <Section title="4. Cómo desactivar las cookies">
              <p>Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que desactivar ciertas cookies puede afectar el funcionamiento del sitio.</p>
            </Section>

            <Section title="5. Más información">
              <p>
                Para más detalles sobre cómo tratamos tus datos, consulta nuestra{" "}
                <a href="/legal/privacidad" className="underline" style={{ color: A.gold }}>Política de Privacidad</a>. Para cualquier consulta, escríbenos a{" "}
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
