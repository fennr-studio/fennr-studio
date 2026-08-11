import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import MetaPixel from "@/components/MetaPixel";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const GA_ID = "G-Q3RC6LY4LB";

const display = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const numeral = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-numeral",
});

const DESCRIPTION =
  "Fennr is a design & technology studio building fast, beautiful websites, brands and growth for founders and small businesses. Start with a free strategy call.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fennr Studio | Web & Brand Design for D2C Businesses",
    template: "%s · Fennr Studio",
  },
  description: DESCRIPTION,
  keywords: [
    "web design Pune",
    "website development Pune",
    "branding studio India",
    "logo & identity design",
    "SEO for small business",
    "D2C website",
    "restaurant website",
    "photography portfolio website",
    "clinic website",
    "fennr studio",
  ],
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
    title: "Fennr Studio — Web, Brand & Growth Studio",
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fennr Studio — Web, Brand & Growth Studio",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#studio`,
  name: "Fennr Studio",
  alternateName: ["fennr", "fennr.*", "fennr studio"],
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/icon.png`,
  email: "hello@fennrstudio.com",
  telephone: "+91-9765190702",
  description: DESCRIPTION,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shivaji Nagar",
    addressLocality: "Pune",
    postalCode: "411007",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
  founder: { "@type": "Person", name: "Gurnoor Singh" },
  sameAs: ["https://www.instagram.com/fennrstudio/"],
  knowsAbout: [
    "Web Development",
    "Logo & Identity Design",
    "SEO",
    "Photography",
    "Graphic Design",
    "Brand Strategy",
  ],
  // Mirrors the six offerings in the on-page catalogue. Kept here rather than
  // generated from the component so the markup stays untouched.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      [
        "Web Development & Integration",
        "Websites and web apps with WhatsApp, payments and API integrations.",
      ],
      [
        "Logo & Identity Design",
        "Logo systems, brand boards and the identity that goes around them.",
      ],
      [
        "SEO & Visibility",
        "Technical and local SEO, analytics and search visibility.",
      ],
      [
        "Professional Photography",
        "Product, food and interior photography for web and print.",
      ],
      [
        "Graphic Design",
        "Social, print and campaign design built on the brand system.",
      ],
      [
        "Brand Strategy & Ideation",
        "Positioning, naming and moodboards before anything gets designed.",
      ],
    ].map(([name, description]) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        description,
        serviceType: name,
        provider: { "@id": `${SITE_URL}/#studio` },
        areaServed: { "@type": "Country", name: "India" },
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${numeral.variable} min-h-screen bg-mist text-ink font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <MetaPixel />
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  );
}
