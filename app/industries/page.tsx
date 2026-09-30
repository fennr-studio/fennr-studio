import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, JsonLd, LinkCards, PageHero, Section } from "@/components/page/Blocks";
import { INDUSTRIES } from "@/lib/industries";
import { abs, pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";

const DESCRIPTION =
  "Websites, branding and growth for restaurants and cafés, clinics, hotels and villas, and photographers — each built around what that business needs.";

export const metadata = pageMetadata({
  path: "/industries",
  title: "Industries We Build Websites For",
  description: DESCRIPTION,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/industries",
          type: "CollectionPage",
          name: "Industries",
          description: DESCRIPTION,
          crumbs,
          main: {
            "@type": "ItemList",
            itemListElement: INDUSTRIES.map((i, n) => ({
              "@type": "ListItem",
              position: n + 1,
              name: i.name,
              url: abs(`/industries/${i.slug}`),
            })),
          },
        })}
      />
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <PageHero
          crumbs={crumbs}
          eyebrow="Industries"
          title="Websites built for how your kind of business works"
          intro={
            <>
              <p>
                A café, a dental clinic and a resort all need a website — but not the
                same one. A café needs a current menu and fast ordering; a clinic needs
                trust and booking; a resort needs photography and the direct booking.
              </p>
              <p>
                These are the industries where we have shipped real work. We also work
                with D2C brands, boutiques, consultants and early-stage startups — see{" "}
                <Link href="/who-we-help" className="underline decoration-accent underline-offset-4">
                  who we help
                </Link>
                .
              </p>
            </>
          }
        />
        <Section eyebrow="Industries" title="Where we have shipped">
          <LinkCards
            cols={2}
            items={INDUSTRIES.map((i) => ({
              href: `/industries/${i.slug}`,
              eyebrow: "Industry",
              title: i.name,
              body: i.cardBody,
            }))}
          />
        </Section>
        <CtaBand
          title="Your industry not listed?"
          body={<p>Tell us what you do. If we're not the right fit, we'll say so on the first call.</p>}
        />
      </main>
      <Footer />
    </>
  );
}
