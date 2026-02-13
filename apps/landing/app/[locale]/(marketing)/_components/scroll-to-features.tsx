"use client";

import { ChevronDown } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface ScrollToFeaturesProps {
  label: string;
}

export function ScrollToFeatures({ label }: ScrollToFeaturesProps) {
  const handleClick = () => {
    analytics.marketing.scrollToFeaturesClick();
  };

  return (
    <a
      href="#features"
      onClick={handleClick}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      <span className="text-sm">{label}</span>
      <ChevronDown className="w-5 h-5 animate-bounce" />
    </a>
  );
}
