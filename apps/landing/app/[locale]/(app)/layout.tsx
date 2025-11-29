import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { DashboardLayout } from "@/components/dashboard-layout";
import { UserProvider } from "@/components/user-provider";
import { getUser } from "@/lib/user";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Check if user is authenticated
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const userEmail = cookieStore.get("user_email");

  if (!session || !userEmail?.value) {
    redirect(`/${locale}/get-started`);
  }

  // Get user data with caching
  const user = await getUser(userEmail.value);

  if (!user) {
    redirect(`/${locale}/get-started`);
  }

  // Get translations
  const t = await getTranslations("sidebar");
  const tCategories = await getTranslations("categories");

  const translations = {
    menu: {
      dashboard: t("menu.dashboard"),
      categories: t("menu.categories"),
      products: t("menu.products"),
      qrCode: t("menu.qrCode"),
      analytics: t("menu.analytics"),
      settings: t("menu.settings"),
      billing: t("menu.billing"),
      support: t("menu.support"),
    },
    logout: t("logout"),
  };

  const headerTranslations = {
    dashboard: t("menu.dashboard"),
    categories: t("menu.categories"),
    products: t("menu.products"),
    qrCode: t("menu.qrCode"),
    analytics: t("menu.analytics"),
    settings: t("menu.settings"),
    billing: t("menu.billing"),
    support: t("menu.support"),
    newCategory: tCategories("newTitle"),
    editCategory: tCategories("editTitle"),
    newProduct: "New Product",
    editProduct: "Edit Product",
  };

  const actionTranslations = {
    addCategory: tCategories("addCategory"),
    addProduct: "Add Product",
  };

  return (
    <UserProvider user={user}>
      <DashboardLayout
        translations={translations}
        headerTranslations={headerTranslations}
        actionTranslations={actionTranslations}
      >
        {children}
      </DashboardLayout>
    </UserProvider>
  );
}
