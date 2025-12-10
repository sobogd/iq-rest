"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDashboard } from "../_context/dashboard-context";

export function SiteHeader() {
  const { activePage, translations } = useDashboard();

  return (
    <header className="flex h-16 md:h-[--header-height] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height]">
      <div className="flex w-full items-center pl-4 pr-6 md:px-6 gap-4">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-6 md:data-[orientation=vertical]:h-4"
        />
        <h1 className="text-xl md:text-base font-semibold">{translations.pages[activePage]}</h1>
      </div>
    </header>
  );
}
