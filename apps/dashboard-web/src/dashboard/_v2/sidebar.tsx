"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { BarChart3, SlidersHorizontal, Utensils } from "lucide-react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import {
  CalendarIcon,
  ChefHatIcon,
  CloseIcon,
  EyeIcon,
  GlobeIcon,
  GridIcon,
  HelpCircleIcon,
  LogoutIcon,
  MapPinIcon,
  MessageIcon,
  PhotoIcon,
  QrIcon,
  ReceiptIcon,
  RefreshIcon,
  ShareIcon,
  SwapIcon,
  UsersIcon,
} from "./icons";
import { navRow, navRowActive } from "./tokens";
import { apiUrl } from "@/lib/api";
import { track } from "@/lib/dashboard-events";
import { useOrdersStreamStateStore } from "./orders-sync-state";
import { useRestaurantsOrNull } from "./restaurants-context";
import { useDashboardRouter } from "../_spa/router";
import type { View } from "../_spa/types";
import { ShareModal } from "./ui";
import { MenuPreviewModal } from "@/components/menu-preview-modal";
import { LogoutButton } from "../settings/logout-link";
import { useScrollLock } from "./use-scroll-lock";
import type { Restaurant } from "./types";

// ── Mobile drawer state ──
// The page header renders the burger, the sidebar renders the drawer, so the
// open/close flag lives in a context both can reach.

interface SidebarCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<SidebarCtx>({ open: false, setOpen: () => {} });

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSidebar(): SidebarCtx {
  return useContext(Ctx);
}

// ── Nav model ──

interface NavItem {
  view: View;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  /** Human label used in the tracking event name. */
  track: string;
  /** Also mark active for these view-name prefixes. */
  match?: string[];
}

function isActive(item: NavItem, viewName: string): boolean {
  if (item.view.name === viewName) return true;
  return (item.match ?? []).some((p) => viewName === p || viewName.startsWith(p + "."));
}

export function Sidebar({
  restaurant,
  isAdmin,
  impersonatedBy,
}: {
  restaurant: Restaurant;
  isAdmin: boolean;
  impersonatedBy: string | null;
}) {
  const { open, setOpen } = useSidebar();

  // Close the drawer whenever the route changes — tapping an item navigates
  // and the overlay must not stay on top of the freshly opened page.
  const { view } = useDashboardRouter();
  useEffect(() => {
    setOpen(false);
  }, [view, setOpen]);

  // While the mobile drawer is open the page behind it must not scroll.
  useScrollLock(open);

  // Escape closes the drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      {open ? (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="md:hidden fixed top-3 left-[min(19rem,calc(100vw-3.5rem))] z-50 h-10 w-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
          >
            <CloseIcon size={20} />
          </button>
        </>
      ) : null}
      <aside
        className={
          "fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 shrink-0 flex flex-col " +
          // Same surface as the page header: nav colour at 90% over the page
          // background, blurred — so the two chrome edges read as one material.
          "bg-nav/90 backdrop-blur-md border-r border-border transition-transform md:transition-none " +
          (open ? "translate-x-0" : "-translate-x-full md:translate-x-0")
        }
      >
        <SidebarHeader restaurant={restaurant} />
        <nav
          data-scroll-pane="sidebar"
          className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 px-2 py-3"
        >
          <SidebarQuickActions restaurant={restaurant} />
          <SidebarNav isAdmin={isAdmin} impersonatedBy={impersonatedBy} viewName={view.name} />
        </nav>
        <SidebarFooter impersonatedBy={impersonatedBy} />
      </aside>
    </>
  );
}

function SidebarHeader({ restaurant }: { restaurant: Restaurant }) {
  const t = useTranslations("dashboard.nav");
  const th = useTranslations("dashboard.settingsHub");
  const router = useDashboardRouter();
  const restaurants = useRestaurantsOrNull();
  const many = (restaurants?.list.length ?? 0) > 1;

  return (
    <div className="shrink-0 flex items-center gap-1 h-14 px-2 border-b border-border">
      {/* Name truncates first so the live-sync dot stays pinned right after it,
          never drifting to the far edge of the panel. */}
      <div className="min-w-0 flex-1 flex items-center gap-2 px-3">
        <span className="min-w-0 text-base font-medium text-foreground truncate">
          {restaurant.name || t("untitledRestaurant")}
        </span>
        <SyncIndicator />
      </div>
      {/* Only the icon switches venue — the name itself is not a control. */}
      <button
        type="button"
        onClick={() => router.push({ name: "settings.restaurants" })}
        aria-label={many ? th("switcherDescMany", { count: restaurants!.list.length }) : th("switcherDescOne")}
        title={many ? th("switcherDescMany", { count: restaurants!.list.length }) : th("switcherDescOne")}
        className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
      >
        <SwapIcon size={15} />
      </button>
    </div>
  );
}

