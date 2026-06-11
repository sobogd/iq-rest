# Deploy runbook — monorepo cutover (zero-downtime)

This is the **one-time** server-side preparation + cutover for moving prod from the
five legacy repos to this monorepo. Nothing here runs automatically. Do each step
from a real interactive shell on the server (the assistant's non-interactive SSH
can't reliably reach prod). Prod keeps running on the old setup until you choose to
cut over; every step below is reversible.

Server: `deployer@<prod>` (via Tailscale). Web: nginx. Processes: pm2.

```
landing          /home/deploy/apps/iq-rest                 pm2 iq-rest        Next :8123
dashboard-api    /home/deploy/apps/iq-rest-dashboard-api   pm2 dashboard-api  Nest :8130
public-menu-api  /home/deploy/apps/iq-rest-public-menu-api pm2 public-menu-api Nest :8131
dashboard-web    /home/deploy/apps/iq-rest-dashboard       nginx static
public-menu      /home/deploy/apps/iq-rest-public-menu     nginx static
```

---

## 0. Prereqs

- Working interactive SSH as `deployer` on prod.
- GitHub repo secrets set (step 1).
- A low-traffic window for the one pm2 fork→cluster switch (step 3b: ~1-2s restart).

## 1. GitHub repo secrets (no prod impact)

`deploy.yml` reads these. Set from the local root `.env` (values never printed):

```
SERVER_IP  SSH_KEY  DATABASE_URL
VITE_API_URL VITE_APP_URL VITE_PUBLIC_MENU_URL VITE_ADMIN_EMAIL_DOMAIN
VITE_GOOGLE_MAPS_API_KEY VITE_GOOGLE_CLIENT_ID VITE_GOOGLE_MAPS_KEY
NEXT_PUBLIC_MAPS_API_KEY NEXT_PUBLIC_APP_URL
```
(plus every backend secret each Node app's `.env` needs — these live in the per-app
`.env` on the server already; the monorepo deploy ships the bundle and reuses the
existing server `.env`, so only build-time `VITE_*` / `NEXT_PUBLIC_*` + SSH + DB are
required as Actions secrets.)

`gh secret set NAME -R sobogd/iq-rest < value` — needs admin on the repo.

## 2. Static: switch nginx to a `current` symlink (zero-downtime)

Per static app (`iq-rest-dashboard`, `iq-rest-public-menu`). Example for dashboard:

```bash
cd /home/deploy/apps/iq-rest-dashboard
mkdir -p releases
ln -sfn dashboard current          # current -> the bundle nginx serves right now
```
Then point nginx `root` at `.../current` (instead of `.../dashboard`):
```bash
sudo sed -i 's#/home/deploy/apps/iq-rest-dashboard/dashboard#/home/deploy/apps/iq-rest-dashboard/current#' <nginx-site-conf>
sudo nginx -t && sudo systemctl reload nginx   # reload is graceful, 0 downtime
```
nginx now serves the same files through `current`. The first monorepo deploy uploads
`releases/<sha>/` and atomically repoints `current` → no 404 window.
Repeat for `iq-rest-public-menu` (bundle dir `public-menu`).

**Rollback:** revert the nginx `root` to the original dir, `nginx -t && reload`.

## 3. Node apps: enable pm2 cluster (one-time, brief restart)

Copy `ecosystem.prod.config.js` to the server (e.g. `/home/deploy/`), then:
```bash
pm2 delete dashboard-api public-menu-api iq-rest
pm2 start /home/deploy/ecosystem.prod.config.js
pm2 save
pm2 ls            # dashboard-api/public-menu-api should show "cluster", 2 instances
```
This is the only step with a short restart (~1-2s per app). After it, every deploy
uses `pm2 reload` = rolling, zero-downtime for the two cluster APIs (landing stays
fork → graceful reload).

**Rollback:** `pm2 delete ...` then `pm2 start <dist> --name ...` (old fork commands).

## 4. Cutover

1. **Freeze the old repos' CI** so two pipelines don't both deploy:
   in each legacy repo, disable the deploy workflow (rename `deploy.yml` → `deploy.yml.disabled`, or set its triggers to `workflow_dispatch` only). Do NOT delete the repos (landing 301 table / SEO history).
2. **Deploy from the monorepo:** Actions → "Deploy (manual)" → run for one service
   first (e.g. `public-menu`), verify, then the rest. Use `run_migrations: true`
   only when there's a new migration in `packages/db`.
3. Verify each: health endpoints (`/api/health`), nginx serves `current`, pm2 online.

## 5. Verify zero-downtime (optional)

While a deploy runs, in another shell:
```bash
while true; do curl -s -o /dev/null -w "%{http_code}\n" https://<host>/...; sleep 0.3; done
```
Expect continuous `200` (no `502`/`404`) for static (symlink swap) and the cluster APIs.

## Notes / gotchas

- **No-migration deploy = no DB downtime.** Schema changes must be expand/contract
  (add nullable col → deploy code → backfill → tighten in a later migration), because
  during a rolling reload old + new workers run simultaneously against the same DB.
- **`pnpm deploy` bundles** each Node app self-contained (`out-*/` with prod
  node_modules incl the generated `@iq-rest/db` client) — the server doesn't run
  `pnpm install`.
- **Secrets at rest:** the server's per-app `.env` files are the source for runtime
  secrets; the monorepo deploy does not overwrite them (unlike some legacy workflows
  that rewrote `.env` from Actions secrets — fold that back in here if you prefer).
