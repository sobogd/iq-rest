"use client";

import { useState, useMemo, useEffect } from "react";
import { Loader2, Star, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslations, useLocale } from "next-intl";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { LANGUAGE_NAMES } from "../_lib/constants";
import { useRouter } from "@/i18n/routing";
import type { SubscriptionStatus } from "@prisma/client";
import type { PlanType } from "@/lib/stripe-config";

const ALL_LANGUAGES = [
  "en", "es", "de", "fr", "it", "pt", "nl", "pl", "ru", "uk",
  "sv", "da", "no", "fi", "cs", "el", "tr", "ro", "hu", "bg",
  "hr", "sk", "sl", "et", "lv", "lt", "sr", "ca", "ga", "is",
  "fa", "ar", "ja", "ko", "zh",
].map((code) => ({
  code,
  name: LANGUAGE_NAMES[code] || code,
}));


interface SettingsPageProps {
  initialRestaurant: {
    id: string;
    languages: string[];
    defaultLanguage: string;
  } | null;
  initialSubscription: {
    plan: PlanType;
    subscriptionStatus: SubscriptionStatus;
  } | null;
}

export function SettingsPage({ initialRestaurant, initialSubscription }: SettingsPageProps) {
  const t = useTranslations("dashboard.general");
  const tLang = useTranslations("dashboard.languages");
  const locale = useLocale();
  const { translations } = useDashboard();
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const initLangs = initialRestaurant?.languages || ["en"];
  const initDefLang = initialRestaurant?.defaultLanguage || "en";

  const [validationError, setValidationError] = useState<string | null>(null);

  // Languages state
  const [languages, setLanguages] = useState<string[]>(initLangs);
  const [defaultLanguage, setDefaultLanguage] = useState(initDefLang);
  const [originalLanguages, setOriginalLanguages] = useState<string[]>(initLangs);
  const [originalDefaultLanguage, setOriginalDefaultLanguage] = useState(initDefLang);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pendingDisable, setPendingDisable] = useState<string | null>(null);
  const subscriptionStatus = initialSubscription?.subscriptionStatus ?? "INACTIVE";
  const currentPlan = initialSubscription?.plan ?? "FREE";

  const getLanguageLimit = () => {
    if (subscriptionStatus !== "ACTIVE") return 2;
    if (currentPlan === "PRO") return Infinity;
    if (currentPlan === "BASIC") return 6;
    return 2;
  };

  const languageLimit = getLanguageLimit();
  const isAtLimit = languages.length >= languageLimit;

  useEffect(() => {
    track(DashboardEvent.SHOWED_SETTINGS);
  }, []);

  const hasChanges = useMemo(() => {
    const langsSorted = [...languages].sort().join(",");
    const origLangsSorted = [...originalLanguages].sort().join(",");
    return (
      langsSorted !== origLangsSorted ||
      defaultLanguage !== originalDefaultLanguage
    );
  }, [languages, defaultLanguage, originalLanguages, originalDefaultLanguage]);

  // Languages handlers (local state only, saved on form submit)
  function handleToggleLanguage(langCode: string, enabled: boolean) {
    if (enabled) {
      setLanguages((prev) => [...prev, langCode]);
    } else {
      if (langCode === defaultLanguage) {
        track(DashboardEvent.ERROR_VALIDATION, { page: "settings", field: "language_default" });
        toast.error(tLang("cannotDisableDefault"));
        return;
      }
      if (languages.length <= 1) {
        track(DashboardEvent.ERROR_VALIDATION, { page: "settings", field: "language_minimum" });
        toast.error(tLang("atLeastOneRequired"));
        return;
      }
      setPendingDisable(langCode);
      setShowDeleteDialog(true);
    }
  }

  function confirmDisableLanguage() {
    if (!pendingDisable) return;
    setLanguages((prev) => prev.filter((l) => l !== pendingDisable));
    setShowDeleteDialog(false);
    setPendingDisable(null);
  }

  function handleSetDefault(langCode: string) {
    if (langCode === defaultLanguage) return;
    if (!languages.includes(langCode)) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "settings", field: "language_not_enabled" });
      toast.error(tLang("enableFirst"));
      return;
    }
    setDefaultLanguage(langCode);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          languages,
          defaultLanguage,
        }),
      });

      if (res.ok) {
        // Delete translations for removed languages
        const removedLangs = originalLanguages.filter((l) => !languages.includes(l));
        await Promise.all(
          removedLangs.map((lang) =>
            fetch(`/api/translations?language=${lang}`, { method: "DELETE" })
          )
        );

        track(DashboardEvent.CLICKED_SAVE_SETTINGS);
        toast.success(t("saved"));
        window.location.href = `/${locale}/dashboard`;
        return;
      } else {
        const data = await res.json();
        track(DashboardEvent.ERROR_SAVE, { page: "settings" });
        toast.error(data.error || t("saveError"));
      }
    } catch {
      track(DashboardEvent.ERROR_SAVE, { page: "settings" });
      toast.error(t("saveError"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="sticky top-0 z-10 bg-background">
        <PageHeader title={translations.pages.settings}>
          <Button
            type="submit"
            form="settings-form"
            disabled={saving || !hasChanges}
            variant="default"
            size="sm"
            className={!hasChanges ? "opacity-40" : ""}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("save")}
          </Button>
        </PageHeader>
      </div>
      <form id="settings-form" onSubmit={handleSubmit} className="px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="space-y-4">

        {/* Languages section */}
        <div className="space-y-4">
          {isAtLimit && languageLimit !== Infinity && (
            <div className="rounded-xl border border-amber-500/50 bg-amber-500/10 p-4">
              <div className="flex gap-3 md:gap-4 md:items-center">
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 md:mt-0" />
                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6">
                  <p className="text-sm">
                    {tLang("limitReached", { limit: languageLimit })}
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="border-amber-500/50 hover:bg-amber-500/10 self-end md:self-auto shrink-0"
                    onClick={() => router.push("/dashboard/billing")}
                  >
                    {tLang("upgrade")}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {(() => {
              return (
                <>
                  {ALL_LANGUAGES.map((lang) => {
                    const isEnabled = languages.includes(lang.code);
                    const isDefault = defaultLanguage === lang.code;
                    const isDisabledByLimit = !isEnabled && isAtLimit;

                    return (
                      <div
                        key={lang.code}
                        className={`flex items-center justify-between h-14 px-4 bg-muted/30 rounded-xl ${isDisabledByLimit ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Switch
                            checked={isEnabled}
                            onCheckedChange={(checked) => { track(DashboardEvent.TOGGLED_LANGUAGE); handleToggleLanguage(lang.code, checked); }}
                            disabled={(isDefault && isEnabled) || isDisabledByLimit}
                          />
                          <span className="text-sm font-medium truncate">{lang.name}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => { track(DashboardEvent.CLICKED_SET_DEFAULT_LANGUAGE); handleSetDefault(lang.code); }}
                          disabled={!isEnabled}
                          className={`p-1.5 rounded-md transition-colors ${
                            isDefault
                              ? "text-yellow-500"
                              : isEnabled
                                ? "text-muted-foreground hover:text-yellow-500"
                                : "text-muted-foreground/30 cursor-not-allowed"
                          }`}
                        >
                          <Star className={`h-4 w-4 ${isDefault ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    );
                  })}
                </>
              );
            })()}
          </div>

          <p className="text-xs text-muted-foreground">
            {tLang("hint")}
          </p>
        </div>
          </div>
        </div>
      </form>

      <AlertDialog open={!!validationError} onOpenChange={() => setValidationError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("validationErrorTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{validationError}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setValidationError(null)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pendingDisable ? (LANGUAGE_NAMES[pendingDisable] || pendingDisable) : ""}
            </DialogTitle>
            <DialogDescription>
              {tLang("deleteConfirm")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {tLang("cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmDisableLanguage}>
              {tLang("confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
