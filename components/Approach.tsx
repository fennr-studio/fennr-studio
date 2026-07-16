"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RotatingBadge from "./RotatingBadge";

const STAGES = [
  {
    no: "1",
    word: "Strategy",
    label: "Strategy on a page",
    eyebrow: "Diagnose · Design",
    title: "A sharp plan you can hold in your head",
    body: "Two weeks of deep listening, data review and stakeholder interviews. We surface the real constraint — not the loudest one — and shape a focused plan with three to five bets.",
    deliverables: ["Strategy on a page", "Bet portfolio & sequencing", "Operating cadence"],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/120?img=48",
  },
  {
    no: "2",
    word: "Operating",
    label: "Operating cadence",
    eyebrow: "Deploy",
    title: "A weekly rhythm leadership actually trusts",
    body: "We embed in your weekly rituals — leadership reviews, board prep, stakeholder comms — turning intent into shipped outcomes. Cool head, warm room.",
    deliverables: ["Embedded operator", "Weekly leadership review", "Stakeholder comms"],
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/120?img=48",
  },
  {
    no: "3",
    word: "Growth",
    label: "Growth playbook",
    eyebrow: "Compound",
    title: "A growth model that compounds, quietly",
    body: "We optimise the system, not the spreadsheet. The engagement ends with a documented playbook your team can run without us — or with us, quarterly.",
    deliverables: ["Growth model", "Channel & pricing review", "Playbook handover"],
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop",
    avatar: "https://i.pravatar.cc/120?img=48",
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
              Three states · Scroll to morph
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
                    <li key={d} className="flex items-start gap-2.5">
                      <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent flex-none" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 pt-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-mist bw-photo"
                  />
                  <div className="leading-tight">
                    <p className="display-tight text-sm text-ink">Emma Fenn</p>
                    <p className="text-xs text-slatey">Founder &amp; Partner</p>
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="ml-auto w-9 h-9 inline-flex items-center justify-center rounded-full bg-ink text-accent hover:bg-accent hover:text-ink transition-smooth"
                    aria-label="Book a working call"
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
