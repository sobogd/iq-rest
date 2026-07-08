"use client";

import { useEffect, useState, ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  BarChart3,
  Building2,
  ClipboardList,
  CreditCard,
  Menu as BurgerIcon,
  Palette,
  Phone,
  Tablet,
  Utensils,
} from "lucide-react";
import {
  CalendarIcon,
  ChefHatIcon,
  ClockIcon,
  CloseIcon,
  EyeIcon,
  GlobeIcon,
  GridIcon,
  HelpCircleIcon,
  MessageIcon,
  ReceiptIcon,
  RefreshIcon,
  SettingsIcon,
  ShareIcon,
  SwapIcon,
  TrendingUpIcon,
  UsersIcon,
} from "./icons";
import { PAGE_FOOTER_SLOT_ID, PAGE_HEADER_SLOT_ID, ShareModal } from "./ui";
import { MenuPreviewModal } from "@/components/menu-preview-modal";
import { RestaurantProvider, useRestaurant } from "./restaurant-context";
import { RestaurantsProvider, useRestaurantsOrNull } from "./restaurants-context";
import { useOrdersStreamStateStore } from "./orders-sync-state";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { SubProvider, type Sub } from "./sub-context";
import type { Restaurant } from "./types";
import { track } from "@/lib/dashboard-events";
import { logout } from "./api";
import { apiUrl } from "@/lib/api";
import { landingUrl } from "@/lib/landing-url";
import { useDashboardRouter } from "../_spa/router";
import type { View } from "../_spa/types";

type IconCmp = React.ComponentType<{ size?: number; className?: string }>;

type CoreKey = "menu" | "reservations" | "orders" | "kitchen" | "analytics";

// Event names are kept identical to the old TopBar/BottomNav/settings-hub so
// the usage analytics series stay continuous across the layout change.
const SIDEBAR_NAV_EVENT: Record<CoreKey, string> = {
  menu: "dash_header_nav_menu",
  reservations: "dash_header_nav_booking",
  orders: "dash_header_nav_orders",
  kitchen: "dash_header_nav_kitchen",
  analytics: "dash_header_nav_analytics",
};

interface CoreTab {
  key: CoreKey;
  labelKey: "menu" | "reservations" | "orders" | "kitchen" | "analytics";
  view: View;
  icon: IconCmp;
}

const CORE_TABS: CoreTab[] = [
  { key: "menu", labelKey: "menu", view: { name: "menu" }, icon: Utensils },
  { key: "reservations", labelKey: "reservations", view: { name: "reservations" }, icon: CalendarIcon },
  { key: "orders", labelKey: "orders", view: { name: "orders" }, icon: ReceiptIcon },
  { key: "kitchen", labelKey: "kitchen", view: { name: "kitchen" }, icon: ChefHatIcon },
  { key: "analytics", labelKey: "analytics", view: { name: "analytics" }, icon: BarChart3 },
];

// Former settings-hub sections, flattened into first-class sidebar items.
// Labels reuse the existing dashboard.settingsHub.rows.* locale keys.
interface SettingsItem {
  key: string;
  labelKey: string;
  view: View;
  icon: IconCmp;
  event: string;
}

const SETTINGS_ITEMS: SettingsItem[] = [
  { key: "branding", labelKey: "branding", view: { name: "settings.branding" }, icon: Palette, event: "dash_settings_click_tab_brand" },
  { key: "contacts", labelKey: "contacts", view: { name: "settings.contacts" }, icon: Phone, event: "dash_settings_click_tab_contacts" },
  { key: "general", labelKey: "general", view: { name: "settings.general" }, icon: SettingsIcon, event: "dash_settings_click_tab_general" },
  { key: "tables", labelKey: "tables", view: { name: "settings.tables" }, icon: GridIcon, event: "dash_settings_click_tab_tables" },
  { key: "devices", labelKey: "devices", view: { name: "settings.devices" }, icon: Tablet, event: "dash_settings_click_tab_devices" },
  { key: "set-orders", labelKey: "orders", view: { name: "settings.orders" }, icon: ClipboardList, event: "dash_settings_click_tab_orders" },
  { key: "bookings", labelKey: "bookings", view: { name: "settings.bookings" }, icon: ClockIcon, event: "dash_settings_click_tab_bookings" },
  { key: "languages", labelKey: "languages", view: { name: "settings.languages" }, icon: GlobeIcon, event: "dash_settings_click_tab_langs" },
  { key: "billing", labelKey: "billing", view: { name: "settings.billing" }, icon: CreditCard, event: "dash_settings_click_tab_billing" },
  { key: "support", labelKey: "support", view: { name: "settings.support" }, icon: HelpCircleIcon, event: "dash_settings_click_tab_support" },
];

