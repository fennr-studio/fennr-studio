"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const FAQ = [
  {
    q: "Who is fennr for?",
    a: "Founders and operators between Series A and Series C, plus mid-market leadership teams navigating an inflection — a pivot, a raise, a re-org, or a step-change in growth.",
  },
  {
    q: "How is an engagement structured?",
    a: "Every engagement opens with a two-week diagnostic sprint. From there we prescribe one of three formulas — strategy, operating, or growth — each running in six-week cycles with a weekly partner session and a written playbook at the end.",
  },
  {
    q: "What does it cost?",
    a: "Engagements are fixed-fee per cycle, scoped after the diagnostic call. No hourly billing, no surprise line items. Most teams invest between one and three cycles per year.",
  },
  {
    q: "Will the work survive after you leave?",
    a: "That's the whole point. Everything we build — the plan, the cadence, the growth model — is documented as a playbook your team owns and can run without us. Quarterly check-ins are optional.",
  },
  {
    q: "How do you choose who to work with?",
    a: "We take on a small number of teams each year so partners can be in the room, not just on the call. We look for founders with real ambition, honest data, and a willingness to make decisions.",
  },
];

function FAQItem({
  item,
  open,
  onToggle,
  index,
}: {
  item: (typeof FAQ)[number];
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-ink/15 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-7 text-left group"
        aria-expanded={open}
      >
        <span className="flex items-center gap-6">
          <span className="numeral text-accent text-2xl w-10 flex-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="heading-md text-xl md:text-2xl lg:text-[1.6rem] text-ink leading-snug group-hover:text-accent transition-smooth">
            {item.q}
          </span>
        </span>
        <span className="flex-none w-10 h-10 rounded-full bg-paper ring-1 ring-hairline inline-flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-mist group-hover:ring-ink transition-smooth">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-16 pr-16 md:pr-24 text-ink/80 leading-relaxed text-base md:text-lg max-w-3xl">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative bg-mist py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="eyebrow text-accent">Field notes</p>
            <h2 className="mt-4 display text-5xl md:text-6xl lg:text-[5.6rem] text-ink leading-[0.95]">
              <span className="block">Still have</span>
              <span className="block">questions?</span>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="block underline-accent heading-italic mt-2"
              >
                Let&rsquo;s talk.
              </a>
            </h2>

            <p className="mt-6 text-ink/75 max-w-md leading-relaxed">
              The honest answers to the things we get asked most. Anything else
              — write to us. A partner reads every email.
            </p>

            <a href="mailto:hello@fennr.studio" className="mt-8 inline-flex btn-ink">
              hello@fennr.studio
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-paper rounded-3xl shadow-soft ring-1 ring-hairline px-6 md:px-8">
              {FAQ.map((item, i) => (
                <FAQItem
                  key={item.q}
                  item={item}
                  index={i}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
