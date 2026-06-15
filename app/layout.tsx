import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/common/CustomCursor";
import Analytics from "@/components/common/Analytics";
import CookieBanner from "@/components/common/CookieBanner";

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

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet-brains",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1A1815",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Aureon Growth Services | Growth Partner, Branding, Performance e IA",
    template: "%s | Aureon Growth Services",
  },
  description:
    "Aureon Growth Services ayuda a empresas a construir sistemas de crecimiento con branding, performance marketing, funnels, CRM, automatización, inteligencia artificial y analítica.",
  keywords: [
    "growth partner",
    "agencia de marketing digital premium",
    "agencia de performance marketing",
    "branding estratégico",
    "automatización de marketing",
    "inteligencia artificial aplicada al marketing",
    "CRM y funnels",
    "generación de leads",
    "marketing B2B",
    "growth marketing",
    "conversión digital",
    "agencia de branding y performance",
    "sistemas de crecimiento empresarial",
    "Aureon Growth Services",
    "Aureon Growth System",
  ],
  metadataBase: new URL("https://aureongrowth.com"),
  authors: [{ name: "Aureon Growth Services" }],
  creator: "Aureon Growth Services",
  publisher: "Aureon Growth Services",
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
    url: "https://aureongrowth.com",
    siteName: "Aureon Growth Services",
    title: "Aureon Growth Services | Growth Partner, Branding, Performance e IA",
    description:
      "Sistemas de crecimiento que integran branding, performance marketing, funnels, CRM, automatización e inteligencia artificial.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aureon Growth Services | Growth Partner",
    description:
      "Estrategia, tecnología y performance para crecimiento medible.",
    creator: "@aureongrowth",
  },
  alternates: {
    canonical: "https://aureongrowth.com",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aureon Growth Services",
  alternateName: "Aureon Growth",
  description:
    "Growth partner especializado en sistemas de crecimiento: branding estratégico, performance marketing, funnels, CRM, automatización e inteligencia artificial aplicada.",
  url: "https://aureongrowth.com",
  logo: "https://aureongrowth.com/logo.svg",
  areaServed: ["Colombia", "Latinoamérica", "España", "Estados Unidos"],
  serviceType: [
    "Branding Estratégico",
    "Performance Marketing",
    "Automatización & CRM",
    "Inteligencia Artificial aplicada",
    "Generación de Leads",
    "Analítica & Growth Intelligence",
  ],
  sameAs: [
    "https://instagram.com/aureongrowth",
    "https://linkedin.com/company/aureongrowth",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hola@aureongrowth.com",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aureon Growth Services",
  url: "https://aureongrowth.com",
  inLanguage: "es-CO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${cormorant.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased bg-[#F5F1E8] text-[#1A1815]">
        <CustomCursor />
        {children}
        <div className="noise-global" aria-hidden />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
