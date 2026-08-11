"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PERSONAS } from "@/lib/personas";

const HELP_WITH = [
  "Websites and landing pages that convert clearly",
  "MVPs and products users can understand and adopt",
  "UX and onboarding that improve activation and retention",
  "Messaging, funnels, and GTM systems that drive growth",
  "Product systems, performance, and scalability foundations",
];

export default function WhoWeHelp() {
  return (
    <main className="relative bg-mist overflow-hidden">
      {/* ---------- Hero ---------- */}
      <section className="relative pt-28 md:pt-36 pb-14 md:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-24 w-[38rem] h-[38rem] rounded-full aura-accent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 -top-24 w-[42rem] h-[42rem] rounded-full aura-accent opacity-70"
        />

        <div className="container-px max-w-[1400px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="inline-flex w-2 h-2 rounded-full bg-accent" />
            <span className="eyebrow text-ink">Who we help</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="display text-ink text-[12vw] md:text-[8vw] lg:text-[5.6rem] leading-[0.95] max-w-5xl"
          >
            <span className="block">Who we work with</span>
            <span className="block heading-italic text-accent normal-case">
              and how we help.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-3xl text-ink/75 leading-relaxed text-base md:text-lg"
          >
            We partner with founders, product teams, and growth teams to build,
            launch, and improve websites, products, and conversion systems
            through focused sprints.
          </motion.p>
        </div>
      </section>

      {/* ---------- Audience cards ---------- */}
      <section id="audiences" className="relative pb-20 md:pb-28 scroll-mt-24">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline rounded-3xl overflow-hidden ring-1 ring-hairline shadow-soft">
            {PERSONAS.map((a, i) => (
              <motion.article
                key={a.slug}
                id={a.slug}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.05,
                }}
                className="group relative bg-paper p-7 md:p-9 flex flex-col hover:bg-mist transition-smooth scroll-mt-28"
              >
                <span className="numeral text-accent text-3xl leading-none">
                  №{String(i + 1).padStart(2, "0")}
                </span>

                <h2 className="mt-5 heading-md text-xl md:text-2xl text-ink leading-snug">
                  <Link
                    href={`/who-we-help/${a.slug}`}
                    className="group-hover:text-accent transition-smooth"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    {a.name}
                  </Link>
                </h2>

                <p className="mt-3 text-sm text-slatey leading-relaxed">
                  {a.who}
                </p>

                <span className="mt-auto pt-8 inline-flex items-center gap-2 display-tight text-[13px] tracking-[0.06em] text-ink group-hover:text-accent transition-smooth">
                  {a.cardCta}
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
                </span>
              </motion.article>
            ))}

            <div className="bg-paper p-7 md:p-9 flex flex-col justify-center">
              <p className="heading-italic text-xl text-ink leading-snug">
                Not sure where you fit?
              </p>
              <p className="mt-3 text-sm text-ink/75 leading-relaxed">
                Tell us what you&rsquo;re trying to build, fix, or improve —
                we&rsquo;ll guide you to the right sprint.
              </p>
              <Link
                href="/brief"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink text-accent px-5 py-2.5 display-tight text-[12px] tracking-[0.06em] hover:bg-accent hover:text-ink transition-smooth self-start"
              >
                Schedule a call
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- What we help with ---------- */}
      <section className="relative pb-24 md:pb-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 w-[36rem] h-[36rem] rounded-full aura-accent opacity-70"
        />

        <div className="container-px max-w-[1400px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="eyebrow text-accent">What we help with</p>
              <h2 className="mt-4 display text-4xl md:text-5xl lg:text-[3.8rem] text-ink leading-[0.98]">
                <span className="block">Across teams,</span>
                <span className="block">we help improve</span>
                <span className="block heading-italic text-accent normal-case">
                  what matters.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-ink/75 leading-relaxed">
                We focus on the core parts of your website, product, and growth
                that drive clarity, conversion, and scale.
              </p>
            </div>

            <div className="lg:col-span-7">
              <p className="eyebrow text-slatey mb-6">We help you in</p>
              <ul className="border-t border-ink/10">
                {HELP_WITH.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: i * 0.04,
                    }}
                    className="flex items-baseline gap-6 py-6 border-b border-ink/10"
                  >
                    <span className="numeral text-accent text-2xl w-10 flex-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="heading-md text-lg md:text-xl text-ink leading-snug">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
