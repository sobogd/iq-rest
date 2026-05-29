# iq-rest-landing

> ## NOT MAINTAINED — do not modify code in this repo
>
> **This repository is the legacy marketing landing PLUS the old version of the IQ Rest dashboard. It has been superseded:**
>
> - The **dashboard** has moved to `iq-rest-dashboard-web` (Vite/React SPA on `dashboard.iq-rest.com`) backed by `iq-rest-dashboard-api`.
> - The **public menu** has moved to `iq-rest-public-menu` + `iq-rest-public-menu-api` (served at `<slug>.iq-rest.com`).
>
> The marketing landing portion is still serving live traffic at **iq-rest.com** under PM2 process name `iq-rest` (Next.js, port 8123). Don't touch it unless explicitly asked. **Do not delete the repo either** — it's the canonical reference for the in-product help guide and still owns ~hundreds of indexed SEO URLs (the giant 301 table in `next.config.ts`).
>
> This CLAUDE.md exists **for reference only**. For any dashboard work, use `iq-rest-dashboard-api` / `iq-rest-dashboard-web` instead. For any guest-menu work, use `iq-rest-public-menu` / `iq-rest-public-menu-api`.

> **Update 2026-05-28 (Stage C teardown).** The legacy in-landing dashboard (`app/[locale]/dashboard/...`) was deleted from the repo. The only thing that remains here for dashboard-related routes is the 301 redirect table in `next.config.ts:195–211` (login/signup/otp/logout + `/dashboard/*` → `dashboard.iq-rest.com`). The marketing-only mode means `prisma/`, `@prisma/client`, `prisma`, and `stripe` are no longer needed at runtime (only string mentions remain in marketing copy). The `types/index.ts` file has zero importers. The 4 places that branch on `auth.legacyDashboard` (auth-step, use-landing-auth, use-primary-cta, create-flow-modal) are dead now that the API always returns `false`. ~40 unused shadcn components remain in `components/ui/`. See `/home/deploy/dev/AUDIT_2026-05-29.md` for the full audit + a recommended-commit list.

## Branch and naming caveats

- **Working branch is `release`** (not `master`, not `main`). Both other branches exist on the remote but are stale. Any reference checkout must use `release`.
- **`package.json` `name` field still says `"soqrmenuweb"`** — the repo was renamed but the package field wasn't updated. Don't be confused if you see that string in scripts, build artifacts, or PM2 ecosystem files. The actual repo is `github.com/sobogd/iq-rest-landing`.
- Prod PM2 process is `iq-rest` (runs from `/home/deploy/apps/iq-rest/`, built by GitHub Actions on push to `release`).

## Build rule on this server (read first)

This server has ~3.7 GB RAM. **DO NOT run production builds here**:

