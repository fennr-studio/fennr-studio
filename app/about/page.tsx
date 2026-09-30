import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CaseCards, CtaBand, JsonLd, LinkCards, PageHero, Section } from "@/components/page/Blocks";
import { SERVICES } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";
import { ADDRESS_LINE, BUSINESS } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { ID, pageGraph } from "@/lib/schema";

const DESCRIPTION =
  "About Fennr Studio, a Pune design and technology studio founded by Gurnoor Singh — one team accountable for brand, website, photography and growth.";

export const metadata = pageMetadata({
  path: "/about",
  title: "About Fennr Studio & Founder Gurnoor Singh",
  description: DESCRIPTION,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/about",
          type: "AboutPage",
          name: "About Fennr Studio",
          description: DESCRIPTION,
          crumbs,
          main: { "@id": ID.studio },
        })}
      />
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <PageHero
          crumbs={crumbs}
          eyebrow="About the studio"
          title="One team accountable for the whole thing"
          intro={
            <>
              <p>
                Fennr Studio is a design and technology studio in Shivaji Nagar, Pune.
                We build websites and web apps, brands, photography, search visibility
                and automation for owner-led businesses, founders and growing teams —
                in Pune and across India.
              </p>
              <p>
                Most small businesses end up juggling a designer, a developer, a
                photographer and an &ldquo;SEO person&rdquo;, none of whom own the
                result. Fennr exists so one team is accountable for all of it — or for
                any single piece you hand us.
              </p>
            </>
          }
        />

        <section id="founder" className="relative pb-20 md:pb-28 scroll-mt-24">
          <div className="container-px max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 bg-ink text-mist rounded-3xl p-8 md:p-10">
                <p className="eyebrow text-accent">Founder</p>
                <div className="mt-6 flex items-center gap-5">
                  <Image
                    src={BUSINESS.founder.image}
                    alt="Gurnoor Singh, founder of Fennr Studio"
                    width={96}
                    height={96}
                    className="flex-none w-24 h-24 rounded-full object-cover bw-photo ring-2 ring-accent"
                  />
                  <div>
                    <h2 className="display-tight text-2xl">Gurnoor Singh</h2>
                    <p className="text-sm text-mist/70">Founder, Fennr Studio</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 bg-paper rounded-3xl ring-1 ring-hairline p-8 md:p-10 space-y-5 text-ink/80 leading-relaxed text-lg">
                <p>
                  Gurnoor Singh is a graduate of IIIT Guwahati who worked as a software
                  engineer in blockchain before founding Fennr Studio. That engineering
                  background is why the studio builds its own websites and web apps
                  rather than outsourcing development.
                </p>
                <p>
                  He is also a photographer; his work has been exhibited at the State
                  Gallery of Art, Hyderabad. It&rsquo;s why photography sits alongside
                  design and code at Fennr rather than being bolted on.
                </p>
                <p>
                  He founded Fennr to give owner-led businesses one team accountable for
                  brand, website and everything that makes it work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Section eyebrow="How we work" title="What we believe about the work" aside>
          <ol className="border-t border-ink/10">
            {[
              [
                "Honest over impressive.",
                "We'll tell you when you don't need a rebuild, when SEO can't fix a problem, or when you don't need us yet. We don't publish numbers we can't stand behind.",
              ],
              [
                "You own everything.",
                "Domain, hosting, code, designs and photographs are yours. Hosting is billed at cost. You can leave with everything at any time.",
              ],
              [
                "Designed and built in one place.",
                "What you approve in design is what ships, because the people who design it also build it.",
              ],
              [
                "Fast and cheap to run.",
                "Static where possible, minimal JavaScript, optimised images. A fast site ranks better, converts better and costs less to host.",
              ],
            ].map(([t, b]) => (
              <li key={t} className="py-6 border-b border-ink/10">
                <h3 className="heading-md text-lg text-ink">{t}</h3>
                <p className="mt-2 text-ink/75 leading-relaxed">{b}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section eyebrow="Capabilities" title="What the studio does">
          <LinkCards
            items={SERVICES.map((s) => ({
              href: `/services/${s.slug}`,
              eyebrow: "Service",
              title: s.name,
              body: s.cardBody,
            }))}
          />
        </Section>

        <Section
          eyebrow="Work"
          title="Recent projects"
          intro={
            <p>
              See{" "}
              <Link href="/work" className="underline decoration-accent underline-offset-4">
                all case studies
              </Link>
              .
            </p>
          }
        >
          <CaseCards studies={CASE_STUDIES.slice(0, 3)} />
        </Section>

        <Section eyebrow="Where we are" title="Based in Pune, working everywhere" aside>
          <div className="space-y-4 text-ink/80 leading-relaxed text-lg">
            <p>
              The studio is in {ADDRESS_LINE}. Read more about{" "}
              <Link href="/locations/pune" className="underline decoration-accent underline-offset-4">
                working with us in Pune
              </Link>
              , or{" "}
              <Link href="/contact" className="underline decoration-accent underline-offset-4">
                get in touch
              </Link>
              .
            </p>
          </div>
        </Section>

        <CtaBand
          title="Let's build something you'd want your name on."
          body={<p>The first strategy call is free.</p>}
        />
      </main>
      <Footer />
    </>
  );
}
