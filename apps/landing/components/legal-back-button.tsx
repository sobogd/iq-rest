"use client";

/** Back button for legal pages. Behaviour:
 *  - Tab has prior history (user clicked from somewhere) → window.history.back()
 *  - Tab opened directly (target="_blank" — history.length === 1) → window.close()
 *  - window.close() refused (older browser, tab not script-opened) → navigate
 *    to the locale home as a graceful fallback. */
export function LegalBackButton({ locale }: { locale: string }) {
  const onClick = () => {
    if (typeof window === "undefined") return;
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.close();
    // Browsers ignore close() on tabs not opened by JS. Fall back to the
    // locale home after a tick so the user isn't stranded.
    setTimeout(() => {
      window.location.assign(`/${locale}`);
    }, 100);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8"
    >
      ← iq-rest.com
    </button>
  );
}
