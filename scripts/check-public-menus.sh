#!/usr/bin/env bash
# check-public-menus.sh — smoke-check ВСЕХ прод-ресторанов и их публичных меню.
#
# READ-ONLY. Ничего не пишет в прод. Делает:
#   1. Тянет из прод-БД (через SSH, read-only tx) список ресторанов:
#      slug, plan, subscriptionStatus, число товаров (не удалённых).
#   2. Для каждого slug дёргает публичный menu-API:
#        https://<slug>.iq-rest.com/api/public/menu/<slug>
#   3. Проверяет: HTTP 200 (не 404/500), валидный JSON, есть restaurant,
#      и если в БД есть товары — меню НЕ пустое (items > 0).
#   4. Печатает проблемные + итоговую сводку по plan/status.
#
# Безопасно прервать (Ctrl-C / kill) — состояние прода не меняется. Пере-запускаемо.
# Совместимо с bash 3.2 (macOS) — без ассоциативных массивов.
#
# Usage: bash scripts/check-public-menus.sh
#        VERBOSE=1 bash scripts/check-public-menus.sh   # печатать и OK-строки

set -uo pipefail

PROD="${PROD:-root@46.225.143.221}"
DOMAIN="${DOMAIN:-iq-rest.com}"
CURL_TIMEOUT="${CURL_TIMEOUT:-20}"
VERBOSE="${VERBOSE:-0}"

TMP="$(mktemp -t pubmenu)"
trap 'rm -f "$TMP"' EXIT

echo "→ Тяну список ресторанов из прод-БД (read-only)…" >&2

# TSV: slug \t plan \t status \t db_items
ROWS="$(ssh -o StrictHostKeyChecking=no -o ConnectTimeout=15 "$PROD" bash -s <<'REMOTE'
DSN=$(grep -h "^DATABASE_URL" /home/deploy/apps/iq-rest-dashboard-api/.env | head -1 | cut -d= -f2- | tr -d '"')
psql "$DSN" -At -F $'\t' \
  -c "SET default_transaction_read_only=on;" \
  -c "SELECT r.slug,
             COALESCE(s.plan,'FREE'),
             COALESCE(s.status,'INACTIVE'),
             (SELECT count(*) FROM items i WHERE i.\"restaurantId\"=r.id AND i.\"deletedAt\" IS NULL)
      FROM restaurants r
      LEFT JOIN subscriptions s ON s.\"accountId\" = r.\"accountId\"
      WHERE r.slug IS NOT NULL AND r.slug <> ''
      ORDER BY 3, 2, r.slug;"
REMOTE
)"

if [[ -z "$ROWS" ]]; then
  echo "✗ Не получил список ресторанов (SSH/psql). Прерываю." >&2
  exit 1
fi

# оставляем только строки-данные (с табами) — отсекает служебный вывод psql ("SET")
ROWS="$(printf '%s\n' "$ROWS" | grep "$(printf '\t')" || true)"

TOTAL="$(printf '%s\n' "$ROWS" | grep -c .)"
echo "→ Ресторанов к проверке: $TOTAL. Погнал…" >&2
echo >&2

n=0
while IFS=$'\t' read -r slug plan status db_items; do
  # пропускаем пустые + служебную строку "SET" (статус psql-команды, без табов)
  [[ -z "$slug" || -z "$status" ]] && continue
  n=$((n+1))
  db_items="${db_items:-0}"
  url="https://${slug}.${DOMAIN}/api/public/menu/${slug}"

  resp="$(curl -s -m "$CURL_TIMEOUT" -w $'\n%{http_code}' "$url" 2>/dev/null)"
  code="$(printf '%s' "$resp" | tail -n1)"
  body="$(printf '%s' "$resp" | sed '$d')"

  # JSON → "OK <items> <cats> <hasRestaurant>" | "PARSEFAIL 0 0 0"
  parsed="$(printf '%s' "$body" | python3 -c '
import sys, json
try:
    d = json.load(sys.stdin)
    assert isinstance(d, dict)
except Exception:
    print("PARSEFAIL 0 0 0"); sys.exit()
items = d.get("items") or []
cats = d.get("categories") or []
has_r = 1 if d.get("restaurant") else 0
print("OK", len(items), len(cats), has_r)
' 2>/dev/null)"

  pstate="$(printf '%s' "$parsed" | awk '{print $1}')"
  api_items="$(printf '%s' "$parsed" | awk '{print $2}')"; api_items="${api_items:-0}"
  has_r="$(printf '%s' "$parsed" | awk '{print $4}')"

  reason=""
  if [[ "$code" != "200" ]]; then
    reason="HTTP ${code:-timeout}"
  elif [[ "$pstate" != "OK" ]]; then
    reason="битый JSON / не меню"
  elif [[ "$has_r" != "1" ]]; then
    reason="нет restaurant в ответе"
  elif [[ "$db_items" -gt 0 && "$api_items" -eq 0 ]]; then
    reason="ПУСТОЕ меню (в БД ${db_items} товаров, в API 0)"
  fi

  if [[ -n "$reason" ]]; then
    verdict="FAIL"
    echo "✗ ${slug}  [${plan}/${status}]  db=${db_items} api=${api_items}  → ${reason}" >&2
  else
    verdict="OK"
    [[ "$VERBOSE" == "1" ]] && echo "✓ ${slug}  [${plan}/${status}]  items=${api_items}" >&2
  fi

  # results row: plan/status \t verdict \t slug \t db \t api \t reason
  printf '%s/%s\t%s\t%s\t%s\t%s\t%s\n' \
    "$plan" "$status" "$verdict" "$slug" "$db_items" "$api_items" "$reason" >> "$TMP"

  (( n % 25 == 0 )) && echo "  …$n/$TOTAL" >&2
done <<< "$ROWS"

ok="$(awk -F'\t' '$2=="OK"' "$TMP" | grep -c .)"
fail="$(awk -F'\t' '$2=="FAIL"' "$TMP" | grep -c .)"

echo
echo "════════════════════════ ИТОГ ════════════════════════"
echo "Всего: $TOTAL   ✓ OK: $ok   ✗ Проблем: $fail"
echo
echo "── По типам подписки (plan/status): ──"
awk -F'\t' '
  { key=$1; if ($2=="OK") ok[key]++; else fl[key]++; keys[key]=1 }
  END { for (k in keys) printf "  %-26s ok=%-5d fail=%d\n", k, ok[k]+0, fl[k]+0 }
' "$TMP" | sort

if [[ "$fail" -gt 0 ]]; then
  echo
  echo "── ПРОБЛЕМНЫЕ рестораны ──"
  awk -F'\t' '$2=="FAIL"{printf "  ✗ %-28s [%s]  db=%s api=%s  → %s\n",$3,$1,$4,$5,$6}' "$TMP"
  exit 2
else
  echo
  echo "✓ Все публичные меню отдают контент. Проблем нет."
  exit 0
fi
