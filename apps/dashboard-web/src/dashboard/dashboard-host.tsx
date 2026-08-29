import { useQueries } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { api, ApiError } from "@/lib/api";

// Orders + reservations are PRO-only; a BASIC restaurant gets 403 there. Don't
// retry that (it's a deterministic entitlement block, not a transient error) —
// otherwise the boot loader hangs for seconds while React Query backs off.
const retryUnlessForbidden = (count: number, err: unknown) =>
  !(err instanceof ApiError && err.status === 403) && count < 3;
import { FullPageLoader } from "@/components/full-page-loader";
import { logoutAndBounceToLanding } from "@/lib/logout-bounce";
import { Shell } from "./_spa/shell";
import { DashboardSpaWrapper } from "./_spa/spa-wrapper";
import { DashboardChrome } from "./_v2/chrome";
import {
  apiOrderToOrder,
  apiReservationToBooking,
  apiRestaurantToRestaurant,
  apiTableToTable,
  buildCategories,
} from "./_v2/mappers";
import type {
  ApiCategory,
  ApiItem,
  ApiOrder,
  ApiReservation,
  ApiRestaurant,
  ApiTable,
} from "./_v2/api";
import { isAdminEmail } from "@/lib/admin";
import { queueCtx } from "@/lib/analytics";
import { useTheme } from "@/components/theme-provider";

interface AuthCheck {
  authenticated: boolean;
  email?: string;
  userId?: string;
  onboardingStep?: number;
  legacyDashboard?: boolean;
  isDemo?: boolean;
  // True for accounts created on/after the dark-default cutoff — the dashboard
  // defaults to dark for them (older accounts keep system-follow).
  defaultDark?: boolean;
  // Account creation time (ISO) — gates the daily trial reminder modal.
  accountCreatedAt?: string | null;
  impersonatedBy?: string | null;
}

interface SubData {
  subscriptionStatus: string | null;
  trialEndsAt: string | null;
  currentPeriodEnd?: string | null;
  pastDueSince?: string | null;
  interval?: string | null;
  proFeatures?: boolean;
  menuOnline?: boolean;
  // à-la-carte capabilities — orders/KDS ride `proFeatures`, reservations is its
  // own add-on and must be gated independently.
  features?: { menuOnline: boolean; reservations: boolean; ordersKds: boolean; customDomain: boolean };
  aiImagesUsed?: number;
  aiImagesLimit?: number | null;
  canManageBilling?: boolean;
}

// Email/campaign links land with ?from=<source> or ?ec=<campaign> (signed-in
// ad/landing arrivals also carry ?from= — the landing middleware forwards the
// query). Consume them once on boot: pass the source as batch ctx, so the
// server writes it onto the visit row (`SessionNew.from`, first-write-wins)
// and it shows on the session in the admin sessions list — no event of its
// own. Strip ONLY these two params — the rest of the query string belongs to
// SPA routing (?demo= etc).
const ATTRIBUTION_PARAMS = ["from", "ec"];
function consumeAttributionParams(): void {
  const sp = new URLSearchParams(window.location.search);
  if (!ATTRIBUTION_PARAMS.some((k) => sp.get(k))) return;
  for (const k of ATTRIBUTION_PARAMS) {
    const raw = sp.get(k);
    sp.delete(k);
    if (!raw) continue;
    const v = raw
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");
    // ?ec= marks a click from a lifecycle email, ?from= any other campaign.
    if (v) queueCtx({ from: (k === "ec" ? `email_${v}` : v).slice(0, 64) });
  }
  const qs = sp.toString();
  window.history.replaceState(
    {},
    "",
    window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash,
  );
}

