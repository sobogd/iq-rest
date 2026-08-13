"use client";

import { useRouter } from "next/navigation";
import { useLandingLocale } from "../../lib/landing-strings";
import { dashboardUrl } from "@/lib/dashboard-url";
import { analytics } from "@/lib/analytics";
import { useLandingAuth } from "./use-landing-auth";

type PrimaryCta = {
  /** True once we've confirmed the visitor has a valid session. */
  authenticated: boolean;
  /** Click handler — opens modal for guests, navigates to dashboard for signed-in. */
  onClick: (trackName?: string) => void;
  /** Label to show on the primary CTA. */
  label: string;
  /** Plain dashboard URL — useful when rendering as <a href> for SEO. */
  dashHref: string;
};

/** Single source of truth for the primary CTA on the landing.
 *  Guest → navigates to the auth page. Signed-in → goes to the dashboard. */
export function usePrimaryCta(defaultLabel: string): PrimaryCta {
  const auth = useLandingAuth();
  const router = useRouter();
  const locale = useLandingLocale();

  const dashHref = auth.legacyDashboard
    ? `/${locale}/dashboard`
    : `${dashboardUrl()}/${locale}/dashboard`;

  const onClick = (trackName?: string) => {
    if (trackName) analytics.track("Click", trackName);
    if (auth.authenticated) {
      // Cross-origin hop — get the buffered events out before the document is
      // discarded, otherwise the click that converted is the one we lose.
      analytics.flush();
      window.location.assign(dashHref);
    } else {
      // Onboarding (cuisine + name) is temporarily skipped — the auth page
      // opens directly with register copy. The API seeds a default "My restaurant".
      router.push(`/${locale}/register`);
    }
  };

  return {
    authenticated: auth.authenticated,
    onClick,
    // Label never swaps to "Go to dashboard" here — only the header does that
    // relabel for signed-in visitors. Section CTAs keep their marketing copy
    // (the click still routes a signed-in visitor to the dashboard).
    label: defaultLabel,
    dashHref,
  };
}
