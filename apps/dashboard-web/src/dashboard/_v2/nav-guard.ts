// Global unsaved-changes navigation guard. A page with dirty state registers
// an interceptor (one at a time — pages are exclusive); the sidebar/drawer
// NavList consults it before navigating. The interceptor returns true when it
// takes over (shows its own unsaved-changes dialog) and later calls `proceed`
// to resume the blocked navigation, or drops it to cancel.

type NavInterceptor = (proceed: () => void) => boolean;

let interceptor: NavInterceptor | null = null;

export function setNavInterceptor(next: NavInterceptor | null) {
  interceptor = next;
}

/** Returns true when navigation was intercepted (caller must bail out). */
export function interceptNav(proceed: () => void): boolean {
  return interceptor ? interceptor(proceed) : false;
}
