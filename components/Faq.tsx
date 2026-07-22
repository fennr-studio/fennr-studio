"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const FAQ = [
  {
    q: "Who is fennr for?",
    a: "Owner-led businesses that have outgrown an Instagram page and a phone number: restaurants, clinics, salons, boutiques, D2C brands, real estate, consultants and early-stage startups. Take the whole thing or take one piece. Some clients want the full build of brand, site, photography and growth; others come to us just for a logo, just for SEO, or just for a shoot. What we're good at is being the single team accountable for whatever you hand us. We're less suited to enterprises with in-house marketing teams, or to anyone shopping purely on price.",
  },
  {
    q: "What if I already have a website, a logo, or a photographer?",
    a: "Then we work with what exists. We'll audit the current site and tell you honestly whether it needs a rebuild or just a fix. Sometimes speed, SEO, and a WhatsApp/payment layer are all that's missing. Services are modular: take integration only, SEO only, or photography only. We won't sell you a rebuild you don't need.",
  },
  {
    q: "Do you handle hosting, domain, and maintenance?",
    a: "Yes, all three, though ownership stays with you throughout. We register or transfer the domain in your name, set up hosting suited to the build, configure SSL, email, DNS and backups, and hand over the credentials. Domain and hosting are billed at actual cost with no markup and sit outside the project total, payable to us or directly to the provider, whichever you prefer. Maintenance is optional and priced separately: updates, security patches, backups, uptime monitoring, and a set allowance of small changes each month. If you'd rather manage it yourself or use someone else, that's a perfectly reasonable choice and we'll make sure you have everything you need. Thirty days of post-launch support is included regardless.",
  },
  {
    q: "Do I need to pay everything upfront?",
    a: "No. Projects run on milestones: typically 50% to start, 30% at design sign-off, and the remaining 20% before launch. Retainers (SEO, maintenance) are billed monthly in advance. You'll get a payment link over WhatsApp or email; UPI, cards, and net banking all work. Nothing goes live until you've seen it and signed off.",
  },
  {
    q: "Do you work with clients outside your city?",
    a: "We do, and a good share of our work already is remote. The process is built for it: calls, shared documents, staged previews you can review from anywhere, and updates over WhatsApp rather than meetings. The one honest caveat is photography: shoots need us in the room, so for clients outside our base we either plan a travel day into the scope or work with a trusted local photographer under our art direction. Everything else (websites, identity, SEO, design, strategy) is unaffected by distance.",
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
