"use client";

import { useState, useMemo, useEffect } from "react";
import { Loader2, Star } from "lucide-react";
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
import { useTranslations } from "next-intl";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { LANGUAGE_NAMES } from "../_lib/constants";
import { useRouter } from "@/i18n/routing";
import { DashboardContent } from "../_ui/dashboard-content";

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
}

export function SettingsPage({ initialRestaurant }: SettingsPageProps) {
  const t = useTranslations("dashboard.general");
  const tLang = useTranslations("dashboard.languages");
  const { translations } = useDashboard();
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const initLangs = initialRestaurant?.languages || ["en"];
  const initDefLang = initialRestaurant?.defaultLanguage || "en";

  const [languages, setLanguages] = useState<string[]>(initLangs);
  const [defaultLanguage, setDefaultLanguage] = useState(initDefLang);
  const [originalLanguages, setOriginalLanguages] = useState<string[]>(initLangs);
  const [originalDefaultLanguage, setOriginalDefaultLanguage] = useState(initDefLang);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pendingDisable, setPendingDisable] = useState<string | null>(null);

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
        const removedLangs = originalLanguages.filter((l) => !languages.includes(l));
        await Promise.all(
          removedLangs.map((lang) =>
            fetch(`/api/translations?language=${lang}`, { method: "DELETE" })
          )
        );

        track(DashboardEvent.CLICKED_SAVE_SETTINGS);
        toast.success(t("saved"));
        router.push("/dashboard");
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
    <div className="flex flex-col h-full">
      <div className="shrink-0">
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
      <form id="settings-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-6">

          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{translations.pages.settings}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              {ALL_LANGUAGES.map((lang, index) => {
                const isEnabled = languages.includes(lang.code);
                const isDefault = defaultLanguage === lang.code;

                return (
                  <div key={lang.code}>
                    {index > 0 && <div className="border-t border-border mx-4" />}
                    <div className="flex items-center h-11 px-4">
                      <div className="mr-3" onClick={(e) => e.stopPropagation()}>
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={(checked) => { track(DashboardEvent.TOGGLED_LANGUAGE); handleToggleLanguage(lang.code, checked); }}
                          disabled={isDefault && isEnabled}
                        />
                      </div>
                      <span className="text-sm font-medium flex-1 min-w-0 truncate">{lang.name}</span>
                      <button
                        type="button"
                        onClick={() => { track(DashboardEvent.CLICKED_SET_DEFAULT_LANGUAGE); handleSetDefault(lang.code); }}
                        disabled={!isEnabled}
                        className={`flex items-center justify-center h-8 w-8 -mr-1 rounded-lg transition-colors ${
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
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground/60 px-4 mt-1.5">{tLang("hint")}</p>
          </div>

        </DashboardContent>
      </form>

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
