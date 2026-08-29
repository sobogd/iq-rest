"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LogoutIcon } from "../_v2/icons";
import { navRow } from "../_v2/tokens";
import { track } from "@/lib/dashboard-events";
import { flushEvents } from "@/lib/analytics";
import { logoutAndBounceToLanding } from "@/lib/logout-bounce";

const ROW = navRow + " text-red-600 hover:text-red-600";

export function LogoutButton() {
  const t = useTranslations("dashboard.settingsHub");
  const locale = useLocale();
  const [busy, setBusy] = useState(false);

  function handle() {
    if (busy) return;
    track("Click", "Logout");
    // The server resolves the identity of a batch from the session cookie, so
    // anything still buffered when the logout kills it would be filed as an
    // anonymous visit. Ship it while we are still signed in.
    flushEvents();
    setBusy(true);
    // Loop-safe bounce: fires the logout (keepalive) and navigates with
    // ?loggedout=1 so the landing clears the cookies even if the call fails.
    logoutAndBounceToLanding(locale);
  }

  return (
    <button type="button" onClick={handle} disabled={busy} title={t("logoutDesc")} className={ROW}>
      <LogoutIcon size={16} className="shrink-0" />
      <span className="min-w-0 truncate">{busy ? t("loggingOut") : t("logout")}</span>
    </button>
  );
}
