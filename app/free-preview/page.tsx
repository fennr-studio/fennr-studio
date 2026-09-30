import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreePreview from "@/components/FreePreview";
import { Faqs, JsonLd, NumberedList, Section } from "@/components/page/Blocks";
import { pageMetadata } from "@/lib/seo";
import { faqNode, pageGraph } from "@/lib/schema";

const DESCRIPTION =
  "See your website before you spend a rupee. Tell us about your business on WhatsApp and get a free website preview within 48 hours.";

export const metadata = pageMetadata({
  path: "/free-preview",
  title: "Free Website Preview Before You Pay",
  description: DESCRIPTION,
});

// Every answer here restates what the offer above already promises; nothing
// new is committed to on this page.
const FAQS = [
  {
    q: "What is the free website preview?",
    a: "A preview of what your website could look like, built from what you tell us about your business, so you can judge the direction before paying anything.",
  },
  {
    q: "How long does it take?",
    a: "We send the preview within 48 hours of your message. If you go ahead, the real site is typically live in about ten days.",
  },
  {
    q: "What do I need to send?",
    a: "Just your name and your business to start. If you have a logo, photos, a menu or an existing site, send those too — they make the preview closer to the real thing — but none of it is required.",
  },
  {
    q: "Is there any obligation?",
    a: "No. The preview is free. We only build the real site if you're happy with it and want to go ahead.",
  },
  {
    q: "Who is it for?",
    a: "Owner-led businesses that need a website or have one that isn't working — cafés and restaurants, clinics, villas and stays, boutiques, photographers and D2C brands.",
  },
];

export default function FreePreviewPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/free-preview",
          name: "Free website preview",
          description: DESCRIPTION,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Free preview", path: "/free-preview" },
          ],
          extra: [faqNode(FAQS)],
        })}
      />
      <Header />
      <main className="bg-mist">
        <FreePreview />
        <Section eyebrow="What's in a preview" title="What you'll see" aside>
          <NumberedList
            items={[
              { title: "Your business, not a template", body: "Built around what you tell us — your name, what you sell and who you sell to." },
              { title: "Mobile-first", body: "Shown the way most of your customers will see it: on a phone." },
              { title: "The one action that matters", body: "Booking, ordering, enquiring or messaging — placed where visitors expect it." },
              { title: "A clear next step", body: "If you like it, a scope and timeline for the real build. If not, no follow-up pressure." },
            ]}
          />
          <p className="mt-8 text-ink/75 leading-relaxed">
            Want to know more about how we design sites? See{" "}
            <Link href="/services/web-design" className="underline decoration-accent underline-offset-4">
              website design
            </Link>{" "}
            and{" "}
            <Link href="/work" className="underline decoration-accent underline-offset-4">
              our work
            </Link>
            .
          </p>
        </Section>
        <Section eyebrow="Questions" title="Free preview FAQs" aside>
          <Faqs items={FAQS} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
