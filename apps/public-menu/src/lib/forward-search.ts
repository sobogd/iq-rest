// Persistence for search params that must survive every navigation:
// `?table=N` (provided by the QR code) and `?preview=1` (dashboard preview
// mode). Stored in sessionStorage so they live for the duration of the tab
// (one restaurant visit) and reset on tab close — sharing a link to a friend
// doesn't leak your table to them.

const TABLE_KEY = "iqr_table";
const PREVIEW_KEY = "iqr_preview";

function syncFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const table = params.get("table");
  if (table) sessionStorage.setItem(TABLE_KEY, table);
  const preview = params.get("preview");
  if (preview) sessionStorage.setItem(PREVIEW_KEY, preview);
}

// Read the current table number — URL takes priority; falls back to
// sessionStorage when the user lands on a route without the query param
// (e.g. after a language change or a hard refresh of /menu).
export function getTableNumber(): string | null {
  const fromUrl = new URLSearchParams(window.location.search).get("table");
  if (fromUrl) {
    sessionStorage.setItem(TABLE_KEY, fromUrl);
    return fromUrl;
  }
  return sessionStorage.getItem(TABLE_KEY);
}

export function getPreview(): string | null {
  const fromUrl = new URLSearchParams(window.location.search).get("preview");
  if (fromUrl) {
    sessionStorage.setItem(PREVIEW_KEY, fromUrl);
    return fromUrl;
  }
  return sessionStorage.getItem(PREVIEW_KEY);
}

// React hook: returns the search-params object to spread into <Link search>.
// Pulls from URL first, sessionStorage second.
export function useForwardedSearch(): Record<string, string> {
  syncFromUrl();
  const out: Record<string, string> = {};
  const table = getTableNumber();
  if (table) out.table = table;
  const preview = getPreview();
  if (preview) out.preview = preview;
  return out;
}
