import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonaPage from "@/components/PersonaPage";
import { PERSONAS, getPersona } from "@/lib/personas";

const SITE_URL = "https://www.fennrstudio.com";

export function generateStaticParams() {
  return PERSONAS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const persona = getPersona(slug);
  if (!persona) return {};

  const url = `${SITE_URL}/who-we-help/${persona.slug}`;
  const title = `${persona.name} | Who We Help`;

  return {
    title,
    description: persona.heroSub,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "fennr.*",
      title: `${persona.name} — fennr studio`,
      description: persona.heroSub,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${persona.name} — fennr studio`,
      description: persona.heroSub,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const persona = getPersona(slug);
  if (!persona) notFound();

  const url = `${SITE_URL}/who-we-help/${persona.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: persona.name,
        url,
        description: persona.heroSub,
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
            { "@type": "ListItem", position: 3, name: persona.name, item: url },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: persona.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <PersonaPage persona={persona} />
      <Footer />
    </>
  );
}
