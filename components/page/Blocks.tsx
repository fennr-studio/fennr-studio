/**
 * Building blocks for the content pages (services, industries, work, Pune,
 * about, contact).
 *
 * All Server Components, no framer-motion: these pages exist to be read by
 * people arriving from search and by crawlers, so every word is in the HTML
 * on first byte and the pages ship almost no JavaScript. Visual language is
 * the same as the homepage — same tokens, type classes and cards.
 */
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BUSINESS } from "@/lib/site";
import { jsonLdString } from "@/lib/schema";
import type { CaseStudy } from "@/lib/case-studies";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
    />
  );
}

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 display-tight text-[11px] tracking-[0.08em] text-slatey">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.name.toUpperCase()}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="hover:text-ink transition-smooth">
                    {c.name.toUpperCase()}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-28 md:pt-36 pb-14 md:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 w-[38rem] h-[38rem] rounded-full aura-accent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 -top-24 w-[42rem] h-[42rem] rounded-full aura-accent opacity-70"
      />
      <div className="container-px max-w-[1400px] mx-auto relative">
        <Breadcrumbs crumbs={crumbs} />
        <div className="flex items-center gap-3 mb-7">
          <span className="inline-flex w-2 h-2 rounded-full bg-accent" />
          <p className="eyebrow text-ink">{eyebrow}</p>
        </div>
        <h1 className="display text-ink text-[10.5vw] md:text-[6.4vw] lg:text-[4.8rem] leading-[0.98] max-w-5xl text-balance">
          {title}
        </h1>
        <div className="mt-7 max-w-2xl text-ink/75 leading-relaxed text-base md:text-lg space-y-4">
          {intro}
        </div>
        {children}
      </div>
    </section>
  );
}

export function PrimaryCtas({
  primary = { href: "/brief", label: "Start a project" },
  showPreview = true,
}: {
  primary?: { href: string; label: string };
  showPreview?: boolean;
}) {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
      <Link href={primary.href} className="btn-ink">
        {primary.label}
        <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
      </Link>
      {showPreview && (
        <Link
          href="/free-preview"
          className="inline-flex items-center gap-1.5 underline-accent !text-ink display-tight text-sm tracking-[0.05em]"
        >
          Get a free website preview
        </Link>
      )}
      <a
        href={BUSINESS.calendly}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 display-tight text-sm tracking-[0.05em] text-slatey hover:text-ink transition-smooth"
      >
        Book a free call
      </a>
    </div>
  );
}

export function Section({
  eyebrow,
  title,
  intro,
  children,
  id,
  aside = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Heading in a sticky left column, content on the right. */
  aside?: boolean;
}) {
  const heading = (
    <>
      {eyebrow && <p className="eyebrow text-ink/60">{eyebrow}</p>}
      <h2 className="mt-4 display text-3xl md:text-5xl lg:text-[3.2rem] text-ink leading-[0.98] text-balance">
        {title}
      </h2>
      {intro && (
        <div className="mt-6 max-w-2xl text-ink/75 leading-relaxed space-y-4">{intro}</div>
      )}
    </>
  );
  return (
    <section id={id} className="relative pb-20 md:pb-28 scroll-mt-24">
      <div className="container-px max-w-[1400px] mx-auto">
        {aside ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">{heading}</div>
            <div className="lg:col-span-7">{children}</div>
          </div>
        ) : (
          <>
            <div className="mb-10 md:mb-12 max-w-3xl">{heading}</div>
            {children}
          </>
        )}
      </div>
    </section>
  );
}

