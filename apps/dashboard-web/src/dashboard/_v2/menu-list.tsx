"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Utensils } from "lucide-react";
import { useFlip } from "./use-flip";
import { Collapsible } from "./collapsible";
import { useDashboardRouter } from "../_spa/router";
import {
 ArrowDownIcon,
 ArrowLeftIcon,
 ArrowUpIcon,
 ChevronDownIcon,
 ChevronRightIcon,
 CollapseIcon,
 ExpandIcon,
 FolderIcon,
 PlusIcon,
} from "./icons";
import { EmptyState, Modal, PageHeaderSlot, SubscriptionChip, ToggleSwitch } from "./ui";
import { primaryBtn } from "./tokens";
import { getMlWithFallback } from "./i18n";
import { currencySymbolOf, moveItem } from "./helpers";
import { fetchSubscriptionStatus, patchItem, reorderCategories, reorderItemsBulk } from "./api";
import { showApiError } from "@/lib/show-api-error";

import { useRestaurant } from "./restaurant-context";
import type { Category, Dish } from "./types";
import { track } from "@/lib/dashboard-events";

interface SubData {
 plan: string | null;
 subscriptionStatus: string | null;
 trialEndsAt: string | null;
}

// Persist which groups / categories are collapsed, per restaurant, in
// localStorage so the expanded/collapsed layout survives navigations and
// full page reloads. We store the set of *collapsed* ids — default (absent)
// is expanded.
const COLLAPSE_KEY = (restaurantId: string) => `dash_menu_collapsed_v1_${restaurantId}`;

function readCollapsed(restaurantId: string): Set<string> {
 try {
 const raw = window.localStorage.getItem(COLLAPSE_KEY(restaurantId));
 if (!raw) return new Set();
 const arr = JSON.parse(raw);
 return Array.isArray(arr) ? new Set(arr.filter((x): x is string => typeof x === "string")) : new Set();
 } catch {
 return new Set();
 }
}

