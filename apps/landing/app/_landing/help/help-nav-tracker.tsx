"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

// Delegated click tracking for the help sidebar — one listener on the nav
// instead of a handler per anchor, so <HelpSidebar> stays a server component.
// Renders nothing; fires "Help nav: <id>" when an in-page anchor is clicked.
export function HelpNavTracker() {
  useEffect(() => {
    const nav = document.querySelector("[data-help-nav]");
    if (!nav) return;
    const onClick = (e: Event) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      if (anchor && nav.contains(anchor)) {
        analytics.track("Click", `Help nav: ${anchor.getAttribute("href")!.slice(1)}`);
      }
    };
    nav.addEventListener("click", onClick);
    return () => nav.removeEventListener("click", onClick);
  }, []);
  return null;
}
