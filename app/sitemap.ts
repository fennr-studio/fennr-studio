import type { MetadataRoute } from "next";
import { PERSONAS } from "@/lib/personas";

const SITE_URL = "https://www.fennrstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/brief`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/who-we-help`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...PERSONAS.map((p) => ({
      url: `${SITE_URL}/who-we-help/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
