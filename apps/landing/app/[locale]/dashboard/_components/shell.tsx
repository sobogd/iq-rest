"use client";

import { useEffect } from "react";
import { SiteHeader } from "./header";
import { TrialExpiredModal } from "./trial-expired-modal";
import {
  DashboardProvider,
  type DashboardTranslations,
  type ScanUsage,
} from "../_context/dashboard-context";
import { analytics } from "@/lib/analytics";
import { setDashboardUserId } from "@/lib/dashboard-events";

function DashboardLayout({
  children,
  trialExpired,
}: {
  children: React.ReactNode;
  trialExpired?: boolean;
}) {
  return (
    <div
      className="flex flex-col fixed inset-0 overflow-hidden overscroll-contain"
      style={{ "--header-height": "3.5rem" } as React.CSSProperties}
    >
      <SiteHeader />
      <div className="flex-1 min-h-0 overflow-clip">{children}</div>
      <TrialExpiredModal open={!!trialExpired} />
    </div>
  );
}

export function DashboardShell({
  translations,
  userId,
  scanUsage,
  isAnonymous,
  trialExpired,
  children,
}: {
  translations: DashboardTranslations;
  userId: string;
  scanUsage: ScanUsage | null;
  isAnonymous: boolean;
  trialExpired?: boolean;
  children?: React.ReactNode;
}) {
  useEffect(() => {
    setDashboardUserId(userId);
    analytics.linkSession(userId);
  }, [userId]);

  return (
    <DashboardProvider translations={translations} scanUsage={scanUsage} isAnonymous={isAnonymous}>
      <DashboardLayout trialExpired={trialExpired}>
        {children}
      </DashboardLayout>
    </DashboardProvider>
  );
}
