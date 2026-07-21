"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Scaling, MousePointerClick } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { GridIcon, MinusIcon, PlusIcon, QrIcon, TrashIcon, UsersIcon } from "./icons";
import {
 ConfirmDialog,
 EditPageHeader,
 EmptyState,
 PhotoPicker,
 Select,
 SubpageStickyBar,
 TableQrModal,
 UnsavedChangesDialog,
} from "./ui";
import { setNavInterceptor } from "./nav-guard";
import { notify } from "./notice";
import { formInputClass } from "./tokens";
import { newId } from "./helpers";
import { createTable, deleteTable, updateTable } from "./api";
import type { Booking, Order, TableEntity } from "./types";
import { track } from "@/lib/dashboard-events";

// A booking pins its table against deletion only while it's still upcoming or
// in progress. A pending/confirmed booking whose slot already fully elapsed
// (e.g. a no-show the staff never rejected) must NOT block the table forever.
function blocksTableDeletion(b: Booking): boolean {
 if (b.status !== "pending" && b.status !== "confirmed") return false;
 const endMs = new Date(b.datetime).getTime() + (b.duration || 0) * 60_000;
 return Number.isFinite(endMs) && endMs >= Date.now();
}

function Stepper({
 value,
 min,
 max,
 onChange,
 onPlus,
 onMinus,
 testId,
}: {
 value: number;
 min?: number;
 max?: number;
 onChange: (n: number) => void;
 onPlus?: () => void;
 onMinus?: () => void;
 testId?: string;
}) {
 const lo = min ?? -Infinity;
 const hi = max ?? Infinity;
 const dec = () => { onMinus?.(); onChange(Math.max(lo, value - 1)); };
 const inc = () => { onPlus?.(); onChange(Math.min(hi, value + 1)); };
 const btn = "w-10 h-10 flex items-center justify-center text-foreground transition-colors disabled:opacity-40";
 return (
 <div className="flex items-center w-full h-10 bg-card border border-input rounded-lg overflow-hidden">
 <button type="button" data-testid={testId ? testId + "-dec" : undefined} onClick={dec} disabled={value <= lo} className={btn + " border-r border-input"} aria-label="−">
 <MinusIcon size={14} />
 </button>
 <div data-testid={testId ? testId + "-value" : undefined} className="flex-1 min-w-0 h-full flex items-center justify-center text-sm font-medium tabular-nums text-foreground">
 {value}
 </div>
 <button type="button" data-testid={testId ? testId + "-inc" : undefined} onClick={inc} disabled={value >= hi} className={btn + " border-l border-input"} aria-label="+">
 <PlusIcon size={14} />
 </button>
 </div>
 );
}

// Little round dining-table glyph shown before the table number on the map.
function TableGlyph({ size }: { size: number }) {
 return (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <ellipse cx="12" cy="7" rx="9" ry="2.6" />
 <path d="M12 9.6V19" />
 <path d="M8 19h8" />
 </svg>
 );
}

function tableSize(capacity: number): number {
 const c = Math.max(1, Math.min(12, capacity || 2));
 return Math.round(28 + (c - 1) * 3);
}

// Fixed width:height proportion per shape (drives both the marker size on the
// map and the resize handle). Round shapes render with a full border radius.
const SHAPE_ASPECT: Record<string, number> = { circle: 1, square: 1, rect: 1.6, oval: 1.5 };
const isRoundShape = (s: string) => s === "circle" || s === "oval";

// Find a spot on the floor map (0-100 percent coords) that doesn't overlap
// any existing table. Scans a coarse grid and accepts the first cell at
// least MIN_GAP away from every other placed table; falls back to the
// best (most-isolated) cell we did find, then to the center if there are
// no tables yet. Unplaced tables (x/y null) are ignored.
function pickInitialTablePosition(tables: TableEntity[]): [number, number] {
 const placed = tables.filter(
 (t): t is TableEntity & { x: number; y: number } =>
 typeof t.x === "number" && typeof t.y === "number",
 );
 if (placed.length === 0) return [50, 50];

 const MIN_GAP = 14; // ~table pin diameter in % of map width
 const STEP = 7;
 const MARGIN = 8;
 let bestSpot: [number, number] = [50, 50];
 let bestMinDist = -1;
 for (let y = MARGIN; y <= 100 - MARGIN; y += STEP) {
 for (let x = MARGIN; x <= 100 - MARGIN; x += STEP) {
 let minDist = Infinity;
 for (const t of placed) {
 const dx = t.x - x;
 const dy = t.y - y;
 const d = Math.sqrt(dx * dx + dy * dy);
 if (d < minDist) minDist = d;
 }
 if (minDist >= MIN_GAP) return [x, y];
 if (minDist > bestMinDist) {
 bestMinDist = minDist;
 bestSpot = [x, y];
 }
 }
 }
 return bestSpot;
}

