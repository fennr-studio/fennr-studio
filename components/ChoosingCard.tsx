"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const PILLARS = [
  {
    key: "clarity",
    label: "Clarity Sprint",
    eyebrow: "Care Crystal Sprint",
    body: "A weekly cadence with the partners. We strip out the noise — slack pings, status decks, theatre — and leave you with a single, sharp story your team can run.",
    cta: "Read more",
    swatch: "bg-accent",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=240&auto=format&fit=crop",
  },
  {
    key: "momentum",
    label: "Momentum Sprint",
    eyebrow: "Embedded Operator Sprint",
    body: "An embedded operator inside your weekly rituals — standups, leadership reviews, board prep — turning intent into shipped work. Calm head, clear plan.",
    cta: "Read more",
    swatch: "bg-[#5C84B0]",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=240&auto=format&fit=crop",
  },
  {
    key: "compound",
    label: "Compound Sprint",
    eyebrow: "Compound Playbook Sprint",
    body: "You walk away with a documented playbook your team can run without us. Optional quarterly check-ins keep momentum honest, never co-dependent.",
    cta: "Read more",
    swatch: "bg-[#D7A1A1]",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=240&auto=format&fit=crop",
  },
];

export default function ChoosingCard() {
  const [active, setActive] = useState(0);
  const item = PILLARS[active];

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
                Slow down, take a moment, and look at your business with new
                eyes. We work with a small number of teams each year so we can
                be in the room — not just on the call.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {PILLARS.map((p, i) => (
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
                >
                  <h3 className="display-tight text-base text-ink mb-3 tracking-[0.06em]">
                    {item.eyebrow}
                  </h3>
                  <p className="text-ink/75 leading-relaxed text-base max-w-md">
                    {item.body}
                  </p>
                  <button className="mt-6 inline-flex items-center gap-1.5 underline-accent display-tight text-sm tracking-[0.05em]">
                    {item.cta}
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
