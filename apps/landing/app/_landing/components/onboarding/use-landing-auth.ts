"use client";

import { useEffect, useState } from "react";
import { dashboardApi } from "@/lib/dashboard-url";

type AuthState = {
  loading: boolean;
  authenticated: boolean;
  legacyDashboard: boolean;
};

const GUEST: AuthState = { loading: false, authenticated: false, legacyDashboard: false };

// Non-httpOnly hint cookie set alongside the session token. Presence = "maybe logged in",
// absence = "definitely guest" (the session cookie has the same lifetime). Used to skip
// the /api/auth/check round-trip for visitors who are obviously not signed in.
function hasSessionHintCookie(): boolean {
  if (typeof document === "undefined") return false;
  return /(?:^|;\s*)iqr_email=/.test(document.cookie);
}

export function useLandingAuth(): AuthState {
  const [state, setState] = useState<AuthState>(() =>
    typeof document === "undefined" || hasSessionHintCookie()
      ? { loading: true, authenticated: false, legacyDashboard: false }
      : GUEST,
  );

  useEffect(() => {
    // No hint cookie → no point in calling the API.
    if (!hasSessionHintCookie()) {
      setState(GUEST);
      return;
    }
    let cancelled = false;
    fetch(dashboardApi("/api/auth/check"), { credentials: "include", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        setState({
          loading: false,
          authenticated: !!data?.authenticated,
          legacyDashboard: !!data?.legacyDashboard,
        });
      })
      .catch(() => {
        if (!cancelled) setState(GUEST);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
