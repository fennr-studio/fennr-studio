import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs, CaseCards, CtaBand, JsonLd, LinkCards } from "@/components/page/Blocks";
import { GUIDES, getGuide, type Block } from "@/lib/guides";
import { getService } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";
import { BUSINESS } from "@/lib/site";
import { abs, pageMetadata } from "@/lib/seo";
import { ID, pageGraph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return pageMetadata({
    path: `/guides/${g.slug}`,
    title: g.seoTitle ?? g.title,
    description: g.description,
    type: "article",
    // Drafts are reachable for review but must not be indexed.
    noindex: g.draft,
  });
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (typeof b === "string") return <p key={i}>{b}</p>;
        if ("list" in b)
          return (
            <ul key={i}>
              {b.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          );
        return (
          <ol key={i} className="guide-steps border-t border-ink/10 my-6">
            {b.steps.map((s, n) => (
              <li key={s.title} className="flex gap-5 py-5 border-b border-ink/10">
                <span aria-hidden="true" className="numeral text-ink/55 text-2xl w-8 flex-none">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="heading-md text-lg text-ink leading-snug">{s.title}</h3>
                  <p className="mt-2 text-ink/80 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        );
      })}
    </>
  );
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const path = `/guides/${g.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: g.title, path },
  ];
  const services = g.services.map((s) => getService(s)!).filter(Boolean);
  const work = CASE_STUDIES.filter((c) => g.work.includes(c.slug));

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: g.title,
          description: g.description,
          crumbs,
          main: {
            "@type": "Article",
            "@id": `${abs(path)}#article`,
            headline: g.title,
            description: g.description,
            datePublished: g.published,
            dateModified: g.updated,
            author: { "@id": ID.founder },
            publisher: { "@id": ID.studio },
            articleSection: g.category,
            inLanguage: "en-IN",
            mainEntityOfPage: `${abs(path)}#webpage`,
            citation: g.sources.map((s) => s.url),
          },
        })}
      />
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <article>
          <header className="relative pt-28 md:pt-36 pb-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-32 top-24 w-[38rem] h-[38rem] rounded-full aura-accent"
            />
            <div className="container-px max-w-[860px] mx-auto relative">
              <Breadcrumbs crumbs={crumbs} />
              {g.draft && (
                <p className="mb-6 rounded-xl bg-accent/30 ring-1 ring-accent px-4 py-3 text-sm text-ink">
                  Draft for review — not indexed and not linked from the site.
                </p>
              )}
              <p className="eyebrow text-ink/70">Guide · {g.category}</p>
              <h1 className="mt-4 display text-ink text-[9vw] md:text-5xl lg:text-[3.4rem] leading-[1.0] text-balance">
                {g.title}
              </h1>
              <p className="mt-6 text-ink/75 leading-relaxed text-lg">{g.summary}</p>
              <div className="mt-8 flex items-center gap-4">
                <Image
                  src={BUSINESS.founder.image}
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover bw-photo"
                />
                <div className="text-sm leading-snug">
                  <p>
                    By{" "}
                    <Link href="/about#founder" rel="author" className="font-medium text-ink underline decoration-accent underline-offset-4">
                      {BUSINESS.founder.name}
                    </Link>
                    , founder of Fennr Studio
                  </p>
                  <p className="text-slatey">
                    Published <time dateTime={g.published}>{fmt(g.published)}</time>
                    {g.updated !== g.published && (
                      <>
                        {" "}· Updated <time dateTime={g.updated}>{fmt(g.updated)}</time>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="container-px max-w-[860px] mx-auto pb-16">
            <div className="legal-prose text-ink/80 leading-relaxed text-[1.05rem]">
              {g.sections.map((s) => (
                <section key={s.heading}>
                  <h2>{s.heading}</h2>
                  <Blocks blocks={s.blocks} />
                </section>
              ))}
              <section>
                <h2>Sources</h2>
                <ul>
                  {g.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </article>

        {services.length > 0 && (
          <section className="relative pb-16">
            <div className="container-px max-w-[1400px] mx-auto">
              <h2 className="display text-3xl md:text-4xl text-ink mb-8">Related services</h2>
              <LinkCards
                cols={services.length === 2 ? 2 : 3}
                items={services.map((s) => ({
                  href: `/services/${s.slug}`,
                  eyebrow: "Service",
                  title: s.name,
                  body: s.cardBody,
                }))}
              />
            </div>
          </section>
        )}

        {work.length > 0 && (
          <section className="relative pb-20">
            <div className="container-px max-w-[1400px] mx-auto">
              <h2 className="display text-3xl md:text-4xl text-ink mb-8">Related work</h2>
              <CaseCards studies={work} />
            </div>
          </section>
        )}

        <CtaBand
          title="Want us to do this for you?"
          body={<p>The first strategy call is free, and you'll leave with a plan either way.</p>}
        />
      </main>
      <Footer />
    </>
  );
}
