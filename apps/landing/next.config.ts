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

  // Redirect strategy after the May-2026 4-feature rollout:
  //   * Each locale now ships exactly four feature pages + pricing + home.
  //     All other historical feature dirs (ai-translation, easy-menu,
  //     reservations, etc.) are gone — generic 301s collapse them onto the
  //     locale home so old Google snippets and inbound links don't 404.
  //   * The previous SEO order-taking landings were renamed in every locale
  //     (e.g. EN `restaurant-online-ordering-system` → `restaurant-ordering-
  //     system`). One redirect per locale preserves the link equity.
  //   * PPC landing pages (`/:locale/lp/*`) were deleted entirely — single
  //     catch-all sends anything under /lp to the locale home.
  async redirects() {
    return [
      // Legacy /languages and /changelog pages — fold to locale home.
      { source: "/:locale/languages", destination: "/:locale", permanent: true },
      { source: "/languages", destination: "/", permanent: true },
      { source: "/:locale/changelog", destination: "/:locale", permanent: true },
      { source: "/:locale/changelog/:entry*", destination: "/:locale", permanent: true },
      { source: "/changelog", destination: "/", permanent: true },
      { source: "/changelog/:entry*", destination: "/", permanent: true },

      // All PPC landings deleted — catch every /lp/<slug> and dump on home.
      { source: "/:locale/lp/:slug*", destination: "/:locale", permanent: true },

      // Generic feature dirs that existed across every locale and got
      // deleted. One redirect each (uses :locale path-pattern, no need to
      // duplicate per locale).
      { source: "/:locale/ai-translation", destination: "/:locale", permanent: true },
      { source: "/:locale/multilingual", destination: "/:locale", permanent: true },
      { source: "/:locale/ai-images", destination: "/:locale", permanent: true },
      { source: "/:locale/easy-menu", destination: "/:locale", permanent: true },
      { source: "/:locale/custom-design", destination: "/:locale", permanent: true },
      { source: "/:locale/color-scheme", destination: "/:locale", permanent: true },
      { source: "/:locale/mobile-management", destination: "/:locale", permanent: true },
      { source: "/:locale/personal-support", destination: "/:locale", permanent: true },
      { source: "/:locale/instant-setup", destination: "/:locale", permanent: true },
      { source: "/:locale/analytics", destination: "/:locale", permanent: true },
      { source: "/:locale/reservations", destination: "/:locale", permanent: true },

      // Legacy keyword landings collapsed onto the locale home for SEO
      // equity (these slugs were indexed before the May-2026 rollout).
      { source: "/it/menu-digitale", destination: "/it", permanent: true },
      { source: "/it/menu-qr-code", destination: "/it/menu-qr-code-ristoranti", permanent: true },
      { source: "/it/creare-menu-digitale", destination: "/it", permanent: true },
      { source: "/es/carta-digital", destination: "/es", permanent: true },
      { source: "/es/menu-digital", destination: "/es", permanent: true },
      { source: "/es/qr-carta", destination: "/es/codigo-qr-restaurante", permanent: true },

      // /:locale/online-orders was the original shared order-taking URL;
      // 301 each to the new per-locale slug.
      { source: "/ru/online-orders", destination: "/ru/priem-zakazov-restoran", permanent: true },
      { source: "/en/online-orders", destination: "/restaurant-ordering-system", permanent: true },
      { source: "/online-orders", destination: "/restaurant-ordering-system", permanent: true },
      { source: "/es/online-orders", destination: "/es/sistema-pedidos-restaurante", permanent: true },
      { source: "/it/online-orders", destination: "/it/sistema-ordinazioni-ristorante", permanent: true },
      { source: "/fr/online-orders", destination: "/fr/systeme-commandes-restaurant", permanent: true },
      { source: "/de/online-orders", destination: "/de/restaurant-bestellsystem", permanent: true },
      { source: "/pt/online-orders", destination: "/pt/sistema-de-pedidos-restaurante", permanent: true },
      { source: "/nl/online-orders", destination: "/nl/bestelsysteem-restaurant", permanent: true },
      { source: "/pl/online-orders", destination: "/pl/system-zamowien-restauracja", permanent: true },
      { source: "/tr/online-orders", destination: "/tr/restoran-siparis-sistemi", permanent: true },
      { source: "/uk/online-orders", destination: "/uk/pryjom-zamovlen-restoran", permanent: true },
      { source: "/ja/online-orders", destination: "/ja/chumon-shisutemu-resutoran", permanent: true },
      { source: "/ko/online-orders", destination: "/ko/juneun-shiseutem-resutorang", permanent: true },
      { source: "/zh/online-orders", destination: "/zh/dian-can-xi-tong-can-ting", permanent: true },
      { source: "/ar/online-orders", destination: "/ar/nizam-talabat-matam", permanent: true },
      { source: "/fa/online-orders", destination: "/fa/sistem-sefaresh-restoran", permanent: true },
      { source: "/cs/online-orders", destination: "/cs/objednavkovy-system-restaurace", permanent: true },
      { source: "/sk/online-orders", destination: "/sk/objednavkovy-system-restauracia", permanent: true },
      { source: "/hu/online-orders", destination: "/hu/rendelesi-rendszer-etterem", permanent: true },
      { source: "/ro/online-orders", destination: "/ro/sistem-comenzi-restaurant", permanent: true },
      { source: "/el/online-orders", destination: "/el/systima-paragelion-estiatorio", permanent: true },
      { source: "/bg/online-orders", destination: "/bg/sistema-porachki-restorant", permanent: true },
      { source: "/hr/online-orders", destination: "/hr/sustav-narudzbi-restoran", permanent: true },
      { source: "/sr/online-orders", destination: "/sr/sistem-porudzbina-restoran", permanent: true },
      { source: "/sl/online-orders", destination: "/sl/sistem-narocanja-restavracija", permanent: true },
      { source: "/ca/online-orders", destination: "/ca/sistema-comandes-restaurant", permanent: true },
      { source: "/da/online-orders", destination: "/da/bestillingssystem-restaurant", permanent: true },
      { source: "/no/online-orders", destination: "/no/bestillingssystem-restaurant", permanent: true },
      { source: "/sv/online-orders", destination: "/sv/bestallningssystem-restaurang", permanent: true },
      { source: "/fi/online-orders", destination: "/fi/tilausjarjestelma-ravintola", permanent: true },
      { source: "/et/online-orders", destination: "/et/tellimissusteem-restoran", permanent: true },
      { source: "/lt/online-orders", destination: "/lt/uzsakymu-sistema-restoranas", permanent: true },
      { source: "/lv/online-orders", destination: "/lv/pasutijumu-sistema-restorans", permanent: true },
      { source: "/ga/online-orders", destination: "/ga/coras-orduithe-bialann", permanent: true },
      { source: "/is/online-orders", destination: "/is/pontunarkerfi-veitingastaur", permanent: true },

      // Old per-locale SEO order-taking slugs renamed in the May-2026
      // rollout — 301 to the new slug to preserve link equity.
      { source: "/ru/sistema-onlayn-zakazov-restorana", destination: "/ru/priem-zakazov-restoran", permanent: true },
      { source: "/en/restaurant-online-ordering-system", destination: "/restaurant-ordering-system", permanent: true },
      { source: "/restaurant-online-ordering-system", destination: "/restaurant-ordering-system", permanent: true },
      { source: "/es/sistema-de-pedidos-para-restaurantes", destination: "/es/sistema-pedidos-restaurante", permanent: true },
      { source: "/it/tablet-per-ordinazioni-ristorante", destination: "/it/sistema-ordinazioni-ristorante", permanent: true },
      { source: "/fr/logiciel-prise-de-commande-restaurant", destination: "/fr/systeme-commandes-restaurant", permanent: true },
      { source: "/pt/sistema-de-pedidos-online-restaurante", destination: "/pt/sistema-de-pedidos-restaurante", permanent: true },
      { source: "/nl/online-bestelsysteem-voor-restaurants", destination: "/nl/bestelsysteem-restaurant", permanent: true },
      { source: "/pl/system-zamowien-online-dla-restauracji", destination: "/pl/system-zamowien-restauracja", permanent: true },
      { source: "/tr/restoran-online-siparis-sistemi", destination: "/tr/restoran-siparis-sistemi", permanent: true },
      { source: "/uk/onlayn-systema-zamovlen-restoran", destination: "/uk/pryjom-zamovlen-restoran", permanent: true },
      { source: "/ja/qr-order-system-restaurant", destination: "/ja/chumon-shisutemu-resutoran", permanent: true },
      { source: "/ko/restaurant-online-order-system", destination: "/ko/juneun-shiseutem-resutorang", permanent: true },
      { source: "/zh/qr-ordering-system-restaurant", destination: "/zh/dian-can-xi-tong-can-ting", permanent: true },
      { source: "/ar/nizam-talabat-online-matam", destination: "/ar/nizam-talabat-matam", permanent: true },
      { source: "/fa/sistem-sefaresh-online-restoran", destination: "/fa/sistem-sefaresh-restoran", permanent: true },
      { source: "/cs/online-objednavkovy-system-restaurace", destination: "/cs/objednavkovy-system-restaurace", permanent: true },
      { source: "/sk/online-objednavkovy-system-restauracia", destination: "/sk/objednavkovy-system-restauracia", permanent: true },
      { source: "/hu/online-rendelesi-rendszer-etterem", destination: "/hu/rendelesi-rendszer-etterem", permanent: true },
      { source: "/ro/sistem-comenzi-online-restaurant", destination: "/ro/sistem-comenzi-restaurant", permanent: true },
      { source: "/el/online-systima-paragelion-estiatorio", destination: "/el/systima-paragelion-estiatorio", permanent: true },
      { source: "/bg/sistema-za-onlayn-porachki-restorant", destination: "/bg/sistema-porachki-restorant", permanent: true },
      { source: "/hr/online-sustav-narudzbi-restoran", destination: "/hr/sustav-narudzbi-restoran", permanent: true },
      { source: "/sr/online-sistem-porudzbina-restoran", destination: "/sr/sistem-porudzbina-restoran", permanent: true },
      { source: "/sl/spletni-sistem-narocanja-restavracija", destination: "/sl/sistem-narocanja-restavracija", permanent: true },
      { source: "/ca/sistema-de-comandes-online-restaurant", destination: "/ca/sistema-comandes-restaurant", permanent: true },
      { source: "/da/online-bestillingssystem-restaurant", destination: "/da/bestillingssystem-restaurant", permanent: true },
      { source: "/no/online-bestillingssystem-restaurant", destination: "/no/bestillingssystem-restaurant", permanent: true },
      { source: "/sv/online-bestallningssystem-restaurang", destination: "/sv/bestallningssystem-restaurang", permanent: true },
      { source: "/fi/online-tilausjarjestelma-ravintolalle", destination: "/fi/tilausjarjestelma-ravintola", permanent: true },
      { source: "/et/online-tellimissusteem-restoranile", destination: "/et/tellimissusteem-restoran", permanent: true },
      { source: "/lt/internetine-uzsakymu-sistema-restoranui", destination: "/lt/uzsakymu-sistema-restoranas", permanent: true },
      { source: "/lv/tiessaistes-pasutijumu-sistema-restoranam", destination: "/lv/pasutijumu-sistema-restorans", permanent: true },
      { source: "/ga/coras-orduithe-ar-line-bialann", destination: "/ga/coras-orduithe-bialann", permanent: true },
      { source: "/is/netpontunarkerfi-veitingastadar", destination: "/is/pontunarkerfi-veitingastaur", permanent: true },

      // RU-specific: previous prototype slugs from the first rollout were
      // dropped when the locale narrowed to 4 features. Send them home so
      // any indexed/cached URL doesn't 404.
      { source: "/ru/qr-menyu", destination: "/ru", permanent: true },
      { source: "/ru/ai-perevod-menyu", destination: "/ru", permanent: true },
      { source: "/ru/ai-generatsiya-foto-blyud", destination: "/ru", permanent: true },
      { source: "/ru/upravlenie-s-telefona", destination: "/ru", permanent: true },

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
