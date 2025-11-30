"use client";

import { usePathname, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
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
  Plus,
  ArrowLeft,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  { title: "dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "categories", url: "/dashboard/categories", icon: FolderOpen },
  { title: "items", url: "/dashboard/items", icon: Package },
  { title: "qrCode", url: "/dashboard/qr-code", icon: QrCode },
  { title: "analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "settings", url: "/dashboard/settings", icon: Settings },
  { title: "billing", url: "/dashboard/billing", icon: CreditCard },
  { title: "support", url: "/dashboard/support", icon: HelpCircle },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "dashboard",
  "/dashboard/categories": "categories",
  "/dashboard/categories/new": "newCategory",
  "/dashboard/items": "items",
  "/dashboard/items/new": "newItem",
  "/dashboard/qr-code": "qrCode",
  "/dashboard/analytics": "analytics",
  "/dashboard/settings": "settings",
  "/dashboard/billing": "billing",
  "/dashboard/support": "support",
};

const pageActions: Record<string, { labelKey: string; href: string }> = {
  "/dashboard/categories": {
    labelKey: "addCategory",
    href: "/dashboard/categories/new",
  },
  "/dashboard/items": {
    labelKey: "addItem",
    href: "/dashboard/items/new",
  },
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  translations: {
    menu: Record<string, string>;
    logout: string;
  };
  headerTranslations: Record<string, string>;
  actionTranslations: Record<string, string>;
}

export function DashboardLayout({
  children,
  translations,
  headerTranslations,
  actionTranslations,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const path = pathname.replace(`/${locale}`, "");

  const isActive = (url: string) => {
    const fullUrl = `/${locale}${url}`;
    if (url === "/dashboard") {
      return pathname === fullUrl;
    }
    return pathname.startsWith(fullUrl);
  };

  // Get page title
  let titleKey = pageTitles[path];
  if (!titleKey) {
    if (path.match(/^\/dashboard\/categories\/[^/]+$/) && path !== "/dashboard/categories/new") {
      titleKey = "editCategory";
    } else if (path.match(/^\/dashboard\/items\/[^/]+$/) && path !== "/dashboard/items/new") {
      titleKey = "editItem";
    }
  }
  const title = titleKey ? headerTranslations[titleKey] : "";

  // Check if back button should show
  const showBackButton = path.match(/^\/dashboard\/(categories|items)\/(new|[^/]+)$/);

  // Get action for current page
  const action = pageActions[path];

  return (
    <TooltipProvider delayDuration={0}>
      <div className="dashboard-layout flex h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="flex h-full w-14 flex-col border-r bg-muted/40">
          {/* Logo */}
          <div className="flex h-14 items-center justify-center border-b">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={28}
                height={28}
                className="size-7"
              />
            </Link>
          </div>

          {/* Menu */}
          <nav className="flex flex-1 flex-col gap-1 p-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.url);
              return (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="size-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {translations.menu[item.title]}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <form action="/api/auth/logout" method="POST">
                  <input type="hidden" name="locale" value={locale} />
                  <button
                    type="submit"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <LogOut className="size-5" />
                  </button>
                </form>
              </TooltipTrigger>
              <TooltipContent side="right">
                {translations.logout}
              </TooltipContent>
            </Tooltip>
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-14 shrink-0 items-center border-b px-6">
            <div className="flex items-center gap-2">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 -ml-3"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="size-4" />
                </Button>
              )}
              <h1 className="text-base font-medium">{title}</h1>
            </div>
          </header>

          {/* Content - scrollable */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>

          {/* Floating Action Button */}
          {action && (
            <Button
              className="fixed bottom-6 right-6 h-10 rounded-md px-4 shadow-lg"
              onClick={() => router.push(`/${locale}${action.href}`)}
            >
              <Plus className="size-4" />
              <span className="ml-1">
                {actionTranslations[action.labelKey]}
              </span>
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
