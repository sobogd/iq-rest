"use client";

import {
  LayoutDashboard,
  FolderOpen,
  Package,
  QrCode,
  BarChart3,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  Building2,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { Link } from "@/i18n/routing";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  url: string;
  icon: "dashboard" | "categories" | "products" | "qrCode" | "analytics" | "settings" | "billing" | "support";
}

interface AppSidebarProps {
  companyName?: string;
  translations: {
    subtitle: string;
    noCompany: string;
    logout: string;
    menu: Record<string, string>;
  };
}

const iconMap = {
  dashboard: LayoutDashboard,
  categories: FolderOpen,
  products: Package,
  qrCode: QrCode,
  analytics: BarChart3,
  settings: Settings,
  billing: CreditCard,
  support: HelpCircle,
};

const menuItems: MenuItem[] = [
  { title: "dashboard", url: "/dashboard", icon: "dashboard" },
  { title: "categories", url: "/dashboard/categories", icon: "categories" },
  { title: "products", url: "/dashboard/products", icon: "products" },
  { title: "qrCode", url: "/dashboard/qr-code", icon: "qrCode" },
  { title: "analytics", url: "/dashboard/analytics", icon: "analytics" },
  { title: "settings", url: "/dashboard/settings", icon: "settings" },
  { title: "billing", url: "/dashboard/billing", icon: "billing" },
  { title: "support", url: "/dashboard/support", icon: "support" },
];

export function AppSidebar({ companyName, translations }: AppSidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const isActive = (url: string) => {
    const fullUrl = `/${locale}${url}`;
    if (url === "/dashboard") {
      return pathname === fullUrl;
    }
    return pathname.startsWith(fullUrl);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="SobogdQR Logo"
                  width={40}
                  height={40}
                  className="size-10"
                />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">SobogdQR</span>
                  <span className="text-xs text-muted-foreground">
                    {translations.subtitle}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <Link href={item.url}>
                        <Icon className="size-4" />
                        <span>{translations.menu[item.title]}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <div className="flex items-center justify-between px-2 pb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Building2 className="size-4 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium truncate">
              {companyName || translations.noCompany}
            </span>
          </div>
          <form action="/api/auth/logout" method="POST">
            <input type="hidden" name="locale" value={locale} />
            <button
              type="submit"
              className="flex size-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
              title={translations.logout}
            >
              <LogOut className="size-4" />
            </button>
          </form>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
