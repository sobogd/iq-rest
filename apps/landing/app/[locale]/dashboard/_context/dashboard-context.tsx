"use client";

import { createContext, useContext, ReactNode } from "react";

export type PageKey =
  | "qrMenu"
  | "home"
  | "analytics"
  | "menu"
  | "categories"
  | "items"
  | "settings"
  | "design"
  | "contacts"
  | "reservations"
  | "tables"
  | "billing"
  | "support"
  | "admin"
  | "adminAnalytics";

export const PAGE_PATHS: Record<PageKey, string> = {
  home: "/dashboard/home",
  menu: "/dashboard/menu",
  categories: "/dashboard/categories",
  items: "/dashboard/items",
  tables: "/dashboard/tables",
  reservations: "/dashboard/reservations",
  design: "/dashboard/design",
  contacts: "/dashboard/contacts",
  qrMenu: "/dashboard/qr-menu",
  analytics: "/dashboard/analytics",
  billing: "/dashboard/billing",
  settings: "/dashboard/settings",
  support: "/dashboard/support",
  admin: "/dashboard/admin",
  adminAnalytics: "/dashboard/admin/analytics",
};

const PATH_TO_PAGE_MAP: Record<string, PageKey> = {
  "home": "home",
  "menu": "menu",
  "categories": "categories",
  "items": "items",
  "tables": "tables",
  "reservations": "reservations",
  "design": "design",
  "contacts": "contacts",
  "qr-menu": "qrMenu",
  "analytics": "analytics",
  "billing": "billing",
  "settings": "settings",
  "support": "support",
  "admin": "admin",
  "admin/analytics": "adminAnalytics",
};

export function getPageKeyFromPathname(pathname: string): PageKey {
  const dashboardPrefix = "/dashboard/";
  const idx = pathname.indexOf(dashboardPrefix);
  if (idx === -1) return "home";
  const subPath = pathname.slice(idx + dashboardPrefix.length);
  return PATH_TO_PAGE_MAP[subPath] || "home";
}

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
  deviceStats: string;
  devices: string;
  browsers: string;
  os: string;
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
  moreDetails: string;
  generateImage: string;
  generatingImage: string;
  generateImageError: string;
  changeBackground: string;
  regenerateImage: string;
  generateLimitReached: string;
  generateLimitDescription: string;
}

export interface MenuTranslations {
  addItem: string;
  addCategory: string;
  sampleBanner: string;
  scratchBanner: string;
  noItemsBanner: string;
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
  logout: string;
  analytics: AnalyticsTranslations;
  menu: MenuTranslations;
  categories: CategoriesTranslations;
  items: ItemsTranslations;
  settings: SettingsTranslations;
}

const validPages: PageKey[] = [
  "qrMenu", "home", "analytics", "menu", "categories", "items", "settings", "design",
  "contacts", "reservations", "tables", "billing", "support", "admin", "adminAnalytics"
];

export function isValidPageKey(value: string): value is PageKey {
  return validPages.includes(value as PageKey);
}

interface DashboardContextType {
  translations: DashboardTranslations;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({
  children,
  translations,
}: {
  children: ReactNode;
  translations: DashboardTranslations;
}) {
  return (
    <DashboardContext.Provider value={{ translations }}>
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
