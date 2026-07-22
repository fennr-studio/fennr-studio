"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "919765190702";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi fennr, I'd like to talk about a project.",
)}`;
const CALENDLY_URL = "https://calendly.com/fennrstudio/15min";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
    </svg>
  );
}

const CHANNELS = [
  {
    key: "email",
    label: "Email",
    value: "hello@fennr.studio",
    href: "mailto:hello@fennr.studio",
    external: false,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: "Message us directly",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    key: "call",
    label: "Book a call",
    value: "15-min intro on Calendly",
    href: CALENDLY_URL,
    external: true,
  },
];

const INTERESTS = [
  "Website",
  "Branding",
  "SEO",
  "Photography",
  "Automation",
  "Not sure yet",
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.08 },
  }),
};

export default function ContactMain() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `New enquiry${name ? ` from ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company / website: ${company}` : null,
        picked.length ? `Interested in: ${picked.join(", ")}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `mailto:hello@fennr.studio?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main className="relative bg-mist overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 w-[42rem] h-[42rem] rounded-full aura-accent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 w-[40rem] h-[40rem] rounded-full aura-accent opacity-70"
      />

      <section className="relative container-px max-w-[1400px] mx-auto pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ---------- Left: statement + channels ---------- */}
          <div className="lg:col-span-5">
            <motion.div initial="hidden" animate="show" variants={fade} custom={0}>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex w-2 h-2 rounded-full bg-accent" />
                <span className="eyebrow text-ink">Get in touch</span>
              </div>

              <h1 className="display text-ink text-[13vw] sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem] leading-[0.95]">
                <span className="block">Let&rsquo;s build</span>
                <span className="block heading-italic text-accent normal-case">
                  something great.
                </span>
              </h1>

              <p className="mt-7 max-w-md text-ink/75 leading-relaxed text-base md:text-lg">
                Tell us about your project, or just say hello. A partner reads
                every message and replies within a day.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fade}
              custom={1}
              className="mt-10"
            >
              {CHANNELS.map((c, i) => (
                <a
                  key={c.key}
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`group flex items-center justify-between gap-4 py-5 border-t border-ink/12 ${
                    i === CHANNELS.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {c.key === "whatsapp" && (
                      <WhatsAppIcon className="w-5 h-5 text-ink/60 group-hover:text-accent transition-smooth" />
                    )}
                    <div>
                      <p className="eyebrow text-slatey">{c.label}</p>
                      <p className="mt-1 heading-md text-lg md:text-xl text-ink group-hover:text-accent transition-smooth">
                        {c.value}
                      </p>
                    </div>
                  </div>
                  <span className="flex-none w-10 h-10 rounded-full bg-ink text-accent inline-grid place-items-center group-hover:bg-accent group-hover:text-ink transition-smooth">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
                  </span>
                </a>
              ))}

              <div className="mt-8 flex items-start gap-3 text-sm text-ink/70 leading-relaxed">
                <MapPin className="w-4 h-4 mt-0.5 flex-none text-accent" strokeWidth={1.8} />
                <p>
                  Shivaji Nagar, Pune 411007 · India
                  <br />
                  Mon&ndash;Sat &middot; based in Pune, working worldwide.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ---------- Right: brief form ---------- */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            custom={2}
            className="lg:col-span-7"
          >
            <div className="relative bg-paper rounded-3xl shadow-elevated ring-1 ring-hairline p-6 md:p-10">
              <span
                aria-hidden="true"
                className="absolute -top-4 -right-4 numeral text-5xl text-accent leading-none"
              >
                *
              </span>

              <p className="eyebrow text-accent">Send a brief</p>
              <h2 className="mt-3 heading-md text-2xl md:text-[1.9rem] text-ink leading-snug">
                Start the conversation.
              </h2>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    aria-label="Your name"
                    className="input-flat"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    aria-label="Email address"
                    className="input-flat"
                  />
                </div>

                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company or website (optional)"
                  aria-label="Company or website"
                  className="input-flat"
                />

                <div className="mt-1">
                  <p className="eyebrow text-slatey mb-3">What do you need?</p>
                  <div className="flex flex-wrap gap-2.5">
                    {INTERESTS.map((s) => {
                      const on = picked.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggle(s)}
                          aria-pressed={on}
                          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 display-tight text-[11px] tracking-[0.05em] transition-smooth ring-1 ${
                            on
                              ? "bg-ink text-accent ring-ink"
                              : "bg-paper text-ink/70 ring-hairline hover:ring-ink"
                          }`}
                        >
                          {on && <Check className="w-3 h-3" strokeWidth={2.4} />}
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us a little about the project, timeline and anything else that helps."
                  aria-label="Project details"
                  className="textarea-flat mt-1"
                />

                <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="submit"
                    className="btn-accent h-[56px] px-8 text-base flex-none"
                  >
                    <span className="font-medium italic">Send brief</span>
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
                  </button>
                  {sent ? (
                    <span className="inline-flex items-center gap-2 text-sm text-ink">
                      <Check className="w-4 h-4 text-accent" strokeWidth={2.4} />
                      Opening your email app. Prefer WhatsApp? Message us anytime.
                    </span>
                  ) : (
                    <span className="text-xs text-slatey">
                      No spam, no sales sequence. A real person replies.
                    </span>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
