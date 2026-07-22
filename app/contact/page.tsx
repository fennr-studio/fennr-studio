import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactMain from "@/components/ContactMain";

export const metadata: Metadata = {
  title: "Contact — fennr.* studio",
  description:
    "Start a project with fennr. Book a 15-minute call, message us on WhatsApp, or send a brief. A partner reads every message and replies within a day.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactMain />
      <Footer />
    </>
  );
}
