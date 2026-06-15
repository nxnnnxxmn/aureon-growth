import type { MetadataRoute } from "next";
import { GROWTH_SYSTEMS } from "@/lib/growth";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://aureon-growth.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/servicios`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/metodologia`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/proceso`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/casos`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/diagnostico`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/equipo`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/manifiesto`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/herramientas/calculadora-roi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/aureon-vs-agencia`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/legal/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Service system detail pages
  const serviceUrls: MetadataRoute.Sitemap = GROWTH_SYSTEMS.map((s) => ({
    url: `${BASE}/servicios/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticUrls, ...serviceUrls];
}
