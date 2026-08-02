export const META_PIXEL_ID = "1754362762431790";

/**
 * Fire a Meta Pixel event from anywhere on the client.
 * e.g. fbTrack("Lead") when a brief/enquiry is submitted.
 */
export function fbTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (fbq) fbq("track", event, params);
  }
}
