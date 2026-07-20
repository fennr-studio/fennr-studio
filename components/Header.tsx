"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { id: "approach", label: "Approach" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
];

function scrollToSection(sectionId: string, after?: () => void) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    after?.();
  }
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <span className="display-tight text-lg md:text-xl text-ink leading-none tracking-[0.04em]">
              FENNR STUDIO
            </span>
            <span className="numeral text-accent text-2xl leading-none -mb-1">
              .*
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="display-tight text-[13px] tracking-[0.06em] text-ink/85 hover:text-accent transition-smooth"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollToSection("contact")}
              className="display-tight text-[13px] tracking-[0.06em] text-ink/85 hover:text-accent transition-smooth flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={1.6} />
              <span>Brief (0)</span>
            </button>
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
                <button
                  key={item.id}
                  onClick={() =>
                    scrollToSection(item.id, () => setIsMobileMenuOpen(false))
                  }
                  className="text-left px-4 py-3 display-tight text-sm tracking-[0.06em] text-ink hover:text-accent transition-smooth"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-2 pt-2">
                <button
                  onClick={() =>
                    scrollToSection("contact", () => setIsMobileMenuOpen(false))
                  }
                  className="btn-accent w-full"
                >
                  Book a working call
                </button>
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
