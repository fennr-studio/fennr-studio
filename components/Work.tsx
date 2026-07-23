"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

type Project = {
  no: string;
  title: string;
  desc: string;
  category: string;
  image: string;
  href?: string; // live URL, optional
  tag?: string; // e.g. "Concept" / "Self-initiated" — shown when it's not a paid client build
};

const PROJECTS: Project[] = [
  {
    no: "01",
    title: "Sites that fill tables",
    desc: "For cafés and restaurants — a mouth-watering menu, your story and 'find us', built to bring people through the door.",
    category: "Web + Design",
    image: "/img/work-cafe.jpg",
  },
  {
    no: "02",
    title: "A stay that sells the feeling",
    desc: "For villas and boutique stays — a booking-led site with full-bleed photography and enquiry a tap away.",
    category: "Web + Design",
    image: "/img/work-villa.jpg",
  },
  {
    no: "03",
    title: "A portfolio that lets the work breathe",
    desc: "For photographers and creatives — a fast, image-first portfolio built to get out of the way of the work.",
    category: "Web + Photography",
    image: "/img/work-photography.jpg",
  },
  {
    no: "04",
    title: "Trust you can book in a tap",
    desc: "For clinics and wellness brands — a calm, credible site with services, timings and one-tap appointments.",
    category: "Web + Design",
    image: "/img/work-clinic.jpg",
  },
  {
    no: "05",
    title: "A storefront built to convert",
    desc: "For D2C brands — a shop with payments, WhatsApp and product shots that make people click buy.",
    category: "Web + Product Photography",
    image: "/img/work-d2c.jpg",
  },
  {
    no: "06",
    title: "Tools that run the business",
    desc: "For teams that need more than a site — custom web apps and dashboards, designed to be used every day.",
    category: "Web App + Design",
    image: "/img/work-app.jpg",
  },
];

export default function Work() {
  const [index, setIndex] = useState(0);
  const total = PROJECTS.length;
  const p = PROJECTS[index];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 7500);
    return () => clearInterval(id);
  }, [total]);

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  return (
    <section className="relative bg-mist py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 w-[36rem] h-[36rem] rounded-full aura-accent opacity-90"
      />

      <div className="container-px max-w-[1400px] mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="eyebrow text-accent">In our work</p>
            <h2 className="mt-4 display text-5xl md:text-6xl lg:text-[5.4rem] text-ink leading-[0.95]">
              <span className="block">The kind of work</span>
              <span className="block heading-italic text-accent">
                we&rsquo;d want our name on.
              </span>
            </h2>
            <p className="mt-5 text-ink/75 leading-relaxed max-w-lg">
              The kinds of brands we build for — cafés, villas, clinics,
              photographers, D2C and more, from a first storefront to a full
              web app.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="w-12 h-12 rounded-md ring-1 ring-hairline bg-paper text-ink hover:bg-ink hover:text-mist hover:ring-ink transition-smooth inline-flex items-center justify-center"
              aria-label="Previous project"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.6} />
            </button>
            <button
              onClick={() => go(1)}
              className="w-12 h-12 rounded-md ring-1 ring-hairline bg-paper text-ink hover:bg-ink hover:text-mist hover:ring-ink transition-smooth inline-flex items-center justify-center"
              aria-label="Next project"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1.6} />
            </button>
            <span className="ml-3 numeral text-2xl text-ink/70">
              {String(index + 1).padStart(2, "0")}
              <span className="text-ink/30 mx-1">/</span>
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${index}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-xl overflow-hidden shadow-elevated ring-1 ring-ink/10"
              >
                <div className="aspect-[16/10] bg-mist">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover bw-photo"
                    loading="lazy"
                  />
                </div>
                {p.tag && (
                  <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-ink text-accent display-tight text-[10px] tracking-[0.16em] px-3 py-1">
                    {p.tag}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${index}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="numeral text-5xl md:text-6xl text-accent leading-none block">
                  №{p.no}
                </span>
                <h3 className="mt-5 heading-italic text-3xl md:text-4xl text-ink leading-[1.1]">
                  {p.title}
                </h3>
                <p className="mt-4 text-ink/75 leading-relaxed text-base md:text-lg max-w-md">
                  {p.desc}
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <p className="display-tight text-sm text-ink tracking-[0.05em]">
                    {p.category}
                  </p>

                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 w-9 h-9 inline-flex items-center justify-center rounded-full bg-ink text-accent hover:bg-accent hover:text-ink transition-smooth"
                      aria-label={`Visit ${p.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
                    </a>
                  )}

                  <div className="ml-auto flex items-center gap-1.5">
                    {PROJECTS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to project ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === index ? "w-8 bg-ink" : "w-3 bg-ink/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
