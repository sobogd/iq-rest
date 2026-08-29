"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useDashboardRouter } from "./router";
import type { View } from "./types";

import { MenuList } from "../_v2/menu-list";
import { OrdersPage, KitchenPage } from "../_v2/orders";
import { ReservationsPage, CtaState } from "../_v2/reservations";
import { TablesPage, TableFormPage } from "../_v2/tables";
import { CategoryForm, DishForm, OptionForm } from "../_v2/forms";
import { useRestaurant, useRestaurantOrNull } from "../_v2/restaurant-context";
import { useOrdersStream } from "../_v2/use-orders-stream";
import { fetchCategories, fetchItems } from "../_v2/api";
import { buildCategories } from "../_v2/mappers";
import { getMlWithFallback } from "../_v2/i18n";
import type { ApiCategory, ApiItem } from "../_v2/api";
import {
  ContactsSettingsPage,
  BrandingSettingsPage,
  GeneralSettingsPage,
  OrderSettingsPage,
  BookingSettingsPage,
  LanguagesSettingsPage,
  BillingSettingsPage,
  SupportPage,
} from "../_v2/settings";
import { CustomTextsSettingsPage } from "../_v2/custom-texts";
import { AnalyticsClient } from "../analytics/analytics-client";
import { DevicesSettingsPage } from "../_v2/devices-settings";
import { RestaurantsListPage, RestaurantNewPage } from "../_v2/restaurants-page";
import { FirstRunModals } from "../_v2/first-run-modals";
import { AdminRestaurantsPage } from "../_pages/admin-restaurants";
import { AdminUsersPage } from "../_pages/admin-users";
import { AdminRestaurantPage } from "../_pages/admin-restaurant";
import { TrafficPage } from "../_pages/traffic";
import { TrafficSessionPage } from "../_pages/traffic-session";
import { AdminLeadsPage } from "../_pages/admin-leads";
import { AdminInboxPage } from "../_pages/admin-inbox";
import { AdminInboxThreadPage } from "../_pages/admin-inbox-thread";
import { LandingRedirect, LogoutRedirect } from "../../auth/landing-redirect";
import { Page } from "../_v2/page";

import type { Booking, Category, Dish, DishOption, Order, Restaurant, Restaurant as UIRestaurant, TableEntity } from "../_v2/types";

export interface ShellInitialData {
  initialCategories: Category[];
  initialOrders: Order[];
  initialBookings: Booking[];
  initialTables: TableEntity[];
  initialSub: { subscriptionStatus: string | null; trialEndsAt: string | null; currentPeriodEnd?: string | null; pastDueSince?: string | null; interval?: string | null; proFeatures?: boolean; reservationsFeature?: boolean; menuOnline?: boolean } | null;
  isDemo?: boolean;
  impersonatedBy?: string | null;
  userEmail?: string;
  accountCreatedAt?: string | null;
  onboardingNameDone?: boolean;
  onboardingFillDone?: boolean;
}

export function Shell(props: ShellInitialData) {
  return <ShellBody {...props} />;
}

