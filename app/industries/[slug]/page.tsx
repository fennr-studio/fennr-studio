import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CaseCards,
  Chips,
  CtaBand,
  Faqs,
  JsonLd,
  LinkCards,
  NumberedList,
  PageHero,
  PrimaryCtas,
  Section,
} from "@/components/page/Blocks";
import { INDUSTRIES, getIndustry } from "@/lib/industries";
import { getService } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";
import { pageMetadata } from "@/lib/seo";
import { faqNode, pageGraph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return pageMetadata({ path: `/industries/${i.slug}`, title: i.title, description: i.description });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const path = `/industries/${ind.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: ind.name, path },
  ];
  const work = CASE_STUDIES.filter((c) => ind.work.includes(c.slug));
  const services = ind.services.map((s) => getService(s)!).filter(Boolean);

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: ind.h1,
          description: ind.description,
          crumbs,
          extra: ind.faqs.length ? [faqNode(ind.faqs)] : [],
        })}
      />
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <PageHero
          crumbs={crumbs}
          eyebrow={`Industry · ${ind.name}`}
          title={ind.h1}
          intro={ind.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        >
          <PrimaryCtas />
        </PageHero>

        <Section eyebrow="What matters" title={`What ${ind.name.toLowerCase()} need from a website`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline rounded-3xl overflow-hidden ring-1 ring-hairline shadow-soft">
            {ind.needs.map((n) => (
              <div key={n.title} className="bg-paper p-7 md:p-9">
                <h3 className="heading-md text-xl text-ink leading-snug">{n.title}</h3>
                <p className="mt-3 text-ink/75 leading-relaxed">{n.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Features" title="What we build in" aside>
          <NumberedList items={ind.features} />
          <div className="mt-10">
            <h3 className="eyebrow text-ink/70 mb-4">Integrations</h3>
            <Chips items={ind.integrations} />
          </div>
        </Section>

        <Section eyebrow="Search" title="The SEO that matters here" aside>
          <NumberedList items={ind.seo} />
        </Section>

        {work.length > 0 && (
          <Section eyebrow="Our work" title={`${ind.name} projects`}>
            <CaseCards studies={work} />
          </Section>
        )}

        <Section eyebrow="Services" title="How we help">
          <LinkCards
            cols={services.length === 4 ? 2 : 3}
            items={services.map((s) => ({
              href: `/services/${s.slug}`,
              eyebrow: "Service",
              title: s.name,
              body: s.cardBody,
            }))}
          />
        </Section>

        {ind.faqs.length > 0 && (
          <Section eyebrow="Questions" title="Frequently asked" aside>
            <Faqs items={ind.faqs} />
          </Section>
        )}

        <CtaBand
          title="See your site before you commit."
          primary={{ href: "/free-preview", label: "Get a free website preview" }}
          body={
            <p>
              Tell us about your business and we&rsquo;ll send a preview of what your
              website could look like — free, and with no obligation.
            </p>
          }
        />
      </main>
      <Footer />
    </>
  );
}
