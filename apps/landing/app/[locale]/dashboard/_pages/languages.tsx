"use client";

import { useEffect, useState } from "react";
import { Star, Loader2, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { PageLoader } from "../_ui/page-loader";
import { useTranslations } from "next-intl";
import { LANGUAGE_NAMES } from "../_lib/constants";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import type { SubscriptionStatus } from "@prisma/client";
import type { PlanType } from "@/lib/stripe-config";

const ALL_LANGUAGES = [
  "en", "es", "de", "fr", "it", "pt", "nl", "pl", "ru", "uk",
  "sv", "da", "no", "fi", "cs", "el", "tr", "ro", "hu", "bg",
  "hr", "sk", "sl", "et", "lv", "lt",
].map((code) => ({
  code,
  name: LANGUAGE_NAMES[code] || code,
}));

export function LanguagesPage() {
  const t = useTranslations("dashboard.languages");
  const { translations, returnToOnboarding } = useDashboard();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>(["en"]);
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pendingDisable, setPendingDisable] = useState<string | null>(null);
  const [hasRestaurant, setHasRestaurant] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("INACTIVE");
  const [currentPlan, setCurrentPlan] = useState<PlanType>("FREE");

  // Language limits by plan: FREE=2, BASIC=6, PRO=unlimited
  const getLanguageLimit = () => {
    if (subscriptionStatus !== "ACTIVE") return 2;
    if (currentPlan === "PRO") return Infinity;
    if (currentPlan === "BASIC") return 6;
    return 2;
  };

  const languageLimit = getLanguageLimit();
  const isAtLimit = languages.length >= languageLimit;

  useEffect(() => {
    fetchLanguages();
    fetchSubscriptionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchLanguages() {
    try {
      const res = await fetch("/api/restaurant");
      if (res.ok) {
        const data = await res.json();
        if (data && data.title) {
          setHasRestaurant(true);
          setLanguages(data.languages || ["en"]);
          setDefaultLanguage(data.defaultLanguage || "en");
        } else {
          setHasRestaurant(false);
        }
      } else {
        setHasRestaurant(false);
      }
    } catch (error) {
      console.error("Failed to fetch languages:", error);
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubscriptionStatus() {
    try {
      const response = await fetch("/api/subscription/status");
      if (response.ok) {
        const data = await response.json();
        setSubscriptionStatus(data.subscriptionStatus);
        setCurrentPlan(data.plan);
      }
    } catch (error) {
      console.error("Failed to fetch subscription status:", error);
    }
  }

  async function handleToggleLanguage(langCode: string, enabled: boolean) {
    if (enabled) {
      setSaving(langCode);
      const newLangs = [...languages, langCode];
      setLanguages(newLangs);

      try {
        await saveLanguages(newLangs, defaultLanguage);
        toast.success(t("languageEnabled", { language: LANGUAGE_NAMES[langCode] || langCode }));

        returnToOnboarding();
      } catch {
        setLanguages(languages);
        toast.error(t("enableError"));
      } finally {
        setSaving(null);
      }
    } else {
      if (langCode === defaultLanguage) {
        toast.error(t("cannotDisableDefault"));
        return;
      }
      if (languages.length <= 1) {
        toast.error(t("atLeastOneRequired"));
        return;
      }
      setPendingDisable(langCode);
      setShowDeleteDialog(true);
    }
  }

  async function confirmDisableLanguage() {
    if (!pendingDisable) return;

    setSaving(pendingDisable);
    const langCode = pendingDisable;
    const newLangs = languages.filter((l) => l !== langCode);
    setLanguages(newLangs);

    setShowDeleteDialog(false);
    setPendingDisable(null);

    try {
      await saveLanguages(newLangs, defaultLanguage);
      await fetch(`/api/translations?language=${langCode}`, { method: "DELETE" });
      toast.success(t("languageDisabled", { language: LANGUAGE_NAMES[langCode] || langCode }));

    } catch {
      setLanguages(languages);
      toast.error(t("disableError"));
    } finally {
      setSaving(null);
    }
  }

  async function handleSetDefault(langCode: string) {
    if (langCode === defaultLanguage) return;
    if (!languages.includes(langCode)) {
      toast.error(t("enableFirst"));
      return;
    }

    setSaving(langCode);
    const prevDefault = defaultLanguage;
    setDefaultLanguage(langCode);

    try {
      await saveLanguages(languages, langCode);
      toast.success(t("defaultSet", { language: LANGUAGE_NAMES[langCode] || langCode }));

    } catch {
      setDefaultLanguage(prevDefault);
      toast.error(t("defaultError"));
    } finally {
      setSaving(null);
    }
  }

  async function saveLanguages(langs: string[], defLang: string) {
    const res = await fetch("/api/restaurant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ languages: langs, defaultLanguage: defLang }),
    });
    if (!res.ok) throw new Error("Failed to save");
  }

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.languages} />
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-6">
        {!hasRestaurant && (
          <div className="rounded-xl border border-amber-500/50 bg-amber-500/10 p-4">
            <div className="flex gap-3 md:gap-4 md:items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 md:mt-0" />
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6">
                <p className="text-sm">
                  {t("createRestaurantFirst")}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-500/50 hover:bg-amber-500/10 self-end md:self-auto shrink-0"
                  onClick={() => router.push("/dashboard/settings")}
                >
                  {t("goToSettings")}
                </Button>
              </div>
            </div>
          </div>
        )}

        {isAtLimit && languageLimit !== Infinity && (
          <div className="rounded-xl border border-amber-500/50 bg-amber-500/10 p-4">
            <div className="flex gap-3 md:gap-4 md:items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 md:mt-0" />
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6">
                <p className="text-sm">
                  {t("limitReached", { limit: languageLimit })}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-500/50 hover:bg-amber-500/10 self-end md:self-auto shrink-0"
                  onClick={() => router.push("/dashboard/billing")}
                >
                  {t("upgrade")}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className={`space-y-2 ${!hasRestaurant ? "opacity-50 pointer-events-none" : ""}`}>
          {ALL_LANGUAGES.map((lang) => {
            const isEnabled = languages.includes(lang.code);
            const isDefault = defaultLanguage === lang.code;
            const isSaving = saving === lang.code;
            const isDisabledByLimit = !isEnabled && isAtLimit;

            return (
              <div
                key={lang.code}
                className={`flex items-center justify-between h-14 px-4 bg-muted/30 rounded-xl ${isDisabledByLimit ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleToggleLanguage(lang.code, checked)}
                    disabled={isSaving || (isDefault && isEnabled) || isDisabledByLimit}
                  />
                  <span className="text-sm font-medium truncate">{lang.name}</span>
                </div>

                <button
                  onClick={() => handleSetDefault(lang.code)}
                  disabled={isSaving || !isEnabled}
                  className={`p-1.5 rounded-md transition-colors ${
                    isDefault
                      ? "text-yellow-500"
                      : isEnabled
                        ? "text-muted-foreground hover:text-yellow-500"
                        : "text-muted-foreground/30 cursor-not-allowed"
                  }`}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Star className={`h-4 w-4 ${isDefault ? "fill-current" : ""}`} />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          {t("hint")}
        </p>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pendingDisable ? (LANGUAGE_NAMES[pendingDisable] || pendingDisable) : ""}
            </DialogTitle>
            <DialogDescription>
              {t("deleteConfirm")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {t("cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmDisableLanguage}>
              {t("confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
