/**
 * Guides (/guides/[slug]).
 *
 * Fewer, better pieces, each written from work the studio has actually done
 * and citing primary sources (Google, Meta) for anything factual. Every guide
 * carries a real author and real dates.
 *
 * `draft: true` guides are built and reachable by URL so they can be
 * reviewed, but they are noindex, absent from the sitemap and not linked from
 * anywhere. Flip to false only after the named author has read and approved
 * the guide — it is published under their name.
 */
import type { ServiceSlug } from "./case-studies";

export type Block = string | { list: string[] } | { steps: { title: string; body: string }[] };

export type Guide = {
  slug: string;
  title: string;
  /** <title>, when it should differ from the H1. */
  seoTitle?: string;
  description: string;
  draft: boolean;
  /** ISO dates. */
  published: string;
  updated: string;
  category: "Local SEO" | "Automation" | "Web development";
  summary: string;
  sections: { heading: string; blocks: Block[] }[];
  sources: { label: string; url: string }[];
  services: ServiceSlug[];
  /** CaseStudy.slug values */
  work: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "google-business-profile-checklist-pune",
    title: "Google Business Profile for Pune businesses: a practical checklist",
    seoTitle: "Google Business Profile Checklist for Pune Businesses",
    description:
      "A step-by-step Google Business Profile checklist for Pune businesses: name, categories, address, hours, services, photos, reviews and the website details that must match.",
    draft: true,
    published: "2026-10-01",
    updated: "2026-10-01",
    category: "Local SEO",
    summary:
      "What to fill in, what to leave out, and the one consistency check most Pune businesses miss — written from setting up and auditing real profiles, including our own.",
    sections: [
      {
        heading: "Why the profile matters more than the website for local searches",
        blocks: [
          "When someone searches for a café, a clinic or a designer \"near me\", Google usually shows a map with three businesses before any ordinary result. Those three come from Google Business Profiles, not websites.",
          "Google says local results are based mainly on three things: relevance (how well a profile matches the search), distance (how far the business is from the searcher) and prominence (how well known the business is, including reviews and links). You can't move your shop closer to every customer, but relevance and prominence are mostly in your hands, and most of that work happens in the profile.",
        ],
      },
      {
        heading: "The checklist",
        blocks: [
          {
            steps: [
              {
                title: "Claim and verify the profile",
                body: "Search for your business on Google Maps first; a profile may already exist. Verification has to be completed by the business owner or someone they authorise, and an unverified profile can't be fully managed.",
              },
              {
                title: "Use your real business name, nothing else",
                body: "The name should match your signage and paperwork. Adding keywords or locations (\"Best Café Koregaon Park\") breaks Google's guidelines and can get a profile suspended.",
              },
              {
                title: "Pick the most specific primary category",
                body: "The primary category is one of the strongest relevance signals. Choose the most specific one that describes your core business (\"Dental clinic\" rather than \"Doctor\"), then add secondary categories only for things you genuinely offer.",
              },
              {
                title: "Decide: address, service area, or both",
                body: "Show your address only if customers visit you there. If you visit customers instead, hide the address and set a service area. Pune businesses that do both can show the address and set a service area too.",
              },
              {
                title: "Write the address exactly as it appears everywhere else",
                body: "Locality spelling and PIN code matter. \"Shivajinagar\" versus \"Shivaji Nagar\", or 411005 versus 411007, looks trivial but creates two versions of your business across the web.",
              },
              {
                title: "Set accurate hours, including holidays",
                body: "Wrong hours are the fastest way to lose a customer's trust. Add special hours for festivals and closures.",
              },
              {
                title: "List your services and link the website",
                body: "Add each service by the name customers use, and link the profile to your website's home page or a location page.",
              },
              {
                title: "Add real photos and keep adding them",
                body: "Exterior (so people recognise you), interior, team, and your actual products or work. Stock images don't help anyone choose you.",
              },
              {
                title: "Write a plain description",
                body: "What you do, who for, and where, in normal sentences. No links, no keyword lists, no promotions.",
              },
            ],
          },
        ],
      },
      {
        heading: "The consistency check most businesses miss",
        blocks: [
          "Your business name, address and phone number need to be identical on the profile, your website and every other listing (Justdial, IndiaMART, Instagram, LinkedIn, directories). Google cross-checks these sources, and mismatches weaken its confidence that they all describe the same business.",
          "We found this on our own profile. The Business Profile said Shivajinagar, Pune 411005; our website said Shivaji Nagar, Pune 411007. Same street, different spelling, different PIN code. We changed every mention on the site to match the profile exactly, and added the profile's link to the website's structured data so Google can connect the two directly.",
          {
            list: [
              "Copy the address from your profile and paste it, unchanged, into your website footer, contact page and every listing.",
              "Use one phone number everywhere — ideally the one that's also on WhatsApp.",
              "If your website has structured data, make sure its address, phone and map pin match the profile.",
            ],
          },
        ],
      },
      {
        heading: "Reviews: ask everyone, incentivise no one",
        blocks: [
          "Reviews feed prominence, and recent, detailed reviews help customers decide. Google's policies prohibit offering incentives for reviews, writing reviews for your own business, and selectively asking only happy customers.",
          {
            list: [
              "Ask every customer after a completed job or visit, with a direct link to your review form (available from the profile's \"Ask for reviews\" option).",
              "Suggest they mention what they bought or what service they received; never script the wording.",
              "Reply to every review, positive or negative, briefly and specifically.",
            ],
          },
        ],
      },
      {
        heading: "What to check every month",
        blocks: [
          "The profile's performance view shows how people found you and what they did: calls, direction requests, website clicks and messages. Look at these alongside the local searches in Google Search Console. If calls and direction requests are rising, the profile is working.",
          "Also check that nobody has suggested an edit that changed your hours, phone or category. Anyone can suggest edits, and Google sometimes applies them.",
        ],
      },
    ],
    sources: [
      { label: "Google Business Profile Help — Tips to improve your local ranking on Google", url: "https://support.google.com/business/answer/7091" },
      { label: "Google Business Profile Help — Guidelines for representing your business on Google", url: "https://support.google.com/business/answer/3038177" },
      { label: "Google Maps Help — Prohibited and restricted content (reviews)", url: "https://support.google.com/contributionpolicy/answer/7400114" },
    ],
    services: ["local-seo", "seo"],
    work: ["cafe", "dentora"],
  },
  {
    slug: "whatsapp-business-api-automation-small-business",
    title: "What the WhatsApp Business API can automate for a small business",
    seoTitle: "WhatsApp Business API Automation for Small Businesses",
    description:
      "What the WhatsApp Business API can and can't automate for a small business — menus, bookings, orders, lead capture and follow-ups — from building our own WhatsApp lead engine.",
    draft: true,
    published: "2026-10-01",
    updated: "2026-10-01",
    category: "Automation",
    summary:
      "The difference between the WhatsApp Business app and the API, what automation is actually possible, the rules that shape it, and where a human should stay in the loop.",
    sections: [
      {
        heading: "The app versus the API",
        blocks: [
          "Most small businesses in India already use the free WhatsApp Business app on a phone. It gives you a business profile, a catalogue, quick replies, a greeting message and an away message. It's good, and for many businesses it's enough.",
          "The WhatsApp Business Platform (usually called the API) is different: there's no phone app. Messages go to software you control, which can reply automatically, show interactive menus, save details to a CRM and notify your team. It's what you need once the same questions take hours of someone's day, or leads start getting lost between chats.",
        ],
      },
      {
        heading: "What can be automated",
        blocks: [
          {
            list: [
              "Answering common questions — timings, prices, location, availability — instantly, at any hour.",
              "Interactive menus: reply buttons and list messages that let a customer tap instead of type.",
              "Taking bookings, orders or enquiries step by step, including multi-screen forms (WhatsApp Flows) inside the chat.",
              "Capturing lead details (name, requirement, budget) straight into a CRM, with the source recorded.",
              "Confirmations, reminders and status updates sent from your systems.",
              "Handing the conversation to a person when the customer asks, or when the bot can't help.",
            ],
          },
        ],
      },
      {
        heading: "The rules that shape every design",
        blocks: [
          "Two platform rules decide what a WhatsApp automation can do, and they're worth understanding before you plan anything.",
          {
            steps: [
              {
                title: "The 24-hour customer service window",
                body: "When a customer messages you, you can reply freely for 24 hours from their last message. After that, you can only start a conversation with a pre-approved template message.",
              },
              {
                title: "Template messages and opt-in",
                body: "Templates (reminders, confirmations, offers) must be approved by Meta and can only be sent to people who have agreed to hear from you. Meta charges for template messages; check its current pricing page, because the model has changed more than once.",
              },
            ],
          },
          "In practice this means automation works best for conversations the customer starts — enquiries, bookings, orders — and for transactional updates they expect, not for cold broadcasting.",
        ],
      },
      {
        heading: "How we built ours",
        blocks: [
          "We run our own enquiries through a WhatsApp flow engine we built on the Cloud API. It verifies Meta's webhook, moves each conversation through a configurable set of steps (a state machine), sends interactive messages and Flows, and writes every captured lead into our CRM with where it came from.",
          "Three lessons from building and running it:",
          {
            list: [
              "Keep the flow in configuration, not code. Changing a question or adding a step should be an edit, not a redeploy.",
              "Always offer a way out to a person. A customer stuck in a menu loop is worse than no automation.",
              "Store the lead the moment you have it. If someone drops off halfway, you still have their number and what they asked for.",
            ],
          },
        ],
      },
      {
        heading: "Where a human should stay in the loop",
        blocks: [
          "AI can draft replies and classify enquiries well, but some things should stay with a person: quoting prices for custom work, handling complaints, and anything involving health, money or commitments. We design automations with explicit hand-off points for exactly these.",
        ],
      },
      {
        heading: "Do you need it yet?",
        blocks: [
          "A useful test: if one person spends more than an hour a day answering the same WhatsApp questions, or you've lost track of a lead in the last month, the API is probably worth it. If not, the free Business app with quick replies and a catalogue will serve you well for now.",
        ],
      },
    ],
    sources: [
      { label: "Meta for Developers — WhatsApp Cloud API overview", url: "https://developers.facebook.com/docs/whatsapp/cloud-api/overview" },
      { label: "Meta for Developers — Interactive messages", url: "https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-reply-buttons-messages" },
      { label: "Meta for Developers — WhatsApp Flows", url: "https://developers.facebook.com/docs/whatsapp/flows" },
      { label: "Meta for Developers — Pricing on the WhatsApp Business Platform", url: "https://developers.facebook.com/docs/whatsapp/pricing" },
    ],
    services: ["ai-automation", "custom-software"],
    work: [],
  },
  {
    slug: "migrate-from-wix-without-losing-seo",
    title: "Moving off Wix without losing your search traffic",
    seoTitle: "How to Migrate from Wix Without Losing SEO",
    description:
      "How to move a website off Wix (or any site builder) to a codebase you own without losing Google rankings: content inventory, URL mapping, 301 redirects and post-launch checks.",
    draft: true,
    published: "2026-10-01",
    updated: "2026-10-01",
    category: "Web development",
    summary:
      "The migration process we follow when rebuilding a site-builder site as a Next.js site — the same one we used to move Tekton Talent Solutions off Wix.",
    sections: [
      {
        heading: "Why businesses outgrow site builders",
        blocks: [
          "Wix, Squarespace and similar builders are a good way to get online quickly. Businesses usually leave for the same reasons: the site is slow on phones, the design looks like a template, custom features (booking logic, integrations, member areas) aren't possible, or they want to own the code outright.",
          "The risk in moving is search traffic. Google has learned your existing URLs; if they disappear without a forwarding address, the rankings attached to them go too. A careful migration keeps that from happening.",
        ],
      },
      {
        heading: "The process",
        blocks: [
          {
            steps: [
              {
                title: "Inventory every URL",
                body: "List every page Google knows about: from the old sitemap, from Search Console's pages and performance reports, and from a crawl. Note which pages get impressions and clicks — those must not be lost.",
              },
              {
                title: "Move all the content, not just the design",
                body: "When we rebuilt Tekton Talent Solutions' site, every piece of content from the original came across before any of it was rewritten. Dropping pages during a migration is the most common cause of lost traffic.",
              },
              {
                title: "Map old URLs to new ones",
                body: "Site builders often produce long or odd URLs. It's fine to clean them up — but every old URL needs a destination on the new site: the same page if it still exists, or the closest equivalent.",
              },
              {
                title: "Use permanent (301 or 308) redirects",
                body: "Permanent redirects tell Google the page has moved for good, so it transfers the old URL's signals to the new one. Redirect each URL directly to its final destination — no chains.",
              },
              {
                title: "Carry over what was working",
                body: "Keep titles and descriptions for pages that already rank, unless they were genuinely poor. Keep the same headings and core text on pages people find through search.",
              },
              {
                title: "Launch, then submit the new sitemap",
                body: "Once the new site is live on the same domain, submit the new sitemap in Search Console. If the domain itself changes, Google's change-of-address tool also applies.",
              },
            ],
          },
        ],
      },
      {
        heading: "After launch: what to check",
        blocks: [
          {
            list: [
              "Crawl the old URL list against the live site: every one should return a redirect to a page that returns 200.",
              "Watch Search Console's indexing report for a rise in \"Not found (404)\" pages.",
              "Compare clicks and impressions for your top pages week by week for at least a month. Some movement is normal; a sustained drop on one page usually means a missing redirect or missing content.",
              "Check that structured data, canonical tags and the sitemap point to the new URLs.",
            ],
          },
        ],
      },
      {
        heading: "What you gain",
        blocks: [
          "A site you own, that loads faster, that a developer can extend without fighting a platform, and that costs very little to host when pages are statically generated. Done carefully, the move should not cost you the search visibility you already have.",
        ],
      },
    ],
    sources: [
      { label: "Google Search Central — Site moves with URL changes", url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes" },
      { label: "Google Search Central — Redirects and Google Search", url: "https://developers.google.com/search/docs/crawling-indexing/301-redirects" },
    ],
    services: ["web-development", "seo"],
    work: ["tekton"],
  },
];

export const publishedGuides = () => GUIDES.filter((g) => !g.draft);
export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
