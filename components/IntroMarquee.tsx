const CLIENTS = [
  "NORTHWIND",
  "ATELIÉR",
  "OAKMONT",
  "HALCYON",
  "MERIDIAN",
  "SOLÈNE",
  "KINFOLK",
  "BLACKBIRD",
  "LUMIÈRE",
  "STILLWATER",
];

export default function IntroMarquee() {
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section
      aria-label="Trusted by"
      className="relative bg-mist border-y border-ink/10 py-6"
    >
      <div className="overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee gap-12 md:gap-16 px-6">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none whitespace-nowrap display-tight text-base md:text-lg text-ink/55 hover:text-ink transition-smooth flex items-center gap-3 tracking-[0.08em]"
            >
              {name}
              <span className="numeral text-accent text-base leading-none -translate-y-0.5">*</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
