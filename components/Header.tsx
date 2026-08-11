"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Every entry is a real href so crawlers see links and the URLs are
// shareable. Same-page section links keep the smooth scroll via onClick.
const NAV: { href: string; label: string }[] = [
  { href: "/#services", label: "Services" },
  { href: "/who-we-help", label: "Who we help" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
];

/**
 * Smooth-scroll only when the target section is on the current page —
 * otherwise let the browser follow the href and load /#section normally.
 */
function useSectionScroll(after?: () => void) {
  return (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.startsWith("/#") ? href.slice(2) : null;
    if (!id) {
      after?.();
      return;
    }
    const el = document.getElementById(id);
    if (!el) return; // not on this page — the href does the work
    event.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", href);
    after?.();
  };
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const onSectionClick = useSectionScroll();
  const onMobileSectionClick = useSectionScroll(() => setIsMobileMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-mist/90 backdrop-blur-xl" : "bg-mist"
      }`}
    >
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-baseline gap-0.5">
            <span className="sr-only">Fennr Studio — home</span>
            <span
              aria-hidden="true"
              className="display-tight text-lg md:text-xl text-ink leading-none tracking-[0.04em]"
            >
              FENNR<span className="text-accent">.</span>STUDIO
            </span>
            <span className="numeral text-accent text-2xl leading-none -mb-1">
              *
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => onSectionClick(e, item.href)}
                className="display-tight text-[13px] tracking-[0.06em] text-ink/85 hover:text-accent transition-smooth"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              href="/brief"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink text-accent px-5 py-2.5 display-tight text-[12px] tracking-[0.06em] hover:bg-accent hover:text-ink transition-smooth"
            >
              Start a project
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-ink"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div className="hidden md:block divider-rule" />

        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 pt-2">
            <div className="flex flex-col bg-paper rounded-md p-2 shadow-soft">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => onMobileSectionClick(e, item.href)}
                  className="text-left px-4 py-3 display-tight text-sm tracking-[0.06em] text-ink hover:text-accent transition-smooth"
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-2 pt-2">
                <Link
                  href="/brief"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-accent w-full"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>

      <span
        aria-hidden="true"
        className="hidden md:block fixed top-0 right-0 bottom-0 w-1 bg-accent z-40"
      />
    </header>
  );
}
