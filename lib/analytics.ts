/**
 * Conversion events, sent to GA4 and the Meta Pixel from one place.
 *
 * GA4 event names follow Google's recommended names where one exists
 * (`generate_lead`) so they can be marked as key events without mapping.
 * No personal data goes into params — only what was clicked or submitted and
 * where, so organic-landing → conversion can be joined in GA4.
 */
export type ConversionEvent =
  | "generate_lead"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "calendar_booking"
  | "brief_started"
  | "brief_completed"
  | "preview_request"
  | "newsletter_signup";

/** Meta standard events that correspond to ours. */
const META: Partial<Record<ConversionEvent, string>> = {
  generate_lead: "Lead",
  preview_request: "Lead",
  calendar_booking: "Schedule",
  whatsapp_click: "Contact",
  phone_click: "Contact",
  email_click: "Contact",
  newsletter_signup: "Subscribe",
};

type W = Window & {
  gtag?: (...a: unknown[]) => void;
  dataLayer?: unknown[];
  fbq?: (...a: unknown[]) => void;
};

export function track(event: ConversionEvent, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  const payload = { page_path: window.location.pathname, ...params };
  if (w.gtag) w.gtag("event", event, payload);
  else (w.dataLayer ||= []).push({ event, ...payload });
  const meta = META[event];
  if (meta && w.fbq) w.fbq("track", meta, { content_name: event });
}
