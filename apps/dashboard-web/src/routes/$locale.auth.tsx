import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { apiUrl } from "@/lib/api";
import { landingUrl } from "@/lib/landing-url";
import { FullPageLoader } from "@/components/full-page-loader";

/**
 * Token-in-fragment auth landing. Two producers redirect here:
 *  - the Google/Apple full-page OAuth callback with a one-time code
 *    (`#ott=...`, exchanged via POST /auth/handoff);
 *  - the "Open dashboard" button in the admin-sent welcome email with a
 *    permanent auto-login token (`#lt=...`, exchanged via POST /auth/email-login).
 * Either way we exchange it via a first-party XHR that sets the session cookie
 * reliably — this is the only step that works inside in-app webviews and
 * Safari, where a cookie set during a cross-domain redirect bounce gets
 * dropped. On success we go to the dashboard; on any failure back to the
 * landing sign-in.
 */
function AuthHandoff() {
  const { locale } = Route.useParams();

  useEffect(() => {
    const loc = locale || "en";
    const fragment = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const ott = fragment.get("ott");
    const lt = fragment.get("lt");
    if (!ott && !lt) {
      window.location.replace(landingUrl(loc));
      return;
    }
    (async () => {
      try {
        const res = await fetch(apiUrl(ott ? "/auth/handoff" : "/auth/email-login"), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ott ? { ott } : { token: lt }),
        });
        if (!res.ok) throw new Error("auth exchange failed");
        // Cookie is now set first-party — strip the token from the URL and enter.
        window.location.replace(`/${loc}/dashboard`);
      } catch {
        window.location.replace(landingUrl(loc));
      }
    })();
  }, [locale]);

  return <FullPageLoader />;
}

export const Route = createFileRoute("/$locale/auth")({
  component: AuthHandoff,
});
