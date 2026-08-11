import { apiUrl } from "@/lib/api";
import { isKioskHost } from "@/lib/device-mode";

// Analytics v2: every event is a page/action/name/ts quad POSTed to
// dashboard-api /api/e. The whole dashboard reports under one page
// ("Dashboard") — the name carries the detail — so the admin can filter the
// product surface with a single predicate.
//
// Wire shape is deliberately CORS-*simple*: text/plain body (a JSON string) so
// the browser never fires an OPTIONS preflight, and a short opaque path —
// readable "track"-style paths are blocked by common ad-blocker filter lists.
//
// The server derives the visit itself (salt-hash of ip+ua, promoted to the
// signed-in identity via the session cookie); nothing is stored on the device.

const PAGE = "Dashboard";
const ENDPOINT = "/api/e";
const CONTENT_TYPE = "text/plain;charset=UTF-8";

const SEARCH_HOST_REGEX =
  /(?:^|\.)(google|bing|yandex|duckduckgo|yahoo|baidu|ecosia|qwant|startpage|mojeek|brave)\.[a-z.]+$/i;

// One-shot referrer stamp per tab session. The first batch of the tab reads
// document.referrer; the rest skip it. A full reload re-arms the flag.
let referrerConsumed = false;

function searchReferrerHost(): string | null {
  try {
    const ref = document.referrer;
    if (!ref) return null;
    const host = new URL(ref).hostname;
    return SEARCH_HOST_REGEX.test(host) ? host : null;
  } catch {
    return null;
  }
}

export interface TrackCtx {
  from?: string;
  ref?: string;
}

// The dashboard is chatty (a save is focus → click → save within a second), so
// events are buffered and posted in batches: one request instead of ten, one
// identity resolution per batch server-side, and no 429s against the endpoint's
// 10 req/s burst limit.
const FLUSH_MS = 2000;
const MAX_BATCH = 20;
// The server rejects anything larger, so this is the hard ceiling for the
// one-shot unload beacon (which should drain as much as it legally can).
const MAX_SERVER_BATCH = 50;
// A dead network must not grow the queue without bound; past this we drop the
// oldest events, which are also the least interesting ones.
const MAX_QUEUE = 100;
const RETRY_DELAYS_MS = [2000, 5000, 15000];

interface QueuedEvent {
  page: string;
  action: string;
  name: string;
  /** Epoch ms of the interaction, not of the request — a batch can sit in the
   *  queue through a retry backoff and must still land on the right minute. */
  ts: number;
}

let queue: QueuedEvent[] = [];
let pendingCtx: TrackCtx | undefined;
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let retryTimer: ReturnType<typeof setTimeout> | null = null;
let sending = false;
let retries = 0;
// Visit continuation token from the last ingest response. Lives ONLY in this
// module variable — never in a cookie or any storage (the pipeline stays
// consentless). Echoed on every batch so a mid-visit device-hash flap (mobile
// IP prefix / Cloudflare geo changing between requests) cannot split the
// visit. Dies with the page; the server falls back to the hash.
let visitToken: string | null = null;

function body(events: QueuedEvent[], ctx: TrackCtx | undefined): string {
  return JSON.stringify({
    events,
    ...(ctx ? { ctx } : {}),
    ...(visitToken ? { tok: visitToken } : {}),
  });
}

/** Timer callback: the handle is spent, so clear it before sending — the
 *  scheduler checks it to decide whether a flush is already pending. */
function timedFlush(): void {
  flushTimer = null;
  send();
}

function clearTimers(): void {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (retryTimer) {
    clearTimeout(retryTimer);
    retryTimer = null;
  }
}

/** Put a batch the server never acknowledged back at the FRONT of the queue —
 *  it happened before whatever arrived while the request was in flight. */
function requeue(events: QueuedEvent[], ctx: TrackCtx | undefined): void {
  queue = events.concat(queue);
  if (queue.length > MAX_QUEUE) queue = queue.slice(queue.length - MAX_QUEUE);
  // Spread the returned ctx FIRST so anything collected meanwhile — which is
  // newer, and therefore more accurate — wins.
  if (ctx) pendingCtx = { ...ctx, ...pendingCtx };
}

function onFailure(events: QueuedEvent[], ctx: TrackCtx | undefined): void {
  requeue(events, ctx);
  if (retries >= RETRY_DELAYS_MS.length) {
    // Out of fast retries. The batch stays queued (bounded) and rides along
    // with the next organic flush instead of hammering a broken endpoint.
    retries = 0;
    return;
  }
  const delay = RETRY_DELAYS_MS[retries];
  retries += 1;
  retryTimer = setTimeout(() => {
    retryTimer = null;
    send();
  }, delay);
}