// Admin surface is English-only by project convention — no i18n keys here.
const ADMIN_ITEMS: { key: string; label: string; view: View; icon: IconCmp }[] = [
  { key: "admin-restaurants", label: "Restaurants", view: { name: "settings.admin.restaurants" }, icon: Building2 },
  { key: "admin-users", label: "Users", view: { name: "settings.admin.users" }, icon: UsersIcon },
  { key: "admin-usage", label: "Usage", view: { name: "settings.admin.usage" }, icon: TrendingUpIcon },
  { key: "admin-inbox", label: "Inbox", view: { name: "settings.admin.inbox" }, icon: MessageIcon },
];

function viewToNavKey(viewName: string): string {
  if (viewName === "reservations") return "reservations";
  if (viewName === "orders" || viewName.startsWith("orders.")) return "orders";
  if (viewName === "kitchen") return "kitchen";
  if (viewName === "analytics") return "analytics";
  // Bare "settings" renders Branding (the hub page is gone).
  if (viewName === "settings" || viewName === "settings.branding") return "branding";
  if (viewName === "settings.contacts") return "contacts";
  if (viewName === "settings.general") return "general";
  if (viewName.startsWith("settings.tables")) return "tables";
  if (viewName === "settings.devices") return "devices";
  if (viewName === "settings.orders") return "set-orders";
  if (viewName === "settings.bookings") return "bookings";
  if (viewName === "settings.languages") return "languages";
  if (viewName === "settings.billing") return "billing";
  if (viewName === "settings.support") return "support";
  if (viewName.startsWith("settings.restaurants")) return "restaurants";
  if (viewName.startsWith("settings.admin.restaurant")) return "admin-restaurants";
  if (viewName === "settings.admin.users") return "admin-users";
  if (viewName.startsWith("settings.admin.usage")) return "admin-usage";
  if (viewName.startsWith("settings.admin.inbox")) return "admin-inbox";
  // menu + menu-editor forms (category.*, group.*, item.*, option.*)
  return "menu";
}