function ShellBody(props: ShellInitialData) {
  const router = useDashboardRouter();
  const { view } = router;
  const restaurant = useRestaurantOrNull();
  const isAuthView = view.name.startsWith("auth.");
  const queryClient = useQueryClient();

  // Live SSE stream of order events. Bypasses polling — when this is open,
  // updates from any device / QR diner / other tab arrive in ~100ms.
  // Polling stays alive in dashboard-host as a 30s fallback for the rare
  // case when the stream is disconnected (server restart, CDN flake).
  // PRO-gated: a BASIC (menu-only) restaurant has no orders/reservations, so
  // we never open the stream — otherwise every (re)connect's "ready" event
  // invalidates orders+reservations, both 403, and the churn remounts the
  // dashboard in a tight loop (the "blinking dashboard" regression).
  // Open the realtime stream when the venue holds ANY operational add-on —
  // orders/KDS (proFeatures) OR reservations (its own à-la-carte capability).
  // A reservations-only venue still needs live booking events. A fully menu-only
  // / inactive venue opens no stream (avoids the 403-reconnect blink loop).
  const proFeatures = !!props.initialSub?.proFeatures;
  const reservationsFeature = !!props.initialSub?.reservationsFeature;
  useOrdersStream(proFeatures || reservationsFeature ? (restaurant?.id ?? null) : null);

  // Inactive venue (account entitlement): the public menu is offline (no active
  // plan / expired trial / a BASIC plan applied to another venue). Show a
  // persistent upgrade banner. Suppressed for demo + admin impersonation.
  const tUpsell = useTranslations("dashboard.proUpsell");
  const menuOffline =
    !props.isDemo &&
    !props.impersonatedBy &&
    props.initialSub != null &&
    props.initialSub.menuOnline === false;

  // Cheap extra safety: invalidate when the user lands on an orders/kitchen/
  // reservations view, in case the stream is mid-reconnect.
  useEffect(() => {
    if (view.name === "orders" || view.name === "orders.detail" || view.name === "kitchen") {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    } else if (view.name === "reservations") {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    }
  }, [view.name, queryClient]);

  const backToMenu = useCallback(() => router.resetTo({ name: "menu" }), [router]);

  // Persistent stateful data — survives navigation between views.
  const [categories, setCategories] = useState<Category[]>(props.initialCategories);
  const [orders, setOrders] = useState<Order[]>(props.initialOrders);
  const [bookings, setBookings] = useState<Booking[]>(props.initialBookings);
  const [tables, setTables] = useState<TableEntity[]>(props.initialTables);

  // When the active restaurant changes, hard-replace orders / bookings
  // with the new restaurant's server snapshot. The merge effects below
  // would otherwise preserve previous-restaurant rows as "local-only".
  const prevRestaurantIdRef = useRef<string | null>(restaurant?.id ?? null);
  useEffect(() => {
    if (prevRestaurantIdRef.current !== (restaurant?.id ?? null)) {
      prevRestaurantIdRef.current = restaurant?.id ?? null;
      setOrders(props.initialOrders);
      setBookings(props.initialBookings);
    }
  }, [restaurant?.id, props.initialOrders, props.initialBookings]);

  // Sync from TanStack Query (SSE-fed cache + 30s poll fallback). Keep only
  // *freshly* created local records that the server snapshot hasn't echoed back
  // yet — bounded to a short optimistic window. Without the bound, an order
  // closed/removed on another device (and therefore absent from the snapshot)
  // would be re-added here as "local-only" forever, so it never disappeared
  // until F5. The server is authoritative for everything older than the window.
  useEffect(() => {
    setOrders((prev) => {
      const serverIds = new Set(props.initialOrders.map((o) => o.id));
      const now = Date.now();
      const OPTIMISTIC_WINDOW_MS = 15_000;
      const localOnly = prev.filter((o) => {
        if (serverIds.has(o.id)) return false;
        const created = o.createdAt ? new Date(o.createdAt).getTime() : 0;
        return Number.isFinite(created) && now - created < OPTIMISTIC_WINDOW_MS;
      });
      return [...props.initialOrders, ...localOnly];
    });
  }, [props.initialOrders]);

  useEffect(() => {
    setBookings((prev) => {
      const serverIds = new Set(props.initialBookings.map((b) => b.id));
      const localOnly = prev.filter((b) => !serverIds.has(b.id));
      return [...props.initialBookings, ...localOnly];
    });
  }, [props.initialBookings]);

  // Sync categories + tables when the active restaurant changes (TanStack
  // Query refetched with a new X-Restaurant-Id header → host re-passes new
  // initialCategories/initialTables). Local-only edits are rare here, so
  // mirror the server snapshot wholesale.
  useEffect(() => {
    setCategories(props.initialCategories);
  }, [props.initialCategories]);

  useEffect(() => {
    setTables(props.initialTables);
  }, [props.initialTables]);

  const defaultLang = restaurant?.defaultLang || "en";
  const refreshMenu = useCallback(async () => {
    try {
      const [cats, its] = await Promise.all([fetchCategories(), fetchItems()]);
      const items = ((its as unknown) as (Omit<ApiItem, "price"> & { price: number | string })[]).map(
        (it) => ({ ...it, price: Number(it.price) }) as ApiItem,
      );
      const built = buildCategories(cats as unknown as ApiCategory[], items, defaultLang);
      setCategories(built);
      // Keep the shared TanStack cache in lock-step so the host's props
      // re-derivation (and the useEffect sync above) sees the same rows
      // and doesn't overwrite the freshly-refreshed state on the next
      // render of an unrelated query.
      void queryClient.invalidateQueries({ queryKey: ["categories"] });
      void queryClient.invalidateQueries({ queryKey: ["items"] });
    } catch {
      // ignore
    }
  }, [defaultLang, queryClient]);

  // Orders + reservations are polled by TanStack queries in dashboard-host.
  // Local setInterval was duplicating that polling — removed.

  if (isAuthView) {
    // Logout must clear the session before leaving — see LogoutRedirect.
    return view.name === "auth.logout" ? <LogoutRedirect /> : <LandingRedirect />;
  }
  if (!restaurant) return null;

  const realItemsCount = categories.reduce((n, c) => n + (c.dishes?.length ?? 0), 0);

  return (
    <>
      {menuOffline ? (
        <div className="shrink-0 flex items-center justify-between gap-3 border-b border-amber-300 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/40 px-4 md:px-6 py-2.5">
          <div className="min-w-0">
            <div className="text-sm font-medium text-amber-900 dark:text-amber-300">{tUpsell("menuOffline.title")}</div>
            <div className="text-xs text-amber-800 dark:text-amber-400/90 leading-snug mt-0.5">{tUpsell("menuOffline.body")}</div>
          </div>
          <button
            type="button"
            onClick={() => router.push({ name: "settings.billing" })}
            className="shrink-0 h-8 px-3 rounded-lg bg-amber-600 text-white text-xs font-medium"
          >
            {tUpsell("cta")}
          </button>
        </div>
      ) : null}
      <ViewSwitch
        view={view}
        restaurant={restaurant}
        categories={categories}
        orders={orders}
        setOrders={setOrders}
        bookings={bookings}
        setBookings={setBookings}
        tables={tables}
        setTables={setTables}
        sub={props.initialSub}
        isDemo={!!props.isDemo}
        impersonatedBy={props.impersonatedBy ?? null}
        backToMenu={backToMenu}
        refreshMenu={refreshMenu}
      />
      {/* First-run modals: onboarding (name → fill → scan), then the daily
          trial reminder + the past-due nudge — sequenced so the billing modals
          are always last. Rendered under admin impersonation too, on purpose:
          logging in as a restaurant is how an admin reviews exactly what that
          owner sees first (onboarding / trial / past-due). The daily-dismiss
          localStorage flags are cleared when impersonation starts (see
          admin-restaurant handleImpersonate) so a modal the admin dismissed on
          their own account still shows for the impersonated one. */}
      <FirstRunModals
        key={restaurant.id}
        restaurantName={restaurant.name}
        onboardingNameDone={props.onboardingNameDone ?? true}
        onboardingFillDone={props.onboardingFillDone ?? true}
        existingRealItemsCount={realItemsCount}
        onRefresh={refreshMenu}
        sub={props.initialSub}
        accountCreatedAt={props.accountCreatedAt ?? null}
      />
    </>
  );
}

