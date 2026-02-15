"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useDashboard, PAGE_PATHS, type PageKey } from "../_context/dashboard-context";
import { useRouter } from "@/i18n/routing";
import {
  Eye,
  Loader2,
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
} from "lucide-react";
import { MenuPreviewModal } from "@/components/menu-preview-modal";
import { isAdminEmail } from "@/lib/admin";

interface NavItem {
  key: string;
  page: PageKey;
  icon: React.ComponentType<{ className?: string }>;
}

// Priority actions — drive conversion
const prioritySteps: NavItem[] = [
  { key: "contacts", page: "contacts", icon: Phone },
  { key: "design", page: "design", icon: Palette },
];

// All sections
const allSections: NavItem[] = [
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

export function DashboardHome() {
  const t = useTranslations("dashboard.onboarding");
  const tPages = useTranslations("dashboard.pages");
  const tDashboard = useTranslations("dashboard");
  const { translations } = useDashboard();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const emailCookie = cookies.find((c) => c.trim().startsWith("user_email="));
    if (emailCookie) {
      const email = decodeURIComponent(emailCookie.split("=")[1]);
      setIsAdmin(isAdminEmail(email));
    }
  }, []);

  useEffect(() => {
    async function fetchSlug() {
      try {
        const res = await fetch("/api/restaurant");
        if (res.ok) {
          const data = await res.json();
          setSlug(data?.slug || null);
        }
      } catch (error) {
        console.error("Failed to fetch restaurant:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSlug();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex shrink-0 items-center px-6 py-4 shadow-sm">
        <div className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl">
          <Home className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-semibold flex-1 ml-3">IQ Rest {translations.pages.home}</h1>
        <button
          onClick={() => router.push(PAGE_PATHS.support)}
          className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <div className="w-full max-w-lg mx-auto">
          <div className="grid gap-6">
            {slug && (
              <div className="grid gap-2.5">
                <MenuPreviewModal menuUrl={`/m/${slug}`}>
                  <Button className="w-full h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg">
                    <Eye className="mr-2 h-4 w-4" />
                    {t("viewMenu")}
                  </Button>
                </MenuPreviewModal>
                <p className="text-sm font-medium text-green-600 dark:text-green-500 text-center">{t("completedSubtitle")}</p>
              </div>
            )}

            {/* Priority actions */}
            <div className="grid gap-2">
              {prioritySteps.map((item) => (
                <button
                  key={item.key}
                  onClick={() => router.push(PAGE_PATHS[item.page])}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
                >
                  <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{t(`nextSteps.${item.key}.title`)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>

            {/* All sections grid */}
            <div className="grid grid-cols-2 gap-2">
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
              <button
                onClick={() => { window.location.href = "/api/auth/logout"; }}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <LogOut className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm font-medium text-center leading-tight">{tDashboard("logout")}</span>
              </button>
            </div>

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
