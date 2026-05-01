"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { analytics } from "@/lib/analytics";
import { createUrl } from "@/lib/dashboard-url";

interface HeroCreateButtonProps {
  children: React.ReactNode;
}

export function HeroCreateButton({ children }: HeroCreateButtonProps) {
  const locale = useLocale();
  return (
    <Button
      asChild
      className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
    >
      <a href={createUrl(locale)} onClick={() => analytics.track("land_hero_cta_click")}>{children}</a>
    </Button>
  );
}
