import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const numeral = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-numeral",
});

const SITE_URL = "https://www.fennrstudio.com";
const DESCRIPTION =
  "fennr is a design & technology studio in Pune building websites, brands and growth for cafés, villas, clinics, photographers and D2C businesses. Start with a free strategy call.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "fennr.* — Web, Brand & Growth Studio for Small Businesses",
    template: "%s · fennr.*",
  },
  description: DESCRIPTION,
  keywords: [
    "web design Pune",
    "website development Pune",
    "branding studio India",
    "logo & identity design",
    "SEO for small business",
    "D2C website",
    "restaurant website",
    "photography portfolio website",
    "clinic website",
    "fennr studio",
  ],
  applicationName: "fennr.*",
  authors: [{ name: "Gurnoor Singh" }],
  creator: "fennr studio",
  publisher: "fennr studio",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "fennr.*",
    title: "fennr.* — Web, Brand & Growth Studio",
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "fennr.* — Web, Brand & Growth Studio",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "fennr",
  alternateName: "fennr studio",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/icon.png`,
  email: "fennr.studio@gmail.com",
  telephone: "+91-9765190702",
  description: DESCRIPTION,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shivaji Nagar",
    addressLocality: "Pune",
    postalCode: "411007",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
  founder: { "@type": "Person", name: "Gurnoor Singh" },
  sameAs: ["https://www.instagram.com/fennr.studio/"],
  knowsAbout: [
    "Web Development",
    "Logo & Identity Design",
    "SEO",
    "Photography",
    "Graphic Design",
    "Brand Strategy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${numeral.variable} min-h-screen bg-mist text-ink font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
