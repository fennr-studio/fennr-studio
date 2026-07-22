export default function About() {
  return (
    <section id="about" className="relative bg-mist py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-16 w-[40rem] h-[40rem] rounded-full aura-accent opacity-70"
      />

      <div className="container-px max-w-[1400px] mx-auto relative">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent">About the studio</p>
          <h2 className="mt-4 display text-4xl md:text-5xl lg:text-[3.6rem] text-ink leading-[1.02]">
            <span className="block">Building brands</span>
            <span className="block heading-italic text-accent">with intent.</span>
          </h2>
          <p className="mt-6 text-ink/75 leading-relaxed text-base md:text-lg">
            Every project is a chance to push boundaries, tell a story, and make
            something memorable. Whether it&rsquo;s considered design or seamless
            technology, we&rsquo;re dedicated to work that resonates, and results
            you can measure.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-5 bg-ink text-mist rounded-3xl p-8 md:p-10 flex flex-col">
            <p className="eyebrow text-accent">Founder</p>
            <div className="mt-6 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder.jpg"
                alt="Gurnoor Singh"
                className="flex-none w-20 h-20 rounded-full object-cover bw-photo ring-2 ring-accent"
              />
              <div className="leading-tight">
                <p className="display-tight text-xl">Gurnoor Singh</p>
                <p className="text-sm text-mist/70">
                  Founder, fennr<span className="text-accent">.*</span>
                </p>
              </div>
            </div>
            <p className="mt-6 text-mist/80 leading-relaxed">
              An IIIT Guwahati graduate who worked as a Software Engineer in
              Blockchain, Gurnoor founded fennr to give owner-led businesses one
              team accountable for the whole thing: brand, website, and
              everything that makes it work. His photography has been exhibited
              at the State Gallery of Art, Hyderabad.
            </p>
            <a
              href="https://calendly.com/fennrstudio/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-8 inline-flex underline-accent heading-italic text-lg"
            >
              Get in touch
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-paper rounded-3xl ring-1 ring-hairline p-8 md:p-9">
              <p className="eyebrow text-accent">Our vision</p>
              <h3 className="mt-4 heading-md text-2xl text-ink leading-snug">
                Brands that leave a lasting impact.
              </h3>
              <p className="mt-4 text-ink/75 leading-relaxed">
                Strategic, visually compelling brand design that tells your
                story, builds trust, and sets you apart. From logos to full
                identity systems, we craft brands people remember.
              </p>
            </div>
            <div className="bg-paper rounded-3xl ring-1 ring-hairline p-8 md:p-9">
              <p className="eyebrow text-accent">Our mission</p>
              <h3 className="mt-4 heading-md text-2xl text-ink leading-snug">
                Websites that work as hard as you do.
              </h3>
              <p className="mt-4 text-ink/75 leading-relaxed">
                We craft high-performance websites that blend creativity with
                functionality. From sleek portfolios to powerful business sites,
                every build ensures a seamless experience end to end.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
