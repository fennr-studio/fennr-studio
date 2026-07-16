"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const PAGES = [
  [
    {
      eyebrow: "For founders",
      name: "Strategy on a Page",
      tag: "A4-1",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=800&q=80",
    },
    {
      eyebrow: "For boards",
      name: "Operating Cadence",
      tag: "A4-2",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&h=800&q=80",
    },
    {
      eyebrow: "For builders",
      name: "Growth Playbook",
      tag: "A4-3",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=800&q=80",
    },
  ],
  [
    {
      eyebrow: "For revenue",
      name: "Pricing Reset",
      tag: "A4-4",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&h=800&q=80",
    },
    {
      eyebrow: "For product",
      name: "Roadmap Surgery",
      tag: "A4-5",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=800&q=80",
    },
    {
      eyebrow: "For ops",
      name: "Org Re-shape",
      tag: "A4-6",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&h=800&q=80",
    },
  ],
];

export default function Catalogue() {
  const [page, setPage] = useState(0);
  const items = PAGES[page];

  return (
    <section id="work" className="relative bg-mist py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="eyebrow text-accent mb-4">The catalogue</p>
            <h2 className="display text-5xl md:text-6xl lg:text-[6vw] xl:text-[5.6rem] text-ink leading-[0.95]">
              <span className="block">Our care</span>
              <span className="block heading-italic text-accent not-italic">crystal</span>
              <span className="block">advisory</span>
            </h2>

            <p className="mt-6 max-w-sm text-ink/75 leading-relaxed">
              Six formulas, hand-mixed for the moment you&rsquo;re in.
              Diagnostic call before any prescription.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => setPage((p) => (p === 0 ? PAGES.length - 1 : p - 1))}
                aria-label="Previous page"
                className="w-12 h-12 inline-flex items-center justify-center rounded-md ring-1 ring-hairline bg-paper text-ink hover:bg-ink hover:text-mist hover:ring-ink transition-smooth"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.6} />
              </button>
              <button
                onClick={() => setPage((p) => (p + 1) % PAGES.length)}
                aria-label="Next page"
                className="w-12 h-12 inline-flex items-center justify-center rounded-md ring-1 ring-hairline bg-paper text-ink hover:bg-ink hover:text-mist hover:ring-ink transition-smooth"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.6} />
              </button>
              <span className="ml-3 numeral text-2xl text-ink/70">
                {String(page + 1).padStart(2, "0")}
                <span className="text-ink/30 mx-1">/</span>
                {String(PAGES.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`page-${page}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline rounded-3xl overflow-hidden ring-1 ring-hairline shadow-soft"
              >
                {items.map((item) => (
                  <article
                    key={item.tag}
                    className="group relative bg-paper p-6 md:p-7 flex flex-col gap-5 hover:bg-mist transition-smooth"
                  >
                    <div className="flex items-start justify-between">
                      <p className="eyebrow text-slatey">{item.eyebrow}</p>
                      <span className="numeral italic text-ink/55 text-base">
                        {item.tag}
                      </span>
                    </div>

                    <div className="relative overflow-hidden rounded-md aspect-[3/4] bg-mist">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover bw-photo group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-0 group-hover:opacity-30 bg-accent transition-opacity duration-500"
                      />
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <h3 className="heading-italic text-xl text-ink leading-snug">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => {
                          const el = document.getElementById("contact");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex-none w-9 h-9 inline-flex items-center justify-center rounded-full bg-ink text-accent group-hover:bg-accent group-hover:text-ink transition-smooth"
                        aria-label={`More about ${item.name}`}
                      >
                        <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
                      </button>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
