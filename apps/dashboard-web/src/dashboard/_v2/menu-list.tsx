"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useFlip } from "./use-flip";
import { Collapsible } from "./collapsible";
import { useDashboardRouter } from "../_spa/router";
import {
 ArrowDownIcon,
 ArrowUpIcon,
 ChevronDownIcon,
 CollapseIcon,
 ExpandIcon,
 PlusIcon,
} from "./icons";
import { EmptyState, ToggleSwitch } from "./ui";
import { Page } from "./page";
import { headerBtn, headerBtnSurface, primaryBtn, sortIconBtn } from "./tokens";
import { getMlWithFallback } from "./i18n";
import { currencySymbolOf, moveItem } from "./helpers";
import { fetchSubscriptionStatus, patchItem, reorderCategories, reorderItemsBulk } from "./api";

import { useRestaurant } from "./restaurant-context";
import type { Category, Dish } from "./types";
import { track } from "@/lib/dashboard-events";

interface SubData {
 subscriptionStatus: string | null;
 trialEndsAt: string | null;
}

export function MenuList({
 initialCategories,
 initialSub = null,
 onPersisted,
 currentGroupId = null,
}: {
 initialCategories: Category[];
 initialSub?: SubData | null;
 onPersisted?: () => void;
 currentGroupId?: string | null;
}) {
 const t = useTranslations("dashboard.menu");
 const restaurant = useRestaurant();
 const router = useDashboardRouter();
 const { defaultLang, currency } = restaurant;
 const currencySymbol = currencySymbolOf(currency);

 const [categories, setCategories] = useState<Category[]>(initialCategories);
 // Flat layout: top-level (ungrouped) categories + groups with their nested
 // categories all visible on the same page. currentGroupId from the URL is
 // ignored — kept only so older deep links don't 404.
 // All non-group categories regardless of parent — drives bulk operations
 // (expand-all, item totals, scan-banner visibility).
 const scopedLeaves = useMemo(
   () =>
     categories
       .filter((c) => !c.isGroup)
       .sort((a, b) => a.sortOrder - b.sortOrder),
   [categories],
 );
 const ungroupedCategories = useMemo(
   () =>
     categories
       .filter((c) => !c.isGroup && (c.parentId ?? null) === null)
       .sort((a, b) => a.sortOrder - b.sortOrder),
   [categories],
 );
 const topLevelGroups = useMemo(
   () =>
     categories
       .filter((c) => c.isGroup)
       .sort((a, b) => a.sortOrder - b.sortOrder),
   [categories],
 );
 const categoriesInGroup = (groupId: string) =>
   categories
     .filter((c) => !c.isGroup && c.parentId === groupId)
     .sort((a, b) => a.sortOrder - b.sortOrder);
 const currentGroup = useMemo(
   () => (currentGroupId ? categories.find((c) => c.id === currentGroupId && c.isGroup) ?? null : null),
   [categories, currentGroupId],
 );
 const groupsFlipRef = useFlip<HTMLDivElement>([topLevelGroups.map((c) => c.id).join(",")]);
 // Scroll position survives navigations to the item / category edit pages.
 // sessionStorage: restoring a week-old scroll offset in a fresh tab would be
 // surprising, so it resets per tab.
 const STATE_KEY = "dash_menu_list_state_v1";
 // Which categories are folded is a lasting preference, not a per-tab detail:
 // an owner who collapses a 30-category menu wants it collapsed tomorrow too.
 // Hence localStorage, and hence the header's collapse control is a one-time
 // action rather than something to repeat every session.
 const OPEN_KEY = "dash_menu_list_open_v1";
 const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
 let saved: Record<string, unknown> = {};
 try {
 const raw = JSON.parse(localStorage.getItem(OPEN_KEY) || "{}");
 if (raw && typeof raw === "object") saved = raw as Record<string, unknown>;
 } catch {
 // ignore corrupt JSON
 }
 // Seeded from the categories this venue actually has, which also drops the
 // ids of every other venue the owner visited — the store never grows past
 // the menu in front of us. Unknown id = open, the historical default.
 // Groups are absent on purpose: they no longer fold.
 const map: Record<string, boolean> = {};
 initialCategories.forEach((c) => {
 if (c.isGroup) return;
 map[c.id] = typeof saved[c.id] === "boolean" ? (saved[c.id] as boolean) : true;
 });
 return map;
 });
 const [sub, setSub] = useState<SubData | null>(initialSub);

 // Empty layout: no categories and no groups anywhere (drives the empty state).
 const noCategories = scopedLeaves.length === 0 && topLevelGroups.length === 0;

 useEffect(() => {
 if (!initialSub) {
 fetchSubscriptionStatus().then((s) => {
 if (s) setSub({ subscriptionStatus: s.subscriptionStatus, trialEndsAt: s.trialEndsAt });
 });
 }
 }, [initialSub]);

 // Persist openIds whenever they change, pruned to the live categories for
 // the same reason the initial read is: no unbounded growth across venues.
 useEffect(() => {
 try {
 const known: Record<string, boolean> = {};
 categories.forEach((c) => {
 if (c.id in openIds) known[c.id] = openIds[c.id];
 });
 localStorage.setItem(OPEN_KEY, JSON.stringify(known));
 } catch {
 // localStorage might be disabled or full; OK to drop persistence.
 }
 }, [openIds, categories]);

 // Restore window scroll on mount, then continuously persist scrollY on
 // scroll. Continuous-save (rather than save-on-unmount) is required
 // because the SPA router scrolls the window to 0 on push() *before*
 // React unmounts this component — by the time our cleanup fires, the
 // saved scrollY would already be 0.
 useLayoutEffect(() => {
 let saved: { scrollY?: number } = {};
 try { saved = JSON.parse(sessionStorage.getItem(STATE_KEY) || "{}"); } catch { /* ignore */ }
 if (typeof saved.scrollY === "number") {
 // Defer to next frame so list rows have committed full layout, otherwise
 // the page is still short and scrollTo clamps to a smaller value.
 requestAnimationFrame(() => window.scrollTo(0, saved.scrollY!));
 }
 let last = 0;
 let pending = false;
 const onScroll = () => {
 last = window.scrollY;
 if (pending) return;
 pending = true;
 requestAnimationFrame(() => {
 pending = false;
 try {
 const prev = JSON.parse(sessionStorage.getItem(STATE_KEY) || "{}");
 sessionStorage.setItem(STATE_KEY, JSON.stringify({ ...prev, scrollY: last }));
 } catch { /* ignore */ }
 });
 };
 window.addEventListener("scroll", onScroll, { passive: true });
 return () => window.removeEventListener("scroll", onScroll);
 }, []);

 useEffect(() => {
 setCategories(initialCategories);
 setOpenIds((prev) => {
 let changed = false;
 const next = { ...prev };
 initialCategories.forEach((c) => {
 if (!c.isGroup && !(c.id in next)) {
 next[c.id] = true;
 changed = true;
 }
 });
 return changed ? next : prev;
 });
 }, [initialCategories]);

 // Only leaf categories fold, so they alone decide which way the header
 // control points.
 const anyOpen = scopedLeaves.some((c) => openIds[c.id]);

 function toggleCategory(id: string) {
 // Tracked outside the updater: React may re-run an updater (StrictMode, a
 // replayed render) and the event would be counted twice.
 const willOpen = !openIds[id];
 track("Click", willOpen ? "Menu category expand" : "Menu category collapse");
 setOpenIds((p) => ({ ...p, [id]: !p[id] }));
 }
 function expandAll() {
 track("Click", "Menu expand all");
 setOpenIds((prev) => {
 const next = { ...prev };
 scopedLeaves.forEach((c) => { next[c.id] = true; });
 return next;
 });
 }
 function collapseAll() {
 track("Click", "Menu collapse all");
 setOpenIds((prev) => {
 const next = { ...prev };
 scopedLeaves.forEach((c) => { next[c.id] = false; });
 return next;
 });
 }

 // ── Race-safe writes via AbortController ─────────────────────────────────
 //
 // Each rapid click cancels the previous in-flight request for the same
 // resource and fires a fresh one with the latest desired state. The server
 // sees only one live operation per resource (per-dish for visibility,
 // per-category for dish reorder, single for category reorder). PATCH/bulk
 // endpoints are idempotent — last-arriving response is the authoritative
 // state. AbortError is silently ignored (request superseded by user).
 const catReorderAborterRef = useRef<AbortController | null>(null);
 const dishReorderAbortersRef = useRef<Map<string, AbortController>>(new Map());
 const visibilityAbortersRef = useRef<Map<string, AbortController>>(new Map());
 const visibilityOriginalRef = useRef<Map<string, { visible: boolean; categoryId: string }>>(new Map());

 useEffect(() => () => {
 catReorderAborterRef.current?.abort();
 dishReorderAbortersRef.current.forEach((ac) => ac.abort());
 visibilityAbortersRef.current.forEach((ac) => ac.abort());
 }, []);

 const isAbort = (e: unknown) => (e as { name?: string } | null)?.name === "AbortError";

 async function moveGroup(idx: number, dir: number) {
 track("Sort", dir < 0 ? "Menu group up" : "Menu group down");
 const reordered = moveItem(topLevelGroups, idx, dir);
 const idToOrder = new Map(reordered.map((g, i) => [g.id, i]));
 setCategories((cats) =>
   cats.map((c) => (idToOrder.has(c.id) ? { ...c, sortOrder: idToOrder.get(c.id)! } : c)),
 );
 catReorderAborterRef.current?.abort();
 const ac = new AbortController();
 catReorderAborterRef.current = ac;
 try {
 await reorderCategories(
   reordered.map((g, i) => ({ id: g.id, sortOrder: i })),
   ac.signal,
 );
 } catch (e) {
 if (isAbort(e)) return;
 }
 }

 async function moveCategory(siblings: Category[], idx: number, dir: number) {
 // Reorder happens within the passed sibling list (per-group or ungrouped).
 track("Sort", dir < 0 ? "Menu category up" : "Menu category down");
 const reorderedSiblings = moveItem(siblings, idx, dir);
 const idToOrder = new Map(reorderedSiblings.map((c, i) => [c.id, i]));
 setCategories((cats) =>
   cats.map((c) => (idToOrder.has(c.id) ? { ...c, sortOrder: idToOrder.get(c.id)! } : c)),
 );
 catReorderAborterRef.current?.abort();
 const ac = new AbortController();
 catReorderAborterRef.current = ac;
 try {
 await reorderCategories(
   reorderedSiblings.map((c, i) => ({ id: c.id, sortOrder: i })),
   ac.signal,
 );
 } catch (e) {
 if (isAbort(e)) return;
 }
 }

 async function moveDish(categoryId: string, idx: number, dir: number) {
 track("Sort", dir < 0 ? "Menu item up" : "Menu item down");
 const cat = categories.find((c) => c.id === categoryId);
 if (!cat) return;
 const reordered = moveItem(cat.dishes, idx, dir);
 setCategories((cats) =>
 cats.map((c) => (c.id === categoryId ? { ...c, dishes: reordered } : c)),
 );
 dishReorderAbortersRef.current.get(categoryId)?.abort();
 const ac = new AbortController();
 dishReorderAbortersRef.current.set(categoryId, ac);
 try {
 await reorderItemsBulk(reordered.map((d, i) => ({ id: d.id, sortOrder: i })), ac.signal);
 } catch (e) {
 if (isAbort(e)) return;
 }
 }

 async function toggleDishVisible(categoryId: string, dishId: string) {
 track("Click", "Menu item visibility");
 const cat = categories.find((c) => c.id === categoryId);
 const dish = cat?.dishes.find((d) => d.id === dishId);
 if (!dish) return;
 const nextVisible = !dish.visible;
 // Capture original (pre-burst) state once per dish for revert-on-error.
 if (!visibilityOriginalRef.current.has(dishId)) {
 visibilityOriginalRef.current.set(dishId, { visible: dish.visible, categoryId });
 }
 setCategories((cats) =>
 cats.map((c) =>
 c.id === categoryId
 ? {
 ...c,
 dishes: c.dishes.map((d) => (d.id === dishId ? { ...d, visible: nextVisible } : d)),
 }
 : c,
 ),
 );
 visibilityAbortersRef.current.get(dishId)?.abort();
 const ac = new AbortController();
 visibilityAbortersRef.current.set(dishId, ac);
 try {
 await patchItem(dishId, { isActive: nextVisible }, ac.signal);
 visibilityOriginalRef.current.delete(dishId);
 } catch (e) {
 if (isAbort(e)) return;
 // Final request failed — revert to original pre-burst state.
 const orig = visibilityOriginalRef.current.get(dishId);
 if (orig) {
 setCategories((cats) =>
 cats.map((c) =>
 c.id === orig.categoryId
 ? {
 ...c,
 dishes: c.dishes.map((d) => (d.id === dishId ? { ...d, visible: orig.visible } : d)),
 }
 : c,
 ),
 );
 visibilityOriginalRef.current.delete(dishId);
 }
 }
 }

 return (
  <Page
   title={currentGroup ? getMlWithFallback(currentGroup.name, defaultLang, defaultLang) : t("title")}
   onBack={currentGroup ? () => router.push({ name: "menu" }) : undefined}
   actions={
    <>
     {scopedLeaves.length > 0 ? (
      <button
       type="button"
       onClick={anyOpen ? collapseAll : expandAll}
       className={headerBtn + " relative justify-center shrink-0 " + headerBtnSurface}
      >
       {/* width reservation: longer label fixes the width */}
       <span className="invisible inline-flex items-center gap-1.5" aria-hidden>
        <ExpandIcon size={14} />
        {t("expand").length >= t("collapse").length ? t("expand") : t("collapse")}
       </span>
       <span className="absolute inset-0 inline-flex items-center justify-center gap-1.5">
        {anyOpen ? <CollapseIcon size={14} /> : <ExpandIcon size={14} />}
        {anyOpen ? t("collapse") : t("expand")}
       </span>
      </button>
     ) : null}
    </>
   }
  >

 {noCategories ? (
 <EmptyState
 title={t("noCategories")}
 subtitle={t("noCategoriesSub")}
 action={
 <button
 type="button"
 onClick={() => {
 track("Click", "Menu add category");
 router.push({ name: "category.new" });
 }}
 className={primaryBtn + " inline-flex items-center gap-1.5"}
 >
 <PlusIcon size={14} />
 {t("addCategory")}
 </button>
 }
 />
 ) : (
 <div className="space-y-3">
 {/* Each group: borderless header (name + reorder buttons) over its
     child categories. A group is always expanded — only categories
     fold. */}
 {topLevelGroups.length > 0 && (
 <div ref={groupsFlipRef} className="space-y-3">
 {topLevelGroups.map((g, gi) => (
 <GroupBlock
 key={g.id}
 flipId={g.id}
 title={getMlWithFallback(g.name, defaultLang, defaultLang)}
 kids={categoriesInGroup(g.id)}
 openIds={openIds}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 t={t}
 toggleCategory={toggleCategory}
 moveCategory={moveCategory}
 moveDish={moveDish}
 toggleDishVisible={toggleDishVisible}
 sort={{
 onUp: () => moveGroup(gi, -1),
 onDown: () => moveGroup(gi, 1),
 upDisabled: gi === 0,
 downDisabled: gi === topLevelGroups.length - 1,
 }}
 onEditTitle={() => {
 track("Click", "Menu group edit");
 router.push({ name: "group.edit", id: g.id });
 }}
 />
 ))}
 </div>
 )}

 {/* Categories belonging to no group ride in a group-shaped block of
     their own, always last. It carries no reorder buttons (there is
     no second bucket to swap with — its position is the rule, not a
     preference) and no edit target, because it stands for the absence
     of a group rather than a stored one. Its header is dropped when
     there are no real groups: a lone "ungrouped" caption over the
     whole menu labels nothing. */}
 {ungroupedCategories.length > 0 && (
 <GroupBlock
 flipId="ungrouped"
 title={topLevelGroups.length > 0 ? t("ungrouped") : null}
 kids={ungroupedCategories}
 openIds={openIds}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 t={t}
 toggleCategory={toggleCategory}
 moveCategory={moveCategory}
 moveDish={moveDish}
 toggleDishVisible={toggleDishVisible}
 />
 )}

 <div className="flex items-center justify-center gap-6 pt-6 pb-8 md:pb-0">
 <button
 type="button"
 onClick={() => {
 track("Click", "Menu add category");
 router.push({ name: "category.new" });
 }}
 className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
 >
 <PlusIcon size={14} />
 {t("addCategory")}
 </button>
 <button
 type="button"
 onClick={() => {
 track("Click", "Menu add group");
 router.push({ name: "group.new" });
 }}
 className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
 >
 <PlusIcon size={14} />
 {t("addGroup", { defaultValue: "Add group" })}
 </button>
 </div>
 </div>
 )}
 </Page>
 );
}

