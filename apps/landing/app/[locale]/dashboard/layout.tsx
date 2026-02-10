import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { DashboardShell } from "./_components/shell";
import type { DashboardTranslations, PageKey } from "./_context/dashboard-context";

const validPages: PageKey[] = [
  "onboarding", "qrMenu", "home", "analytics", "categories", "items", "settings", "design",
  "contacts", "languages", "reservations", "reservationSettings", "tables", "billing", "support", "admin"
];

function isValidPageKey(value: string): value is PageKey {
  return validPages.includes(value as PageKey);
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  void children;
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  const savedPage = cookieStore.get("dashboard-active-page")?.value;
  const initialPage: PageKey = savedPage && isValidPageKey(savedPage) ? savedPage : "onboarding";

  const t = await getTranslations("dashboard");

  const translations: DashboardTranslations = {
    pages: {
      home: t("pages.home"),
      onboarding: t("pages.onboarding"),
      qrMenu: t("pages.qrMenu"),
      analytics: t("pages.analytics"),
      categories: t("pages.categories"),
      items: t("pages.items"),
      settings: t("pages.settings"),
      design: t("pages.design"),
      contacts: t("pages.contacts"),
      languages: t("pages.languages"),
      reservations: t("pages.reservations"),
      reservationSettings: t("pages.reservationSettings"),
      tables: t("pages.tables"),
      billing: t("pages.billing"),
      support: t("pages.support"),
      admin: "Admin",
    },
    sidebar: {
      qrMenu: t("sidebar.qrMenu"),
      menu: t("sidebar.menu"),
      settings: t("sidebar.settings"),
      reservations: t("sidebar.reservations"),
      account: t("sidebar.account"),
      reservationSettings: t("sidebar.reservationSettings"),
    },
    logout: t("logout"),
    analytics: {
      monthlyUsage: t("analytics.monthlyUsage"),
      scansThisMonth: t("analytics.scansThisMonth"),
      limitReached: t("analytics.limitReached"),
      todayViews: t("analytics.todayViews"),
      weeklyViews: t("analytics.weeklyViews"),
      monthlyViews: t("analytics.monthlyViews"),
      uniqueVisitors: t("analytics.uniqueVisitors"),
      viewsByPage: t("analytics.viewsByPage"),
      viewsByLanguage: t("analytics.viewsByLanguage"),
      dailyViews: t("analytics.dailyViews"),
      noData: t("analytics.noData"),
      pageNames: {
        home: t("analytics.pageNames.home"),
        menu: t("analytics.pageNames.menu"),
        contacts: t("analytics.pageNames.contacts"),
        language: t("analytics.pageNames.language"),
        reserve: t("analytics.pageNames.reserve"),
      },
      languageNames: {
        en: t("analytics.languageNames.en"),
        es: t("analytics.languageNames.es"),
        de: t("analytics.languageNames.de"),
        fr: t("analytics.languageNames.fr"),
        ru: t("analytics.languageNames.ru"),
      },
    },
    categories: {
      noCategories: t("categories.noCategories"),
      addCategory: t("categories.addCategory"),
      editCategory: t("categories.editCategory"),
      name: t("categories.name"),
      namePlaceholder: t("categories.namePlaceholder"),
      status: t("categories.status"),
      active: t("categories.active"),
      inactive: t("categories.inactive"),
      save: t("categories.save"),
      saving: t("categories.saving"),
      cancel: t("categories.cancel"),
      delete: t("categories.delete"),
      deleteConfirm: t("categories.deleteConfirm"),
      fetchError: t("categories.fetchError"),
      updateError: t("categories.updateError"),
      saveError: t("categories.saveError"),
      deleteError: t("categories.deleteError"),
      translateError: t("categories.translateError"),
      nameRequired: t("categories.nameRequired"),
      enabled: t("categories.enabled"),
      disabled: t("categories.disabled"),
      created: t("categories.created"),
      updated: t("categories.updated"),
      deleted: t("categories.deleted"),
      validationErrorTitle: t("categories.validationErrorTitle"),
      sort: t("categories.sort"),
      saveSort: t("categories.saveSort"),
      sortSaved: t("categories.sortSaved"),
      sortError: t("categories.sortError"),
    },
    items: {
      noItems: t("items.noItems"),
      addItem: t("items.addItem"),
      editItem: t("items.editItem"),
      name: t("items.name"),
      namePlaceholder: t("items.namePlaceholder"),
      description: t("items.description"),
      descriptionPlaceholder: t("items.descriptionPlaceholder"),
      price: t("items.price"),
      pricePlaceholder: t("items.pricePlaceholder"),
      category: t("items.category"),
      categoryPlaceholder: t("items.categoryPlaceholder"),
      image: t("items.image"),
      uploadImage: t("items.uploadImage"),
      removeImage: t("items.removeImage"),
      status: t("items.status"),
      active: t("items.active"),
      inactive: t("items.inactive"),
      save: t("items.save"),
      saving: t("items.saving"),
      cancel: t("items.cancel"),
      delete: t("items.delete"),
      deleteConfirm: t("items.deleteConfirm"),
      fetchError: t("items.fetchError"),
      updateError: t("items.updateError"),
      saveError: t("items.saveError"),
      deleteError: t("items.deleteError"),
      translateError: t("items.translateError"),
      nameRequired: t("items.nameRequired"),
      categoryRequired: t("items.categoryRequired"),
      priceRequired: t("items.priceRequired"),
      enabled: t("items.enabled"),
      disabled: t("items.disabled"),
      created: t("items.created"),
      updated: t("items.updated"),
      deleted: t("items.deleted"),
      validationErrorTitle: t("items.validationErrorTitle"),
      sort: t("items.sort"),
      saveSort: t("items.saveSort"),
      sortSaved: t("items.sortSaved"),
      sortError: t("items.sortError"),
      allergens: t("items.allergens"),
      allergensHint: t("items.allergensHint"),
      allergenNames: t.raw("items.allergenNames") as Record<string, string>,
    },
    settings: {
      name: "",
      namePlaceholder: "",
      nameHint: "",
      description: "",
      descriptionPlaceholder: "",
      descriptionHint: "",
      slug: "",
      slugPlaceholder: "",
      slugHint: "",
      save: "",
      fetchError: "",
      saveError: "",
      saved: "",
      nameRequired: "",
      slugRequired: "",
      validationErrorTitle: "",
      slugChangedTitle: "",
      slugChangedDescription: "",
      close: "",
      view: "",
    },
  };

  return (
    <DashboardShell defaultOpen={defaultOpen} translations={translations} initialPage={initialPage} />
  );
}
