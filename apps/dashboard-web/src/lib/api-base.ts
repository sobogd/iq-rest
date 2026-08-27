import { isKioskHost } from "./device-mode";

// Leaf module (no imports from api.ts / logout-bounce.ts) so both can share
// the API origin without a circular dependency.
// Admin SPA talks to dashboard-api.iq-rest.com cross-origin (VITE_API_URL
// is absolute in prod). Kiosk hosts (k.*/w.*) talk same-origin through
// their own nginx /api → localhost:8130 proxy so EventSource doesn't
// need CORS + withCredentials acrobatics.
export const BASE = isKioskHost() ? "/api" : (import.meta.env.VITE_API_URL || "/api");

/** Build a full API URL from a path that may start with `/` or `/api/`.
 *  Use this for raw fetch() calls that bypass the api() wrapper. */
export function apiUrl(path: string): string {
  const stripped = path.replace(/^\/api(\/|$)/, "/");
  const clean = stripped.startsWith("/") ? stripped : `/${stripped}`;
  return `${BASE}${clean}`;
}
