"use client";

import { ChevronDown } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface ScrollToDemoProps {
  label: string;
}

export function ScrollToDemo({ label }: ScrollToDemoProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    analytics.marketing.demoScrollArrow();
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      const phone = document.getElementById("demo-phone");
      if (!phone) return;
      const phoneBottom = phone.getBoundingClientRect().bottom + window.scrollY;
      const top = phoneBottom - window.innerHeight + 40;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      const section = document.getElementById("demo");
      if (!section) return;
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <a
      href="#demo"
      className="absolute bottom-4 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <span className="text-base">{label}</span>
      <ChevronDown className="w-5 h-5 animate-bounce" />
    </a>
  );
}