function writeCollapsed(restaurantId: string, ids: Set<string>) {
 try {
 window.localStorage.setItem(COLLAPSE_KEY(restaurantId), JSON.stringify([...ids]));
 } catch {
 /* ignore (private mode / quota) */
 }
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
 const tNav = useTranslations("dashboard.nav");
 const tCat = useTranslations("dashboard.categoryForm");
 const restaurant = useRestaurant();
 const router = useDashboardRouter();
 const { defaultLang, currency, menuUrl } = restaurant;
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
 const ungroupedFlipRef = useFlip<HTMLDivElement>([ungroupedCategories.map((c) => c.id).join(",")]);
 // Persist menu UI state (open categories + scroll position) across
 // navigations to the item / category edit pages. sessionStorage so it
 // resets per tab.
 const STATE_KEY = "dash_menu_list_state_v1";
 const [sub, setSub] = useState<SubData | null>(initialSub);

 // Empty layout: no categories and no groups anywhere (drives the empty state).
 const noCategories = scopedLeaves.length === 0 && topLevelGroups.length === 0;

 // ── Collapse / expand state (groups + categories) ────────────────────────
 // Set of collapsed ids, restored from localStorage per restaurant.
 const [collapsed, setCollapsed] = useState<Set<string>>(() => readCollapsed(restaurant.id));
 useEffect(() => {
 writeCollapsed(restaurant.id, collapsed);
 }, [collapsed, restaurant.id]);

 // Everything that can be collapsed: every category. Groups are always
 // expanded for now (their collapse is disabled), so they're excluded here.
 const collapsibleIds = useMemo(
   () => [...scopedLeaves.map((c) => c.id)],
   [scopedLeaves],
 );
 const anyExpanded = collapsibleIds.some((id) => !collapsed.has(id));
 const isCollapsed = (id: string) => collapsed.has(id);
 const toggleCollapse = (id: string) =>
   setCollapsed((prev) => {
     const next = new Set(prev);
     if (next.has(id)) next.delete(id);
     else next.add(id);
     return next;
   });
 // Header button: collapse everything if anything is open, else expand all.
 const toggleAll = () => {
   track(anyExpanded ? "dash_menu_collapse_all" : "dash_menu_expand_all");
   setCollapsed(anyExpanded ? new Set(collapsibleIds) : new Set());
 };

 useEffect(() => {
 if (!initialSub) {
 fetchSubscriptionStatus().then((s) => {
 if (s) setSub({ plan: s.plan, subscriptionStatus: s.subscriptionStatus, trialEndsAt: s.trialEndsAt });
 });
 }
 }, [initialSub]);

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
 }, [initialCategories]);

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
 track(dir < 0 ? "dash_menu_group_sort_up" : "dash_menu_group_sort_down");
 const reordered = moveItem(topLevelGroups, idx, dir);
 const idToOrder = new Map(reordered.map((g, i) => [g.id, i]));
 // Snapshot the pre-move state so a failed server write can be reverted
 // instead of leaving the optimistic order permanently diverged from the DB.
 let prev: Category[] | null = null;
 setCategories((cats) => {
   prev = cats;
   return cats.map((c) => (idToOrder.has(c.id) ? { ...c, sortOrder: idToOrder.get(c.id)! } : c));
 });
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
 if (prev) setCategories(prev);
 showApiError(e, "dash_menu_group_reorder");
 }
 }

 async function moveCategory(siblings: Category[], idx: number, dir: number) {
 // Reorder happens within the passed sibling list (per-group or ungrouped).
 track(dir < 0 ? "dash_menu_category_sort_up" : "dash_menu_category_sort_down");
 const reorderedSiblings = moveItem(siblings, idx, dir);
 const idToOrder = new Map(reorderedSiblings.map((c, i) => [c.id, i]));
 let prev: Category[] | null = null;
 setCategories((cats) => {
   prev = cats;
   return cats.map((c) => (idToOrder.has(c.id) ? { ...c, sortOrder: idToOrder.get(c.id)! } : c));
 });
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
 if (prev) setCategories(prev);
 showApiError(e, "dash_menu_category_reorder");
 }
 }

 async function moveDish(categoryId: string, idx: number, dir: number) {
 track(dir < 0 ? "dash_menu_item_sort_up" : "dash_menu_item_sort_down");
 // Compute the reordered list inside the updater so it always operates on the
 // current state (rapid double-clicks would otherwise recompute from a stale
 // closure and undo the prior move). Also snapshot for revert-on-error.
 let prev: Category[] | null = null;
 let reordered: Dish[] | null = null;
 setCategories((cats) => {
 prev = cats;
 const cat = cats.find((c) => c.id === categoryId);
 if (!cat) return cats;
 reordered = moveItem(cat.dishes, idx, dir);
 return cats.map((c) => (c.id === categoryId ? { ...c, dishes: reordered! } : c));
 });
 if (!reordered) return;
 dishReorderAbortersRef.current.get(categoryId)?.abort();
 const ac = new AbortController();
 dishReorderAbortersRef.current.set(categoryId, ac);
 try {
 await reorderItemsBulk((reordered as Dish[]).map((d, i) => ({ id: d.id, sortOrder: i })), ac.signal);
 } catch (e) {
 if (isAbort(e)) return;
 if (prev) setCategories(prev);
 showApiError(e, "dash_menu_item_reorder");
 }
 }

 async function toggleDishVisible(categoryId: string, dishId: string) {
 track("dash_menu_item_click");
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

 // "Add" opens a centered modal (title + chevron list, no footer) instead of
 // a dropdown — so the backdrop / highlight is handled by the modal itself.
 const [addOpen, setAddOpen] = useState(false);
 const addItems = [
   {
     key: "group",
     title: t("groupPrefix"),
     desc: t("addGroupDesc"),
     onClick: () => {
       track("dash_menu_add_group");
       router.push({ name: "group.new" });
     },
   },
   {
     key: "category",
     title: t("nounCategory"),
     desc: t("addCategoryDesc"),
     onClick: () => {
       track("dash_menu_add_category");
       router.push({ name: "category.new" });
     },
   },
   ...(scopedLeaves.length > 0
     ? [
         {
           key: "dish",
           title: t("nounDish"),
           desc: t("addDishDesc"),
           onClick: () => {
             track("dash_menu_add_item");
             router.push({ name: "item.new", categoryId: scopedLeaves[0].id });
           },
         },
       ]
     : []),
 ];

 return (
 <>
 <PageHeaderSlot>
 <div className="w-full flex items-center justify-between gap-3">
 <div className="flex items-center gap-2 min-w-0">
 {currentGroup ? (
 <button
 type="button"
 onClick={() => router.push({ name: "menu" })}
 className="inline-flex items-center gap-1 h-8 px-2.5 text-xs font-medium text-muted-foreground bg-secondary rounded-md"
 aria-label={t("backToMenu", { defaultValue: "Back to menu" })}
 >
 <ArrowLeftIcon size={14} />
 <span className="truncate max-w-[200px]">
 {getMlWithFallback(currentGroup.name, defaultLang, defaultLang)}
 </span>
 </button>
 ) : (
 <span className="relative -top-px flex items-center gap-2 min-w-0 text-base font-bold text-foreground">
 <Utensils size={18} className="shrink-0 hidden md:block" />
 <span className="truncate">{t("editorTitle")}</span>
 </span>
 )}
 </div>
 <div className="flex items-center gap-2 shrink-0">
 {collapsibleIds.length > 0 && (
 <button
 type="button"
 onClick={toggleAll}
 aria-label={anyExpanded ? t("collapse") : t("expand")}
 title={anyExpanded ? t("collapse") : t("expand")}
 className="inline-flex items-center justify-center gap-1.5 h-[36px] w-[36px] px-0 md:w-auto md:px-[16px] text-[14px] font-semibold rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors whitespace-nowrap"
 >
 {anyExpanded ? <CollapseIcon size={18} /> : <ExpandIcon size={18} />}
 <span className="hidden md:inline">{anyExpanded ? t("collapse") : t("expand")}</span>
 </button>
 )}
 <button
 type="button"
 data-testid="menu-add"
 onClick={() => {
 track("dash_menu_add_open");
 setAddOpen(true);
 }}
 aria-label={t("addBtn")}
 className="inline-flex items-center justify-center gap-1.5 h-[36px] w-[36px] px-0 md:w-auto md:px-[16px] text-[14px] font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg whitespace-nowrap"
 >
 <PlusIcon size={18} />
 <span className="hidden md:inline">{t("addBtn")}</span>
 </button>
 </div>
 </div>
 </PageHeaderSlot>

 <div>

 {noCategories ? (
 <EmptyState
 title={t("noCategories")}
 subtitle={t("noCategoriesSub")}
 action={
 <button
 type="button"
 onClick={() => {
 track("dash_menu_add_category");
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
 <div>
 {/* Groups first: big flat heading, then their categories. */}
 {topLevelGroups.length > 0 && (
 <div ref={groupsFlipRef}>
 {topLevelGroups.map((g, gi) => {
 const kids = categoriesInGroup(g.id);
 return (
 <GroupSection
 key={g.id}
 g={g}
 gi={gi}
 kids={kids}
 isVeryFirst={gi === 0}
 topLevelGroupsLength={topLevelGroups.length}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 moveGroup={moveGroup}
 moveCategory={moveCategory}
 moveDish={moveDish}
 toggleDishVisible={toggleDishVisible}
 isCollapsed={isCollapsed}
 toggleCollapse={toggleCollapse}
 />
 );
 })}
 </div>
 )}

 {/* Ungrouped categories last, under a virtual "No group" heading that
     mirrors a real group header but is intentionally static — not
     clickable, not hoverable, no sort arrows. */}
 {ungroupedCategories.length > 0 && (
 <div className={topLevelGroups.length > 0 ? "pt-4" : ""}>
 <div className="flex items-center gap-2.5 py-4 sm:py-5 px-4 sm:px-5 rounded-2xl bg-primary/[0.035]">
 <FolderIcon size={18} className="shrink-0 text-muted-foreground" />
 <span className="min-w-0 text-lg font-semibold text-foreground truncate">
 {tCat("noGroup", { defaultValue: "No group" })}
 </span>
 </div>
 <div ref={ungroupedFlipRef}>
 {ungroupedCategories.map((cat, idx) => (
 <div key={cat.id} data-flip-id={cat.id}>
 <CategorySection
 category={cat}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 isFirst={idx === 0}
 isLast={idx === ungroupedCategories.length - 1}
 onMoveUp={() => moveCategory(ungroupedCategories, idx, -1)}
 onMoveDown={() => moveCategory(ungroupedCategories, idx, 1)}
 onMoveDish={moveDish}
 onToggleDishVisible={toggleDishVisible}
 collapsed={isCollapsed(cat.id)}
 onToggleCollapse={() => toggleCollapse(cat.id)}
 inGroup
 />
 </div>
 ))}
 </div>
 </div>
 )}

 </div>
 )}
 </div>

 <Modal open={addOpen} onClose={() => setAddOpen(false)} title={t("addTitle")} size="sm">
 <div className="-m-5">
 {addItems.map((it) => (
 <button
 key={it.key}
 type="button"
 data-testid={`menu-add-${it.key}`}
 onClick={() => {
 setAddOpen(false);
 it.onClick();
 }}
 className="w-full flex items-center gap-3 text-left py-3 px-5 select-none transition-colors md:hover:bg-primary/5"
 >
 <span className="min-w-0 flex-1">
 <span className="block text-sm font-medium text-foreground">{it.title}</span>
 <span className="block text-sm text-muted-foreground mt-0.5">{it.desc}</span>
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 ))}
 </div>
 </Modal>

 </>
 );
}

const sortArrowBtn =
 "py-1 inline-flex items-center justify-center text-muted-foreground/60 enabled:md:hover:text-foreground transition-colors";

function SortArrows({
 onUp,
 onDown,
 upDisabled,
 downDisabled,
 upLabel,
 downLabel,
}: {
 onUp: () => void;
 onDown: () => void;
 upDisabled: boolean;
 downDisabled: boolean;
 upLabel: string;
 downLabel: string;
}) {
 return (
 <span className="inline-flex items-center gap-2.5 shrink-0">
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); onUp(); }}
 disabled={upDisabled}
 className={sortArrowBtn}
 aria-label={upLabel}
 >
 <ArrowUpIcon size={17} />
 </button>
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); onDown(); }}
 disabled={downDisabled}
 className={sortArrowBtn}
 aria-label={downLabel}
 >
 <ArrowDownIcon size={17} />
 </button>
 </span>
 );
}

