import type { ReactNode } from "react";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="relative bg-mist overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 w-[40rem] h-[40rem] rounded-full aura-accent opacity-60"
      />
      <section className="relative container-px max-w-[820px] mx-auto pt-32 md:pt-40 pb-24 md:pb-32">
        <p className="eyebrow text-accent">Legal</p>
        <h1 className="mt-4 display text-ink text-[11vw] sm:text-5xl lg:text-[3.6rem] leading-[1.0]">
          {title}
        </h1>
        <p className="mt-4 text-sm text-slatey">Last updated: {updated}</p>

        <div className="legal-prose mt-12 text-ink/80 leading-relaxed">
          {children}
        </div>
      </section>
    </main>
  );
}
