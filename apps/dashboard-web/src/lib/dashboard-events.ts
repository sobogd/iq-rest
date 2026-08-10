import { trackEvent, type TrackCtx } from "@/lib/analytics";

// Facade every dashboard call site imports. An event is an (action, name) pair
// — the page is always "Dashboard", stamped by the transport.
export function track(action: string, name: string, ctx?: TrackCtx): void {
  trackEvent(action, name, ctx);
}
