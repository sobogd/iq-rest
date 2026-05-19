"use client";

import { useLocale, useTranslations } from "next-intl";
import { dashboardUrl } from "@/lib/dashboard-url";
import { analytics } from "@/lib/analytics";
import { useLandingAuth } from "./use-landing-auth";
import { useOnboardingModal } from "./onboarding-modal-provider";

type PrimaryCta = {
  /** True once we've confirmed the visitor has a valid session. */
  authenticated: boolean;
  /** Click handler — opens modal for guests, navigates to dashboard for signed-in. */
  onClick: (trackEvent?: string) => void;
  /** Label to show on the primary CTA. */
  label: string;
  /** Plain dashboard URL — useful when rendering as <a href> for SEO. */
  dashHref: string;
};

/** Single source of truth for the primary CTA on the landing.
 *  Guest → opens the onboarding modal. Signed-in → goes to the dashboard. */
export function usePrimaryCta(defaultLabel: string): PrimaryCta {
  const auth = useLandingAuth();
  const modal = useOnboardingModal();
  const locale = useLocale();
  const t = useTranslations("auth");

  const dashHref = auth.legacyDashboard
    ? `/${locale}/dashboard`
    : `${dashboardUrl()}/${locale}/dashboard`;

  const onClick = (trackEvent?: string) => {
    if (trackEvent) analytics.track(trackEvent);
    if (auth.authenticated) {
      window.location.assign(dashHref);
    } else {
      modal.open();
    }
  };

  return {
    authenticated: auth.authenticated,
    onClick,
    label: auth.authenticated ? t("goToDashboard") : defaultLabel,
    dashHref,
  };
}
