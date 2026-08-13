import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroMarquee from "@/components/IntroMarquee";
import ChoosingCard from "@/components/ChoosingCard";
import Approach from "@/components/Approach";
import Services from "@/components/Services";
// import FilmBlock from "@/components/FilmBlock"; // temporarily hidden
import Catalogue from "@/components/Catalogue";
import Results from "@/components/Results";
import Projects from "@/components/Projects";
// import Testimonials from "@/components/Testimonials"; // parked — bring back when real client quotes exist
import Work from "@/components/Work";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";
import { FAQ } from "@/lib/faq";

// Only the canonical — title, description and Open Graph come from the root
// layout, which is written for the homepage.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Emitted here rather than inside <Faq /> so it is rendered by the server and
// stays in sync with the questions actually on the page.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <Hero />
      <IntroMarquee />
      <ChoosingCard />
      <Projects />
      <Approach />
      <Services />
      {/* <FilmBlock /> */}
      <Catalogue />
      <Results />
      <Work />
      <About />
      <Faq />
      <Subscribe />
      <Footer />
    </main>
  );
}
