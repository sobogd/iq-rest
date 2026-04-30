"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

interface PageTrackerProps {
  variantIndex: number;
}

export function PageTracker({ variantIndex }: PageTrackerProps) {
  useEffect(() => {
    analytics.track(`land_home_page_show_${variantIndex + 1}`);

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = (entry.target as HTMLElement).dataset.section;
          if (!name || seen.has(name)) continue;
          seen.add(name);
          analytics.track(`land_home_section_show_${name}`);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [variantIndex]);

  return null;
}
