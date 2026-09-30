/**
 * JSON-LD graph.
 *
 * One entity graph for the whole site, joined by stable `@id`s:
 *
 *   WebSite (#website) ── publisher ──▶ ProfessionalService (#studio)
 *                                           │ founder
 *                                           ▼
 *                                       Person (/about#founder)
 *   WebPage (<url>#webpage) ── isPartOf ─▶ #website, about ─▶ #studio
 *     ├─ breadcrumb ─▶ BreadcrumbList
 *     └─ mainEntity ─▶ Service / CreativeWork / ItemList
 *
 * The root layout emits the three sitewide nodes; each page emits only its own
 * WebPage + breadcrumb + main entity and *references* the sitewide ones by
 * `@id` instead of repeating them. `#studio` is the id the site has always
 * used — keep it stable, Google has already associated it with the entity.
 *
 * Rule: markup describes what is visible on the page. No Review,
 * AggregateRating or Offer nodes unless the real thing is on the page.
 */
import { SITE_URL, abs } from "./seo";
import { BUSINESS, ENTITY_DESCRIPTION } from "./site";

export const ID = {
  studio: `${SITE_URL}/#studio`,
  website: `${SITE_URL}/#website`,
  founder: `${SITE_URL}/about#founder`,
};

const ref = (id: string) => ({ "@id": id });

type Crumb = { name: string; path: string };

export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/** Sitewide nodes, emitted once by the root layout. */
export function siteGraph(knowsAbout: string[], services: { name: string; path: string }[]) {
  const a = BUSINESS.address;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ID.studio,
        name: BUSINESS.name,
        alternateName: ["fennr", "fennr.*", "Fennr"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon.png`,
        },
        image: `${SITE_URL}/opengraph-image.png`,
        description: ENTITY_DESCRIPTION,
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: a.street,
          addressLocality: a.locality,
          postalCode: a.postalCode,
          addressRegion: a.region,
          addressCountry: a.country,
        },
        // The verified Business Profile pin (lib/site.ts), not a geocode.
        geo: {
          "@type": "GeoCoordinates",
          latitude: BUSINESS.geo.lat,
          longitude: BUSINESS.geo.lng,
        },
        hasMap: BUSINESS.maps,
        ...(BUSINESS.open24h
          ? {
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
            }
          : {}),
        areaServed: [
          { "@type": "City", name: "Pune" },
          { "@type": "State", name: "Maharashtra" },
          { "@type": "Country", name: "India" },
        ],
        founder: ref(ID.founder),
        sameAs: BUSINESS.sameAs,
        knowsAbout,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: BUSINESS.email,
          telephone: BUSINESS.phone,
          areaServed: "IN",
          availableLanguage: ["en"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: ref(`${abs(s.path)}#service`),
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": ID.website,
        url: SITE_URL,
        name: BUSINESS.name,
        inLanguage: "en-IN",
        publisher: ref(ID.studio),
      },
      {
        "@type": "Person",
        "@id": ID.founder,
        name: BUSINESS.founder.name,
        jobTitle: BUSINESS.founder.role,
        image: abs(BUSINESS.founder.image),
        url: abs("/about"),
        worksFor: ref(ID.studio),
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: BUSINESS.founder.alumniOf,
        },
        knowsAbout: ["Web development", "Software engineering", "Photography", "Brand design"],
      },
    ],
  };
}

/** A page's own nodes. `main` is merged in as the page's mainEntity. */
export function pageGraph({
  path,
  name,
  description,
  crumbs,
  type = "WebPage",
  main,
  extra = [],
}: {
  path: string;
  name: string;
  description: string;
  crumbs: Crumb[];
  type?: string;
  main?: Record<string, unknown>;
  extra?: Record<string, unknown>[];
}) {
  const url = abs(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en-IN",
        isPartOf: ref(ID.website),
        about: ref(ID.studio),
        breadcrumb: breadcrumbList(crumbs),
        ...(main ? { mainEntity: main } : {}),
      },
      ...extra,
    ],
  };
}

export function serviceNode({
  path,
  name,
  serviceType,
  description,
  areaServed = ["Pune", "India"],
}: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
  areaServed?: string[];
}) {
  return {
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name,
    serviceType,
    description,
    url: abs(path),
    provider: ref(ID.studio),
    areaServed: areaServed.map((n) =>
      n === "India" ? { "@type": "Country", name: n } : { "@type": "City", name: n },
    ),
  };
}

export function faqNode(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Serialise safely for a <script> tag: `<` can never close the tag early. */
export const jsonLdString = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
