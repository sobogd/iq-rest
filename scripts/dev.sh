#!/usr/bin/env bash
# iq-rest monorepo — local dev launcher.
# 1) regenerate per-app .env from the unified root .env
# 2) kill stale listeners on the dev ports
# 3) (re)start all 5 services via PM2
#
# Usage:
#   ./scripts/dev.sh                 # fresh restart of all 5
#   ./scripts/dev.sh dashboard-web   # restart just one (or a subset)
#   pm2 status        |  pm2 logs <name>
#
# Services: landing dashboard-web dashboard-api public-menu-api public-menu

set -e
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ECO="$ROOT/ecosystem.config.js"
ENVF="$ROOT/.env"

cd "$ROOT"

if ! command -v pm2 >/dev/null 2>&1; then
  echo "pm2 not installed. Install with: npm install -g pm2"; exit 1
fi
[ -f "$ENVF" ] || { echo "Missing $ENVF"; exit 1; }

# --- read ports from root .env (single source of truth) ---
port_of() { grep -E "^$1=" "$ENVF" | head -1 | cut -d= -f2-; }
ALL_NAMES=(landing dashboard-web dashboard-api public-menu-api public-menu)
ALL_PORTS=(
  "$(port_of LANDING_PORT)"
  "$(port_of DASHBOARD_WEB_PORT)"
  "$(port_of DASHBOARD_API_PORT)"
  "$(port_of PUBLIC_MENU_API_PORT)"
  "$(port_of PUBLIC_MENU_PORT)"
)

port_for() {
  local name=$1 i
  for i in "${!ALL_NAMES[@]}"; do
    [ "${ALL_NAMES[$i]}" = "$name" ] && { echo "${ALL_PORTS[$i]}"; return 0; }
  done
  return 1
}

# --- select services ---
if [ "$#" -gt 0 ]; then
  SELECTED=("$@")
  for name in "${SELECTED[@]}"; do
    port_for "$name" >/dev/null || { echo "Unknown service: $name"; echo "Known: ${ALL_NAMES[*]}"; exit 1; }
  done
else
  SELECTED=("${ALL_NAMES[@]}")
fi

echo "==> Regenerating per-app .env from root .env"
node "$ROOT/scripts/gen-env.mjs"

# dashboard-api owns the shared root @prisma/client. Regenerate it every run so
# the hoisted client always matches dashboard-api's schema (public-menu-api uses
# the same superset client; landing generates its own app-local client).
echo "==> prisma generate (dashboard-api → shared root client)"
( cd "$ROOT/apps/dashboard-api" && npx prisma generate >/dev/null 2>&1 ) || echo "  (prisma generate warning — continuing)"

echo "==> Restarting: ${SELECTED[*]}"
for name in "${SELECTED[@]}"; do pm2 delete "$name" >/dev/null 2>&1 || true; done

PORTS=(); for name in "${SELECTED[@]}"; do PORTS+=("$(port_for "$name")"); done

echo "==> Killing stray listeners on ${PORTS[*]}"
for port in "${PORTS[@]}"; do
  pids=$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null || true)
  [ -n "$pids" ] && { echo "   - :$port killing $pids"; kill $pids 2>/dev/null || true; }
done
sleep 1
for port in "${PORTS[@]}"; do
  pids=$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null || true)
  [ -n "$pids" ] && kill -9 $pids 2>/dev/null || true
done

ONLY=$(IFS=,; echo "${SELECTED[*]}")
echo "==> pm2 start --only $ONLY"
pm2 start "$ECO" --only "$ONLY" >/dev/null

echo
echo "==> Waiting for ports (max 90s each)"
ok=1
for i in "${!SELECTED[@]}"; do
  name=${SELECTED[$i]}; port=${PORTS[$i]}; up=0
  for _ in $(seq 1 90); do
    if lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
      echo "   ✓ $name  http://localhost:$port  up"; up=1; break
    fi
    sleep 1
  done
  [ "$up" -eq 0 ] && { echo "   ✗ $name :$port did NOT come up — pm2 logs $name"; ok=0; }
done

echo
echo "==> Local URLs"
echo "   landing          http://localhost:$(port_for landing)"
echo "   dashboard-web    http://localhost:$(port_for dashboard-web)"
echo "   dashboard-api    http://localhost:$(port_for dashboard-api)/api/health"
echo "   public-menu-api  http://localhost:$(port_for public-menu-api)/api/health"
echo "   public-menu      http://localhost:$(port_for public-menu)?slug=<slug>"
echo
pm2 status
echo
echo "==> Logs: pm2 logs <name>"
[ "$ok" = 1 ] || exit 1
