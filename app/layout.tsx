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

// Tactical/telemetry monospace — used for data labels, meta bars, ticker.
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet-brains",
  display: "swap",
});

// Editorial serif for premium emphasis moments (quotes, italics, accents).
// Used surgically — never for body. Loaded with only the weights we use.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Aureon Growth | Growth Partner & Agencia de Marketing Digital Premium",
    template: "%s | Aureon Growth",
  },
  description:
    "Tu socio estratégico de crecimiento. Generamos pipeline calificado, escalamos marcas con performance marketing, automatización con IA y branding premium. +850 marcas, 400% ROI promedio.",
  keywords: [
    "growth partner",
    "agencia de marketing digital",
    "agencia de marketing Colombia",
    "agencia de marketing Bogotá",
    "branding estratégico",
    "performance marketing",
    "growth marketing",
    "SEO avanzado",
    "automatización de marketing",
    "agentes de IA marketing",
    "inteligencia artificial aplicada al marketing",
    "embudos de conversión",
    "generación de leads B2B",
    "captación de clientes",
    "paid media Google Ads Meta",
    "social media management premium",
    "estrategia digital integral",
    "consultoría estratégica de marketing",
    "diseño web de alta conversión",
    "CRO optimización de conversión",
    "Aureon Growth",
    "Aureon Agency",
    "marketing internacional LATAM",
  ],
  metadataBase: new URL("https://aureongrowth.com"),
  authors: [{ name: "Aureon Growth" }],
  creator: "Aureon Growth",
  publisher: "Aureon Growth",
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
    siteName: "Aureon Growth",
    title: "Aureon Growth | Growth Partner & Agencia Premium de Marketing",
    description:
      "Tu socio estratégico de crecimiento. Branding, performance, automatización con IA y growth marketing. +850 marcas escaladas.",
    // Next.js auto-detects app/opengraph-image.tsx — no need to specify images here
  },
  twitter: {
    card: "summary_large_image",
    title: "Aureon Growth | Growth Partner Premium",
    description:
      "Transformamos marcas en imperios digitales. +850 clientes · 400% ROI promedio · 98% retención.",
    creator: "@aureongrowth",
  },
  alternates: {
    canonical: "https://aureongrowth.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aureon Growth",
  description:
    "Agencia de marketing digital premium especializada en branding estratégico, performance marketing y crecimiento empresarial con IA.",
  url: "https://aureongrowth.com",
  logo: "https://aureongrowth.com/logo.svg",
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
    "https://instagram.com/aureongrowth",
    "https://linkedin.com/company/aureongrowth",
    "https://twitter.com/aureongrowth",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hola@aureongrowth.com",
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Speed up Cal.com iframe load by warming up the connection ahead of time */}
        <link rel="dns-prefetch" href="https://cal.com" />
        <link rel="preconnect" href="https://cal.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-[#F5F1E8] text-[#1A1815]">
        <CustomCursor />
        {children}
        {/* Global noise overlay — fixed material texture for premium feel */}
        <div className="noise-global" aria-hidden />
        <CookieBanner />
        {/* Analytics — GA4 + Microsoft Clarity. No-op if env vars not set. */}
        <Analytics />
      </body>
    </html>
  );
}
