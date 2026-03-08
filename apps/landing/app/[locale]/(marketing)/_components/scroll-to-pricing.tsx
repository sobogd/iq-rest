"use client";

import { ChevronDown } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface ScrollToPricingProps {
  label: string;
}

export function ScrollToPricing({ label }: ScrollToPricingProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    analytics.marketing.scrollToSection("pricing");
    const section = document.getElementById("pricing");
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <a
      href="#pricing"
      className="absolute bottom-4 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <span className="text-base">{label}</span>
      <ChevronDown className="w-5 h-5 animate-bounce" />
    </a>
  );
}
