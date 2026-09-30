/**
 * The business, stated once.
 *
 * Every page, the footer, the contact page and the JSON-LD graph read from
 * here, so name/address/phone can never drift apart between them — NAP
 * consistency is a local-ranking signal, and a mismatch between the site and
 * the Google Business Profile is the most common way it breaks.
 *
 * Only verified facts belong in this file. If something is not true yet (a
 * second office, an award, a rating), it does not go here.
 */
import { SITE_URL } from "./seo";

export const BUSINESS = {
  name: "Fennr Studio",
  legalName: "Fennr Studio",
  /** How the brand is written in running copy. */
  short: "fennr",
  url: SITE_URL,
  email: "hello@fennrstudio.com",
  /** E.164 for schema and tel: links; display form for humans. */
  phone: "+919765190702",
  phoneDisplay: "+91 97651 90702",
  whatsapp: "https://wa.me/919765190702",
  calendly: "https://calendly.com/fennrstudio/new-meeting",
  /** Google Business Profile on Maps — for "Find us" links and reviews. */
  maps: "https://maps.google.com/?cid=7499107552488342646",
  /**
   * Must match the Google Business Profile character for character:
   * "Shivajinagar, Pune, Maharashtra 411005" (checked on Maps, 30 Sep 2026).
   */
  address: {
    street: "Shivajinagar",
    locality: "Pune",
    region: "Maharashtra",
    postalCode: "411005",
    country: "IN",
    countryName: "India",
  },
  /** The verified pin from the Business Profile — never an approximation. */
  geo: { lat: 18.5226292, lng: 73.8482458 },
  /** As listed on the Business Profile. Change both together. */
  open24h: true,
  founder: {
    name: "Gurnoor Singh",
    role: "Founder",
    image: "/founder.jpg",
    alumniOf: "Indian Institute of Information Technology Guwahati",
  },
  /**
   * Public profiles that are the same entity. Google uses these to join the
   * website to the Business Profile and social accounts.
   *
   * The Business Profile is referenced by its Maps CID, the stable form of a
   * listing URL (decoded from the owner's profile link, feature id
   * 0x3bc2c1bd7adaf03b:0x68122e9646844476).
   *
   * TODO(owner): add the LinkedIn company page URL. It exists but is not
   * recorded anywhere, and a guessed URL here is worse than none.
   */
  sameAs: [
    "https://www.instagram.com/fennrstudio/",
    "https://github.com/fennr-studio",
    "https://maps.google.com/?cid=7499107552488342646",
    // "https://www.linkedin.com/company/<slug>/",
  ] as string[],
} as const;

export const ADDRESS_LINE = `${BUSINESS.address.street}, ${BUSINESS.address.locality} ${BUSINESS.address.postalCode}, ${BUSINESS.address.region}, ${BUSINESS.address.countryName}`;

/** The one-sentence entity description, reused by the homepage, schema and About. */
export const ENTITY_DESCRIPTION =
  "Fennr Studio is a design and technology studio in Pune building websites, web apps, brands, photography, SEO and AI automation for businesses across India and worldwide.";
