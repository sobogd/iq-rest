import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
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

  // Prepare translations for client components
  const sidebarTranslations = {
    subtitle: t("subtitle"),
    noCompany: t("noCompany"),
    logout: t("logout"),
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
  };

  return (
    <UserProvider user={user}>
      <SidebarProvider>
        <AppSidebar
          companyName={user.companyName}
          translations={sidebarTranslations}
        />
        <SidebarInset>
          <AppHeader translations={sidebarTranslations.menu} />
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
