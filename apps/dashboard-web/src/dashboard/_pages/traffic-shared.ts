// Shared types for the admin Traffic screens (analytics-v2 pipeline).
// A row is one VISIT: it starts anonymous (day-scoped device hash) and is
// promoted in place to the signed-in identity the moment a session cookie
// resolves. Visits of the same human on other days are separate rows linked by
// userId — anonymous rows across salt-days stay unlinkable by construction.

export interface TrafficSession {
  id: string;
  firstAt: string;
  lastAt: string;
  device: string | null;
  os: string | null;
  country: string;
  region: string;
  city: string;
  lang: string | null;
  from: string | null;
  ref: string | null;
  /** Raw paid click id — nulled 7 days after the visit; `atype` outlives it. */
  aid: string | null;
  /** "F" = Facebook/Meta click, "G" = Google click. */
  atype: string | null;
  aidField: string | null;
  clickAt: string | null;
  eventCount: number;
  pageCount: number;
  firstPage: string | null;
  hasModal: boolean;
  hasRegister: boolean;
  /** Anonymous rows folded into this one after a mid-visit sign-in. */
  mergeCount: number;
  userId: string | null;
  userEmail: string | null;
  isDemo: boolean;
  /** All-time visits of this account, this one included (1 when signed out).
   *  Not window-scoped: a visit is now cut after 30 idle minutes, so the window
   *  count said more about the filter than about the human. */
  userVisits: number;
  /** Venues touched by the visit's events (a switcher can hit several). */
  restaurants: { id: string; title: string }[];
  convStatus: string | null;
  convNetwork: string | null;
}

export interface TrafficSessionList {
  sessions: TrafficSession[];
  /** The endpoint has no pagination — it cuts the window at `limit` rows and
   *  flags it, so the UI can say "this is not everything". */
  truncated: boolean;
  limit: number;
}

export interface TrafficEvent {
  id: string;
  page: string;
  action: string;
  name: string;
  restaurantId: string | null;
  restaurantTitle: string | null;
  /** Locale the page was rendered in, per event — a visit can cross locales. */
  locale: string | null;
  at: string;
}

export interface TrafficOtherVisit {
  id: string;
  firstAt: string;
  country: string;
  city: string;
  device: string | null;
}

export interface TrafficSend {
  id: string;
  network: string;
  status: string;
  response: unknown;
  createdAt: string;
}

export interface TrafficSessionDetail {
  session: TrafficSession & { hash: string };
  events: TrafficEvent[];
  sends: TrafficSend[];
  otherVisits: TrafficOtherVisit[];
}

/** "1m 20s" / "45s" / "1h 3m" — visit length from first to last event. */
export function duration(fromIso: string, toIso: string): string {
  const ms = new Date(toIso).getTime() - new Date(fromIso).getTime();
  const s = Math.max(0, Math.round(ms / 1000));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

/** Compact device label: "iOS mobile" → "📱 iOS". */
export function deviceShort(device: string | null, os: string | null): string {
  const emoji = device === "mobile" ? "📱" : device === "tablet" ? "📋" : "🖥";
  const label = os === "macos" ? "macOS" : os === "ios" ? "iOS" : os || device || "—";
  return `${emoji} ${label}`;
}

/** Where the visit came from, as one short chip label. */
export function sourceLabel(s: TrafficSession): string | null {
  if (s.atype === "F") return "FB";
  if (s.atype === "G") return "G";
  if (s.from) return s.from;
  if (s.ref) return s.ref.replace(/^www\./, "");
  return null;
}

export const pad = (n: number) => String(n).padStart(2, "0");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Local "3 Aug 12:13:14", with the year whenever it is not the current one —
 *  a 30-day window can straddle New Year, and "31 Dec" next to "1 Jan" is
 *  otherwise unreadable. */
export function hmsDate(iso: string): string {
  const d = new Date(iso);
  const year = d.getFullYear() === new Date().getFullYear() ? "" : ` ${d.getFullYear()}`;
  return `${d.getDate()} ${MONTHS[d.getMonth()]}${year} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/** ISO-3166 alpha-2 → flag emoji. The code must be normalised first: a
 *  lowercase "es" would offset into a random codepoint pair instead of falling
 *  back to the globe. */
export function countryToFlag(code: string): string {
  const cc = (code ?? "").trim().toUpperCase();
  if (cc === "XX" || !/^[A-Z]{2}$/.test(cc)) return "🌐";
  const A = 0x1f1e6;
  const a = "A".charCodeAt(0);
  return String.fromCodePoint(A + cc.charCodeAt(0) - a, A + cc.charCodeAt(1) - a);
}

// --- Return-to-list record -------------------------------------------------
// Opening a visit navigates away from the list; the SPA router carries no
// per-view state, so where the list was (scroll offset + the venue filter it
// was taken under) is parked in sessionStorage and picked up on the way back.

const RETURN_KEY = "traffic_return";
/** Long enough to read one visit, short enough that a record orphaned by a
 *  browser-back out of the SPA cannot hijack an unrelated later visit. */
const RETURN_TTL_MS = 30 * 60_000;

export interface TrafficReturn {
  scrollY: number;
  /** Venue filter the list was showing, so we come back to the same list. */
  restaurantId?: string;
  at: number;
}

export function writeTrafficReturn(rec: { scrollY: number; restaurantId?: string }): void {
  try {
    sessionStorage.setItem(RETURN_KEY, JSON.stringify({ ...rec, at: Date.now() }));
  } catch { /* ignore */ }
}

/** Reading the record must not consume it: the scroll restore happens on the
 *  list's next render, which is not the same tick as the read. */
function peekTrafficReturn(): TrafficReturn | null {
  try {
    const raw = sessionStorage.getItem(RETURN_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<TrafficReturn>;
    if (typeof v.scrollY !== "number" || typeof v.at !== "number") return null;
    if (Date.now() - v.at > RETURN_TTL_MS) return null;
    return { scrollY: v.scrollY, restaurantId: v.restaurantId, at: v.at };
  } catch {
    return null;
  }
}

/** Read and drop the record in one go, so a stale one can never be replayed. */
export function takeTrafficReturn(): TrafficReturn | null {
  const rec = peekTrafficReturn();
  try { sessionStorage.removeItem(RETURN_KEY); } catch { /* ignore */ }
  return rec;
}
