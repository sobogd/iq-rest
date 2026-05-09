// Returns search params that must survive every internal navigation:
// `?table=N` (QR-code provided) and `?preview=1` (dashboard preview mode).
// Read from window.location.search rather than TanStack's useSearch so it
// works for any route regardless of typed search schemas.
export function useForwardedSearch(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  const table = params.get("table");
  if (table) out.table = table;
  const preview = params.get("preview");
  if (preview) out.preview = preview;
  return out;
}
