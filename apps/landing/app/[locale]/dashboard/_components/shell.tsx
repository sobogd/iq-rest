"use client";

import { SiteHeader } from "./header";
import {
  DashboardProvider,
  type DashboardTranslations,
} from "../_context/dashboard-context";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col h-dvh overflow-hidden"
      style={{ "--header-height": "3.5rem" } as React.CSSProperties}
    >
      <SiteHeader />
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function DashboardShell({
  translations,
  children,
}: {
  translations: DashboardTranslations;
  children?: React.ReactNode;
}) {
  return (
    <DashboardProvider translations={translations}>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardProvider>
  );
}
