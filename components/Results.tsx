"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const STATS = [
  {
    value: 5,
    suffix: "+",
    label: "Years Experience",
    note: "In the web development and design industry.",
  },
  {
    value: 200,
    suffix: "+",
    label: "Projects Done",
    note: "Delivered for clients around the world.",
  },
  {
    value: 150,
    suffix: "%",
    label: "Satisfied Clients",
    note: "With a great experience and real results.",
  },
];

export default function Results() {
  return (
    <section id="results" className="relative bg-mist py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <p className="eyebrow text-accent">By the numbers</p>
            <h2 className="mt-4 display text-5xl md:text-6xl lg:text-[5.4rem] text-ink leading-[0.95]">
              <span className="block">Quiet work.</span>
              <span className="block heading-italic text-accent">Loud outcomes.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-ink/75 leading-relaxed">
            Five years of building brands and websites, in a few honest numbers
            — measured the way you would, not the way a deck would.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline rounded-3xl overflow-hidden ring-1 ring-hairline shadow-soft">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="relative bg-paper p-7 md:p-8 hover:bg-mist transition-smooth"
            >
              <span className="absolute top-5 right-5 numeral text-base text-ink/45">
                №{i + 1}
              </span>

              <div className="inline-flex items-stretch shadow-soft mb-6">
                <span className="flex-none inline-flex items-center justify-center bg-ink text-accent display-tight w-20 h-20 text-3xl rounded-l-md">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </span>
                <span className="inline-flex items-center bg-paper text-ink font-medium h-20 px-5 text-sm leading-tight rounded-r-md ring-1 ring-hairline max-w-[8rem]">
                  {s.label}
                </span>
              </div>

              <p className="text-ink/75 leading-relaxed text-sm max-w-xs">
                {s.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
