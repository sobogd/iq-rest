# iq-rest (monorepo)

Single repo for the IQ Rest system. Five services under `apps/`:

| App | Stack | Local port | Role |
|-----|-------|-----------|------|
| `apps/landing` | Next.js | 5123 | marketing landing + auth login flow |
| `apps/dashboard-web` | Vite/React | 5129 | dashboard SPA + KDS/waiter/reservation kiosks |
| `apps/dashboard-api` | NestJS | 5130 | dashboard backend, owns Prisma schema, SSE fan-out |
| `apps/public-menu-api` | NestJS | 5131 | guest menu backend |
| `apps/public-menu` | Vite/React | 5132 | guest QR menu PWA |

## Local development

Everything is wired over `localhost` (no `iq-rest.com` hardcode) so the five
services cross-link locally exactly like in prod.

```bash
# one-time
npm install                 # root deps (dotenv, used by ecosystem)
cp .env.example .env        # then fill secrets (or keep the seeded .env)

# run all 5 (kills stale ports, regenerates per-app .env, starts via PM2)
./scripts/dev.sh
./scripts/dev.sh dashboard-web      # restart a subset
pm2 logs <name>                     # tail one service
npm run stop                        # stop all
```

### Env model

`/.env` is the **single source of truth** for ports, local URLs, and all
secrets. `scripts/gen-env.mjs` (run automatically by `dev.sh`) derives the
per-app `apps/*/.env` files from it — so there is no duplicated/hardcoded
config across services. Edit ports or secrets in `/.env` only.

`/.env` and all `apps/*/.env` are git-ignored. `/.env.example` (committed)
documents every key with secrets blanked.

## Notes

- Local DB is a local Postgres (`localhost`), shared by both APIs — same as prod's shared-DB model.
- `dashboard-web` and `public-menu` proxy `/api` to their backend (`VITE_DEV_API_PROXY`).
- The public menu resolves the restaurant by subdomain in prod; locally pass `?slug=<slug>`.
