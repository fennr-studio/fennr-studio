import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreePreview from "@/components/FreePreview";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/free-preview",
  title: "Free Website Preview for Your Business",
  description:
    "See your website before you spend a rupee. Tell us your business on WhatsApp and get a free preview of your site in 48 hours. Cafés, villas, clinics, photographers & D2C.",
});

export default function FreePreviewPage() {
  return (
    <>
      <Header />
      <FreePreview />
      <Footer />
    </>
  );
}