export function DashboardChrome({
  restaurant,
  sub,
  isAdmin,
  impersonatedBy,
  children,
}: {
  restaurant: Restaurant;
  sub: Sub;
  isAdmin: boolean;
  impersonatedBy: string | null;
  children: ReactNode;
}) {
  // Always-on vertical scrollbar prevents layout shift on collapse/expand.
  // --topbar-h = the fixed h-14 page header; sticky sub-bars and kanban
  // height calcs read the variable.
  useEffect(() => {
    const prev = document.documentElement.style.overflowY;
    document.documentElement.style.overflowY = "scroll";
    document.documentElement.style.setProperty(
      "--topbar-h",
      "calc(3.5rem + env(safe-area-inset-top))",
    );
    return () => {
      document.documentElement.style.overflowY = prev;
    };
  }, []);

  const { view } = useDashboardRouter();
  const activeKey = viewToNavKey(view.name);
  const isAuth = view.name.startsWith("auth.");

  // Three-state so closing can play the exit animation before unmount.
  const [drawerState, setDrawerState] = useState<"closed" | "open" | "closing">("closed");
  const closeDrawer = () => setDrawerState((s) => (s === "open" ? "closing" : s));
  // Any navigation closes the mobile drawer.
  useEffect(() => {
    setDrawerState((s) => (s === "open" ? "closing" : s));
  }, [view]);

  if (isAuth) {
    // Auth renders fullscreen — no dashboard nav.
    return (
      <RestaurantsProvider>
        <RestaurantProvider restaurant={restaurant}>
          <SubProvider sub={sub}>
            <div className="min-h-dvh bg-background antialiased tracking-tight">{children}</div>
          </SubProvider>
        </RestaurantProvider>
      </RestaurantsProvider>
    );
  }

  return (
    <RestaurantsProvider>
      <RestaurantProvider restaurant={restaurant}>
        <SubProvider sub={sub}>
          <div className="min-h-dvh bg-background antialiased tracking-tight md:pl-60">
            <DesktopSidebar
              restaurant={restaurant}
              isAdmin={isAdmin}
              impersonatedBy={impersonatedBy}
              activeKey={activeKey}
            />
            {drawerState !== "closed" ? (
              <MobileDrawer
                restaurant={restaurant}
                isAdmin={isAdmin}
                impersonatedBy={impersonatedBy}
                activeKey={activeKey}
                closing={drawerState === "closing"}
                onClose={closeDrawer}
                onExited={() => setDrawerState("closed")}
              />
            ) : null}
            <PageHeaderBar activeKey={activeKey} onOpenDrawer={() => setDrawerState("open")} />
            <main className="px-4 md:px-6 pt-5 md:pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:pb-10">
              {children}
            </main>
            <PageFooterBar />
          </div>
        </SubProvider>
      </RestaurantProvider>
    </RestaurantsProvider>
  );
}

// Single source of truth for the live-sync chip. Green when SSE is open and
// nothing is in-flight, amber spinner while a query is fetching, red when
// the stream is closed / reconnecting. Tiny on purpose — it should not draw
// attention when everything is healthy.
function SyncIndicator() {
  const streamState = useOrdersStreamStateStore((s) => s.state);
  const fetching = useIsFetching({ queryKey: ["orders"] }) > 0;
  const qc = useQueryClient();
  if (streamState === "open" && !fetching) {
    return <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-label="live" title="Live" />;
  }
  if (streamState === "connecting" || fetching) {
    return (
      <button
        type="button"
        onClick={() => void qc.invalidateQueries({ queryKey: ["orders"] })}
        className="w-3 h-3 rounded-full border-2 border-amber-400 border-t-transparent animate-spin shrink-0"
        aria-label="reconnecting"
        title="Reconnecting"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => void qc.invalidateQueries({ queryKey: ["orders"] })}
      className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
      aria-label="offline"
      title="Click to refresh"
    />
  );
}

function DesktopSidebar({
  restaurant,
  isAdmin,
  impersonatedBy,
  activeKey,
}: {
  restaurant: Restaurant;
  isAdmin: boolean;
  impersonatedBy: string | null;
  activeKey: string;
}) {
  const t = useTranslations("dashboard.nav");
  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-60 flex-col bg-nav border-r border-[hsl(30,12%,15.5%)]">
      <div className="shrink-0 px-2 pt-3">
        <RestaurantCard restaurant={restaurant} />
      </div>
      <NavList activeKey={activeKey} isAdmin={isAdmin} impersonatedBy={impersonatedBy} />
    </aside>
  );
}

