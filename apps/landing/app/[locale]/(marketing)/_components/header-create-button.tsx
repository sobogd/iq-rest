"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { ReactNode } from "react";
import { analytics } from "@/lib/analytics";
import { loginUrl } from "@/lib/dashboard-url";

interface HeaderCreateButtonProps {
  children: ReactNode;
}

export function HeaderCreateButton({ children }: HeaderCreateButtonProps) {
  const locale = useLocale();
  return (
    <Button asChild className="opacity-95 hover:opacity-100 transition-opacity">
      <a href={loginUrl(locale)} onClick={() => analytics.track("land_header_cta_click")}>{children}</a>
    </Button>
  );
}
