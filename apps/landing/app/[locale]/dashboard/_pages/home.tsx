"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useDashboard, PAGE_PATHS, type PageKey } from "../_context/dashboard-context";
import { useRouter } from "@/i18n/routing";
import {
  Eye,
  ArrowRight,
  QrCode,
  Palette,
  Phone,
  Home,
  LogOut,
  UtensilsCrossed,
  Cog,
  BarChart3,
  CalendarDays,
  Armchair,
  CreditCard,
  HelpCircle,
  Shield,
  Activity,
  Megaphone,
  MousePointerClick,
  CheckCircle2,
  Circle,
  ChevronRight,
} from "lucide-react";
import { MenuPreviewModal } from "@/components/menu-preview-modal";
import { track, DashboardEvent } from "@/lib/dashboard-events";

const allSections: { key: string; page: PageKey; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "menu", page: "menu", icon: UtensilsCrossed },
  { key: "contacts", page: "contacts", icon: Phone },
  { key: "settings", page: "settings", icon: Cog },
  { key: "design", page: "design", icon: Palette },
  { key: "qrMenu", page: "qrMenu", icon: QrCode },
  { key: "analytics", page: "analytics", icon: BarChart3 },
  { key: "tables", page: "tables", icon: Armchair },
  { key: "reservations", page: "reservations", icon: CalendarDays },
  { key: "billing", page: "billing", icon: CreditCard },
];

interface ChecklistStatus {
  nameSet: boolean;
  templateChosen: boolean;
  menuEdited: boolean;
  contactsAdded: boolean;
  brandCustomized: boolean;
}

const checklistKeys: { key: keyof ChecklistStatus; translationKey: string; path: string }[] = [
  { key: "nameSet", translationKey: "checklistName", path: PAGE_PATHS.settings },
  { key: "templateChosen", translationKey: "checklistTemplate", path: PAGE_PATHS.menu },
  { key: "menuEdited", translationKey: "checklistMenu", path: PAGE_PATHS.menu },
  { key: "contactsAdded", translationKey: "checklistContacts", path: PAGE_PATHS.contacts },
  { key: "brandCustomized", translationKey: "checklistBrand", path: PAGE_PATHS.design },
];

interface ScanUsage {
  used: number;
  limit: number | null;
}

interface DashboardHomeProps {
  slug: string | null;
  isAdmin: boolean;
  checklist: ChecklistStatus;
  scanUsage: ScanUsage | null;
}

