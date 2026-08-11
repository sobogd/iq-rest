"use client";

// Admin: traffic visits from the cookieless analytics-v2 pipeline
// (sessions_new / events_new) — landing and dashboard alike. List only, no
// aggregates; open a row for the full event timeline. Long-press (or
// right-click) enters select mode for deleting the admin's own visits.

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Trash2, X as XIcon, Check } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { RefreshIcon } from "../_v2/icons";
import { SubpageStickyBar } from "../_v2/ui";
import { useDashboardRouter } from "../_spa/router";
import { useScrollLock } from "../_v2/use-scroll-lock";
import {
  countryToFlag,
  hmsDate,
  deviceShort,
  duration,
  sourceLabel,
  takeTrafficReturn,
  writeTrafficReturn,
  type TrafficSession,
  type TrafficSessionList,
} from "./traffic-shared";

const WINDOW_DAYS = 30;
const LONG_PRESS_MS = 500;

const chip = "text-[10px] text-muted-foreground bg-secondary rounded px-1.5 py-0.5 shrink-0";

export function TrafficPage({ restaurantId }: { restaurantId?: string }) {
  const router = useDashboardRouter();
  const [toolbarHost, setToolbarHost] = useState<HTMLDivElement | null>(null);
  return (
    <div>
      <SubpageStickyBar onBack={() => router.push({ name: "settings" })} hideSave>
        <div ref={setToolbarHost} className="flex items-center gap-1" />
      </SubpageStickyBar>
      <div className="max-w-5xl mx-auto md:px-6 pt-5 md:pt-4">
        <TrafficList toolbarHost={toolbarHost} restaurantId={restaurantId} />
      </div>
    </div>
  );
}

// Module-level cache so returning from a session detail doesn't refetch. Keyed
// by the venue filter, since that changes what the list contains. Only ever
// written from a successful response: caching a failure would pin the screen
// empty forever, because the next mount would consider it fresh.
let cache: TrafficSessionList | null = null;
let cacheKey = "";

const EMPTY: TrafficSessionList = { sessions: [], truncated: false, limit: 0 };

export function invalidateTrafficCache() {
  cache = null;
}

