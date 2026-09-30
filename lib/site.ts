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
  address: {
    street: "Shivaji Nagar",
    locality: "Pune",
    region: "Maharashtra",
    postalCode: "411007",
    country: "IN",
    countryName: "India",
  },
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
   * TODO(owner): paste the exact URLs for the Google Business Profile
   * ("Share" → copy link from Maps) and the LinkedIn company page. They are
   * confirmed to exist but the URLs are not recorded anywhere in the repo, and
   * a guessed URL here is worse than none.
   */
  sameAs: [
    "https://www.instagram.com/fennrstudio/",
    "https://github.com/fennr-studio",
    // "https://www.linkedin.com/company/<slug>/",
    // "https://maps.app.goo.gl/<id>",
  ] as string[],
} as const;

export const ADDRESS_LINE = `${BUSINESS.address.street}, ${BUSINESS.address.locality} ${BUSINESS.address.postalCode}, ${BUSINESS.address.region}, ${BUSINESS.address.countryName}`;

/** The one-sentence entity description, reused by the homepage, schema and About. */
export const ENTITY_DESCRIPTION =
  "Fennr Studio is a design and technology studio in Pune building websites, web apps, brands, photography, SEO and AI automation for businesses across India and worldwide.";
