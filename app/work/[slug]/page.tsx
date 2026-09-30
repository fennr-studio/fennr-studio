import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CaseCards,
  Chips,
  CtaBand,
  JsonLd,
  LinkCards,
  NumberedList,
  PageHero,
  Section,
} from "@/components/page/Blocks";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { getService } from "@/lib/services";
import { abs, pageMetadata } from "@/lib/seo";
import { ID, pageGraph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.path }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata({
    path: `/work/${c.path}`,
    title: `${c.client} Case Study`,
    description: c.summary,
    type: "article",
    image: {
      url: `/img/case-${c.slug}-a.jpg`,
      width: 1600,
      height: 1000,
      alt: `${c.client} website designed and built by Fennr Studio`,
    },
  });
}

const SHOTS = [
  { k: "a", label: "Home page, desktop", w: 1600, h: 1000 },
  { k: "c", label: "Inner page, desktop", w: 1600, h: 1000 },
  { k: "d", label: "Detail, desktop", w: 1600, h: 1000 },
];

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const path = `/work/${c.path}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: c.client, path },
  ];
  const services = c.services.map((s) => getService(s)!).filter(Boolean);
  const more = CASE_STUDIES.filter(
    (o) => o.slug !== c.slug && o.services.some((s) => c.services.includes(s)),
  ).slice(0, 3);

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: c.title,
          description: c.summary,
          crumbs,
          main: {
            "@type": "CreativeWork",
            "@id": `${abs(path)}#work`,
            name: c.title,
            headline: c.title,
            abstract: c.summary,
            url: abs(path),
            image: abs(`/img/case-${c.slug}-a.jpg`),
            creator: { "@id": ID.studio },
            keywords: c.tags.join(", "),
            ...(c.location
              ? { locationCreated: { "@type": "Place", name: c.location } }
              : {}),
            about: {
              "@type": "WebSite",
              name: c.client,
              url: c.href,
            },
          },
        })}
      />
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <PageHero
          crumbs={crumbs}
          eyebrow={`Case study · ${c.industry}${c.location ? ` · ${c.location}` : ""}`}
          title={c.title}
          intro={<p>{c.summary}</p>}
        >
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink"
            >
              Visit the live site
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
            </a>
            <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <div>
                <dt className="eyebrow text-ink/55">Client</dt>
                <dd className="text-ink">{c.client}</dd>
              </div>
              {c.location && (
                <div>
                  <dt className="eyebrow text-ink/55">Location</dt>
                  <dd className="text-ink">{c.location}</dd>
                </div>
              )}
            </dl>
          </div>
        </PageHero>

        <section className="relative pb-20 md:pb-28">
          <div className="container-px max-w-[1400px] mx-auto">
            <div
              className="relative rounded-3xl overflow-hidden ring-1 ring-hairline shadow-soft p-4 md:p-8"
              style={{ background: c.accent }}
            >
              <Image
                src={`/img/case-${c.slug}-a.jpg`}
                alt={`${c.client} website — home page on desktop`}
                width={1600}
                height={1000}
                priority
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </section>

        <Section eyebrow="Context" title="The client" aside>
          <p className="text-ink/80 leading-relaxed text-lg">{c.context}</p>
        </Section>

        <Section eyebrow="The challenge" title="What had to change" aside>
          <p className="text-ink/80 leading-relaxed text-lg">{c.challenge}</p>
        </Section>

        <Section eyebrow="Approach" title="How we approached it" aside>
          <NumberedList items={c.approach} />
        </Section>

        <section className="relative pb-20 md:pb-28">
          <div className="container-px max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {SHOTS.slice(1).map((s) => (
              <figure key={s.k} className="rounded-3xl overflow-hidden ring-1 ring-hairline bg-paper">
                <Image
                  src={`/img/case-${c.slug}-${s.k}.jpg`}
                  alt={`${c.client} website — ${s.label.toLowerCase()}`}
                  width={s.w}
                  height={s.h}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto"
                />
                <figcaption className="px-5 py-3 text-xs text-slatey">{s.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <Section eyebrow="What we built" title="Delivered" aside>
          <NumberedList items={c.built} />
          <div className="mt-10">
            <h3 className="eyebrow text-ink/60 mb-4">Technology</h3>
            <Chips items={c.stack} />
          </div>
          <div className="mt-8">
            <h3 className="eyebrow text-ink/60 mb-4">Deliverables</h3>
            <Chips items={c.deliverables} />
          </div>
        </Section>

        <Section
          eyebrow="Services used"
          title="Services on this project"
          intro={
            c.industryPath ? (
              <p>
                More on how we work with this kind of business:{" "}
                <Link href={c.industryPath} className="underline decoration-accent underline-offset-4">
                  {c.industry.toLowerCase()} websites
                </Link>
                .
              </p>
            ) : undefined
          }
        >
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

        {more.length > 0 && (
          <Section eyebrow="More work" title="Related projects">
            <CaseCards studies={more} />
          </Section>
        )}

        <CtaBand
          title="Want something like this?"
          body={<p>Tell us about your business — the first strategy call is free.</p>}
        />
      </main>
      <Footer />
    </>
  );
}
