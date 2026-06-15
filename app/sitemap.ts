import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://aureongrowth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static URLs
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/casos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/equipo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/manifiesto`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE}/herramientas/calculadora-roi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9, // High priority — lead magnet asset
    },
    {
      url: `${BASE}/aureon-vs-agencia`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.85, // High priority — sales enablement asset
    },
  ];

  // Dynamic case study URLs — one per case
  const caseUrls: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: `${BASE}/casos/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    ...staticUrls,
    ...caseUrls,
    {
      url: `${BASE}/gracias`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
