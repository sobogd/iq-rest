"use client";

// Standalone Kitchen-tab view. Lives in its own module so the kitchen.*
// subdomain bundle can import this without pulling OrdersPage's order-
// creation wizard / table-change modal / split modal in alongside.
//
// Reused by:
//   - admin dashboard Shell (Kitchen tab)
//   - kitchen.* kiosk bundle (standalone planshet UI)
//
// Mutation surface: `patchOrderItemStatuses` from _v2/api — the race-safe
// per-item merge endpoint. In kitchen-host mode the shared apiFetch wrapper
// rewrites it to `/api/devices/orders/:id/item-status` transparently — this
// file doesn't care which credential it runs under.
//
// Optimistic model: taps never mutate the `orders` prop (server truth owned
// by the host). They write into a local (orderId:itemId)→status overlay and
// the board renders overlay(orders, dirty). SSE events / bootstrap snapshots
// may thus be applied to `orders` at ANY moment without racing a tap — the
// tap survives in the overlay until the server state itself confirms it (or
// its PATCH fails and the entry is dropped, falling back to server truth).

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { showApiError } from "@/lib/show-api-error";
import { formatElapsedHMS } from "./helpers";
import { getMlWithFallback } from "./i18n";
import { patchOrderItemStatuses } from "./api";
import { useFlip } from "./use-flip";
import type {
  Category,
  Order,
  OrderItem,
  OrderItemStatus,
  TableEntity,
} from "./types";
import { STATUS_DOT_CLS } from "./orders-shared";

interface KitchenPageProps {
  // Server-truth orders owned by the host. KitchenPage never mutates them —
  // taps live in an internal optimistic overlay (see module docblock), so
  // the host may overwrite `orders` from SSE/bootstrap at any time.
  orders: Order[];
  tables: TableEntity[];
  categories: Category[];
  defaultLang: string;
  // Fired AFTER a local tap advances an item to a new status. Used by the
  // kitchen.* kiosk to chime on waiter-targeted transitions (→ ready).
  // Admin host doesn't need it.
  onItemAdvanced?: (prev: OrderItemStatus, next: OrderItemStatus) => void;
  // Extra controls rendered to the right of the filter buttons in the
  // sticky sub-header. The kitchen kiosk uses this for zoom +/- buttons;
  // admin host passes nothing.
  filterBarExtras?: React.ReactNode;
  // Drops the max-w-5xl container on the sticky filter bar. Kitchen
  // kiosk uses full viewport width to fit more table cards per row;
  // admin host keeps the constrained width for visual consistency
  // with the rest of the dashboard.
  fullWidthFilterBar?: boolean;
  // Kiosk layout: switches to kanban-style rendering — the page itself
  // never scrolls vertically, each table card scrolls internally. Filter
  // bar becomes inline (not sticky) at the top of the column so the
  // notch backplate sits flush behind it. Admin host (false) keeps the
  // document-scroll layout the rest of the dashboard uses.
  kioskLayout?: boolean;
  // Pushes the current filter state up to the kiosk shell so it can
  // decide whether an incoming SSE item deserves a chime. Empty arrays
  // mean "no filter" — every item passes.
  onFiltersChange?: (state: KitchenFilterState) => void;
  // Public landing demo: keep the optimistic tap UX but never call the API
  // (there's no device token). Taps advance status on local state only.
  demoMode?: boolean;
}

export interface KitchenFilterState {
  statuses: OrderItemStatus[];
  categoryIds: string[];
  // dishId → categoryId so the chime predicate can resolve an item's
  // category without re-walking the categories tree on every SSE event.
  dishToCategory: Record<string, string>;
}

const KITCHEN_NEXT: Record<OrderItemStatus, OrderItemStatus> = {
  pending: "cooking",
  cooking: "ready",
  ready: "served",
  served: "pending",
};

