#!/usr/bin/env bash
# Reset the LOCAL database to a clean slate:
# drops all data, re-applies every Prisma migration (schema owner = dashboard-api).
#
# HARD GUARD: refuses to run unless DATABASE_URL points at localhost/127.0.0.1.
# This can never touch a remote/prod DB.
#
# Usage:
#   ./scripts/db-reset.sh        # asks for confirmation
#   ./scripts/db-reset.sh -y     # no prompt (for scripting)

set -e
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENVF="$ROOT/apps/dashboard-api/.env"

cd "$ROOT"
# make sure per-app env exists (derives from root .env)
[ -f "$ENVF" ] || node "$ROOT/scripts/gen-env.mjs" >/dev/null

DB="$(grep -E '^DATABASE_URL=' "$ENVF" | head -1 | cut -d= -f2- | tr -d '"')"
[ -n "$DB" ] || { echo "No DATABASE_URL in $ENVF"; exit 1; }

HOST="$(node -e 'console.log(new URL(process.argv[1]).hostname)' "$DB" 2>/dev/null || true)"
case "$HOST" in
  localhost|127.0.0.1|::1|"") : ;;
  *)
    echo "REFUSING: DATABASE_URL host is '$HOST' — not local. Aborting (prod safety)."
    exit 1
    ;;
esac

echo "Target DB host: ${HOST:-localhost}  (local — ok)"
if [ "$1" != "-y" ] && [ "$1" != "--yes" ]; then
  printf "This WIPES the local database and re-applies all migrations. Continue? [y/N] "
  read -r ans
  [ "$ans" = "y" ] || [ "$ans" = "Y" ] || { echo "aborted"; exit 1; }
fi

echo "==> prisma migrate reset (dashboard-api owns the schema)"
cd "$ROOT/apps/dashboard-api"
npx prisma migrate reset --force --skip-seed

echo
echo "==> Done. Clean local DB with all migrations applied."
echo "    Restart services if needed: ./scripts/dev.sh"
