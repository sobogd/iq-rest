import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { apiUrl } from "@/lib/api";
import { landingUrl } from "@/lib/landing-url";
import { FullPageLoader } from "@/components/full-page-loader";

/**
 * OAuth handoff landing. The Google/Apple full-page callback redirects here
 * with a one-time code in the URL fragment (`#ott=...`). We exchange it via a
 * first-party XHR that sets the session cookie reliably — this is the only step
 * that works inside in-app webviews and Safari, where a cookie set during the
 * cross-domain OAuth redirect bounce gets dropped. On success we go to the
 * dashboard; on any failure back to the landing sign-in.
 */
function AuthHandoff() {
  const { locale } = Route.useParams();

  useEffect(() => {
    const loc = locale || "en";
    const ott = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("ott");
    if (!ott) {
      window.location.replace(landingUrl(loc));
      return;
    }
    (async () => {
      try {
        const res = await fetch(apiUrl("/auth/handoff"), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ott }),
        });
        if (!res.ok) throw new Error("handoff failed");
        // Cookie is now set first-party — strip the code from the URL and enter.
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