export function KitchenPage({
  orders,
  tables,
  categories,
  defaultLang,
  onItemAdvanced,
  filterBarExtras,
  fullWidthFilterBar,
  kioskLayout,
  onFiltersChange,
  demoMode,
}: KitchenPageProps) {
  const t = useTranslations("dashboard.orders");
  const [, setTick] = useState(0);
  const [statusFilter, setStatusFilter] = useState<OrderItemStatus[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Latest server orders for synchronous reads inside tap handlers.
  const ordersRef = useRef<Order[]>(orders);
  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);

  // ── Optimistic per-item status overlay ─────────────────────────────────
  // (orderId:itemId) → status the user tapped to. See module docblock.
  const [dirty, setDirty] = useState<ReadonlyMap<string, OrderItemStatus>>(new Map());
  // Synchronous mirror so tap bursts read the freshest overlay without
  // waiting for React to flush the previous render.
  const dirtyRef = useRef(dirty);
  function setDirtyBoth(next: Map<string, OrderItemStatus>) {
    dirtyRef.current = next;
    setDirty(next);
  }
  const dirtyKey = (orderId: string, itemId: string) => orderId + ":" + itemId;

  // Per-order debounced flush + in-flight bookkeeping.
  const flushTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const inflight = useRef<Set<string>>(new Set());

  function advanceItemStatus(orderId: string, itemId: string) {
    const order = ordersRef.current.find((o) => o.id === orderId);
    const item = order?.items.find((it) => it.id === itemId);
    if (!item) return;
    const key = dirtyKey(orderId, itemId);
    const prev = dirtyRef.current.get(key) ?? item.status;
    const next = KITCHEN_NEXT[prev];
    const map = new Map(dirtyRef.current);
    // Always SET (even when `next` happens to equal the current server
    // status after a full cycle) — the server may have moved meanwhile;
    // the reconcile effect prunes the entry once server truth confirms.
    map.set(key, next);
    setDirtyBoth(map);
    scheduleFlush(orderId);
    onItemAdvanced?.(prev, next);
  }

  function scheduleFlush(orderId: string) {
    // Demo mode: the overlay is the whole story — nothing to persist.
    if (demoMode) return;
    const prev = flushTimers.current.get(orderId);
    if (prev) clearTimeout(prev);
    const timer = setTimeout(() => {
      flushTimers.current.delete(orderId);
      void flushOrder(orderId);
    }, 300);
    flushTimers.current.set(orderId, timer);
  }

  function collectChanges(orderId: string): Map<string, OrderItemStatus> {
    const prefix = orderId + ":";
    const out = new Map<string, OrderItemStatus>();
    for (const [key, status] of dirtyRef.current) {
      if (key.startsWith(prefix)) out.set(key.slice(prefix.length), status);
    }
    return out;
  }

  async function flushOrder(orderId: string) {
    // One PATCH per order at a time; taps landing mid-flight re-schedule
    // from the finally block below.
    if (inflight.current.has(orderId)) return;
    const batch = collectChanges(orderId);
    if (batch.size === 0) return;
    inflight.current.add(orderId);
    try {
      await patchOrderItemStatuses(
        orderId,
        [...batch].map(([itemId, status]) => ({ itemId, status })),
      );
      // Success: keep the overlay as-is. The SSE echo (or any newer
      // snapshot) confirms the statuses and the reconcile effect prunes the
      // entries — clearing them here would flash the pre-patch server state
      // for the duration of the echo round-trip.
    } catch (err) {
      // Drop the failed batch — but only entries the user hasn't re-tapped
      // past since. The board falls back to server truth for them.
      const map = new Map(dirtyRef.current);
      let changed = false;
      for (const [itemId, status] of batch) {
        const key = dirtyKey(orderId, itemId);
        if (map.get(key) === status) {
          map.delete(key);
          changed = true;
        }
      }
      if (changed) setDirtyBoth(map);
      showApiError(err, "kitchenItemStatus");
    } finally {
      inflight.current.delete(orderId);
      // Overlay moved vs what we sent (re-taps mid-flight) → flush again.
      // Identical leftovers (echo simply not arrived yet) must NOT re-flush
      // or we'd loop PATCHing the same payload forever.
      const now = collectChanges(orderId);
      const differs =
        now.size !== batch.size || [...now].some(([id, s]) => batch.get(id) !== s);
      if (now.size > 0 && differs) scheduleFlush(orderId);
    }
  }

  // Reconcile: whenever server truth moves, prune overlay entries it now
  // confirms — and orphans whose order/item vanished (deleted, split away).
  useEffect(() => {
    if (dirtyRef.current.size === 0) return;
    const live = new Map<string, OrderItemStatus>();
    for (const o of orders) {
      for (const it of o.items) live.set(o.id + ":" + it.id, it.status);
    }
    const map = new Map(dirtyRef.current);
    let changed = false;
    for (const [key, want] of map) {
      const server = live.get(key);
      if (server === undefined || server === want) {
        map.delete(key);
        changed = true;
      }
    }
    if (changed) setDirtyBoth(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  useEffect(() => {
    const timers = flushTimers.current;
    return () => {
      for (const t of timers.values()) clearTimeout(t);
      timers.clear();
    };
  }, []);

  // What the board renders: server truth + optimistic overlay.
  const displayOrders = useMemo(() => {
    if (dirty.size === 0) return orders;
    return orders.map((o) => {
      let touched = false;
      const items = o.items.map((it) => {
        const s = dirty.get(o.id + ":" + it.id);
        if (s !== undefined && s !== it.status) {
          touched = true;
          return { ...it, status: s };
        }
        return it;
      });
      return touched ? { ...o, items } : o;
    });
  }, [orders, dirty]);

  const dishToCategory = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((cat) => {
      cat.dishes.forEach((d) => {
        map[d.id] = cat.id;
      });
    });
    return map;
  }, [categories]);

  // Surface filter state to the kiosk shell so it can decide whether an
  // incoming SSE item is in-scope for a chime.
  useEffect(() => {
    onFiltersChange?.({
      statuses: statusFilter,
      categoryIds: categoryFilter,
      dishToCategory,
    });
  }, [statusFilter, categoryFilter, dishToCategory, onFiltersChange]);

  function filterItems(items: OrderItem[]): OrderItem[] {
    return items.filter((it) => {
      if (statusFilter.length > 0 && !statusFilter.includes(it.status)) return false;
      if (categoryFilter.length > 0 && !categoryFilter.includes(dishToCategory[it.dishId])) return false;
      return true;
    });
  }

  // One column per ORDER (not per table). A table with two open orders shows
  // as two separate columns, both tinted with the same table colour.
  type OrderColumn = {
    orderId: string;
    dailyNumber: number;
    tableId: string | null;
    tableNumber: number | string | null;
    items: OrderItem[];
    createdAt: string;
  };
  const columns: OrderColumn[] = [];
  for (const o of displayOrders) {
    if (o.status !== "active") continue;
    const its = filterItems(o.items);
    if (its.length === 0) continue;
    columns.push({
      orderId: o.id,
      dailyNumber: o.dailyNumber,
      tableId: o.tableId ?? null,
      tableNumber: o.tableNumber ?? null,
      items: its,
      createdAt: o.createdAt,
    });
  }
  const visibleGroups = columns.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const STATUS_FILTERS: {
    id: OrderItemStatus;
    labelKey: "statusPending" | "statusCooking" | "statusReady" | "statusServed";
  }[] = [
    { id: "pending", labelKey: "statusPending" },
    { id: "cooking", labelKey: "statusCooking" },
    { id: "ready", labelKey: "statusReady" },
    { id: "served", labelKey: "statusServed" },
  ];

  const filterBtnBase =
    "shrink-0 inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-sm font-medium transition-colors";
  const filterBtnOn = "bg-foreground text-background";
  const filterBtnOff = "bg-secondary text-muted-foreground hover:text-foreground";

  return (
    <div className={kioskLayout ? "h-full flex flex-col min-h-0" : undefined}>
      <div
        className={
          (kioskLayout
            ? "shrink-0 bg-header border-b border-border"
            : "sticky z-10 -mx-4 md:-mx-6 -mt-5 md:-mt-4 bg-header border-b border-border")
        }
        style={kioskLayout ? undefined : { top: "var(--topbar-h, 0px)" }}
      >
        <div className="flex items-center gap-2 py-2">
          <div className="flex items-center gap-2 flex-nowrap overflow-x-auto min-w-0 flex-1 px-4">
          {STATUS_FILTERS.map((s) => {
            const on = statusFilter.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                data-testid={"kds-filter-" + s.id}
                onClick={() =>
                  setStatusFilter((cur) =>
                    cur.includes(s.id) ? cur.filter((x) => x !== s.id) : [...cur, s.id],
                  )
                }
                className={filterBtnBase + " " + (on ? filterBtnOn : filterBtnOff)}
              >
                <span className={"w-1.5 h-1.5 rounded-full shrink-0 " + STATUS_DOT_CLS[s.id]} aria-hidden />
                {t(s.labelKey)}
              </button>
            );
          })}
          {categories.length > 0 ? (
            <>
              <span className="w-px h-5 bg-border shrink-0 mx-0.5" aria-hidden />
              {categories.map((c) => {
                const on = categoryFilter.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    data-testid="kds-filter-cat"
                    onClick={() =>
                      setCategoryFilter((cur) =>
                        cur.includes(c.id) ? cur.filter((x) => x !== c.id) : [...cur, c.id],
                      )
                    }
                    className={filterBtnBase + " " + (on ? filterBtnOn : filterBtnOff)}
                  >
                    {getMlWithFallback(c.name, defaultLang, defaultLang)}
                  </button>
                );
              })}
            </>
          ) : null}
          {/* Phone: zoom rides inside the scrolling chip row. */}
          {filterBarExtras ? <div className="md:hidden shrink-0 flex items-center gap-1.5">{filterBarExtras}</div> : null}
          </div>
          {/* Tablet/desktop: zoom pinned to the right, outside the scroll. */}
          {filterBarExtras ? <div className="hidden md:flex shrink-0 items-center gap-1.5 pl-2 pr-4">{filterBarExtras}</div> : null}
        </div>
      </div>

      {visibleGroups.length === 0 ? (
        <div className={kioskLayout ? "flex-1 min-h-0 flex items-center justify-center px-4" : "pt-7 md:pt-6 px-4 md:px-6"}>
          <div className="w-full max-w-md min-h-[200px] flex items-center justify-center bg-[hsl(var(--menu-card-bg))] border border-border rounded-xl px-6 py-10 text-center">
            <div>
              <div className="text-sm font-medium text-foreground mb-1">{t("kitchenClear")}</div>
              <div className="text-sm text-muted-foreground">{t("kitchenClearSub")}</div>
            </div>
          </div>
        </div>
      ) : kioskLayout ? (
        <div className="flex-1 min-h-0 overflow-x-auto pb-1 px-4 md:px-6 mt-3">
          <div className="flex items-start gap-3 h-full" style={{ width: "max-content" }}>
            {visibleGroups.map((g) => (
              <KitchenOrderCard
                key={g.orderId}
                orderId={g.orderId}
                dailyNumber={g.dailyNumber}
                items={g.items}
                table={g.tableId ? tables.find((t) => t.id === g.tableId) || null : null}
                tableNumberFallback={g.tableNumber}
                createdAt={g.createdAt}
                defaultLang={defaultLang}
                onItemAdvance={advanceItemStatus}
                fullHeight
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="-mx-4 md:-mx-6 mt-4 md:mt-3">
          <div className="overflow-x-auto pb-1 px-4 md:px-6">
            <div className="flex items-start gap-3" style={{ width: "max-content" }}>
              {visibleGroups.map((g) => (
                <KitchenOrderCard
                  key={g.orderId}
                  orderId={g.orderId}
                  dailyNumber={g.dailyNumber}
                  items={g.items}
                  table={g.tableId ? tables.find((t) => t.id === g.tableId) || null : null}
                  tableNumberFallback={g.tableNumber}
                  createdAt={g.createdAt}
                  defaultLang={defaultLang}
                  onItemAdvance={advanceItemStatus}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KitchenOrderCard({
  orderId,
  dailyNumber,
  items,
  table,
  tableNumberFallback,
  createdAt,
  defaultLang,
  onItemAdvance,
  fullHeight,
}: {
  orderId: string;
  dailyNumber: number;
  items: OrderItem[];
  table: TableEntity | null;
  tableNumberFallback: number | string | null;
  createdAt: string;
  defaultLang: string;
  onItemAdvance: (orderId: string, itemId: string) => void;
  fullHeight?: boolean;
}) {
  const t = useTranslations("dashboard.orders");
  // Tableless orders (delivery/takeaway) → don't render any table text at all.
  const hasTable = table != null || tableNumberFallback != null;
  const tableNumber = table ? table.number : tableNumberFallback;

  // Column header: single row — order № · table chip (filled with the table's
  // admin colour, fixed white text, shadow keeps it legible on pale hues) ·
  // elapsed-time chip pinned right.
  const headerCls = "shrink-0 pt-4 mb-3";

  // Served items sink to the bottom; within a status group keep oldest-first.
  const sorted = [...items].sort((a, b) => {
    const sa = a.status === "served" ? 1 : 0;
    const sb = b.status === "served" ? 1 : 0;
    if (sa !== sb) return sa - sb;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  // FLIP: animate cards sliding to their new slot when the sort order changes
  // (e.g. an item tapped to "served" glides down to the bottom). Re-runs
  // whenever the ordered id+status signature changes.
  const flipRef = useFlip<HTMLDivElement>([sorted.map((i) => i.id + i.status).join(",")]);

  return (
    <div className={"w-72 shrink-0 flex flex-col" + (fullHeight ? " max-h-full" : "")}>
      <div className={headerCls}>
        <div className="flex items-center gap-2">
          {hasTable ? (
            <span
              className="shrink-0 inline-flex items-center h-[28px] px-3 rounded-md text-sm font-medium text-white"
              style={{
                backgroundColor: table?.color || "#334155",
                textShadow: "0 1px 2px rgba(0,0,0,.35)",
              }}
            >
              {t("tableLabel", { number: tableNumber })}
              {table?.name ? " · " + table.name : ""}
            </span>
          ) : null}
          <span className="shrink-0 text-base font-semibold leading-tight">
            {t("orderLabel", { number: dailyNumber })}
          </span>
          <span className="ml-auto shrink-0 inline-flex items-center h-[28px] px-3 rounded-md text-sm font-medium tabular-nums bg-secondary text-muted-foreground">
            {formatElapsedHMS(createdAt)}
          </span>
        </div>
      </div>

      <div
        ref={flipRef}
        className={
          "flex flex-col gap-2 " +
          (fullHeight ? "flex-1 min-h-0 overflow-y-auto pb-1" : "flex-1")
        }
      >
        {sorted.map((item) => (
          <KitchenItem
            key={`${orderId}:${item.id}`}
            item={item}
            defaultLang={defaultLang}
            onAdvance={() => onItemAdvance(orderId, item.id)}
          />
        ))}
      </div>
    </div>
  );
}

// Per-status left accent on each dish card, matching the dot/text palette.
const STATUS_ACCENT_CLS: Record<OrderItemStatus, string> = {
  pending: "border-l-slate-700 dark:border-l-slate-400",
  cooking: "border-l-amber-500 dark:border-l-amber-400",
  ready: "border-l-blue-600 dark:border-l-blue-500",
  served: "border-l-emerald-600 dark:border-l-emerald-500",
};

function KitchenItem({
  item,
  defaultLang,
  onAdvance,
}: {
  item: OrderItem;
  defaultLang: string;
  onAdvance: () => void;
}) {
  const isServed = item.status === "served";
  // Time-chip escalation (industry KDS convention): neutral → amber ≥10 min →
  // red ≥20 min, so cooks spot stale tickets at a glance. Re-evaluated each
  // second via the parent's 1s tick.
  const ageMin = (Date.now() - new Date(item.createdAt).getTime()) / 60000;
  const timeCls =
    ageMin >= 20
      ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300"
      : ageMin >= 10
        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
        : "bg-secondary text-muted-foreground";
  return (
    <button
      type="button"
      data-testid="kds-item"
      data-flip-id={item.id}
      onClick={onAdvance}
      className={
        "w-full text-left rounded-lg border border-border border-l-4 bg-header px-4 sm:px-5 py-3 shadow-sm " +
        "transition-[opacity,box-shadow] hover:shadow-md active:scale-[0.99] " +
        STATUS_ACCENT_CLS[item.status] +
        (isServed ? " opacity-55" : "")
      }
    >
      {/* Industry-standard KDS item: the dish NAME is the dominant line —
          status reads from the left accent line + served muting, not a chip. */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1 text-base font-semibold text-foreground leading-snug">
          {getMlWithFallback(item.dishNameSnapshot, defaultLang, defaultLang)}
        </div>
        {!isServed ? (
          <span className={"shrink-0 inline-flex items-center h-[24px] px-2.5 rounded-md text-xs tabular-nums " + timeCls}>
            {formatElapsedHMS(item.createdAt)}
          </span>
        ) : null}
      </div>

      {item.options.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.options.map((o, i) => {
            const varName = getMlWithFallback(o.variantName, defaultLang, defaultLang);
            const qty = o.quantity ?? 1;
            return (
              <span
                key={i}
                className="inline-flex items-center gap-1 max-w-full px-2 py-0.5 rounded-md bg-secondary text-xs text-muted-foreground"
              >
                <span className="shrink-0 tabular-nums">×{qty}</span>
                <span className="min-w-0 truncate text-foreground">{varName}</span>
              </span>
            );
          })}
        </div>
      ) : null}

      {item.notes ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 max-w-full px-2 py-0.5 rounded-md bg-amber-100 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            <span className="min-w-0">{item.notes}</span>
          </span>
        </div>
      ) : null}
    </button>
  );
}

