"use client";

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
  CheckCircle2,
  Circle,
} from "lucide-react";
import { MenuPreviewModal } from "@/components/menu-preview-modal";

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

interface DashboardHomeProps {
  slug: string | null;
  isAdmin: boolean;
  checklist: ChecklistStatus;
}

export function DashboardHome({ slug, isAdmin, checklist }: DashboardHomeProps) {
  const tPages = useTranslations("dashboard.pages");
  const tDashboard = useTranslations("dashboard");
  const tHome = useTranslations("dashboard.home");
  const { translations } = useDashboard();
  const router = useRouter();

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const allDone = completedCount === 5;

  return (
    <div className="flex flex-col h-full">
      <header className="shrink-0 shadow-sm px-6">
        <div className="flex items-center py-3 max-w-lg mx-auto">
          <div className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl">
            <Home className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold flex-1 ml-3">{translations.pages.home}</h1>
          <button
            onClick={() => router.push(PAGE_PATHS.support)}
            className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-auto px-6 pt-6 pb-6">
        <div className="w-full max-w-lg mx-auto">
          <div className="grid gap-6">
            {slug && (
              <MenuPreviewModal menuUrl={`/m/${slug}`}>
                <Button variant="destructive" className="w-full h-10 rounded-xl shadow-md">
                  <Eye className="h-4 w-4" />
                  {tHome("viewMenu")}
                </Button>
              </MenuPreviewModal>
            )}

            {/* Success banner or setup checklist */}
            {allDone && (
              <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <p className="text-sm font-medium">{tHome("menuReady")}</p>
              </div>
            )}
            {!allDone && (
              <div className="grid gap-6">
                <div>
                  <p className="text-sm font-semibold mb-2">
                    {tHome("getReady")} ({completedCount}/5)
                  </p>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all duration-500"
                      style={{ width: `${(completedCount / 5) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                {checklistKeys.map((item) => {
                  const done = checklist[item.key];
                  const isNext = !done && !checklistKeys.some((prev) => prev.key !== item.key && !checklist[prev.key] && checklistKeys.indexOf(prev) < checklistKeys.indexOf(item));
                  return (
                    <button
                      key={item.key}
                      onClick={() => !done && router.push(item.path)}
                      disabled={done}
                      className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                        done
                          ? "bg-card opacity-60"
                          : isNext
                            ? "bg-green-500/10 border-green-500/30 hover:bg-green-500/15"
                            : "bg-card hover:bg-accent"
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
              </div>
            )}

            {/* All sections grid */}
            <div className="grid grid-cols-3 gap-2">
              {allSections.map((item) => (
                <button
                  key={item.key}
                  onClick={() => router.push(PAGE_PATHS[item.page])}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <item.icon className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm font-medium text-center leading-tight">{tPages(item.page)}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => { window.location.href = "/api/auth/logout"; }}
              className="flex items-center justify-center gap-2 w-full p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{tDashboard("logout")}</span>
            </button>

            {/* Admin shortcuts */}
            {isAdmin && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => router.push("/dashboard/admin")}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <Shield className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm font-medium text-center leading-tight">Companies</span>
                </button>
                <button
                  onClick={() => router.push("/dashboard/admin/analytics")}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <Activity className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm font-medium text-center leading-tight">Analytics</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
