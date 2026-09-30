/**
 * Service pages (/services/[slug]).
 *
 * One page per genuine service intent. Each page owns one query cluster —
 * e.g. /services/web-design owns "website design Pune / website designer
 * Pune", /services/web-development owns "web development company Pune / web
 * application / custom software". Do not add a second page targeting a
 * cluster that already has an owner; extend the owner instead.
 *
 * Claims must match what the studio actually delivers (see lib/faq.ts, the
 * catalogue and the packages on the homepage). No prices, client counts or
 * outcome numbers here unless they are real and on record.
 */
import type { ServiceSlug } from "./case-studies";

export type Service = {
  slug: ServiceSlug;
  /** Short name for nav, cards and breadcrumbs. */
  name: string;
  /** <title> — primary intent first; the template appends the brand. */
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  /** schema.org serviceType */
  serviceType: string;
  cardBody: string;
  intro: string[];
  whoFor: string[];
  problems: { problem: string; answer: string }[];
  process: { title: string; body: string }[];
  deliverables: string[];
  tools?: string[];
  industries: string[]; // industry slugs
  related: ServiceSlug[];
  faqs: { q: string; a: string }[];
};

const STANDARD_PROCESS = [
  {
    title: "Free strategy & planning call",
    body: "Thirty minutes on your business, not ours. We find the one constraint actually holding things up and leave you with a scope on a page — whether or not you hire us.",
  },
  {
    title: "Scope, milestones and a fixed quote",
    body: "A written scope with deliverables, timeline and milestone payments — typically 50% to start, 30% at design sign-off and 20% before launch.",
  },
  {
    title: "Design in the open",
    body: "Staged previews you can open on your own phone, with updates over WhatsApp instead of meetings. Nothing moves to the next stage without your sign-off.",
  },
  {
    title: "Build, test, launch",
    body: "Production build, real-device testing, analytics and search setup, then launch on a domain and hosting registered in your name.",
  },
  {
    title: "Thirty days of support, then your choice",
    body: "Post-launch support is included. After that, maintenance or growth retainers are optional — or we hand over everything you need to run it yourself.",
  },
];