/** One group's worth of the list: an optional header over its categories.
 *  Serves both a real group and the ungrouped bucket — the bucket simply
 *  passes no `sort` and no `onEditTitle`, and passes a null title when it is
 *  the only block on the page. */
function GroupBlock({
 flipId,
 title,
 kids,
 openIds,
 defaultLang,
 currencySymbol,
 t,
 toggleCategory,
 moveCategory,
 moveDish,
 toggleDishVisible,
 sort,
 onEditTitle,
}: {
 flipId: string;
 title: string | null;
 kids: Category[];
 openIds: Record<string, boolean>;
 defaultLang: string;
 currencySymbol: string;
 t: ReturnType<typeof useTranslations>;
 toggleCategory: (id: string) => void;
 moveCategory: (siblings: Category[], idx: number, dir: number) => void;
 moveDish: (categoryId: string, idx: number, dir: number) => void;
 toggleDishVisible: (categoryId: string, dishId: string) => void;
 sort?: { onUp: () => void; onDown: () => void; upDisabled: boolean; downDisabled: boolean };
 onEditTitle?: () => void;
}) {
 const kidsFlipRef = useFlip<HTMLDivElement>([kids.map((c) => c.id).join(",")]);
 const titleClass = "min-w-0 text-lg font-semibold text-foreground/70 truncate";
 return (
 <div data-flip-id={flipId} className="space-y-3">
 {title !== null ? (
 /* min-h matches the row a real group gets from its 32px reorder
    buttons, so a header without them keeps the same rhythm. */
 <div className="flex items-center gap-2 py-1 min-h-10">
 {onEditTitle ? (
 <button
 type="button"
 onClick={onEditTitle}
 className={titleClass + " text-left hover:text-foreground transition-colors"}
 >
 {title}
 </button>
 ) : (
 <span className={titleClass}>{title}</span>
 )}
 <span className="flex-1" />
 {sort ? (
 <div className="flex items-center gap-0.5 shrink-0">
 <span className="inline-flex items-center gap-0">
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); sort.onUp(); }}
 disabled={sort.upDisabled}
 className={sortIconBtn}
 aria-label={t("moveCategoryUp")}
 >
 <ArrowUpIcon size={14} />
 </button>
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); sort.onDown(); }}
 disabled={sort.downDisabled}
 className={sortIconBtn}
 aria-label={t("moveCategoryDown")}
 >
 <ArrowDownIcon size={14} />
 </button>
 </span>
 </div>
 ) : null}
 </div>
 ) : null}

 <div ref={kidsFlipRef} className="space-y-3">
 {kids.map((cat, ci) => (
 <div key={cat.id} data-flip-id={cat.id}>
 <CategoryAccordion
 category={cat}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 isOpen={!!openIds[cat.id]}
 onToggle={() => toggleCategory(cat.id)}
 isFirst={ci === 0}
 isLast={ci === kids.length - 1}
 onMoveUp={() => moveCategory(kids, ci, -1)}
 onMoveDown={() => moveCategory(kids, ci, 1)}
 onMoveDish={moveDish}
 onToggleDishVisible={toggleDishVisible}
 />
 </div>
 ))}
 </div>
 </div>
 );
}

