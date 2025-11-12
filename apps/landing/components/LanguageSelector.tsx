"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Globe } from "lucide-react";

const locales = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("header");
  const tLangs = useTranslations("languages");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Select language">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Select language</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("selectLanguage")}</DialogTitle>
          <DialogDescription>
            Choose your preferred language for the website.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {locales.map((loc) => (
            <Button
              key={loc.code}
              variant={locale === loc.code ? "default" : "outline"}
              onClick={() => handleLanguageChange(loc.code)}
              disabled={isPending}
              className="w-full justify-start"
            >
              {tLangs(loc.code)}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