// Every page gets this sticky full-width header. Pages with their own header
// row (back / save / actions) portal it into the slot; pages without one show
// the section title. On mobile the burger on the left opens the drawer.
function PageHeaderBar({ activeKey, onOpenDrawer }: { activeKey: string; onOpenDrawer: () => void }) {
  const t = useTranslations("dashboard.nav");
  const tHub = useTranslations("dashboard.settingsHub");
  const tRest = useTranslations("dashboard.restaurants");

  const core = CORE_TABS.find((c) => c.key === activeKey);
  const settings = SETTINGS_ITEMS.find((s) => s.key === activeKey);
  const admin = ADMIN_ITEMS.find((a) => a.key === activeKey);
  const fallbackTitle = core
    ? t(core.labelKey)
    : settings
      ? tHub(`rows.${settings.labelKey}` as never)
      : admin
        ? admin.label
        : activeKey === "restaurants"
          ? tRest("title")
          : t("menu");

  return (
    <header
      className="page-hdr sticky top-0 z-20 bg-header/90 backdrop-blur-md border-b border-border flex items-center gap-2 px-4 md:px-6"
      style={{
        height: "calc(3.5rem + env(safe-area-inset-top))",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => {
          track("dash_side_nav_open");
          onOpenDrawer();
        }}
        className="md:hidden -ml-1 p-1.5 text-muted-foreground shrink-0"
      >
        <BurgerIcon size={20} />
      </button>
      <div id={PAGE_HEADER_SLOT_ID} className="page-hdr-slot min-w-0 flex-1 h-full flex items-center" />
      <div className="page-hdr-fallback min-w-0 flex-1 text-sm font-medium text-foreground truncate">
        {fallbackTitle}
      </div>
    </header>
  );
}

// Mobile drawer: the full sidebar at 70% viewport width, sliding in from the
// left over a dimmed backdrop.
function MobileDrawer({
  restaurant,
  isAdmin,
  impersonatedBy,
  activeKey,
  closing,
  onClose,
  onExited,
}: {
  restaurant: Restaurant;
  isAdmin: boolean;
  impersonatedBy: string | null;
  activeKey: string;
  closing: boolean;
  onClose: () => void;
  onExited: () => void;
}) {
  const t = useTranslations("dashboard.nav");
  // Fallback unmount in case animationend never fires (background tab,
  // reduced-motion). onExited is idempotent.
  useEffect(() => {
    if (!closing) return;
    const id = window.setTimeout(onExited, 300);
    return () => window.clearTimeout(id);
  }, [closing, onExited]);
  return (
    <div className="md:hidden fixed inset-0 z-40">
      <div
        className={
          "absolute inset-0 bg-black/30 backdrop-blur-sm duration-200 " +
          (closing ? "animate-out fade-out-0 fill-mode-forwards" : "animate-in fade-in-0")
        }
        onClick={onClose}
      />
      {/* Close floats in the top-right corner of the screen, over the backdrop. */}
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={
          "absolute right-1 w-10 h-10 rounded-full flex items-center justify-center text-white/90 duration-200 " +
          (closing ? "animate-out fade-out-0 fill-mode-forwards" : "animate-in fade-in-0")
        }
        style={{ top: "calc(0.5rem + env(safe-area-inset-top))" }}
      >
        <CloseIcon size={22} />
      </button>
      <div
        className={
          "absolute inset-y-0 left-0 w-[70vw] max-w-sm bg-nav border-r border-border flex flex-col duration-200 " +
          (closing ? "animate-out slide-out-to-left fill-mode-forwards" : "animate-in slide-in-from-left")
        }
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        onAnimationEnd={(e) => {
          // Unmount only after the panel's own exit animation finishes
          // (ignore bubbled animations from children).
          if (closing && e.target === e.currentTarget) onExited();
        }}
      >
        <div className="shrink-0 px-2 pt-3">
          <RestaurantCard restaurant={restaurant} onNavigate={onClose} />
        </div>
        <NavList activeKey={activeKey} isAdmin={isAdmin} impersonatedBy={impersonatedBy} onNavigate={onClose} />
      </div>
    </div>
  );
}

// Fixed bottom bar mirroring the page header: pages portal action buttons in
// via PageFooterSlot (ui.tsx). CSS in styles.css hides the whole bar while
// the slot is empty and adds the matching main bottom clearance while full.
function PageFooterBar() {
  return (
    <footer
      className="page-ftr fixed bottom-0 left-0 right-0 md:left-60 z-20 bg-header/90 backdrop-blur-md border-t border-border flex items-center px-4 md:px-6"
      style={{
        height: "calc(3.5rem + env(safe-area-inset-bottom))",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div id={PAGE_FOOTER_SLOT_ID} className="page-ftr-slot min-w-0 flex-1 h-full flex items-center" />
    </footer>
  );
}

// Restaurant name + live-sync status as a warm static card, with a separate
// square switch button on the right (same height, same background). Only that
// button navigates to the restaurants list — and only when the account can
// actually switch.
function RestaurantCard({
  restaurant,
  onNavigate,
}: {
  restaurant: Restaurant;
  onNavigate?: () => void;
}) {
  const t = useTranslations("dashboard.nav");
  const router = useDashboardRouter();
  const restaurants = useRestaurantsOrNull();
  const canSwitch = !!restaurants && restaurants.isPaid && restaurants.list.length > 0;
  const name = restaurant.name || t("untitledRestaurant");
  return (
    <div className="w-full flex items-center gap-1.5">
      <div className="flex-1 min-w-0 h-9 px-3.5 rounded-lg bg-muted flex items-center gap-2">
        <span className="min-w-0 text-sm font-medium text-foreground truncate">{name}</span>
        <SyncIndicator />
      </div>
      {canSwitch ? (
        <button
          type="button"
          aria-label="Switch restaurant"
          onClick={() => {
            router.resetTo({ name: "settings.restaurants" });
            onNavigate?.();
          }}
          className="shrink-0 w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <SwapIcon size={15} />
        </button>
      ) : null}
    </div>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-2.5 pt-4 pb-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
      {children}
    </div>
  );
}

// The flat navigation list shared by the desktop sidebar and the mobile
// drawer: preview/share actions, then the three labelled groups (main /
// settings / admin), with logout pinned to the bottom at header height.
function NavList({
  activeKey,
  isAdmin,
  impersonatedBy,
  onNavigate,
}: {
  activeKey: string;
  isAdmin: boolean;
  impersonatedBy: string | null;
  onNavigate?: () => void;
}) {
  const t = useTranslations("dashboard.nav");
  const tHub = useTranslations("dashboard.settingsHub");
  const tPrev = useTranslations("dashboard.preview");
  const router = useDashboardRouter();
  const restaurant = useRestaurant();
  const restaurants = useRestaurantsOrNull();
  // Managed-via-grant restaurants hide billing — it belongs to the owner.
  const canManageBilling = restaurants?.canManageBilling ?? true;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const menuUrl = restaurant.menuUrl;
  const fullUrl = menuUrl ? (menuUrl.startsWith("http") ? menuUrl : "https://" + menuUrl) : "";

  const settingsItems = SETTINGS_ITEMS.filter(
    (it) => it.key !== "billing" || canManageBilling,
  );

  const go = (view: View, event?: string) => {
    if (event) track(event);
    router.resetTo(view);
    onNavigate?.();
  };

  return (
    <>
      <nav className="flex-1 min-h-0 overflow-y-auto px-2 py-3">
        {menuUrl ? (
          <div className="space-y-0.5">
            <NavItem
              icon={EyeIcon}
              label={tPrev("preview")}
              accent
              onClick={() => {
                track("dash_menu_preview_open");
                setPreviewOpen(true);
              }}
            />
            <NavItem
              icon={ShareIcon}
              label={tPrev("share")}
              onClick={() => {
                track("dash_menu_share_open");
                setShareOpen(true);
              }}
            />
          </div>
        ) : null}
        <GroupLabel>{t("groupMain")}</GroupLabel>
        <div className="space-y-0.5">
          {CORE_TABS.map((tab) => (
            <NavItem
              key={tab.key}
              icon={tab.icon}
              label={t(tab.labelKey)}
              active={activeKey === tab.key}
              onClick={() => go(tab.view, SIDEBAR_NAV_EVENT[tab.key])}
            />
          ))}
        </div>
        <GroupLabel>{t("settings")}</GroupLabel>
        <div className="space-y-0.5">
          {settingsItems.map((it) => (
            <NavItem
              key={it.key}
              icon={it.icon}
              label={tHub(`rows.${it.labelKey}` as never)}
              active={activeKey === it.key}
              onClick={() => go(it.view, it.event)}
            />
          ))}
        </div>
        {isAdmin ? (
          <>
            <GroupLabel>Admin</GroupLabel>
            <div className="space-y-0.5">
              {ADMIN_ITEMS.map((it) => (
                <NavItem
                  key={it.key}
                  icon={it.icon}
                  label={it.label}
                  active={activeKey === it.key}
                  onClick={() => go(it.view)}
                />
              ))}
              <ReloadTabletsItem />
            </div>
          </>
        ) : null}
        <div className="pt-4">
          {impersonatedBy ? <ExitImpersonationItem email={impersonatedBy} /> : <LogoutItem />}
        </div>
      </nav>
      {menuUrl ? (
        <MenuPreviewModal menuUrl={fullUrl} open={previewOpen} onOpenChange={setPreviewOpen} />
      ) : null}
      {menuUrl ? (
        <ShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          url={fullUrl}
          restaurantName={restaurant.name || ""}
        />
      ) : null}
    </>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
  danger,
  accent,
}: {
  icon: IconCmp;
  label: string;
  active?: boolean;
  onClick: () => void;
  danger?: boolean;
  accent?: boolean;
}) {
  const cls = active
    ? "bg-foreground text-background"
    : danger
      ? "text-red-600 hover:bg-secondary"
      : accent
        ? "text-primary hover:bg-secondary"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary";
  return (
    <button
      type="button"
      onClick={onClick}
      className={"w-full h-9 px-2.5 rounded-lg text-sm font-medium flex items-center gap-2.5 transition-colors " + cls}
    >
      <Icon size={17} className="shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  );
}

function LogoutItem() {
  const tHub = useTranslations("dashboard.settingsHub");
  const locale = useLocale();
  const [busy, setBusy] = useState(false);
  async function handle() {
    track("dash_settings_click_logout");
    if (busy) return;
    setBusy(true);
    try {
      await logout();
      window.location.href = landingUrl(locale);
    } catch {
      setBusy(false);
    }
  }
  return (
    <NavItem
      icon={CloseIcon}
      label={busy ? tHub("loggingOut") : tHub("logout")}
      onClick={handle}
      danger
    />
  );
}

function ExitImpersonationItem({ email }: { email: string }) {
  const tHub = useTranslations("dashboard.settingsHub");
  const [busy, setBusy] = useState(false);
  async function handle() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(apiUrl("/api/admin/impersonate/exit"), {
        credentials: "include",
        method: "POST",
      });
      if (res.ok) {
        window.location.assign("/");
      } else {
        setBusy(false);
      }
    } catch {
      setBusy(false);
    }
  }
  return (
    <NavItem
      icon={CloseIcon}
      label={busy ? "…" : tHub("exitImpersonation")}
      onClick={handle}
      danger
    />
  );
}

// Admin-only action (not a navigation item): force-reload every paired tablet.
function ReloadTabletsItem() {
  const [reloading, setReloading] = useState(false);
  async function handle() {
    if (reloading) return;
    if (!window.confirm("Reload every paired tablet system-wide?")) return;
    setReloading(true);
    try {
      const res = await fetch(apiUrl(`/api/admin/devices/reload-all`), {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        alert("Failed to send reload");
        return;
      }
      const data = (await res.json()) as { devices: number; restaurants: number };
      alert(`Reload sent to ${data.devices} tablet(s) across ${data.restaurants} restaurant(s)`);
    } catch {
      alert("Network error");
    } finally {
      setReloading(false);
    }
  }
  return (
    <NavItem
      icon={RefreshIcon}
      label={reloading ? "Sending…" : "Reload tablets"}
      onClick={handle}
    />
  );
}
