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

  // ---- Case-study page (/work/[path]) ------------------------------------
  // Everything below is written only from what is verifiable in the live site
  // or the project repo. No invented metrics: when there is no measured
  // outcome, the page says what was built, not what it "achieved".

  /** Public URL segment — descriptive, stable, never the internal slug. */
  path: string;
  /** Where the business is. Omit rather than guess. */
  location?: string;
  /** Short industry label for cards; `industryPath` links the industry page. */
  industry: string;
  industryPath?: string;
  /** Service page slugs this project is evidence for. */
  services: ServiceSlug[];
  /** One sentence for cards and the meta description. */
  summary: string;
  context: string;
  challenge: string;
  approach: string[];
  built: string[];
  stack: string[];
};

export type ServiceSlug =
  | "web-design"
  | "web-development"
  | "branding"
  | "seo"
  | "photography"
  | "ai-automation";

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
    path: "tekton-talent-solutions",
    location: "Hyderabad",
    industry: "Recruitment & IT services",
    services: ["web-design", "web-development", "branding", "seo"],
    summary:
      "A full rebuild of a tech-recruitment firm's Wix site as a type-led Next.js site that states the offer on the first screen.",
    context:
      "Tekton Talent Solutions is a technology recruitment and IT services firm in Hyderabad, placing engineers with companies across India. Its previous site was built on Wix and did little to show enterprise buyers how the firm actually works.",
    challenge:
      "Enterprise hiring managers decide quickly whether a recruiter is credible. The old site buried the offer, looked like every other staffing template, and gave no sense of process. Every piece of existing content had to survive the move, and the new site had to be fast and fully indexable rather than locked inside a site builder.",
    approach: [
      "Made the type the design: display lines set at viewport scale against a light body face, so the offer reads at full size before anyone scrolls.",
      "Structured the story around how a placement actually happens — source, screen, deliver, support — so a buyer understands the engagement, not just the tagline.",
      "Migrated every page of content from the original site into the new structure, then rewrote the positioning and B2B copy around it.",
      "Built headlines that are fitted to their container rather than sized by breakpoint, so they cannot overflow at a viewport nobody tested.",
    ],
    built: [
      "Complete Next.js App Router rebuild, off Wix",
      "Editorial design system with one variable font family",
      "Scroll-driven motion, disabled for reduced-motion users",
      "Validated enquiry forms using server actions",
      "Technical SEO foundations: metadata, sitemap, clean URLs",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Zod"],
    aside: {
      kind: "brief",
      text: "A Hyderabad recruitment firm placing engineers across India, with nothing online to prove it. We built a type-led site that states the offer at full size on the first screen, then walks enterprise buyers through how the work actually happens — source, screen, deliver, support.",
    },
  },
  {
    slug: "photowalks",
    client: "Photowalks in Pune",
    title: "Photowalks in Pune: A Community Platform for Walks, Members & the Archive",
    href: "https://pwip.in",
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
    path: "photowalks-in-pune",
    location: "Pune",
    industry: "Community & photography",
    industryPath: "/industries/photographers",
    services: ["web-design", "web-development", "branding", "seo"],
    summary:
      "A home for a Pune photo-walk community: walks calendar, member accounts, photographer pages and a credited photo archive.",
    context:
      "Photowalks in Pune is a community that organises photo walks around the city. Before this project it lived entirely in group chats — announcements scrolled away, sign-ups were a list of replies, and the photographs from each walk were scattered across personal feeds.",
    challenge:
      "A community platform has to work for two audiences at once: newcomers deciding whether to show up to their first walk, and regulars who want their work seen and credited. It also had to stay cheap to run and keep working even when the accounts backend is not connected.",
    approach: [
      "Designed the site around the walk calendar, because \"when is the next one and how do I join\" is the first question every visitor has.",
      "Gave members real accounts and public photographer pages, so contributions belong to the person who made them.",
      "Built the archive so every frame is credited to its photographer and searchable, turning years of walks into a browsable record of the city.",
      "Kept the public site statically prerendered, with accounts layered on top — every public page renders even without the backend.",
    ],
    built: [
      "Walks calendar with registrations",
      "Member sign-up, login and profiles",
      "Photographer pages at their own URLs",
      "Story write-ups for past walks",
      "Searchable, credited photo archive",
      "Structured data and SEO for the pwip.in domain",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase Auth & Postgres", "Vercel"],
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
    path: "dentora",
    industry: "Dental clinic",
    industryPath: "/industries/clinics",
    services: ["web-design", "web-development", "seo"],
    summary:
      "A calm, booking-first dental clinic site where Book an Appointment is never more than one tap away.",
    context:
      "Dentora is a modern dental clinic. Most dental websites compete on volume — stock smiles, flashing offers, every service shouting at once — which is exactly the wrong tone for a patient who is already nervous about the appointment.",
    challenge:
      "The site had to reassure first and sell second, while still making booking the easiest thing to do on every page. It also needed room for content that answers patient questions before they call, without slowing the site down.",
    approach: [
      "Set a cinematic, unhurried visual pace — generous space, soft palette, no pop-ups — so the site feels like the clinic should.",
      "Kept Book an Appointment persistent on screen, so every page, from a service to an FAQ, ends in the same action.",
      "Organised the site around the questions patients actually ask: services, specialists, what to expect, and FAQs.",
      "Built without an animation library — motion is CSS plus one shared observer — keeping shared first-load JavaScript around 99 kB.",
    ],
    built: [
      "Home, services, team, about and contact pages",
      "Persistent booking call-to-action and booking form",
      "Insights articles, statically generated",
      "Patient FAQ",
      "Local SEO foundations: metadata, sitemap, structured pages",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4"],
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
    path: "villavista",
    industry: "Hospitality — resort",
    industryPath: "/industries/hospitality",
    services: ["web-design", "web-development", "photography"],
    summary:
      "A luxury resort site built to earn the direct booking — rooms, dining and grounds, with reservations reachable from anywhere.",
    context:
      "VillaVista is a luxury resort. Like most independent properties, a large share of its bookings came through online travel aggregators, each of which takes a commission on every stay.",
    challenge:
      "A guest who finds the property on an aggregator will often search for it by name before booking. If the property's own site is weaker than the listing, the guest goes back and books there. The site had to be the better place to book.",
    approach: [
      "Art-directed the imagery like a magazine spread, so the rooms, dining and grounds sell the stay better than a listing thumbnail can.",
      "Made reservations reachable from every point on every page instead of hiding them at the end of a tour.",
      "Structured the site around the three things a guest compares — rooms, food and the setting — each with its own clear section.",
    ],
    built: [
      "Rooms, dining and grounds sections",
      "Direct booking / enquiry flow available sitewide",
      "Full-bleed photography layout, optimised for mobile",
      "Hospitality brand presentation",
    ],
    stack: ["Next.js", "React", "Tailwind CSS"],
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
    path: "west-village-cafe",
    industry: "Café & restaurant",
    industryPath: "/industries/restaurants",
    services: ["branding", "web-design", "web-development", "seo"],
    summary:
      "A neighbourhood café's identity, website, self-editable menu and an ordering flow short enough to finish in the queue.",
    context:
      "West Village Café is a neighbourhood café whose regulars found it by walking past. It had no identity beyond the shopfront and nothing online that a new customer searching nearby would find.",
    challenge:
      "A café needs three things online: to be found by people nearby, to show a menu that is actually current, and to let customers order without friction. It also needed a look that works as well on a sign as on a phone screen.",
    approach: [
      "Designed an identity that reads warmly at both extremes — shopfront scale and a phone in someone's hand.",
      "Built a menu the café can update itself, so it never needs a developer to change a price or add a special.",
      "Cut the ordering flow down to the fewest possible steps, designed for someone standing in the queue.",
      "Set up the local SEO basics so the café can be found by people searching nearby.",
    ],
    built: [
      "Brand identity and visual system",
      "Website design and development",
      "Self-editable digital menu",
      "Online ordering flow",
      "Local SEO setup",
    ],
    stack: ["Next.js", "React", "Tailwind CSS"],
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
    path: "beyond-the-frame",
    industry: "Photographer portfolio",
    industryPath: "/industries/photographers",
    services: ["web-design", "web-development"],
    summary:
      "An image-first portfolio for a photographer — full-bleed frames and a gallery that stays fast over mobile data.",
    context:
      "Beyond the Frame is the portfolio of a visual storyteller whose work was living on social platforms that crop, compress and bury it between ads.",
    challenge:
      "Photography portfolios usually fail in one of two ways: they look beautiful and load slowly, or they load fast and flatten the pictures. This one had to do neither, on a phone, over mobile data.",
    approach: [
      "Let the frames run full-bleed and kept the typography quiet, so the pictures do the talking.",
      "Built a gallery system that serves correctly sized modern image formats per device, so large photographs stay fast on mobile.",
      "Treated performance as a design requirement from the first layout, not an optimisation pass at the end.",
    ],
    built: [
      "Image-first portfolio design",
      "Responsive gallery and media system",
      "Performance optimisation for large imagery",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "next/image (AVIF/WebP)"],
    aside: {
      kind: "brief",
      text: "A photographer's work was being flattened by the platforms hosting it. The build gets out of the way — full-bleed frames, a gallery that stays fast on a phone over mobile data, and typography quiet enough that the pictures do the talking.",
    },
  },
];

export const getCaseStudy = (path: string) => CASE_STUDIES.find((c) => c.path === path);
export const caseStudiesFor = (service: ServiceSlug) =>
  CASE_STUDIES.filter((c) => c.services.includes(service));
