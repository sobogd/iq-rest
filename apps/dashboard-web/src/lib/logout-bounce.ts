import { apiUrl } from "./api-base";
import { landingUrl } from "./landing-url";

let bouncing = false;

/** Kill the session, then leave for the marketing landing.
 *
 *  The landing's middleware forwards any visitor carrying an `iqr_session`
 *  cookie straight back to the dashboard, so a plain `landingUrl` navigation
 *  is not enough once the session is (or should be) dead. `?loggedout=1`
 *  tells the landing middleware to expire the auth cookies itself and strip
 *  the param — the bounce stays loop-free even when the logout call below
 *  fails or is cut short by the navigation (`keepalive` normally lets it
 *  survive and clear the server-side session row too). */
export function logoutAndBounceToLanding(locale: string): void {
  bounce(locale, "/api/auth/logout");
}

/** Same bounce, but kills the session on every device the account is signed in
 *  on. Sessions live until an explicit logout, so this is the way out of a
 *  login left behind on a shared or lost device. */
export function logoutEverywhereAndBounceToLanding(locale: string): void {
  bounce(locale, "/api/auth/logout-all");
}

function bounce(locale: string, path: string): void {
  if (bouncing || typeof window === "undefined") return;
  bouncing = true;
  fetch(apiUrl(path), {
    method: "POST",
    credentials: "include",
    keepalive: true,
  }).catch(() => undefined);
  window.location.assign(`${landingUrl(locale || "en")}?loggedout=1`);
}
