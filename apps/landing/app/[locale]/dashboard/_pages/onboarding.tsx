"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboard, PAGE_PATHS, type PageKey } from "../_context/dashboard-context";
import { useRouter } from "@/i18n/routing";
import {
  Eye,
  Loader2,
  ArrowRight,
  QrCode,
  Palette,
  Phone,
  Languages,
  LogOut,
  FolderOpen,
  Package,
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
import { toast } from "sonner";
import { onboarding as onboardingAnalytics } from "@/lib/analytics";

interface OnboardingProgress {
  hasInfo: boolean;
  hasCategories: boolean;
  hasItems: boolean;
}

interface OnboardingData {
  progress: OnboardingProgress;
  requiredCompleted: boolean;
  slug: string | null;
}

type StepKey = "info" | "categories" | "items";

interface Step {
  key: StepKey;
  progressKey: keyof OnboardingProgress;
  page: PageKey;
}

const allSteps: Step[] = [
  { key: "info", progressKey: "hasInfo", page: "settings" },
  { key: "categories", progressKey: "hasCategories", page: "categories" },
  { key: "items", progressKey: "hasItems", page: "items" },
];

interface NavItem {
  key: string;
  page: PageKey;
  icon: React.ComponentType<{ className?: string }>;
}

// Priority actions — drive conversion
const prioritySteps: NavItem[] = [
  { key: "contacts", page: "contacts", icon: Phone },
  { key: "design", page: "design", icon: Palette },
  { key: "qrMenu", page: "qrMenu", icon: QrCode },
];

// All remaining sections
const allSections: NavItem[] = [
  { key: "categories", page: "categories", icon: FolderOpen },
  { key: "items", page: "items", icon: Package },
  { key: "settings", page: "settings", icon: Cog },
  { key: "languages", page: "languages", icon: Languages },
  { key: "analytics", page: "analytics", icon: BarChart3 },
  { key: "tables", page: "tables", icon: Armchair },
  { key: "reservations", page: "reservations", icon: CalendarDays },
  { key: "billing", page: "billing", icon: CreditCard },
  { key: "support", page: "support", icon: HelpCircle },
];

export function OnboardingPage() {
  const t = useTranslations("dashboard.onboarding");
  const tPages = useTranslations("dashboard.pages");
  const tDashboard = useTranslations("dashboard");
  const { setOnboardingCompleted } = useDashboard();
  const router = useRouter();
  const [data, setData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [restaurantName, setRestaurantName] = useState("");
  const [creating, setCreating] = useState(false);
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
    async function fetchProgress() {
      try {
        const response = await fetch("/api/onboarding/progress");
        if (response.ok) {
          const result = await response.json();
          setData(result);

          // Find first incomplete step
          const firstIncomplete = allSteps.findIndex(
            step => !result.progress[step.progressKey]
          );
          if (firstIncomplete !== -1) {
            setCurrentStep(firstIncomplete);
            // Track initial step view
            onboardingAnalytics.stepView(firstIncomplete + 1);
          } else if (result.requiredCompleted) {
            // Track completed onboarding view
            onboardingAnalytics.complete();
            setOnboardingCompleted(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch onboarding progress:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, []);

  function navigateFromOnboarding(page: PageKey) {
    sessionStorage.setItem("returnToOnboarding", "true");
    if (page === "categories" || page === "items") {
      sessionStorage.setItem("openFormOnNavigate", "true");
    }
    router.push(PAGE_PATHS[page]);
  }

  const handleStepClick = (_step: StepKey, page: PageKey) => {
    onboardingAnalytics.stepContinue(currentStep + 1);
    navigateFromOnboarding(page);
  };

  const handleCreateRestaurant = async () => {
    if (!restaurantName.trim()) {
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: restaurantName.trim() }),
      });

      if (res.ok) {
        const result = await res.json();
        // Track continue click for step 1
        onboardingAnalytics.stepContinue(1);
        // Update local data to reflect restaurant was created
        setData((prev) =>
          prev
            ? {
                ...prev,
                progress: { ...prev.progress, hasInfo: true },
                slug: result.slug,
              }
            : prev
        );
        // Move to next step and track view
        setCurrentStep(1);
        onboardingAnalytics.stepView(2);
      } else {
        const error = await res.json();
        toast.error(error.error || t("createError"));
      }
    } catch {
      toast.error(t("createError"));
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { progress, slug } = data;
  const step = allSteps[currentStep];
  const isCompleted = progress[step.progressKey];
  const completedCount = allSteps.filter(s => progress[s.progressKey]).length;
  const allCompleted = completedCount === allSteps.length;

  // Show completed view when all steps are done
  if (allCompleted && slug) {
    return (
      <div className="flex h-full flex-col p-6 overflow-auto">
        <div className="w-full max-w-lg mx-auto">
          <div className="grid gap-6">
            {/* Hero: status + view menu */}
            <p className="text-sm font-medium text-green-600 dark:text-green-500">{t("completedSubtitle")}</p>

            <MenuPreviewModal menuUrl={`/m/${slug}`}>
              <Button className="w-full h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg">
                <Eye className="mr-2 h-4 w-4" />
                {t("viewMenu")}
              </Button>
            </MenuPreviewModal>

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
            <div className="grid grid-cols-3 gap-2">
              {allSections.map((item) => (
                <button
                  key={item.key}
                  onClick={() => router.push(PAGE_PATHS[item.page])}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-center leading-tight">{tPages(item.page)}</span>
                </button>
              ))}
            </div>

            {/* Admin shortcuts */}
            {isAdmin && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => router.push("/dashboard/admin")}
                  className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
                >
                  <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium">Companies</span>
                </button>
                <button
                  onClick={() => router.push("/dashboard/admin/analytics")}
                  className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
                >
                  <Activity className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium">Analytics</span>
                </button>
              </div>
            )}

            {/* Logout */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => { window.location.href = "/api/auth/logout"; }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {tDashboard("logout")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center p-6">
      <div className="w-full max-w-[280px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <p className="text-sm text-muted-foreground">
              {t("stepIndicator", { current: currentStep + 1, total: allSteps.length })}
            </p>
            <h1 className="text-2xl font-bold">
              {t(`steps.${step.key}.name`)}
            </h1>
            <p className="text-muted-foreground">
              {t(`steps.${step.key}.description`)}
            </p>
          </div>

          <div className="grid gap-4">
            {step.key === "info" && !isCompleted ? (
              <>
                <Input
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder={t("restaurantNamePlaceholder")}
                  disabled={creating}
                  className="h-auto py-2 text-base lg:py-2.5 lg:text-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && restaurantName.trim()) {
                      handleCreateRestaurant();
                    }
                  }}
                />
                <Button
                  className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
                  onClick={handleCreateRestaurant}
                  disabled={!restaurantName.trim() || creating}
                >
                  {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("continue")}
                </Button>
              </>
            ) : (
              <Button
                className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
                onClick={() => handleStepClick(step.key, step.page)}
              >
                {t("continue")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
