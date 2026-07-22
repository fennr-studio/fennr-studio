"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";

type Card = {
  tag: string;
  category: string;
  name: string;
  desc: string;
  image: string;
};

const PAGES: Card[][] = [
  [
    {
      tag: "A4-1",
      category: "Build",
      name: "Web Development & Integration",
      desc: "Website · WhatsApp · API · Payments",
      image:
        "/img/1547658719-5606a6.jpg",
    },
    {
      tag: "A4-2",
      category: "Branding",
      name: "Logo & Identity Design",
      desc: "Logo systems · brand boards",
      image:
        "/img/1516131206-318aac.jpg",
    },
    {
      tag: "A4-3",
      category: "Growth",
      name: "SEO & Visibility",
      desc: "Search · analytics · rankings",
      image:
        "/img/1551288049-54e812.jpg",
    },
  ],
  [
    {
      tag: "A4-4",
      category: "Content",
      name: "Professional Photography",
      desc: "Product · food · spaces",
      image:
        "/img/1560343090-5559bc.jpg",
    },
    {
      tag: "A4-5",
      category: "Creative",
      name: "Graphic Design",
      desc: "Social · print · campaigns",
      image:
        "/img/1609921212-c99db0.jpg",
    },
    {
      tag: "A4-6",
      category: "Strategy",
      name: "Brand Strategy & Ideation",
      desc: "Positioning · naming · moodboards",
      image:
        "/img/1531403009-7c8d1e.jpg",
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
              <span className="block">All</span>
              <span className="block heading-italic text-accent">your brand</span>
              <span className="block">needs.</span>
            </h2>

            <p className="mt-6 max-w-sm text-ink/75 leading-relaxed">
              Six core services, one studio — from your first website to a full
              growth engine. A diagnostic call before any prescription.
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
                      <p className="eyebrow text-accent">{item.category}</p>
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
                      <div>
                        <h3 className="heading-md text-lg text-ink leading-snug">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs text-slatey">{item.desc}</p>
                      </div>
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
