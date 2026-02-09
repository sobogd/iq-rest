"use client";

import { useState, useTransition, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, locales } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Globe, Search, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  pl: "Polski",
  ru: "Русский",
  uk: "Українська",
  sv: "Svenska",
  da: "Dansk",
  no: "Norsk",
  fi: "Suomi",
  cs: "Čeština",
  el: "Ελληνικά",
  tr: "Türkçe",
  ro: "Română",
  hu: "Magyar",
  bg: "Български",
  hr: "Hrvatski",
  sk: "Slovenčina",
  sl: "Slovenščina",
  et: "Eesti",
  lv: "Latviešu",
  lt: "Lietuvių",
  sr: "Српски",
  ca: "Català",
  ga: "Gaeilge",
  is: "Íslenska",
  fa: "فارسی",
  ar: "العربية",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
};

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const filteredLocales = useMemo(() => {
    const searchLower = search.toLowerCase();
    return locales.filter((code) => {
      const name = LANGUAGE_NAMES[code] || code;
      return (
        code.toLowerCase().includes(searchLower) ||
        name.toLowerCase().includes(searchLower)
      );
    });
  }, [search]);

  const handleLanguageChange = (newLocale: string) => {
    // Сохраняем выбор языка в cookie на 1 год
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      setOpen(false);
      setSearch("");
    });
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={t("selectLanguage")}
          className="border-0 md:border"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t("selectLanguage")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("selectLanguage")}</DialogTitle>
          <DialogDescription>{t("selectLanguageDescription")}</DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchLanguage")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            autoFocus
          />
        </div>
        <ScrollArea className="h-[300px] pr-4">
          <div className="grid gap-2">
            {filteredLocales.map((code) => (
              <Button
                key={code}
                variant={locale === code ? "default" : "ghost"}
                onClick={() => handleLanguageChange(code)}
                disabled={isPending}
                className="w-full justify-between h-auto py-3"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground uppercase w-6">
                    {code}
                  </span>
                  <span>{LANGUAGE_NAMES[code] || code}</span>
                </span>
                {locale === code && <Check className="h-4 w-4" />}
              </Button>
            ))}
            {filteredLocales.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                {t("noLanguagesFound")}
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
