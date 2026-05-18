import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Lancheros Studio | Agencia de Marketing Digital Premium",
    template: "%s | Lancheros Studio",
  },
  description:
    "Transformamos marcas en imperios digitales. Agencia de marketing digital premium especializada en branding estratégico, performance marketing, automatización con IA y crecimiento empresarial acelerado.",
  keywords: [
    "agencia marketing digital",
    "branding estratégico",
    "performance marketing",
    "growth marketing",
    "SEO avanzado",
    "automatización marketing",
    "inteligencia artificial marketing",
    "funnels conversión",
    "paid media",
    "social media management",
    "agencia digital premium",
    "marketing digital Colombia",
    "Lancheros Studio",
    "marketing internacional",
  ],
  metadataBase: new URL("https://lancherosstudio.com"),
  authors: [{ name: "Lancheros Studio" }],
  creator: "Lancheros Studio",
  publisher: "Lancheros Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://lancherosstudio.com",
    siteName: "Lancheros Studio",
    title: "Lancheros Studio | Agencia de Marketing Digital Premium",
    description:
      "Transformamos marcas en imperios digitales. Estrategia, tecnología y resultados que superan expectativas.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lancheros Studio - Agencia de Marketing Digital Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lancheros Studio | Agencia de Marketing Digital Premium",
    description:
      "Transformamos marcas en imperios digitales. Estrategia, tecnología y resultados excepcionales.",
    images: ["/og-image.jpg"],
    creator: "@lancherosstudio",
  },
  alternates: {
    canonical: "https://lancherosstudio.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lancheros Studio",
  description:
    "Agencia de marketing digital premium especializada en branding estratégico, performance marketing y crecimiento empresarial con IA.",
  url: "https://lancherosstudio.com",
  logo: "https://lancherosstudio.com/logo.png",
  foundingDate: "2019",
  numberOfEmployees: "25-50",
  areaServed: ["Colombia", "Latinoamérica", "España", "Estados Unidos"],
  serviceType: [
    "Marketing Digital",
    "Branding Estratégico",
    "SEO Avanzado",
    "Performance Marketing",
    "Automatización con IA",
    "Desarrollo Web",
  ],
  sameAs: [
    "https://instagram.com/lancherosstudio",
    "https://linkedin.com/company/lancherosstudio",
    "https://twitter.com/lancherosstudio",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hola@lancherosstudio.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="bg-background text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
