"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fennr's flag mark, at eyebrow size. */
function FlagMark() {
  return (
    <svg
      viewBox="0 0 20 16"
      aria-hidden="true"
      className="h-3 w-4 flex-none text-accent"
      fill="currentColor"
    >
      <path d="M0 0h20l-4.5 4.4L20 8.8H0z" />
      <rect x="0" y="0" width="1.7" height="16" rx="0.85" />
    </svg>
  );
}

/**
 * The collage of live-site screenshots. `a` is the desktop landing view, `b`
 * the same site on a phone, `c`/`d` two sections further down the page.
 */
function Shots({ study }: { study: CaseStudy }) {
  const base = `/img/case-${study.slug}`;
  const frame =
    "relative overflow-hidden rounded-lg md:rounded-xl bg-black/10 ring-1 ring-black/5";

  return (
    <div
      className="rounded-[18px] p-2.5 md:rounded-[26px] md:p-4"
      style={{ backgroundColor: study.accent }}
    >
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        <div className={`col-span-2 aspect-[16/10] ${frame}`}>
          <Image
            src={`${base}-a.jpg`}
            alt={`${study.client} — home page`}
            fill
            sizes="(max-width: 1024px) 60vw, 460px"
            className="object-cover object-top"
            draggable={false}
          />
        </div>

        <div className={`row-span-2 ${frame}`}>
          <Image
            src={`${base}-b.jpg`}
            alt={`${study.client} — on a phone`}
            fill
            sizes="(max-width: 1024px) 30vw, 230px"
            className="object-cover object-top"
            draggable={false}
          />
        </div>

        <div className={`aspect-[16/10] ${frame}`}>
          <Image
            src={`${base}-c.jpg`}
            alt={`${study.client} — page section`}
            fill
            sizes="(max-width: 1024px) 30vw, 230px"
            className="object-cover object-top"
            draggable={false}
          />
        </div>

        <div className={`aspect-[16/10] ${frame}`}>
          <Image
            src={`${base}-d.jpg`}
            alt={`${study.client} — page section`}
            fill
            sizes="(max-width: 1024px) 30vw, 230px"
            className="object-cover object-top"
            draggable={false}
          />
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg bg-ink px-4 py-3 md:mt-3 md:gap-x-4 md:rounded-xl md:px-6 md:py-4">
        {study.deliverables.map((item, i) => (
          <span key={item} className="flex items-center gap-x-3 md:gap-x-4">
            {i > 0 && (
              <span aria-hidden="true" className="text-accent/80 text-[0.6rem]">
                &#10022;
              </span>
            )}
            <span className="mono-label text-[0.62rem] text-mist/90 md:text-[0.7rem]">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Left-rail card: a client quote where we have one, our brief where we don't. */
function Aside({ study }: { study: CaseStudy }) {
  const { aside } = study;

  return (
    <div className="rounded-xl bg-paper p-6 ring-1 ring-hairline shadow-soft md:p-8">
      {aside.kind === "quote" ? (
        <>
          <span
            aria-hidden="true"
            className="block font-numeral text-4xl leading-none text-ink/25"
          >
            &ldquo;
          </span>
          <blockquote className="mt-3 text-[1.02rem] leading-[1.62] text-ink/85">
            {aside.text}
          </blockquote>
          <div className="mt-7 flex items-center gap-4">
            <Image
              src={aside.avatar}
              alt=""
              width={52}
              height={52}
              className="h-[52px] w-[52px] flex-none rounded-full object-cover"
            />
            <div>
              <p className="heading-md text-[1.05rem] text-ink">{aside.name}</p>
              <p className="mono-label mt-1 text-ink/45">{aside.role}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="mono-label flex items-center gap-2 text-ink/45">
            <FlagMark />
            The brief
          </p>
          <p className="mt-4 text-[1.02rem] leading-[1.62] text-ink/85">
            {aside.text}
          </p>
          <a
            href={study.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-7 flex items-center gap-2 border-t border-hairline pt-5 mono-label text-ink/60 transition-colors hover:text-ink"
          >
            See it live
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
        </>
      )}
    </div>
  );
}

function Row({ study }: { study: CaseStudy }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease }}
      className="group grid lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]"
    >
      {/* Left rail — sticks alongside the case study as it scrolls past. */}
      <div className="order-2 pb-14 lg:order-1 lg:flex lg:justify-end lg:py-16 lg:pr-10 xl:pr-14">
        <div className="w-full lg:max-w-[24rem] lg:sticky lg:top-28 lg:self-start">
          <Aside study={study} />
        </div>
      </div>

      <div className="order-1 border-hairline py-12 lg:order-2 lg:border-l lg:border-t lg:py-16 lg:pl-10 xl:pl-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(13rem,19rem)] lg:gap-10 xl:gap-14">
          {/* Title block — first on mobile, top of the right column on desktop. */}
          <div className="lg:col-start-2 lg:row-start-1">
            <p className="mono-label text-ink/45">{study.client}</p>
            <h3 className="mt-4 heading-md text-[1.75rem] leading-[1.08] text-ink sm:text-[2.1rem] xl:text-[2.5rem]">
              <a
                href={study.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink/70"
              >
                {study.title}
              </a>
            </h3>
          </div>

          <div className="mt-7 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0">
            <a
              href={study.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the live ${study.client} site`}
              className="block transition-transform duration-500 ease-out will-change-transform hover:-translate-y-1"
            >
              <Shots study={study} />
            </a>
          </div>

          <div className="mt-7 flex flex-col items-start gap-2.5 lg:col-start-2 lg:row-start-2 lg:mt-0 lg:self-end">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="mono-label rounded-md bg-ink/[0.055] px-4 py-3 text-ink/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="work"
      aria-label="Our projects"
      className="relative overflow-hidden bg-mist"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-[34rem] w-[34rem] rounded-full aura-accent opacity-60"
      />

      <div className="relative container-px mx-auto max-w-[1500px]">
        {/* Section head — same two-column rhythm as the rows below it. */}
        <div className="grid lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]">
          <div className="pt-20 lg:flex lg:justify-end lg:pr-10 lg:pt-28 xl:pr-14">
            <p className="mono-label flex items-center gap-2 text-ink/55">
              <FlagMark />
              Our projects
            </p>
          </div>

          <div className="border-hairline pb-14 pt-6 lg:border-l lg:pb-20 lg:pl-10 lg:pt-28 xl:pl-14">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="heading-md font-black tracking-[-0.03em] text-[10vw] leading-[0.96] text-ink sm:text-[3.4rem] lg:text-[4.4rem]"
            >
              Real <span className="text-accent">products.</span>
              <br />
              Built in <span className="text-accent">sprints.</span>
              <br />
              Actually <span className="text-accent">shipped.</span>
            </motion.h2>
          </div>
        </div>

        {CASE_STUDIES.map((study) => (
          <Row key={study.slug} study={study} />
        ))}

        {/* Closing invite, on the same grid so the rule keeps running. */}
        <div className="grid lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]">
          <div aria-hidden="true" className="hidden lg:block" />
          <div className="border-hairline py-12 lg:border-l lg:border-t lg:py-16 lg:pl-10 xl:pl-14">
            <Link
              href="/brief"
              className="group/cta relative flex flex-col justify-between gap-10 overflow-hidden rounded-2xl bg-ink p-8 text-mist transition-transform duration-500 hover:-translate-y-1 md:flex-row md:items-end md:p-12"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-2xl"
              />
              <div>
                <p className="mono-label text-accent">Your project</p>
                <h3 className="mt-4 display text-3xl leading-[1.02] md:text-5xl">
                  You could be{" "}
                  <span className="heading-italic normal-case text-accent">
                    next.
                  </span>
                </h3>
              </div>
              <span className="inline-flex flex-none items-center gap-2 mono-label text-accent">
                Start a project
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                  strokeWidth={2}
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