function CategoryAccordion({
 category,
 defaultLang,
 currencySymbol,
 isOpen,
 onToggle,
 isFirst,
 isLast,
 onMoveUp,
 onMoveDown,
 onMoveDish,
 onToggleDishVisible,
}: {
 category: Category;
 defaultLang: string;
 currencySymbol: string;
 isOpen: boolean;
 onToggle: () => void;
 isFirst: boolean;
 isLast: boolean;
 onMoveUp: () => void;
 onMoveDown: () => void;
 onMoveDish: (categoryId: string, idx: number, dir: number) => void;
 onToggleDishVisible: (categoryId: string, dishId: string) => void;
}) {
 const t = useTranslations("dashboard.menu");
 const router = useDashboardRouter();
 const dishesFlipRef = useFlip<HTMLDivElement>([category.dishes.map((d) => d.id).join(",")]);
 return (
 <div className="bg-card border border-border/60 rounded-xl overflow-hidden">
 <div className="flex items-center gap-1.5 pl-2 pr-3 py-2">
 <button
 type="button"
 onClick={() => {
 track("Click", "Menu category");
 onToggle();
 }}
 aria-expanded={isOpen}
 aria-label={isOpen ? t("collapseCategory") : t("expandCategory")}
 className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary transition-colors shrink-0"
 >
 <span
 className="transition-transform duration-150 inline-flex"
 style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
 >
 <ChevronDownIcon size={14} />
 </span>
 </button>
 <button
 type="button"
 onClick={() => {
 track("Click", "Menu category edit");
 router.push({ name: "category.edit", id: category.id });
 }}
 className="flex-1 min-w-0 text-left text-sm font-semibold text-foreground/70 truncate hover:text-foreground transition-colors"
 >
 {getMlWithFallback(category.name, defaultLang, defaultLang)}
 </button>

 <div className="flex items-center gap-0.5 shrink-0">
 <span className="inline-flex items-center gap-0">
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
 disabled={isFirst}
 className={sortIconBtn}
 aria-label={t("moveCategoryUp")}
 >
 <ArrowUpIcon size={14} />
 </button>
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
 disabled={isLast}
 className={sortIconBtn}
 aria-label={t("moveCategoryDown")}
 >
 <ArrowDownIcon size={14} />
 </button>
 </span>
 </div>
 </div>

 <Collapsible open={isOpen}>
 <div className="border-t border-border">
 {category.dishes.length === 0 ? (
 <p className="text-sm text-muted-foreground h-12 flex items-center justify-center">
 {t("noDishes")}
 </p>
 ) : (
 <div ref={dishesFlipRef} className="divide-y divide-border">
 {category.dishes.map((dish, idx) => (
 <div key={dish.id} data-flip-id={dish.id}>
 <DishRow
 dish={dish}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 isFirst={idx === 0}
 isLast={idx === category.dishes.length - 1}
 onMoveUp={() => onMoveDish(category.id, idx, -1)}
 onMoveDown={() => onMoveDish(category.id, idx, 1)}
 onToggleVisible={() => onToggleDishVisible(category.id, dish.id)}
 />
 </div>
 ))}
 </div>
 )}

 <button
 type="button"
 onClick={() => {
 track("Click", "Menu add item");
 router.push({ name: "item.new", categoryId: category.id });
 }}
 className="w-full flex items-center gap-2 pl-2 pr-3 py-2 text-sm text-muted-foreground/60 transition-colors border-t border-border"
 >
 <span className="w-8 h-8 flex items-center justify-center shrink-0">
 <PlusIcon size={14} />
 </span>
 {t("addDish")}
 </button>
 </div>
 </Collapsible>
 </div>
 );
}

