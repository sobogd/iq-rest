"use client";

import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { SiteHeader } from "./header";
import {
  DashboardProvider,
  type DashboardTranslations,
} from "../_context/dashboard-context";

interface ImpersonationBannerProps {
  currentEmail: string;
}

function ImpersonationBanner({ currentEmail }: ImpersonationBannerProps) {
  const [exiting, setExiting] = useState(false);

  async function handleExit() {
    setExiting(true);
    try {
      const res = await fetch("/api/admin/impersonate/exit", {
        method: "POST",
      });
      if (res.ok) {
        window.location.href = "/dashboard/admin";
      }
    } catch {
      setExiting(false);
    }
  }

  return (
    <div className="bg-amber-500 text-amber-950 text-xs font-medium flex items-center justify-center gap-2 py-1 px-4">
      <span>Logged in as {currentEmail}</span>
      <button
        onClick={handleExit}
        disabled={exiting}
        className="inline-flex items-center gap-1 rounded-md bg-amber-950/15 px-2 py-0.5 hover:bg-amber-950/25 transition-colors disabled:opacity-50"
      >
        {exiting ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <LogOut className="h-3 w-3" />
        )}
        Exit
      </button>
    </div>
  );
}

function DashboardLayout({
  children,
  impersonation,
}: {
  children: React.ReactNode;
  impersonation?: { originalEmail: string; currentEmail: string };
}) {
  return (
    <div
      className="flex flex-col h-dvh overflow-hidden"
      style={{ "--header-height": "3.5rem" } as React.CSSProperties}
    >
      {impersonation && (
        <ImpersonationBanner currentEmail={impersonation.currentEmail} />
      )}
      <SiteHeader />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

export function DashboardShell({
  translations,
  impersonation,
  children,
}: {
  translations: DashboardTranslations;
  impersonation?: { originalEmail: string; currentEmail: string };
  children?: React.ReactNode;
}) {
  return (
    <DashboardProvider translations={translations}>
      <DashboardLayout impersonation={impersonation}>
        {children}
      </DashboardLayout>
    </DashboardProvider>
  );
}
