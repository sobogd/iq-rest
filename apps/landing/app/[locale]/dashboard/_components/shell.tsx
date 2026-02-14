"use client";

import { useState, useEffect, useCallback } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import { SiteHeader } from "./header";
import {
  DashboardProvider,
  useDashboard,
  type DashboardTranslations,
  type PageKey,
} from "../_context/dashboard-context";
import { AuthForm } from "./auth-form";
import { PageLoader } from "../_ui/page-loader";

import { AnalyticsPage } from "../_pages/analytics";
import { CategoriesPage } from "../_pages/categories";
import { ItemsPage } from "../_pages/items";
import { SettingsPage } from "../_pages/settings";
import { DesignPage } from "../_pages/design";
import { ContactsPage } from "../_pages/contacts";
import { LanguagesPage } from "../_pages/languages";
import { TablesPage } from "../_pages/tables";
import { ReservationsPage } from "../_pages/reservations";
import { BillingPage } from "../_pages/billing";
import { SupportPage } from "../_pages/support";
import { DashboardHome } from "../_pages/home";
import { OnboardingPage } from "../_pages/onboarding";
import { QrMenuPage } from "../_pages/qr-menu";
import { AdminPage } from "../_pages/admin";
import { AdminAnalyticsPage } from "../_pages/admin-analytics";

const pageComponents: Record<PageKey, React.ComponentType> = {
  home: DashboardHome,
  onboarding: OnboardingPage,
  qrMenu: QrMenuPage,
  analytics: AnalyticsPage,
  categories: CategoriesPage,
  items: ItemsPage,
  settings: SettingsPage,
  design: DesignPage,
  contacts: ContactsPage,
  languages: LanguagesPage,
  reservations: ReservationsPage,
  tables: TablesPage,
  billing: BillingPage,
  support: SupportPage,
  admin: AdminPage,
  adminAnalytics: AdminAnalyticsPage,
};

function PageRenderer() {
  const { activePage } = useDashboard();
  const PageComponent = pageComponents[activePage];
  return <PageComponent />;
}

function DashboardLayout({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={{
        "--sidebar-width": "16rem",
        "--header-height": "3.5rem",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="flex flex-col h-dvh md:h-[calc(100dvh-1rem)] overflow-hidden">
        <SiteHeader />
        <div className="flex-1 overflow-hidden">
          <PageRenderer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function DashboardShell({
  defaultOpen,
  translations,
  initialPage,
}: {
  defaultOpen: boolean;
  translations: DashboardTranslations;
  initialPage?: PageKey;
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
    <DashboardProvider translations={translations} initialPage={initialPage}>
      <DashboardLayout defaultOpen={defaultOpen} />
    </DashboardProvider>
  );
}
