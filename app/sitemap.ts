import type { MetadataRoute } from "next";
import { PERSONAS } from "@/lib/personas";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/brief", priority: 0.9 },
    { path: "/free-preview", priority: 0.9 },
    { path: "/who-we-help", priority: 0.8 },
    ...PERSONAS.map((p) => ({
      path: `/who-we-help/${p.slug}`,
      priority: 0.7,
    })),
    { path: "/privacy", priority: 0.3 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