function send(): void {
  // One request at a time: a second one would reorder the queue and double the
  // server's identity resolution for nothing.
  if (sending || queue.length === 0) return;
  const events = queue.slice(0, MAX_BATCH);
  const ctx = pendingCtx;
  queue = queue.slice(MAX_BATCH);
  pendingCtx = undefined;
  sending = true;
  fetch(apiUrl(ENDPOINT), {
    method: "POST",
    headers: { "Content-Type": CONTENT_TYPE },
    body: body(events, ctx),
    credentials: "include",
    // Survives the tab closing mid-flight.
    keepalive: true,
  })
    .then((res) => {
      if (res.ok) {
        // The server answers with a fresh visit continuation token.
        void res
          .json()
          .then((d: unknown) => {
            const v = (d as { v?: unknown } | null)?.v;
            if (typeof v === "string") visitToken = v;
          })
          .catch(() => {});
        retries = 0;
        return;
      }
      // 400 means the payload itself was refused (bad shape, stale ts) —
      // resending the same bytes can only fail again, so drop it.
      if (res.status === 400) {
        retries = 0;
        return;
      }
      onFailure(events, ctx);
    })
    .catch(() => onFailure(events, ctx))
    .finally(() => {
      sending = false;
      // Drain whatever piled up while the request was in flight.
      if (queue.length > 0 && !flushTimer && !retryTimer) {
        flushTimer = setTimeout(timedFlush, FLUSH_MS);
      }
    });
}

/** Post everything buffered right now. Call this before anything that destroys
 *  the session cookie or leaves the page — the server resolves the identity per
 *  batch, so a batch sent after logout is recorded as an anonymous visit.
 *
 *  Goes out over the beacon path deliberately: `send()` is single-flight, so if
 *  a request happened to be in the air it would do nothing at all and the very
 *  events we are flushing for would land after the cookie is gone. */
export function flushEvents(): void {
  flushOnUnload();
}

/** Beacon path: the only transport the browser guarantees to deliver after the
 *  document is gone, and the only one that ignores the in-flight guard. Never
 *  retried — there is nothing left to retry from. */
function flushOnUnload(): void {
  clearTimers();
  // Drain the WHOLE queue in server-sized chunks — a single beacon tops out at
  // MAX_SERVER_BATCH, and anything left behind has nobody to send it once the
  // document is gone. Only the first chunk carries ctx (first-write-wins
  // server-side anyway).
  let ctx = pendingCtx;
  pendingCtx = undefined;
  while (queue.length > 0) {
    const events = queue.slice(0, MAX_SERVER_BATCH);
    queue = queue.slice(MAX_SERVER_BATCH);
    const payload = body(events, ctx);
    ctx = undefined;
    let queued = false;
    try {
      queued = navigator.sendBeacon(
        apiUrl(ENDPOINT),
        new Blob([payload], { type: "text/plain" }),
      );
    } catch {
      queued = false;
    }
    if (!queued) {
      // No beacon (or it refused the payload): keepalive fetch is the last
      // fire-and-forget option that can outlive the document.
      fetch(apiUrl(ENDPOINT), {
        method: "POST",
        headers: { "Content-Type": CONTENT_TYPE },
        body: payload,
        credentials: "include",
        keepalive: true,
      }).catch(() => {});
    }
  }
}

if (typeof window !== "undefined" && !isKioskHost()) {
  // Hooked once at module load, not lazily on first event — a tab that is
  // hidden before it ever fires an event still has a pending referrer stamp,
  // and a lazy hook would miss the only pagehide we get.
  //
  // pagehide fires on iOS Safari where unload does not.
  window.addEventListener("pagehide", flushOnUnload);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushOnUnload();
  });
}

/** Record one interaction. `action` is the verb ("Click", "Show", "Focus",
 *  "Save", "Toggle", "Open", "Error"), `name` the human-readable target. */
export function trackEvent(action: string, name: string, ctx?: TrackCtx): void {
  if (typeof window === "undefined") return;
  // KDS / waiter / reservation tablets are deliberately silent.
  if (isKioskHost()) return;

  if (!referrerConsumed) {
    referrerConsumed = true;
    const host = searchReferrerHost();
    if (host) pendingCtx = { ...pendingCtx, ref: host };
  }
  queue.push({ page: PAGE, action, name, ts: Date.now() });
  if (queue.length > MAX_QUEUE) queue = queue.slice(queue.length - MAX_QUEUE);
  if (ctx) pendingCtx = { ...pendingCtx, ...ctx };

  if (queue.length >= MAX_BATCH) {
    // A full batch goes out over the retryable path, not the beacon — this is
    // an ordinary flush, not a page teardown.
    clearTimers();
    send();
    return;
  }
  if (!flushTimer && !retryTimer) flushTimer = setTimeout(timedFlush, FLUSH_MS);
}
