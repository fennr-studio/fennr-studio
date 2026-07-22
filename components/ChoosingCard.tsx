"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type Tier = {
  key: string;
  no: string;
  label: string;
  name: string;
  tagline: string;
  carry: string | null;
  items: string[];
  swatch: string;
  image: string;
};

const TIERS: Tier[] = [
  {
    key: "launch",
    no: "№1",
    label: "Launch",
    name: "Launch",
    tagline: "Get online, look sharp, and start taking orders.",
    carry: null,
    items: [
      "5-page website",
      "Logo & core identity",
      "Basic on-page SEO",
      "WhatsApp click-to-chat",
      "Payment link setup",
    ],
    swatch: "bg-accent",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=240&auto=format&fit=crop",
  },
  {
    key: "grow",
    no: "№2",
    label: "Grow",
    name: "Grow",
    tagline: "Build the brand and get found across your city.",
    carry: "Everything in Launch, plus",
    items: [
      "Full brand kit",
      "Product & office photoshoot",
      "Social media design templates",
      "Google Business Profile + local SEO",
    ],
    swatch: "bg-[#5C84B0]",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=240&auto=format&fit=crop",
  },
  {
    key: "scale",
    no: "№3",
    label: "Scale",
    name: "Scale",
    tagline: "Automate operations and compound the growth.",
    carry: "Everything in Grow, plus",
    items: [
      "Custom web app & API integrations",
      "WhatsApp Business API automation — catalog, orders, notifications",
      "Monthly SEO + content retainer",
    ],
    swatch: "bg-[#D7A1A1]",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=240&auto=format&fit=crop",
  },
];

export default function ChoosingCard() {
  const [active, setActive] = useState(0);
  const item = TIERS[active];

  const goToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="relative bg-mist pt-12 md:pt-16 pb-24 md:pb-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-paper rounded-3xl shadow-elevated ring-1 ring-hairline px-6 py-10 md:px-12 md:py-12"
        >
          <span className="absolute -top-3 -right-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-ink text-accent display-tight text-[10px] tracking-[0.18em]">
            NEW!
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <span className="numeral text-accent text-3xl leading-none">*</span>

              <h2 className="mt-4 heading-italic text-3xl md:text-4xl lg:text-[2.6rem] text-ink leading-[1.05] text-balance">
                Choosing us — choosing the{" "}
                <span className="display not-italic">right</span> kind of partner.
              </h2>

              <p className="mt-6 max-w-2xl text-ink/75 leading-relaxed">
                Three productized packages, built to meet you where you are —
                from your first website to a fully automated, always-on brand.
                Pick a tier, or let us prescribe one after the first call.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {TIERS.map((p, i) => (
                  <button
                    key={p.key}
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className={`group relative flex items-center gap-3 rounded-md p-1.5 pr-4 transition-smooth ring-1 ${
                      i === active
                        ? "ring-ink bg-mist"
                        : "ring-hairline hover:ring-ink"
                    }`}
                  >
                    <span className="relative w-12 h-12 rounded-md overflow-hidden ring-1 ring-hairline">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt=""
                        className="w-full h-full object-cover bw-photo"
                      />
                      <span
                        className={`absolute inset-0 mix-blend-multiply opacity-70 ${p.swatch}`}
                      />
                    </span>
                    <span className="display-tight text-xs tracking-[0.05em] text-ink">
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl bg-mist ring-1 ring-hairline p-6 md:p-7"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display-tight text-xl text-ink tracking-[0.04em]">
                      {item.name}
                    </h3>
                    <span className="numeral text-accent text-2xl leading-none">
                      {item.no}
                    </span>
                  </div>

                  <p className="mt-2 text-ink/75 leading-relaxed text-sm">
                    {item.tagline}
                  </p>

                  {item.carry && (
                    <p className="mt-5 display-tight text-xs tracking-[0.05em] text-ink">
                      {item.carry}
                    </p>
                  )}

                  <ul className={`space-y-2.5 text-sm text-ink/85 ${item.carry ? "mt-3" : "mt-5"}`}>
                    {item.items.map((d) => (
                      <li key={d} className="flex items-start gap-2.5">
                        <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent flex-none" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={goToContact}
                    className="mt-7 inline-flex items-center gap-1.5 underline-accent display-tight text-sm tracking-[0.05em]"
                  >
                    Fixed scope · pricing on request
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-10 md:mt-12 rounded-2xl bg-accent/25 px-6 py-6 md:px-8 md:py-7 ring-1 ring-accent/50">
            <div className="flex flex-wrap items-center gap-3">
              <span className="display-tight text-lg md:text-xl text-ink tracking-[0.04em]">
                Strategy &amp; Planning
              </span>
              <span className="inline-flex items-center rounded-full bg-ink text-accent display-tight text-[11px] tracking-[0.2em] px-3 py-1">
                FREE
              </span>
            </div>
            <p className="mt-3 max-w-3xl text-ink/80 leading-relaxed">
              We start by understanding your vision and business goals. Through
              in-depth research and strategic planning, we define the core
              structure and key elements needed for your project —{" "}
              <span className="font-semibold text-ink">completely free of cost.</span>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-ink/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              <p className="lg:col-span-3 eyebrow text-accent">How an engagement runs</p>
              <p className="lg:col-span-9 max-w-2xl text-ink/75 leading-relaxed">
                Every engagement opens with that free Strategy &amp; Planning
                phase — no deck, no obligation. From there we agree on the tier
                that fits, lock a fixed scope, and ship in focused weekly
                sprints. You always know what&rsquo;s next, and everything we
                build is yours to keep.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
