import { toast } from "sonner";
import i18n from "@/i18n";
import { ApiError } from "./api";
import { track } from "./dashboard-events";

// Shows a generic, translated error toast and records an Error event whose
// name encodes what failed and why — "Item save 409 slug_taken" — so the exact
// cause is readable straight from the admin timeline.
//
// The slug is the backend message trimmed/sanitised; combinatorial explosion is
// a known trade-off, taken deliberately.
export function showApiError(err: unknown, label: string): void {
  // i18next is configured with a single `translation` namespace whose value
  // is the locale's whole JSON — so the namespace argument is omitted and the
  // full dotted path is passed to `t()`. The previous `getFixedT(null, "ns")`
  // tried to scope to a non-existent namespace and consistently returned the
  // raw key.
  const t = i18n.t.bind(i18n);

  let status = 0;
  let message = "unknown_error";
  if (err instanceof ApiError) {
    status = err.status;
    message = err.message || "unknown_error";
  } else if (err instanceof Error) {
    message = err.message || "unknown_error";
  }

  const slug = sanitiseForEventName(message);
  // The ingest endpoint caps names at 120 chars.
  track("Error", `${label} ${status || "net"} ${slug}`.slice(0, 120));

  toast.error(t("dashboard.common.genericErrorTitle") as string, {
    description: t("dashboard.common.genericErrorMessage") as string,
  });

  // eslint-disable-next-line no-console
  console.error(`[api] ${label} failed:`, err);
}

function sanitiseForEventName(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80) || "error";
}
