"use client";

import Link from "next/link";
import EmailSignupForm from "./EmailSignupForm";

const SITEMAP: { label: string; id?: string; href?: string }[] = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Brief" },
  { href: "/brief", label: "Start a project" },
];

const SOCIALS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "https://www.instagram.com/fennr.studio/" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer className="relative bg-mist border-t border-ink/10 pt-16 md:pt-20 pb-8">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-0.5 mb-6">
              <span className="display-tight text-2xl text-ink tracking-[0.04em]">
                FENNR<span className="text-accent">.</span>STUDIO
              </span>
              <span className="numeral text-accent text-3xl leading-none -mb-1.5">
                *
              </span>
            </div>

            <h3 className="display-tight text-2xl text-ink mb-5">
              Growth notes, monthly
            </h3>

            <EmailSignupForm
              placeholder="Enter your e-mail"
              cta="Sign Up"
              variant="inline"
            />

            <p className="mt-4 text-sm text-slatey max-w-sm leading-relaxed">
              Practical growth tips for small business owners. One email a
              month, no spam.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h3 className="display-tight text-base text-ink mb-5 tracking-[0.04em]">
              WEBSITE MAP
            </h3>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-6 text-ink/85">
              {SITEMAP.map((s) =>
                s.href ? (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      className="hover:text-accent transition-smooth"
                    >
                      {s.label}
                    </Link>
                  </li>
                ) : (
                  <li key={s.label}>
                    <button
                      onClick={() => scrollTo(s.id!)}
                      className="hover:text-accent transition-smooth"
                    >
                      {s.label}
                    </button>
                  </li>
                ),
              )}
            </ul>

            <h3 className="display-tight text-base text-ink mt-9 mb-5 tracking-[0.04em]">
              SOCIAL
            </h3>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-6 text-ink/85">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.href !== "#"
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="hover:text-accent transition-smooth"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="display-tight text-base text-ink mb-5 tracking-[0.04em]">
              CONTACTS
            </h3>
            <ul className="grid grid-cols-1 gap-y-2.5 text-ink/85">
              <li>
                <a
                  href="mailto:fennr.studio@gmail.com"
                  className="hover:text-accent transition-smooth"
                >
                  fennr.studio@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.fennr.studio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-smooth"
                >
                  www.fennr.studio.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919765190702"
                  className="hover:text-accent transition-smooth"
                >
                  IN: +91-9765190702
                </a>
              </li>
              <li className="text-ink/85">Pune, India · Studio 04</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-ink/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-slatey">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-block w-6 h-6 rounded-full bg-ink"
            />
            <p>© {new Date().getFullYear()} fennr. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                {...(s.href !== "#"
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={s.label}
                className="w-8 h-8 inline-flex items-center justify-center border border-hairline rounded-sm text-ink/70 hover:text-accent hover:border-accent transition-smooth text-[10px] tracking-[0.08em]"
              >
                {s.label.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>

          <div className="flex gap-5 text-xs">
            <a href="#privacy" className="hover:text-accent transition-smooth">
              Privacy
            </a>
            <a href="#terms" className="hover:text-accent transition-smooth">
              Terms
            </a>
            <a href="#cookies" className="hover:text-accent transition-smooth">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
