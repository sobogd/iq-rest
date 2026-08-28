"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronRightIcon } from "../_v2/icons";
import { track } from "@/lib/dashboard-events";
import { flushEvents } from "@/lib/analytics";
import { logoutAndBounceToLanding, logoutEverywhereAndBounceToLanding } from "@/lib/logout-bounce";

export function LogoutLink() {
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
 <button
 type="button"
 onClick={handle}
 disabled={busy}
 className="w-full text-left p-4 bg-card border border-border rounded-xl transition-colors flex items-center justify-between gap-3 disabled:opacity-60"
 >
 <div className="min-w-0">
 <div className="text-sm font-medium text-red-600">{busy ? t("loggingOut") : t("logout")}</div>
 <div className="text-xs text-muted-foreground leading-snug mt-0.5">{t("logoutDesc")}</div>
 </div>
 <ChevronRightIcon size={16} className="text-muted-foreground shrink-0" />
 </button>
 );
}

/** Sign out of every device. A session now lasts until it is explicitly ended,
 *  so this is the only way to drop a login left on a device you no longer
 *  have. Same bounce as LogoutLink — the landing clears the cookies. */
export function LogoutAllLink() {
 const t = useTranslations("dashboard.settingsHub");
 const locale = useLocale();
 const [busy, setBusy] = useState(false);

 function handle() {
 if (busy) return;
 if (!window.confirm(t("logoutAllConfirm"))) return;
 track("Click", "LogoutAll");
 flushEvents();
 setBusy(true);
 logoutEverywhereAndBounceToLanding(locale);
 }

 return (
 <button
 type="button"
 onClick={handle}
 disabled={busy}
 className="w-full text-left p-4 bg-card border border-border rounded-xl transition-colors flex items-center justify-between gap-3 disabled:opacity-60"
 >
 <div className="min-w-0">
 <div className="text-sm font-medium text-red-600">{busy ? t("loggingOut") : t("logoutAll")}</div>
 <div className="text-xs text-muted-foreground leading-snug mt-0.5">{t("logoutAllDesc")}</div>
 </div>
 <ChevronRightIcon size={16} className="text-muted-foreground shrink-0" />
 </button>
 );
}
