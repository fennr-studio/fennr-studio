"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    no: "1",
    title: "Strategy on a Page",
    eyebrow: "For founders",
    body: "A sharp, durable plan you can hold in your head. Pressure-tested with your team, your board and your customers — until it earns its keep.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
    quote: {
      copy: "Six weeks with fennr replaced eighteen months of debate.",
      author: "Emma Fenn",
      role: "Founder",
      avatar: "https://i.pravatar.cc/120?img=48",
    },
  },
  {
    no: "2",
    title: "New Formula for Operators",
    eyebrow: "For operating teams",
    body: "Re-orgs, replatforms and pivots — guided by an embedded operator who has done it before. Calm, decisive, somehow fun.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000&auto=format&fit=crop",
    quote: {
      copy: "They turned our re-org into the smoothest quarter we’ve had.",
      author: "Emma Fenn",
      role: "Founder",
      avatar: "https://i.pravatar.cc/120?img=48",
    },
  },
  {
    no: "3",
    title: "Adding Shine to Growth",
    eyebrow: "For revenue leaders",
    body: "A weekly cadence that finds the leaks, doubles the wins, and keeps the team energised. We optimise the system, not the spreadsheet.",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1000&auto=format&fit=crop",
    quote: {
      copy: "Lowered our CAC by 38% in a single quarter without burning the brand.",
      author: "Emma Fenn",
      role: "Founder",
      avatar: "https://i.pravatar.cc/120?img=48",
    },
  },
];

function ServiceCard({ data, index }: { data: (typeof SERVICES)[number]; index: number }) {
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
            alt={data.title}
            className="w-full h-full object-cover bw-photo"
            loading="lazy"
          />
        </div>
        <span className="absolute top-4 left-4 numeral text-4xl text-ink/85">
          №{data.no}
        </span>
      </div>

      <div className="px-2">
        <p className="eyebrow text-accent">{data.eyebrow}</p>
        <h3 className="mt-3 heading-md text-2xl md:text-[1.7rem] text-ink leading-snug">
          {data.title}
        </h3>
        <p className="mt-3 text-ink/75 leading-relaxed">{data.body}</p>

        <figure className="mt-6 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.quote.avatar}
            alt={data.quote.author}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-mist bw-photo"
          />
          <figcaption className="leading-tight">
            <p className="display-tight text-sm text-ink">{data.quote.author}</p>
            <p className="text-xs text-slatey">{data.quote.role}</p>
          </figcaption>
          <button
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="ml-auto w-9 h-9 inline-flex items-center justify-center rounded-full bg-ink text-accent hover:bg-accent hover:text-ink transition-smooth"
            aria-label={`Open ${data.title}`}
          >
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
          </button>
        </figure>

        <blockquote className="mt-5 heading-italic text-base text-ink/90 leading-snug max-w-xs">
          &ldquo;{data.quote.copy}&rdquo;
        </blockquote>
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
            Three formulas for ambitious operators. Choose one, choose all, or
            let us prescribe after the first call.
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
