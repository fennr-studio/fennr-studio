"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * One delegated click listener for every contact link on the site, so no
 * component has to remember to call track() — a new WhatsApp button anywhere
 * is tracked automatically. Renders nothing.
 */
export default function ConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const location = a.closest("header,footer,main section")?.id || a.closest("header,footer")?.tagName.toLowerCase() || "";
      const params = { link_location: location };
      if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) track("whatsapp_click", params);
      else if (href.startsWith("tel:")) track("phone_click", params);
      else if (href.startsWith("mailto:")) track("email_click", params);
      else if (href.includes("calendly.com")) track("calendar_booking", params);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
