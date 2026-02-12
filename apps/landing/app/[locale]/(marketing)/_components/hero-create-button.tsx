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
      size="lg"
      className="text-lg px-8 py-6"
      onClick={() => analytics.marketing.heroCreateClick()}
    >
      <Link href="/dashboard">{children}</Link>
    </Button>
  );
}
