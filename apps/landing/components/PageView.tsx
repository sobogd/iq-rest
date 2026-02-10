"use client";

import { useEffect, useRef } from "react";
import { analytics } from "@/lib/analytics";

interface PageViewProps {
  slug: string;
}

export function PageView({ slug }: PageViewProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    analytics.pageView(slug);
  }, [slug]);

  return null;
}
