"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PERSONAS, type Persona } from "@/lib/personas";

const CALENDLY_URL = "https://calendly.com/fennrstudio/15min";

const TIERS = [
  {
    key: "launch",
    no: "№1",
    label: "Launch",
    line: "Get live, look sharp, start taking orders.",
    body: "A fixed-scope build — website, core identity, and the WhatsApp and payment layer that makes it usable from day one.",
    price: "Fixed scope · pricing on request",
  },
  {
    key: "grow",
    no: "№2",
    label: "Grow",
    line: "Build the brand and get found.",
    body: "Everything in Launch, plus the full brand kit, photography, social templates and local SEO.",
    price: "Custom pricing",
  },
  {
    key: "scale",
    no: "№3",
    label: "Scale",
    line: "Automate operations and compound the growth.",
    body: "Custom apps and API integrations, WhatsApp automation, and a monthly SEO and content retainer.",
    price: "Custom pricing",
  },
];

function FaqItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: { q: string; a: string };
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-ink/15 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="flex items-center gap-6">
          <span className="numeral text-accent text-2xl w-10 flex-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="heading-md text-base md:text-lg text-ink leading-snug group-hover:text-accent transition-smooth">
            {item.q}
          </span>
        </span>
        <span className="flex-none w-8 h-8 inline-flex items-center justify-center rounded-full ring-1 ring-hairline text-ink group-hover:bg-ink group-hover:text-accent transition-smooth">
          {open ? (
            <Minus className="w-4 h-4" strokeWidth={1.8} />
          ) : (
            <Plus className="w-4 h-4" strokeWidth={1.8} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-16 pr-10 text-ink/75 leading-relaxed max-w-2xl">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PersonaPage({ persona }: { persona: Persona }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const others = PERSONAS.filter((p) => p.slug !== persona.slug);

  return (
    <main className="relative bg-mist overflow-hidden">
      {/* ---------- Hero ---------- */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-24 w-[38rem] h-[38rem] rounded-full aura-accent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 -top-24 w-[42rem] h-[42rem] rounded-full aura-accent opacity-70"
        />

        <div className="container-px max-w-[1400px] mx-auto relative">
          <motion.nav
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 mb-8 display-tight text-[11px] tracking-[0.08em] text-slatey"
          >
            <Link href="/who-we-help" className="hover:text-accent transition-smooth">
              WHO WE HELP
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{persona.name.toUpperCase()}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="inline-flex w-2 h-2 rounded-full bg-accent" />
            <span className="eyebrow text-ink">{persona.name}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display text-ink text-[11vw] md:text-[7vw] lg:text-[5rem] leading-[0.98] max-w-5xl"
          >
            {persona.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-2xl text-ink/75 leading-relaxed text-base md:text-lg"
          >
            {persona.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link href="/brief" className="btn-ink">
              {persona.cardCta}
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
            </Link>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline-accent display-tight text-sm tracking-[0.05em]"
            >
              Schedule a call
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ---------- Where they get stuck ---------- */}
      <section className="relative pb-20 md:pb-28">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow text-accent">The usual friction</p>
            <h2 className="mt-4 display text-4xl md:text-5xl lg:text-[3.8rem] text-ink leading-[0.98]">
              Where {persona.noun} usually get stuck{" "}
              <span className="heading-italic text-accent normal-case">
                and how we help.
              </span>
            </h2>
          </div>

          <div className="rounded-3xl overflow-hidden ring-1 ring-hairline shadow-soft">
            {persona.pairs.map((pair, i) => (
              <motion.div
                key={pair.problem}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.04,
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 bg-paper p-6 md:p-8 border-b border-hairline last:border-b-0"
              >
                <div className="md:col-span-5 flex items-start gap-4">
                  <span className="numeral text-accent text-2xl leading-none flex-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="heading-italic text-lg md:text-xl text-ink leading-snug">
                    &ldquo;{pair.problem}&rdquo;
                  </p>
                </div>

                <div className="md:col-span-1 hidden md:flex items-center justify-center">
                  <ArrowRight
                    className="w-5 h-5 text-accent"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <p className="md:col-span-6 text-ink/75 leading-relaxed">
                  {pair.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What we help with ---------- */}
      <section className="relative pb-20 md:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 w-[36rem] h-[36rem] rounded-full aura-accent opacity-70"
        />

        <div className="container-px max-w-[1400px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <p className="eyebrow text-accent">What we help with</p>
              <h2 className="mt-4 display text-4xl md:text-5xl lg:text-[3.4rem] text-ink leading-[0.98]">
                {persona.helpTitle}
              </h2>
              <p className="mt-6 max-w-md text-ink/75 leading-relaxed">
                {persona.helpSub}
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="border-t border-ink/10">
                {persona.helpItems.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: i * 0.035,
                    }}
                    className="flex items-baseline gap-6 py-5 border-b border-ink/10"
                  >
                    <span className="numeral text-accent text-2xl w-10 flex-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="heading-md text-base md:text-lg text-ink leading-snug">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- How they work with us ---------- */}
      <section className="relative pb-20 md:pb-28">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow text-accent">Ways to work together</p>
            <h2 className="mt-4 display text-4xl md:text-5xl lg:text-[3.8rem] text-ink leading-[0.98]">
              How {persona.noun} typically{" "}
              <span className="heading-italic text-accent normal-case">
                work with us.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline rounded-3xl overflow-hidden ring-1 ring-hairline shadow-soft">
            {TIERS.map((t, i) => (
              <motion.div
                key={t.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.05,
                }}
                className="group bg-paper p-7 md:p-9 flex flex-col hover:bg-mist transition-smooth"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="display-tight text-xl text-ink tracking-[0.04em]">
                    {t.label}
                  </h3>
                  <span className="numeral text-accent text-2xl leading-none">
                    {t.no}
                  </span>
                </div>

                <p className="mt-3 heading-italic text-base text-ink/90 leading-snug">
                  {t.line}
                </p>
                <p className="mt-4 text-sm text-ink/75 leading-relaxed">
                  {t.body}
                </p>

                <p className="mt-6 display-tight text-xs tracking-[0.05em] text-ink">
                  {t.price}
                </p>

                <Link
                  href="/brief"
                  className="mt-auto pt-7 inline-flex items-center gap-2 display-tight text-[13px] tracking-[0.06em] text-ink group-hover:text-accent transition-smooth"
                >
                  Get started
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-sm text-slatey max-w-2xl">
            Every engagement opens with a free Strategy &amp; Planning call — no
            deck, no obligation.
          </p>
        </div>
      </section>

      {/* ---------- Different pressure ---------- */}
      <section className="relative pb-20 md:pb-28">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="rounded-3xl bg-paper ring-1 ring-hairline shadow-soft px-6 py-10 md:px-12 md:py-12">
            <p className="eyebrow text-accent">Not your situation?</p>
            <h2 className="mt-4 heading-italic text-3xl md:text-4xl text-ink leading-[1.05] text-balance">
              Operating under a different{" "}
              <span className="display not-italic">pressure?</span>
            </h2>

            <ul className="mt-9 border-t border-ink/10">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-ink/10">
                  <Link
                    href={`/who-we-help/${o.slug}`}
                    className="group flex items-center justify-between gap-6 py-5"
                  >
                    <span className="heading-md text-base md:text-lg text-ink leading-snug group-hover:text-accent transition-smooth">
                      {o.question}
                    </span>
                    <span className="flex-none w-9 h-9 inline-flex items-center justify-center rounded-full bg-ink text-accent group-hover:bg-accent group-hover:text-ink transition-smooth">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/who-we-help"
              className="mt-8 inline-flex items-center gap-1.5 underline-accent display-tight text-sm tracking-[0.05em]"
            >
              View all personas
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="relative pb-20 md:pb-28">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="eyebrow text-accent">Questions</p>
              <h2 className="mt-4 display text-4xl md:text-5xl lg:text-[3.4rem] text-ink leading-[0.98]">
                <span className="block">Frequently</span>
                <span className="block heading-italic text-accent normal-case">
                  asked questions.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-8">
              {persona.faqs.map((f, i) => (
                <FaqItem
                  key={f.q}
                  item={f}
                  index={i}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Closing note ---------- */}
      <section className="relative pb-20 md:pb-28">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="rounded-3xl bg-accent/25 ring-1 ring-accent/50 px-6 py-10 md:px-12 md:py-14">
            <span className="numeral text-ink text-3xl leading-none">*</span>
            <h2 className="mt-4 heading-italic text-3xl md:text-4xl lg:text-[2.6rem] text-ink leading-[1.05] text-balance max-w-3xl">
              {persona.closing.title}
            </h2>
            <p className="mt-5 max-w-2xl text-ink/80 leading-relaxed">
              {persona.closing.body}
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 btn-ink"
            >
              Book a meeting
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="relative pb-24 md:pb-32">
        <div className="container-px max-w-[1400px] mx-auto text-center">
          <h2 className="display text-4xl md:text-6xl lg:text-[4.6rem] text-ink leading-[0.98] max-w-4xl mx-auto">
            {persona.finalTitle}
          </h2>
          <Link href="/brief" className="mt-9 btn-accent">
            {persona.finalCta}
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
          </Link>
        </div>
      </section>
    </main>
  );
}
