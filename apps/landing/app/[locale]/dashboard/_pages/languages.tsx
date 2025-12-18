"use client";

import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>(["en"]);
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pendingDisable, setPendingDisable] = useState<string | null>(null);

  useEffect(() => {
    fetchLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchLanguages() {
    try {
      const res = await fetch("/api/restaurant");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setLanguages(data.languages || ["en"]);
          setDefaultLanguage(data.defaultLanguage || "en");
        }
      }
    } catch (error) {
      console.error("Failed to fetch languages:", error);
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
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
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="space-y-2">
          {ALL_LANGUAGES.map((lang) => {
            const isEnabled = languages.includes(lang.code);
            const isDefault = defaultLanguage === lang.code;
            const isSaving = saving === lang.code;

            return (
              <div
                key={lang.code}
                className="flex items-center justify-between h-14 px-4 bg-muted/30 rounded-xl"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleToggleLanguage(lang.code, checked)}
                    disabled={isSaving || (isDefault && isEnabled)}
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
