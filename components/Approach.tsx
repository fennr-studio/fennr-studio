"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RotatingBadge from "./RotatingBadge";

type Deliverable = { text: string; free?: boolean };

type Stage = {
  no: string;
  word: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  deliverables: Deliverable[];
  cta: string;
  image: string;
};

const STAGES: Stage[] = [
  {
    no: "1",
    word: "Strategy",
    label: "Discover & Strategy",
    eyebrow: "Step 01 · Discover",
    title: "A sharp plan you can act on this week",
    body: "We open with a free discovery call, then audit your brand and market to find the real constraint — not the loudest one. You walk away with a clear scope on a page.",
    deliverables: [
      { text: "Discovery call", free: true },
      { text: "Brand & market audit" },
      { text: "Scope on a page" },
    ],
    cta: "Start with a free discovery call",
    image:
      "/img/1454165804-87abe2.jpg",
  },
  {
    no: "2",
    word: "Design",
    label: "Design & Build",
    eyebrow: "Step 02 · Build",
    title: "Identity and product, built to ship",
    body: "We design the identity, UI and content, run the photography, and build your site with the integrations your business actually needs — nothing bolted on for show.",
    deliverables: [
      { text: "Brand identity & UI" },
      { text: "Content & photography" },
      { text: "Development & integrations" },
    ],
    cta: "See how we design & build",
    image:
      "/img/1581291518-0b6212.jpg",
  },
  {
    no: "3",
    word: "Growth",
    label: "Launch & Growth",
    eyebrow: "Step 03 · Grow",
    title: "A launch that keeps compounding",
    body: "Once everything is tested and refined, we launch your project with precision. Post-launch, we provide ongoing support, updates, and strategies to help you scale and maximize results.",
    deliverables: [
      { text: "Tested, precision launch" },
      { text: "Ongoing support & updates" },
      { text: "Growth strategy to scale" },
    ],
    cta: "Plan your launch & growth",
    image:
      "/img/1543286386-cf8eee.jpg",
  },
];

export default function Approach() {
  const wrapRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const next = v < 0.34 ? 0 : v < 0.67 ? 1 : 2;
      setStage((prev) => (prev !== next ? next : prev));
    });
    return () => unsub();
  }, [scrollYProgress]);

  const data = STAGES[stage];

  const goToStage = (i: number) => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionH = el.offsetHeight - window.innerHeight;
    const target = sectionTop + sectionH * (i / STAGES.length + 0.05);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      id="approach"
      ref={wrapRef}
      className="relative bg-mist"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/3 w-[40rem] h-[40rem] rounded-full aura-accent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-0 w-[40rem] h-[40rem] rounded-full aura-accent opacity-70"
        />

        <div className="container-px max-w-[1400px] mx-auto w-full pt-16 md:pt-20 pb-4 flex items-center justify-between relative z-10">
          <div>
            <p className="eyebrow text-accent">The approach</p>
            <p className="mt-1.5 display-tight text-sm md:text-base text-ink/65 tracking-[0.04em]">
              Three steps · Scroll to morph
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {STAGES.map((s, i) => (
              <button
                key={s.no}
                onClick={() => goToStage(i)}
                className={`numeral text-2xl transition-smooth ${
                  i === stage ? "text-ink" : "text-ink/25 hover:text-ink/55"
                }`}
                aria-label={`Go to stage ${i + 1}`}
              >
                №{s.no}
              </button>
            ))}
          </div>
        </div>

        <div className="container-px max-w-[1400px] mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pb-8 relative z-10">
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`no-${data.no}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-baseline gap-2"
              >
                <span className="numeral text-7xl xl:text-[7.5rem] text-ink leading-none">
                  №
                </span>
                <span className="numeral-rule numeral text-7xl xl:text-[7.5rem] text-ink">
                  {data.no}
                </span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`label-${data.no}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="display-tight text-sm xl:text-base text-ink tracking-[0.05em] max-w-[14ch]"
              >
                {data.label}
              </motion.p>
            </AnimatePresence>

            <div className="pt-3">
              <RotatingBadge
                text="SCROLL TO SEE MORE * SCROLL TO SEE MORE * "
                size={108}
                textColor="hsl(var(--ink))"
                centerLabel="*"
                centerColor="hsl(var(--accent))"
                speed="slow"
              />
            </div>
          </div>

          <div className="lg:col-span-6 relative flex flex-col items-center text-center">
            <div className="lg:hidden flex items-center justify-between w-full mb-3">
              <div className="flex items-baseline gap-1">
                <span className="numeral text-5xl text-ink leading-none">№</span>
                <span className="numeral-rule numeral text-5xl text-ink">
                  {data.no}
                </span>
              </div>
              <span className="display-tight text-xs text-ink/70 tracking-[0.06em]">
                {data.label}
              </span>
            </div>

            <h2 className="display text-ink leading-[0.95] flex flex-col items-center w-full text-5xl md:text-6xl lg:text-[4.6rem] xl:text-[5.4rem]">
              <span className="block">Choosing</span>
              <span className="block">the right</span>

              <span
                className="relative block w-full overflow-hidden"
                style={{ height: "1em" }}
                aria-live="polite"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={data.word}
                    initial={{ opacity: 0, y: "60%", filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: "-60%", filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 top-0 heading-italic text-accent leading-[0.95]"
                  >
                    {data.word}
                  </motion.span>
                </AnimatePresence>
              </span>

              <span className="block">Partner.</span>
            </h2>

            <div className="relative mt-6 md:mt-7 w-44 md:w-52 lg:w-56 xl:w-64 aspect-[3/4]">
              <span
                aria-hidden="true"
                className="absolute -inset-10 -z-10 star-rays opacity-90"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`photo-${data.no}`}
                  initial={{ opacity: 0, scale: 0.94, rotate: -4, y: 18 }}
                  animate={{ opacity: 1, scale: 1, rotate: -1.4, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, rotate: 2, y: -18 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 torn-card p-2 flecks"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.image}
                    alt={data.label}
                    className="w-full h-full object-cover rounded-md bw-photo"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${data.no}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-4"
              >
                <p className="eyebrow text-accent">{data.eyebrow}</p>
                <h3 className="heading-md text-xl md:text-2xl text-ink leading-snug">
                  {data.title}
                </h3>
                <p className="text-ink/75 leading-relaxed text-sm md:text-base">
                  {data.body}
                </p>

                <ul className="space-y-2 text-sm text-ink/85">
                  {data.deliverables.map((d) => (
                    <li key={d.text} className="flex items-start gap-2.5">
                      <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent flex-none" />
                      <span className="flex items-center gap-2">
                        {d.text}
                        {d.free && (
                          <span className="inline-flex items-center rounded-full bg-ink text-accent display-tight text-[9px] leading-none tracking-[0.18em] px-2 py-1">
                            FREE
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 pt-1">
                  <div className="leading-tight">
                    <p className="display-tight text-sm text-ink tracking-[0.05em]">
                      Step {data.no} of {STAGES.length}
                    </p>
                    <p className="text-xs text-slatey">{data.cta}</p>
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="ml-auto w-9 h-9 inline-flex items-center justify-center rounded-full bg-ink text-accent hover:bg-accent hover:text-ink transition-smooth"
                    aria-label={data.cta}
                  >
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="container-px max-w-[1400px] mx-auto w-full pb-6 relative z-10">
          <div className="flex items-center gap-4">
            <span className="numeral text-base text-ink/55">
              {String(stage + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 h-[3px] bg-ink/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span className="numeral text-base text-ink/55">
              {String(STAGES.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
