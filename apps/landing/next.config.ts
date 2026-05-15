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
      // Changelog removed — redirect listing and any entry to the locale home.
      { source: "/:locale/changelog", destination: "/:locale", permanent: true },
      { source: "/:locale/changelog/:entry*", destination: "/:locale", permanent: true },
      { source: "/changelog", destination: "/", permanent: true },
      { source: "/changelog/:entry*", destination: "/", permanent: true },
      // Old KW landing /it/menu-digitale folded into /it (organic). The PPC
      // variant moved to /it/lp/menu-digitale-per-ristoranti and is noindex
      // from day one. The old /it/lp/menu-digitale slug 301s to the new
      // phrase-keyword URL so existing Google Ads clicks keep landing.
      { source: "/it/menu-digitale", destination: "/it", permanent: true },
      { source: "/it/lp/menu-digitale", destination: "/it/lp/menu-digitale-per-ristoranti", permanent: true },
      // Spanish KW landings: /es absorbed /es/carta-digital (SEO weight).
      // /es/menu-digital and /es/qr-carta were dropped — collapse all three
      // into /es. PPC lives at /es/lp/carta-digital (noindex).
      { source: "/es/carta-digital", destination: "/es", permanent: true },
      { source: "/es/menu-digital", destination: "/es", permanent: true },
      { source: "/es/qr-carta", destination: "/es", permanent: true },
      // Public menu lives on <slug>.iq-rest.com now. Legacy short links and
      // locale-prefixed /m/<slug> URLs (printed QR codes, old crawl) 301 to
      // the subdomain. Locale routing happens on the public-menu service.
      { source: "/m/:slug", destination: "https://:slug.iq-rest.com", permanent: true },
      { source: "/:locale/m/:slug", destination: "https://:slug.iq-rest.com", permanent: true },
      // Auth migrated to dashboard.iq-rest.com — keep link equity on any
      // login/signup URLs that might still be indexed.
      { source: "/:locale/login", destination: "https://dashboard.iq-rest.com/:locale/login", permanent: true },
      { source: "/:locale/signup", destination: "https://dashboard.iq-rest.com/:locale/login?create=true", permanent: true },
      { source: "/:locale/otp", destination: "https://dashboard.iq-rest.com/:locale/login", permanent: true },
      { source: "/:locale/logout", destination: "https://dashboard.iq-rest.com/:locale/logout", permanent: true },
    ];
  },

};

export default withNextIntl(nextConfig);
