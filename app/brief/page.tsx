import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BriefBuilder from "@/components/BriefBuilder";

export const metadata: Metadata = {
  title: "Start a project — fennr.* studio",
  description:
    "Build your brief in three quick steps: pick services, set a budget and timeline, and send it over. The first Strategy & Planning call is free.",
};

export default function BriefPage() {
  return (
    <>
      <Header />
      <BriefBuilder />
      <Footer />
    </>
  );
}