interface SwitchProps {
  view: View;
  restaurant: Restaurant;
  categories: Category[];
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  tables: TableEntity[];
  setTables: React.Dispatch<React.SetStateAction<TableEntity[]>>;
  sub: ShellInitialData["initialSub"];
  isDemo: boolean;
  impersonatedBy: string | null;
  backToMenu: () => void;
  refreshMenu: () => Promise<void>;
}

// PRO-gated views: orders/kitchen/reservations + their settings sub-pages are
// PRO-only. A BASIC (menu-only) restaurant sees the upsell placeholder instead.
type ProFeature = "orders" | "kitchen" | "reservations" | "devices";
const PRO_FEATURE_VIEWS: Record<string, ProFeature> = {
  orders: "orders",
  "orders.detail": "orders",
  kitchen: "kitchen",
  reservations: "reservations",
  "settings.orders": "orders",
  "settings.bookings": "reservations",
  "settings.devices": "devices",
};

function ProUpsell({ feature, onUpgrade }: { feature: ProFeature; onUpgrade: () => void }) {
  const t = useTranslations("dashboard.proUpsell");
  const tn = useTranslations("dashboard.nav");
  const navTitle: Record<ProFeature, string> = {
    orders: tn("orders"),
    kitchen: tn("kitchen"),
    reservations: tn("reservations"),
    devices: tn("settings"),
  };
  return (
    <Page title={navTitle[feature]}>
      <CtaState
        title={t(`${feature}.title`)}
        body={t(`${feature}.body`)}
        cta={t("cta")}
        onClick={onUpgrade}
      />
    </Page>
  );
}

