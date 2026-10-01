/**
 * Industry pages (/industries/[slug]).
 *
 * Only industries with real project evidence get a page — each one links at
 * least one case study. D2C, startups, real estate and consultants are served
 * (see lib/faq.ts) but have no case study yet; add them here when they do,
 * not before, or the page is a template with a different noun.
 */
import type { ServiceSlug } from "./case-studies";

export type Industry = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  cardBody: string;
  intro: string[];
  needs: { title: string; body: string }[];
  features: string[];
  integrations: string[];
  seo: string[];
  services: ServiceSlug[];
  /** CaseStudy.slug values */
  work: string[];
  faqs: { q: string; a: string }[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants & Cafés",
    title: "Restaurant & Café Website Design in Pune",
    description:
      "Websites, branding, menus, online ordering and local SEO for restaurants, cafés and cloud kitchens in Pune — built to fill tables and take orders directly.",
    h1: "Restaurant and café websites that fill tables and take orders",
    cardBody:
      "Menus that stay current, direct ordering and reservations, and the local search presence that brings people through the door.",
    intro: [
      "Most people decide where to eat on their phone, often within a few hundred metres of the door. A restaurant website has three jobs: be found by people nearby, show a menu that is actually current, and make booking or ordering take seconds.",
      "Fennr Studio designs and builds restaurant and café websites in Pune, together with the brand, menu design and food photography that make them work — and the local SEO that gets them found.",
    ],
    needs: [
      {
        title: "A menu that is never out of date",
        body: "A PDF menu from last year costs trust. An editable web menu lets you change prices, add specials and mark sold-out items yourself.",
      },
      {
        title: "Direct orders and reservations",
        body: "Every order through an aggregator costs a commission. A short, mobile-first ordering or reservation flow on your own site — or over WhatsApp — keeps more of each sale.",
      },
      {
        title: "Being found nearby",
        body: "A complete Google Business Profile, consistent address and hours everywhere, and a website that confirms what the listing says.",
      },
      {
        title: "Food that looks as good as it tastes",
        body: "Real food and ambience photography does more for bookings than any amount of copy.",
      },
    ],
    features: [
      "Mobile-first menu with categories, dietary tags and specials",
      "Online ordering or WhatsApp ordering",
      "Table reservation or enquiry flow",
      "Opening hours, directions and click-to-call",
      "Gallery of food and space",
      "Events and private-dining enquiries",
    ],
    integrations: ["WhatsApp ordering and notifications", "Payment gateways (UPI, cards)", "Google Business Profile", "Reservation tools"],
    seo: [
      "Google Business Profile: categories, menu link, photos, hours",
      "Restaurant structured data with address, cuisine and hours",
      "Pages for private dining, catering or events if you offer them",
      "Consistent name, address and phone across listings",
    ],
    services: ["web-design", "branding", "photography", "local-seo"],
    work: ["cafe"],
    faqs: [
      {
        q: "Can customers order directly from my website?",
        a: "Yes — through an ordering flow on the site, over WhatsApp, or both, with payment by UPI or card.",
      },
      {
        q: "Can I update the menu myself?",
        a: "Yes. Menus are built to be editable, so prices, specials and availability don't need a developer.",
      },
      {
        q: "Do you do menu design and food photography too?",
        a: "Yes. Menu and signage design sit within branding, and food photography is shot in Pune.",
      },
    ],
  },
  {
    slug: "clinics",
    name: "Clinics & Healthcare",
    title: "Clinic & Dental Website Design in Pune",
    description:
      "Calm, credible, booking-first websites for dental clinics, doctors and wellness practices in Pune — with appointment booking, patient FAQs and local SEO.",
    h1: "Clinic and dental websites that reassure first and book second",
    cardBody:
      "Calm, credible sites with services, specialists, timings and one-tap appointments — plus the local search presence patients use to choose.",
    intro: [
      "Patients choose a clinic on trust. They look for who the doctors are, what treatments are offered, when the clinic is open, and how easy it is to book — usually on a phone, often while anxious.",
      "Fennr Studio builds clinic and dental websites designed to reassure: calm design, clear answers, real photographs of the practice, and booking available from every page.",
    ],
    needs: [
      {
        title: "Trust before anything else",
        body: "Specialists with real photos and credentials, a clear list of treatments, and a tone that calms rather than sells.",
      },
      {
        title: "Booking that's always one tap away",
        body: "A persistent appointment button and a short booking form, or a WhatsApp booking flow.",
      },
      {
        title: "Answers before the phone call",
        body: "Treatment pages and FAQs that answer what patients actually ask — procedure, recovery, timings.",
      },
      {
        title: "Local visibility",
        body: "Most patients search for a clinic near them. Your Business Profile and site need to agree on every detail.",
      },
    ],
    features: [
      "Treatment and service pages",
      "Doctor and specialist profiles",
      "Appointment booking form or WhatsApp booking",
      "Timings, directions and click-to-call",
      "Patient FAQs",
      "Articles and patient education",
    ],
    integrations: ["WhatsApp appointment reminders", "Booking and calendar tools", "Google Business Profile"],
    seo: [
      "Google Business Profile for the practice",
      "Treatment pages matched to what patients search",
      "Clear, accurate medical content reviewed by the practitioner",
      "Consistent practice details across directories",
    ],
    services: ["web-design", "web-development", "local-seo", "photography"],
    work: ["dentora"],
    faqs: [
      {
        q: "Can patients book appointments online?",
        a: "Yes — through a booking form on the site, a WhatsApp flow, or a connection to the booking tool you already use.",
      },
      {
        q: "Who writes the medical content?",
        a: "We structure and write it with you, but treatment content should be reviewed and approved by the practitioner before it goes live.",
      },
      {
        q: "Can the site show multiple doctors and specialities?",
        a: "Yes. Specialist profiles and per-treatment pages are standard for clinic sites.",
      },
    ],
  },
  {
    slug: "hospitality",
    name: "Hotels, Villas & Resorts",
    title: "Hotel, Villa & Resort Website Design",
    description:
      "Booking-led websites for villas, resorts and boutique stays — full-bleed photography, rooms and dining, and direct booking that reduces reliance on aggregators.",
    h1: "Hotel, villa and resort websites built to win the direct booking",
    cardBody:
      "Booking-led sites with full-bleed photography of rooms, dining and grounds, and enquiry or booking a tap away.",
    intro: [
      "Guests often find a property on an aggregator, then search for it by name before booking. If the property's own website looks weaker than the listing, they go back and book there — and the property pays commission.",
      "Fennr Studio builds websites for villas, resorts and boutique stays that make the direct booking the better choice: photography that sells the stay, rooms and dining presented clearly, and booking reachable from everywhere.",
    ],
    needs: [
      {
        title: "Photography that sells the feeling",
        body: "Rooms, food and grounds shot and art-directed like a magazine — the single biggest factor in whether a guest books.",
      },
      {
        title: "Direct booking, everywhere",
        body: "Booking or enquiry available from every page, not buried at the end.",
      },
      {
        title: "Clear room and rate information",
        body: "Room types, amenities, capacity and what's included, without making guests hunt.",
      },
      {
        title: "Being found by name and by area",
        body: "A site that ranks for the property's own name and for the area it's in.",
      },
    ],
    features: [
      "Room and villa pages with galleries",
      "Direct booking engine or enquiry flow",
      "Dining, experiences and amenities",
      "Location, directions and nearby attractions",
      "WhatsApp enquiry",
    ],
    integrations: ["Booking engines", "WhatsApp enquiries", "Payment gateways", "Google Business Profile"],
    seo: [
      "Ranking for the property's own name",
      "Hotel structured data",
      "Location and experience pages with real, useful information",
      "Consistent details across travel and map listings",
    ],
    services: ["web-design", "web-development", "photography", "branding"],
    work: ["villavista"],
    faqs: [
      {
        q: "Can you connect our existing booking engine?",
        a: "Usually, yes. We integrate with the booking engine you use, or build a simpler enquiry flow if that suits the property better.",
      },
      {
        q: "Do you photograph the property?",
        a: "Yes — rooms, dining and grounds. Shoots in Pune are straightforward; elsewhere we plan a travel day into the scope.",
      },
    ],
  },
  {
    slug: "photographers",
    name: "Photographers & Creatives",
    title: "Photography Portfolio Website Design",
    description:
      "Fast, image-first portfolio websites and community platforms for photographers and creatives — full-bleed galleries that stay quick on a phone over mobile data.",
    h1: "Portfolio websites for photographers that let the work breathe",
    cardBody:
      "Image-first portfolios and community platforms — full-bleed galleries that stay fast on a phone over mobile data.",
    intro: [
      "Social platforms crop, compress and bury photographs between ads. A photographer's own website is the one place the work is shown exactly as intended — if it's fast.",
      "Fennr Studio is run by a photographer, and builds portfolio sites and photography platforms where the images come first and performance is part of the design, not an afterthought.",
    ],
    needs: [
      {
        title: "Images first, interface second",
        body: "Full-bleed frames, quiet typography, and nothing competing with the work.",
      },
      {
        title: "Speed with large images",
        body: "Correctly sized, modern image formats per device so galleries load fast over mobile data.",
      },
      {
        title: "Easy to update",
        body: "Adding a new series shouldn't mean editing code.",
      },
      {
        title: "Enquiries and bookings",
        body: "A clear route from admiring the work to getting in touch.",
      },
    ],
    features: [
      "Series and project galleries",
      "Full-screen image viewer",
      "About and client pages",
      "Enquiry or booking form",
      "For communities: member accounts, profiles and a credited photo archive",
    ],
    integrations: ["Image CDN and optimisation", "Contact and booking forms", "Accounts and member areas (Supabase)"],
    seo: [
      "Descriptive image filenames and alt text",
      "Image sitemaps and structured data",
      "Series pages with real captions and context",
      "Fast Core Web Vitals despite heavy imagery",
    ],
    services: ["web-design", "custom-software", "seo"],
    work: ["portfolio", "photowalks"],
    faqs: [
      {
        q: "Will a portfolio with lots of large photos be slow?",
        a: "Not if it's built properly. Images are served at the right size for each device in modern formats, and loaded as they're needed.",
      },
      {
        q: "Can you build a platform for a photography community?",
        a: "Yes — Photowalks in Pune has member accounts, photographer pages, walk registrations and a searchable, credited photo archive.",
      },
    ],
  },
];

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
