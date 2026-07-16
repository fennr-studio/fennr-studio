"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "fennr joined us six weeks before our Series B. They reframed our entire growth story and quietly closed a 40% gap in our forecast. Calmest fundraise we’ve ever run.",
    author: "Maya Okafor",
    role: "CEO",
    company: "Northwind",
    avatar: "https://i.pravatar.cc/160?img=32",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop",
  },
  {
    quote:
      "The weekly cadence changed how our leadership team thinks. Fewer decks, sharper decisions, and a plan everyone can actually recite.",
    author: "Daniel Reyes",
    role: "COO",
    company: "Meridian",
    avatar: "https://i.pravatar.cc/160?img=12",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop",
  },
  {
    quote:
      "Our re-org could have torched the company. Instead it felt like a held breath releasing. Unreasonably good at the human side of strategy.",
    author: "Aisha Patel",
    role: "Founder",
    company: "Solène",
    avatar: "https://i.pravatar.cc/160?img=45",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=900&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[index];

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
            <p className="eyebrow text-accent">In their words</p>
            <h2 className="mt-4 display text-5xl md:text-6xl lg:text-[5.4rem] text-ink leading-[0.95]">
              <span className="block">The kind of work</span>
              <span className="block heading-italic text-accent">earns the second call.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="w-12 h-12 rounded-md ring-1 ring-hairline bg-paper text-ink hover:bg-ink hover:text-mist hover:ring-ink transition-smooth inline-flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.6} />
            </button>
            <button
              onClick={() => go(1)}
              className="w-12 h-12 rounded-md ring-1 ring-hairline bg-paper text-ink hover:bg-ink hover:text-mist hover:ring-ink transition-smooth inline-flex items-center justify-center"
              aria-label="Next testimonial"
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
          <div className="lg:col-span-5 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${index}`}
                initial={{ opacity: 0, scale: 0.96, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: -1.4 }}
                exit={{ opacity: 0, scale: 0.98, rotate: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative torn-card p-2.5 max-w-md mx-auto flecks"
              >
                <span
                  aria-hidden="true"
                  className="absolute -inset-10 -z-10 star-rays opacity-90"
                />
                <div className="relative overflow-hidden rounded-md aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={`${t.author}, ${t.company}`}
                    className="w-full h-full object-cover bw-photo"
                    loading="lazy"
                  />
                </div>
                <span className="absolute top-4 left-4 numeral text-4xl text-ink/85">
                  №{String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`quote-${index}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="heading-italic text-3xl md:text-4xl lg:text-[2.8rem] text-ink leading-[1.15] max-w-3xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-9 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-mist bw-photo"
                  />
                  <div className="leading-tight">
                    <p className="display-tight text-base text-ink tracking-[0.04em]">
                      {t.author}
                    </p>
                    <p className="text-sm text-slatey">
                      {t.role} · {t.company}
                    </p>
                  </div>

                  <div className="ml-auto flex items-center gap-1.5">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to testimonial ${i + 1}`}
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
