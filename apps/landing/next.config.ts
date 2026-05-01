import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // Enable static optimization
  reactStrictMode: true,

  // Hide dev indicator
  devIndicators: false,

  // Allow images from S3 with optimized settings
  images: {
    unoptimized: true,
  },

  // Don't bundle sharp — install native binary on target server
  serverExternalPackages: ["sharp"],

  // Disable nginx response buffering (fixes 502 on SSR pages)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },

  // 301-redirect old standalone legal pages to the locale home — content moved into modals
  // accessible from the cookie banner / footer / signup microcopy. Search engines drop the
  // old URLs after one crawl cycle.
  async redirects() {
    return [
      { source: "/:locale/cookies", destination: "/:locale", permanent: true },
      { source: "/:locale/privacy", destination: "/:locale", permanent: true },
      { source: "/:locale/terms", destination: "/:locale", permanent: true },
      { source: "/:locale/languages", destination: "/:locale", permanent: true },
      // Locale-less variants too in case anyone bookmarked.
      { source: "/cookies", destination: "/", permanent: true },
      { source: "/privacy", destination: "/", permanent: true },
      { source: "/terms", destination: "/", permanent: true },
      { source: "/languages", destination: "/", permanent: true },
    ];
  },

};

export default withNextIntl(nextConfig);
