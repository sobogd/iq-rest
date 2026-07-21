# E2E — one long happy-path (local dev stack)

A single end-to-end happy-path through the **real UI**, from the landing login
all the way to the public menu on mobile. Runs against the **local dev stack**
(`./scripts/dev.sh`) and the **local Postgres** — no Docker. Real backend, real
Gemini AI.

## Run

```bash
cd iq-rest && ./scripts/dev.sh   # start the stack (ports 8001-8005) if not already up
npm run e2e                       # from the monorepo root  (or: cd e2e && npm test)
```

First time only: `npm run e2e:setup` (installs the e2e deps + Playwright's
Chromium). The stack must be up — otherwise global-setup fails with a hint.

**Each run:** global-setup clears leftovers from a previous run → the test
creates ONE fresh restaurant → after the run **global-teardown deletes that
restaurant and everything linked to it** (tables, orders, bookings, categories,
items, devices, analytics) plus the autotest user. Only `@e2e.iqrest.test`
accounts are ever touched (`purgeAutotestData` in `provision.ts`).

## The stack (local)

`./scripts/dev.sh` (pm2) + local Postgres `localhost:5432/iq_rest`.

| Service | Port | Notes |
|---|---|---|
| landing | 8001 | login entry point |
| dashboard-web | 8002 | Playwright baseURL |
| dashboard-api | 8003 | NODE_ENV=development → OTP bypass + reservation-mail skip |
| public-menu-api | 8004 | |
| public-menu | 8005 | mobile public-menu flow |

`playwright.config.ts` resolves `E2E_DATABASE_URL` from `apps/dashboard-api/.env`
(DATABASE_URL) and the ports from its defaults; both overridable via env.

## Authorization stub

`auth.service.ts`: for `@e2e.iqrest.test` emails, **non-production only**, OTP is
forced to `000000` and no email is sent. The happy-path uses a unique
`happy+<ts>@e2e.iqrest.test` per run (send-otp is rate-limited per email).
Reservation emails to that domain are also skipped (both mail.service.ts).

## The happy-path (`tests/happy-path.spec.ts`)

14 numbered steps (each action commented inside): landing login → onboarding
(start clean) → add es language → rich menu (2 groups / 3 categories / 3 dishes,
one dish with a required + an optional variant group + description) →
auto-translate → dish validations → variant-group form (multi toggle, translate,
delete) → 2 tables via forms (drag apart on floor-map) → enable orders → full
orders section (create, options+comments render, change table, order & item
discounts, duplicate, edit, split, complete w/ payment, delete) → enable bookings
→ 2 bookings via public `/reserve` → confirm one + reject one in dashboard →
public menu MOBILE Español switch. See `ФЛОУ.md` for the full step list.

## Files

```
e2e/
  playwright.config.ts       ← resolves local DB/ports; global setup + teardown
  provision.ts               ← DB helpers (restaurantByEmail, purgeAutotestData, clearMenu)
  global-setup.ts            ← wait-for-stack + purge old autotest accounts
  global-teardown.ts         ← purge the autotest restaurant + all linked data
  tests/
    happy-path.spec.ts       ← the single test (14 steps)
    helpers.ts               ← menu/tables/orders builders + wizard/dialog utils
```
