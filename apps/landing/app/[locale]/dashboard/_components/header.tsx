"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { useDashboard } from "../_context/dashboard-context";
import { getPageKeyFromPathname } from "../_context/dashboard-context";

export function SiteHeader() {
  const pathname = usePathname();
  const { translations, onboardingCompleted } = useDashboard();
  const t = useTranslations("dashboard.onboarding");

  const activePage = getPageKeyFromPathname(pathname);

  const title =
    activePage === "onboarding" && onboardingCompleted
      ? t("completedTitle")
      : translations.pages[activePage];

  return (
    <header className="flex h-16 md:h-[--header-height] shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center px-4 md:px-6">
        <h1 className="text-xl md:text-base font-semibold">{title}</h1>
      </div>
    </header>
  );
}
