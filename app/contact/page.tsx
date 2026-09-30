import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd, LinkCards, PageHero, Section } from "@/components/page/Blocks";
import { SERVICES } from "@/lib/services";
import { ADDRESS_LINE, BUSINESS } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { ID, pageGraph } from "@/lib/schema";

const DESCRIPTION =
  "Contact Fennr Studio in Shivajinagar, Pune: call or WhatsApp +91 97651 90702, email hello@fennrstudio.com, book a free strategy call or send a project brief.";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Fennr Studio — Pune",
  description: DESCRIPTION,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const WAYS = [
  {
    label: "Send a project brief",
    body: "Pick services, budget and timeline in three steps. Best if you already know roughly what you need.",
    href: "/brief",
    cta: "Start a brief",
    external: false,
  },
  {
    label: "Book a free strategy call",
    body: "Thirty minutes on your business. You leave with a scope on a page either way.",
    href: BUSINESS.calendly,
    cta: "Pick a time",
    external: true,
  },
  {
    label: "WhatsApp",
    body: "Quickest for a short question. We reply during working hours.",
    href: BUSINESS.whatsapp,
    cta: "Message us",
    external: true,
  },
  {
    label: "Get a free website preview",
    body: "Tell us about your business and see what your site could look like before committing.",
    href: "/free-preview",
    cta: "Request a preview",
    external: false,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/contact",
          type: "ContactPage",
          name: "Contact Fennr Studio",
          description: DESCRIPTION,
          crumbs,
          main: { "@id": ID.studio },
        })}
      />
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <PageHero
          crumbs={crumbs}
          eyebrow="Contact"
          title="Talk to Fennr Studio"
          intro={
            <p>
              Tell us what you&rsquo;re building. Pick whichever way suits you — every
              conversation starts with a free strategy call, with no obligation.
            </p>
          }
        />

        <section className="relative pb-20 md:pb-28">
          <div className="container-px max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            <address className="lg:col-span-5 not-italic bg-ink text-mist rounded-3xl p-8 md:p-10 space-y-6">
              <div>
                <p className="eyebrow text-accent">Studio</p>
                <p className="mt-3 display-tight text-2xl">{BUSINESS.name}</p>
                <p className="mt-2 text-mist/80 leading-relaxed">{ADDRESS_LINE}</p>
                <p className="mt-1 text-sm text-mist/60">Meetings by appointment.</p>
                <a
                  href={BUSINESS.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm underline-accent"
                >
                  View on Google Maps
                </a>
              </div>
              <div>
                <p className="eyebrow text-accent">Phone & WhatsApp</p>
                <a href={`tel:${BUSINESS.phone}`} className="mt-3 block text-xl underline-accent">
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="eyebrow text-accent">Email</p>
                <a href={`mailto:${BUSINESS.email}`} className="mt-3 block text-xl underline-accent">
                  {BUSINESS.email}
                </a>
              </div>
            </address>

            <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-hairline rounded-3xl overflow-hidden ring-1 ring-hairline shadow-soft">
              {WAYS.map((w) => {
                const inner = (
                  <>
                    <h2 className="display-tight text-lg text-ink tracking-[0.02em]">{w.label}</h2>
                    <p className="mt-3 text-sm text-ink/75 leading-relaxed">{w.body}</p>
                    <span className="mt-auto pt-6 inline-flex items-center gap-1.5 display-tight text-[12px] tracking-[0.06em] text-ink">
                      {w.cta}
                      <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </>
                );
                const cls = "h-full p-7 md:p-8 flex flex-col hover:bg-mist transition-smooth";
                return (
                  <li key={w.label} className="bg-paper">
                    {w.external ? (
                      <a href={w.href} target="_blank" rel="noopener noreferrer" className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <Link href={w.href} className={cls}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <Section eyebrow="Services" title="What can we help with?">
          <LinkCards
            items={SERVICES.map((s) => ({
              href: `/services/${s.slug}`,
              eyebrow: "Service",
              title: s.name,
              body: s.cardBody,
            }))}
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
