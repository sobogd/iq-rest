// Pull <slug>.iq-rest.com → "<slug>" (or ?slug= query for local dev).
export function resolveSlug(): string | null {
  const host = window.location.hostname;
  if (host.endsWith(".iq-rest.com")) {
    const sub = host.slice(0, -".iq-rest.com".length);
    if (sub && sub !== "www") return sub;
  }
  const q = new URLSearchParams(window.location.search).get("slug");
  return q || null;
}
