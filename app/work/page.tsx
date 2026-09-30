import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CaseCards, CtaBand, JsonLd, PageHero, PrimaryCtas, Section } from "@/components/page/Blocks";
import { CASE_STUDIES } from "@/lib/case-studies";
import { abs, pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";

const DESCRIPTION =
  "Fennr Studio case studies: Photowalks in Pune, Tekton, Dentora, VillaVista, West Village Café and Beyond the Frame — websites and brands, with live links.";

export const metadata = pageMetadata({
  path: "/work",
  title: "Our Work — Website & Brand Case Studies",
  description: DESCRIPTION,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/work",
          type: "CollectionPage",
          name: "Our work",
          description: DESCRIPTION,
          crumbs,
          main: {
            "@type": "ItemList",
            itemListElement: CASE_STUDIES.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.title,
              url: abs(`/work/${c.path}`),
            })),
          },
        })}
      />
      <Header />
      <main className="relative bg-mist overflow-hidden">
        <PageHero
          crumbs={crumbs}
          eyebrow="Work"
          title="Real projects, live on the web"
          intro={
            <>
              <p>
                Every project here is real Fennr Studio work and links to the live site —
                a Pune community platform, a Hyderabad recruitment firm, a dental clinic,
                a resort, a café and a photographer&rsquo;s portfolio.
              </p>
              <p>
                Each case study covers the context, what had to change, how we approached
                it and what we built. We don&rsquo;t publish numbers we can&rsquo;t stand
                behind.
              </p>
            </>
          }
        >
          <PrimaryCtas />
        </PageHero>
        <Section eyebrow="Case studies" title="Selected work">
          <CaseCards studies={CASE_STUDIES} />
        </Section>
        <CtaBand
          title="You could be next."
          body={<p>Tell us about your business — the first strategy call is free.</p>}
        />
      </main>
      <Footer />
    </>
  );
}