// Chevron button placed at the right edge of a group / category header.
// Down = expanded (click to collapse), right = collapsed (click to expand).
function CollapseToggle({
 collapsed,
 onToggle,
 label,
}: {
 collapsed: boolean;
 onToggle: () => void;
 label: string;
}) {
 return (
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); onToggle(); }}
 aria-label={label}
 aria-expanded={!collapsed}
 className={sortArrowBtn + " shrink-0"}
 >
 <ChevronDownIcon
 size={20}
 className={"transition-transform duration-200 " + (collapsed ? "-rotate-90" : "")}
 />
 </button>
 );
}

// Group: big flat heading. Click edits the group; sort mode adds arrows.
function GroupSection({
 g,
 gi,
 kids,
 isVeryFirst,
 topLevelGroupsLength,
 defaultLang,
 currencySymbol,
 moveGroup,
 moveCategory,
 moveDish,
 toggleDishVisible,
 isCollapsed,
 toggleCollapse,
}: {
 g: Category;
 gi: number;
 kids: Category[];
 isVeryFirst: boolean;
 topLevelGroupsLength: number;
 defaultLang: string;
 currencySymbol: string;
 moveGroup: (idx: number, dir: number) => void;
 moveCategory: (siblings: Category[], idx: number, dir: number) => void;
 moveDish: (categoryId: string, idx: number, dir: number) => void;
 toggleDishVisible: (categoryId: string, dishId: string) => void;
 isCollapsed: (id: string) => boolean;
 toggleCollapse: (id: string) => void;
}) {
 const t = useTranslations("dashboard.menu");
 const router = useDashboardRouter();
 const kidsFlipRef = useFlip<HTMLDivElement>([kids.map((c) => c.id).join(",")]);
 // Group collapsing is disabled for now — groups are always expanded.
 const open = true;
 return (
 <div data-flip-id={g.id} data-testid="group-card" className={isVeryFirst ? "" : "pt-4"}>
 {/* Whole header is clickable (like a dish row); hover highlights the full
     width with rounded corners. Symmetric vertical padding matches a
     collapsed category card. Sort arrows stop propagation so they don't
     open the editor. */}
 <div
 role="button"
 tabIndex={0}
 onClick={() => {
 track("dash_menu_group_edit");
 router.push({ name: "group.edit", id: g.id });
 }}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 track("dash_menu_group_edit");
 router.push({ name: "group.edit", id: g.id });
 }
 }}
 aria-label={t("editGroup", { defaultValue: "Edit group" })}
 className="group flex items-center gap-4 py-4 sm:py-5 px-4 sm:px-5 rounded-2xl select-none cursor-pointer transition-colors bg-primary/[0.07] md:hover:bg-primary/5"
 >
 <span className="min-w-0 flex items-center gap-2.5 text-left">
 <FolderIcon size={18} className="shrink-0 text-muted-foreground" />
 <span data-testid="group-name" className="min-w-0 text-lg font-semibold text-foreground truncate transition-colors md:group-hover:text-primary">
 {getMlWithFallback(g.name, defaultLang, defaultLang)}
 </span>
 </span>
 <span onClick={(e) => e.stopPropagation()} className="ml-auto shrink-0 inline-flex">
 <SortArrows
 onUp={() => moveGroup(gi, -1)}
 onDown={() => moveGroup(gi, 1)}
 upDisabled={gi === 0}
 downDisabled={gi === topLevelGroupsLength - 1}
 upLabel={t("moveCategoryUp")}
 downLabel={t("moveCategoryDown")}
 />
 </span>
 {/* Group collapse toggle disabled for now — groups stay expanded.
 <span onClick={(e) => e.stopPropagation()} className="inline-flex items-center">
 <CollapseToggle
 collapsed={!open}
 onToggle={() => toggleCollapse(g.id)}
 label={open ? t("collapse") : t("expand")}
 />
 </span>
 */}
 </div>
 <Collapsible open={open}>
 <div ref={kidsFlipRef}>
 {kids.map((cat, ci) => (
 <div key={cat.id} data-flip-id={cat.id}>
 <CategorySection
 category={cat}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 isFirst={ci === 0}
 isLast={ci === kids.length - 1}
 onMoveUp={() => moveCategory(kids, ci, -1)}
 onMoveDown={() => moveCategory(kids, ci, 1)}
 onMoveDish={moveDish}
 onToggleDishVisible={toggleDishVisible}
 collapsed={isCollapsed(cat.id)}
 onToggleCollapse={() => toggleCollapse(cat.id)}
 inGroup
 />
 </div>
 ))}
 </div>
 </Collapsible>
 </div>
 );
}

