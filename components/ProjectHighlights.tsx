type Highlight = {
  src: string;
  label: string;
  caption: string;
  /** uniform height, mixed widths — keeps the strip from reading as a filmstrip */
  shape: "wide" | "narrow";
};

// Representative imagery (Unsplash licence), labelled by sector + service —
// never by client name, since these are not delivered client work.
// Swap in mockups of real builds and rename as those land.
const HIGHLIGHTS: Highlight[] = [
  { src: "/img/hl-web-desk.jpg", label: "Websites", caption: "Design + build", shape: "wide" },
  { src: "/img/hl-phone-app.jpg", label: "Mobile experience", caption: "Ordering · booking", shape: "narrow" },
  { src: "/img/hl-web-screens.jpg", label: "Cafés & restaurants", caption: "Menu · orders", shape: "wide" },
  { src: "/img/hl-billboard-street.jpg", label: "Out-of-home", caption: "Campaign design", shape: "narrow" },
  { src: "/img/hl-web-imac.jpg", label: "Studio & portfolio sites", caption: "Image-first build", shape: "wide" },
  { src: "/img/hl-web-laptop.jpg", label: "D2C storefronts", caption: "Shop · payments", shape: "narrow" },
  { src: "/img/hl-outdoor-ad.jpg", label: "Brand campaigns", caption: "Art direction", shape: "wide" },
  { src: "/img/hl-billboard.jpg", label: "Search & visibility", caption: "SEO · reach", shape: "narrow" },
];

function Card({ item }: { item: Highlight }) {
  return (
    <figure
      className={`group relative flex-none overflow-hidden rounded-xl bg-paper ring-1 ring-hairline shadow-soft ${
        item.shape === "wide"
          ? "w-[280px] md:w-[400px] lg:w-[480px]"
          : "w-[170px] md:w-[230px] lg:w-[270px]"
      }`}
    >
      <div className="relative h-[190px] md:h-[260px] lg:h-[300px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.label}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          draggable={false}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-accent mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-20"
        />
      </div>

      <figcaption className="flex items-baseline justify-between gap-4 px-4 py-3">
        <span className="display-tight text-[12px] tracking-[0.06em] text-ink">
          {item.label}
        </span>
        <span className="text-[11px] text-slatey whitespace-nowrap">
          {item.caption}
        </span>
      </figcaption>
    </figure>
  );
}

export default function ProjectHighlights() {
  // duplicated once so the -50% keyframe loops seamlessly
  const track = [...HIGHLIGHTS, ...HIGHLIGHTS];

  return (
    <section
      aria-label="Project highlights"
      className="relative bg-mist py-16 md:py-20 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full aura-accent opacity-60"
      />

      <p className="relative mb-10 text-center eyebrow text-ink/60">
        [ Project highlights ]
      </p>

      <div className="relative overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee-slow gap-5 md:gap-6 px-3 hover:[animation-play-state:paused]">
          {track.map((item, i) => (
            <Card key={`${item.src}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
