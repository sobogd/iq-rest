"use client";

import { ChevronDown } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface ScrollToFeaturesProps {
  label: string;
}

export function ScrollToFeatures({ label }: ScrollToFeaturesProps) {
  return (
    <a
      href="#features"
      className="absolute bottom-4 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      onClick={() => analytics.track("land_scroll_to_section")}
    >
      <span className="text-base">{label}</span>
      <ChevronDown className="w-5 h-5 animate-bounce" />
    </a>
  );
}
