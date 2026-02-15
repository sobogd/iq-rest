"use client";

import { useState, useMemo } from "react";
import { Loader2, Save, Star, AlertCircle } from "lucide-react";
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
import { FormInput } from "../_ui/form-input";
import { FormSelect } from "../_ui/form-select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { analytics } from "@/lib/analytics";
import { CURRENCIES } from "@/lib/currencies";
import { LANGUAGE_NAMES } from "../_lib/constants";
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

interface SettingsPageProps {
  initialRestaurant: {
    id: string;
    title: string;
    description: string | null;
    slug: string | null;
    currency: string;
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
  const tPages = useTranslations("dashboard.pages");
  const { translations } = useDashboard();
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const initName = initialRestaurant?.title || "";
  const initDescription = initialRestaurant?.description || "";
  const initSlug = initialRestaurant?.slug || "";
  const initCurrency = initialRestaurant?.currency || "EUR";
  const initLangs = initialRestaurant?.languages || ["en"];
  const initDefLang = initialRestaurant?.defaultLanguage || "en";

  const [name, setName] = useState(initName);
  const [description, setDescription] = useState(initDescription);
  const [slug, setSlug] = useState(initSlug);
  const [currency, setCurrency] = useState(initCurrency);

  const [originalName, setOriginalName] = useState(initName);
  const [originalDescription, setOriginalDescription] = useState(initDescription);
  const [originalSlug, setOriginalSlug] = useState(initSlug);
  const [originalCurrency, setOriginalCurrency] = useState(initCurrency);

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

  const hasChanges = useMemo(() => {
    const langsSorted = [...languages].sort().join(",");
    const origLangsSorted = [...originalLanguages].sort().join(",");
    return (
      name !== originalName ||
      description !== originalDescription ||
      slug !== originalSlug ||
      currency !== originalCurrency ||
      langsSorted !== origLangsSorted ||
      defaultLanguage !== originalDefaultLanguage
    );
  }, [name, description, slug, currency, languages, defaultLanguage, originalName, originalDescription, originalSlug, originalCurrency, originalLanguages, originalDefaultLanguage]);

  function handleSlugChange(value: string) {
    const cleanSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setSlug(cleanSlug);
  }

  // Languages handlers (local state only, saved on form submit)
  function handleToggleLanguage(langCode: string, enabled: boolean) {
    if (enabled) {
      setLanguages((prev) => [...prev, langCode]);
    } else {
      if (langCode === defaultLanguage) {
        toast.error(tLang("cannotDisableDefault"));
        return;
      }
      if (languages.length <= 1) {
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
      toast.error(tLang("enableFirst"));
      return;
    }
    setDefaultLanguage(langCode);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setValidationError(t("nameRequired"));
      return;
    }

    if (!slug.trim()) {
      setValidationError(t("slugRequired"));
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: name.trim(),
          description: description.trim() || null,
          slug: slug.trim(),
          currency,
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

        toast.success(t("saved"));
        analytics.dashboard.restaurantSaved();

        setOriginalName(name);
        setOriginalDescription(description);
        setOriginalSlug(slug);
        setOriginalCurrency(currency);
        setOriginalLanguages([...languages]);
        setOriginalDefaultLanguage(defaultLanguage);
      } else {
        const data = await res.json();
        toast.error(data.error || t("saveError"));
      }
    } catch {
      toast.error(t("saveError"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.settings} />
      <form id="settings-form" onSubmit={handleSubmit} className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">
        <div className="space-y-2">
          <FormInput
            id="name"
            label={`${t("name")}:`}
            value={name}
            onChange={setName}
            placeholder={t("namePlaceholder")}
          />
          <p className="text-xs text-muted-foreground px-1">
            {t("nameHint")}
          </p>
        </div>

        <div className="space-y-2">
          <FormInput
            id="description"
            label={`${t("description")}:`}
            value={description}
            onChange={setDescription}
            placeholder={t("descriptionPlaceholder")}
          />
          <p className="text-xs text-muted-foreground px-1">
            {t("descriptionHint")}
          </p>
        </div>

        <div className="space-y-2">
          <FormInput
            id="slug"
            label={`${t("slug")}:`}
            value={slug}
            onChange={handleSlugChange}
            placeholder={t("slugPlaceholder")}
          />
          <p className="text-xs text-muted-foreground px-1">
            {t("slugHint", { slug: slug || t("slugPlaceholder") })}
          </p>
        </div>

        <FormSelect
          id="currency"
          label={`${t("currency")}:`}
          value={currency}
          onChange={setCurrency}
          placeholder={t("currencyPlaceholder")}
          options={CURRENCIES.map((c) => ({
            value: c.code,
            label: `${c.code} (${c.symbol}) - ${c.name}`,
          }))}
        />

        {/* Languages section */}
        <div className="space-y-4 pt-2">
          <label className="text-sm font-medium">{tPages("languages")}:</label>

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
                      onCheckedChange={(checked) => handleToggleLanguage(lang.code, checked)}
                      disabled={(isDefault && isEnabled) || isDisabledByLimit}
                    />
                    <span className="text-sm font-medium truncate">{lang.name}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSetDefault(lang.code)}
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
          </div>

          <p className="text-xs text-muted-foreground">
            {tLang("hint")}
          </p>
        </div>

        <div className="sticky bottom-0 flex justify-end gap-2 pt-4 pb-2">
          <Button type="submit" disabled={saving || !hasChanges} variant="destructive" className="h-10 rounded-xl shadow-md">
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {t("save")}
          </Button>
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
