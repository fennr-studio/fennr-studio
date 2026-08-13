"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  name: string;
  title: string;
  src: string;
  tags: string[];
  href: string;
};

// Real Fennr work. Cards link to the live site (opens in a new tab); the URL
// itself is never shown.
const PROJECTS: Project[] = [
  {
    name: "VillaVista",
    title: "A luxury resort site with rooms, dining & direct booking",
    src: "/img/proj-villavista.jpg",
    tags: ["Web Design", "Web Development", "Booking Flow"],
    href: "https://villavista-tawny.vercel.app",
  },
  {
    name: "West Village Café",
    title: "A community café brand, menu & online ordering",
    src: "/img/proj-cafe.jpg",
    tags: ["Brand & Identity", "Web Design", "Menu / Ordering"],
    href: "https://west-village-cafe.vercel.app",
  },
  {
    name: "Photography Portfolio",
    title: "An image-first portfolio for a visual storyteller",
    src: "/img/proj-portfolio.jpg",
    tags: ["Web Design", "Web Development", "Photography"],
    href: "https://gurnoorsingh-portfolio.vercel.app",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Card({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease, delay: (index % 2) * 0.08 }}
      className="group"
    >
      <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
      <div className="relative overflow-hidden rounded-2xl bg-paper ring-1 ring-hairline shadow-soft">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={project.src}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
            draggable={false}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-accent mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-15"
          />
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ink text-accent opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
          </span>
        </div>
      </div>

      <div className="mt-5">
        <p className="eyebrow text-accent">{project.name}</p>
        <h3 className="mt-2 heading-md text-xl md:text-2xl text-ink leading-snug">
          {project.title}
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-accent/15 ring-1 ring-accent/30 px-3 py-1 text-xs text-ink/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      </a>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="work"
      aria-label="Our projects"
      className="relative bg-mist py-20 md:py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full aura-accent opacity-60"
      />

      <div className="relative container-px max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl"
        >
          <p className="eyebrow text-ink/60">[ Our projects ]</p>
          <h2 className="mt-4 display text-ink text-[9vw] sm:text-4xl lg:text-[3.2rem] leading-[1.02]">
            Real products.{" "}
            <span className="heading-italic text-accent normal-case">
              Actually shipped.
            </span>
          </h2>
          <p className="mt-4 text-ink/70 leading-relaxed">
            Built end-to-end, or just the part you need. A few of the things
            we&rsquo;ve made for founders and small businesses.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          {PROJECTS.map((p, i) => (
            <Card key={p.name} project={p} index={i} />
          ))}

          {/* CTA card — honest invite instead of a filler project */}
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="group flex"
          >
            <Link
              href="/brief"
              className="relative flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-ink text-mist p-8 md:p-10 min-h-[280px] transition-transform duration-500 hover:-translate-y-1"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-2xl"
              />
              <p className="eyebrow text-accent">Your project</p>
              <div>
                <h3 className="display text-3xl md:text-4xl leading-[1.02]">
                  You could be{" "}
                  <span className="heading-italic text-accent normal-case">
                    next.
                  </span>
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 display-tight text-sm tracking-[0.05em] text-accent">
                  Start a project
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
