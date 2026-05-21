import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getUserWithCompany } from "@/lib/auth";
import { getCompanyAccess } from "@/lib/access";
import { dashboardUrl } from "@/lib/dashboard-url";
import { generateUniqueSlug } from "@/lib/slug";
import { getPublicUrl, s3Key } from "@/lib/s3";
import { getCoordinatesByCountry, COUNTRY_CENTERS } from "@/lib/country-centers";
import { DashboardShell } from "./_components/shell";
import { getScanUsage } from "./_lib/queries";
import type { DashboardTranslations } from "./_context/dashboard-context";
import type { Locale } from "@/i18n/routing";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Uses React.cache() — same query is reused by page.tsx via getUserCompanyId()
  const auth = await getUserWithCompany();

  if (!auth) {
    const locale = await getLocale();
    redirect(dashboardUrl(`/${locale}/login`));
  }

  const companyId = auth.companyId;

  // Check if restaurant exists, auto-create if not
  const [restaurant, company] = await Promise.all([
    prisma.restaurant.findFirst({
      where: { companyId },
      select: { title: true },
    }),
    prisma.company.findUnique({
      where: { id: companyId },
      select: { plan: true, subscriptionStatus: true, trialEndsAt: true, onboardingStep: true },
    }),
  ]);

  if (!restaurant) {
    const cookieStore2 = await cookies();
    const userLocale = (await getLocale()) as Locale;
    const currency = cookieStore2.get("currency")?.value || "EUR";
    const geoCountry = cookieStore2.get("geo_country")?.value || null;
    const countryCoords = getCoordinatesByCountry(geoCountry);
    const center = countryCoords || COUNTRY_CENTERS[userLocale];
    const slug = await generateUniqueSlug(Math.random().toString(36).substring(2, 10));
    const initialBackground = getPublicUrl(s3Key("background_initial.webp"));
    const tMenu = await getTranslations("dashboard.menu");
    const defaultCategoryName = tMenu("defaultCategoryName");

    await prisma.$transaction(async (tx) => {
      const restaurant = await tx.restaurant.create({
        data: {
          title: "",
          slug,
          currency,
          source: initialBackground,
          accentColor: "#000000",
          languages: [userLocale],
          defaultLanguage: userLocale,
          x: center?.lng?.toString() || null,
          y: center?.lat?.toString() || null,
          companyId,
          startedFromScratch: true,
        },
      });
      await tx.category.create({
        data: {
          name: defaultCategoryName,
          sortOrder: 0,
          companyId,
          restaurantId: restaurant.id,
        },
      });
      await tx.company.update({
        where: { id: companyId },
        data: { onboardingStep: 3 },
      });
    });
  }

  const trialExpired = company ? getCompanyAccess(company).trialExpired : false;

  const [t, scanUsage] = await Promise.all([
    getTranslations("dashboard"),
    getScanUsage(companyId),
  ]);

  const translations: DashboardTranslations = {
    pages: {
      home: t("pages.home"),
      qrMenu: t("pages.qrMenu"),
      menu: t("pages.menu"),
      categories: t("pages.categories"),
      items: t("pages.items"),
      settings: t("pages.settings"),
      design: t("pages.design"),
      contacts: t("pages.contacts"),
      reservations: t("pages.reservations"),
      tables: t("pages.tables"),
      orders: t("pages.orders"),
      billing: t("pages.billing"),
      support: t("pages.support"),
    },
    logout: t("logout"),
    menu: {
      yourMenu: t("menu.yourMenu"),
      addItem: t("menu.addItem"),
      addCategory: t("menu.addCategory"),
      emptyTitle: t("menu.emptyTitle"),
      emptySubtitle: t("menu.emptySubtitle"),
      noItems: t("menu.noItems"),
      orDivider: t("menu.orDivider"),
      scanButton: t("menu.scanButton"),
      scanDescription: t("menu.scanDescription"),
      defaultCategoryName: t("menu.defaultCategoryName"),
    },
    categories: {
      general: t("categories.general"),
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
      general: t("items.general"),
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
    <DashboardShell translations={translations} userId={auth.userId} scanUsage={scanUsage} trialExpired={trialExpired}>
      {children}
    </DashboardShell>
  );
}
