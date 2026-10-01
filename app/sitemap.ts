import type { MetadataRoute } from "next";
import { PERSONAS } from "@/lib/personas";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { CASE_STUDIES } from "@/lib/case-studies";
import { publishedGuides } from "@/lib/guides";
import { SITE_URL } from "@/lib/seo";

/**
 * Only canonical, indexable, 200 pages. Utility routes (/admin, /api, /auth)
 * and the 404 are deliberately absent.
 *
 * `lastModified` is the date the content last actually changed — bump it when
 * you edit a page. Stamping `new Date()` on every build tells Google every
 * page changed daily, which teaches it to ignore the field.
 */
const CONTENT_UPDATED = new Date("2026-09-30");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, priority: 0.9 })),
    { path: "/locations/pune", priority: 0.9 },
    { path: "/work", priority: 0.8 },
    ...CASE_STUDIES.map((c) => ({ path: `/work/${c.path}`, priority: 0.7 })),
    { path: "/industries", priority: 0.7 },
    ...INDUSTRIES.map((i) => ({ path: `/industries/${i.slug}`, priority: 0.8 })),
    // Draft guides are excluded; the hub appears once one is published.
    ...(publishedGuides().length
      ? [
          { path: "/guides", priority: 0.6 },
          ...publishedGuides().map((g) => ({ path: `/guides/${g.slug}`, priority: 0.6 })),
        ]
      : []),
    { path: "/free-preview", priority: 0.8 },
    { path: "/brief", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/who-we-help", priority: 0.6 },
    ...PERSONAS.map((p) => ({ path: `/who-we-help/${p.slug}`, priority: 0.5 })),
    { path: "/privacy", priority: 0.2 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