- Forbidden: `npm run build` (which runs `prisma generate && next build`).
- Allowed for type checks: `npx tsc --noEmit`.
- Allowed: `npm run dev` (Next dev on `:8123` — but a PM2 process is already serving prod on the same port, so don't kick it off without coordinating), `npm run lint`, `npm run check:i18n`, `prisma generate` (also runs as `postinstall`).
- All production builds happen in GitHub Actions on push to `release`.

## Overview

This is the public-facing marketing site at **iq-rest.com**, available in **35 locales** via `next-intl`. It hosts:

- Locale home pages (4 feature highlights, hero, pricing teaser, FAQ, CTA → dashboard sign-in)
- 4 feature deep-dive pages per locale (digital menu, kitchen display, ordering, table booking)
- Pricing page
- The **in-product help guide** at `/help` (and `/<locale>/help`) — the canonical, end-user-facing description of every IQ Rest feature
- Legal pages: `/cookies`, `/privacy`, `/terms`
- The **legacy dashboard** under `app/[locale]/dashboard/...` — fully superseded; routes still resolve and the old SPA still works but no new development should happen here

The landing posts anonymous tracking events to `iq-rest-dashboard-api` (`POST /api/track/<event>` — see `iq-rest-dashboard-api`'s `UsageController`) for funnel analytics (`l_gclid_*`, `l_fbclid_*`, etc.).

## Tech stack

- **Next.js 15** (App Router) + React 19, TypeScript 5
- **next-intl 3** for i18n (35 locales, `localePrefix: "always"`, no auto-detection — middleware picks via Cloudflare `cf-ipcountry`)
- **Prisma 6** (`@prisma/client` + `prisma` CLI) — schema mirrors the dashboard's; same Postgres database
- **AWS SDK v3 / S3** (`@aws-sdk/client-s3`) + `sharp` for image processing
- **Stripe 20** (billing flows in the legacy dashboard portion)
- **Radix UI** (full set — accordion, alert-dialog, popover, select, tabs, tooltip, …) + Tailwind 3 + `tailwind-merge` + `tailwindcss-animate` + shadcn-style `components.json`
- **lucide-react**, **embla-carousel-react**, **recharts**, **vaul**, **sonner**, **next-themes**, **cmdk**, **react-day-picker**, **input-otp**, **react-resizable-panels**
- **nodemailer 7** (transactional)
- **`google-ads-api`** (used by `scripts/` for paid-search ops — keyword research, campaign creation, bid management, conversion uploads)
- `@react-google-maps/api` (location pickers in the legacy dashboard)
- `heic2any`, `ua-parser-js`, `qrcode.react`

## Repository layout

```
app/
  layout.tsx                       # root Metadata + Viewport (metadataBase = https://iq-rest.com)
  globals.css                      # Tailwind entry
  not-found.tsx                    # 404
  manifest.webmanifest             icon.png  apple-icon.png  favicon.ico
  sitemap.ts  robots.ts
  (en)/                            # English routes WITHOUT a /en prefix (root locale group)
    layout.tsx  page.tsx  texts.ts
    help/                          # /help — full product feature guide
    pricing/
    digital-menu-for-restaurants/         # feature page 1 (EN slug)
    kitchen-display-system/                # feature page 2
    qr-code-menu-for-restaurants/          # feature page 3
    restaurant-ordering-system/            # feature page 4
    table-booking-system/                  # feature page 5 (booking)
  <locale>/                        # 35 locale folders (ar, bg, ca, cs, da, de, el, es, et, fa, fi, fr, ga, hr, hu, is, it, ja, ko, lt, lv, nl, no, pl, pt, ro, ru, sk, sl, sr, sv, tr, uk, zh)
    page.tsx                       # locale home (renders the same HomeTemplate with locale-specific text)
    help/                          # /<locale>/help
    pricing/
    <feature-slugs>                # 4 feature pages per locale, slugs are per-locale (SEO-optimised)
    texts.ts                       # the home + help + pricing copy (sometimes), strongly typed
  [locale]/                        # legacy dashboard SPA — NOT MAINTAINED
    layout.tsx  loading.tsx
    cookies/  privacy/  terms/     # legal pages used by all locales
    dashboard/
      _components/  _context/  _hooks/  _lib/  _pages/  _ui/   # the old dashboard
      billing/  categories/  items/  menu/  orders/  order-settings/
      reservations/  reservation-settings/  qr-menu/  scan/
      settings/  contacts/  design/  home/  support/  tables/  upgrade/
  api/                             # Next.js API routes (server-side handlers used by the legacy dashboard)
    categories/  items/  orders/  restaurant/  scan-menu/  stripe/
    subscription/  support/  tables/  translate/  translations/  upload/
  _landing/                        # shared marketing components + content
    components/                    # header, hero, features, founder, pricing, faq, final-cta, footer, logo-icon, etc.
    help/
      content/<locale>.ts          # the in-product help guide — 35 locales (CANONICAL feature reference)
      help-view.tsx  help-sidebar.tsx  help-banner-section.tsx  types.ts  registry.ts
    templates/                     # SHARED page templates rendered by every locale
      home-template.tsx
      pricing-template.tsx
      feature-landing-template.tsx
      build-feature-metadata.ts
      feature-json-ld.tsx
      types.ts
    lib/                           # landing-only helpers
    types.ts
i18n/
  routing.ts                       # locales + rtlLocales arrays, defineRouting, navigation export
  request.ts                       # next-intl getRequestConfig
messages/                          # next-intl JSON catalogs (35 locales) — used by the legacy dashboard pages
components/                        # shared shadcn/ui (Radix-wrapped) components
hooks/
lib/
  country-locale-map.ts            # Cloudflare cf-ipcountry → locale (used by middleware)
  page-meta.ts gone-paths.ts locale-slug-overrides.ts
  (auth helpers, prisma client wrapper, S3 helpers, mail, stripe, etc.)
types/
prisma/
  schema.prisma                    # 15 models — DASHBOARD-API owns the canonical schema; this one is a historical copy
  migrations/
public/
  manifest assets, OG images, samples, etc.
scripts/                           # one-off Node + TS scripts (lots of Google Ads + i18n + asset-gen tooling)
not_optimized/ optimized/          # source + processed asset folders for the optimize-images script
messages/<lang>.json               # next-intl message catalogs (35 locales)
middleware.ts                      # next-intl middleware + geo-locale + gone-paths (410) + slug overrides
next.config.ts                     # withNextIntl + image config + serverExternalPackages + headers + LOTS of redirects (legacy feature dirs, old order slugs, /m/<slug> → subdomain, /login → dashboard.iq-rest.com)
prisma.config.mjs
postcss.config.mjs  tailwind.config.ts
eslint.config.mjs  tsconfig.json
vercel.json                        # (historical — not currently deployed via Vercel)
components.json                    # shadcn config
README.md
```

## Commands

```bash
npm run dev          # next dev -p 8123
npm run lint         # next lint
npm run check:i18n   # node scripts/check-message-parity.mjs — verifies all 35 messages/*.json share the same keys
```

**FORBIDDEN on this server:** `npm run build`, `npm run start`. GitHub Actions handles all builds on push to `release`.

## Environment variables

(`.env.example` is empty in the repo; the live values are kept in `/home/deploy/apps/iq-rest/.env` on the server.) Vars used at runtime:

| Var | Purpose |
|---|---|
| `DATABASE_URL` | Postgres DSN (shared with dashboard-api) |
| `JWT_SECRET` | session JWTs (legacy dashboard) |
| `S3_HOST` `S3_KEY` `S3_TOKEN` `S3_NAME` `S3_REGION` | Hetzner Object Storage (image uploads). `S3_HOST` is also parsed in `next.config.ts` to allow-list `next/image` `remotePatterns`. |
| `STRIPE_SECRET_KEY` `STRIPE_WEBHOOK_SECRET` | legacy billing |
| `GEMINI_API_KEY` | scan-menu OCR + AI translations (legacy dashboard) |
| `GOOGLE_ADS_*` (`developer_token`, `refresh_token`, `customer_id`, `login_customer_id`, `client_id`, `client_secret`) | scripts/ — Google Ads management tooling. **Not used at runtime by the landing.** |
| `SMTP_HOST` `SMTP_PORT` `SMTP_USER` `SMTP_PASS` `FROM_EMAIL` | transactional emails (legacy dashboard) |
| `DASHBOARD_URL` | for outbound redirects to the new dashboard |

## Routing and locales

`i18n/routing.ts`:

- **35 locales**: `en, es, de, fr, it, pt, nl, pl, ru, uk, sv, da, no, fi, cs, el, tr, ro, hu, bg, hr, sk, sl, et, lv, lt, sr, ca, ga, is, fa, ar, ja, ko, zh`.
- **RTL**: `fa`, `ar`.
- `localePrefix: "always"` — every locale must appear in the URL.
- `localeDetection: false` — auto-detection is disabled at the next-intl level; the middleware handles geo-pick separately so a returning user doesn't get bounced.

`middleware.ts` runs in order:

1. **Gone paths** (`lib/gone-paths.ts`) — explicit list of deleted URLs → 410 with a short HTML body (`Cache-Control: public, max-age=86400`).
2. **Locale slug overrides** (`lib/locale-slug-overrides.ts`) — swaps the locale segment for paths where an English slug needs to be exposed under another locale.
3. **Geo locale**: reads Cloudflare `cf-ipcountry` + `cf-region` (sticky in cookies `geo_country` / `geo_locale`); maps via `country-locale-map.ts` to pick an initial locale when the visitor lands on `/` (English root group serves `/`, others get redirected to `/<locale>`).
4. **next-intl middleware** for everything else.

**Route layout note:** the **English root group `(en)`** owns paths without a `/en` prefix (so `/help` → English help guide; `/<locale>/help` → that locale's). All non-English locales have explicit `<locale>/` folders under `app/`.

**SEO redirect table** in `next.config.ts` — hundreds of permanent 301s for:
- Old generic feature dirs (e.g. `/<locale>/ai-translation`, `/<locale>/easy-menu`, `/<locale>/reservations`, …) → locale home — collapsed onto the May-2026 rollout of just 4 feature pages per locale.
- Legacy keyword landings (e.g. `/it/menu-digitale`, `/es/carta-digital`, …) → locale home or the new SEO slug.
- Old per-locale "online-orders" landings → the new locale-specific slug (`/it/online-orders` → `/it/sistema-ordinazioni-ristorante`, etc.).
- All PPC landings (`/:locale/lp/<slug>`) → locale home.
- Public-menu legacy short links `/m/<slug>` and `/<locale>/m/<slug>` → `<slug>.iq-rest.com`.
- `/<locale>/login`, `/<locale>/signup`, `/<locale>/otp`, `/<locale>/logout` → `dashboard.iq-rest.com/<locale>/...` — auth migrated to the new dashboard.
- `/<locale>/changelog`, `/<locale>/languages` → locale home (the changelog section was deleted).

## Help guide (canonical IQ Rest feature reference)

`app/_landing/help/content/<locale>.ts` is the single canonical source for **what IQ Rest does, end-user-facing**. The English file (`en.ts`) is the most-complete; all 35 locales follow the same `HelpDoc` shape (`types.ts`). When other repos' CLAUDE.md files reference "the help guide", this is what they mean.

The same content is rendered at `/help` (root locale) and `/<locale>/help`. `app/_landing/help/registry.ts` exports `helpHref(locale)` and `getHelpBanner(locale)` used by sitemap + every locale home.

If you need to understand what feature exists in IQ Rest, read this file first — it's regularly updated to match shipped functionality.

## Prisma models (`prisma/schema.prisma`)

15 models — historical copy of the dashboard schema as of the last build of this repo:

`User, Session, Company, Restaurant, Table, Reservation, Category, Item, UserCompany, PageView, SupportMessage, PulseEvent, Order, Device, PairingCode`.

`PulseEvent` here is the older analytics model — the new system in `iq-rest-dashboard-api` uses the unified `UsageEvent` table (which replaced PulseEvent + Session + AnalyticsEvent). For schema-of-record consult `iq-rest-dashboard-api/prisma/schema.prisma`.

## API routes (`app/api/`)

Server-side handlers for the legacy dashboard. All proxy the same operations the new `iq-rest-dashboard-api` now performs:

- `categories`, `items`, `tables`, `orders`, `restaurant` — CRUD
- `scan-menu` — Gemini OCR for paper menus
- `stripe` — checkout / portal / webhook
- `subscription`, `support`, `translate`, `translations`, `upload`

**The new SPA does NOT hit these — it talks to `dashboard-api.iq-rest.com`.** These routes are still reachable, but treat them as deprecated.

## Tracking events

The landing posts anonymous funnel events to `iq-rest-dashboard-api`'s `POST /api/track/:event` endpoint:

- Generic events match `/^[a-z0-9_]{1,64}$/` (e.g. `landing_view`, `pricing_cta_click`).
- Paid-ads events use the special prefixes `l_gclid_<id>` (Google) and `l_fbclid_<id>` (Meta) — these bypass bot filtering on the API side so every paid click is recorded.

Server-side fan-out lives in dashboard-api's `UsageController` (anonymises IP, attaches `companyId` from cookies when present, sets `is_google_ads`/`is_facebook_ads`/`is_search` flags, persists to `UsageEvent`).

## Scripts (`scripts/`)

A large bag of one-off Node + TS scripts, mostly for:

- **Google Ads ops** (campaign creation per country, ad-group cloning, keyword research, bid management, search-terms reports, negative-keyword application, conversion attribution, hourly bid modifiers). All driven by the `google-ads-api` SDK + `GOOGLE_ADS_*` env vars. See `scripts/GOOGLE_ADS.md`.
- **i18n maintenance**: `check-message-parity.mjs` (required keys present in every locale), `translate-messages.ts`, `translate-missing.ts`, `translate-highlights.ts`, `translate-changelog.ts` (the changelog translator — **do not run; per project policy translations are done manually**).
- **Asset generation**: `generate-icons.mjs`, `generate-og.mjs`, `optimize-images.mjs`, `gen-feature-*.mjs` (Gemini-driven mock screenshots for the feature pages), `build-landing-dishes.mjs`.
- **Locale scaffolding**: `scaffold-locales.mjs`.

Run with `npx ts-node scripts/<file>.ts` for TS, `node scripts/<file>.mjs` for MJS.

## SEO

- `app/sitemap.ts` — pulls every translated locale + every feature page + the help guide locales from `HELP_LOCALES`.
- `app/robots.ts`.
- `app/layout.tsx` defines `metadataBase: new URL("https://iq-rest.com")`, default title + description, Apple/Open-Graph icons.
- `app/_landing/templates/feature-json-ld.tsx` injects per-feature `application/ld+json` schemas.
- Image optimization: `next/image` with `formats: ["image/avif", "image/webp"]`, `qualities: [75, 90]`, S3 `remotePatterns` derived at build time from `S3_HOST`.
- `X-Accel-Buffering: no` header on every response (disables nginx response buffering to fix 502 on SSR pages).
- `serverExternalPackages: ["sharp"]` so the native binary is required from the prod server's node_modules instead of being bundled.
- Console removed in production builds except `error` + `warn`.

## Deployment

GitHub Actions builds on push to `release` → uploads to `/home/deploy/apps/iq-rest/` → PM2 process `iq-rest` runs `next start -p 8123`. Nginx fronts `iq-rest.com` and proxies to `127.0.0.1:8123`.

## Related repositories

- `iq-rest-dashboard-api` — current dashboard backend (NestJS, port 8130) — **owns the canonical Postgres schema and all live business logic**
- `iq-rest-dashboard-web` — current dashboard SPA (Vite/React) at `dashboard.iq-rest.com`
- `iq-rest-public-menu` — current guest-facing menu PWA at `<slug>.iq-rest.com`
- `iq-rest-public-menu-api` — current backend for the guest menu (NestJS, port 8131)

## Conventions (if you must touch this repo)

- Work only on the `release` branch — it's the prod source of truth.
- Don't add new product features here; build them in the new repos and stub a marketing page in this one if SEO needs it.
- Translations: per project policy, Claude writes them directly. Do not run `scripts/translate-changelog.ts` or any other Gemini-driven translation script.
- 301s are forever — adding a redirect in `next.config.ts` is the safe move; deleting one breaks already-indexed URLs.