function ViewSwitch(p: SwitchProps) {
  const { view, restaurant, categories, orders, setOrders, bookings, setBookings, tables, setTables, sub, isDemo, impersonatedBy, backToMenu, refreshMenu } = p;
  const router = useDashboardRouter();

  const onSavedMenu = async () => {
    await refreshMenu();
    backToMenu();
  };

  // PRO-feature gate: only lock once we know the entitlement (sub loaded) so
  // paying users never see a flash of the upsell. The backend enforces too.
  // à-la-carte: each add-on gates on its OWN capability — orders/kitchen/devices
  // ride proFeatures (orders==KDS), reservations is independent, so a
  // reservations-only plan must NOT be locked out of bookings.
  const featureAllowed = (f: ProFeature): boolean =>
    f === "reservations" ? !!sub?.reservationsFeature : !!sub?.proFeatures;
  const pendingFeature = sub != null ? PRO_FEATURE_VIEWS[view.name] : undefined;
  const lockedFeature = pendingFeature && !featureAllowed(pendingFeature) ? pendingFeature : undefined;
  if (lockedFeature) {
    return <ProUpsell feature={lockedFeature} onUpgrade={() => router.push({ name: "settings.billing" })} />;
  }

  switch (view.name) {
    case "auth.login":
    case "auth.otp":
      return <LandingRedirect />;
    case "auth.logout":
      return <LogoutRedirect />;
    case "menu":
      return (
        <MenuList
          initialCategories={categories}
          initialSub={sub}
          onPersisted={refreshMenu}
          currentGroupId={view.group ?? null}
        />
      );
    case "orders":
    case "orders.detail":
    case "orders.addItem" as never: // legacy; orders page handles its own internal nav
      return (
        <OrdersPage
          orders={orders}
          setOrders={setOrders}
          tables={tables}
          categories={categories}
          defaultLang={restaurant.defaultLang}
          currency={restaurant.currency}
        />
      );
    case "reservations":
      return <ReservationsPage restaurant={restaurant} bookings={bookings} setBookings={setBookings} tables={tables} />;
    case "kitchen":
      return (
        <KitchenPage
          orders={orders}
          setOrders={setOrders}
          tables={tables}
          categories={categories}
          defaultLang={restaurant.defaultLang}
        />
      );
    case "analytics":
      return <AnalyticsClient />;

    case "settings.contacts":
      return <SettingsContactsWrapper />;
    case "settings.branding":
      return <SettingsBrandingWrapper />;
    case "settings.general":
      return <SettingsGeneralWrapper />;
    case "settings.tables":
      return (
        <TablesPage
          tables={tables}
          setTables={setTables}
          orders={orders}
          bookings={bookings}
          menuUrl={restaurant.menuUrl}
        />
      );
    case "settings.tables.new":
      return (
        <TableFormPage
          mode="new"
          tables={tables}
          setTables={setTables}
          orders={orders}
          bookings={bookings}
          menuUrl={restaurant.menuUrl}
          onBack={() => router.push({ name: "settings.tables" })}
        />
      );
    case "settings.tables.edit":
      return (
        <TableFormPage
          mode="edit"
          tableId={view.id}
          tables={tables}
          setTables={setTables}
          orders={orders}
          bookings={bookings}
          menuUrl={restaurant.menuUrl}
          onBack={() => router.push({ name: "settings.tables" })}
        />
      );
    case "settings.orders":
      return <SettingsOrdersWrapper />;
    case "settings.bookings":
      return <SettingsBookingsWrapper />;
    case "settings.languages":
      return <SettingsLanguagesWrapper />;
    case "settings.customTexts":
      // Admin-only surface — a non-impersonation deep-link bounces to the hub
      // (the save/translate endpoints are also 403'd server-side).
      return impersonatedBy ? <CustomTextsSettingsPage /> : <MenuRedirect onDone={backToMenu} />;
    case "settings.billing":
      return <SettingsBillingWrapper onBack={view.from === "menu" ? backToMenu : undefined} />;
    case "settings.support":
      return <SettingsSupportWrapper />;
    case "settings.devices":
      return <DevicesSettingsPage />;
    case "settings.restaurants":
      return <RestaurantsListPage isDemo={isDemo} />;
    case "settings.restaurants.new":
      return <RestaurantNewPage onBack={() => router.push({ name: "settings.restaurants" })} isDemo={isDemo} />;

    case "settings.admin.restaurants":
      return <AdminRestaurantsPage />;
    case "settings.admin.users":
      return <AdminUsersPage />;
    case "settings.admin.restaurant":
      return <AdminRestaurantPage restaurantId={view.id} />;
    case "settings.admin.traffic":
      return <TrafficPage restaurantId={view.restaurantId} />;
    case "settings.admin.trafficSession":
      return <TrafficSessionPage id={view.id} restaurantId={view.restaurantId} />;
    case "settings.admin.leads":
      return <AdminLeadsPage />;
    case "settings.admin.inbox":
      return <AdminInboxPage />;
    case "settings.admin.inboxThread":
      return <AdminInboxThreadPage threadId={view.id} />;

    case "category.new":
      return (
        <CategoryForm
          category={null}
          parentGroupId={view.group ?? null}
          availableGroups={categories.filter((c) => c.isGroup)}
          onBack={backToMenu}
          onSavedRedirect={onSavedMenu}
          onDeletedRedirect={onSavedMenu}
        />
      );
    case "category.edit": {
      const cat = categories.find((c) => c.id === view.id);
      if (!cat) return <NotMigrated label="Category not found" />;
      return (
        <CategoryForm
          category={cat}
          availableGroups={categories.filter((c) => c.isGroup)}
          onBack={backToMenu}
          onSavedRedirect={onSavedMenu}
          onDeletedRedirect={onSavedMenu}
        />
      );
    }
    case "group.new":
      return (
        <CategoryForm
          category={null}
          isGroup
          onBack={backToMenu}
          onSavedRedirect={onSavedMenu}
          onDeletedRedirect={onSavedMenu}
        />
      );
    case "group.edit": {
      const cat = categories.find((c) => c.id === view.id && c.isGroup);
      if (!cat) return <NotMigrated label="Group not found" />;
      return (
        <CategoryForm
          category={cat}
          isGroup
          onBack={backToMenu}
          onSavedRedirect={onSavedMenu}
          onDeletedRedirect={onSavedMenu}
        />
      );
    }
    case "item.new": {
      const cat = categories.find((c) => c.id === view.categoryId);
      if (!cat || !view.categoryId) return <NotMigrated label="Category id required" />;
      const categoryName = getMlWithFallback(cat.name, restaurant.defaultLang, restaurant.defaultLang);
      return (
        <DishForm
          dish={null}
          categoryId={view.categoryId}
          categoryName={categoryName}
          onBack={backToMenu}
          onSavedRedirect={onSavedMenu}
          onDeletedRedirect={onSavedMenu}
          onPersisted={(id) => router.push({ name: "item.edit", id })}
          onOptionsRefresh={refreshMenu}
        />
      );
    }
    case "item.edit": {
      let dish: Dish | undefined;
      let cat: Category | undefined;
      for (const c of categories) {
        const d = c.dishes.find((dd) => dd.id === view.id);
        if (d) {
          dish = d;
          cat = c;
          break;
        }
      }
      if (!dish || !cat) return <NotMigrated label="Dish not found" />;
      const categoryName = getMlWithFallback(cat.name, restaurant.defaultLang, restaurant.defaultLang);
      return (
        <DishForm
          dish={dish}
          categoryId={dish.categoryId}
          categoryName={categoryName}
          onBack={backToMenu}
          onSavedRedirect={onSavedMenu}
          onDeletedRedirect={onSavedMenu}
          onOptionsRefresh={refreshMenu}
        />
      );
    }
    case "option.new":
    case "option.edit": {
      let dish: Dish | undefined;
      for (const c of categories) {
        const d = c.dishes.find((dd) => dd.id === view.itemId);
        if (d) {
          dish = d;
          break;
        }
      }
      if (!dish) return <NotMigrated label="Dish not found" />;
      const option = view.name === "option.edit" ? dish.options.find((o: DishOption) => o.id === view.optionId) : null;
      if (view.name === "option.edit" && !option) return <NotMigrated label="Option not found" />;
      const backToItem = () => {
        // We don't have the item.edit view stack; just go back.
        backToMenu();
      };
      const onSavedItem = async () => {
        await refreshMenu();
        backToItem();
      };
      return (
        <OptionForm
          dish={dish}
          option={option || null}
          onBack={backToItem}
          onSavedRedirect={onSavedItem}
          onDeletedRedirect={onSavedItem}
        />
      );
    }

    default: {
      const _exhaustive: never = view;
      return <NotMigrated label={`Unknown view: ${(_exhaustive as { name: string }).name}`} />;
    }
  }
}