export function DashboardHome({ slug, isAdmin, checklist, scanUsage }: DashboardHomeProps) {
  const tPages = useTranslations("dashboard.pages");
  const tDashboard = useTranslations("dashboard");
  const tHome = useTranslations("dashboard.home");
  const { translations } = useDashboard();
  const router = useRouter();

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const allDone = completedCount === 5;

  useEffect(() => {
    track(DashboardEvent.SHOWED_HOME);
  }, []);

  const checklistEventMap: Record<string, DashboardEvent> = {
    nameSet: DashboardEvent.CLICKED_CHECKLIST_NAME,
    templateChosen: DashboardEvent.CLICKED_CHECKLIST_TEMPLATE,
    menuEdited: DashboardEvent.CLICKED_CHECKLIST_MENU,
    contactsAdded: DashboardEvent.CLICKED_CHECKLIST_CONTACTS,
    brandCustomized: DashboardEvent.CLICKED_CHECKLIST_BRAND,
  };

  const navEventMap: Record<string, DashboardEvent> = {
    menu: DashboardEvent.CLICKED_NAV_MENU,
    contacts: DashboardEvent.CLICKED_NAV_CONTACTS,
    settings: DashboardEvent.CLICKED_NAV_SETTINGS,
    design: DashboardEvent.CLICKED_NAV_DESIGN,
    qrMenu: DashboardEvent.CLICKED_NAV_QR,
    analytics: DashboardEvent.CLICKED_NAV_ANALYTICS,
    tables: DashboardEvent.CLICKED_NAV_TABLES,
    reservations: DashboardEvent.CLICKED_NAV_RESERVATIONS,
    billing: DashboardEvent.CLICKED_NAV_BILLING,
  };

  return (
    <div className="flex flex-col h-full">
      <header className="shrink-0 shadow-sm px-6 bg-muted/50">
        <div className="flex items-center py-3 max-w-lg mx-auto">
          <div className="flex items-center justify-center h-10 w-10">
            <Home className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold flex-1 ml-3">{translations.pages.home}</h1>
          <button
            onClick={() => { track(DashboardEvent.CLICKED_HELP); router.push(PAGE_PATHS.support); }}
            className="flex items-center justify-center h-10 w-10"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
            {slug && (
              <MenuPreviewModal menuUrl={`/m/${slug}`}>
                <Button variant="destructive" className="w-full h-10 rounded-xl shadow-md" onClick={() => track(DashboardEvent.CLICKED_VIEW_MENU)}>
                  <Eye className="h-4 w-4" />
                  {tHome("viewMenu")}
                </Button>
              </MenuPreviewModal>
            )}

            {/* Success banner */}
            {allDone && (
              <div className="flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <p className="text-sm font-medium">{tHome("menuReady")}</p>
              </div>
            )}

            {/* Setup checklist card */}
            {!allDone && (
              <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
                <div className="px-4 py-3 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {tHome("getReady")}
                    </span>
                    <span className="text-sm text-muted-foreground">{completedCount}/5</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all duration-500"
                      style={{ width: `${(completedCount / 5) * 100}%` }}
                    />
                  </div>
                </div>
                {checklistKeys.map((item) => {
                  const done = checklist[item.key];
                  const isNext = !done && !checklistKeys.some((prev) => prev.key !== item.key && !checklist[prev.key] && checklistKeys.indexOf(prev) < checklistKeys.indexOf(item));
                  return (
                    <button
                      key={item.key}
                      onClick={() => { if (!done) { track(checklistEventMap[item.key]); router.push(item.path); } }}
                      disabled={done}
                      className={`flex items-center gap-3 w-full h-12 px-4 border-t border-foreground/5 text-left transition-colors ${
                        done
                          ? "opacity-60"
                          : isNext
                            ? "bg-green-500/5"
                            : "hover:bg-muted/30"
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      ) : (
                        <Circle className={`h-4 w-4 shrink-0 ${isNext ? "text-green-500" : "text-muted-foreground"}`} />
                      )}
                      <span className={`text-sm flex-1 ${done ? "text-muted-foreground line-through" : isNext ? "font-semibold" : "font-medium"}`}>
                        {tHome(item.translationKey)}
                      </span>
                      {!done && <ArrowRight className={`h-4 w-4 shrink-0 ${isNext ? "text-green-500" : "text-muted-foreground"}`} />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Navigation card */}
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              {allSections.map((item, index) => (
                <button
                  key={item.key}
                  onClick={() => { track(navEventMap[item.key]); router.push(PAGE_PATHS[item.page]); }}
                  className={`flex items-center gap-3 w-full h-12 px-4 hover:bg-muted/30 transition-colors ${
                    index > 0 ? "border-t border-foreground/5" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium flex-1 text-left">{tPages(item.page)}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                </button>
              ))}
            </div>

            {/* Scan usage indicator */}
            {scanUsage && scanUsage.used >= 20 && (
              <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden px-4 py-3">
                <div className={`flex items-center justify-between${scanUsage.limit ? " mb-2" : ""}`}>
                  <span className="text-sm font-medium">{tHome("scansTitle")}</span>
                  <span className="text-sm text-muted-foreground">
                    {scanUsage.limit
                      ? tHome("scansUsed", { used: scanUsage.used.toLocaleString(), limit: scanUsage.limit.toLocaleString() })
                      : tHome("scansUnlimited", { used: scanUsage.used.toLocaleString() })}
                  </span>
                </div>
                {scanUsage.limit && (
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        scanUsage.used / scanUsage.limit > 0.9 ? "bg-red-500" : "bg-primary"
                      }`}
                      style={{ width: `${Math.min((scanUsage.used / scanUsage.limit) * 100, 100)}%` }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Logout */}
            <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
              <button
                onClick={() => { track(DashboardEvent.CLICKED_LOGOUT); window.location.href = "/api/auth/logout"; }}
                className="flex items-center gap-3 w-full h-12 px-4 hover:bg-muted/30 transition-colors"
              >
                <LogOut className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium">{tDashboard("logout")}</span>
              </button>
            </div>

            {/* Admin shortcuts */}
            {isAdmin && (
              <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
                <button
                  onClick={() => router.push("/dashboard/admin")}
                  className="flex items-center gap-3 w-full h-12 px-4 hover:bg-muted/30 transition-colors"
                >
                  <Shield className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium flex-1 text-left">Companies</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                </button>
                <button
                  onClick={() => router.push("/dashboard/admin/analytics")}
                  className="flex items-center gap-3 w-full h-12 px-4 border-t border-foreground/5 hover:bg-muted/30 transition-colors"
                >
                  <Activity className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium flex-1 text-left">Analytics</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                </button>
                <button
                  onClick={() => router.push("/dashboard/sessions")}
                  className="flex items-center gap-3 w-full h-12 px-4 border-t border-foreground/5 hover:bg-muted/30 transition-colors"
                >
                  <MousePointerClick className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium flex-1 text-left">Sessions</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                </button>
                <button
                  onClick={() => router.push("/dashboard/googleads")}
                  className="flex items-center gap-3 w-full h-12 px-4 border-t border-foreground/5 hover:bg-muted/30 transition-colors"
                >
                  <Megaphone className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium flex-1 text-left">Google Ads</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
