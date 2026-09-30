import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CtaBand, JsonLd, LinkCards, PageHero, PrimaryCtas, Section } from "@/components/page/Blocks";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { abs, pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";

const DESCRIPTION =
  "Website design, web development, branding, SEO, commercial photography and AI automation — one Pune studio accountable for the whole thing, or any single piece.";

export const metadata = pageMetadata({
  path: "/services",
  title: "Services — Web, Brand, SEO, Photography & AI",
  description: DESCRIPTION,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/services",
          type: "CollectionPage",
          name: "Services",
          description: DESCRIPTION,
          crumbs,
          main: {
            "@type": "ItemList",
            itemListElement: SERVICES.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: abs(`/services/${s.slug}`),
            })),
          },
        })}
      />
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <PageHero
          crumbs={crumbs}
          eyebrow="Services"
          title="Design, technology and growth from one Pune studio"
          intro={
            <>
              <p>
                Fennr Studio is a design and technology studio in Shivajinagar, Pune. We
                build websites, web apps, brands, photography, search visibility and
                automation for businesses in Pune and across India.
              </p>
              <p>
                Take the whole thing, or one piece. Some clients want brand, site,
                photography and growth together; others come to us just for a logo, just
                for SEO or just for a shoot.
              </p>
            </>
          }
        >
          <PrimaryCtas />
        </PageHero>

        <Section eyebrow="What we do" title="Six services, one accountable team">
          <LinkCards
            items={SERVICES.map((s) => ({
              href: `/services/${s.slug}`,
              eyebrow: s.serviceType,
              title: s.name,
              body: s.cardBody,
            }))}
          />
        </Section>

        <Section
          eyebrow="By industry"
          title="Built for the businesses we know best"
          intro={
            <p>
              Each industry has its own needs — menus and ordering for cafés, booking and
              trust for clinics, direct booking for stays. See{" "}
              <Link href="/industries" className="underline decoration-accent underline-offset-4">
                all industries
              </Link>{" "}
              or{" "}
              <Link href="/work" className="underline decoration-accent underline-offset-4">
                our work
              </Link>
              .
            </p>
          }
        >
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
          title="Not sure which service you need?"
          body={
            <p>
              That's what the free strategy call is for. We'll look at where you are and
              tell you honestly what would move the needle — including when the answer is
              &ldquo;not us, not yet&rdquo;.
            </p>
          }
        />
      </main>
      <Footer />
    </>
  );
}
