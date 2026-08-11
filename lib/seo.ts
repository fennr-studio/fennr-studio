import type { Metadata } from "next";

export const SITE_URL = "https://www.fennrstudio.com";

/**
 * Per-page metadata.
 *
 * Next merges metadata *shallowly* down the segment tree: a child that sets
 * `openGraph` replaces the parent's entire object rather than merging into it,
 * and a child that sets nothing inherits the parent's values wholesale. That
 * second half is why the canonical must be set per page — a canonical on the
 * root layout silently points every page at the homepage.
 *
 * `path` is relative and resolves against `metadataBase` in the root layout.
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "fennr.*",
      locale: "en_IN",
      url: path,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
