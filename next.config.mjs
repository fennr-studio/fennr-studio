/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the Turbopack workspace root — without this it walks up and picks the
  // home directory (which has its own lockfile), breaking module resolution.
  turbopack: {
    root: import.meta.dirname,
  },

  // Latency / hardening
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    const oneYearImmutable = "public, max-age=31536000, immutable";

    // ---------------------------------------------------------------
    // Content-Security-Policy
    //
    // Deliberately hash/nonce-free. Nonces are the stronger option, but in the
    // App Router they require reading headers() during render, which opts every
    // page out of static generation — this whole site is prerendered, so that
    // would trade real, measurable latency for defence against an attack this
    // site is barely exposed to: nothing here renders user-supplied HTML. The
    // only dangerouslySetInnerHTML calls are JSON.stringify of static objects.
    //
    // So script-src keeps 'unsafe-inline' (required by Next's own streaming
    // bootstrap, the Meta Pixel loader and GA) but the host allowlist still
    // blocks an injected <script src> pointing anywhere we do not trust, and
    // connect-src limits where data can be sent. Revisit nonces if the site
    // ever renders user content.
    // ---------------------------------------------------------------
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      // Matches X-Frame-Options: SAMEORIGIN below. Tighten to 'none' if the
      // site is never embedded, even by us.
      "frame-ancestors 'self'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
      // Tailwind is compiled to a stylesheet, but next/image and framer-motion
      // both set inline styles.
      "style-src 'self' 'unsafe-inline'",
      [
        "img-src 'self' data: blob:",
        "https://www.facebook.com",
        "https://*.google-analytics.com https://www.googletagmanager.com",
        "https://www.google.com https://*.g.doubleclick.net",
      ].join(" "),
      "font-src 'self' data:",
      // Supabase auth from /admin, plus the analytics beacons. Note that a CSP
      // wildcard needs a subdomain — `*.analytics.google.com` does NOT match
      // `analytics.google.com`, so the bare host is listed too.
      [
        "connect-src 'self'",
        "https://*.supabase.co wss://*.supabase.co",
        "https://*.google-analytics.com",
        "https://analytics.google.com https://*.analytics.google.com",
        "https://www.google.com https://*.g.doubleclick.net",
        "https://www.googletagmanager.com",
        "https://connect.facebook.net https://www.facebook.com",
      ].join(" "),
      // The Pixel injects an iframe for some event types.
      "frame-src https://www.facebook.com",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    // Baseline security headers on every response.
    const security = [
      { key: "Content-Security-Policy", value: csp },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];
    return [
      { source: "/(.*)", headers: security },
      {
        source: "/img/:path*",
        headers: [{ key: "Cache-Control", value: oneYearImmutable }],
      },
      {
        source: "/:all*(jpg|jpeg|png|gif|svg|webp|avif|ico|woff|woff2)",
        headers: [{ key: "Cache-Control", value: oneYearImmutable }],
      },
      {
        // Never let the admin/API be cached by shared proxies
        source: "/admin",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
