import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BriefBuilder from "@/components/BriefBuilder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/brief",
  // The root layout appends " · Fennr Studio" via title.template, so the
  // studio name must not be repeated here.
  title: "Start a Project",
  description:
    "Build your brief in three quick steps: pick services, set a budget and timeline, and send it over. The first Strategy & Planning call is free.",
});

export default function BriefPage() {
  return (
    <>
      <Header />
      <BriefBuilder />
      <Footer />
    </>
  );
}
