import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, JsonLd, LinkCards, PageHero, Section } from "@/components/page/Blocks";
import { publishedGuides } from "@/lib/guides";
import { abs, pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";

const DESCRIPTION =
  "Practical guides from Fennr Studio on local SEO, Google Business Profile, WhatsApp automation and web development, written from real projects and primary sources.";

const guides = publishedGuides();

// An empty hub is a thin page: keep it out of the index until a guide is live.
export const metadata = pageMetadata({
  path: "/guides",
  title: "Guides — Local SEO, Automation & Web Development",
  description: DESCRIPTION,
  noindex: guides.length === 0,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
];

export default function GuidesPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/guides",
          type: "CollectionPage",
          name: "Guides",
          description: DESCRIPTION,
          crumbs,
          main: {
            "@type": "ItemList",
            itemListElement: guides.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: g.title,
              url: abs(`/guides/${g.slug}`),
            })),
          },
        })}
      />
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <PageHero
          crumbs={crumbs}
          eyebrow="Guides"
          title="Guides from the studio"
          intro={
            <p>
              Practical write-ups from work we&rsquo;ve actually done: local search,
              WhatsApp automation and web development. Each cites its sources and is
              written by the person who did the work.
            </p>
          }
        />
        <Section eyebrow="Latest" title="All guides">
          {guides.length ? (
            <LinkCards
              cols={guides.length === 2 ? 2 : 3}
              items={guides.map((g) => ({
                href: `/guides/${g.slug}`,
                eyebrow: g.category,
                title: g.title,
                body: g.summary,
              }))}
            />
          ) : (
            <p className="text-ink/75">The first guides are being reviewed and will appear here soon.</p>
          )}
        </Section>
        <CtaBand title="Rather we just did it?" body={<p>The first strategy call is free.</p>} />
      </main>
      <Footer />
    </>
  );
}