/** Preview + share the public menu — reachable from every dashboard screen,
 *  not just the menu page. */
function SidebarQuickActions({ restaurant }: { restaurant: Restaurant }) {
  const tp = useTranslations("dashboard.preview");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const menuUrl = restaurant.menuUrl;
  if (!menuUrl) return null;
  const fullUrl = menuUrl.startsWith("http") ? menuUrl : "https://" + menuUrl;
  return (
    // An unlabelled first group inside the nav scroll area — same rows, same
    // rhythm, scrolls with everything else.
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        onClick={() => {
          track("Click", "Menu preview open");
          setPreviewOpen(true);
        }}
        className={navRow + " text-primary"}
      >
        <EyeIcon size={16} className="shrink-0" />
        <span className="min-w-0 truncate">{tp("preview")}</span>
      </button>
      <button
        type="button"
        onClick={() => {
          track("Click", "Share open");
          setShareOpen(true);
        }}
        className={navRow + " text-foreground"}
      >
        <ShareIcon size={16} className="shrink-0" />
        <span className="min-w-0 truncate">{tp("share")}</span>
      </button>
      {/* Portaled to <body>: the sidebar animates with a transform, which
          would otherwise become the containing block for these fixed
          overlays and trap them inside the panel. */}
      {createPortal(
        <>
          <MenuPreviewModal menuUrl={fullUrl} open={previewOpen} onOpenChange={setPreviewOpen} />
          <ShareModal
            open={shareOpen}
            onClose={() => setShareOpen(false)}
            url={menuUrl}
            restaurantName={restaurant.name}
          />
        </>,
        document.body,
      )}
    </div>
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
      <span
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

function SidebarNav({
  isAdmin,
  impersonatedBy,
  viewName,
}: {
  isAdmin: boolean;
  impersonatedBy: string | null;
  viewName: string;
}) {
  const t = useTranslations("dashboard.nav");
  const ts = useTranslations("dashboard.settingsHub");
  const restaurants = useRestaurantsOrNull();
  const canManageBilling = restaurants?.canManageBilling ?? true;

  const main: NavItem[] = [
    { view: { name: "menu" }, label: t("menu"), icon: Utensils, track: "menu", match: ["category", "group", "item", "option"] },
    { view: { name: "reservations" }, label: t("reservations"), icon: CalendarIcon, track: "booking" },
    { view: { name: "orders" }, label: t("orders"), icon: ReceiptIcon, track: "orders", match: ["orders"] },
    { view: { name: "kitchen" }, label: t("kitchen"), icon: ChefHatIcon, track: "kitchen" },
    { view: { name: "analytics" }, label: t("analytics"), icon: BarChart3, track: "analytics" },
  ];

  const settings: NavItem[] = [
    { view: { name: "settings.branding" }, label: ts("rows.branding"), icon: GlobeIcon, track: "brand" },
    { view: { name: "settings.contacts" }, label: ts("rows.contacts"), icon: MapPinIcon, track: "contacts" },
    { view: { name: "settings.general" }, label: ts("rows.general"), icon: SlidersHorizontal, track: "general" },
    { view: { name: "settings.tables" }, label: ts("rows.tables"), icon: QrIcon, track: "tables", match: ["settings.tables"] },
    { view: { name: "settings.devices" }, label: ts("rows.devices"), icon: GridIcon, track: "devices" },
    { view: { name: "settings.orders" }, label: ts("rows.orders"), icon: ReceiptIcon, track: "orders" },
    { view: { name: "settings.bookings" }, label: ts("rows.bookings"), icon: CalendarIcon, track: "bookings" },
    { view: { name: "settings.languages" }, label: ts("rows.languages"), icon: GlobeIcon, track: "languages" },
    // "Menu texts" is an admin-only surface: shown only inside an admin
    // impersonation session (backend also 403s the save/translate endpoints).
    ...(impersonatedBy
      ? [{ view: { name: "settings.customTexts" } as View, label: ts("rows.customTexts"), icon: PhotoIcon, track: "custom texts" }]
      : []),
    // Billing belongs to the owner — hide it on grant-managed restaurants.
    ...(canManageBilling
      ? [{ view: { name: "settings.billing" } as View, label: ts("rows.billing"), icon: ReceiptIcon, track: "billing" }]
      : []),
    { view: { name: "settings.support" }, label: ts("rows.support"), icon: HelpCircleIcon, track: "support" },
  ];

  const admin: NavItem[] = [
    { view: { name: "settings.admin.restaurants" }, label: "Restaurants", icon: GridIcon, track: "admin restaurants", match: ["settings.admin.restaurant"] },
    { view: { name: "settings.admin.users" }, label: "Users", icon: UsersIcon, track: "admin users" },
    { view: { name: "settings.admin.traffic" }, label: "Traffic", icon: BarChart3, track: "admin traffic", match: ["settings.admin.trafficSession"] },
    { view: { name: "settings.admin.leads" }, label: "Leads", icon: UsersIcon, track: "admin leads" },
    { view: { name: "settings.admin.inbox" }, label: "Inbox", icon: MessageIcon, track: "admin inbox", match: ["settings.admin.inboxThread"] },
  ];

  return (
    <>
      <NavGroup title={t("groupMain")} items={main} viewName={viewName} />
      <NavGroup title={t("settings")} items={settings} viewName={viewName} />
      {isAdmin ? (
        <NavGroup title="Admin" items={admin} viewName={viewName}>
          <ReloadTabletsButton />
        </NavGroup>
      ) : null}
    </>
  );
}

function NavGroup({
  title,
  items,
  viewName,
  children,
}: {
  title: string;
  items: NavItem[];
  viewName: string;
  children?: ReactNode;
}) {
  const router = useDashboardRouter();
  return (
    <div className="flex flex-col gap-0.5">
      <div className="px-3 pb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/80">
        {title}
      </div>
      {items.map((item) => {
        const active = isActive(item, viewName);
        const Icon = item.icon;
        return (
          <button
            key={item.view.name + item.label}
            type="button"
            onClick={() => {
              track("Click", `Nav ${item.track}`);
              router.resetTo(item.view);
            }}
            className={
              active
                ? navRowActive
                : navRow + " text-foreground"
            }
          >
            <Icon size={16} className="shrink-0" />
            <span className="min-w-0 truncate">{item.label}</span>
          </button>
        );
      })}
      {children}
    </div>
  );
}

function ReloadTabletsButton() {
  const [reloading, setReloading] = useState(false);
  const reloadAllTablets = useCallback(async () => {
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
  }, [reloading]);

  return (
    <button
      type="button"
      onClick={reloadAllTablets}
      disabled={reloading}
      title="Reload every paired tablet system-wide"
      className={navRow + " text-foreground"}
    >
      <RefreshIcon size={16} className="shrink-0" />
      <span className="min-w-0 truncate">{reloading ? "Sending…" : "Reload tablets"}</span>
    </button>
  );
}

function SidebarFooter({ impersonatedBy }: { impersonatedBy: string | null }) {
  const t = useTranslations("dashboard.settingsHub");
  const [exiting, setExiting] = useState(false);

  async function handleExitImpersonation() {
    if (exiting) return;
    setExiting(true);
    try {
      const res = await fetch(apiUrl("/api/admin/impersonate/exit"), {
        credentials: "include",
        method: "POST",
      });
      if (res.ok) {
        window.location.assign("/");
      } else {
        setExiting(false);
      }
    } catch {
      setExiting(false);
    }
  }

  return (
    <div className="shrink-0 flex flex-col gap-0.5 border-t border-border px-2 py-2">
      {impersonatedBy ? (
        <button
          type="button"
          onClick={handleExitImpersonation}
          disabled={exiting}
          title={t("exitImpersonationDesc", { email: impersonatedBy })}
          className={navRow + " text-red-600"}
        >
          <LogoutIcon size={16} className="shrink-0" />
          <span className="min-w-0 truncate">{t("exitImpersonation")}</span>
        </button>
      ) : (
        <LogoutButton />
      )}
    </div>
  );
}
