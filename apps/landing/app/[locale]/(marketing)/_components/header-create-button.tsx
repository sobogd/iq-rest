"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ReactNode } from "react";
import { analytics } from "@/lib/analytics";

interface HeaderCreateButtonProps {
  children: ReactNode;
}

export function HeaderCreateButton({ children }: HeaderCreateButtonProps) {
  return (
    <Button asChild>
      <Link href="/dashboard" onClick={() => analytics.marketing.headerCtaClick()}>{children}</Link>
    </Button>
  );
}
