import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroMarquee from "@/components/IntroMarquee";
import ChoosingCard from "@/components/ChoosingCard";
import Approach from "@/components/Approach";
import Services from "@/components/Services";
// import FilmBlock from "@/components/FilmBlock"; // temporarily hidden
import Catalogue from "@/components/Catalogue";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <IntroMarquee />
      <ChoosingCard />
      <Approach />
      <Services />
      {/* <FilmBlock /> */}
      <Catalogue />
      <Results />
      <Testimonials />
      <About />
      <Faq />
      <Subscribe />
      <Footer />
    </main>
  );
}
