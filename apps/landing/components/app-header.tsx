"use client";

import { usePathname, useParams } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface AppHeaderProps {
  translations: Record<string, string>;
}

const pageTitles: Record<string, string> = {
  "/dashboard": "dashboard",
  "/dashboard/categories": "categories",
  "/dashboard/products": "products",
  "/dashboard/qr-code": "qrCode",
  "/dashboard/analytics": "analytics",
  "/dashboard/settings": "settings",
  "/dashboard/billing": "billing",
  "/dashboard/support": "support",
};

export function AppHeader({ translations }: AppHeaderProps) {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const path = pathname.replace(`/${locale}`, "");
  const titleKey = pageTitles[path];
  const title = titleKey ? translations[titleKey] : "";

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="text-sm font-medium">{title}</h1>
    </header>
  );
}
