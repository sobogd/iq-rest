"use client";

// Admin: one traffic visit — every stored field, the full event timeline (with
// the venue active at each step) and the raw conversion-send journal. Read-only
// except for deleting the visit.

import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { SubpageStickyBar } from "../_v2/ui";
import { useDashboardRouter } from "../_spa/router";
import { invalidateTrafficCache } from "./traffic";
import {
  countryToFlag,
  hmsDate,
  pad,
  deviceShort,
  duration,
  type TrafficSessionDetail,
} from "./traffic-shared";

/** "12:13:14" — events are listed within one session, so date is redundant. */
function hms(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function TrafficSessionPage({ id, restaurantId }: { id: string; restaurantId?: string }) {
  const router = useDashboardRouter();
  const [data, setData] = useState<TrafficSessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl(`/api/admin/v2/sessions/${encodeURIComponent(id)}`), {
        credentials: "include",
      });
      if (!res.ok) {
        setError(res.status === 404 ? "Session not found" : `Failed to load (${res.status})`);
        return;
      }
      setData((await res.json()) as TrafficSessionDetail);
    } catch {
      setError("Failed to load");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  // Go back to the list we came FROM: entering from a restaurant card filters
  // the list by that venue, and dropping the filter here would also restore the
  // filtered list's scroll offset onto a different list.
  const back = useCallback(
    () => router.push({ name: "settings.admin.traffic", restaurantId }),
    [router, restaurantId],
  );

  async function remove() {
    if (!window.confirm("Delete this session and all its events?")) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(apiUrl("/api/admin/v2/sessions/delete"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] }),
      });
      // Same reasoning as in the list: a delete that quietly does nothing looks
      // like a delete that worked.
      if (!res.ok) {
        setDeleteError(`Delete failed (${res.status})`);
        return;
      }
      invalidateTrafficCache();
      back();
    } catch {
      setDeleteError("Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <SubpageStickyBar onBack={back} hideSave>
        <button
          type="button"
          onClick={() => void remove()}
          disabled={deleting || !data}
          className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 disabled:opacity-40"
          title="Delete session"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </SubpageStickyBar>

      <div className="max-w-5xl mx-auto md:px-6 pt-5 md:pt-4 space-y-3 pb-10">
        {deleteError ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-700 dark:text-red-400">
            {deleteError}
          </div>
        ) : null}
        {loading ? (
          <div className="text-xs text-muted-foreground py-8 text-center">Loading…</div>
        ) : error ? (
          <div className="text-xs text-red-600 dark:text-red-400 py-8 text-center">{error}</div>
        ) : data ? (
          <>
            <SessionCard data={data} />
            <SendsCard data={data} />
            <Timeline data={data} />
            <OtherVisits data={data} onOpen={(id) => router.push({ name: "settings.admin.trafficSession", id })} />
          </>
        ) : null}
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="flex items-baseline gap-2 py-1">
      <span className="w-28 shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className={`text-xs text-foreground min-w-0 break-all ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}

function SessionCard({ data }: { data: TrafficSessionDetail }) {
  const s = data.session;
  const place = [s.city, s.region].filter(Boolean).join(", ");
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{countryToFlag(s.country)}</span>
        <span className="text-sm font-semibold text-foreground">{place || s.country}</span>
        <span className="text-[10px] text-muted-foreground bg-secondary rounded px-1.5 py-0.5">
          {duration(s.firstAt, s.lastAt)}
        </span>
        {s.isDemo ? (
          <span className="text-[10px] rounded px-1.5 py-0.5 bg-amber-500/15 text-amber-700 dark:text-amber-400">demo</span>
        ) : null}
      </div>
      <div className="grid sm:grid-cols-2 gap-x-6">
        <div>
          <Row label="First seen" value={hmsDate(s.firstAt)} />
          <Row label="Last seen" value={hmsDate(s.lastAt)} />
          <Row label="Device" value={deviceShort(s.device, s.os)} />
          <Row label="Language" value={s.lang} />
          <Row label="Events" value={`${s.eventCount} across ${s.pageCount} page(s)`} />
          <Row label="Landed on" value={s.firstPage} />
        </div>
        <div>
          <Row label="From" value={s.from} />
          <Row label="Referrer" value={s.ref} />
          <Row
            label="Click id"
            value={s.aid ? `${s.aidField}: ${s.aid}` : s.atype ? "(purged after 7 days)" : null}
            mono
          />
          <Row label="Source" value={s.atype === "F" ? "Facebook / Meta" : s.atype === "G" ? "Google Ads" : null} />
          <Row label="Clicked at" value={s.clickAt ? hmsDate(s.clickAt) : null} />
          <Row label="Account" value={s.userEmail} />
          <Row
            label="Venues"
            value={s.restaurants?.length ? s.restaurants.map((r) => r.title).join(", ") : null}
          />
          <Row label="Merged" value={(s.mergeCount ?? 0) > 0 ? `${s.mergeCount} anonymous row(s)` : null} />
          <Row label="Hash" value={`${s.hash}…`} mono />
        </div>
      </div>
    </div>
  );
}

