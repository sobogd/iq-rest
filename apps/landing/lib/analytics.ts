// Thin wrapper around the central analytics API in dashboard-api.
//
// Two parallel sinks per track() call:
//   1. /pulse — cookieless aggregate counter (no sid/IP/UA persisted). Fires on
//      every track() regardless of consent — lawful without a banner because the
//      server stores only event×hour×country×region.
//   2. /event — sid-attributed event stream. Fires only after consent === "accepted".
//      Until then, no analytics_sid cookie is set on the device.

import { getConsent } from "./cookie-consent";

const API_BASE = "https://dashboard-api.iq-rest.com";
const GCLID_KEY = "analytics_gclid";
const SID_COOKIE = "analytics_sid";
const SID_REGEX =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|c[a-z0-9]{24})$/i;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function apexDomain(): string {
  const host = location.hostname;
  if (host === "iq-rest.com" || host.endsWith(".iq-rest.com")) return ".iq-rest.com";
  return host;
}

// Set the analytics_sid cookie synchronously *before* the first fetch goes
// out. Two events fired on the same tick would otherwise both hit the
// server without a cookie and the server would mint a UUID for each.
function ensureSid(): void {
  if (typeof document === "undefined") return;
  const existing = readCookie(SID_COOKIE);
  if (existing && SID_REGEX.test(existing)) return;
  const sid =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : Array.from(crypto.getRandomValues(new Uint8Array(16)))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("")
          .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
  const parts = [
    `${SID_COOKIE}=${sid}`,
    `domain=${apexDomain()}`,
    `path=/`,
    `max-age=${365 * 24 * 60 * 60}`,
    `SameSite=Lax`,
  ];
  if (location.protocol === "https:") parts.push("Secure");
  document.cookie = parts.join("; ");
}

function getGclid(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("gclid");
    if (fromUrl) {
      try { localStorage.setItem(GCLID_KEY, fromUrl); } catch {}
      return fromUrl;
    }
    return localStorage.getItem(GCLID_KEY);
  } catch {
    return null;
  }
}

function isAdminBrowser(): boolean {
  // Apex-domain cookie set by dashboard-web after admin login. Mirrors the
  // localStorage flag for cross-origin reach so admin sessions don't pollute
  // pulse / session analytics from the marketing site either.
  if (typeof document === "undefined") return false;
  const m = document.cookie.match(/(?:^|; )iq_admin=([^;]*)/);
  return !!m && m[1] === "1";
}

function track(event: string): void {
  if (typeof window === "undefined") return;
  if (isAdminBrowser()) return;

  // Cookieless pulse — always. occurredAt (UTC ms) preserves cross-event order
  // even when 4+ events fire within the same second from racing fetch() calls.
  fetch(`${API_BASE}/api/analytics/pulse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, occurredAt: Date.now() }),
    keepalive: true,
  }).catch(() => {});

  // Sid-attributed event — only after explicit accept.
  if (getConsent() !== "accepted") return;
  ensureSid();
  const gclid = getGclid();
  fetch(`${API_BASE}/api/analytics/event`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, occurredAt: new Date().toISOString(), ...(gclid ? { gclid } : {}) }),
    keepalive: true,
  }).catch(() => {});
}

function linkSession(_userId?: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (isAdminBrowser()) return Promise.resolve();
  if (getConsent() !== "accepted") return Promise.resolve();
  ensureSid();
  return fetch(`${API_BASE}/api/analytics/identify`, {
    method: "POST",
    credentials: "include",
    keepalive: true,
  })
    .then(() => undefined)
    .catch(() => undefined);
}

export const analytics = {
  track,
  linkSession,
};
