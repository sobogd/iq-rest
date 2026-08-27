import { useEffect } from "react";
import { useLocale } from "next-intl";
import { landingUrl } from "@/lib/landing-url";
import { logoutAndBounceToLanding } from "@/lib/logout-bounce";

/** Redirects to the marketing landing on mount. Used wherever the dashboard
 *  previously rendered AuthPage — sign-in/sign-up now lives on the landing.
 *  NOTE: keeps the session alive — a signed-in visitor will be forwarded
 *  back to the dashboard by the landing middleware, which is the desired
 *  outcome for login/otp views. For logout views use LogoutRedirect. */
export function LandingRedirect() {
  const locale = useLocale();
  useEffect(() => {
    window.location.assign(landingUrl(locale || "en"));
  }, [locale]);
  return null;
}

/** Logout views: kill the session FIRST, then go to the landing — a plain
 *  LandingRedirect would arrive with a live cookie and be forwarded straight
 *  back into the dashboard by the landing middleware. */
export function LogoutRedirect() {
  const locale = useLocale();
  useEffect(() => {
    logoutAndBounceToLanding(locale || "en");
  }, [locale]);
  return null;
}
