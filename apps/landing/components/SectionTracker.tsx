"use client";

import { useEffect, useRef, ReactNode } from "react";
import { analytics } from "@/lib/analytics";

interface SectionTrackerProps {
  section: string;
  children: ReactNode;
  className?: string;
  threshold?: number;
  id?: string;
}

export function SectionTracker({
  section,
  children,
  className,
  threshold = 0.5,
  id
}: SectionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasViewed = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasViewed.current) {
            hasViewed.current = true;
            analytics.section.view(section);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [section, threshold]);

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
