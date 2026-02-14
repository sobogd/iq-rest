"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { isAdminEmail } from "@/lib/admin";
import {
  FolderOpen,
  Package,
  Settings,
  CreditCard,
  HelpCircle,
  Languages,
  CalendarDays,
  Armchair,
  QrCode,
  Palette,
  Phone,
  Cog,
  User,
  BarChart3,
  LogOut,
  Rocket,
  Loader2,
  Shield,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { useDashboard, type PageKey } from "../_context/dashboard-context";

type MenuItem = {
  key: PageKey;
  icon: React.ComponentType<{ className?: string }>;
};

const topLevelItems: MenuItem[] = [
  { key: "onboarding", icon: Rocket },
  { key: "qrMenu", icon: QrCode },
];

const menuData = {
  qrMenu: [
    { key: "analytics", icon: BarChart3 },
  ] as MenuItem[],
  menu: [
    { key: "categories", icon: FolderOpen },
    { key: "items", icon: Package },
  ] as MenuItem[],
  settings: [
    { key: "settings", icon: Cog },
    { key: "design", icon: Palette },
    { key: "contacts", icon: Phone },
    { key: "languages", icon: Languages },
  ] as MenuItem[],
  reservations: [
    { key: "tables", icon: Armchair },
    { key: "reservations", icon: CalendarDays },
  ] as MenuItem[],
  account: [
    { key: "billing", icon: CreditCard },
    { key: "support", icon: HelpCircle },
  ] as MenuItem[],
};

function SidebarMenuContent() {
  const { activePage, setActivePage, translations } = useDashboard();
  const { setOpenMobile, isMobile } = useSidebar();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const emailCookie = cookies.find((c) => c.trim().startsWith("user_email="));
    if (emailCookie) {
      const email = decodeURIComponent(emailCookie.split("=")[1]);
      setIsAdmin(isAdminEmail(email));
    }
  }, []);

  const handleMenuClick = (key: PageKey) => {
    setActivePage(key);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    window.location.href = "/api/auth/logout";
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3 md:gap-2 px-1 mb-2">
          <Image src="/logo.svg" alt="IQ Rest" width={48} height={48} className="size-12 md:size-8" />
          <span className="text-2xl md:text-base font-semibold">IQ Rest</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {topLevelItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    tooltip={translations.pages[item.key]}
                    isActive={activePage === item.key}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <item.icon />
                    <span>{translations.pages[item.key]}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {menuData.qrMenu.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    tooltip={translations.pages[item.key]}
                    isActive={activePage === item.key}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <item.icon />
                    <span>{translations.pages[item.key]}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <Package className="size-4 mr-2" />
            {translations.sidebar.menu}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuData.menu.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    tooltip={translations.pages[item.key]}
                    isActive={activePage === item.key}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <item.icon />
                    <span>{translations.pages[item.key]}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <Settings className="size-4 mr-2" />
            {translations.sidebar.settings}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuData.settings.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    tooltip={translations.pages[item.key]}
                    isActive={activePage === item.key}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <item.icon />
                    <span>{translations.pages[item.key]}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <CalendarDays className="size-4 mr-2" />
            {translations.sidebar.reservations}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuData.reservations.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    tooltip={translations.pages[item.key]}
                    isActive={activePage === item.key}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <item.icon />
                    <span>{translations.pages[item.key]}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto pb-[75px]">
          <SidebarGroupLabel>
            <User className="size-4 mr-2" />
            {translations.sidebar.account}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuData.account.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    tooltip={translations.pages[item.key]}
                    isActive={activePage === item.key}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <item.icon />
                    <span>{translations.pages[item.key]}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={translations.logout}
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <LogOut />
                  )}
                  <span>{translations.logout}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup className="pb-4">
            <SidebarGroupLabel>
              <Shield className="size-4 mr-2" />
              Admin
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Admin Panel"
                    isActive={activePage === "admin"}
                    onClick={() => handleMenuClick("admin")}
                  >
                    <Shield />
                    <span>Companies</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Analytics"
                    isActive={activePage === "adminAnalytics"}
                    onClick={() => handleMenuClick("adminAnalytics")}
                  >
                    <BarChart3 />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarMenuContent />
    </Sidebar>
  );
}
