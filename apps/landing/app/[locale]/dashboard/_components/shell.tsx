"use client";

import { useState, useEffect, useCallback } from "react";
import { SiteHeader } from "./header";
import {
  DashboardProvider,
  type DashboardTranslations,
} from "../_context/dashboard-context";
import { AuthForm } from "./auth-form";
import { PageLoader } from "../_ui/page-loader";

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
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/check");
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleAuthSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  if (isAuthenticated === null) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <AuthForm onSuccess={handleAuthSuccess} />;
  }

  return (
    <DashboardProvider translations={translations}>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardProvider>
  );
}
