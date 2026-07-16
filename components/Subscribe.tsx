"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import EmailSignupForm from "./EmailSignupForm";

export default function Subscribe() {
  return (
    <section
      id="contact"
      className="relative bg-mist pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 w-[40rem] h-[40rem] rounded-full aura-accent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 w-[40rem] h-[40rem] rounded-full aura-accent opacity-80"
      />

      <div className="container-px max-w-[1400px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-paper rounded-3xl shadow-elevated ring-1 ring-hairline px-6 py-12 md:px-12 md:py-16"
        >
          <span
            aria-hidden="true"
            className="absolute -top-5 -right-5 inline-grid place-items-center w-16 h-16 rounded-full bg-ink text-accent display-tight text-xs tracking-[0.18em]"
          >
            NEW!
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <p className="eyebrow text-accent">Subscribe to field notes</p>
              <h2 className="mt-4 display text-4xl md:text-5xl lg:text-[4rem] text-ink leading-[0.98]">
                <span className="block">One letter.</span>
                <span className="block heading-italic text-accent">
                  No noise. Real signal.
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-ink/75 leading-relaxed text-base md:text-lg">
                A short letter from the partners — what we&rsquo;re seeing
                inside portfolios, the playbooks worth stealing, and the bets
                we&rsquo;d make this quarter.
              </p>

              <div className="mt-9">
                <EmailSignupForm placeholder="Enter your e-mail" cta="Sign Up" />
                <p className="mt-3 text-xs text-slatey">
                  Join 2,847 founders &amp; operators. Unsubscribe in one click.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="bg-mist rounded-2xl ring-1 ring-hairline p-6 md:p-7">
                <p className="eyebrow text-slatey">Prefer to talk?</p>
                <h3 className="mt-3 heading-md text-2xl md:text-[1.6rem] text-ink leading-snug">
                  Book a 30-minute working call.
                </h3>
                <p className="mt-3 text-ink/75 leading-relaxed text-sm">
                  We&rsquo;ll spend it on your business — not ours. You&rsquo;ll
                  leave with at least one move you can make this week.
                </p>
                <a
                  href="mailto:hello@fennr.studio?subject=Working%20call"
                  className="mt-6 inline-flex btn-ink"
                >
                  Book a working call
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
                </a>
              </div>

              <div className="bg-ink text-mist rounded-2xl p-6 md:p-7">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <p className="eyebrow text-accent">Studio 04</p>
                  <span className="numeral italic text-accent text-base">*</span>
                </div>
                <p className="leading-relaxed text-mist/80">
                  18 Wells Street
                  <br />
                  London W1T 3PA · UK
                </p>
                <a
                  href="mailto:hello@fennr.studio"
                  className="mt-4 inline-block underline-accent heading-italic text-lg"
                >
                  hello@fennr.studio
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
