"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import EmailSignupForm from "./EmailSignupForm";

// TODO: replace with fennr's WhatsApp number — country code + number, digits only (no +, spaces or dashes)
const WHATSAPP_NUMBER = "919765190702";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi fennr, I'd like to talk about a project.",
)}`;

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
    </svg>
  );
}

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
              <p className="eyebrow text-accent">The newsletter</p>
              <h2 className="mt-4 display text-4xl md:text-5xl lg:text-[4rem] text-ink leading-[0.98]">
                <span className="block">Growth notes,</span>
                <span className="block heading-italic text-accent">
                  once a month.
                </span>
              </h2>
              <p className="mt-6 max-w-xl text-ink/75 leading-relaxed text-base md:text-lg">
                Practical, no-jargon tips for small business owners:
                what&rsquo;s actually working for websites, branding, and
                getting found online. One email a month, that&rsquo;s it.
              </p>

              <div className="mt-9">
                <EmailSignupForm
                  placeholder="Enter your e-mail"
                  cta="Sign Up"
                />
                <p className="mt-3 text-xs text-slatey">
                  Real tips you can use this week. Unsubscribe in one click.
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
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://calendly.com/fennrstudio/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex btn-ink"
                  >
                    Book a working call
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-accent text-ink font-medium px-6 py-3.5 hover:bg-ink hover:text-accent transition-smooth"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="bg-ink text-mist rounded-2xl p-6 md:p-7">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <p className="eyebrow text-accent">Studio 04</p>
                  <span className="numeral italic text-accent text-base">
                    *
                  </span>
                </div>
                <p className="leading-relaxed text-mist/80">
                  Shivaji Nagar
                  <br />
                  Pune 411007 · India
                </p>
                <a
                  href="mailto:fennr.studio@gmail.com"
                  className="mt-4 inline-block underline-accent heading-italic text-lg"
                >
                  fennr.studio@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
