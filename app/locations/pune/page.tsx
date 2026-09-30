import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CaseCards,
  CtaBand,
  Faqs,
  JsonLd,
  LinkCards,
  NumberedList,
  PageHero,
  PrimaryCtas,
  Section,
} from "@/components/page/Blocks";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { CASE_STUDIES } from "@/lib/case-studies";
import { ADDRESS_LINE, BUSINESS } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { ID, faqNode, pageGraph } from "@/lib/schema";

const PATH = "/locations/pune";
const DESCRIPTION =
  "Fennr Studio is a design and technology studio in Shivajinagar, Pune: website design, development, branding, SEO, photography and AI automation.";

export const metadata = pageMetadata({
  path: PATH,
  title: "Web Design, Development & Digital Studio in Pune",
  description: DESCRIPTION,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Pune", path: PATH },
];

const FAQS = [
  {
    q: "Where is Fennr Studio located?",
    a: `We're based in ${ADDRESS_LINE}. We meet Pune clients in person when it helps, and work remotely with everyone else.`,
  },
  {
    q: "Do you meet clients in person in Pune?",
    a: "Yes, when it's useful — a kick-off, a walkthrough of your space before a shoot, or a design review. Most day-to-day work happens over calls, shared previews and WhatsApp, which keeps things quick for busy owners.",
  },
  {
    q: "Is photography included for Pune businesses?",
    a: "Photography is a separate service, but shoots in Pune need no travel planning, so it's straightforward to add product, food, interior or team photography to a website project.",
  },
  {
    q: "Do you only work with Pune businesses?",
    a: "No. Pune is home, and a good share of our work is remote — for example Tekton Talent Solutions in Hyderabad. Everything except photography works the same from anywhere.",
  },
  {
    q: "Can you help my Pune business show up on Google Maps?",
    a: "Yes. Local SEO — a complete Google Business Profile, consistent details everywhere, location-relevant pages and an honest review process — is part of our SEO service. Nobody can guarantee a map-pack position, but these are the things local ranking depends on.",
  },
];

export default function PunePage() {
  const puneWork = CASE_STUDIES.filter((c) => c.location === "Pune");
  const otherWork = CASE_STUDIES.filter((c) => c.location !== "Pune").slice(0, 2);

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: PATH,
          name: "Fennr Studio — design and technology studio in Pune",
          description: DESCRIPTION,
          crumbs,
          main: { "@id": ID.studio },
          extra: [faqNode(FAQS)],
        })}
      />
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <PageHero
          crumbs={crumbs}
          eyebrow="Pune, Maharashtra"
          title="A design and technology studio in Pune"
          intro={
            <>
              <p>
                Fennr Studio is based in Shivajinagar, Pune. We design and build
                websites and web apps, create brands, shoot commercial photography, run
                SEO and build AI and WhatsApp automation — for Pune businesses, and
                remotely for clients across India.
              </p>
              <p>
                Being in the city means we can walk your café before designing its menu,
                shoot your clinic without a travel day, and meet when a conversation is
                better in person than on a call.
              </p>
            </>
          }
        >
          <PrimaryCtas />
        </PageHero>

        <Section
          eyebrow="Services in Pune"
          title="What we do for Pune businesses"
          intro={
            <p>
              Each service has its own page with the process, deliverables, FAQs and
              relevant work.
            </p>
          }
        >
          <LinkCards
            items={SERVICES.map((s) => ({
              href: `/services/${s.slug}`,
              eyebrow: "Service",
              title: s.title.split(" — ")[0],
              body: s.cardBody,
            }))}
          />
        </Section>

        <Section eyebrow="Who we work with" title="Owner-led businesses across the city" aside>
          <div className="space-y-5 text-ink/80 leading-relaxed text-lg">
            <p>
              Most of the businesses we work with are run by the person who started
              them: cafés and restaurants, clinics and dentists, boutiques and D2C
              brands, villas and boutique stays, consultants,
              and early-stage startups.
            </p>
            <p>
              What they have in common is that they&rsquo;ve outgrown an Instagram page
              and a phone number. Customers now search on Google and Maps, compare on
              their phones, and expect to book, order or message in a tap.
            </p>
          </div>
          <div className="mt-10">
            <NumberedList
              items={INDUSTRIES.map((i) => ({
                title: i.name,
                body: i.cardBody,
              }))}
            />
            <p className="mt-6 text-ink/75">
              See how we work with each on the{" "}
              <Link href="/industries" className="underline decoration-accent underline-offset-4">
                industries
              </Link>{" "}
              page.
            </p>
          </div>
        </Section>

        <Section
          eyebrow="Built in Pune"
          title="Pune work"
          intro={
            <p>
              Photowalks in Pune gave a city-wide photo-walk community a proper home: a
              walks calendar, member accounts, photographer pages and a credited archive
              of photographs from walks across the city.
            </p>
          }
        >
          <CaseCards studies={[...puneWork, ...otherWork]} />
        </Section>

        <Section eyebrow="Local search" title="Getting found in Pune" aside>
          <div className="space-y-5 text-ink/80 leading-relaxed text-lg">
            <p>
              Google says local results depend mainly on three things: relevance, distance
              and prominence. Distance you can&rsquo;t change. Relevance and prominence
              you can — with a complete Business Profile, a website that clearly says
              what you do and where, consistent details across every listing, and genuine
              reviews from real customers.
            </p>
            <p>
              That&rsquo;s the work our{" "}
              <Link href="/services/seo" className="underline decoration-accent underline-offset-4">
                SEO service
              </Link>{" "}
              does for Pune businesses. We don&rsquo;t promise rankings — we build the
              signals rankings are based on, and measure the enquiries.
            </p>
          </div>
        </Section>

        <Section eyebrow="Visit or contact" title="Find us" aside>
          <address className="not-italic text-ink/85 leading-relaxed text-lg space-y-2">
            <p className="heading-md text-xl text-ink">{BUSINESS.name}</p>
            <p>{ADDRESS_LINE}</p>
            <p>
              <a href={`tel:${BUSINESS.phone}`} className="underline decoration-accent underline-offset-4">
                {BUSINESS.phoneDisplay}
              </a>{" "}
              · calls and WhatsApp
            </p>
            <p>
              <a href={`mailto:${BUSINESS.email}`} className="underline decoration-accent underline-offset-4">
                {BUSINESS.email}
              </a>
            </p>
          </address>
          <p className="mt-6 text-ink/75">
            <a
              href={BUSINESS.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-accent underline-offset-4"
            >
              View Fennr Studio on Google Maps
            </a>
            . Meetings are by appointment —{" "}
            <Link href="/contact" className="underline decoration-accent underline-offset-4">
              get in touch
            </Link>{" "}
            first.
          </p>
        </Section>

        <Section eyebrow="Questions" title="Working with a Pune studio" aside>
          <Faqs items={FAQS} />
        </Section>

        <CtaBand
          title="Running a business in Pune?"
          body={<p>Let&rsquo;s talk. The first strategy call is free — in person or on a call.</p>}
        />
      </main>
      <Footer />
    </>
  );
}
