"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Service = {
  no: string;
  name: string;
  audience: string;
  promise: string;
  tags: string[];
  outcome: { from: string; to: string };
  image: string;
};

const SERVICES: Service[] = [
  {
    no: "1",
    name: "Build",
    audience: "For new businesses",
    promise: "Everything you need to start selling.",
    tags: ["Website", "WhatsApp", "Payments", "Logo"],
    outcome: { from: "Restaurant menu", to: "WhatsApp orders in 3 weeks" },
    image:
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&w=1000&q=80",
  },
  {
    no: "2",
    name: "Brand",
    audience: "For growing brands",
    promise: "Look like the brand you're becoming.",
    tags: ["Photography", "Graphic design", "Brand strategy"],
    outcome: { from: "Home-grown label", to: "a shelf-ready identity" },
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    no: "3",
    name: "Grow",
    audience: "For established businesses",
    promise: "Turn the website into a revenue channel.",
    tags: ["SEO", "Integrations", "Automation", "Retainers"],
    outcome: { from: "A brochure site", to: "a measurable revenue channel" },
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1000&q=80",
  },
];

function ServiceCard({ data, index }: { data: Service; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06,
      }}
      className="relative flex flex-col gap-7"
    >
      <div className="relative torn-card p-2.5 max-w-sm mx-auto w-full flecks">
        <span
          aria-hidden="true"
          className="absolute -inset-8 -z-10 star-rays opacity-80"
        />
        <div className="relative overflow-hidden rounded-md aspect-[4/5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover bw-photo"
            loading="lazy"
          />
        </div>
        <span className="absolute top-4 left-4 numeral text-4xl text-ink/85">
          №{data.no}
        </span>
      </div>

      <div className="px-2">
        <p className="eyebrow text-accent">{data.audience}</p>
        <h3 className="mt-3 display text-3xl md:text-[2.1rem] text-ink leading-none">
          {data.name}
        </h3>
        <p className="mt-3 heading-italic text-lg text-ink/90 leading-snug max-w-xs">
          {data.promise}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {data.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full ring-1 ring-hairline bg-paper px-3 py-1 display-tight text-[11px] tracking-[0.05em] text-ink/70"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-ink/10 pt-5">
          <p className="eyebrow text-slatey mb-2.5">In practice</p>
          <p className="flex items-center gap-2.5 flex-wrap heading-italic text-base text-ink leading-snug">
            <span>{data.outcome.from}</span>
            <ArrowRight className="w-4 h-4 text-accent flex-none" strokeWidth={1.8} />
            <span>{data.outcome.to}</span>
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-mist py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="eyebrow text-accent">Services</p>
            <h2 className="mt-4 display text-5xl md:text-6xl lg:text-[5.4rem] text-ink leading-[0.95]">
              <span className="block">What we make</span>
              <span className="block heading-italic text-accent normal-case">— and how it feels.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-ink/75 leading-relaxed">
            Three ways to work with us, matched to where your business is right
            now. Choose one, choose all, or let us prescribe after the first
            call.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.no} data={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
