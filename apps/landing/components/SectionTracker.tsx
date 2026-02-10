"use client";

import { useEffect, useRef, ReactNode } from "react";
import { analytics } from "@/lib/analytics";

interface SectionTrackerProps {
  section: string;
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export function SectionTracker({
  section,
  children,
  className,
  threshold = 0.5
}: SectionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasViewed = useRef(false);
  const viewStartTime = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section came into view
            if (!hasViewed.current) {
              hasViewed.current = true;
              analytics.section.show(section);
            }
            viewStartTime.current = Date.now();
          } else {
            // Section left view - track time spent
            if (viewStartTime.current) {
              const timeSpent = Math.round((Date.now() - viewStartTime.current) / 1000);
              if (timeSpent >= 2) {
                analytics.section.timeSpent(section, timeSpent);
              }
              viewStartTime.current = null;
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      // Send final time spent on unmount if still viewing
      if (viewStartTime.current) {
        const timeSpent = Math.round((Date.now() - viewStartTime.current) / 1000);
        if (timeSpent >= 2) {
          analytics.section.timeSpent(section, timeSpent);
        }
      }
      observer.disconnect();
    };
  }, [section, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
