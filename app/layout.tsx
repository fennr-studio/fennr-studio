import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import MetaPixel from "@/components/MetaPixel";
import ConversionTracking from "@/components/ConversionTracking";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";
import { siteGraph, jsonLdString } from "@/lib/schema";
import { SERVICES } from "@/lib/services";
import "./globals.css";

const GA_ID = "G-Q3RC6LY4LB";

const display = Hanken_Grotesk({
  subsets: ["latin"],
  // Variable font: one file per style covers every weight, instead of one
  // file per weight × style (12 files before).
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  // Not preloaded: the LCP element on every page is display type (Hanken).
  // Body text swaps in over a metric-matched fallback, so no layout shift.
  preload: false,
});

const numeral = Cormorant_Garamond({
  subsets: ["latin"],
  // Only used by .numeral, which is weight 500 (upright and italic).
  weight: ["500"],
  style: ["normal", "italic"],
  preload: false,
  variable: "--font-numeral",
});

const TITLE = "Fennr Studio | Web Design, Development & Branding in Pune";
const DESCRIPTION =
  "Fennr Studio is a Pune design and technology studio building websites, web apps, brands, photography, SEO and AI automation for businesses across India.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Fennr Studio",
  },
  description: DESCRIPTION,
  applicationName: "Fennr Studio",
  authors: [{ name: "Gurnoor Singh" }],
  creator: "Fennr Studio",
  publisher: "Fennr Studio",
  // NOTE: no `alternates.canonical` or `openGraph.url` here on purpose.
  // Metadata is inherited down the segment tree, so setting them at the root
  // makes every child page canonicalise to the homepage. Each page sets its
  // own — relative paths resolve against `metadataBase`.
  openGraph: {
    type: "website",
    siteName: "Fennr Studio",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101013",
};

// Sitewide entity graph — the studio, the website and the founder. Pages add
// their own WebPage/Service/CreativeWork nodes and reference these by @id.
const jsonLd = siteGraph(
  ["Website design", "Web development", "Web applications", "Brand identity design", "Logo design", "Search engine optimisation", "Local SEO", "Commercial photography", "WhatsApp automation", "AI automation"],
  SERVICES.map((s) => ({ name: s.name, path: `/services/${s.slug}` })),
);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body
        className={`${display.variable} ${body.variable} ${numeral.variable} min-h-screen bg-mist text-ink font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
        />
        {children}
        <MetaPixel />
        <ConversionTracking />
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  );
}
