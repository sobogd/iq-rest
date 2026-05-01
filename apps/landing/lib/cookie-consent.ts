// Lightweight client-side helpers for the cookie consent banner. Storage is a single
// first-party cookie `cookie_consent` with one of three states; the banner reads it on mount
// to decide whether to render and analytics modules read it before sending any events.

export type ConsentState = "accepted" | "rejected" | null;

const COOKIE_NAME = "cookie_consent";
const ONE_YEAR_DAYS = 365;

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function getConsent(): ConsentState {
  const v = readCookie(COOKIE_NAME);
  if (v === "accepted" || v === "rejected") return v;
  return null;
}

export function setConsent(state: "accepted" | "rejected"): void {
  setCookie(COOKIE_NAME, state, ONE_YEAR_DAYS);
  // Notify same-tab listeners so the banner can hide and analytics can re-evaluate without a reload.
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: state }));
  }
}

export function hasAnalyticsConsent(): boolean {
  return getConsent() === "accepted";
}
