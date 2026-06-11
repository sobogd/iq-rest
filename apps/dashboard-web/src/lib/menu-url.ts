function viteEnv(): Record<string, string | undefined> {
  return (import.meta as { env?: Record<string, string | undefined> }).env || {};
}

/** Origin of the dashboard SPA itself (used in share/about contexts that point at the admin app). */
export function getAppOrigin(): string {
  const env = viteEnv();
  return env.VITE_APP_URL || env.NEXT_PUBLIC_APP_URL || window.location.origin;
}

/** Apex domain of the public QR menu (e.g. "iq-rest.com"). Each restaurant
 *  is served from `<slug>.<apex>` by the new public-menu SPA. */
function getPublicMenuApex(): string {
  const env = viteEnv();
  // VITE_PUBLIC_MENU_APEX overrides for local/dev. Falls back to iq-rest.com.
  return env.VITE_PUBLIC_MENU_APEX || "iq-rest.com";
}

/** Full URL of a restaurant's public menu.
 *  Prod: `https://<slug>.iq-rest.com` (subdomain per restaurant).
 *  Local dev: the public menu runs as a single origin and resolves the
 *  restaurant via `?slug=` — so we point at `VITE_PUBLIC_MENU_URL` directly.
 *  The `import.meta.env.DEV` guard keeps prod builds on the subdomain form
 *  regardless of what `VITE_PUBLIC_MENU_URL` is set to. */
export function getMenuUrl(slug: string): string {
  const env = viteEnv();
  if (env.DEV && env.VITE_PUBLIC_MENU_URL) {
    const base = String(env.VITE_PUBLIC_MENU_URL).replace(/\/+$/, "");
    return `${base}/?slug=${encodeURIComponent(slug)}`;
  }
  return "https://" + slug + "." + getPublicMenuApex();
}

/** Display-friendly suffix shown after the slug input in settings, e.g. ".iq-rest.com" */
export function getMenuUrlPrefix(): string {
  return "." + getPublicMenuApex();
}
