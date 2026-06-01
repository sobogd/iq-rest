// Resolve the restaurant slug for the current host.
//   1. Custom domains (love-breakfast.com) — nginx injects the slug into the
//      served HTML as `window.__MENU_SLUG__` via sub_filter, since the host
//      carries no <slug>.iq-rest.com to parse.
//   2. <slug>.iq-rest.com — parse the subdomain.
//   3. ?slug= query — local dev / fallback.
declare global {
  interface Window {
    __MENU_SLUG__?: string;
  }
}

export function resolveSlug(): string | null {
  const injected = window.__MENU_SLUG__;
  if (typeof injected === "string" && injected && injected !== "__MENU_SLUG__") {
    return injected;
  }

  const host = window.location.hostname;
  if (host.endsWith(".iq-rest.com")) {
    const sub = host.slice(0, -".iq-rest.com".length);
    if (sub && sub !== "www") return sub;
  }
  const q = new URLSearchParams(window.location.search).get("slug");
  return q || null;
}
