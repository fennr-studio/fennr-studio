import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhoWeHelp from "@/components/WhoWeHelp";
import { PERSONAS } from "@/lib/personas";

const SITE_URL = "https://www.fennrstudio.com";
const DESCRIPTION =
  "We partner with founders, product teams, and growth teams to build, launch, and improve websites, products, and conversion systems through focused sprints.";

export const metadata: Metadata = {
  title: "Who We Help | Founders, Teams & Businesses",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/who-we-help` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/who-we-help`,
    siteName: "fennr.*",
    title: "Who We Help — fennr studio",
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Who We Help — fennr studio",
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Who We Help",
  url: `${SITE_URL}/who-we-help`,
  description: DESCRIPTION,
  isPartOf: { "@type": "WebSite", url: SITE_URL, name: "fennr studio" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Who We Help",
        item: `${SITE_URL}/who-we-help`,
      },
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: PERSONAS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}/who-we-help/${p.slug}`,
    })),
  },
};

export default function WhoWeHelpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <WhoWeHelp />
      <Footer />
    </>
  );
}
