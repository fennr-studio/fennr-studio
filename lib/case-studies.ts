/**
 * Case studies shown in the <Projects /> section.
 *
 * Every entry is real Fennr work and links to the live site. `shots` are
 * screenshots of that site captured at 1440×900 (a/c/d) and 390×844 (b) and
 * live in /public/img as case-<slug>-{a,b,c,d}.jpg.
 *
 * `aside` is the card in the left rail. Use kind "quote" only for a quote a
 * client has actually given us and approved — everything else uses "brief",
 * which says what the job was in our own voice.
 */
export type CaseStudy = {
  slug: string;
  /** Small label above the title — the client, not the URL. */
  client: string;
  title: string;
  href: string;
  /** Block background behind the screenshots, pulled from the site's own palette. */
  accent: string;
  /** Set when `accent` is light, so the chips bar keeps its contrast. */
  lightBlock?: boolean;
  /** Ticker along the bottom of the block. */
  deliverables: string[];
  /** Pills under the title. */
  tags: string[];
  aside:
    | { kind: "brief"; text: string }
    | { kind: "quote"; text: string; name: string; role: string; avatar: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "tekton",
    client: "Tekton Talent Solutions",
    title: "Tekton: Enterprise Tech Recruitment, Said at Full Volume",
    href: "https://tekton-talent-solutions.vercel.app",
    accent: "#1F3B2E",
    deliverables: [
      "Brand direction",
      "Website design",
      "Website dev.",
      "Motion",
      "Copywriting",
      "SEO",
    ],
    tags: [
      "Website design & development",
      "Editorial art direction",
      "B2B positioning & copy",
    ],
    aside: {
      kind: "brief",
      text: "A Hyderabad recruitment firm placing engineers across India, with nothing online to prove it. We built a type-led site that states the offer at full size on the first screen, then walks enterprise buyers through how the work actually happens — source, screen, deliver, support.",
    },
  },
  {
    slug: "photowalks",
    client: "Photowalks in Pune",
    title: "Photowalks in Pune: A Community Platform for Walks, Members & the Archive",
    href: "https://photowalks-in-pune-gold.vercel.app",
    accent: "#E7E1D5",
    lightBlock: true,
    deliverables: [
      "Brand design",
      "Product design",
      "Website dev.",
      "Accounts & auth",
      "Photo archive",
      "SEO",
    ],
    tags: [
      "Product design & strategy",
      "Website design & development",
      "Community & member systems",
    ],
    aside: {
      kind: "brief",
      text: "A photo-walk community that lived entirely in group chats. We gave it a home: a walks calendar with real registrations, member accounts, photographer pages, story write-ups, and a searchable archive of every frame shot on a walk — credited to the person who took it.",
    },
  },
  {
    slug: "dentora",
    client: "Dentora",
    title: "Dentora: A Calm, Booking-First Site for a Modern Dental Clinic",
    href: "https://dentora-site-nine.vercel.app",
    accent: "#5E6B73",
    deliverables: [
      "Website design",
      "Website dev.",
      "Booking flow",
      "Motion",
      "Content",
      "Local SEO",
    ],
    tags: [
      "Website design & development",
      "Conversion & booking flow",
      "Local SEO",
    ],
    aside: {
      kind: "brief",
      text: "Dental sites tend to shout. This one had to do the opposite — cinematic, unhurried, and reassuring for a nervous patient. Services, specialists, insights and FAQs all sit one tap from Book an Appointment, which never leaves the screen.",
    },
  },
  {
    slug: "villavista",
    client: "VillaVista",
    title: "VillaVista: A Luxury Resort Site With Rooms, Dining & Direct Booking",
    href: "https://villavista-tawny.vercel.app",
    accent: "#4C5A4E",
    deliverables: [
      "Website design",
      "Website dev.",
      "Booking flow",
      "Photo art direction",
    ],
    tags: [
      "Website design & development",
      "Direct booking flow",
      "Hospitality branding",
    ],
    aside: {
      kind: "brief",
      text: "Every booking through an aggregator costs the property a cut. We built a resort site that earns the direct booking instead — rooms, dining and the grounds shot like a magazine, with reservations reachable from any point on the page.",
    },
  },
  {
    slug: "cafe",
    client: "West Village Café",
    title: "West Village Café: A Neighbourhood Brand, Menu & Online Ordering",
    href: "https://west-village-cafe.vercel.app",
    accent: "#7E4A1E",
    deliverables: [
      "Brand & identity",
      "Website design",
      "Website dev.",
      "Menu & ordering",
      "Local SEO",
    ],
    tags: [
      "Brand & identity",
      "Website design & development",
      "Menu & online ordering",
    ],
    aside: {
      kind: "brief",
      text: "A café whose regulars found it by walking past. We gave it an identity that reads as warmly on a shopfront as on a phone, a menu that updates without a developer, and an ordering flow short enough to finish while standing in the queue.",
    },
  },
  {
    slug: "portfolio",
    client: "Beyond the Frame",
    title: "Beyond the Frame: An Image-First Portfolio for a Visual Storyteller",
    href: "https://gurnoorsingh-portfolio.vercel.app",
    accent: "#494640",
    deliverables: [
      "Website design",
      "Website dev.",
      "Gallery system",
      "Performance",
    ],
    tags: [
      "Website design & development",
      "Gallery & media system",
      "Performance optimisation",
    ],
    aside: {
      kind: "brief",
      text: "A photographer's work was being flattened by the platforms hosting it. The build gets out of the way — full-bleed frames, a gallery that stays fast on a phone over mobile data, and typography quiet enough that the pictures do the talking.",
    },
  },
];