export function FloorMap({
 tables,
 selectedId,
 onSelectTable,
 onPickPosition,
 onMove,
 onRotate,
 onResize,
 occupiedIds,
 readyIds,
 badgeFor,
 wide,
 dimUnselected,
 ringAll,
}: {
 tables: TableEntity[];
 selectedId: string | null;
 onSelectTable: (id: string | null) => void;
 onPickPosition?: (x: number, y: number) => void;
 // When set, the selected table can be dragged with mouse/finger across the
 // floor map; fires live with the new percent coords. Used on the edit form.
 onMove?: (x: number, y: number) => void;
 // When set, a rotate handle appears above the selected table; fires live with
 // the new angle in degrees (0 = upright). Used on the edit form.
 onRotate?: (deg: number) => void;
 // When set, resize handles appear around the selected table; fires live with
 // the new width/height as a percent of the map. Used on the edit form.
 onResize?: (width: number, height: number) => void;
 occupiedIds?: Set<string>;
 readyIds?: Set<string>;
 badgeFor?: (tableId: string) => number | null | undefined;
 wide?: boolean;
 // When true, every table that isn't `selectedId` is rendered muted so
 // the form's chosen table stands out. Used on the table edit page —
 // the staff is editing one table, the rest are context.
 dimUnselected?: boolean;
 // When true, EVERY table gets the selection ring (used on the orders page so
 // all tables read as interactive); otherwise only the selected one does.
 ringAll?: boolean;
}) {
 const tt = useTranslations("dashboard.tables");
 const occupied = occupiedIds || new Set<string>();
 const ready = readyIds || new Set<string>();
 const mapRef = useRef<HTMLDivElement | null>(null);
 const draggingRef = useRef(false);
 const movedRef = useRef(false);
 const rotatingRef = useRef(false);
 const resizingRef = useRef(false);
 // Offset (percent) between the grab point and the table center, so dragging
 // from anywhere on the table doesn't snap its center to the cursor.
 const grabOffsetRef = useRef({ dx: 0, dy: 0 });
 // Snapshot of the transform at the moment a corner-drag starts: pointer angle
 // + distance from the table center, and the table's size/rotation then. The
 // one corner handle both rotates (by pointer angle delta) and uniformly scales
 // (by pointer distance ratio) around the fixed center — so no grab jump.
 const transformRef = useRef({ ang: 0, dist: 0, w0: 0, h0: 0, rot0: 0 });
 const [mapSize, setMapSize] = useState({ w: 0, h: 0 });

 useEffect(() => {
   const el = mapRef.current;
   if (!el) return;
   const update = () => {
     const r = el.getBoundingClientRect();
     setMapSize({ w: r.width, h: r.height });
   };
   update();
   const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
   ro?.observe(el);
   return () => ro?.disconnect();
 }, []);

 // Invisible alignment grid: positions + sizes snap to GRID_STEP% cells and
 // rotation snaps to ROT_STEP° so tables line up evenly with little effort.
 const GRID_STEP = 4;
 const SIZE_STEP = 1; // finer step for resize so smaller tables are possible
 const ROT_STEP = 5;
 const clampPct = (v: number) => Math.max(0, Math.min(100, v));
 const snapPct = (v: number) => Math.round(v / GRID_STEP) * GRID_STEP;
 const posFromEvent = (e: { clientX: number; clientY: number }) => {
   const rect = mapRef.current?.getBoundingClientRect();
   if (!rect) return null;
   return {
     x: clampPct(((e.clientX - rect.left) / rect.width) * 100),
     y: clampPct(((e.clientY - rect.top) / rect.height) * 100),
   };
 };
 return (
 <>
 <style>{`
 .floor-map {
 position: relative;
 /* Own stacking context so the table markers + handles (high z-index) can't
    paint over the sticky page header when scrolled. */
 isolation: isolate;
 width: 100%;
 aspect-ratio: 1 / 1;
 background-color: hsl(var(--card));
 background-image: url(/floor.webp);
 background-size: cover;
 background-position: center;
 border: 1px solid hsl(var(--border));
 border-radius: 0.75rem;
 overflow: hidden;
 box-sizing: border-box;
 }
 ${wide
 // Desktop: the square map must never overflow the viewport below the
 // fixed header — cap its width (= height, 1:1 aspect) accordingly.
 ? "@media (min-width: 768px) { .floor-map { width: min(calc(100dvh - var(--topbar-h, 3.5rem) - 3.75rem), 60vw); } }"
 : "@media (min-width: 768px) { .floor-map { width: 280px; height: 280px; aspect-ratio: auto; } }"}
 `}</style>
 <div
 ref={mapRef}
 className={"floor-map" + (onPickPosition ? " cursor-crosshair" : "")}
 onClick={(e) => {
 // A drag that moved the selected table must not also re-place it via the
 // map tap handler — swallow the click that follows a real drag.
 if (movedRef.current) { movedRef.current = false; return; }
 if (onPickPosition) {
 const p = posFromEvent(e);
 if (p) onPickPosition(p.x, p.y);
 } else {
 onSelectTable(null);
 }
 }}
 >
 {tables.map((t) => {
 const isSelected = selectedId === t.id;
 const isOccupied = occupied.has(t.id);
 const isReady = ready.has(t.id);
 const size = tableSize(t.capacity);
 const x = t.x ?? 50;
 const y = t.y ?? 50;
 // Each shape has a fixed width:height proportion; square/circle are 1:1,
 // rectangle + oval are wider. Round shapes (circle, oval) get a full radius.
 const aspect = SHAPE_ASPECT[t.shape] ?? 1;
 const round = isRoundShape(t.shape);
 // Capacity-derived fallback size in px; once the owner resizes, width/height
 // (percent of map) take over — converted to px via the measured map size.
 const baseHpx = size;
 const baseWpx = Math.round(size * aspect);
 const w = typeof t.width === "number" && mapSize.w > 0 ? (t.width / 100) * mapSize.w : baseWpx;
 const h = typeof t.height === "number" && mapSize.h > 0 ? (t.height / 100) * mapSize.h : baseHpx;
 const radiusCls = round ? "rounded-full" : "rounded-md";
 // No border on any state — flat fill only. In-progress (occupied but
 // not all ready) takes the app's primary brand colour (same hue the
 // Save button uses); all-ready stays emerald; idle uses the regular
 // card background.
 const stateCls = isSelected
 ? "bg-foreground text-background z-10"
 : isReady
 ? "bg-emerald-500 text-white"
 : isOccupied
 ? "bg-primary-gradient text-primary-foreground"
 : "bg-card text-foreground";
 const ringCls = isSelected || ringAll ? " ring-4 ring-foreground/20" : "";
 const badge = badgeFor ? badgeFor(t.id) : null;
 const dimCls = dimUnselected && !isSelected ? " opacity-45" : "";
 const draggable = !!onMove && isSelected;
 // Font scales with the marker's smaller side so small tables get small text
 // and big tables larger — capacity line is a touch smaller than the number.
 const numFont = Math.max(9, Math.min(22, Math.round(Math.min(w, h) * 0.3)));
 const capFont = Math.max(8, Math.round(numFont * 0.62));
 return (
 <Fragment key={t.id}>
 {/* connector to the handle — rendered BEFORE the table so it sits behind
     the table body (and the knob, which is drawn later, sits over it) */}
 {draggable && (onRotate || onResize) ? (
 <div
 className="absolute pointer-events-none"
 style={{ left: x + "%", top: y + "%", width: 0, height: 0, transform: "rotate(" + t.rotation + "deg)" }}
 >
 <div
 className="absolute bg-foreground/20"
 style={{ left: 0, top: -(h / 2 + 30), width: 2, height: h / 2 + 30, transform: "translateX(-50%)" }}
 />
 </div>
 ) : null}
 <button
 type="button"
 data-testid={"floor-table-" + t.number}
 onClick={(e) => { e.stopPropagation(); onSelectTable(t.id); }}
 onPointerDown={draggable ? (e) => {
 e.stopPropagation();
 draggingRef.current = true;
 movedRef.current = false;
 const p = posFromEvent(e);
 grabOffsetRef.current = p ? { dx: p.x - x, dy: p.y - y } : { dx: 0, dy: 0 };
 (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
 } : undefined}
 onPointerMove={draggable ? (e) => {
 if (!draggingRef.current) return;
 const p = posFromEvent(e);
 if (!p) return;
 movedRef.current = true;
 onMove!(clampPct(snapPct(p.x - grabOffsetRef.current.dx)), clampPct(snapPct(p.y - grabOffsetRef.current.dy)));
 } : undefined}
 onPointerUp={draggable ? (e) => {
 draggingRef.current = false;
 (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
 } : undefined}
 onPointerCancel={draggable ? () => { draggingRef.current = false; } : undefined}
 className={
 "absolute flex items-center justify-center font-medium tabular-nums transition-all " +
 radiusCls + " " +
 (draggable ? "cursor-grab active:cursor-grabbing " : "") +
 stateCls + ringCls + dimCls
 }
 style={{
 width: w + "px",
 height: h + "px",
 left: "calc(" + x + "% - " + w / 2 + "px)",
 top: "calc(" + y + "% - " + h / 2 + "px)",
 touchAction: draggable ? "none" : undefined,
 transform: t.rotation ? "rotate(" + t.rotation + "deg)" : undefined,
 // Draggable chip must track the pointer instantly — the transition-all
 // class otherwise animates left/top and the table lags behind the cursor.
 transition: draggable ? "none" : undefined,
 }}
 aria-label={tt("tableLabelAria", { number: t.number })}
 title={tt("tableLabelAria", { number: t.number }) + (t.name ? " · " + t.name : "")}
 >
 {t.color ? (
 <span className={"absolute inset-0 " + radiusCls} style={{ backgroundColor: t.color }} />
 ) : t.photoUrl ? (
 <span className={"absolute inset-0 overflow-hidden " + radiusCls}>
 <img src={t.photoUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
 </span>
 ) : (
 // No colour/photo → fill with the theme's opposite so the table still
 // reads as a solid marker (dark in light theme, light in dark theme).
 <span className={"absolute inset-0 bg-foreground " + radiusCls} />
 )}
 <span
 className={"relative z-10 flex flex-col items-center justify-center leading-none " + (t.color || t.photoUrl ? "text-white" : "text-background")}
 // Counter-rotate the label so the number/seats stay upright while the table rotates.
 style={t.rotation ? { transform: "rotate(" + -t.rotation + "deg)" } : undefined}
 >
 <span className="font-semibold inline-flex items-center gap-0.5" style={{ fontSize: numFont }}>
 <TableGlyph size={Math.round(numFont * 0.9)} />
 {t.number}
 </span>
 <span className="inline-flex items-center gap-0.5 font-medium opacity-90" style={{ fontSize: capFont, marginTop: 1 }}>
 <UsersIcon size={capFont} />
 {t.capacity}
 </span>
 </span>
 {badge && badge > 0 ? (
 <span
 className={
 "absolute -top-3 -right-3 z-20 min-w-[26px] h-[26px] px-1.5 inline-flex items-center justify-center text-sm font-semibold rounded-full ring-4 ring-foreground/20 " +
 (isReady ? "bg-emerald-500 text-white" : "bg-primary-gradient text-primary-foreground")
 }
 // Counter-rotate the count so it stays upright while the table rotates.
 style={t.rotation ? { transform: "rotate(" + -t.rotation + "deg)" } : undefined}
 >
 {badge}
 </span>
 ) : null}
 </button>
 {draggable && (onRotate || onResize) ? (() => {
 const circleCls = "absolute rounded-full bg-secondary border border-foreground/40 ring-4 ring-foreground/20 flex items-center justify-center text-muted-foreground pointer-events-auto";
 // Fixed small handle, sat a little above the table.
 const knobPx = 22;
 const iconPx = 12;
 const gapPx = 30;
 return (
 <div
 className="absolute z-20 pointer-events-none"
 style={{ left: x + "%", top: y + "%", width: 0, height: 0, transform: "rotate(" + t.rotation + "deg)" }}
 >
 {/* outline of the selected table's box */}
 <div
 className="absolute border border-foreground/40 pointer-events-none"
 style={{ left: -w / 2, top: -h / 2, width: w, height: h, borderRadius: round ? "9999px" : 6 }}
 />

                {/* single handle above the table — rotate (by angle) + uniform scale (by distance) */}
 {onResize || onRotate ? (
 <>
 <div
 className={circleCls + " cursor-grab active:cursor-grabbing"}
 style={{ left: 0, top: -(h / 2 + gapPx), width: knobPx, height: knobPx, transform: "translate(-50%,-50%) rotate(" + -t.rotation + "deg)", touchAction: "none" }}
 onClick={(e) => e.stopPropagation()}
 onPointerDown={(e) => {
 e.stopPropagation();
 resizingRef.current = true;
 const rect = mapRef.current?.getBoundingClientRect();
 if (rect) {
 const cx = rect.left + (x / 100) * rect.width;
 const cy = rect.top + (y / 100) * rect.height;
 const dx = e.clientX - cx;
 const dy = e.clientY - cy;
 transformRef.current = {
 ang: (Math.atan2(dy, dx) * 180) / Math.PI,
 dist: Math.max(1, Math.hypot(dx, dy)),
 w0: w,
 h0: h,
 rot0: t.rotation,
 };
 }
 (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
 }}
 onPointerMove={(e) => {
 if (!resizingRef.current) return;
 const rect = mapRef.current?.getBoundingClientRect();
 if (!rect) return;
 const cx = rect.left + (x / 100) * rect.width;
 const cy = rect.top + (y / 100) * rect.height;
 const dx = e.clientX - cx;
 const dy = e.clientY - cy;
 const st = transformRef.current;
 const dist = Math.hypot(dx, dy);
 // rotation: point the table's up-axis straight at the pointer, so the knob
 // sits under the cursor (no lag). +90 because the knob rests straight up.
 if (onRotate) {
 let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
 deg = Math.round(deg / ROT_STEP) * ROT_STEP;
 deg = ((deg % 360) + 360) % 360;
 onRotate(deg);
 }
 // size follows the pointer directly: the knob sits gapPx above the box top
 // along the up-axis, so keeping it under the cursor means (h/2 + gapPx) = dist.
 if (onResize) {
 const MIN = 26;
 const aspect = SHAPE_ASPECT[t.shape] ?? 1; // width per height, fixed by shape
 const stepH = (SIZE_STEP / 100) * rect.height;
 let newHpx = Math.max(MIN, 2 * (dist - gapPx));
 newHpx = Math.min(rect.height, Math.max(stepH, Math.round(newHpx / stepH) * stepH));
 const newWpx = Math.min(rect.width, Math.max(MIN, newHpx * aspect));
 onResize((newWpx / rect.width) * 100, (newHpx / rect.height) * 100);
 }
 }}
 onPointerUp={(e) => {
 resizingRef.current = false;
 (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
 }}
 onPointerCancel={() => { resizingRef.current = false; }}
 >
 <Scaling size={iconPx} />
 </div>
 </>
 ) : null}
 </div>
 );
 })() : null}
 </Fragment>
 );
 })}
 </div>
 </>
 );
}

// ── List page (map + grid of chips) ──

export function TablesPage({
 tables,
 setTables,
 orders,
 bookings,
 menuUrl,
 onBack,
}: {
 tables: TableEntity[];
 setTables: React.Dispatch<React.SetStateAction<TableEntity[]>>;
 orders: Order[];
 bookings: Booking[];
 menuUrl: string;
 onBack: () => void;
}) {
 const t = useTranslations("dashboard.tables");
 const tc = useTranslations("dashboard.common");
 const qc = useQueryClient();

 const [selectedId, setSelectedId] = useState<string | null>(null);
 const [qrOpen, setQrOpen] = useState(false);
 const [confirmState, setConfirmState] = useState<{
 open: boolean; title?: string; message?: string; singleButton?: boolean; onConfirm?: (() => void) | null;
 }>({ open: false });

 useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, []);

 // Nothing is selected by default; drop the selection if its table is gone.
 useEffect(() => {
 if (selectedId && !tables.some((x) => x.id === selectedId)) setSelectedId(null);
 }, [tables, selectedId]);

 const selected = tables.find((x) => x.id === selectedId) || null;

 // Manual save: edits accumulate per table id and are PATCHed only when the
 // owner hits Save (header button or the unsaved-changes dialog). Freshly
 // added tables are local drafts too (ids in createdIdsRef) — POSTed on Save.
 const pendingRef = useRef<Map<string, TableEntity>>(new Map());
 const createdIdsRef = useRef<Set<string>>(new Set());
 const [dirty, setDirty] = useState(false);
 const [saving, setSaving] = useState(false);
 const [unsavedOpen, setUnsavedOpen] = useState(false);
 const payloadOf = (tbl: TableEntity) => ({
 number: tbl.number, capacity: tbl.capacity, zone: tbl.name || null,
 imageUrl: tbl.photoUrl, color: tbl.color, x: tbl.x, y: tbl.y,
 shape: tbl.shape, rotation: tbl.rotation, width: tbl.width, height: tbl.height,
 });
 async function saveAll(): Promise<boolean> {
 const items = Array.from(pendingRef.current.values());
 if (items.length === 0) return true;
 setSaving(true);
 try {
 await Promise.all(items.map((tbl) =>
 createdIdsRef.current.has(tbl.id)
 ? createTable(payloadOf(tbl))
 : updateTable(tbl.id, payloadOf(tbl)),
 ));
 pendingRef.current.clear();
 createdIdsRef.current.clear();
 setDirty(false);
 await qc.invalidateQueries({ queryKey: ["tables"] }).catch(() => undefined);
 return true;
 } catch {
 return false;
 } finally {
 setSaving(false);
 }
 }
 // Drop the pending edits (incl. unsaved new tables) and refetch so the map
 // snaps back to the saved state.
 function discard() {
 const created = createdIdsRef.current;
 if (created.size) setTables((prev) => prev.filter((x) => !created.has(x.id)));
 pendingRef.current.clear();
 createdIdsRef.current = new Set();
 setDirty(false);
 qc.invalidateQueries({ queryKey: ["tables"] }).catch(() => undefined);
 }

 // Sidebar/drawer navigation guard: while dirty, intercept the click, show
 // the unsaved-changes dialog, and resume the blocked navigation afterwards.
 const pendingNavRef = useRef<(() => void) | null>(null);
 const dirtyRef = useRef(false);
 dirtyRef.current = dirty && !saving;
 useEffect(() => {
 setNavInterceptor((proceed) => {
 if (!dirtyRef.current) return false;
 pendingNavRef.current = proceed;
 setUnsavedOpen(true);
 return true;
 });
 return () => setNavInterceptor(null);
 }, []);
 function leave() {
 const next = pendingNavRef.current;
 pendingNavRef.current = null;
 next?.();
 }

 function patchSelected(patch: Partial<TableEntity>) {
 // Functional update so back-to-back calls in one event (resize fires both
 // onResize + onMove) merge onto the latest state instead of clobbering it.
 setTables((prev) => prev.map((x) => {
 if (x.id !== selectedId) return x;
 const next = { ...x, ...patch };
 pendingRef.current.set(next.id, next);
 return next;
 }));
 setDirty(true);
 }

 function addTable() {
 track("dash_settings_tables_click_add");
 const number = tables.reduce((m, tbl) => Math.max(m, tbl.number || 0), 0) + 1;
 // New table = a LOCAL draft copying the selected one (shape/size/color/
 // seats), nudged so it doesn't sit exactly on top of the original. It is
 // POSTed to the backend only on Save.
 const src = selected;
 const OFF = 5;
 const nudge = (v: number | null) => {
 const base = v ?? 50;
 const n = base + OFF;
 return Math.max(0, Math.min(100, n > 100 ? base - OFF : n));
 };
 const entity: TableEntity = {
 id: newId(),
 number,
 name: "",
 description: "",
 capacity: src ? src.capacity : 2,
 x: src ? nudge(src.x) : 50,
 y: src ? nudge(src.y) : 50,
 shape: src ? src.shape : "circle",
 rotation: src ? src.rotation : 0,
 width: src ? src.width : null,
 height: src ? src.height : null,
 photoUrl: null,
 color: src ? src.color : null,
 sortOrder: tables.length,
 };
 createdIdsRef.current.add(entity.id);
 pendingRef.current.set(entity.id, entity);
 setTables((prev) => [...prev, entity]);
 setSelectedId(entity.id);
 setDirty(true);
 }

 const usedIds = new Set<string>([
 ...orders.filter((o) => o.status === "active").map((o) => o.tableId).filter((v): v is string => !!v),
 ...bookings.filter(blocksTableDeletion).map((b) => b.tableId).filter((v): v is string => !!v),
 ]);

 function handleDelete() {
 if (!selected) return;
 if (usedIds.has(selected.id)) {
 setConfirmState({ open: true, title: t("cantDeleteTitle"), message: t("cantDeleteMessage", { number: selected.number }), singleButton: true, onConfirm: null });
 return;
 }
 setConfirmState({
 open: true,
 title: t("deleteTitle"),
 message: t("deleteMessage", { number: selected.number, label: selected.name ? " · " + selected.name : "" }),
 onConfirm: async () => {
 setConfirmState({ open: false });
 const id = selected.id;
 // An unsaved draft never reached the backend — just drop it locally.
 if (createdIdsRef.current.has(id)) {
 createdIdsRef.current.delete(id);
 pendingRef.current.delete(id);
 setTables((prev) => prev.filter((x) => x.id !== id));
 setSelectedId(null);
 if (pendingRef.current.size === 0) setDirty(false);
 return;
 }
 try {
 // Keep other tables' unsaved edits alive across the invalidate.
 if (dirty && !(await saveAll())) return;
 await deleteTable(id);
 pendingRef.current.delete(id);
 setTables((prev) => prev.filter((x) => x.id !== id));
 setSelectedId(null);
 await qc.invalidateQueries({ queryKey: ["tables"] });
 } catch { /* ignore */ }
 },
 });
 }

 return (
 <div>
 <EditPageHeader
 onBack={onBack}
 hideBack
 title={t("title")}
 titleIcon={<GridIcon size={18} />}
 // Save shows only while a table is selected; it's always clickable —
 // saving with no pending edits is a no-op that still confirms success.
 onSave={selected ? async () => {
 track("dash_settings_tables_save");
 if (await saveAll()) {
 // Success ack + drop the selection so the placeholder returns.
 notify(tc("savedTitle"), tc("savedMessage"));
 setSelectedId(null);
 }
 } : undefined}
 canSave
 saving={saving}
 actionMenu={(() => {
 // Same button recipe as the dish form header: icon-only on mobile,
 // icon + label on desktop.
 const btnCls = "inline-flex items-center justify-center gap-1.5 h-[36px] w-[36px] px-0 md:w-auto md:px-[16px] text-[14px] font-semibold rounded-lg transition-all whitespace-nowrap shrink-0";
 const mutedCls = btnCls + " text-foreground bg-muted hover:bg-muted/70";
 return selected ? (
 <>
 <button
 type="button"
 data-testid="table-delete"
 onClick={handleDelete}
 aria-label={t("deleteTable")}
 title={t("deleteTable")}
 className={mutedCls}
 >
 <TrashIcon size={18} />
 <span className="hidden md:inline">{tc("delete")}</span>
 </button>
 <button
 type="button"
 onClick={() => setQrOpen(true)}
 aria-label={t("showQr")}
 title={t("showQr")}
 className={mutedCls}
 >
 <QrIcon size={18} />
 <span className="hidden md:inline">{tc("qrCode")}</span>
 </button>
 </>
 ) : (
 // No selection → the primary action is adding a table (Save hidden).
 <button
 type="button"
 data-testid="table-add"
 onClick={addTable}
 aria-label={t("addFirstTable")}
 title={t("addFirstTable")}
 className={btnCls + " text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] hover:opacity-90 active:scale-[0.99]"}
 >
 <PlusIcon size={18} />
 <span className="hidden md:inline">{t("addFirstTable")}</span>
 </button>
 );
 })()}
 />

 <div className="min-w-0">
 {tables.length === 0 ? (
 <>
 <EmptyState title={t("emptyTitle")} subtitle={t("emptySubtitle")} />
 <button
 type="button"
 data-testid="table-add-empty"
 onClick={addTable}
 className="w-full mt-2.5 h-12 text-sm font-medium text-muted-foreground/60 border border-dashed border-input rounded-xl flex items-center justify-center gap-2 transition-colors"
 >
 <PlusIcon size={14} />
 {t("addFirstTable")}
 </button>
 </>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-4">
 <div className="min-w-0">
 <FloorMap
 tables={tables}
 selectedId={selectedId}
 onSelectTable={(id) => { if (id) track("dash_settings_tables_click_table"); setSelectedId(id); }}
 onMove={(x, y) => patchSelected({ x, y })}
 onRotate={(deg) => patchSelected({ rotation: deg })}
 onResize={(width, height) => patchSelected({ width, height })}
 wide
 dimUnselected
 />
 </div>

 <div className="min-w-0">
 {selected ? (
 <TableSettings
 table={selected}
 onChange={patchSelected}
 />
 ) : (
 <div className="h-[calc(100dvh-var(--topbar-h,3.5rem)-100vw-1.25rem-env(safe-area-inset-bottom))] md:h-full flex items-center justify-center rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border">
 <div className="flex flex-col items-center gap-3 px-6 text-center">
 <MousePointerClick size={28} className="text-muted-foreground/50" />
 <p className="text-sm text-muted-foreground max-w-[260px] leading-snug">{t("selectPrompt")}</p>
 </div>
 </div>
 )}
 </div>
 </div>
 )}
 </div>

 <ConfirmDialog
 open={confirmState.open}
 title={confirmState.title}
 message={confirmState.message}
 singleButton={confirmState.singleButton}
 onConfirm={confirmState.onConfirm ?? undefined}
 onCancel={() => setConfirmState({ open: false })}
 />

 {selected ? (
 <TableQrModal
 open={qrOpen}
 onClose={() => setQrOpen(false)}
 tableNumber={selected.number}
 tableLabel={selected.name}
 menuUrl={menuUrl}
 />
 ) : null}

 <UnsavedChangesDialog
 open={unsavedOpen}
 saving={saving}
 onDiscard={() => { setUnsavedOpen(false); discard(); leave(); }}
 onSave={async () => { setUnsavedOpen(false); if (await saveAll()) leave(); }}
 onClose={() => { pendingNavRef.current = null; setUnsavedOpen(false); }}
 />
 </div>
 );
}

// ── Form (new + edit) ──

export function TableFormPage({
 mode,
 tables,
 setTables,
 orders,
 bookings,
 menuUrl,
 tableId,
 onBack,
}: {
 mode: "new" | "edit";
 tables: TableEntity[];
 setTables: React.Dispatch<React.SetStateAction<TableEntity[]>>;
 orders: Order[];
 bookings: Booking[];
 menuUrl: string;
 tableId?: string;
 onBack: () => void;
}) {
 const t = useTranslations("dashboard.tables");
 const qc = useQueryClient();

 const initial: TableEntity =
 mode === "edit" && tableId
 ? tables.find((x) => x.id === tableId) || null!
 : (() => {
 const [x, y] = pickInitialTablePosition(tables);
 return {
 id: newId(),
 number: tables.reduce((max, tbl) => Math.max(max, tbl.number || 0), 0) + 1,
 name: "",
 description: "",
 capacity: 2,
 x,
 y,
 shape: "circle",
 rotation: 0,
 width: null,
 height: null,
 photoUrl: null,
 color: null,
 sortOrder: tables.length,
 } as TableEntity;
 })();

 const [draft, setDraft] = useState<TableEntity>(initial);
 const [saving, setSaving] = useState(false);
 const [confirmState, setConfirmState] = useState<{
 open: boolean;
 title?: string;
 message?: string;
 singleButton?: boolean;
 onConfirm?: (() => void) | null;
 }>({ open: false });
 const [qrOpen, setQrOpen] = useState(false);

 useEffect(() => {
 window.scrollTo({ top: 0, behavior: "auto" });
 }, []);

 // A table can't be deleted while it has a live order or a still-active booking
 // (upcoming/in-progress pending or confirmed). Completed, cancelled/rejected,
 // and already-elapsed bookings don't block — see blocksTableDeletion.
 const usedIds = new Set<string>([
 ...orders.filter((o) => o.status === "active").map((o) => o.tableId).filter((x): x is string => !!x),
 ...bookings
  .filter(blocksTableDeletion)
  .map((b) => b.tableId)
  .filter((x): x is string => !!x),
 ]);

 if (mode === "edit" && !tables.find((x) => x.id === tableId)) {
 return (
 <div className="py-10 text-center text-sm text-muted-foreground">
 {t("emptyTitle")}
 </div>
 );
 }

 async function save() {
 track("dash_settings_table_click_save");
 if (saving) return;
 setSaving(true);
 try {
 if (mode === "new") {
 const created = await createTable({
 number: draft.number,
 capacity: draft.capacity,
 zone: draft.name || null,
 description: draft.description || null,
 imageUrl: draft.photoUrl,
 color: draft.color,
 x: draft.x,
 y: draft.y,
 shape: draft.shape,
 rotation: draft.rotation,
 width: draft.width,
 height: draft.height,
 });
 const entity: TableEntity = {
 id: (created as { id: string }).id,
 number: draft.number,
 name: draft.name,
 description: draft.description,
 capacity: draft.capacity,
 x: draft.x,
 y: draft.y,
 shape: draft.shape,
 rotation: draft.rotation,
 width: draft.width,
 height: draft.height,
 photoUrl: draft.photoUrl,
 color: draft.color,
 sortOrder: draft.sortOrder,
 };
 setTables((prev) => [...prev, entity]);
 } else {
 await updateTable(draft.id, {
 number: draft.number,
 capacity: draft.capacity,
 zone: draft.name || null,
 description: draft.description || null,
 imageUrl: draft.photoUrl,
 color: draft.color,
 x: draft.x,
 y: draft.y,
 shape: draft.shape,
 rotation: draft.rotation,
 width: draft.width,
 height: draft.height,
 });
 setTables((prev) => prev.map((x) => (x.id === draft.id ? { ...x, ...draft } : x)));
 }
 // Refresh the shared TanStack cache so the host's tablesQ.data + every
 // other consumer reflects the new/updated row. Without this the
 // shell's props-sync useEffect would wipe local-only inserts on the
 // next host re-render.
 await qc.invalidateQueries({ queryKey: ["tables"] });
 onBack();
 } catch {
 setSaving(false);
 }
 }

 function handleDelete() {
 if (mode !== "edit") return;
 if (usedIds.has(draft.id)) {
 setConfirmState({
 open: true,
 title: t("cantDeleteTitle"),
 message: t("cantDeleteMessage", { number: draft.number }),
 singleButton: true,
 onConfirm: null,
 });
 return;
 }
 setConfirmState({
 open: true,
 title: t("deleteTitle"),
 message: t("deleteMessage", { number: draft.number, label: draft.name ? " · " + draft.name : "" }),
 onConfirm: async () => {
 setConfirmState({ open: false });
 try {
 await deleteTable(draft.id);
 setTables((prev) => prev.filter((x) => x.id !== draft.id));
 await qc.invalidateQueries({ queryKey: ["tables"] });
 onBack();
 } catch {
 }
 },
 });
 }

 return (
 <div>
 <SubpageStickyBar onBack={() => { track("dash_settings_table_click_back"); onBack(); }} onSave={save} canSave={!saving} />

 <div className="min-w-0">
 <div className="mb-5">
 <div className="text-xs text-muted-foreground">
 {t("settingsBreadcrumb")} / {t("title")}
 </div>
 <h2 className="text-xl font-medium text-foreground mt-1">
 {mode === "new" ? t("addFirstTable") : t("tableLabelAria", { number: draft.number })}
 </h2>
 <p className="text-xs text-muted-foreground mt-1.5 leading-snug">
 {t("formTip")}
 </p>
 </div>


 <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8">
 <div className="min-w-0">
 <FloorMap
 tables={mode === "edit"
 ? tables.map((x) => (x.id === draft.id ? draft : x))
 : [...tables, draft]}
 selectedId={draft.id}
 onSelectTable={() => {}}
 onPickPosition={(x, y) => { track("dash_settings_table_click_map"); setDraft((d) => ({ ...d, x, y })); }}
 onMove={(x, y) => setDraft((d) => ({ ...d, x, y }))}
 onRotate={(deg) => setDraft((d) => ({ ...d, rotation: deg }))}
 onResize={(width, height) => setDraft((d) => ({ ...d, width, height }))}
 wide
 dimUnselected
 />
 </div>
 <div className="min-w-0">
 <TableSettings
 table={draft}
 onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))}
 />
 {mode === "edit" ? (
 <div className="mt-6 flex flex-col items-center gap-1">
 <button
 type="button"
 onClick={() => setQrOpen(true)}
 className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-muted-foreground rounded-lg transition-colors"
 >
 <QrIcon size={13} />
 {t("showQr")}
 </button>
 <button
 type="button"
 onClick={handleDelete}
 className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-red-600 rounded-lg transition-colors"
 >
 <TrashIcon size={13} />
 {t("deleteTable")}
 </button>
 </div>
 ) : null}
 </div>
 </div>
 </div>

 <ConfirmDialog
 open={confirmState.open}
 title={confirmState.title}
 message={confirmState.message}
 singleButton={confirmState.singleButton}
 onConfirm={confirmState.onConfirm ?? undefined}
 onCancel={() => setConfirmState({ open: false })}
 />

 <TableQrModal
 open={qrOpen}
 onClose={() => setQrOpen(false)}
 tableNumber={draft.number}
 tableLabel={draft.name}
 menuUrl={menuUrl}
 />
 </div>
 );
}

const settingsCard = "rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border p-4 sm:p-5";

function TableSettings({
 table,
 onChange,
 className,
}: {
 table: TableEntity;
 onChange: (patch: Partial<TableEntity>) => void;
 // Extra classes on the card, e.g. a max-height + overflow-y-auto so the
 // whole editor scrolls inside the space left next to / below the map.
 className?: string;
}) {
 const t = useTranslations("dashboard.tables");
 return (
 <div className={settingsCard + " space-y-3" + (className ? " " + className : "")}>
 <div className="flex flex-col md:grid md:grid-cols-[2fr_3fr] gap-3">
 <div className="flex-1 min-w-0">
 <label htmlFor="table-shape" className="block text-sm font-medium text-foreground mb-2.5">{t("shapeLabel")}:</label>
 <Select<string>
 id="table-shape"
 value={table.shape}
 title={t("shapeLabel")}
 // Reset the custom size so the new shape's fixed proportion takes over.
 onChange={(next) => onChange({ shape: next as TableEntity["shape"], width: null, height: null })}
 options={[
 { value: "circle", label: t("shapeCircle") },
 { value: "square", label: t("shapeSquare") },
 { value: "rect", label: t("shapeRect") },
 { value: "oval", label: t("shapeOval") },
 ]}
 />
 </div>
 <div className="flex-1 min-w-0">
 <label className="block text-sm font-medium text-foreground mb-2.5">{t("name")}:</label>
 <input
 type="text"
 data-testid="table-name"
 value={table.name}
 onChange={(e) => onChange({ name: e.target.value })}
 onFocus={() => track("dash_settings_table_focus_name")}
 placeholder={t("namePlaceholder")}
 className={formInputClass}
 />
 </div>
 </div>

 <div className="flex gap-3">
 <div className="flex-1 min-w-0">
 <label className="block text-sm font-medium text-foreground mb-2.5">{t("number")}:</label>
 <Stepper
 value={table.number}
 min={1}
 testId="table-number"
 onChange={(n) => onChange({ number: n })}
 onPlus={() => track("dash_settings_table_number_plus")}
 onMinus={() => track("dash_settings_table_number_minus")}
 />
 </div>
 <div className="flex-1 min-w-0">
 <label className="block text-sm font-medium text-foreground mb-2.5">{t("seats")}:</label>
 <Stepper
 value={table.capacity}
 min={1}
 max={20}
 testId="table-seats"
 onChange={(n) => onChange({ capacity: n })}
 onPlus={() => track("dash_settings_table_seats_plus")}
 onMinus={() => track("dash_settings_table_seats_minus")}
 />
 </div>
 </div>

 {/* color + photo side by side on desktop; the photo is a square and the
     5-per-row swatch grid roughly matches its height */}
 <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 md:gap-5">
 <TableColorPicker
 value={table.color}
 onChange={(color) => onChange({ color })}
 />
 <div>
 <label className="block text-sm font-medium text-foreground mb-2.5">{t("photo")}:</label>
 <PhotoPicker
 url={table.photoUrl}
 onChange={(url) => onChange({ photoUrl: url })}
 onAddClick={() => track("dash_settings_table_add_photo")}
 onRemoveClick={() => track("dash_settings_table_delete_photo")}
 inputId={"table-photo-" + table.id}
 width="w-full md:max-w-[230px]"
 height="h-32 md:h-auto md:aspect-square"
 />
 </div>
 </div>
 </div>
 );
}

const TABLE_COLORS = [
 "#A8174E", "#C8102E", "#D55427", "#92684C", "#A8531A", "#D4A017", "#D9C29A", "#6F8246", "#3D7259", "#1F5959",
 "#1F3B57", "#314D8C", "#5B6E80", "#7E5F87", "#5E4734", "#9E866B", "#E8541C", "#3B3B3B", "#000000",
];

function TableColorPicker({
 value,
 onChange,
}: {
 value: string | null;
 onChange: (color: string | null) => void;
}) {
 const t = useTranslations("dashboard.tables");
 const colorPickerRef = useRef<HTMLInputElement>(null);
 const normalized = (value || "").toLowerCase();
 const hasPreset = TABLE_COLORS.some((c) => c.toLowerCase() === normalized);
 return (
 <div>
 <label className="block text-sm font-medium text-foreground mb-2.5">{t("colorLabel")}:</label>
 <div className="grid grid-cols-7 md:grid-cols-5 gap-2 relative">
 {TABLE_COLORS.map((c) => {
 const selected = c.toLowerCase() === normalized;
 return (
 <button
 key={c}
 type="button"
 onClick={() => { track("dash_settings_table_color_pick"); onChange(c); }}
 className={
 "w-full aspect-square rounded-full transition-all " +
 (selected ? "ring-2 ring-offset-2 ring-foreground" : "")
 }
 style={{ backgroundColor: c }}
 aria-label={c}
 />
 );
 })}
 <button
 type="button"
 onClick={() => colorPickerRef.current?.click()}
 className={
 "w-full aspect-square rounded-full transition-all " +
 (value && !hasPreset ? "ring-2 ring-offset-2 ring-foreground" : "")
 }
 style={{
 background:
 "conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
 }}
 aria-label={t("colorCustom")}
 />
 <input
 ref={colorPickerRef}
 type="color"
 value={value || "#000000"}
 onChange={(e) => { track("dash_settings_table_color_pick"); onChange(e.target.value); }}
 className="absolute opacity-0 pointer-events-none w-0 h-0"
 aria-hidden="true"
 />
 </div>
 </div>
 );
}
