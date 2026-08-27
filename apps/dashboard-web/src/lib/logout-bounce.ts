import { apiUrl } from "./api";
import { landingUrl } from "./landing-url";

let bouncing = false;

/** Clear the session server-side, THEN leave for the marketing landing.
 *
 *  The landing's middleware forwards any visitor who still carries an
 *  `iqr_session` cookie straight back to the dashboard, so the cookie must be
 *  gone before we navigate — the logout call is awaited (bounded at 1.5s).
 *  The target also carries `?loggedout=1` as a belt-and-braces loop breaker
 *  in case the logout call failed and the cookie survived. */
export async function logoutAndBounceToLanding(locale: string): Promise<void> {
  if (bouncing || typeof window === "undefined") return;
  bouncing = true;
  try {
    await Promise.race([
      fetch(apiUrl("/api/auth/logout"), { method: "POST", credentials: "include" }),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);
  } catch {
    // Cookie may have survived; ?loggedout=1 still stops the landing redirect.
  }
  const url = new URL(landingUrl(locale || "en"));
  url.searchParams.set("loggedout", "1");
  window.location.assign(url.toString());
}
