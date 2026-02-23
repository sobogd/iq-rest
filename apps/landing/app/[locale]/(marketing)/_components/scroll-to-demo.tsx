"use client";

import { ChevronDown } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface ScrollToDemoProps {
  label: string;
}

export function ScrollToDemo({ label }: ScrollToDemoProps) {
  return (
    <a
      href="#demo"
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      onClick={() => analytics.marketing.demoScrollArrow()}
    >
      <span className="text-sm">{label}</span>
      <ChevronDown className="w-5 h-5 animate-bounce" />
    </a>
  );
}
