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
    // Baseline security headers on every response.
    const security = [
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
