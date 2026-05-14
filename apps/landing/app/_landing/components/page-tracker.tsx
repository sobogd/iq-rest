"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

/** Section-impression tracker. The page-mount event (`land_home_page_show_qr`)
 *  and the `scan` section impression are intentionally dropped — page-view
 *  signal lives on `land_page_<locale>_<page>` from middleware, and the scan
 *  section sits right under the hero so its impression duplicated the
 *  page-mount event. Other sections still emit `land_home_section_show_<name>`
 *  once they cross 30% viewport. */
const SKIP_SECTIONS = new Set(["hero", "scan"]);

export function PageTracker() {
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
