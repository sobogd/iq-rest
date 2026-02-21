import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getUserWithCompany } from "@/lib/auth";
import { DashboardShell } from "./_components/shell";
import type { DashboardTranslations } from "./_context/dashboard-context";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Uses React.cache() — same query is reused by page.tsx via getUserCompanyId()
  const auth = await getUserWithCompany();

  if (!auth) {
    redirect("/login");
  }

  const companyId = auth.companyId;

  // Check onboarding state + upsell data
  const [restaurant, company] = await Promise.all([
    prisma.restaurant.findFirst({
      where: { companyId },
      select: { title: true },
    }),
    prisma.company.findUnique({
      where: { id: companyId },
      select: { plan: true, createdAt: true, upsellShownAt: true },
    }),
  ]);

  const hasRestaurant = Boolean(restaurant?.title && restaurant.title.trim().length > 0);

  if (!hasRestaurant) redirect("/onboarding/name");

  // Check if admin is impersonating
  const cookieStore = await cookies();
  const adminOriginalEmail = cookieStore.get("admin_original_email")?.value;
  const currentEmail = cookieStore.get("user_email")?.value;
  const impersonation = adminOriginalEmail
    ? { originalEmail: adminOriginalEmail, currentEmail: currentEmail ?? "" }
    : undefined;

  // Upsell redirect for FREE users
  if (company && company.plan === "FREE" && !impersonation) {
    const headerStore = await headers();
    const pathname = headerStore.get("x-pathname") || "";
    const isUpgradePage = pathname.includes("/dashboard/upgrade");

    if (!isUpgradePage) {
      const now = Date.now();
      const fiveDaysMs = 5 * 24 * 60 * 60 * 1000;
      const twoDaysMs = 2 * 24 * 60 * 60 * 1000;
      const accountAge = now - company.createdAt.getTime();

      if (accountAge > fiveDaysMs) {
        const shouldShowUpsell = !company.upsellShownAt
          || (now - company.upsellShownAt.getTime() > twoDaysMs);

        if (shouldShowUpsell) {
          redirect("/dashboard/upgrade");
        }
      }
    }
  }

  const t = await getTranslations("dashboard");

  const translations: DashboardTranslations = {
    pages: {
      home: t("pages.home"),
      qrMenu: t("pages.qrMenu"),
      analytics: t("pages.analytics"),
      menu: t("pages.menu"),
      categories: t("pages.categories"),
      items: t("pages.items"),
      settings: t("pages.settings"),
      design: t("pages.design"),
      contacts: t("pages.contacts"),
      reservations: t("pages.reservations"),
      tables: t("pages.tables"),
      billing: t("pages.billing"),
      support: t("pages.support"),
      admin: "Admin",
      adminAnalytics: "Analytics",
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
      deviceStats: t("analytics.deviceStats"),
      devices: t("analytics.devices"),
      browsers: t("analytics.browsers"),
      os: t("analytics.os"),
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
    menu: {
      addItem: t("menu.addItem"),
      addCategory: t("menu.addCategory"),
      scratchBanner: t("menu.scratchBanner"),
      exampleCategories: t("menu.exampleCategories"),
      noItemsBanner: t("menu.noItemsBanner"),
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
      noCategoriesHint: t("items.noCategoriesHint"),
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
      subscribeForAllergens: t("items.subscribeForAllergens"),
      subscribe: t("items.subscribe"),
      stylize: t("items.stylize"),
      sectionMain: t("items.sectionMain"),
      moreDetails: t("items.moreDetails"),
      generateImage: t("items.generateImage"),
      generatingImage: t("items.generatingImage"),
      generateImageError: t("items.generateImageError"),
      changeBackground: t("items.changeBackground"),
      regenerateImage: t("items.regenerateImage"),
      generateLimitReached: t("items.generateLimitReached"),
      generateLimitDescription: t("items.generateLimitDescription"),
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
    <DashboardShell translations={translations} impersonation={impersonation} userId={auth.userId}>
      {children}
    </DashboardShell>
  );
}