function TrafficList({
  toolbarHost,
  restaurantId,
}: {
  toolbarHost?: HTMLElement | null;
  restaurantId?: string;
}) {
  const router = useDashboardRouter();
  const key = restaurantId ?? "";
  const fresh = cache !== null && cacheKey === key;
  const [data, setData] = useState<TrafficSessionList>(() => (fresh ? cache! : EMPTY));
  const [loading, setLoading] = useState(() => !fresh);
  const [error, setError] = useState<string | null>(null);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const sessions = data.sessions;

  // Lazily, exactly once: `useRef(takeTrafficReturn())` would hit sessionStorage
  // on every render and throw every result but the first away. The record only
  // applies to the list it was taken on, so a filtered/unfiltered mismatch is
  // dropped rather than scrolled to a meaningless offset.
  const returnScroll = useRef<number | null | undefined>(undefined);
  if (returnScroll.current === undefined) {
    const rec = takeTrafficReturn();
    returnScroll.current = rec && (rec.restaurantId ?? "") === key ? rec.scrollY : null;
  }

  // Guards the venue filter changing mid-flight: without it a slow answer for
  // the previous filter can land last and be cached under the new key.
  const reqSeq = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    const seq = ++reqSeq.current;
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams({
        from: new Date(Date.now() - WINDOW_DAYS * 864e5).toISOString(),
        to: new Date().toISOString(),
      });
      if (restaurantId) qs.set("restaurantId", restaurantId);
      const res = await fetch(apiUrl(`/api/admin/sessions?${qs.toString()}`), {
        credentials: "include",
        signal: ac.signal,
      });
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const j = (await res.json()) as Partial<TrafficSessionList>;
      if (seq !== reqSeq.current) return;
      const next: TrafficSessionList = {
        sessions: j.sessions ?? [],
        truncated: j.truncated === true,
        limit: j.limit ?? 0,
      };
      cache = next;
      cacheKey = key;
      setData(next);
    } catch (e) {
      if (ac.signal.aborted || seq !== reqSeq.current) return;
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      if (seq === reqSeq.current) setLoading(false);
    }
  }, [restaurantId, key]);

  useEffect(() => {
    if (cache !== null && cacheKey === key) {
      setData(cache);
      return;
    }
    void load();
  }, [load, key]);

  // Drop an in-flight request when the screen goes away, so its setState never
  // lands on an unmounted list.
  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (loading) return;
    if (returnScroll.current != null) {
      window.scrollTo({ top: returnScroll.current, behavior: "auto" });
      returnScroll.current = null;
    }
  }, [loading]);

  function exitSelect() {
    setSelectMode(false);
    setSelected(new Set());
  }

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function openSession(s: TrafficSession) {
    // Park where we are AND which list this is, so the detail can send us back
    // to the same (possibly venue-filtered) list at the same offset.
    writeTrafficReturn({ scrollY: window.scrollY, restaurantId });
    router.push({ name: "settings.admin.trafficSession", id: s.id, restaurantId });
  }

  async function applyDelete() {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(apiUrl("/api/admin/sessions/delete"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      // Keep the dialog open on failure — silently doing nothing reads as a
      // delete that worked until the rows reappear on the next refresh.
      if (!res.ok) {
        setDeleteError(`Delete failed (${res.status})`);
        return;
      }
      setConfirmOpen(false);
      exitSelect();
      await load();
    } catch {
      setDeleteError("Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  const toolbar = selectMode ? (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => selected.size > 0 && setConfirmOpen(true)}
        disabled={selected.size === 0 || deleting}
        className="h-8 inline-flex items-center gap-1.5 px-2.5 rounded-md bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 disabled:opacity-40 text-xs font-medium"
        title={`Delete ${selected.size}`}
      >
        <Trash2 className="h-3.5 w-3.5" /> {selected.size}
      </button>
      <button
        type="button"
        onClick={exitSelect}
        className="h-8 w-8 inline-flex items-center justify-center bg-secondary rounded-md text-muted-foreground hover:text-foreground"
        title="Cancel"
      >
        <XIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  ) : (
    <button
      type="button"
      onClick={() => void load()}
      disabled={loading}
      className="h-8 w-8 inline-flex items-center justify-center bg-secondary rounded-md text-muted-foreground hover:text-foreground disabled:opacity-60"
      title="Refresh"
    >
      <RefreshIcon size={14} className={loading ? "animate-spin" : ""} />
    </button>
  );

  return (
    <div className="space-y-3">
      {toolbarHost ? createPortal(toolbar, toolbarHost) : <div className="flex">{toolbar}</div>}

      {error ? (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-700 dark:text-red-400">
          <span className="min-w-0 flex-1">{error}</span>
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className="shrink-0 rounded-md bg-red-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            Retry
          </button>
        </div>
      ) : null}

      {data.truncated ? (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
          Showing the first {data.limit || sessions.length} visits of a longer list — there is no
          paging here, narrow the window or filter by venue to see the rest.
        </div>
      ) : null}

      {loading && sessions.length === 0 ? (
        <div className="text-xs text-muted-foreground py-8 text-center">Loading…</div>
      ) : sessions.length === 0 ? (
        // Only a real empty result may say "no sessions" — a failed load says so above.
        error ? null : (
          <div className="text-xs text-muted-foreground py-8 text-center">No sessions</div>
        )
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border">
          {sessions.map((s) => (
            <SessionItem
              key={s.id}
              session={s}
              selectMode={selectMode}
              selected={selected.has(s.id)}
              onOpen={() => openSession(s)}
              onToggle={() => toggle(s.id)}
              onLongPress={() => {
                setSelectMode(true);
                setSelected(new Set([s.id]));
              }}
            />
          ))}
        </div>
      )}

      {confirmOpen ? (
        <ConfirmDialog
          count={selected.size}
          busy={deleting}
          error={deleteError}
          onCancel={() => { setDeleteError(null); setConfirmOpen(false); }}
          onConfirm={() => void applyDelete()}
        />
      ) : null}
    </div>
  );
}

function SessionItem({
  session: s,
  selectMode,
  selected,
  onOpen,
  onToggle,
  onLongPress,
}: {
  session: TrafficSession;
  selectMode: boolean;
  selected: boolean;
  onOpen: () => void;
  onToggle: () => void;
  onLongPress: () => void;
}) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longFired = useRef(false);
  const startPt = useRef<{ x: number; y: number } | null>(null);

  function clearTimer() {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
  }
  function onPointerDown(e: React.PointerEvent) {
    longFired.current = false;
    startPt.current = { x: e.clientX, y: e.clientY };
    clearTimer();
    timer.current = setTimeout(() => { longFired.current = true; onLongPress(); }, LONG_PRESS_MS);
  }
  function onPointerMove(e: React.PointerEvent) {
    const p = startPt.current;
    if (p && (Math.abs(e.clientX - p.x) > 10 || Math.abs(e.clientY - p.y) > 10)) clearTimer();
  }
  function onClick() {
    clearTimer();
    if (longFired.current) { longFired.current = false; return; }
    if (selectMode) onToggle();
    else onOpen();
  }

  const place = [s.city, s.region].filter(Boolean).join(", ");
  const source = sourceLabel(s);
  const sourceClass =
    s.atype === "F"
      ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      : s.atype === "G"
        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
        : "bg-secondary text-muted-foreground";

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={clearTimer}
      onPointerLeave={clearTimer}
      // A touch scroll ends in pointercancel and stops sending pointermove, so
      // the 10px guard never fires and the timer would drop the admin into
      // select mode mid-scroll.
      onPointerCancel={clearTimer}
      onLostPointerCapture={clearTimer}
      onContextMenu={(e) => e.preventDefault()}
      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-muted/40 transition-colors"
    >
      {selectMode ? (
        <span
          className={
            "shrink-0 inline-flex items-center justify-center w-4 h-4 rounded border " +
            (selected ? "bg-primary border-primary text-primary-foreground" : "border-border bg-card")
          }
          aria-hidden
        >
          {selected ? <Check className="w-2.5 h-2.5" /> : null}
        </span>
      ) : null}

      <span className="text-base shrink-0" title={s.country}>{countryToFlag(s.country)}</span>

      <span className="flex-1 min-w-0 flex items-center gap-2">
        {/* Demo traffic is not real traffic — mark it here too, not only in the
            detail, or a demo-heavy day silently looks like demand. */}
        {s.isDemo ? (
          <span
            className="text-[10px] rounded px-1.5 py-0.5 shrink-0 bg-amber-500/15 text-amber-700 dark:text-amber-400"
            title="Demo account"
          >
            demo
          </span>
        ) : null}
        {s.userEmail ? (
          <span
            className="text-[10px] bg-pink-500/10 text-pink-700 dark:text-pink-400 rounded px-1.5 py-0.5 truncate min-w-0"
            title={
              (s.userVisits ?? 1) > 1
                ? `${s.userEmail} — ${s.userVisits} visits in total`
                : s.userEmail
            }
          >
            {s.userEmail}
            {(s.userVisits ?? 1) > 1 ? ` ×${s.userVisits}` : ""}
          </span>
        ) : place ? (
          <span className={`${chip} truncate min-w-0`} title={place}>{place}</span>
        ) : null}
        <span className={`${chip} hidden sm:inline`} title={`${s.device ?? "—"} / ${s.os ?? "—"}`}>
          {deviceShort(s.device, s.os)}
        </span>
        {s.lang ? <span className={`${chip} hidden md:inline`}>{s.lang}</span> : null}
        {s.restaurants?.length ? (
          <span
            className={`${chip} hidden lg:inline truncate min-w-0`}
            title={(s.restaurants ?? []).map((r) => r.title).join(", ")}
          >
            {s.restaurants[0].title}
            {s.restaurants.length > 1 ? ` +${s.restaurants.length - 1}` : ""}
          </span>
        ) : null}
      </span>

      <span className="shrink-0 flex items-center gap-2">
        {/* Two dots: opened the auth modal, and completed a registration. */}
        <span className="shrink-0 flex items-center gap-0.5">
          <span
            className={"w-[5px] h-[5px] rounded-full " + (s.hasModal ? "bg-amber-500" : "bg-muted-foreground/25")}
            title="Opened the auth modal"
          />
          <span
            className={"w-[5px] h-[5px] rounded-full " + (s.hasRegister ? "bg-pink-500" : "bg-muted-foreground/25")}
            title="Registered"
          />
        </span>
        {(s.mergeCount ?? 0) > 0 ? (
          <span
            className="text-[10px] rounded px-1.5 py-0.5 shrink-0 bg-violet-500/10 text-violet-700 dark:text-violet-400"
            title={`${s.mergeCount} anonymous row(s) merged in after sign-in`}
          >
            ⇋{s.mergeCount}
          </span>
        ) : null}
        {s.convStatus ? (
          <span
            className={
              "text-[10px] rounded px-1.5 py-0.5 shrink-0 " +
              (s.convStatus === "success"
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                : "bg-red-500/15 text-red-700 dark:text-red-400")
            }
            title={`${s.convNetwork} conversion ${s.convStatus}`}
          >
            ↑
          </span>
        ) : null}
        {source ? (
          <span className={`text-[10px] rounded px-1.5 py-0.5 shrink-0 max-w-[90px] truncate ${sourceClass}`} title={source}>
            {source}
          </span>
        ) : null}
        <span className={chip} title={`${s.pageCount} page(s)`}>{s.eventCount}</span>
        <span className={`${chip} hidden sm:inline tabular-nums`}>{duration(s.firstAt, s.lastAt)}</span>
        <span className={`${chip} tabular-nums`}>{hmsDate(s.lastAt)}</span>
      </span>
    </button>
  );
}

function ConfirmDialog({
  count, busy, error, onCancel, onConfirm,
}: {
  count: number; busy: boolean; error?: string | null; onCancel: () => void; onConfirm: () => void;
}) {
  useScrollLock(true);
  return (
    <div onClick={onCancel} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-card border border-border rounded-xl shadow-xl">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Delete sessions</h3>
        </div>
        <p className="px-4 py-3 text-sm text-muted-foreground">
          Delete {count} selected session{count === 1 ? "" : "s"} and all their events? This cannot be undone.
        </p>
        {error ? (
          <p className="px-4 pb-3 text-xs text-red-600 dark:text-red-400">{error}</p>
        ) : null}
        <div className="px-4 py-3 border-t border-border flex items-center gap-2">
          <button type="button" onClick={onCancel} className="flex-1 h-9 text-sm font-medium text-foreground bg-secondary rounded-md hover:bg-muted">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="flex-1 h-9 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-60"
          >
            {busy ? "…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
