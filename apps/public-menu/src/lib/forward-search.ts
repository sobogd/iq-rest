// Per-tab persistence for table + preview flags. Seeded once from the URL
// at app mount and then read directly from sessionStorage everywhere — no
// per-Link forwarding, no URL-search juggling.

const TABLE_KEY = "iqr_table";
const PREVIEW_KEY = "iqr_preview";

// Call once at app startup. URL wins if it has values; otherwise existing
// sessionStorage values are kept untouched.
export function bootstrapSessionFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const table = params.get("table");
  if (table) sessionStorage.setItem(TABLE_KEY, table);
  const preview = params.get("preview");
  if (preview) sessionStorage.setItem(PREVIEW_KEY, preview);
}

export function getTableNumber(): string | null {
  return sessionStorage.getItem(TABLE_KEY);
}

export function getPreview(): string | null {
  return sessionStorage.getItem(PREVIEW_KEY);
}
