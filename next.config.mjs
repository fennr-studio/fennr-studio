/** @type {import('next').NextConfig} */
const nextConfig = {
  // Latency / hardening
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    const oneYearImmutable = "public, max-age=31536000, immutable";
    return [
      {
        // All local site images (public/img/*) — cache hard for repeat visits
        source: "/img/:path*",
        headers: [{ key: "Cache-Control", value: oneYearImmutable }],
      },
      {
        // Other static media (favicon, founder photo, fonts, etc.)
        source: "/:all*(jpg|jpeg|png|gif|svg|webp|avif|ico|woff|woff2)",
        headers: [{ key: "Cache-Control", value: oneYearImmutable }],
      },
    ];
  },
};

export default nextConfig;
