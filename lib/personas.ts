export type Persona = {
  slug: string;
  /** Card + hero eyebrow, e.g. "Founders & Early-Stage Builders" */
  name: string;
  /** Audience line shown on the /who-we-help index card */
  who: string;
  /** CTA label on the index card */
  cardCta: string;
  /** Short noun used in section headings, e.g. "founders" */
  noun: string;
  /** The question other persona pages use when linking here */
  question: string;
  heroTitle: string;
  heroSub: string;
  pairs: { problem: string; solution: string }[];
  helpTitle: string;
  helpSub: string;
  helpItems: string[];
  faqs: { q: string; a: string }[];
  closing: { title: string; body: string };
  finalTitle: string;
  finalCta: string;
};

export const PERSONAS: Persona[] = [
  {
    slug: "founders-and-early-stage-builders",
    name: "Founders & Early-Stage Builders",
    who: "Technical founders · Non-technical founders · PMs building side projects",
    cardCta: "Build your MVP",
    noun: "founders",
    question: "What should we actually build first?",
    heroTitle: "Decide what to build, and how to move it forward",
    heroSub:
      "For founders taking a product from idea to launch and past it, where clarity, speed and focus decide everything.",
    pairs: [
      {
        problem: "We have ideas, but don't know what to build first.",
        solution:
          "We define scope and priorities so the first build proves value instead of guessing at it.",
      },
      {
        problem: "We're building, but not sure it's the right thing.",
        solution:
          "We turn the idea into testable flows and prototypes you can put in front of real users early.",
      },
      {
        problem: "We're doing too much in too many directions.",
        solution:
          "We cut the product back to what matters, so effort compounds instead of scattering.",
      },
      {
        problem: "We need something real, but can't afford a full build yet.",
        solution:
          "We ship lightweight MVPs and demos — fast to build, cheap to test, honest about what they are.",
      },
      {
        problem: "We have something, but it isn't ready to show.",
        solution:
          "We fix the UX, structure and copy so an investor or a user understands it in one look.",
      },
    ],
    helpTitle: "What we help you define, design and test",
    helpSub: "Depending on your stage and product, this usually includes",
    helpItems: [
      "Product direction, scope and feature prioritisation",
      "Core user flows and product structure",
      "MVPs, prototypes or production-ready builds",
      "Websites, landing pages and product experiences",
      "Messaging and a deck that explains the product simply",
      "Conversion, onboarding and early growth improvements",
      "Systems and foundations that hold up when you scale",
    ],
    faqs: [
      {
        q: "Is fennr a fit if I'm building my first product?",
        a: "Yes — most of the founders we work with are. You don't need a spec or a technical co-founder. You need to be clear on who it's for and what problem it solves; we handle turning that into scope, design and a build.",
      },
      {
        q: "I'm stuck and not sure what to do next. Where do I start?",
        a: "Start with the free Strategy & Planning call. We'll pull apart what you have, find the one constraint actually holding it up, and give you a scope on a page. If the honest answer is that you don't need us yet, we'll say so.",
      },
      {
        q: "Can you help if I already have a product or website?",
        a: "Yes. We audit what exists and tell you plainly whether it needs a rebuild or a fix. Often speed, onboarding and clearer messaging are the whole problem, and a rebuild would be a waste of your money.",
      },
      {
        q: "Do I need everything figured out before we start?",
        a: "No. Half the job is deciding what not to build. Come with the problem and the customer; we'll shape the rest in the first sprint.",
      },
      {
        q: "How do I decide between building, improving or scaling?",
        a: "By what's unproven. If nobody has used it, build the smallest thing that tests the idea. If people use it but don't stick, improve activation. If it works and it's straining, then scale the systems underneath.",
      },
      {
        q: "How fast can something be live?",
        a: "A landing page in about a week, a working MVP typically in four to six, depending on scope. We work in weekly sprints, so you see progress every week rather than at the end.",
      },
    ],
    closing: {
      title: "Make the next decision deliberate.",
      body: "If you're deciding what deserves real commitment, start by getting clear on what proves value. Build only what makes the next move obvious.",
    },
    finalTitle: "Stop guessing. Start moving forward.",
    finalCta: "Start with a free product audit",
  },
  {
    slug: "marketing-and-growth-teams",
    name: "Marketing & Growth Teams",
    who: "Marketing teams · Growth owners · Campaign leads · Marketing agencies",
    cardCta: "Improve conversion",
    noun: "growth teams",
    question: "Why isn't our traffic converting into real customers?",
    heroTitle: "Turn the traffic you already pay for into customers",
    heroSub:
      "For marketing and growth teams carrying a number, where the spend is working but the page isn't.",
    pairs: [
      {
        problem: "Traffic is up, signups are flat.",
        solution:
          "We rebuild the page around a single decision, then prove the lift with real tracking.",
      },
      {
        problem: "Every campaign waits in a dev queue.",
        solution:
          "We ship landing pages in days and hand you a system your team can run without us.",
      },
      {
        problem: "Our messaging says what we do, not why it matters.",
        solution:
          "We rewrite positioning and copy around the outcome your buyer is actually shopping for.",
      },
      {
        problem: "We can't tell which channel is really working.",
        solution:
          "We set up analytics, events and attribution so the numbers end the argument.",
      },
      {
        problem: "Leads come in, but the wrong ones.",
        solution:
          "We fix the funnel and the forms so the right people self-select in and the rest don't.",
      },
    ],
    helpTitle: "What we help you sharpen, ship and measure",
    helpSub: "Depending on your funnel and channels, this usually includes",
    helpItems: [
      "Landing pages and campaign pages built to convert",
      "Positioning, messaging and copy",
      "Funnel structure and lead capture",
      "SEO and organic visibility",
      "Analytics, event tracking and attribution",
      "Iteration and testing on what's already live",
      "A design system your team can ship from",
    ],
    faqs: [
      {
        q: "Do you work alongside our in-house team?",
        a: "Usually, yes. We take the pieces you don't have capacity for — pages, design, tracking, technical SEO — and leave strategy and channel ownership with you.",
      },
      {
        q: "Can you improve what we have instead of rebuilding it?",
        a: "That's the default. We audit first and only recommend a rebuild when the structure itself is what's costing you conversion.",
      },
      {
        q: "How do you know a change actually worked?",
        a: "We instrument before we change anything — events, funnels, and a baseline. Without that, any claim about lift is a story, not a result.",
      },
      {
        q: "How fast can a landing page go live?",
        a: "Typically inside a week from brief to live, including copy and design. Campaign variants after that are quicker.",
      },
      {
        q: "Do you handle SEO as well as paid landing pages?",
        a: "Yes — technical SEO, on-page and content structure, either as part of a build or as a monthly retainer.",
      },
      {
        q: "Who owns what you build?",
        a: "You do. Code, accounts, tracking setup and assets are yours, handed over with documentation. No lock-in to us.",
      },
    ],
    closing: {
      title: "Make the page earn its traffic.",
      body: "Before you raise the budget, make sure the page deserves the visit. The cheapest growth available is usually the visitors you already have.",
    },
    finalTitle: "Stop buying clicks that bounce.",
    finalCta: "Start with a free conversion audit",
  },
  {
    slug: "agencies-and-delivery-teams",
    name: "Agencies & Delivery Teams",
    who: "Agencies · Product studios · Dev shops · Teams outsourcing instead of hiring",
    cardCta: "Partner with us",
    noun: "agencies",
    question: "How do we deliver faster without dropping quality?",
    heroTitle: "Deliver more without adding headcount",
    heroSub:
      "For agencies, studios and dev shops that need dependable delivery capacity behind their own brand.",
    pairs: [
      {
        problem: "We're turning down work we could have sold.",
        solution:
          "We add capacity behind your brand so you can say yes without hiring for it.",
      },
      {
        problem: "Hiring takes longer than the project does.",
        solution:
          "We slot into a live project in about a week, and step back out when it ships.",
      },
      {
        problem: "Freelancers deliver, but never the same way twice.",
        solution:
          "One team, one standard, documented handovers on every project.",
      },
      {
        problem: "Our margin disappears into revisions.",
        solution:
          "Fixed scope and weekly sprints keep the work — and the budget — predictable.",
      },
      {
        problem: "Clients want skills we don't have in-house.",
        solution:
          "Design, build, photography, SEO and automation under one roof, white-labelled to you.",
      },
    ],
    helpTitle: "What we take off your plate",
    helpSub: "Depending on your pipeline and stack, this usually includes",
    helpItems: [
      "White-label design and front-end build",
      "Overflow capacity on live projects",
      "Full builds in your stack, to your standards",
      "Brand, identity and photography",
      "Technical SEO and performance fixes",
      "QA, documentation and handover",
      "A named point of contact for your PM",
    ],
    faqs: [
      {
        q: "Do you work white-label?",
        a: "Yes. We work under your brand, in your tools, and we don't approach or market to your clients. Happy to sign an NDA and a non-solicit before anything starts.",
      },
      {
        q: "Can you work in our stack and our repo?",
        a: "Yes — your repo, your branching model, your review process. If you have a design system, we build inside it rather than around it.",
      },
      {
        q: "How quickly can you start?",
        a: "Usually within a week for a scoped piece of work. Larger engagements we plan a sprint ahead.",
      },
      {
        q: "How is this priced?",
        a: "Either fixed-scope per project or a monthly capacity retainer, whichever suits how you sell. Fixed scope is agreed before work starts, so your quote to the client is safe.",
      },
      {
        q: "What happens if the client changes scope mid-project?",
        a: "We re-scope in the open and tell you the cost before doing the work, so you're never absorbing a surprise on your margin.",
      },
      {
        q: "Do you talk to our clients directly?",
        a: "Only if you want us to, and only as part of your team. The default is that everything routes through your PM.",
      },
    ],
    closing: {
      title: "Say yes to the next project.",
      body: "The work you turn down is the most expensive work you do. Add capacity you can predict before you add a payroll line you can't.",
    },
    finalTitle: "Stop declining good work.",
    finalCta: "Start with a partnership call",
  },
  {
    slug: "businesses-going-digital",
    name: "Businesses Going Digital",
    who: "Offline-first companies · Traditional SMEs · First-time digital teams",
    cardCta: "Launch your website",
    noun: "first-time digital teams",
    question: "How do we move online without wasting time or money?",
    heroTitle: "Get the business online without wasting a year",
    heroSub:
      "For offline-first companies and traditional SMEs making the move online properly, for the first time.",
    pairs: [
      {
        problem: "Customers find our competitors before they find us.",
        solution:
          "We build the site and the local SEO that put you in the search where the decision happens.",
      },
      {
        problem: "Orders and bookings still run on calls and DMs.",
        solution:
          "We wire up WhatsApp, payments and forms so every enquiry lands in one place.",
      },
      {
        problem: "We don't even know what a website should cost.",
        solution:
          "Fixed scope, agreed in writing before anything starts — after a free strategy call.",
      },
      {
        problem: "Our branding is whatever we made years ago.",
        solution:
          "We rebuild the identity and shoot the photography so you look like the business you actually are.",
      },
      {
        problem: "We have nobody in-house to run it.",
        solution:
          "We hand over something you can update yourself, and stay on retainer only if you want us to.",
      },
    ],
    helpTitle: "What we set up for you",
    helpSub: "Depending on your business and customers, this usually includes",
    helpItems: [
      "A website with the pages your customers actually ask for",
      "Logo, identity and a brand kit you can reuse",
      "Product, food and interior photography",
      "WhatsApp click-to-chat and order flows",
      "Payment links and checkout",
      "Google Business Profile and local SEO",
      "Training and handover, so it's genuinely yours",
    ],
    faqs: [
      {
        q: "We're not technical at all. Is that a problem?",
        a: "No. You bring the business knowledge, we bring the rest. Everything is explained in plain language, and we hand over training at the end so you're not dependent on us.",
      },
      {
        q: "How long does a first website take?",
        a: "Typically two to four weeks from the strategy call, depending on how much content and photography is needed.",
      },
      {
        q: "What does it cost, honestly?",
        a: "Fixed scope, quoted after the free Strategy & Planning call — never a surprise invoice. Payments run on milestones: roughly 50% to start, 30% at design sign-off, 20% before launch.",
      },
      {
        q: "Do you handle the domain and hosting?",
        a: "Yes, and they stay in your name. We register or transfer, set up SSL, email, DNS and backups, and give you the credentials. Both are billed at actual cost with no markup.",
      },
      {
        q: "Do you work with businesses outside Pune?",
        a: "Yes, and much of our work already is remote. The one caveat is photography — shoots need us in the room, so we either plan a travel day in or art-direct a local photographer.",
      },
      {
        q: "What happens after launch?",
        a: "Thirty days of support is included regardless. After that, maintenance is optional and priced separately — updates, backups, monitoring and a small allowance of changes each month.",
      },
    ],
    closing: {
      title: "Make the first move the right one.",
      body: "Going online once, properly, costs less than going online three times badly. Start with the piece that actually brings customers in.",
    },
    finalTitle: "Stop losing customers to a search result.",
    finalCta: "Start with a free strategy call",
  },
  {
    slug: "product-and-platform-teams",
    name: "Product & Platform Teams",
    who: "Established SaaS teams · Enterprise product teams · Internal tools & platforms",
    cardCta: "Scale your product",
    noun: "product teams",
    question: "Why is our product getting harder to scale?",
    heroTitle: "Fix the systems your product outgrew",
    heroSub:
      "For SaaS and platform teams where maintenance keeps winning and the roadmap keeps slipping.",
    pairs: [
      {
        problem: "Onboarding loses users before they see any value.",
        solution:
          "We rebuild activation around the first real moment of value, then measure whether it moved.",
      },
      {
        problem: "Internal work runs on spreadsheets and copy-paste.",
        solution:
          "We build the internal tools and dashboards that retire the workarounds for good.",
      },
      {
        problem: "The roadmap keeps losing to maintenance.",
        solution:
          "We take the platform work off your team so they get back to shipping features.",
      },
      {
        problem: "Our systems don't talk to each other.",
        solution:
          "We integrate the APIs and automate the handoffs nobody wants to keep doing by hand.",
      },
      {
        problem: "The UI grew by accretion, and it shows.",
        solution:
          "We rationalise it into a design system your team can build from without re-deciding everything.",
      },
    ],
    helpTitle: "What we help you rebuild and scale",
    helpSub: "Depending on your platform and team, this usually includes",
    helpItems: [
      "Onboarding and activation flows",
      "Internal tools and admin dashboards",
      "API integrations and workflow automation",
      "Performance, reliability and technical debt",
      "Design system and UI overhaul",
      "Reporting, analytics and data pipelines",
      "Documentation and clean handover",
    ],
    faqs: [
      {
        q: "Do you work inside an existing codebase?",
        a: "Yes — that's most of this work. We read before we write, work in your repo and review process, and leave the codebase in a state your team recognises.",
      },
      {
        q: "How do you scope work when the problem isn't clear yet?",
        a: "We start with a short paid discovery: audit the system, instrument what matters, and come back with a scoped plan. You can stop there and take the plan elsewhere if you want.",
      },
      {
        q: "Can you cover internal tools rather than customer-facing product?",
        a: "Often that's where the fastest return is. Admin panels, ops dashboards and automation rarely get roadmap priority, and they quietly cost a person's week every week.",
      },
      {
        q: "How do you handle security and access?",
        a: "Least privilege, scoped credentials, NDA before access, and no production data leaving your environment. Access is revoked at handover.",
      },
      {
        q: "Do you work with our designers and PMs?",
        a: "Yes. We slot into your rituals rather than importing ours — your standups, your board, your definition of done.",
      },
      {
        q: "What happens when the engagement ends?",
        a: "Documentation, a walkthrough with your team, and thirty days of support. The goal is that nothing we built needs us to keep running.",
      },
    ],
    closing: {
      title: "Make scale a decision, not an accident.",
      body: "Systems don't fail all at once — they get slower to change until nobody wants to touch them. Fix the foundation while it's still a choice.",
    },
    finalTitle: "Stop maintaining. Start shipping again.",
    finalCta: "Start with a free systems audit",
  },
];

export function getPersona(slug: string) {
  return PERSONAS.find((p) => p.slug === slug);
}
