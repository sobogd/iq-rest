"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
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
import { routing } from "@/i18n/routing";

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
};

const AVAILABLE_LANGUAGES = routing.locales.map((code) => ({
  code,
  name: LANGUAGE_NAMES[code] || code,
}));

interface TranslationStats {
  translated: number;
  total: number;
  percentage: number;
}

interface TranslationsListProps {
  translations: {
    defaultLanguage: string;
    deleteTranslationsConfirm: string;
    cancel: string;
    confirm: string;
  };
  initialLanguages: string[];
  initialDefaultLanguage: string;
  initialStats: Record<string, TranslationStats>;
}

export function TranslationsList({
  translations: t,
  initialLanguages,
  initialDefaultLanguage,
  initialStats,
}: TranslationsListProps) {
  const router = useRouter();
  const [saving, setSaving] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>(initialLanguages);
  const [defaultLanguage, setDefaultLanguage] = useState(initialDefaultLanguage);
  const [stats, setStats] = useState<Record<string, TranslationStats>>(initialStats);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pendingDisable, setPendingDisable] = useState<string | null>(null);

  async function handleToggleLanguage(langCode: string, enabled: boolean) {
    if (enabled) {
      setSaving(langCode);
      const newLangs = [...languages, langCode];
      setLanguages(newLangs);

      try {
        await saveLanguages(newLangs, defaultLanguage);
        toast.success(`${LANGUAGE_NAMES[langCode] || langCode} enabled`);
        router.refresh();
      } catch {
        setLanguages(languages);
        toast.error("Failed to enable language");
      } finally {
        setSaving(null);
      }
    } else {
      if (langCode === defaultLanguage) {
        toast.error("Cannot disable default language");
        return;
      }
      if (languages.length <= 1) {
        toast.error("At least one language is required");
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

    // Remove stats for disabled language
    const newStats = { ...stats };
    delete newStats[langCode];
    setStats(newStats);

    setShowDeleteDialog(false);
    setPendingDisable(null);

    try {
      await saveLanguages(newLangs, defaultLanguage);
      await fetch(`/api/translations?language=${langCode}`, { method: "DELETE" });
      toast.success(`${LANGUAGE_NAMES[langCode] || langCode} disabled`);
      router.refresh();
    } catch {
      setLanguages(languages);
      setStats(stats);
      toast.error("Failed to disable language");
    } finally {
      setSaving(null);
    }
  }

  async function handleSetDefault(langCode: string) {
    if (langCode === defaultLanguage) return;
    if (!languages.includes(langCode)) {
      toast.error("Enable language first");
      return;
    }

    setSaving(langCode);
    const prevDefault = defaultLanguage;
    setDefaultLanguage(langCode);

    try {
      await saveLanguages(languages, langCode);
      toast.success(`${LANGUAGE_NAMES[langCode] || langCode} set as default`);
      router.refresh();
    } catch {
      setDefaultLanguage(prevDefault);
      toast.error("Failed to set default language");
    } finally {
      setSaving(null);
    }
  }

  async function saveLanguages(langs: string[], defLang: string) {
    const res = await fetch("/api/restaurant/languages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ languages: langs, defaultLanguage: defLang }),
    });
    if (!res.ok) throw new Error("Failed to save");
  }

  const otherLanguages = languages.filter((l) => l !== defaultLanguage);
  const hasStats = otherLanguages.length > 0 && Object.keys(stats).length > 0;

  return (
    <div className="space-y-4">
      {/* Stats Section */}
      {hasStats && (
        <div className="p-4 bg-card rounded-lg border space-y-3">
          {otherLanguages.map((langCode) => {
            const langStats = stats[langCode];
            if (!langStats) return null;

            return (
              <div key={`stats-${langCode}`} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {LANGUAGE_NAMES[langCode] || langCode}
                  </span>
                  <span className="font-medium">
                    {langStats.percentage}% ({langStats.translated}/{langStats.total})
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all bg-primary"
                    style={{ width: `${langStats.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Languages List */}
      <div className="space-y-1">
        {AVAILABLE_LANGUAGES.map((lang) => {
          const isEnabled = languages.includes(lang.code);
          const isDefault = defaultLanguage === lang.code;
          const isSaving = saving === lang.code;

          return (
            <div
              key={lang.code}
              className="flex items-center justify-between px-3 py-2 bg-card rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <Switch
                  checked={isEnabled}
                  onCheckedChange={(checked) => handleToggleLanguage(lang.code, checked)}
                  disabled={isSaving || (isDefault && isEnabled)}
                  className="scale-75"
                />
                <span className="text-sm">{lang.name}</span>
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
                <Star className={`h-4 w-4 ${isDefault ? "fill-current" : ""}`} />
              </button>
            </div>
          );
        })}
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pendingDisable ? (LANGUAGE_NAMES[pendingDisable] || pendingDisable) : ""}
            </DialogTitle>
            <DialogDescription>
              {t.deleteTranslationsConfirm}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {t.cancel}
            </Button>
            <Button variant="destructive" onClick={confirmDisableLanguage}>
              {t.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