// Category: sidebar-style uppercase label + a flat borderless dish list.
// Click on the label edits the category; sort mode adds arrows.
function CategorySection({
 category,
 defaultLang,
 currencySymbol,
 isFirst,
 isLast,
 onMoveUp,
 onMoveDown,
 onMoveDish,
 onToggleDishVisible,
 collapsed,
 onToggleCollapse,
 inGroup = false,
}: {
 category: Category;
 defaultLang: string;
 currencySymbol: string;
 isFirst: boolean;
 isLast: boolean;
 onMoveUp: () => void;
 onMoveDown: () => void;
 onMoveDish: (categoryId: string, idx: number, dir: number) => void;
 onToggleDishVisible: (categoryId: string, dishId: string) => void;
 collapsed: boolean;
 onToggleCollapse: () => void;
 inGroup?: boolean;
}) {
 const t = useTranslations("dashboard.menu");
 const router = useDashboardRouter();
 const dishesFlipRef = useFlip<HTMLDivElement>([category.dishes.map((d) => d.id).join(",")]);
 const open = !collapsed;
 return (
 <div className={inGroup || !isFirst ? "pt-4" : ""}>
 {/* Sidebar-matched card: same bg + border as the sidebar. Vertical padding
     lives on the header row (not the card) so the whole header is clickable
     and its hover highlight fills the full width + rounded corners. */}
 <div data-testid="category-card" className="rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border overflow-hidden">
 <div
 role="button"
 tabIndex={0}
 onClick={() => {
 track("dash_menu_category_edit");
 router.push({ name: "category.edit", id: category.id });
 }}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 track("dash_menu_category_edit");
 router.push({ name: "category.edit", id: category.id });
 }
 }}
 aria-label={t("editCategory", { defaultValue: "Edit category" })}
 className="group flex items-center gap-4 py-4 sm:py-5 px-4 sm:px-5 select-none cursor-pointer transition-colors md:hover:bg-primary/5"
 >
 <span className="min-w-0 flex items-center gap-3 text-left">
 <span data-testid="category-name" className="min-w-0 text-base font-medium tracking-tight text-foreground truncate transition-colors md:group-hover:text-primary">
 {getMlWithFallback(category.name, defaultLang, defaultLang)}
 </span>
 </span>
 <span onClick={(e) => e.stopPropagation()} className="shrink-0 inline-flex">
 <SortArrows
 onUp={onMoveUp}
 onDown={onMoveDown}
 upDisabled={isFirst}
 downDisabled={isLast}
 upLabel={t("moveCategoryUp")}
 downLabel={t("moveCategoryDown")}
 />
 </span>
 <span onClick={(e) => e.stopPropagation()} className="ml-auto inline-flex items-center">
 <CollapseToggle
 collapsed={collapsed}
 onToggle={onToggleCollapse}
 label={open ? t("collapseCategory") : t("expandCategory")}
 />
 </span>
 </div>
 <Collapsible open={open}>
 <div className="pb-4 sm:pb-5">
 {category.dishes.length === 0 ? (
 <p className="text-sm text-muted-foreground/60 py-1 px-4 sm:px-5">{t("noDishes")}</p>
 ) : (
 <div ref={dishesFlipRef}>
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
 </div>
 </Collapsible>
 </div>
 </div>
 );
}

