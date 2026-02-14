"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { analytics } from "@/lib/analytics";

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
  | "support"
  | "admin"
  | "adminAnalytics";

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
  noCategoriesHint: string;
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
  allergens: string;
  allergensHint: string;
  allergenNames: Record<string, string>;
  subscribeForAllergens: string;
  subscribe: string;
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
    menu: string;
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
  navigateFromOnboarding: (page: PageKey) => void;
  returnToOnboarding: () => boolean;
  translations: DashboardTranslations;
  registerFormClose: (closeHandler: () => void) => void;
  unregisterFormClose: () => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

const COOKIE_KEY = "dashboard-active-page";

const validPages: PageKey[] = [
  "onboarding", "qrMenu", "home", "analytics", "categories", "items", "settings", "design",
  "contacts", "languages", "reservations", "reservationSettings", "tables", "billing", "support", "admin", "adminAnalytics"
];

export function isValidPageKey(value: string): value is PageKey {
  return validPages.includes(value as PageKey);
}

function setPageCookie(page: PageKey) {
  document.cookie = `${COOKIE_KEY}=${page};path=/;max-age=31536000`;
}

function getPageFromHash(): PageKey | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1); // remove #
  return isValidPageKey(hash) ? hash : null;
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
  const isNavigatingRef = useRef(false);
  const formCloseHandlerRef = useRef<(() => void) | null>(null);

  // Priority: hash > query param > initialPage
  const pageParam = searchParams.get("page");
  const hashPage = typeof window !== "undefined" ? getPageFromHash() : null;
  const effectiveInitialPage = hashPage || (pageParam && isValidPageKey(pageParam) ? pageParam : initialPage);

  const [activePage, setActivePageState] = useState<PageKey>(effectiveInitialPage);
  const previousPageRef = useRef<PageKey>(effectiveInitialPage);

  // Handle query param (legacy support) - convert to hash
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam && isValidPageKey(pageParam)) {
      setActivePageState(pageParam);
      setPageCookie(pageParam);

      // Replace URL with hash instead of query param
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("page");
      const basePath = newParams.toString()
        ? `${window.location.pathname}?${newParams.toString()}`
        : window.location.pathname;
      router.replace(`${basePath}#${pageParam}`, { scroll: false });
    }
  }, [searchParams, router]);

  // Set initial hash and ensure onboarding is in history
  useEffect(() => {
    if (!window.location.hash && activePage) {
      // If starting on a page other than onboarding, add onboarding to history first
      if (activePage !== "onboarding") {
        window.history.replaceState(null, "", "#onboarding");
        window.history.pushState(null, "", `#${activePage}`);
      } else {
        window.history.replaceState(null, "", `#${activePage}`);
      }
    }
  }, []);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const currentHash = window.location.hash.slice(1) || "onboarding";

      // If a form is open, close it and go to onboarding
      if (formCloseHandlerRef.current) {
        formCloseHandlerRef.current();
        formCloseHandlerRef.current = null;
        // Go to onboarding
        window.history.pushState(null, "", "#onboarding");
        setActivePageState("onboarding");
        setPageCookie("onboarding");
        previousPageRef.current = "onboarding";
        isNavigatingRef.current = true;
        return;
      }

      // If on onboarding, allow exit to landing
      if (currentHash === "onboarding" && activePage === "onboarding") {
        return;
      }

      // Otherwise redirect to onboarding
      window.history.pushState(null, "", "#onboarding");
      setActivePageState("onboarding");
      setPageCookie("onboarding");
      previousPageRef.current = "onboarding";
      isNavigatingRef.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [activePage]);


  const trackPageView = useCallback((page: PageKey) => {
    analytics.dashboard.pageView(page);
  }, []);

  const setActivePage = useCallback((page: PageKey) => {
    const fromPage = previousPageRef.current;
    if (fromPage !== page) {
      trackPageView(page);
      // Push to history for browser back button support
      if (!isNavigatingRef.current) {
        window.history.pushState(null, "", `#${page}`);
      }
      isNavigatingRef.current = false;
    }
    previousPageRef.current = page;
    setActivePageState(page);
    setPageCookie(page);
  }, [trackPageView]);

  const navigateFromOnboarding = useCallback((page: PageKey) => {
    trackPageView(page);
    previousPageRef.current = page;
    sessionStorage.setItem("returnToOnboarding", "true");
    // For categories/items pages, open form directly
    if (page === "categories" || page === "items") {
      sessionStorage.setItem("openFormOnNavigate", "true");
    }
    // Push to history for browser back button support
    window.history.pushState(null, "", `#${page}`);
    setActivePageState(page);
    setPageCookie(page);
  }, [trackPageView]);

  const returnToOnboarding = useCallback(() => {
    const shouldReturn = sessionStorage.getItem("returnToOnboarding") === "true";
    if (shouldReturn) {
      previousPageRef.current = "onboarding";
      sessionStorage.removeItem("returnToOnboarding");
      // Push to history for browser back button support
      window.history.pushState(null, "", "#onboarding");
      setActivePageState("onboarding");
      setPageCookie("onboarding");
      return true;
    }
    return false;
  }, []);

  const registerFormClose = useCallback((closeHandler: () => void) => {
    formCloseHandlerRef.current = closeHandler;
  }, []);

  const unregisterFormClose = useCallback(() => {
    formCloseHandlerRef.current = null;
  }, []);

  return (
    <DashboardContext.Provider value={{ activePage, setActivePage, navigateFromOnboarding, returnToOnboarding, translations, registerFormClose, unregisterFormClose }}>
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
