import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  ProblemList,
  Section,
} from "@/components/page/Blocks";
import { SERVICES, getService } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { caseStudiesFor } from "@/lib/case-studies";
import { pageMetadata } from "@/lib/seo";
import { faqNode, pageGraph, serviceNode } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ path: `/services/${s.slug}`, title: s.title, description: s.description });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const path = `/services/${s.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.name, path },
  ];
  const work = caseStudiesFor(s.slug).slice(0, 3);
  const industries = INDUSTRIES.filter((i) => s.industries.includes(i.slug));
  const related = s.related.map((r) => getService(r)!).filter(Boolean);

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: s.h1,
          description: s.description,
          crumbs,
          main: serviceNode({
            path,
            name: s.name,
            serviceType: s.serviceType,
            description: s.cardBody,
          }),
          extra: [faqNode(s.faqs)],
        })}
      />
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <PageHero
          crumbs={crumbs}
          eyebrow={s.eyebrow}
          title={s.h1}
          intro={s.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        >
          <PrimaryCtas />
        </PageHero>

        <Section eyebrow="Who it's for" title={`Who ${s.name.toLowerCase()} is for`} aside>
          <NumberedList items={s.whoFor} />
        </Section>

        <Section eyebrow="Problems we solve" title="What usually goes wrong — and how we fix it">
          <ProblemList items={s.problems} />
        </Section>

        <Section eyebrow="Deliverables" title="What you get" aside>
          <NumberedList items={s.deliverables} />
          {s.tools && (
            <div className="mt-10">
              <h3 className="eyebrow text-ink/60 mb-4">Tools & technology</h3>
              <Chips items={s.tools} />
            </div>
          )}
        </Section>

        <Section eyebrow="Process" title="How a project runs" aside>
          <NumberedList items={s.process} />
        </Section>

        {work.length > 0 && (
          <Section
            eyebrow="Selected work"
            title={`${s.name} projects`}
            intro={
              <p>
                Real projects, linked to the live sites. See{" "}
                <Link href="/work" className="underline decoration-accent underline-offset-4">
                  all our work
                </Link>
                .
              </p>
            }
          >
            <CaseCards studies={work} />
          </Section>
        )}

        <Section eyebrow="Industries" title="Industries we build for">
          <LinkCards
            cols={industries.length === 4 ? 2 : 3}
            items={industries.map((i) => ({
              href: `/industries/${i.slug}`,
              eyebrow: "Industry",
              title: i.name,
              body: i.cardBody,
            }))}
          />
        </Section>

        <Section eyebrow="Questions" title={`${s.name} FAQs`} aside>
          <Faqs items={s.faqs} />
        </Section>

        <Section eyebrow="Related services" title="Often paired with">
          <LinkCards
            items={related.map((r) => ({
              href: `/services/${r.slug}`,
              eyebrow: "Service",
              title: r.name,
              body: r.cardBody,
            }))}
          />
          <p className="mt-8 text-ink/75 leading-relaxed max-w-2xl">
            Fennr Studio is based in Shivaji Nagar and works with businesses{" "}
            <Link
              href="/locations/pune"
              className="underline decoration-accent underline-offset-4"
            >
              across Pune
            </Link>{" "}
            and remotely across India.
          </p>
        </Section>

        <CtaBand
          title="Tell us what you're building."
          body={
            <p>
              The first strategy call is free, and you'll leave with a scope on a page
              whether or not we work together.
            </p>
          }
        />
      </main>
      <Footer />
    </>
  );
}
