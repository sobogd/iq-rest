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
      // Old KW landings /it/menu-digitale, /it/menu-qr-code and
      // /it/creare-menu-digitale all 301 to /it — SEO weight consolidated on
      // the locale home. The PPC variant lives at
      // /it/lp/menu-digitale-per-ristoranti (noindex); the old
      // /it/lp/menu-digitale slug 301s to the new phrase-keyword URL so
      // existing Google Ads clicks keep landing.
      { source: "/it/menu-digitale", destination: "/it", permanent: true },
      { source: "/it/menu-qr-code", destination: "/it", permanent: true },
      { source: "/it/creare-menu-digitale", destination: "/it", permanent: true },
      { source: "/it/lp/menu-digitale", destination: "/it/lp/menu-digitale-per-ristoranti", permanent: true },
      // Spanish KW landings: /es absorbed /es/carta-digital (SEO weight).
      // /es/menu-digital and /es/qr-carta were dropped — collapse all three
      // into /es. PPC lives at /es/lp/carta-digital-para-restaurante
      // (noindex); the older /es/lp/carta-digital slug 301s to the new
      // phrase-keyword URL so existing Google Ads clicks keep landing.
      { source: "/es/carta-digital", destination: "/es", permanent: true },
      { source: "/es/menu-digital", destination: "/es", permanent: true },
      { source: "/es/qr-carta", destination: "/es", permanent: true },
      { source: "/es/lp/carta-digital", destination: "/es/lp/carta-digital-para-restaurante", permanent: true },
      // English online-ordering feature page renamed to its target keyword:
      // "restaurant online ordering system" (1000/mo, low competition).
      // /en/online-orders 301s to the new slug; SEO weight (Bing + internal
      // links from /en footer) carries over.
      { source: "/en/online-orders", destination: "/en/restaurant-online-ordering-system", permanent: true },
      { source: "/es/online-orders", destination: "/es/sistema-de-pedidos-para-restaurantes", permanent: true },
      { source: "/it/online-orders", destination: "/it/tablet-per-ordinazioni-ristorante", permanent: true },
      { source: "/fr/online-orders", destination: "/fr/logiciel-prise-de-commande-restaurant", permanent: true },
      { source: "/de/online-orders", destination: "/de/restaurant-bestellsystem", permanent: true },
      { source: "/pt/online-orders", destination: "/pt/sistema-de-pedidos-online-restaurante", permanent: true },
      { source: "/ru/online-orders", destination: "/ru/sistema-onlayn-zakazov-restorana", permanent: true },
      { source: "/pl/online-orders", destination: "/pl/system-zamowien-online-dla-restauracji", permanent: true },
      { source: "/nl/online-orders", destination: "/nl/online-bestelsysteem-voor-restaurants", permanent: true },
      { source: "/ja/online-orders", destination: "/ja/qr-order-system-restaurant", permanent: true },
      { source: "/zh/online-orders", destination: "/zh/qr-ordering-system-restaurant", permanent: true },
      { source: "/tr/online-orders", destination: "/tr/restoran-online-siparis-sistemi", permanent: true },
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
