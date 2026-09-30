import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Next serves this with a real 404 status; noindex is belt and braces.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/industries", label: "Industries" },
  { href: "/locations/pune", label: "Pune studio" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <section className="container-px max-w-[1000px] mx-auto pt-36 md:pt-44 pb-24 md:pb-32">
          <p className="eyebrow text-ink/60">Error 404</p>
          <h1 className="mt-4 display text-ink text-[12vw] md:text-7xl leading-[0.95]">
            This page doesn&rsquo;t exist.
          </h1>
          <p className="mt-6 max-w-xl text-ink/75 leading-relaxed text-lg">
            The link may be old or mistyped. Here&rsquo;s where most people are headed:
          </p>
          <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-2xl bg-paper ring-1 ring-hairline px-5 py-4 display-tight text-sm tracking-[0.04em] text-ink hover:ring-ink transition-smooth"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
