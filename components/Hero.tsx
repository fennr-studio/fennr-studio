"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RotatingBadge from "./RotatingBadge";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-mist overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-32 w-[36rem] h-[36rem] rounded-full aura-accent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 -top-20 w-[42rem] h-[42rem] rounded-full aura-accent opacity-80"
      />

      <div className="container-px max-w-[1400px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0}
              className="flex items-center gap-3 mb-7"
            >
              <span className="inline-flex w-2 h-2 rounded-full bg-accent" />
              <span className="eyebrow text-ink">2026 · Field Notes</span>
            </motion.div>

            {/* The display line is the visual hero but carries no topical
                signal, so it is a <p>; the descriptive line below is the h1.
                Renders identically — h1 is semantics, not size. */}
            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={1}
              className="display text-[14vw] md:text-[10vw] lg:text-[8.4vw] xl:text-[8.6rem] text-ink"
            >
              <span className="block">
                Ideas{" "}
                <sup className="numeral text-accent text-[0.35em] font-medium align-super -ml-1">
                  100
                </sup>
              </span>
              <span className="block">Shipped</span>
              <span className="block">Everyday.</span>
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={2}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Link href="/brief" className="btn-accent h-[56px] px-8 text-base">
                <span className="font-semibold not-italic">Start a project</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
              </Link>
              <Link
                href="/free-preview"
                className="inline-flex items-center gap-1.5 underline-accent display-tight text-sm tracking-[0.05em]"
              >
                or get a free website preview
              </Link>
              <a
                href="https://calendly.com/fennrstudio/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 display-tight text-sm tracking-[0.05em] text-slatey hover:text-ink transition-smooth"
              >
                book a free call
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <div className="flex -space-x-2 flex-none">
                {[
                  "/img/1592621385-7232f3.jpg",
                  "/img/1600180758-8128a6.jpg",
                  "/img/1595152452-bd3929.jpg",
                ].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full ring-2 ring-mist object-cover bw-photo"
                  />
                ))}
              </div>
              <h1 className="min-w-0 max-w-sm text-sm text-slatey leading-snug font-normal">
                <span className="text-ink font-medium">
                  Web design, branding and growth
                </span>{" "}
                for businesses across <span className="text-ink">India</span>
              </h1>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -1.2 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative torn-card p-3 md:p-4 max-w-md mx-auto flecks"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-12 -z-10 star-rays opacity-90"
              />

              <div className="relative overflow-hidden rounded-md h-[26rem] md:h-[32rem]">
                <Image
                  src="/img/1499750310-7e0941.jpg"
                  alt="The fennr studio workspace"
                  fill
                  // LCP element — `priority` preloads it and sets fetchpriority
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover bw-photo"
                />
              </div>

              <div className="absolute top-5 right-5 z-10">
                <div className="relative w-20 h-20 rounded-full bg-ink text-accent inline-grid place-items-center">
                  <RotatingBadge
                    text="NEW! · NEW! · NEW! · NEW! · "
                    size={80}
                    textColor="hsl(var(--accent))"
                    centerLabel=""
                    speed="fast"
                  />
                  <span className="absolute display-tight text-[11px] tracking-[0.15em]">
                    NEW!
                  </span>
                </div>
              </div>

              <div className="px-2 pt-3 pb-1 flex items-center justify-between">
                <span className="eyebrow text-ink/70">№ Studio 04</span>
                <span className="numeral italic text-ink/70 text-base">India · est. 2026</span>
              </div>
            </motion.div>

            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden md:block absolute -bottom-4 -left-6 numeral text-7xl text-accent leading-none"
            >
              *
            </motion.span>

            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden md:block absolute -right-3 top-12 numeral italic text-accent text-2xl rotate-12"
            >
              ✶
            </motion.span>
          </div>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <p className="md:col-span-7 max-w-xl text-base md:text-lg text-ink/80 leading-relaxed">
            fennr<span className="text-accent">.*</span> is a design and technology studio building brands through{" "}
            <span className="heading-italic">identity, digital experiences</span> and{" "}
            <span className="heading-italic">thoughtful execution</span> for founders who
            refuse to coast.
          </p>

          <div className="md:col-span-5 flex md:justify-end">
            <button
              onClick={() => {
                const el = document.getElementById("approach");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-3"
              aria-label="Scroll to approach"
            >
              <RotatingBadge
                text="SCROLL TO SEE MORE * SCROLL TO SEE MORE * "
                size={110}
                textColor="hsl(var(--ink))"
                centerLabel="✶"
                centerColor="hsl(var(--accent))"
                speed="slow"
                className="group-hover:scale-105 transition-smooth"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
