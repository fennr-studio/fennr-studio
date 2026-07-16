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

export const metadata: Metadata = {
  title: "fennr.* — Premium Digital Growth Studio",
  description:
    "fennr is a premium digital growth studio shaping strategy, transformation and growth for founders who refuse to coast.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${numeral.variable} min-h-screen bg-mist text-ink font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
