"use client";

import { ReactNode } from "react";
import { RestaurantProvider } from "./restaurant-context";
import { RestaurantsProvider } from "./restaurants-context";
import { SubProvider, type Sub } from "./sub-context";
import { Sidebar, SidebarProvider } from "./sidebar";
import type { Restaurant } from "./types";
import { useDashboardRouter } from "../_spa/router";

/**
 * App frame: a full-height flex row of [sidebar | content column]. Both
 * columns scroll independently; the document never scrolls. Every page
 * renders its own header + body through `Page` (see ./page.tsx).
 */
export function DashboardChrome({
  restaurant,
  sub,
  isAdmin,
  impersonatedBy,
  children,
}: {
  restaurant: Restaurant;
  sub: Sub;
  isAdmin: boolean;
  impersonatedBy: string | null;
  children: ReactNode;
}) {
  const { view } = useDashboardRouter();
  const isAuth = view.name.startsWith("auth.");

  return (
    <RestaurantsProvider>
      <RestaurantProvider restaurant={restaurant}>
        <SubProvider sub={sub}>
          {isAuth ? (
            // Auth renders fullscreen — no sidebar, no page header.
            <div className="h-dvh bg-background antialiased tracking-tight">{children}</div>
          ) : (
            <SidebarProvider>
              <div className="h-dvh flex overflow-hidden bg-background antialiased tracking-tight">
                <Sidebar restaurant={restaurant} isAdmin={isAdmin} impersonatedBy={impersonatedBy} />
                <div className="flex-1 min-w-0 flex flex-col overflow-hidden">{children}</div>
              </div>
            </SidebarProvider>
          )}
        </SubProvider>
      </RestaurantProvider>
    </RestaurantsProvider>
  );
}
