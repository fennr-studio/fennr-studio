"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

const WA_NUMBER = "919765190702";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
    </svg>
  );
}

const STEPS = [
  {
    no: "01",
    title: "Tell us your business",
    body: "One WhatsApp message. Your name, your business — that's it. 30 seconds.",
  },
  {
    no: "02",
    title: "We send a free preview",
    body: "Within 48 hours, we build a preview of what your website could actually look like. No charge.",
  },
  {
    no: "03",
    title: "Love it? We build it",
    body: "Only if you're happy, we build the real thing — 50% off this launch month, live in about 10 days.",
  },
];

const AUDIENCES = [
  "Cafés & restaurants",
  "Villas & stays",
  "Clinics & wellness",
  "Photographers",
  "D2C brands",
];

export default function FreePreview() {
  const [biz, setBiz] = useState("");
  const message = `Hi fennr! I'd like a free website preview for ${
    biz.trim() || "my business"
  }. What do you need from me?`;
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  // Log the request (name + email optional) before WhatsApp opens — fire and forget.
  const logLead = () => {
    const name = biz.trim();
    if (!name) return;
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email: "preview@lead.pending",
        interests: ["Free preview"],
        source: "free-preview",
        message: `Free preview requested for: ${name}`,
      }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <main className="relative bg-mist overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 w-[42rem] h-[42rem] rounded-full aura-accent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 w-[40rem] h-[40rem] rounded-full aura-accent opacity-70"
      />

      {/* ---------- Hero / offer ---------- */}
      <section className="relative container-px max-w-[1000px] mx-auto pt-32 md:pt-40 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-ink text-accent display-tight text-[11px] tracking-[0.18em] px-4 py-2">
            FREE · NO COMMITMENT
          </span>

          <h1 className="mt-8 display text-ink text-[12vw] sm:text-6xl lg:text-[5rem] leading-[0.95]">
            See your website{" "}
            <span className="heading-italic text-accent normal-case">
              before you spend a rupee.
            </span>
          </h1>

          <p className="mt-7 max-w-xl mx-auto text-ink/75 leading-relaxed text-base md:text-lg">
            Tell us your business and we&rsquo;ll build you a free preview of
            what your website could look like. Love it? We build the real thing
            &mdash; 50% off this launch month.
          </p>
        </motion.div>

        {/* input + WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-10 max-w-lg mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <input
              type="text"
              value={biz}
              onChange={(e) => setBiz(e.target.value)}
              placeholder="Your business name (café, villa, studio…)"
              aria-label="Your business name"
              className="input-flat flex-1 min-w-0 text-center sm:text-left"
            />
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={logLead}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent text-ink font-semibold h-[56px] px-7 hover:bg-ink hover:text-accent transition-smooth flex-none"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Get my free preview
            </a>
          </div>
          <p className="mt-4 text-xs text-slatey">
            Opens WhatsApp with your message ready. A real person replies &mdash;
            no bots, no spam, no obligation.
          </p>
        </motion.div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="relative container-px max-w-[1100px] mx-auto py-16 md:py-20">
        <p className="eyebrow text-accent text-center">How it works</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div
              key={s.no}
              className="bg-paper rounded-3xl ring-1 ring-hairline p-8 shadow-soft"
            >
              <span className="numeral text-accent text-4xl leading-none">
                №{s.no}
              </span>
              <h3 className="mt-4 heading-md text-xl text-ink leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-ink/75 leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Who it's for + final CTA ---------- */}
      <section className="relative container-px max-w-[1000px] mx-auto pb-24 md:pb-32 text-center">
        <p className="eyebrow text-accent">Built for</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          {AUDIENCES.map((a) => (
            <span
              key={a}
              className="inline-flex items-center rounded-full ring-1 ring-hairline bg-paper px-4 py-2 display-tight text-xs tracking-[0.04em] text-ink/75"
            >
              {a}
            </span>
          ))}
        </div>

        <div className="mt-10 max-w-xl mx-auto flex flex-col items-center gap-4 text-ink/75 text-sm">
          {[
            "See exactly how your site looks before paying",
            "Your own domain, mobile-first, loads fast",
            "Enquiries & bookings straight to WhatsApp",
          ].map((line) => (
            <div key={line} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-ink text-accent inline-grid place-items-center flex-none">
                <Check className="w-3.5 h-3.5" strokeWidth={2.6} />
              </span>
              {line}
            </div>
          ))}
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
              onClick={logLead}
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-md bg-accent text-ink font-semibold h-[56px] px-8 hover:bg-ink hover:text-accent transition-smooth"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Get my free preview
        </a>
      </section>
    </main>
  );
}