function SendsCard({ data }: { data: TrafficSessionDetail }) {
  const [openId, setOpenId] = useState<string | null>(null);
  if (data.sends.length === 0) return null;
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-2 border-b border-border text-[10px] uppercase tracking-wide text-muted-foreground">
        Conversion sends
      </div>
      <div className="divide-y divide-border">
        {data.sends.map((snd) => (
          <div key={snd.id}>
            <button
              type="button"
              onClick={() => setOpenId(openId === snd.id ? null : snd.id)}
              className="w-full flex items-center gap-2 px-4 py-2 text-xs text-left hover:bg-muted/40"
            >
              <span
                className={
                  "text-[10px] rounded px-1.5 py-0.5 " +
                  (snd.status === "success"
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    : "bg-red-500/15 text-red-700 dark:text-red-400")
                }
              >
                {snd.status}
              </span>
              <span className="text-foreground">{snd.network}</span>
              <span className="ml-auto text-muted-foreground tabular-nums">{hmsDate(snd.createdAt)}</span>
            </button>
            {openId === snd.id ? (
              <pre className="px-4 pb-3 text-[10px] font-mono text-muted-foreground whitespace-pre-wrap break-all">
                {JSON.stringify(snd.response, null, 2)}
              </pre>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline({ data }: { data: TrafficSessionDetail }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-2 border-b border-border text-[10px] uppercase tracking-wide text-muted-foreground">
        Timeline
      </div>
      {data.events.length === 0 ? (
        <div className="px-4 py-6 text-xs text-muted-foreground text-center">No events</div>
      ) : (
        <div className="divide-y divide-border">
          {data.events.map((e) => (
            <div key={e.id} className="flex items-center gap-2 px-4 py-1.5 text-xs">
              <span className="text-muted-foreground tabular-nums shrink-0">{hms(e.at)}</span>
              <span className="text-[10px] text-muted-foreground bg-secondary rounded px-1.5 py-0.5 shrink-0">
                {e.page}
              </span>
              <span
                className={
                  "text-[10px] rounded px-1.5 py-0.5 shrink-0 " +
                  (e.action === "Register"
                    ? "bg-pink-500/10 text-pink-700 dark:text-pink-400"
                    : e.action === "Click"
                      ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                      : "bg-secondary text-muted-foreground")
                }
              >
                {e.action}
              </span>
              <span className="text-foreground min-w-0 truncate">{e.name}</span>
              {e.restaurantTitle ? (
                <span
                  className="ml-auto shrink-0 text-[10px] text-muted-foreground bg-secondary rounded px-1.5 py-0.5 max-w-[140px] truncate"
                  title={e.restaurantTitle}
                >
                  {e.restaurantTitle}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Other visits of the same account. This is the ONLY cross-day link we keep,
 *  and only because the visitor signed in — anonymous visits from other
 *  salt-days cannot be tied to anything. */
function OtherVisits({
  data,
  onOpen,
}: {
  data: TrafficSessionDetail;
  onOpen: (id: string) => void;
}) {
  if (data.otherVisits.length === 0) return null;
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-2 border-b border-border text-[10px] uppercase tracking-wide text-muted-foreground">
        Other visits of this account
      </div>
      <div className="divide-y divide-border">
        {data.otherVisits.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => onOpen(v.id)}
            className="w-full flex items-center gap-2 px-4 py-2 text-xs text-left hover:bg-muted/40"
          >
            <span className="text-base shrink-0">{countryToFlag(v.country)}</span>
            <span className="text-foreground min-w-0 truncate">{v.city || v.country}</span>
            <span className="text-[10px] text-muted-foreground bg-secondary rounded px-1.5 py-0.5 shrink-0">
              {deviceShort(v.device, null)}
            </span>
            <span className="ml-auto text-muted-foreground tabular-nums shrink-0">{hmsDate(v.firstAt)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
