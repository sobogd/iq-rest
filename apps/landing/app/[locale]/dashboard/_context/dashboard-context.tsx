"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export type PageKey =
  | "onboarding"
  | "qrMenu"
  | "home"
  | "analytics"
  | "categories"
  | "items"
  | "settings"
  | "design"
  | "contacts"
  | "languages"
  | "reservations"
  | "reservationSettings"
  | "tables"
  | "billing"
  | "support";

export interface AnalyticsTranslations {
  monthlyUsage: string;
  scansThisMonth: string;
  limitReached: string;
  todayViews: string;
  weeklyViews: string;
  monthlyViews: string;
  uniqueVisitors: string;
  viewsByPage: string;
  viewsByLanguage: string;
  dailyViews: string;
  noData: string;
  pageNames: Record<string, string>;
  languageNames: Record<string, string>;
}

export interface CategoriesTranslations {
  noCategories: string;
  addCategory: string;
  editCategory: string;
  name: string;
  namePlaceholder: string;
  status: string;
  active: string;
  inactive: string;
  save: string;
  saving: string;
  cancel: string;
  delete: string;
  deleteConfirm: string;
  fetchError: string;
  updateError: string;
  saveError: string;
  deleteError: string;
  translateError: string;
  nameRequired: string;
  enabled: string;
  disabled: string;
  created: string;
  updated: string;
  deleted: string;
  validationErrorTitle: string;
  sort: string;
  saveSort: string;
  sortSaved: string;
  sortError: string;
}

export interface ItemsTranslations {
  noItems: string;
  addItem: string;
  editItem: string;
  name: string;
  namePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  price: string;
  pricePlaceholder: string;
  category: string;
  categoryPlaceholder: string;
  image: string;
  uploadImage: string;
  removeImage: string;
  status: string;
  active: string;
  inactive: string;
  save: string;
  saving: string;
  cancel: string;
  delete: string;
  deleteConfirm: string;
  fetchError: string;
  updateError: string;
  saveError: string;
  deleteError: string;
  translateError: string;
  nameRequired: string;
  categoryRequired: string;
  priceRequired: string;
  enabled: string;
  disabled: string;
  created: string;
  updated: string;
  deleted: string;
  validationErrorTitle: string;
  sort: string;
  saveSort: string;
  sortSaved: string;
  sortError: string;
}

export interface SettingsTranslations {
  name: string;
  namePlaceholder: string;
  nameHint: string;
  description: string;
  descriptionPlaceholder: string;
  descriptionHint: string;
  slug: string;
  slugPlaceholder: string;
  slugHint: string;
  save: string;
  fetchError: string;
  saveError: string;
  saved: string;
  nameRequired: string;
  slugRequired: string;
  validationErrorTitle: string;
  slugChangedTitle: string;
  slugChangedDescription: string;
  close: string;
  view: string;
}

export interface DashboardTranslations {
  pages: Record<PageKey, string>;
  sidebar: {
    qrMenu: string;
    settings: string;
    reservations: string;
    account: string;
    reservationSettings: string;
  };
  logout: string;
  analytics: AnalyticsTranslations;
  categories: CategoriesTranslations;
  items: ItemsTranslations;
  settings: SettingsTranslations;
}

interface DashboardContextType {
  activePage: PageKey;
  setActivePage: (page: PageKey) => void;
  translations: DashboardTranslations;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

const COOKIE_KEY = "dashboard-active-page";

const validPages: PageKey[] = [
  "onboarding", "qrMenu", "home", "analytics", "categories", "items", "settings", "design",
  "contacts", "languages", "reservations", "reservationSettings", "tables", "billing", "support"
];

export function isValidPageKey(value: string): value is PageKey {
  return validPages.includes(value as PageKey);
}

function setPageCookie(page: PageKey) {
  document.cookie = `${COOKIE_KEY}=${page};path=/;max-age=31536000`;
}

export function DashboardProvider({
  children,
  translations,
  initialPage = "home",
}: {
  children: ReactNode;
  translations: DashboardTranslations;
  initialPage?: PageKey;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page");
  const effectiveInitialPage = pageParam && isValidPageKey(pageParam) ? pageParam : initialPage;

  const [activePage, setActivePageState] = useState<PageKey>(effectiveInitialPage);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam && isValidPageKey(pageParam)) {
      setActivePageState(pageParam);
      setPageCookie(pageParam);

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("page");
      const newUrl = newParams.toString()
        ? `${window.location.pathname}?${newParams.toString()}`
        : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, router]);

  const setActivePage = useCallback((page: PageKey) => {
    setActivePageState(page);
    setPageCookie(page);
  }, []);

  return (
    <DashboardContext.Provider value={{ activePage, setActivePage, translations }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
}
