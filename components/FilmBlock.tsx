"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import StatPill from "./StatPill";

export default function FilmBlock() {
  const [played, setPlayed] = useState(false);

  return (
    <section className="relative bg-mist py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 w-[34rem] h-[34rem] rounded-full aura-accent"
      />

      <div className="container-px max-w-[1400px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden ring-1 ring-ink/15 shadow-elevated bg-ink"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/1505142468-cc9b44.jpg"
            alt="fennr studio film still"
            className="w-full h-[24rem] md:h-[32rem] object-cover bw-photo opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/55" />

          <button
            onClick={() => setPlayed(true)}
            aria-label="Play studio film"
            className="absolute inset-0 grid place-items-center group"
          >
            <span className="relative inline-grid place-items-center">
              <span className="absolute inset-0 rounded-full bg-mist/30 backdrop-blur-md scale-110 group-hover:scale-125 transition-smooth" />
              <span className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-accent text-ink inline-grid place-items-center shadow-elevated transition-smooth group-hover:bg-ink group-hover:text-accent">
                <Play className="w-7 h-7 ml-1" fill="currentColor" strokeWidth={0} />
              </span>
              <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 eyebrow text-mist tracking-[0.18em] whitespace-nowrap">
                {played ? "Loading film" : "Watch the film!"}
              </span>
            </span>
          </button>

          <div className="absolute top-6 left-6 flex items-center gap-3">
            <span className="inline-flex w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="eyebrow text-mist tracking-[0.18em]">
              Studio film · 02:14
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        >
          <div className="md:col-span-4 flex items-center gap-5">
            <StatPill value="184" label="engagements per decade" size="lg" />
          </div>
          <p className="md:col-span-8 text-ink/80 leading-relaxed text-base md:text-lg max-w-2xl">
            A short film from inside Studio 04. The kind of work we make,
            shaped by the people we work with — quiet rooms, sharper questions,
            calmer Mondays.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