function DishRow({
 dish,
 defaultLang,
 currencySymbol,
 isFirst,
 isLast,
 onMoveUp,
 onMoveDown,
 onToggleVisible,
}: {
 dish: Dish;
 defaultLang: string;
 currencySymbol: string;
 isFirst: boolean;
 isLast: boolean;
 onMoveUp: () => void;
 onMoveDown: () => void;
 onToggleVisible: () => void;
}) {
 const t = useTranslations("dashboard.menu");
 const tc = useTranslations("dashboard.common");
 const router = useDashboardRouter();
 const rowCls =
 "flex items-center gap-2.5 pl-3 pr-2 py-2 transition-colors cursor-pointer select-none";
 const dimCls = dish.visible ? "" : "opacity-50";
 const openDish = () => {
 track("Click", "Menu item open");
 router.push({ name: "item.edit", id: dish.id });
 };
 return (
 <div
 role="button"
 tabIndex={0}
 onClick={openDish}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 openDish();
 }
 }}
 aria-label={t("editDish")}
 className={rowCls}
 >
 {/* The row itself opens the dish, so the switch swallows its own click. */}
 <div
 className="flex items-center shrink-0"
 onClick={(e) => e.stopPropagation()}
 >
 <ToggleSwitch
 size="sm"
 checked={dish.visible}
 onChange={onToggleVisible}
 label={dish.visible ? t("hideDish") : t("showDish")}
 />
 </div>

 <div className={"flex-1 min-w-0 text-left flex items-center gap-2 " + dimCls}>
 <div className="min-w-0 flex-1 flex items-center gap-1.5">
 <span className="text-sm font-medium text-foreground truncate">
 {getMlWithFallback(dish.name, defaultLang, defaultLang)}
 </span>
 </div>
 {Number(dish.price) > 0 ? (
 <div className="text-sm text-muted-foreground tabular-nums shrink-0">{currencySymbol + dish.price}</div>
 ) : null}
 </div>

 <div className="flex items-center gap-0 shrink-0">
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
 disabled={isFirst}
 className={sortIconBtn}
 aria-label={tc("moveUp")}
 >
 <ArrowUpIcon size={14} />
 </button>
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
 disabled={isLast}
 className={sortIconBtn}
 aria-label={tc("moveDown")}
 >
 <ArrowDownIcon size={14} />
 </button>
 </div>
 </div>
 );
}
