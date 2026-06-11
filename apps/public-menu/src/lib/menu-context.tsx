import { createContext, useContext, ReactNode } from "react";
import type { MenuPayload } from "./types";

const MenuContext = createContext<MenuPayload | null>(null);

export function MenuProvider({ menu, children }: { menu: MenuPayload; children: ReactNode }) {
  return <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>;
}

export function useMenu(): MenuPayload {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be inside <MenuProvider>");
  return ctx;
}
