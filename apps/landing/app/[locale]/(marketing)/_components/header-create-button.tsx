"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { analytics } from "@/lib/analytics";
import { ReactNode } from "react";

interface HeaderCreateButtonProps {
  children: ReactNode;
}

export function HeaderCreateButton({ children }: HeaderCreateButtonProps) {
  return (
    <Button asChild onClick={() => analytics.marketing.headerCreateClick()}>
      <Link href="/dashboard">{children}</Link>
    </Button>
  );
}