export function DashboardHost() {
  const { locale } = useParams({ strict: false }) as { locale?: string };
  const { setTheme } = useTheme();

  useEffect(() => {
    consumeAttributionParams();
  }, []);

  const auth = useQueries({
    queries: [
      { queryKey: ["auth"], queryFn: () => api<AuthCheck>("/auth/check"), staleTime: 60_000 },
    ],
  })[0];

  const authData = auth.data;

  useEffect(() => {
    if (auth.isLoading || !authData) return;
    if (!authData.authenticated) {
      // Clears the (dead) cookie BEFORE navigating — the landing middleware
      // forwards cookie-carrying visitors back here, which would loop.
      void logoutAndBounceToLanding(locale || "en");
      return;
    }
    // The legacyDashboard flag is honoured only on /login (post-sign-in)
    // and NOT here, otherwise users who clicked "Try new dashboard" from
    // the old monolith would bounce straight back. Once they've reached
    // the new SPA we let them stay.
  }, [auth.isLoading, authData, locale]);

  // New accounts (created on/after the cutoff) default to dark. Only applied
  // when the user has never picked a theme — once "iq-theme" is in localStorage
  // (system/light/dark), their choice wins and we never override it.
  useEffect(() => {
    if (!authData?.authenticated || !authData.defaultDark) return;
    try {
      if (localStorage.getItem("iq-theme") === null) setTheme("dark");
    } catch {
      // ignore storage access errors
    }
  }, [authData, setTheme]);

  const enabled = !!authData?.authenticated;

  // Subscription gates the PRO-only surfaces. Fetch it first (separately from
  // the data batch) so orders/reservations + the SSE stream can be disabled
  // for BASIC (menu-only) restaurants. Without this gate a BASIC account hits
  // /orders + /reservations on every stream (re)connect, each returns 403, and
  // the resulting state churn remounts the whole dashboard in a tight loop —
  // the "blinking dashboard" regression introduced with PRO gating.
  const subQ = useQueries({
    queries: [
      { queryKey: ["sub"], queryFn: () => api<SubData | null>("/restaurant/subscription").catch(() => null), enabled },
    ],
  })[0];
  const proFeatures = !!subQ.data?.proFeatures;
  const proEnabled = enabled && proFeatures;
  // Reservations is an independent à-la-carte add-on: gate its query on the
  // reservations capability, not orders. A reservations-only venue must load its
  // bookings; an orders-only venue must NOT hit /reservations (it 403s). Fall
  // back to proFeatures when the API predates the `features` payload.
  const reservationsFeature = subQ.data?.features?.reservations ?? proFeatures;
  const reservationsEnabled = enabled && reservationsFeature;

  const data = useQueries({
    queries: [
      { queryKey: ["restaurant"], queryFn: () => api<ApiRestaurant>("/restaurant"), enabled },
      { queryKey: ["categories"], queryFn: () => api<ApiCategory[]>("/categories"), enabled },
      { queryKey: ["items"], queryFn: () => api<ApiItem[]>("/items"), enabled },
      { queryKey: ["tables"], queryFn: () => api<ApiTable[]>("/tables"), enabled },
      // SSE stream (use-orders-stream) is the primary source of order
      // updates; polling stays as a safety net for the rare case the stream
      // is disconnected. refetchIntervalInBackground keeps a KDS on a side
      // monitor up-to-date when the staff has the window in the background.
      // PRO-gated: BASIC has no orders/reservations surface, so don't fetch
      // (the endpoints 403 for BASIC) — see the proEnabled comment above.
      {
        queryKey: ["orders"],
        // The board only renders open orders (completed/cancelled are filtered
        // out client-side and live in analytics) — fetch just those so the
        // payload doesn't grow unbounded with history.
        queryFn: () => api<ApiOrder[]>("/orders?open=1"),
        enabled: proEnabled,
        retry: retryUnlessForbidden,
        refetchInterval: 30_000,
        refetchIntervalInBackground: true,
        refetchOnReconnect: "always",
        refetchOnWindowFocus: "always",
      },
      {
        queryKey: ["reservations"],
        queryFn: () => api<ApiReservation[]>("/reservations"),
        enabled: reservationsEnabled,
        retry: retryUnlessForbidden,
        refetchInterval: 30_000,
        refetchIntervalInBackground: true,
        refetchOnReconnect: "always",
        refetchOnWindowFocus: "always",
      },
    ],
  });

  if (auth.isLoading || !authData) return <FullPageLoader />;
  if (!authData.authenticated) return <FullPageLoader />;
  if (data.some((q) => q.isLoading)) return <FullPageLoader />;

  const [restaurantQ, catsQ, itemsQ, tablesQ, ordersQ, reservationsQ] = data;
  const restaurant = restaurantQ.data;
  if (!restaurant) return <FullPageLoader />;

  const apiTables = (tablesQ.data || []) as ApiTable[];
  const tablesByNumber = new Map(apiTables.map((t) => [t.number, t.id]));

  const rawItems = (itemsQ.data || []) as (Omit<ApiItem, "price"> & { price: number | string })[];
  const items: ApiItem[] = rawItems.map((it) => ({ ...it, price: Number(it.price) }));
  const initialCategories = buildCategories(
    (catsQ.data || []) as ApiCategory[],
    items,
    restaurant.defaultLanguage || "en",
  );
  const initialOrders = ((ordersQ.data || []) as ApiOrder[]).map((o) => apiOrderToOrder(o, tablesByNumber));
  const initialBookings = ((reservationsQ.data || []) as ApiReservation[]).map(apiReservationToBooking);
  const initialTables = apiTables.map(apiTableToTable);

  const sub = subQ.data;
  const initialSub = sub
    ? {
        subscriptionStatus: sub.subscriptionStatus,
        trialEndsAt: sub.trialEndsAt,
        currentPeriodEnd: sub.currentPeriodEnd ?? null,
        pastDueSince: sub.pastDueSince ?? null,
        interval: sub.interval ?? null,
        proFeatures: sub.proFeatures ?? false,
        menuOnline: sub.menuOnline ?? true,
        // reservations is a separate à-la-carte add-on — don't fold it into proFeatures.
        reservationsFeature: sub.features?.reservations ?? sub.proFeatures ?? false,
        aiImagesUsed: sub.aiImagesUsed ?? 0,
        aiImagesLimit: sub.aiImagesLimit ?? null,
        canManageBilling: sub.canManageBilling ?? true,
      }
    : null;

  const uiRestaurant = apiRestaurantToRestaurant(restaurant);

  return (
    <DashboardSpaWrapper locale={locale || "en"}>
      <DashboardChrome
        restaurant={uiRestaurant}
        sub={initialSub}
        isAdmin={isAdminEmail(authData.email)}
        impersonatedBy={authData.impersonatedBy ?? null}
      >
        <Shell
          initialCategories={initialCategories}
          initialOrders={initialOrders}
          initialBookings={initialBookings}
          initialTables={initialTables}
          initialSub={initialSub}
          isDemo={!!authData.isDemo}
          impersonatedBy={authData.impersonatedBy ?? null}
          accountCreatedAt={authData.accountCreatedAt ?? null}
          onboardingNameDone={restaurant.onboardingNameDone ?? true}
          onboardingFillDone={restaurant.onboardingFillDone ?? true}
        />
      </DashboardChrome>
    </DashboardSpaWrapper>
  );
}

// FullPageLoader is the shared one in @/components/full-page-loader so the
// pre-Suspense fallback and the post-mount auth/data wait look identical
// (avoids the "small spinner → other small spinner" flicker on first load).
