"use client";

import { LinkForward } from "./link-forward";
import type { LandingTexts } from "../types";

interface MobileAnchorNavProps {
  texts: LandingTexts["header"];
}

/** Mobile-only chip-row mirroring the header anchor nav (which is hidden
 *  on mobile). Sits between Hero and ScanSection so visitors can jump to
 *  Features / How / Pricing / FAQ without scrolling through the SEO body. */
export function MobileAnchorNav({ texts }: MobileAnchorNavProps) {
  const links: { href: string; label: string; event: string }[] = [
    { href: "#features", label: texts.navFeatures, event: "land_mobile_nav_features_click" },
    { href: "#how", label: texts.navHow, event: "land_mobile_nav_how_click" },
    { href: "#pricing", label: texts.navPricing, event: "land_mobile_nav_pricing_click" },
    { href: "#faq", label: texts.navFaq, event: "land_mobile_nav_faq_click" },
  ];

  return (
    <nav
      aria-label="Sezioni"
      data-section="mobile-anchor-nav"
      className="md:hidden container mx-auto px-4 pt-0 pb-1"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
        {links.map((l) => (
          <LinkForward
            key={l.href}
            href={l.href}
            trackEvent={l.event}
            className="hover:text-foreground transition-colors"
          >
            {l.label}
          </LinkForward>
        ))}
      </div>
    </nav>
  );
}
