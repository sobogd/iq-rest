"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

const SKIP_SECTIONS = new Set(["scan"]);

interface PageTrackerProps {
  eventPrefix?: string;
}

export function PageTracker({ eventPrefix = "land_home_section_show_" }: PageTrackerProps = {}) {
  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = (entry.target as HTMLElement).dataset.section;
          if (!name || seen.has(name)) continue;
          seen.add(name);
          if (!SKIP_SECTIONS.has(name)) {
            analytics.track(`${eventPrefix}${name}`);
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [eventPrefix]);

  return null;
}