export const SERVICES: Service[] = [
  {
    slug: "web-design",
    name: "Website Design",
    title: "Website Design in Pune",
    description:
      "Website design from a Pune studio: fast, mobile-first sites for cafés, clinics, stays and D2C brands, built around the one action you need visitors to take.",
    h1: "Website design in Pune, built around what your customer does next",
    eyebrow: "Service · Website design",
    serviceType: "Website design",
    cardBody:
      "Mobile-first websites designed around a single decision — book, order, enquire or buy — with the copy and structure to support it.",
    intro: [
      "Fennr Studio designs websites for businesses in Pune and across India. Every site starts from the same question: what should a visitor do next — book a table, book an appointment, send an enquiry, place an order? The layout, copy and navigation are then built to make that one action obvious on a phone.",
      "We design and build in the same studio, so what you approve in design is what ships. No handoff between an agency that draws and a developer who guesses.",
    ],
    whoFor: [
      "Owner-led businesses that have outgrown an Instagram page and a phone number",
      "Restaurants, cafés and cloud kitchens",
      "Clinics, dentists and wellness practices",
      "Villas, resorts and boutique stays",
      "D2C brands and boutiques",
      "Founders who need a credible site before a launch or a raise",
    ],
    problems: [
      {
        problem: "People visit, but nobody calls, books or orders.",
        answer:
          "We rebuild the page around a single action and remove everything competing with it. Booking, WhatsApp and payment buttons sit where a thumb expects them.",
      },
      {
        problem: "The site looks dated next to competitors.",
        answer:
          "A design system built on your brand — type, colour, photography direction — so every page looks deliberate and the site stays consistent as it grows.",
      },
      {
        problem: "It looks fine on a laptop and breaks on a phone.",
        answer:
          "We design mobile-first and test on real devices, because most local searches and most of your visitors are on a phone.",
      },
      {
        problem: "Every small change needs a developer.",
        answer:
          "Menus, timings, offers and galleries can be made editable, so day-to-day updates don't wait on anyone.",
      },
    ],
    process: STANDARD_PROCESS,
    deliverables: [
      "Information architecture and page structure",
      "Copy for key pages, written around your customer's questions",
      "Visual design system: type, colour, components",
      "Mobile-first page designs with staged previews",
      "Photography direction, or a shoot (see photography)",
      "Accessibility and contrast checks",
      "Handover to development — in the same studio",
    ],
    industries: ["restaurants", "clinics", "hospitality", "photographers"],
    related: ["web-development", "branding", "seo"],
    faqs: [
      {
        q: "Can I see what my site would look like before paying?",
        a: "Yes. The free website preview exists for exactly this: tell us about your business and we'll send a preview so you can judge the direction before committing to anything.",
      },
      {
        q: "Can you redesign my existing website instead of starting over?",
        a: "Often, yes. We audit what exists and tell you honestly whether it needs a rebuild or a fix. Sometimes speed, structure and a clear call-to-action are all that's missing.",
      },
      {
        q: "Do you only work with businesses in Pune?",
        a: "No. We're based in Shivajinagar, Pune, and a good share of our work is remote — calls, shared documents and staged previews you can review from anywhere. Photography is the one service that needs us on site.",
      },
      {
        q: "Who owns the website and domain?",
        a: "You do. The domain is registered in your name, hosting is set up on your account or billed at cost, and you get every credential at handover.",
      },
      {
        q: "How long does a website take?",
        a: "A focused landing page can be live in about a week. A multi-page business site typically takes a few weeks depending on content and integrations — you'll get a timeline in the written scope before we start.",
      },
    ],
  },
  {
    slug: "web-development",
    name: "Web Development & Web Apps",
    title: "Web Development Company in Pune",
    description:
      "Web development in Pune: fast Next.js websites, web apps, dashboards and custom software with WhatsApp, payment and API integrations — owned by you.",
    h1: "Web development, web apps and custom software from Pune",
    eyebrow: "Service · Web development",
    serviceType: "Web development",
    cardBody:
      "Production websites, web applications, dashboards and integrations — WhatsApp, payments, CRMs and APIs — engineered to be fast and cheap to run.",
    intro: [
      "Fennr Studio builds websites and web applications for businesses in Pune and across India — from a fast marketing site to member platforms, booking flows, internal dashboards and custom tools that run part of the business.",
      "The founder is a software engineer by background, and the studio builds on the same modern stack used by product companies: statically generated where it can be, server-rendered where it must be, and wired into the tools you already use — WhatsApp, payment gateways, CRMs and third-party APIs.",
    ],
    whoFor: [
      "Businesses whose website needs to take bookings, orders or payments",
      "Communities and platforms that need accounts, profiles and member areas",
      "Teams replacing spreadsheets with a custom dashboard or internal tool",
      "Founders building an MVP or a first production version",
      "Companies moving off Wix, WordPress or a site builder they've outgrown",
    ],
    problems: [
      {
        problem: "The site is slow, and it's costing us visitors.",
        answer:
          "We build with static generation, optimised images and minimal JavaScript, then measure real Core Web Vitals — not just a Lighthouse score on a fast laptop.",
      },
      {
        problem: "We're stuck on a site builder we've outgrown.",
        answer:
          "We migrate every page of content into a codebase you own, with clean URLs and redirects so existing search visibility carries over.",
      },
      {
        problem: "Orders and enquiries arrive in five different places.",
        answer:
          "We connect the site to WhatsApp, payments and your CRM so every lead and order lands in one place with the right details attached.",
      },
      {
        problem: "We need software that fits how we actually work.",
        answer:
          "Custom web apps and dashboards scoped to your process, shipped in weekly increments so you use it early and shape it as it's built.",
      },
    ],
    process: STANDARD_PROCESS,
    deliverables: [
      "Marketing websites and landing pages",
      "Web applications with accounts, roles and member areas",
      "Booking, ordering and enquiry flows",
      "Payment gateway integration (UPI, cards, net banking)",
      "WhatsApp Business API and CRM integrations",
      "Admin dashboards and internal tools",
      "Migration from Wix, WordPress and site builders",
      "Hosting, domain, SSL, email and backups set up in your name",
      "Technical SEO, analytics and performance budgets",
    ],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase / Postgres", "Vercel", "WhatsApp Cloud API", "Resend"],
    industries: ["restaurants", "clinics", "hospitality", "photographers"],
    related: ["web-design", "ai-automation", "seo"],
    faqs: [
      {
        q: "What technology do you build with?",
        a: "Mostly Next.js, React and TypeScript, with Supabase/Postgres when an app needs accounts or data, deployed on Vercel. We pick the simplest stack that does the job and that another developer could pick up later.",
      },
      {
        q: "Can you build a custom web application, not just a website?",
        a: "Yes — member platforms, booking systems, dashboards and internal tools. Photowalks in Pune, for example, has member accounts, photographer pages, walk registrations and a searchable photo archive.",
      },
      {
        q: "Can you integrate WhatsApp and payments?",
        a: "Yes. WhatsApp ordering and notifications, WhatsApp Business API flows, and payment gateways supporting UPI, cards and net banking are among the most common things we add.",
      },
      {
        q: "Do you provide hosting and maintenance?",
        a: "Yes, though ownership stays with you. Domain and hosting are billed at actual cost with no markup. Maintenance — updates, security patches, backups, monitoring and small changes — is optional and priced separately.",
      },
      {
        q: "How fast can an MVP be live?",
        a: "A working MVP typically takes four to six weeks depending on scope. We work in weekly sprints, so you see progress every week rather than at the end.",
      },
    ],
  },
  {
    slug: "branding",
    name: "Branding & Identity",
    title: "Branding & Logo Design in Pune",
    description:
      "Brand strategy, logo and identity design from a Pune studio — positioning, naming, logo systems, guidelines and the graphic design built on them.",
    h1: "Brand identity and logo design, from positioning to the shopfront",
    eyebrow: "Service · Branding & identity",
    serviceType: "Brand identity design",
    cardBody:
      "Positioning, naming, logo systems, brand boards and the social, print and campaign design built on them.",
    intro: [
      "Fennr Studio builds brands for businesses in Pune and across India — starting with what the business stands for and who it's for, then designing the logo, identity system and everyday graphic design that make it recognisable.",
      "Because the same studio designs the website and shoots the photography, the identity is built to work where it will actually live: on a phone screen, a shopfront, a menu, an Instagram grid and a delivery box.",
    ],
    whoFor: [
      "New businesses that need a name, a logo and a look before launch",
      "Established businesses whose brand no longer matches what they've become",
      "Cafés, restaurants and stays that live or die on how they look",
      "D2C brands that need packaging, social and site to feel like one brand",
      "Founders who need a credible identity for a raise or a launch",
    ],
    problems: [
      {
        problem: "We have a logo, but no brand.",
        answer:
          "We build the system around the mark — colour, type, photography direction, voice and rules — so everything you publish looks like it comes from the same place.",
      },
      {
        problem: "We look like every competitor.",
        answer:
          "Positioning comes first. We work out what you should be known for, then design something that makes that difference visible.",
      },
      {
        problem: "Every designer we hire makes it look different.",
        answer:
          "A brand board and guidelines your team and any future designer can follow, plus templates for the things you make most often.",
      },
    ],
    process: [
      {
        title: "Discovery & positioning",
        body: "Who you serve, what you want to be known for and how competitors look. The output is a short positioning statement everyone agrees on.",
      },
      {
        title: "Naming and moodboards (if needed)",
        body: "Name options screened for availability, and moodboards that set the visual direction before any logo is drawn.",
      },
      {
        title: "Identity design",
        body: "Logo system, colour, typography and supporting elements, shown in real applications — signage, packaging, social and web.",
      },
      {
        title: "Brand board and templates",
        body: "Guidelines and ready-to-use templates for social posts, print and campaigns, so the brand holds up after handover.",
      },
    ],
    deliverables: [
      "Brand positioning and messaging",
      "Naming (optional)",
      "Moodboards and creative direction",
      "Logo system: primary, secondary and icon marks",
      "Colour palette and typography",
      "Brand board and usage guidelines",
      "Social media templates",
      "Print and campaign design: menus, signage, packaging, brochures, outdoor",
    ],
    industries: ["restaurants", "hospitality", "clinics"],
    related: ["web-design", "photography", "seo"],
    faqs: [
      {
        q: "Do you only do logos, or full branding?",
        a: "Both. Some clients come to us just for a logo; others want positioning, identity, website and photography together. Services are modular.",
      },
      {
        q: "Can you refresh our existing brand instead of replacing it?",
        a: "Yes. If your brand has recognition worth keeping, a refresh that tightens the system is usually the better investment than a full rebrand.",
      },
      {
        q: "Do you design menus, packaging and signage?",
        a: "Yes — graphic design for print, packaging, social and outdoor campaigns is part of the service, built on the identity system.",
      },
      {
        q: "What files do we get at the end?",
        a: "Logo files in every format you'll need for print and screen, the brand board and guidelines, and editable templates. You own all of it.",
      },
    ],
  },
  {
    slug: "seo",
    name: "SEO & Local Search",
    title: "SEO Services in Pune",
    description:
      "SEO from a Pune studio that builds websites: technical SEO, local SEO, Google Business Profile, content and analytics — measured by enquiries.",
    h1: "SEO services in Pune: be found by the people already searching for you",
    eyebrow: "Service · SEO & visibility",
    serviceType: "Search engine optimisation",
    cardBody:
      "Technical SEO, local SEO and Google Business Profile, content and analytics — measured by enquiries, not vanity metrics.",
    intro: [
      "Fennr Studio does SEO for businesses in Pune and across India. Because we build websites too, we fix search problems at the root — in the code, the structure and the content — rather than layering a plugin on top.",
      "We don't promise a #1 ranking. Nobody honestly can: results vary by location, device and competition, and Google changes. What we do is build the things search engines reward — a fast, crawlable site, pages that answer real questions, a complete Business Profile and genuine local signals — and measure the enquiries that result.",
    ],
    whoFor: [
      "Local businesses that want to appear when people nearby search — cafés, clinics, salons, stays",
      "Businesses with a website that gets little or no search traffic",
      "Sites that lost visibility after a redesign or migration",
      "Service businesses that want to be found beyond their own city",
    ],
    problems: [
      {
        problem: "We don't show up when people search for what we do nearby.",
        answer:
          "Local SEO: a complete, consistent Google Business Profile, matching name, address and phone everywhere, location-relevant pages and a plan for genuine reviews.",
      },
      {
        problem: "Our site is invisible to Google.",
        answer:
          "Technical SEO: indexability, sitemaps, canonicals, structured data, speed and mobile usability — fixed in the code, not patched over.",
      },
      {
        problem: "We get traffic but no enquiries.",
        answer:
          "We map pages to search intent and track what matters — calls, WhatsApp messages, bookings and form submissions from organic search.",
      },
    ],
    process: [
      {
        title: "Audit",
        body: "A crawl of the whole site, Search Console and analytics review, Business Profile and citation check, and a look at who actually ranks for your key searches.",
      },
      {
        title: "Fix the foundation",
        body: "Technical fixes first — indexing, speed, metadata, structured data, internal links — because content can't rank on a site Google struggles to read.",
      },
      {
        title: "Local presence",
        body: "Business Profile optimisation, NAP consistency across listings, and a review process that asks honestly and never incentivises.",
      },
      {
        title: "Content that answers real questions",
        body: "Service and location pages, then guides built around what your customers actually search — no mass-produced articles.",
      },
      {
        title: "Measure and report",
        body: "Monthly reporting on impressions, clicks, positions and — most importantly — enquiries from organic search.",
      },
    ],
    deliverables: [
      "Technical SEO audit and fixes",
      "Google Search Console and Bing Webmaster setup",
      "Google Business Profile optimisation",
      "NAP and citation audit",
      "Keyword and search-intent map",
      "On-page optimisation: titles, descriptions, headings, internal links",
      "Structured data (JSON-LD)",
      "Core Web Vitals improvements",
      "Conversion tracking for calls, WhatsApp and forms",
      "Monthly SEO report",
    ],
    industries: ["restaurants", "clinics", "hospitality", "photographers"],
    related: ["web-development", "web-design", "branding"],
    faqs: [
      {
        q: "Can you guarantee a #1 ranking on Google?",
        a: "No, and be wary of anyone who does. Rankings depend on relevance, distance, prominence and competition, and they vary by searcher. We build the foundations that earn visibility and report honestly on what changes.",
      },
      {
        q: "How long does SEO take to show results?",
        a: "Technical fixes can show up within weeks once Google recrawls. Local and content-driven gains usually take a few months to build. We report monthly so you can see the trend.",
      },
      {
        q: "Do you optimise Google Business Profiles?",
        a: "Yes. Category selection, services, description, photos, consistency with your website and a review-request process are all part of local SEO.",
      },
      {
        q: "Can you do SEO on a website you didn't build?",
        a: "Yes. We audit it first; if the platform limits what can be fixed, we'll tell you plainly rather than bill for work that can't move the needle.",
      },
      {
        q: "Is SEO a one-time project or a retainer?",
        a: "Both are available. A one-time technical and local SEO setup suits many small businesses; a monthly retainer adds content, reporting and ongoing improvements.",
      },
    ],
  },
  {
    slug: "photography",
    name: "Commercial Photography",
    title: "Commercial Photography in Pune",
    description:
      "Commercial photography in Pune: product, food, interior and hospitality shoots, art-directed to your brand and delivered ready for web and print.",
    h1: "Commercial photography in Pune for brands, menus and spaces",
    eyebrow: "Service · Photography",
    serviceType: "Commercial photography",
    cardBody:
      "Product, food, interior and hospitality photography, art-directed to the brand and delivered ready for web and print.",
    intro: [
      "Fennr Studio shoots product, food, interior and hospitality photography in Pune. The founder is a photographer whose work has been exhibited at the State Gallery of Art, Hyderabad, and the studio treats photography as part of the brand rather than an afterthought.",
      "Because the same studio designs the website, shoots are planned around where the images will be used — hero crops, menu tiles, product grids and social formats — so nothing has to be awkwardly cropped later.",
    ],
    whoFor: [
      "Restaurants and cafés that need menu and ambience photography",
      "D2C brands and boutiques that need product photography",
      "Villas, resorts and stays that need rooms and grounds photographed",
      "Clinics and studios that need space and team photography",
    ],
    problems: [
      {
        problem: "Our photos don't do the product justice.",
        answer:
          "Art-directed shoots with lighting and styling planned in advance, matched to the brand's visual direction.",
      },
      {
        problem: "Our site uses stock images.",
        answer:
          "Real photos of your space, product and people build trust that stock never will — especially for local businesses.",
      },
      {
        problem: "Beautiful photos, slow website.",
        answer:
          "We deliver web-optimised versions sized for each placement, in modern formats, so quality never costs page speed.",
      },
    ],
    process: [
      {
        title: "Shot list and art direction",
        body: "We agree what's needed and where each image will be used, then plan styling, props and lighting.",
      },
      {
        title: "The shoot",
        body: "On location in Pune, or in a planned travel day for projects elsewhere.",
      },
      {
        title: "Edit and retouch",
        body: "Colour-consistent editing that matches the brand, with retouching where needed.",
      },
      {
        title: "Delivery",
        body: "High-resolution files for print and web-optimised versions sized for your site and social.",
      },
    ],
    deliverables: [
      "Product photography",
      "Food and menu photography",
      "Interior and architectural photography",
      "Hospitality: rooms, dining and grounds",
      "Team and workspace photography",
      "Web-optimised and print-ready files",
    ],
    industries: ["restaurants", "hospitality", "clinics"],
    related: ["branding", "web-design", "seo"],
    faqs: [
      {
        q: "Do you shoot outside Pune?",
        a: "Shoots need us in the room. For clients outside Pune we either plan a travel day into the scope or work with a trusted local photographer under our art direction.",
      },
      {
        q: "What kinds of photography do you do?",
        a: "Commercial work: product, food, interiors and hospitality, plus team and workspace photography.",
      },
      {
        q: "Can you shoot photos for a website you're also building?",
        a: "That's where it works best — the shoot is planned around the layouts, so every image fits where it's going.",
      },
      {
        q: "Do we own the photographs?",
        a: "Usage rights and licence terms are agreed in writing, in the scope, before the shoot — so there is no ambiguity about where the images can be used.",
      },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Automation & Integrations",
    title: "AI Automation & WhatsApp Automation for Businesses",
    description:
      "AI and WhatsApp automation from a Pune studio: WhatsApp Business API flows, lead capture into your CRM, AI assistants and workflow integrations.",
    h1: "AI automation, WhatsApp flows and integrations that take work off your plate",
    eyebrow: "Service · AI automation",
    serviceType: "Business process automation",
    cardBody:
      "WhatsApp Business API flows, lead capture into your CRM, AI assistants and the integrations that stop work falling between tools.",
    intro: [
      "Fennr Studio builds automation for businesses in Pune and across India — the kind that takes repetitive work off a small team: answering the same WhatsApp questions, capturing and qualifying leads, routing orders and keeping a CRM up to date.",
      "We build these systems ourselves and run them in our own studio: a config-driven WhatsApp Cloud API flow engine that captures leads into a CRM, and a lead-signal scanner that finds and scores buying signals and drafts replies for a human to send. We apply the same approach to clients: automation where it saves real time, and a human in the loop wherever judgement matters.",
    ],
    whoFor: [
      "Businesses answering the same questions on WhatsApp all day",
      "Teams losing leads between Instagram, WhatsApp, the website and a spreadsheet",
      "Clinics, cafés and stays that want bookings and orders handled automatically",
      "Growing teams that need their tools to talk to each other",
    ],
    problems: [
      {
        problem: "We spend hours replying to the same WhatsApp messages.",
        answer:
          "WhatsApp Business API flows with interactive menus that answer common questions, take bookings or orders, and hand off to a person when needed.",
      },
      {
        problem: "Leads come in everywhere and some get lost.",
        answer:
          "Every enquiry — website, WhatsApp, forms — captured into one CRM with source and details attached, plus a daily follow-up digest.",
      },
      {
        problem: "We want to use AI but don't know where it actually helps.",
        answer:
          "We start with the workflow, not the model: find the repetitive steps, automate those, and keep people on the decisions that need them.",
      },
    ],
    process: [
      {
        title: "Workflow audit",
        body: "We map how enquiries, orders and follow-ups move today, and where time and leads leak.",
      },
      {
        title: "Design the flow",
        body: "What gets automated, what stays human, what data moves where — agreed on paper before anything is built.",
      },
      {
        title: "Build and connect",
        body: "WhatsApp flows, AI steps, CRM and website integrations, tested against real conversations.",
      },
      {
        title: "Launch, monitor, refine",
        body: "We watch the first weeks closely, tune responses and hand-offs, and document how it all works.",
      },
    ],
    deliverables: [
      "WhatsApp Business (Cloud) API setup and flows",
      "Interactive menus, bookings and order capture over WhatsApp",
      "Lead capture from website, WhatsApp and forms into a CRM",
      "Automated follow-up digests and notifications",
      "AI assistants for FAQs and lead qualification, with human hand-off",
      "Integrations between your website, CRM, payments and email",
      "Custom automation and internal tools",
    ],
    tools: ["WhatsApp Cloud API", "Next.js", "Supabase / Postgres", "EspoCRM", "Resend", "LLM APIs"],
    industries: ["restaurants", "clinics", "hospitality"],
    related: ["web-development", "seo", "web-design"],
    faqs: [
      {
        q: "What can be automated on WhatsApp?",
        a: "Answering common questions, showing menus or catalogues, taking bookings and orders, sending confirmations and reminders, and capturing lead details — with a hand-off to a person whenever the conversation needs one.",
      },
      {
        q: "Do I need the WhatsApp Business API?",
        a: "For automated flows at any volume, yes. We handle the setup with Meta, the message templates and the flow logic.",
      },
      {
        q: "Will AI reply to my customers without oversight?",
        a: "Only where you want it to. We design automations with clear boundaries and a human in the loop for anything that needs judgement.",
      },
      {
        q: "Can this connect to the CRM or tools we already use?",
        a: "Usually, yes — if the tool has an API. We'll confirm during the workflow audit before anything is scoped.",
      },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
