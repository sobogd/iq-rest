"use client";

import {
  UtensilsCrossed,
  Palette,
  Phone,
  Languages,
  QrCode,
  BarChart3,
  Armchair,
  CalendarDays,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/Logo";
import { useDashboard, PAGE_PATHS, getPageKeyFromPathname, type PageKey } from "../_context/dashboard-context";
import { Link, usePathname } from "@/i18n/routing";
import { track, DashboardEvent } from "@/lib/dashboard-events";

const navItems: { page: PageKey; icon: React.ComponentType<{ className?: string }> }[] = [
  { page: "menu", icon: UtensilsCrossed },
  { page: "design", icon: Palette },
  { page: "contacts", icon: Phone },
  { page: "settings", icon: Languages },
  { page: "qrMenu", icon: QrCode },
  { page: "analytics", icon: BarChart3 },
  { page: "tables", icon: Armchair },
  { page: "reservations", icon: CalendarDays },
  { page: "billing", icon: CreditCard },
  { page: "support", icon: HelpCircle },
];

const navEventMap: Record<string, DashboardEvent> = {
  design: DashboardEvent.CLICKED_NAV_DESIGN,
  contacts: DashboardEvent.CLICKED_NAV_CONTACTS,
  settings: DashboardEvent.CLICKED_NAV_SETTINGS,
  qrMenu: DashboardEvent.CLICKED_NAV_QR,
  analytics: DashboardEvent.CLICKED_NAV_ANALYTICS,
  tables: DashboardEvent.CLICKED_NAV_TABLES,
  reservations: DashboardEvent.CLICKED_NAV_RESERVATIONS,
  billing: DashboardEvent.CLICKED_NAV_BILLING,
  support: DashboardEvent.CLICKED_NAV_SUPPORT,
};

export function DashboardNavHeader() {
  return (
    <div className="hidden md:flex md:items-center md:w-56 md:shrink-0">
      <Logo height={22} />
    </div>
  );
}

export function DashboardNavSidebar() {
  const { translations, scanUsage } = useDashboard();
  const pathname = usePathname();
  const tHome = useTranslations("dashboard.home");
  const activePage = getPageKeyFromPathname(pathname);
  // categories, items, orders are sub-pages of menu
  const activeNavPage = (["categories", "items", "orders"] as PageKey[]).includes(activePage) ? "menu" : activePage;

  return (
    <nav className="hidden md:block md:w-56 md:shrink-0 md:sticky md:top-0 md:self-start">
      <div className="rounded-md border border-border bg-muted/50 overflow-hidden">
        {navItems.map(({ page, icon: Icon }) => {
          const isActive = activeNavPage === page;
          return (
            <Link
              key={page}
              href={PAGE_PATHS[page]}
              onClick={() => { if (navEventMap[page]) track(navEventMap[page]); }}
              className={`flex items-center gap-3 w-full h-12 px-4 transition-colors ${
                isActive ? "bg-primary/10" : "hover:bg-muted/30"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-medium ${isActive ? "text-primary" : ""}`}>{translations.pages[page]}</span>
            </Link>
          );
        })}
        {scanUsage && (
          <Link href={PAGE_PATHS.billing} onClick={() => track(DashboardEvent.CLICKED_NAV_SCANS)} className="flex items-center justify-between w-full h-12 px-4 border-t border-border transition-colors hover:bg-muted/30">
            <span className="text-sm font-medium">{tHome("scansTitle")}:</span>
            <span className="text-sm text-muted-foreground">
              {scanUsage.limit
                ? `${scanUsage.used.toLocaleString()} / ${scanUsage.limit.toLocaleString()}`
                : scanUsage.used.toLocaleString()}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
