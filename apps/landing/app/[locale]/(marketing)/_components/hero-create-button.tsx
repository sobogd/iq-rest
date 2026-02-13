"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { analytics } from "@/lib/analytics";

interface HeroCreateButtonProps {
  children: React.ReactNode;
}

export function HeroCreateButton({ children }: HeroCreateButtonProps) {
  return (
    <Button
      asChild
      className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
      onClick={() => analytics.marketing.heroCreateClick()}
    >
      <Link href="/dashboard">{children}</Link>
    </Button>
  );
}
