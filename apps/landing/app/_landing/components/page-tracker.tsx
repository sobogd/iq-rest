"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

export function PageTracker() {
  useEffect(() => {
    analytics.track("land_home_page_show_qr");

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = (entry.target as HTMLElement).dataset.section;
          if (!name || seen.has(name)) continue;
          seen.add(name);
          // Hero is always visible on first paint — its impression duplicates
          // the page_show event, so skip the dedicated section event.
          if (name !== "hero") {
            analytics.track(`land_home_section_show_${name}`);
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