/** Numbered rows — deliverables, process steps, feature lists. */
export function NumberedList({
  items,
}: {
  items: (string | { title: string; body: string })[];
}) {
  return (
    <ol className="border-t border-ink/10">
      {items.map((item, i) => {
        const t = typeof item === "string" ? { title: item, body: "" } : item;
        return (
          <li key={t.title} className="flex items-baseline gap-6 py-5 border-b border-ink/10">
            <span aria-hidden="true" className="numeral text-ink/40 text-2xl w-10 flex-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="heading-md text-base md:text-lg text-ink leading-snug">{t.title}</h3>
              {t.body && <p className="mt-2 text-ink/75 leading-relaxed">{t.body}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Problem → answer pairs. */
export function ProblemList({ items }: { items: { problem: string; answer: string }[] }) {
  return (
    <div className="rounded-3xl overflow-hidden ring-1 ring-hairline shadow-soft">
      {items.map((p) => (
        <div
          key={p.problem}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 bg-paper p-6 md:p-8 border-b border-hairline last:border-b-0"
        >
          <h3 className="md:col-span-5 heading-italic text-lg md:text-xl text-ink leading-snug">
            {p.problem}
          </h3>
          <p className="md:col-span-7 text-ink/75 leading-relaxed">{p.answer}</p>
        </div>
      ))}
    </div>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full bg-paper ring-1 ring-hairline px-4 py-2 text-sm text-ink/85"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export type LinkCard = { href: string; title: string; body: string; eyebrow?: string };

export function LinkCards({ items, cols = 3 }: { items: LinkCard[]; cols?: 2 | 3 }) {
  return (
    <ul
      className={`grid grid-cols-1 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-px bg-hairline rounded-3xl overflow-hidden ring-1 ring-hairline shadow-soft`}
    >
      {items.map((c) => (
        <li key={c.href} className="bg-paper">
          <Link
            href={c.href}
            className="group h-full p-7 md:p-8 flex flex-col hover:bg-mist transition-smooth"
          >
            {c.eyebrow && <span className="eyebrow text-ink/55">{c.eyebrow}</span>}
            <h3 className="mt-2 display-tight text-xl text-ink tracking-[0.02em] leading-tight group-hover:underline decoration-accent decoration-2 underline-offset-4">
              {c.title}
            </h3>
            <p className="mt-3 text-sm text-ink/75 leading-relaxed">{c.body}</p>
            <span className="mt-auto pt-6 inline-flex items-center gap-1.5 display-tight text-[12px] tracking-[0.06em] text-ink">
              Read more
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CaseCards({ studies }: { studies: CaseStudy[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {studies.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/work/${s.path}`}
            className="group block rounded-3xl bg-paper ring-1 ring-hairline overflow-hidden shadow-soft hover:ring-ink transition-smooth"
          >
            <div className="relative aspect-[16/10] overflow-hidden" style={{ background: s.accent }}>
              <Image
                src={`/img/case-${s.slug}-a.jpg`}
                alt={`${s.client} website — home page`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <p className="eyebrow text-ink/55">
                {s.location ? `${s.industry} · ${s.location}` : s.industry}
              </p>
              <h3 className="mt-2 heading-md text-lg text-ink leading-snug">{s.client}</h3>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">{s.summary}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Native <details>: accessible, works without JS, content is in the HTML. */
export function Faqs({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-ink/15">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-ink/15">
          <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h3 className="heading-md text-base md:text-lg text-ink leading-snug">{f.q}</h3>
            <span
              aria-hidden="true"
              className="flex-none w-8 h-8 inline-flex items-center justify-center rounded-full ring-1 ring-hairline text-ink group-open:rotate-45 transition-transform"
            >
              <Plus className="w-4 h-4" strokeWidth={1.8} />
            </span>
          </summary>
          <p className="pb-6 pr-10 text-ink/75 leading-relaxed max-w-3xl">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title,
  body,
  primary = { href: "/brief", label: "Start a project" },
}: {
  title: ReactNode;
  body: ReactNode;
  primary?: { href: string; label: string };
}) {
  return (
    <section className="relative pb-24 md:pb-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="rounded-3xl bg-ink text-mist px-6 py-12 md:px-14 md:py-16">
          <span aria-hidden="true" className="numeral text-accent text-4xl leading-none">
            *
          </span>
          <h2 className="mt-4 display text-3xl md:text-5xl leading-[0.98] max-w-3xl text-balance">
            {title}
          </h2>
          <div className="mt-6 max-w-2xl text-mist/80 leading-relaxed">{body}</div>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href={primary.href} className="btn-accent">
              {primary.label}
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
            </Link>
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline-accent display-tight text-sm tracking-[0.05em] text-mist"
            >
              Message us on WhatsApp
            </a>
            <a
              href={BUSINESS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 display-tight text-sm tracking-[0.05em] text-mist/70 hover:text-mist transition-smooth"
            >
              Book a free call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="legal-prose text-ink/80 leading-relaxed max-w-3xl">{children}</div>;
}