// Dish: [switch] name ......... price. Row click opens the editor.
// Sort mode swaps the switch for up/down arrows and disables row clicks.
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
 const dimCls = dish.visible ? "" : "opacity-50";
 const openDish = () => {
 track("dash_menu_item_click");
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
 data-testid="dish-row"
 className="flex items-center gap-3 py-3 px-4 sm:px-5 select-none cursor-pointer transition-colors md:hover:bg-primary/5"
 >
 <span onClick={(e) => e.stopPropagation()} className="shrink-0 inline-flex">
 <ToggleSwitch checked={dish.visible} onChange={onToggleVisible} size="sm" />
 </span>
 <span className={"flex-1 min-w-0 flex items-center gap-3 " + dimCls}>
 <span className="min-w-0 text-sm font-medium text-foreground truncate">
 {getMlWithFallback(dish.name, defaultLang, defaultLang)}
 </span>
 </span>
 <span
 onClick={(e) => e.stopPropagation()}
 className={"shrink-0 inline-flex w-10 h-[24px] items-center justify-center " + dimCls}
 >
 <SortArrows
 onUp={onMoveUp}
 onDown={onMoveDown}
 upDisabled={isFirst}
 downDisabled={isLast}
 upLabel={tc("moveUp")}
 downLabel={tc("moveDown")}
 />
 </span>
 {Number(dish.price) > 0 ? (
 <span className={"text-sm text-muted-foreground tabular-nums shrink-0 " + dimCls}>
 {currencySymbol + dish.price}
 </span>
 ) : null}
 </div>
 );
}
