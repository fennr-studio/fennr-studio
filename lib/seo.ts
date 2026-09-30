import type { Metadata } from "next";

export const SITE_URL = "https://www.fennrstudio.com";

/** Used whenever a page has no image of its own. 1200×630. */
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Fennr Studio — design and technology studio in Pune",
};

/** Absolute URL for a site path — schema needs absolute, metadata does not. */
export const abs = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Per-page metadata.
 *
 * Next merges metadata *shallowly* down the segment tree: a child that sets
 * `openGraph` replaces the parent's entire object rather than merging into it,
 * and a child that sets nothing inherits the parent's values wholesale. That
 * second half is why the canonical must be set per page — a canonical on the
 * root layout silently points every page at the homepage — and the first half
 * is why the OG image is set here too: without it every page that calls this
 * loses the root image.
 *
 * `path` is relative and resolves against `metadataBase` in the root layout.
 * `title` gets " · Fennr Studio" from the root template unless `absoluteTitle`.
 */
export function pageMetadata({
  path,
  title,
  description,
  image,
  type = "website",
  absoluteTitle = false,
  noindex = false,
}: {
  path: string;
  title: string;
  description: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  absoluteTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const og = image ?? DEFAULT_OG_IMAGE;
  const fullTitle = absoluteTitle ? title : `${title} · Fennr Studio`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      siteName: "Fennr Studio",
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [og.url],
    },
  };
}
