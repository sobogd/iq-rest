"use client";

import {
  UtensilsCrossed,
  Palette,
  Phone,
  Languages,
  QrCode,
  Armchair,
  CalendarDays,
  CreditCard,
  HelpCircle,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useLocale } from "next-intl";
import { Logo } from "@/components/Logo";
import { useDashboard, PAGE_PATHS, getPageKeyFromPathname, type PageKey } from "../_context/dashboard-context";
import { Link, usePathname } from "@/i18n/routing";
import { track, DashboardEvent } from "@/lib/dashboard-events";

const navItems: { page: PageKey; icon: React.ComponentType<{ className?: string }> }[] = [
  { page: "menu", icon: UtensilsCrossed },
  { page: "orders", icon: ShoppingBag },
  { page: "reservations", icon: CalendarDays },
  { page: "design", icon: Palette },
  { page: "contacts", icon: Phone },
  { page: "settings", icon: Languages },
  { page: "qrMenu", icon: QrCode },
  { page: "tables", icon: Armchair },
  { page: "billing", icon: CreditCard },
  { page: "support", icon: HelpCircle },
];

const SWITCH_LABELS: Record<string, string> = {
  en: "Try new dashboard",
  es: "Probar nuevo panel",
  ru: "Новый дашборд",
  de: "Neues Dashboard",
  fr: "Nouveau tableau de bord",
  it: "Nuova dashboard",
  pt: "Novo painel",
  pl: "Nowy panel",
};

const navEventMap: Record<string, DashboardEvent> = {
  orders: DashboardEvent.CLICKED_NAV_ORDERS,
  design: DashboardEvent.CLICKED_NAV_DESIGN,
  contacts: DashboardEvent.CLICKED_NAV_CONTACTS,
  settings: DashboardEvent.CLICKED_NAV_SETTINGS,
  qrMenu: DashboardEvent.CLICKED_NAV_QR,
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

export function DashboardNavItems({ activePage, excludePages, onNavigate }: {
  activePage?: PageKey;
  excludePages?: PageKey[];
  onNavigate?: () => void;
}) {
  const { translations } = useDashboard();
  const locale = useLocale();
  const switchLabel = SWITCH_LABELS[locale] || SWITCH_LABELS.en;

  const filtered = excludePages
    ? navItems.filter(item => !excludePages.includes(item.page))
    : navItems;

  return (
    <>
      <a
        href={`https://dashboard.iq-rest.com/${locale}`}
        onClick={() => {
          track(DashboardEvent.CLICKED_SWITCH_TO_NEW_DASHBOARD);
          onNavigate?.();
        }}
        className="flex items-center gap-3 w-full h-11 px-4 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 border-b border-emerald-500/20"
      >
        <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-emerald-500">
          <Sparkles className="h-4 w-4 shrink-0 text-white" />
        </div>
        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          {switchLabel}
        </span>
      </a>
      {filtered.map(({ page, icon: Icon }, index) => {
        const isActive = activePage === page;
        return (
          <Link
            key={page}
            href={PAGE_PATHS[page]}
            onClick={() => {
              if (navEventMap[page]) track(navEventMap[page]);
              onNavigate?.();
            }}
            className={`flex items-center gap-3 w-full h-11 px-4 transition-colors ${
              index > 0 ? "border-t border-border/50" : ""
            } ${isActive ? "bg-primary/10" : "hover:bg-muted/50"}`}
          >
            <div
              className="flex items-center justify-center h-7 w-7 rounded-lg"
              style={isActive ? { background: "linear-gradient(to bottom right, hsl(9,100%,58%), #f59e0b)" } : undefined}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-muted-foreground"}`} />
            </div>
            <span className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
              {translations.pages[page]}
            </span>
          </Link>
        );
      })}
    </>
  );
}

export function DashboardNavSidebar() {
  const pathname = usePathname();
  const activePage = getPageKeyFromPathname(pathname);
  const activeNavPage = (["categories", "items"] as PageKey[]).includes(activePage) ? "menu" : activePage;

  return (
    <nav className="hidden md:block md:w-56 md:shrink-0 md:sticky md:top-0 md:self-start">
      <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
        <DashboardNavItems activePage={activeNavPage} />
      </div>
    </nav>
  );
}
