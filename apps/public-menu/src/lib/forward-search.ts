// Search params that must survive every internal navigation:
// `?table=N` (provided by the QR code) and `?preview=1` (dashboard preview
// mode). Read straight from the URL — every Link / navigate() call inside
// the SPA must spread the result of useForwardedSearch() into its `search`.

export function getTableNumber(): string | null {
  return new URLSearchParams(window.location.search).get("table");
}

export function getPreview(): string | null {
  return new URLSearchParams(window.location.search).get("preview");
}

export function useForwardedSearch(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  const table = params.get("table");
  if (table) out.table = table;
  const preview = params.get("preview");
  if (preview) out.preview = preview;
  return out;
}
