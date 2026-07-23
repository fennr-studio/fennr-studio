"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  Code2,
  Compass,
  Loader2,
  Palette,
  PenTool,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/919765190702?text=" +
  encodeURIComponent("Hi fennr, I'd like to talk about a project.");
const CALENDLY_URL = "https://calendly.com/fennrstudio/15min";

const SERVICES = [
  { name: "Web Development", desc: "Site, WhatsApp, payments, API", Icon: Code2 },
  { name: "Logo & Identity", desc: "Logo systems, brand boards", Icon: Palette },
  { name: "SEO & Visibility", desc: "Search, analytics, rankings", Icon: TrendingUp },
  { name: "Photography", desc: "Product, food, spaces", Icon: Camera },
  { name: "Graphic Design", desc: "Social, print, campaigns", Icon: PenTool },
  { name: "Brand Strategy", desc: "Positioning, naming, moodboards", Icon: Compass },
];

const BUDGETS = ["Under ₹50k", "₹50k – ₹1L", "₹1L – ₹3L", "₹3L+", "Not sure yet"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];

const STEPS = ["Services", "Scope", "Details"];

export default function BriefBuilder() {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleService = (s: string) =>
    setServices((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canNext = step === 0 ? services.length > 0 : step === 1 ? !!budget : true;
  const canSubmit = name.trim() !== "" && emailOk;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          interests: services,
          budget,
          timeline,
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <main className="relative bg-mist overflow-hidden min-h-screen">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 w-[42rem] h-[42rem] rounded-full aura-accent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 w-[40rem] h-[40rem] rounded-full aura-accent opacity-70"
      />

      <section className="relative container-px max-w-[980px] mx-auto pt-32 md:pt-36 pb-24 md:pb-32">
        {status === "sent" ? (
          <Confirmation />
        ) : (
          <>
            {/* ---------- Heading ---------- */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex w-2 h-2 rounded-full bg-accent" />
              <span className="eyebrow text-ink">Start your project</span>
            </div>
            <h1 className="display text-ink text-[11vw] sm:text-5xl lg:text-[3.6rem] leading-[0.98]">
              Build your{" "}
              <span className="heading-italic text-accent normal-case">brief.</span>
            </h1>
            <p className="mt-4 max-w-lg text-ink/75 leading-relaxed">
              Three quick steps. No obligation, and the first Strategy &amp;
              Planning call is free.
            </p>

            {/* ---------- Progress ---------- */}
            <div className="mt-10 mb-10">
              <div className="flex items-center justify-between mb-3">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      className={`numeral text-lg ${i <= step ? "text-ink" : "text-ink/30"}`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`display-tight text-[11px] tracking-[0.08em] ${
                        i <= step ? "text-ink" : "text-ink/30"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-[3px] bg-ink/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent origin-left rounded-full"
                  initial={false}
                  animate={{ scaleX: (step + 1) / STEPS.length }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </div>

            {/* ---------- Steps ---------- */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step === 0 && (
                    <StepServices selected={services} onToggle={toggleService} />
                  )}
                  {step === 1 && (
                    <StepScope
                      budget={budget}
                      setBudget={setBudget}
                      timeline={timeline}
                      setTimeline={setTimeline}
                    />
                  )}
                  {step === 2 && (
                    <StepDetails
                      name={name}
                      setName={setName}
                      email={email}
                      setEmail={setEmail}
                      company={company}
                      setCompany={setCompany}
                      message={message}
                      setMessage={setMessage}
                      services={services}
                      budget={budget}
                      timeline={timeline}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ---------- Nav ---------- */}
            <div className="mt-10 flex items-center justify-between gap-4">
              {step > 0 ? (
                <button
                  onClick={back}
                  className="inline-flex items-center gap-2 display-tight text-sm tracking-[0.05em] text-ink/70 hover:text-ink transition-smooth"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.6} />
                  Back
                </button>
              ) : (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 display-tight text-sm tracking-[0.05em] text-ink/60 hover:text-ink transition-smooth"
                >
                  Prefer a quick message?
                </a>
              )}

              {step < STEPS.length - 1 ? (
                <button
                  onClick={next}
                  disabled={!canNext}
                  className="btn-accent h-[52px] px-7 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="font-medium italic">Continue</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!canSubmit || status === "loading"}
                  className="btn-accent h-[52px] px-7 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="font-medium italic">Sending</span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium italic">Send brief</span>
                      <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
                    </>
                  )}
                </button>
              )}
            </div>

            {status === "error" && (
              <p className="mt-5 text-sm text-ink/80 text-right">
                {errorMsg} Email{" "}
                <a href="mailto:hello@fennr.studio" className="underline-accent">
                  hello@fennr.studio
                </a>{" "}
                or WhatsApp us.
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}

/* ---------- Step 1: services ---------- */
function StepServices({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (s: string) => void;
}) {
  return (
    <div>
      <h2 className="heading-md text-2xl md:text-3xl text-ink">What do you need?</h2>
      <p className="mt-2 text-ink/70">Pick everything that applies — one, a few, or all.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map(({ name, desc, Icon }) => {
          const on = selected.includes(name);
          return (
            <button
              key={name}
              type="button"
              onClick={() => onToggle(name)}
              aria-pressed={on}
              className={`group relative text-left rounded-2xl p-5 ring-1 transition-smooth ${
                on
                  ? "bg-ink text-mist ring-ink"
                  : "bg-paper ring-hairline hover:ring-ink"
              }`}
            >
              <div className="flex items-start justify-between">
                <Icon
                  className={`w-6 h-6 ${on ? "text-accent" : "text-ink"}`}
                  strokeWidth={1.6}
                />
                <span
                  className={`w-6 h-6 rounded-full inline-grid place-items-center transition-smooth ${
                    on
                      ? "bg-accent text-ink"
                      : "ring-1 ring-hairline text-transparent group-hover:ring-ink"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={2.6} />
                </span>
              </div>
              <p
                className={`mt-4 display-tight text-sm tracking-[0.03em] ${
                  on ? "text-mist" : "text-ink"
                }`}
              >
                {name}
              </p>
              <p className={`mt-1 text-xs ${on ? "text-mist/70" : "text-slatey"}`}>
                {desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Step 2: scope ---------- */
function Chip({
  label,
  on,
  onClick,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 display-tight text-xs tracking-[0.04em] transition-smooth ring-1 ${
        on ? "bg-ink text-accent ring-ink" : "bg-paper text-ink/75 ring-hairline hover:ring-ink"
      }`}
    >
      {on && <Check className="w-3 h-3" strokeWidth={2.6} />}
      {label}
    </button>
  );
}

function StepScope({
  budget,
  setBudget,
  timeline,
  setTimeline,
}: {
  budget: string;
  setBudget: (s: string) => void;
  timeline: string;
  setTimeline: (s: string) => void;
}) {
  return (
    <div>
      <h2 className="heading-md text-2xl md:text-3xl text-ink">Scope &amp; timing</h2>
      <p className="mt-2 text-ink/70">
        A rough range is fine — it just helps us prescribe the right tier.
      </p>

      <div className="mt-8">
        <p className="eyebrow text-slatey mb-3">Budget</p>
        <div className="flex flex-wrap gap-2.5">
          {BUDGETS.map((b) => (
            <Chip key={b} label={b} on={budget === b} onClick={() => setBudget(b)} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="eyebrow text-slatey mb-3">Timeline</p>
        <div className="flex flex-wrap gap-2.5">
          {TIMELINES.map((t) => (
            <Chip key={t} label={t} on={timeline === t} onClick={() => setTimeline(t)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 3: details ---------- */
function StepDetails({
  name,
  setName,
  email,
  setEmail,
  company,
  setCompany,
  message,
  setMessage,
  services,
  budget,
  timeline,
}: {
  name: string;
  setName: (s: string) => void;
  email: string;
  setEmail: (s: string) => void;
  company: string;
  setCompany: (s: string) => void;
  message: string;
  setMessage: (s: string) => void;
  services: string[];
  budget: string;
  timeline: string;
}) {
  const summary = [
    services.length ? services.join(", ") : null,
    budget || null,
    timeline || null,
  ].filter(Boolean) as string[];

  return (
    <div>
      <h2 className="heading-md text-2xl md:text-3xl text-ink">Almost there.</h2>
      <p className="mt-2 text-ink/70">
        Where should we send the plan? A partner reads every brief.
      </p>

      {summary.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {summary.map((s) => (
            <span
              key={s}
              className="inline-flex items-center rounded-full bg-accent/20 ring-1 ring-accent/40 px-3 py-1 text-xs text-ink"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <form className="mt-7 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
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
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Anything else that helps — goals, links, references (optional)."
          aria-label="Project details"
          className="textarea-flat"
        />
      </form>
    </div>
  );
}

/* ---------- Success ---------- */
function Confirmation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-xl mx-auto py-10"
    >
      <span className="inline-grid place-items-center w-16 h-16 rounded-full bg-ink text-accent">
        <Check className="w-7 h-7" strokeWidth={2.2} />
      </span>
      <h1 className="mt-8 display text-ink text-5xl md:text-6xl leading-[0.95]">
        Brief{" "}
        <span className="heading-italic text-accent normal-case">received.</span>
      </h1>
      <p className="mt-5 text-ink/75 leading-relaxed text-lg">
        Thank you. A partner will read it and reply within a day, usually with a
        first thought or two and a link to book your free Strategy &amp; Planning
        call.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ink h-[52px] px-7"
        >
          Book the free call
          <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-accent text-ink font-medium px-6 h-[52px] hover:bg-ink hover:text-accent transition-smooth"
        >
          Message on WhatsApp
        </a>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block underline-accent display-tight text-sm tracking-[0.05em]"
      >
        Back to home
      </Link>
    </motion.div>
  );
}