/** Deep link to a surface the current account may not open — bounce home. */
function MenuRedirect({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    onDone();
  }, [onDone]);
  return null;
}

function NotMigrated({ label }: { label: string }) {
  return (
    <Page title={label}>
      <div className="py-10 text-center text-sm text-muted-foreground">{label}</div>
    </Page>
  );
}

// ── Settings sub-view wrappers ──

interface BackProp { onBack?: () => void }

/** Wraps Restaurant draft state and invalidates ["restaurant"] cache on every
 *  setRestaurant call so Shell's RestaurantProvider re-renders with fresh
 *  server data after any settings save. */
function useRestaurantDraft(): [UIRestaurant, React.Dispatch<React.SetStateAction<UIRestaurant>>] {
  const restaurant = useRestaurant();
  const qc = useQueryClient();
  const [r, setR] = useState<UIRestaurant>(restaurant);
  const setAndInvalidate: React.Dispatch<React.SetStateAction<UIRestaurant>> = (updater) => {
    setR(updater);
    void qc.invalidateQueries({ queryKey: ["restaurant"] });
  };
  return [r, setAndInvalidate];
}

function SettingsContactsWrapper({ onBack }: BackProp) {
  const [r, setR] = useRestaurantDraft();
  return <ContactsSettingsPage restaurant={r} setRestaurant={setR} onBack={onBack} />;
}
function SettingsBrandingWrapper({ onBack }: BackProp) {
  const [r, setR] = useRestaurantDraft();
  return <BrandingSettingsPage restaurant={r} setRestaurant={setR} onBack={onBack} />;
}
function SettingsGeneralWrapper({ onBack }: BackProp) {
  const [r, setR] = useRestaurantDraft();
  return <GeneralSettingsPage restaurant={r} setRestaurant={setR} onBack={onBack} />;
}
function SettingsOrdersWrapper({ onBack }: BackProp) {
  const [r, setR] = useRestaurantDraft();
  return <OrderSettingsPage restaurant={r} setRestaurant={setR} onBack={onBack} />;
}
function SettingsBookingsWrapper({ onBack }: BackProp) {
  const [r, setR] = useRestaurantDraft();
  return <BookingSettingsPage restaurant={r} setRestaurant={setR} onBack={onBack} />;
}
function SettingsLanguagesWrapper({ onBack }: BackProp) {
  const [r, setR] = useRestaurantDraft();
  return <LanguagesSettingsPage restaurant={r} setRestaurant={setR} onBack={onBack} />;
}
function SettingsBillingWrapper({ onBack }: BackProp) {
  return <BillingSettingsPage onBack={onBack} />;
}
function SettingsSupportWrapper({ onBack }: BackProp) {
  return <SupportPage onBack={onBack} />;
}
