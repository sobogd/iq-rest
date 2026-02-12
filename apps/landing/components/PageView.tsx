"use client";

import { useEffect, useRef } from "react";
import { analytics } from "@/lib/analytics";

interface PageViewProps {
  slug: string;
  variant?: string;
}

export function PageView({ slug, variant }: PageViewProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    const fullSlug = variant ? `${slug}_${variant}` : slug;
    analytics.page.view(fullSlug);
  }, [slug, variant]);

  return null;
}
