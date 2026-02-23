"use client";

import { useEffect, useRef, ReactNode } from "react";
import { analytics } from "@/lib/analytics";

interface SectionTrackerProps {
  section: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionTracker({
  section,
  children,
  className,
  id
}: SectionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasViewed = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const check = () => {
      if (hasViewed.current) return;
      const rect = element.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      if (sectionCenter <= viewportCenter) {
        hasViewed.current = true;
        analytics.section.view(section);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [section]);

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
