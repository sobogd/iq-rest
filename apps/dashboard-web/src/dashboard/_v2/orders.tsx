"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { showApiError } from "@/lib/show-api-error";
import { useTranslations } from "next-intl";
import { useRestaurant } from "./restaurant-context";
import {
 BanknoteIcon,
 CheckIcon,
 ChevronRightIcon,
 CopyIcon,
 EditIcon,
 MoreVerticalIcon,
 PercentIcon,
 PlusIcon,
 ReceiptIcon,
 RefreshIcon,
 SplitIcon,
 SwapIcon,
 TrashIcon,
} from "./icons";
import { ConfirmDialog, Modal } from "./ui";
import { DiscountModal } from "./discount-modal";
import { FloorMap } from "./tables";
import { CtaState } from "./reservations";
import { useDashboardRouter } from "../_spa/router";
import {
 formatPrice,
 formatTimeShort,
 currencySymbolOf,
 parseDecimal,
 newId,
} from "./helpers";
import { getMlWithFallback } from "./i18n";
import { primaryBtn, secondaryBtn } from "./tokens";
import { createOrder, deleteOrder, patchOrder, patchOrderItemStatuses, splitOrder } from "./api";
import type {
 Category,
 Discount,
 Dish,
 DishOption,
 OptionVariant,
 Order,
 OrderItem,
 OrderItemOptionSnapshot,
 OrderItemStatus,
 TableEntity,
} from "./types";
import { track } from "@/lib/dashboard-events";
import {
 ITEM_STATUS_KEYS,
 STATUS_CHIP_CLS,
 STATUS_DOT_CLS,
 STATUS_TEXT_CLS,
 STATUS_ORDER,
 applyDiscount,
 calcItemPrice,
 calcOrderSubtotal,
 calcOrderTotal,
} from "./orders-shared";
// KitchenPage moved to its own file so the kitchen.* kiosk bundle can
// import it without dragging in the order-creation wizard. Re-exported
// here for callers that still reference `_v2/orders`.
export { KitchenPage } from "./kitchen-page";

// ── Modal navigation state ──
//
// list      — список заказов выбранного стола (только если есть заказы)
// order     — деталка одного заказа
// addItem   — степпер добавления блюда (категория → блюдо → конфиг).
//             orderId === null означает «order ещё не создан»; будет создан
//             в БД при сохранении первого блюда.

type ModalView =
 | { kind: "list" }
 | { kind: "order"; orderId: string }
 | {
 kind: "addItem";
 orderId: string | null;
 // "group" only exists when the menu has category groups — it precedes
 // "category" and filters it via groupId.
 step: "group" | "category" | "dish" | "configure";
 categoryId?: string;
 dishId?: string;
 // Group filter for the category step: string = group id, null = the
 // "without group" bucket, undefined = no filter (menu has no groups).
 groupId?: string | null;
 // Editing an existing order item: the wizard opens straight on the
 // configure step (group/category/dish are fixed) prefilled with the
 // item's options + notes, and saving replaces them on that item.
 editItemId?: string;
 };

export function OrdersPage({
 orders,
 setOrders,
 tables,
 categories,
 defaultLang,
 currency,
 kioskLayout,
 demoMode,
}: {
 orders: Order[];
 setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
 tables: TableEntity[];
 categories: Category[];
 defaultLang: string;
 currency: string;
 // Waiter kiosk layout: removes PageHeader, makes the page a flex column
 // (lg: row) filling the viewport. Floor map keeps its square aspect ratio
 // as the priority element; the active-orders list lives next to it in a
 // single card with divider-separated rows, internally scrollable.
 kioskLayout?: boolean;
 // Public landing demo: every mutation runs on local state only — no API
 // calls. createOrder/splitOrder normally need a server-generated id and
 // dailyNumber, so in demo mode we mint those locally. A reload resets the
 // board (the snapshot is rebuilt from scratch).
 demoMode?: boolean;
}) {
 const t = useTranslations("dashboard.orders");
 const tc = useTranslations("dashboard.common");
 const restaurant = useRestaurant();
 const router = useDashboardRouter();
 const currencySymbol = currencySymbolOf(currency);

 const NO_TABLE = "__no_table__";
 const [activeTableId, setActiveTableId] = useState<string | null>(null);
 const [view, setView] = useState<ModalView | null>(null);
 const [creating, setCreating] = useState(false);
 const [confirmDeleteOrder, setConfirmDeleteOrder] = useState<string | null>(null);
 const [confirmCompleteOrder, setConfirmCompleteOrder] = useState<string | null>(null);
 const [moreOpen, setMoreOpen] = useState(false);
 const [changeTableForOrder, setChangeTableForOrder] = useState<string | null>(null);
 const [splitForOrder, setSplitForOrder] = useState<string | null>(null);
 // Discount editor targets. Either an order id (order-level discount) or
 // an {orderId, itemId} pair (item-level discount). Mutually exclusive —
 // the same modal renders for both.
 const [discountForOrder, setDiscountForOrder] = useState<string | null>(null);
 const [discountForItem, setDiscountForItem] = useState<{ orderId: string; itemId: string } | null>(null);
 const [headerBack, setHeaderBack] = useState<(() => void) | null>(null);
 const [wizardTitle, setWizardTitle] = useState<string | null>(null);
 const [wizardFooter, setWizardFooter] = useState<React.ReactNode | null>(null);
 const [openedFrom, setOpenedFrom] = useState<"table" | "list">("table");

 // Sort by daily number so the orders list (global and per-table) reads
 // top→bottom by creation order. Date order ≈ creation order but ties on
 // same-second rows would otherwise be undefined. Memoized so the derived
 // sets below (occupied/ready) don't recompute on unrelated re-renders.
 const activeOrders = useMemo(
 () =>
 orders
 .filter((o) => o.status === "active")
 .sort((a, b) => (a.dailyNumber ?? 0) - (b.dailyNumber ?? 0)),
 [orders],
 );
 const occupiedIds = useMemo(
 () => new Set(activeOrders.map((o) => o.tableId).filter((x): x is string => !!x)),
 [activeOrders],
 );
 const noTableOrders = activeOrders.filter((o) => !o.tableId);

 // Stol → "все позиции ready" (для зелёного тона плитки).
 const readyIds = useMemo(() => {
 const result = new Set<string>();
 for (const tbl of tables) {
 const tableOrders = activeOrders.filter((o) => o.tableId === tbl.id);
 if (tableOrders.length === 0) continue;
 const allItems = tableOrders.flatMap((o) => o.items);
 if (allItems.length === 0) continue;
 if (allItems.every((it) => it.status === "ready" || it.status === "served")) {
 result.add(tbl.id);
 }
 }
 return result;
 }, [tables, activeOrders]);

 // Dishes still present in the menu — an order item is editable only while
 // its dish exists (edit re-opens the dish wizard, which needs live options).
 const menuDishIds = useMemo(
 () => new Set(categories.flatMap((c) => c.dishes.map((d) => d.id))),
 [categories],
 );

 function tileBadge(tableId: string): number | null {
 const tableOrders = activeOrders.filter((o) => o.tableId === tableId);
 return tableOrders.length || null;
 }

 const activeTable =
 activeTableId && activeTableId !== NO_TABLE
 ? tables.find((tbl) => tbl.id === activeTableId) || null
 : null;
 const isNoTable = activeTableId === NO_TABLE;
 const activeTableOrders = isNoTable
 ? noTableOrders
 : activeTable
 ? activeOrders.filter((o) => o.tableId === activeTable.id)
 : [];

 const currentOrder =
 view && view.kind !== "list" && view.kind !== "addItem"
 ? orders.find((o) => o.id === view.orderId) || null
 : view && view.kind === "addItem" && view.orderId
 ? orders.find((o) => o.id === view.orderId) || null
 : null;

 // Add-item wizard starts on the group picker when the menu has category
 // groups; otherwise it goes straight to the category list.
 const addItemFirstStep = categories.some((c) => c.isGroup)
 ? ("group" as const)
 : ("category" as const);

 function openTable(id: string) {
 setActiveTableId(id);
 setOpenedFrom("table");
 setView({ kind: "list" });
 }

 function closeModal() {
 setView(null);
 setActiveTableId(null);
 }

 // External-sync guard: SSE/poll can complete or delete the order (or the
 // item being edited) from another device while its modal is open here.
 // Close / step back instead of leaving an empty shell on screen.
 useEffect(() => {
 if (!view) return;
 const guardedOrderId =
 view.kind === "order" ? view.orderId : view.kind === "addItem" ? view.orderId : null;
 if (!guardedOrderId) return;
 const target = orders.find((o) => o.id === guardedOrderId);
 if (!target || target.status !== "active") {
 setView(null);
 setActiveTableId(null);
 // Satellite modals target the same order — orphaning them over a closed
 // page (or letting them re-patch a completed order) makes no sense.
 setMoreOpen(false);
 setConfirmCompleteOrder((cur) => (cur === guardedOrderId ? null : cur));
 setConfirmDeleteOrder((cur) => (cur === guardedOrderId ? null : cur));
 setChangeTableForOrder((cur) => (cur === guardedOrderId ? null : cur));
 setSplitForOrder((cur) => (cur === guardedOrderId ? null : cur));
 setDiscountForOrder((cur) => (cur === guardedOrderId ? null : cur));
 setDiscountForItem((cur) => (cur?.orderId === guardedOrderId ? null : cur));
 return;
 }
 if (view.kind === "addItem" && view.editItemId) {
 const stillThere = target.items.some((it) => it.id === view.editItemId);
 if (!stillThere) setView({ kind: "order", orderId: guardedOrderId });
 }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [orders, view]);

 async function persistOrder(orderId: string, patch: Partial<Order>, base?: Order) {
 // First-item adds pass `base` explicitly because the closure-captured
 // `orders` does not yet see the order ensureOrderForFirstItem just pushed
 // (React batches setOrders). Without `base` the first dish silently fails
 // to persist server-side and the SSE/poll feed wipes the optimistic copy.
 const target = base ?? orders.find((o) => o.id === orderId);
 if (!target) return;
 const next: Order = { ...target, ...patch };
 setOrders((all) => {
 if (all.some((o) => o.id === orderId)) {
 return all.map((o) => (o.id === orderId ? next : o));
 }
 return [...all, next];
 });
 if (demoMode) return;
 try {
 await patchOrder(orderId, {
 status: next.status === "active" ? "in_progress" : next.status,
 items: next.items,
 total: calcOrderTotal(next),
 ...(patch.paymentMethodId !== undefined ? { paymentMethodId: patch.paymentMethodId } : {}),
 ...(patch.discount !== undefined ? { discount: patch.discount } : {}),
 });
 // No invalidate / no rollback — SSE will push the server-confirmed
 // copy back through the cache. On failure we just toast; the next
 // SSE/poll event corrects the optimistic state.
 } catch (err) {
 showApiError(err, "patchOrder");
 }
 }

 function setItemStatus(orderId: string, itemId: string, status: OrderItemStatus) {
 const order = orders.find((o) => o.id === orderId);
 if (!order) return;
 const items = order.items.map((it) => (it.id === itemId ? { ...it, status } : it));
 // Optimistic local update, then the race-safe per-item merge endpoint —
 // NOT persistOrder: a whole-items PATCH here would clobber statuses another
 // device (KDS) changed since our snapshot.
 setOrders((all) => all.map((o) => (o.id === orderId ? { ...o, items } : o)));
 if (demoMode) return;
 patchOrderItemStatuses(orderId, [{ itemId, status }]).catch((err) => {
 // No rollback — the next SSE event carries the server-confirmed copy.
 showApiError(err, "patchOrder");
 });
 }

 function removeItem(orderId: string, itemId: string) {
 track("dash_orders_order_remove_item");
 const order = orders.find((o) => o.id === orderId);
 if (!order) return;
 const items = order.items.filter((it) => it.id !== itemId);
 persistOrder(orderId, { items });
 }

 function duplicateItem(orderId: string, itemId: string) {
 track("dash_orders_order_duplicate_item");
 const order = orders.find((o) => o.id === orderId);
 if (!order) return;
 const src = order.items.find((it) => it.id === itemId);
 if (!src) return;
 const copy: OrderItem = {
 ...src,
 id: newId(),
 status: "pending",
 createdAt: new Date().toISOString(),
 options: src.options.map((o) => ({ ...o })),
 };
 persistOrder(orderId, { items: [...order.items, copy] });
 }

 function completeOrder(orderId: string, paymentMethodId: string | null) {
 track("dash_orders_order_complete_order");
 persistOrder(orderId, { status: "completed", paymentMethodId });
 const stillHasOrders = activeTableId
 ? activeOrders.some((o) => o.id !== orderId && o.tableId === activeTableId)
 : false;
 if (openedFrom !== "list" && stillHasOrders) {
 setView({ kind: "list" });
 } else {
 closeModal();
 }
 }

 async function removeOrder(orderId: string) {
 track("dash_orders_order_delete_order");
 setOrders((all) => all.filter((o) => o.id !== orderId));
 const stillHasOrders = activeTableId
 ? activeOrders.some((o) => o.id !== orderId && o.tableId === activeTableId)
 : false;
 if (openedFrom !== "list" && stillHasOrders) setView({ kind: "list" });
 else closeModal();
 if (demoMode) return;
 try {
 await deleteOrder(orderId);
 } catch (err) {
 showApiError(err, "deleteOrder");
 }
 }

 // Лениво создаём заказ, когда сохраняется первое блюдо.
 async function ensureOrderForFirstItem(): Promise<Order | null> {
 if (!activeTableId) return null;
 let table: TableEntity | null = null;
 if (activeTableId !== NO_TABLE) {
 table = tables.find((tbl) => tbl.id === activeTableId) ?? null;
 if (!table) return null;
 }
 if (creating) return null;
 setCreating(true);
 try {
 const created = demoMode
 ? {
 id: newId(),
 dailyNumber: Math.max(0, ...orders.map((o) => o.dailyNumber ?? 0)) + 1,
 createdAt: new Date().toISOString(),
 }
 : await createOrder(table ? { tableNumber: table.number } : {});
 const newOrder: Order = {
 id: created.id,
 tableId: table?.id ?? null,
 tableNumber: table?.number ?? null,
 dailyNumber: created.dailyNumber,
 guestName: "",
 createdAt: created.createdAt,
 status: "active",
 items: [],
 total: 0,
 };
 setOrders((all) => [...all, newOrder]);
 return newOrder;
 } catch (err) {
 showApiError(err, "createOrder");
 return null;
 } finally {
 setCreating(false);
 }
 }

 async function handleChangeTable(orderId: string, table: TableEntity) {
 track("dash_orders_order_change_table");
 setOrders((all) =>
 all.map((o) =>
 o.id === orderId ? { ...o, tableId: table.id, tableNumber: table.number } : o,
 ),
 );
 // Stay in the order detail — just retarget the active table so back/list
 // navigation follows the order to its new table.
 setActiveTableId(table.id);
 if (demoMode) return;
 try {
 await patchOrder(orderId, { tableNumber: table.number });
 } catch (err) {
 showApiError(err, "changeTable");
 }
 }

 async function handleSplit(orderId: string, itemIds: string[]) {
 track("dash_orders_order_split");
 const source = orders.find((o) => o.id === orderId);
 if (!source) return;
 const idSet = new Set(itemIds);
 const taken = source.items.filter((it) => idSet.has(it.id));
 const kept = source.items.filter((it) => !idSet.has(it.id));
 if (taken.length === 0) return;
 const sourceTotal = kept.reduce((sum, it) => sum + calcItemPrice(it), 0);
 const createdTotal = taken.reduce((sum, it) => sum + calcItemPrice(it), 0);
 try {
 const res = demoMode
 ? {
 created: {
 id: newId(),
 dailyNumber: Math.max(0, ...orders.map((o) => o.dailyNumber ?? 0)) + 1,
 createdAt: new Date().toISOString(),
 },
 }
 : await splitOrder(orderId, { itemIds });
 const newOrder: Order = {
 id: res.created.id,
 tableId: source.tableId,
 tableNumber: source.tableNumber,
 dailyNumber: res.created.dailyNumber,
 guestName: "",
 createdAt: res.created.createdAt,
 status: "active",
 items: taken,
 total: createdTotal,
 };
 setOrders((all) => [
 ...all.map((o) => (o.id === orderId ? { ...o, items: kept, total: sourceTotal } : o)),
 newOrder,
 ]);
 setView({ kind: "list" });
 } catch (err) {
 showApiError(err, "splitOrder");
 }
 }

 async function handleAddItem(itemData: { options: OrderItemOptionSnapshot[]; notes: string }, dish: Dish) {
 track("dash_orders_order_save_item");
 const currentView = view;
 if (!currentView || currentView.kind !== "addItem") return;
 // Edit mode: replace the existing item's options + notes in place. The
 // dish, name/price snapshots, status, discount and createdAt stay as-is.
 if (currentView.editItemId) {
 const editOrderId = currentView.orderId;
 if (!editOrderId) return;
 const base = orders.find((o) => o.id === editOrderId);
 if (!base) return;
 const items = base.items.map((it) =>
 it.id === currentView.editItemId
 ? { ...it, options: itemData.options, notes: itemData.notes }
 : it,
 );
 persistOrder(editOrderId, { items }, base);
 setView({ kind: "order", orderId: editOrderId });
 return;
 }
 let orderId = currentView.orderId;
 let baseOrder: Order | null = null;
 if (!orderId) {
 const newOrder = await ensureOrderForFirstItem();
 if (!newOrder) return;
 orderId = newOrder.id;
 baseOrder = newOrder;
 }
 const newItem: OrderItem = {
 id: newId(),
 dishId: dish.id,
 dishNameSnapshot: dish.name,
 basePriceSnapshot: dish.price,
 options: itemData.options,
 notes: itemData.notes,
 status: "pending",
 createdAt: new Date().toISOString(),
 };
 // Prefer the fresh order returned by ensureOrderForFirstItem — `orders`
 // (closure) hasn't seen it yet, so falling back to .find would lose
 // the new order entirely on the very first dish.
 const base: Order | undefined = baseOrder ?? orders.find((o) => o.id === orderId);
 const items = [...(base?.items ?? []), newItem];
 persistOrder(orderId, { items }, base);
 setView({ kind: "order", orderId });
 }

 // Заголовок, подзаголовок, контент и футер модалки зависят от уровня.
 // Three separate Modal instances (list / order / addItem) — each keeps its
 // own fixed size and content, so navigating between steps cross-fades two
 // modals instead of one modal snapping its width/height mid-flight.
 let listTitle: React.ReactNode = "";
 let listContent: React.ReactNode = null;
 let listFooter: React.ReactNode = null;
 let orderTitle: React.ReactNode = "";
 let orderSubtitle: React.ReactNode = undefined;
 let orderContent: React.ReactNode = null;
 let orderFooter: React.ReactNode = null;
 let addItemTitle: React.ReactNode = "";
 let addItemContent: React.ReactNode = null;
 let addItemFooter: React.ReactNode = null;
 if (view) {
 if (view.kind === "list") {
 const tableLabel = isNoTable
 ? t("noTableLabel", { defaultValue: "No table" })
 : t("tableLabel", { number: activeTable?.number ?? "?" });
 listTitle = tableLabel;
 listContent = (
 <OrderListView
 orders={activeTableOrders}
 currencySymbol={currencySymbol}
 onSelect={(orderId) => {
 track("dash_orders_click_order");
 setView({ kind: "order", orderId });
 }}
 />
 );
 if (!isNoTable) {
 listFooter = (
 <div className="flex justify-end">
 <button
 type="button"
 data-testid="order-new"
 onClick={() =>
 setView({ kind: "addItem", orderId: null, step: addItemFirstStep })
 }
 className={primaryBtn + " inline-flex items-center gap-1.5"}
 >
 <PlusIcon size={15} className="shrink-0" />
 <span className="truncate">{activeTableOrders.length === 0 ? t("startOrder") : t("newOrder")}</span>
 </button>
 </div>
 );
 }
 } else if (view.kind === "order" && currentOrder) {
 const total = calcOrderTotal(currentOrder);
 const orderDiscountAmount = (() => {
   const sub = calcOrderSubtotal(currentOrder);
   return applyDiscount(sub, currentOrder.discount ?? null);
 })();
 const overall = computeOrderStatus(currentOrder);
 const overallText = overall
 ? overall === "served"
 ? t("statusServed")
 : t("inProgress", { defaultValue: "In progress" })
 : null;
 const orderLabel = t("orderLabel", {
 defaultValue: "Order #{number}",
 number: currentOrder.dailyNumber,
 });
 orderTitle = (
 <span>
 {orderLabel}
 {overall && overallText ? (
 <>
 {" · "}
 {/* font-normal — the h3 header is bold, the status shouldn't be. */}
 <span className={"font-normal " + OVERALL_STATUS_TEXT_CLS[overall]}>{overallText}</span>
 </>
 ) : null}
 </span>
 );
 orderSubtitle = (
 <span>
 {/* Labels only on desktop — mobile shows just the time + amount. */}
 <span className="hidden md:inline">{t("createdLabel", { defaultValue: "Created" })}: </span>
 {formatTimeShort(currentOrder.createdAt)}
 {" · "}
 <span className="hidden md:inline">{t("total")}: </span>
 {formatPrice(total, currencySymbol)}
 {currentOrder.discount ? (
 <>
 {" "}
 <DiscountBadge discount={currentOrder.discount} currencySymbol={currencySymbol} />
 </>
 ) : null}
 </span>
 );
 orderContent = (
 <OrderDetailView
 order={currentOrder}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 onItemStatusChange={(itemId, status) =>
 setItemStatus(currentOrder.id, itemId, status)
 }
 onRemoveItem={(itemId) => removeItem(currentOrder.id, itemId)}
 onDuplicateItem={(itemId) => duplicateItem(currentOrder.id, itemId)}
 onItemDiscount={(itemId) => setDiscountForItem({ orderId: currentOrder.id, itemId })}
 editableDishIds={menuDishIds}
 onEditItem={(itemId) => {
 const it = currentOrder.items.find((i) => i.id === itemId);
 if (!it) return;
 const cat = categories.find(
 (c) => !c.isGroup && c.dishes.some((d) => d.id === it.dishId),
 );
 if (!cat) return;
 setView({
 kind: "addItem",
 orderId: currentOrder.id,
 step: "configure",
 categoryId: cat.id,
 dishId: it.dishId,
 editItemId: itemId,
 });
 }}
 />
 );
 orderFooter = (
 <div className="flex items-center justify-between gap-2">
 <button
 type="button"
 data-testid="order-actions"
 onClick={() => setMoreOpen(true)}
 // Square 36px icon button on mobile; grows into a labeled
 // secondary button (matching secondaryBtn) on desktop.
 className="h-[36px] w-[36px] md:w-auto md:px-[16px] shrink-0 inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold text-foreground bg-muted rounded-lg hover:bg-muted/70 transition-colors"
 aria-label={t("orderActions", { defaultValue: "Actions" })}
 >
 <MoreVerticalIcon size={16} className="shrink-0" />
 <span className="hidden md:inline truncate">{t("orderActions", { defaultValue: "Actions" })}</span>
 </button>
 {/* min-w-0 down the chain lets narrow screens truncate the button
     labels instead of overflowing the footer. */}
 <div className="flex items-center gap-2 min-w-0">
 {/* Add item is the frequent action → primary; closing happens once
     per order and pays via its own confirm modal → secondary. */}
 <button
 type="button"
 data-testid="order-close"
 onClick={() => {
 // Always go through the confirm modal — even when no payment
 // methods are configured. The modal collapses to just the
 // close-confirmation header + footer in that case, so the
 // staff still gets an explicit "are you sure" step.
 setConfirmCompleteOrder(currentOrder.id);
 }}
 disabled={currentOrder.items.length === 0}
 className={secondaryBtn + " inline-flex items-center gap-1.5 min-w-0"}
 >
 <BanknoteIcon size={15} className="shrink-0" />
 <span className="truncate">{t("closeShort", { defaultValue: "Close" })}</span>
 </button>
 <button
 type="button"
 data-testid="order-add-item"
 onClick={() => {
 track("dash_orders_order_add_item");
 setView({
 kind: "addItem",
 orderId: currentOrder.id,
 step: addItemFirstStep,
 });
 }}
 className={primaryBtn + " inline-flex items-center gap-1.5 min-w-0"}
 >
 <PlusIcon size={15} className="shrink-0" />
 <span className="truncate">{t("dishShort", { defaultValue: "Item" })}</span>
 </button>
 </div>
 </div>
 );
 } else if (view.kind === "addItem") {
 if (view.step === "group") {
 addItemTitle = t("selectGroup", { defaultValue: "Select group" });
 } else if (view.step === "category") {
 addItemTitle = t("selectCategory", { defaultValue: "Select category" });
 } else if (view.step === "dish") {
 addItemTitle = t("selectDish", { defaultValue: "Select dish" });
 } else {
 addItemTitle = wizardTitle || t("addItem");
 }
 if (view.step === "configure") addItemFooter = wizardFooter;
 // Edit mode: the item being edited (prefills the wizard).
 const editItem =
 view.editItemId && view.orderId
 ? orders.find((o) => o.id === view.orderId)?.items.find((it) => it.id === view.editItemId) ?? null
 : null;
 addItemContent = (
 <AddItemView
 categories={categories}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 view={view}
 setView={setView}
 editItem={editItem}
 onBackToOrder={() => {
 if (view.orderId) setView({ kind: "order", orderId: view.orderId });
 else setView({ kind: "list" });
 }}
 onAdd={handleAddItem}
 creating={creating}
 onRegisterBack={(fn) => setHeaderBack(() => fn)}
 onTitleChange={setWizardTitle}
 onRegisterFooter={setWizardFooter}
 />
 );
 }
 }

 function openOrderDirect(order: Order) {
 setActiveTableId(order.tableId ?? NO_TABLE);
 setOpenedFrom("list");
 setView({ kind: "order", orderId: order.id });
 }

 const hasTables = tables.length > 0;

 // Tableless restaurants (delivery, takeaway-only, kiosks) still need to
 // place orders — render a list-only view with a "New order" button that
 // skips table selection entirely.
 function startTablelessOrder() {
 track("dash_orders_click_new_no_table");
 setActiveTableId(NO_TABLE);
 setOpenedFrom("list");
 setView({ kind: "addItem", orderId: null, step: addItemFirstStep });
 }

 const floorPane = hasTables ? (
 <FloorMap
 tables={tables}
 selectedId={null}
 onSelectTable={(id) => {
 if (!id) return;
 track("dash_orders_click_table");
 openTable(id);
 }}
 occupiedIds={occupiedIds}
 readyIds={readyIds}
 badgeFor={tileBadge}
 wide
 ringAll
 />
 ) : null;

 const ordersPane = !hasTables ? (
 <button
 type="button"
 onClick={startTablelessOrder}
 disabled={creating}
 className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-primary-gradient text-primary-foreground text-sm font-medium hover:bg-primary/90 active:scale-[0.99] transition disabled:opacity-50 self-start"
 >
 <PlusIcon size={16} className="mr-1.5" />
 {t("newOrder")}
 </button>
 ) : activeOrders.length === 0 ? (
 <div className="rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border px-6 py-10 text-center h-full flex items-center justify-center">
 <div>
 <div className="text-sm font-medium text-foreground mb-1">
 {t("noActiveTitle", { defaultValue: "No active orders" })}
 </div>
 <div className="text-sm text-muted-foreground">
 {t("noActiveBody", { defaultValue: "New orders will show up here." })}
 </div>
 </div>
 </div>
 ) : (
 <div className="rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border overflow-hidden flex flex-col max-h-full">
 <div className="min-h-0 overflow-y-auto divide-y divide-border">
 {activeOrders.map((o) => (
 <OrderListCard
 key={o.id}
 order={o}
 currencySymbol={currencySymbol}
 onClick={() => openOrderDirect(o)}
 />
 ))}
 </div>
 </div>
 );

 // Unified dual-pane layout: kanban-like floor map (square, priority on
 // desktop) + a single orders card with divider-separated rows. Admin host
 // adds the standard max-w-5xl container so the page doesn't stretch on wide
 // displays; kiosk host runs edge-to-edge.
 // Desktop (lg+, side-by-side): outer height pins to viewport (minus topbar)
 // so the orders card has an explicit height and scrolls internally —
 // without that the internal scroll has no upper bound and the card sprawls.
 // Below lg (map stacked above the list): no pinned height — the card grows
 // to its content and the page itself scrolls, instead of clipping the card
 // into the space left under the square map.
 const outerHeightClass = "lg:h-[calc(100dvh-var(--topbar-h,0px)-3.5rem)] ";

 // No tables → replace the whole orders surface with the same "add a table"
 // placeholder the bookings page uses. On the dashboard it offers a button to
 // settings; on the waiter kiosk (no admin access) it's just a message.
 if (!hasTables) {
 const showCta = !kioskLayout && !demoMode;
 return (
 <div className={kioskLayout ? "h-full p-4 md:p-6" : ""}>
 <CtaState
 title={t("noTablesTitle")}
 body={t("noTablesBody")}
 cta={showCta ? t("noTablesCta") : undefined}
 onClick={showCta ? () => router.push({ name: "settings.tables" }) : undefined}
 />
 </div>
 );
 }

 return (
 <>
 <div
 className={
 (kioskLayout ? "h-full p-4 md:p-6 " : "" + outerHeightClass) +
 "flex flex-col lg:flex-row gap-3 lg:gap-4 min-h-0"
 }
 >
 {hasTables ? (
 <div className="aspect-square w-full lg:w-auto lg:h-full lg:aspect-square shrink-0">
 {floorPane}
 </div>
 ) : null}
 <div className="flex-1 min-h-0 lg:min-w-0 flex flex-col gap-3">
 {ordersPane}
 </div>
 </div>


 <Modal
 open={view?.kind === "list"}
 onClose={() => {
 if (view?.kind !== "list") return;
 closeModal();
 }}
 title={listTitle}
 size="sm"
 footer={listFooter}
 >
 {listContent}
 </Modal>

 <Modal
 open={view?.kind === "order"}
 onClose={() => {
 if (view?.kind !== "order") return;
 if (openedFrom === "list") {
 closeModal();
 } else if (activeTableOrders.length > 1) {
 setView({ kind: "list" });
 } else {
 closeModal();
 }
 }}
 title={orderTitle}
 subtitle={orderSubtitle}
 size="md"
 footer={orderFooter}
 >
 {orderContent}
 </Modal>

 <Modal
 open={view?.kind === "addItem"}
 onClose={() => {
 if (view?.kind !== "addItem") return;
 if (view.orderId) setView({ kind: "order", orderId: view.orderId });
 else if (openedFrom === "list") closeModal();
 else setView({ kind: "list" });
 }}
 onBack={headerBack}
 title={addItemTitle}
 size="sm"
 footer={addItemFooter}
 closeOnBackdrop={false}
 >
 {addItemContent}
 </Modal>

 <OrderActionsModal
 open={moreOpen && view?.kind === "order" && !!currentOrder}
 order={view?.kind === "order" ? currentOrder : null}
 hasTables={tables.length > 0}
 onClose={() => setMoreOpen(false)}
 onChangeTable={() => {
 setMoreOpen(false);
 if (currentOrder) setChangeTableForOrder(currentOrder.id);
 }}
 onSplit={() => {
 setMoreOpen(false);
 if (currentOrder) setSplitForOrder(currentOrder.id);
 }}
 onDiscount={() => {
 setMoreOpen(false);
 if (currentOrder) setDiscountForOrder(currentOrder.id);
 }}
 onDelete={() => {
 setMoreOpen(false);
 if (currentOrder) setConfirmDeleteOrder(currentOrder.id);
 }}
 />

 <ConfirmDialog
 open={!!confirmDeleteOrder}
 title={t("deleteOrderTitle")}
 message={t("deleteOrderMessage")}
 confirmLabel={tc("delete")}
 onCancel={() => setConfirmDeleteOrder(null)}
 onConfirm={() => {
 if (confirmDeleteOrder) removeOrder(confirmDeleteOrder);
 setConfirmDeleteOrder(null);
 }}
 />

 <CompleteOrderModal
 open={!!confirmCompleteOrder}
 paymentMethods={restaurant.paymentMethods}
 onCancel={() => setConfirmCompleteOrder(null)}
 onConfirm={(paymentMethodId) => {
 if (confirmCompleteOrder) completeOrder(confirmCompleteOrder, paymentMethodId);
 setConfirmCompleteOrder(null);
 }}
 />

 <ChangeTableModal
 orderId={changeTableForOrder}
 orders={orders}
 tables={tables}
 occupiedIds={occupiedIds}
 onClose={() => setChangeTableForOrder(null)}
 onConfirm={async (orderId, table) => {
 await handleChangeTable(orderId, table);
 setChangeTableForOrder(null);
 }}
 />

 <SplitOrderModal
 orderId={splitForOrder}
 orders={orders}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 onClose={() => setSplitForOrder(null)}
 onConfirm={async (orderId, itemIds) => {
 await handleSplit(orderId, itemIds);
 setSplitForOrder(null);
 }}
 />

 <DiscountModal
 open={discountForOrder !== null}
 initial={discountForOrder ? orders.find((o) => o.id === discountForOrder)?.discount ?? null : null}
 currencySymbol={currencySymbol}
 title={t("discountOrderTitle", { defaultValue: "Order discount" })}
 onClose={() => setDiscountForOrder(null)}
 onSave={async (next) => {
 if (!discountForOrder) return;
 const target = orders.find((o) => o.id === discountForOrder);
 if (target) {
 await persistOrder(discountForOrder, { discount: next });
 }
 setDiscountForOrder(null);
 }}
 />

 <DiscountModal
 open={discountForItem !== null}
 initial={
 discountForItem
 ? orders
 .find((o) => o.id === discountForItem.orderId)
 ?.items.find((it) => it.id === discountForItem.itemId)
 ?.discount ?? null
 : null
 }
 currencySymbol={currencySymbol}
 title={t("discountItemTitle", { defaultValue: "Item discount" })}
 onClose={() => setDiscountForItem(null)}
 onSave={async (next) => {
 if (!discountForItem) return;
 const target = orders.find((o) => o.id === discountForItem.orderId);
 if (target) {
 const nextItems = target.items.map((it) =>
 it.id === discountForItem.itemId ? { ...it, discount: next } : it,
 );
 await persistOrder(discountForItem.orderId, { items: nextItems });
 }
 setDiscountForItem(null);
 }}
 />
 </>
 );
}

// ── Level 1: список заказов стола ──

function OrderListView({
 orders,
 currencySymbol,
 onSelect,
}: {
 orders: Order[];
 currencySymbol: string;
 onSelect: (orderId: string) => void;
}) {
 const t = useTranslations("dashboard.orders");
 if (orders.length === 0) {
 return (
 <div className="text-center py-10">
 <ReceiptIcon size={28} className="mx-auto text-muted-foreground/50 mb-2" />
 <p className="text-sm text-muted-foreground">{t("noActiveShort")}</p>
 </div>
 );
 }
 return (
 <div className="-m-5 divide-y divide-border">
 {orders.map((order) => (
 <OrderListCard
 key={order.id}
 order={order}
 currencySymbol={currencySymbol}
 onClick={() => onSelect(order.id)}
 showTable={false}
 />
 ))}
 </div>
 );
}

function OrderListCard({
 order,
 currencySymbol,
 onClick,
 showTable = true,
}: {
 order: Order;
 currencySymbol: string;
 onClick: () => void;
 // False inside the table modal — the table is already in the modal title.
 showTable?: boolean;
}) {
 const t = useTranslations("dashboard.orders");
 const total = calcOrderTotal(order);
 const itemsCount = order.items.length;
 const overallStatus = computeOrderStatus(order);
 const statusLabel = overallStatus === "served"
 ? t("statusServed")
 : overallStatus === "inProgress"
 ? t("inProgress", { defaultValue: "In progress" })
 : null;
 const orderNum = `#${order.dailyNumber}`;
 const tableLabel =
 order.tableNumber != null
 ? t("tableLabel", { number: order.tableNumber })
 : t("noTableLabel", { defaultValue: "No table" });

 return (
 <button
 type="button"
 data-testid="order-list-card"
 onClick={onClick}
 className="w-full text-left px-5 py-3 select-none transition-colors md:hover:bg-primary/5"
 >
 <div className="flex items-center gap-3">
 <div className="min-w-0 flex-1">
 <div className="text-sm font-medium text-foreground truncate">
 <span>{orderNum}</span>
 {showTable ? (
 <>
 <span className="text-muted-foreground font-normal"> · </span>
 <span>{tableLabel}</span>
 </>
 ) : null}
 {statusLabel && overallStatus ? (
 <>
 <span className="text-muted-foreground font-normal"> · </span>
 <span className={OVERALL_STATUS_TEXT_CLS[overallStatus]}>{statusLabel}</span>
 </>
 ) : null}
 </div>
 <div className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
 <span className="min-w-0 flex-1 truncate">
 {t("createdLabel", { defaultValue: "Created" })} {formatTimeShort(order.createdAt)}
 {" · "}
 {itemsCount === 1
 ? t("itemOne", { count: itemsCount })
 : t("itemOther", { count: itemsCount })}
 </span>
 {order.discount ? (
 <DiscountBadge discount={order.discount} currencySymbol={currencySymbol} />
 ) : null}
 </div>
 </div>
 {/* Price sits outside the two-line block so it centers vertically. */}
 <div className="shrink-0 text-sm font-medium text-foreground tabular-nums">
 {formatPrice(total, currencySymbol)}
 </div>
 </div>
 </button>
 );
}

type OverallStatus = "served" | "inProgress";

function computeOrderStatus(order: Order): OverallStatus | null {
 if (order.items.length === 0) return null;
 if (order.items.every((it) => it.status === "served")) return "served";
 return "inProgress";
}

const OVERALL_STATUS_TEXT_CLS: Record<OverallStatus, string> = {
 served: "text-emerald-700 dark:text-emerald-300",
 inProgress: "text-primary",
};

// ── Level 2: деталка заказа ──

function OrderDetailView({
 order,
 defaultLang,
 currencySymbol,
 onItemStatusChange,
 onRemoveItem,
 onDuplicateItem,
 onItemDiscount,
 onEditItem,
 editableDishIds,
}: {
 order: Order;
 defaultLang: string;
 currencySymbol: string;
 onItemStatusChange: (itemId: string, status: OrderItemStatus) => void;
 onRemoveItem: (itemId: string) => void;
 onDuplicateItem: (itemId: string) => void;
 onItemDiscount: (itemId: string) => void;
 onEditItem: (itemId: string) => void;
 // Items whose dish is gone from the menu can't be edited.
 editableDishIds: Set<string>;
}) {
 const t = useTranslations("dashboard.orders");
 // Tapping a row opens a select-style actions modal (change status,
 // duplicate, discount, remove) instead of the old per-row "⋮" dropdown.
 // "Change status" chains into a second select-style picker.
 const [actionsFor, setActionsFor] = useState<string | null>(null);
 const [statusPickFor, setStatusPickFor] = useState<string | null>(null);
 const actionsItem = order.items.find((it) => it.id === actionsFor) || null;
 const statusPickItem = order.items.find((it) => it.id === statusPickFor) || null;

 // Hybrid status sort: served items sink below the active ones, but the
 // bucket is a SNAPSHOT — each item keeps the bucket it had when it first
 // appeared in this detail view, so rows don't jump under the finger when a
 // status is changed mid-session. Reopening the detail re-groups fresh.
 const statusSnapRef = useRef<{ orderId: string; served: Map<string, boolean> }>({
 orderId: order.id,
 served: new Map(),
 });
 if (statusSnapRef.current.orderId !== order.id) {
 statusSnapRef.current = { orderId: order.id, served: new Map() };
 }
 const servedSnap = statusSnapRef.current.served;
 for (const it of order.items) {
 if (!servedSnap.has(it.id)) servedSnap.set(it.id, it.status === "served");
 }

 if (order.items.length === 0) {
 return (
 <div className="text-center py-10">
 <ReceiptIcon size={28} className="mx-auto text-muted-foreground/50 mb-2" />
 <p className="text-sm text-muted-foreground">{t("noItems")}</p>
 </div>
 );
 }

 const sortedItems = [...order.items].sort((a, b) => {
 const sa = servedSnap.get(a.id) ? 1 : 0;
 const sb = servedSnap.get(b.id) ? 1 : 0;
 if (sa !== sb) return sa - sb;
 if (a.dishId !== b.dishId) return a.dishId.localeCompare(b.dishId);
 return a.createdAt.localeCompare(b.createdAt);
 });
 return (
 <>
 <div className="-m-5 divide-y divide-border">
 {sortedItems.map((item) => (
 <OrderItemCard
 key={item.id}
 item={item}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 onOpenActions={() => setActionsFor(item.id)}
 />
 ))}
 </div>
 <ItemActionsModal
 open={!!actionsItem}
 item={actionsItem}
 defaultLang={defaultLang}
 onClose={() => setActionsFor(null)}
 onChangeStatus={() => {
 if (actionsItem) setStatusPickFor(actionsItem.id);
 setActionsFor(null);
 }}
 onEdit={
 actionsItem && editableDishIds.has(actionsItem.dishId)
 ? () => {
 onEditItem(actionsItem.id);
 setActionsFor(null);
 }
 : null
 }
 onDuplicate={() => {
 if (actionsItem) onDuplicateItem(actionsItem.id);
 setActionsFor(null);
 }}
 onDiscount={() => {
 if (actionsItem) onItemDiscount(actionsItem.id);
 setActionsFor(null);
 }}
 onRemove={() => {
 if (actionsItem) onRemoveItem(actionsItem.id);
 setActionsFor(null);
 }}
 />
 <ItemStatusModal
 open={!!statusPickItem}
 item={statusPickItem}
 onClose={() => setStatusPickFor(null)}
 onStatusChange={(status) => {
 if (statusPickItem) {
 // Explicit change from this view: refresh the item's sort bucket so
 // the list re-groups right away (the snapshot only guards against
 // rows jumping on external/SSE updates).
 servedSnap.set(statusPickItem.id, status === "served");
 onItemStatusChange(statusPickItem.id, status);
 }
 setStatusPickFor(null);
 }}
 />
 </>
 );
}

function OrderItemCard({
 item,
 defaultLang,
 currencySymbol,
 onOpenActions,
}: {
 item: OrderItem;
 defaultLang: string;
 currencySymbol: string;
 onOpenActions: () => void;
}) {
 const t = useTranslations("dashboard.orders");
 const statusKey = ITEM_STATUS_KEYS[item.status] || ITEM_STATUS_KEYS.pending;
 const price = calcItemPrice(item);

 // Whole row is the tap target (mirrors the dish rows in the menu editor);
 // it opens the select-style actions modal.
 return (
 <div
 data-testid="order-item"
 role="button"
 tabIndex={0}
 onClick={onOpenActions}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 onOpenActions();
 }
 }}
 className={
 "py-3 px-5 select-none cursor-pointer transition-colors md:hover:bg-primary/5" +
 // Served rows are done — mute them so the active work reads first.
 (item.status === "served" ? " opacity-60" : "")
 }
 >
 {/* Status chip · dish name (stretches + truncates) · price on the right.
     min-h matches the dish rows in the menu editor (24px content line). */}
 <div className="flex items-center gap-2 min-h-[24px]">
 <span
 className={
 "shrink-0 inline-flex items-center h-[24px] px-2.5 rounded-md text-xs " +
 STATUS_CHIP_CLS[item.status]
 }
 >
 {t(statusKey)}
 </span>
 <span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate">
 {getMlWithFallback(item.dishNameSnapshot, defaultLang, defaultLang)}
 </span>
 {item.discount ? (
 <DiscountBadge discount={item.discount} currencySymbol={currencySymbol} />
 ) : null}
 <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
 {formatPrice(price, currencySymbol)}
 </span>
 </div>
 {item.options.length > 0 ? (
 <div className="mt-3 flex flex-wrap gap-1.5">
 {item.options.map((o, i) => {
 const name = getMlWithFallback(o.variantName, defaultLang, defaultLang);
 const delta = parseDecimal(o.priceDelta) || 0;
 const qty = o.quantity ?? 1;
 return (
 <span
 key={i}
 className="inline-flex items-center gap-1 max-w-full px-2 py-0.5 rounded-md bg-secondary text-xs text-muted-foreground"
 >
 <span className="shrink-0 tabular-nums">×{qty}</span>
 <span className="min-w-0 truncate text-foreground">{name}</span>
 {delta > 0 ? (
 <span className="shrink-0 tabular-nums">+{formatPrice(delta, currencySymbol)}</span>
 ) : null}
 </span>
 );
 })}
 </div>
 ) : null}
 {item.notes ? (
 <div className="mt-2 flex flex-wrap gap-1.5">
 <span className="inline-flex items-center gap-1 max-w-full px-2 py-0.5 rounded-md bg-secondary text-xs text-muted-foreground">
 <span className="min-w-0 text-foreground">{item.notes}</span>
 </span>
 </div>
 ) : null}
 </div>
 );
}

// ── Level 3: добавление блюда (степпер) ──

function AddItemView({
 categories,
 defaultLang,
 currencySymbol,
 view,
 setView,
 onBackToOrder,
 onAdd,
 creating,
 onRegisterBack,
 onTitleChange,
 onRegisterFooter,
 editItem = null,
}: {
 categories: Category[];
 defaultLang: string;
 currencySymbol: string;
 view: Extract<ModalView, { kind: "addItem" }>;
 setView: React.Dispatch<React.SetStateAction<ModalView | null>>;
 onBackToOrder: () => void;
 onAdd: (data: { options: OrderItemOptionSnapshot[]; notes: string }, dish: Dish) => void;
 creating: boolean;
 onRegisterBack: (fn: (() => void) | null) => void;
 onTitleChange: (title: string | null) => void;
 onRegisterFooter: (node: React.ReactNode | null) => void;
 // Set when editing an existing order item — the wizard is prefilled with
 // its options/notes and "back" returns to the order (dish is fixed).
 editItem?: OrderItem | null;
}) {
 const t = useTranslations("dashboard.orders");
 const hasGroups = categories.some((c) => c.isGroup);

 function goGroup() {
 setView({ kind: "addItem", orderId: view.orderId, step: "group" });
 }
 // groupId travels with every later step so "back" returns to the same
 // filtered category list (string = group, null = "without group",
 // undefined = no groups in the menu).
 function goCategory(groupId?: string | null) {
 setView({ kind: "addItem", orderId: view.orderId, step: "category", groupId });
 }
 function goDish(categoryId: string) {
 setView({ kind: "addItem", orderId: view.orderId, step: "dish", categoryId, groupId: view.groupId });
 }
 function goConfigure(categoryId: string, dishId: string) {
 setView({ kind: "addItem", orderId: view.orderId, step: "configure", categoryId, dishId, groupId: view.groupId });
 }

 // The dish/category can vanish mid-wizard (menu edited on another device).
 // Fall back to the category step from an effect — navigating during render
 // triggers React's "cannot update while rendering" error.
 const missingTarget =
 (view.step === "configure" &&
 !categories
 .find((c) => c.id === view.categoryId)
 ?.dishes.some((d) => d.id === view.dishId)) ||
 (view.step === "dish" && !categories.some((c) => c.id === view.categoryId));
 useEffect(() => {
 if (missingTarget) goCategory(view.groupId);
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [missingTarget]);

 // Register back handler in modal header for category/dish steps.
 // Configure step delegates to DishWizard which registers its own.
 useEffect(() => {
 if (view.step === "dish") {
 onRegisterBack(() => goCategory(view.groupId));
 } else if (view.step === "category" && hasGroups) {
 onRegisterBack(goGroup);
 }
 // group step: no back; configure: DishWizard registers its own.
 return () => {
 if (view.step !== "configure") onRegisterBack(null);
 };
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [view.step, view.categoryId, view.dishId, view.orderId, view.groupId, hasGroups]);

 if (view.step === "configure") {
 const cat = categories.find((c) => c.id === view.categoryId);
 const dish = cat?.dishes.find((d) => d.id === view.dishId);
 if (!dish || !cat) return null; // missingTarget effect navigates away
 return (
 <DishWizard
 // Remount when the dish or the edited item changes so selections
 // never leak between different wizard sessions.
 key={dish.id + ":" + (editItem?.id ?? "new")}
 dish={dish}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 creating={creating}
 // Edit mode: the dish is fixed, so "back" leaves the wizard
 // entirely instead of returning to the dish list.
 onBack={editItem ? onBackToOrder : () => goDish(cat.id)}
 onAdd={(data) => onAdd(data, dish)}
 onRegisterBack={onRegisterBack}
 onTitleChange={onTitleChange}
 onRegisterFooter={onRegisterFooter}
 editing={!!editItem}
 initialOptions={editItem?.options}
 initialNotes={editItem?.notes}
 initialBasePrice={editItem?.basePriceSnapshot}
 />
 );
 }

 if (view.step === "dish") {
 const cat = categories.find((c) => c.id === view.categoryId);
 if (!cat) return null; // missingTarget effect navigates away
  // Order-flow lists every dish in the category, including ones hidden from
  // the public menu — staff still need a way to add them to in-house orders.
  // Same sortOrder as the menu editor + public menu.
  const visibleDishes = [...cat.dishes].sort((a, b) => a.sortOrder - b.sortOrder);
 return (
 <div>
 {visibleDishes.length === 0 ? (
 <p className="text-sm text-muted-foreground text-center py-6">{t("noDishesInCategory")}</p>
 ) : (
 <div className="-m-5 divide-y divide-border">
 {visibleDishes.map((d) => (
 <button
 key={d.id}
 type="button"
 data-testid="wiz-dish"
 onClick={() => {
 track("dash_orders_order_select_item");
 goConfigure(cat.id, d.id);
 }}
 className="w-full text-left flex items-center justify-between gap-3 px-5 py-3 select-none transition-colors md:hover:bg-primary/5"
 >
 <span className="min-w-0 flex-1 text-sm text-foreground truncate">
 {getMlWithFallback(d.name, defaultLang, defaultLang)}
 </span>
 <span className="text-sm text-muted-foreground tabular-nums shrink-0">
 {currencySymbol + d.price}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 ))}
 </div>
 )}
 </div>
 );
 }

 if (view.step === "group") {
 // Groups first (menu-editor order), then a "without group" bucket when
 // ungrouped leaf categories exist.
 const groups = categories
 .filter((c) => c.isGroup)
 .sort((a, b) => a.sortOrder - b.sortOrder);
 const hasUngrouped = categories.some((c) => !c.isGroup && (c.parentId ?? null) === null);
 return (
 <div>
 {groups.length === 0 && !hasUngrouped ? (
 <p className="text-sm text-muted-foreground text-center py-6">{t("noDishesInCategory")}</p>
 ) : (
 <div className="-m-5 divide-y divide-border">
 {groups.map((g) => (
 <button
 key={g.id}
 type="button"
 data-testid="wiz-group"
 onClick={() => goCategory(g.id)}
 className="w-full text-left flex items-center justify-between gap-3 px-5 py-3 select-none transition-colors md:hover:bg-primary/5"
 >
 <span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate">
 {getMlWithFallback(g.name, defaultLang, defaultLang)}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 ))}
 {hasUngrouped ? (
 <button
 type="button"
 onClick={() => goCategory(null)}
 className="w-full text-left flex items-center justify-between gap-3 px-5 py-3 select-none transition-colors md:hover:bg-primary/5"
 >
 <span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate">
 {t("withoutGroup", { defaultValue: "Without group" })}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 ) : null}
 </div>
 )}
 </div>
 );
 }

 // step === "category"
 // Order item creation works against leaf categories only — groups are
 // organizational and never carry dishes themselves. When a group was
 // picked, only its categories show (null = the ungrouped bucket).
 // Same sortOrder as the menu editor + public menu.
 const pickable = categories
 .filter((c) => !c.isGroup)
 .filter((c) =>
 view.groupId === undefined
 ? true
 : view.groupId === null
 ? (c.parentId ?? null) === null
 : c.parentId === view.groupId,
 )
 .sort((a, b) => a.sortOrder - b.sortOrder);
 return (
 <div>
 {pickable.length === 0 ? (
 <p className="text-sm text-muted-foreground text-center py-6">{t("noDishesInCategory")}</p>
 ) : (
 <div className="-m-5 divide-y divide-border">
 {pickable.map((c) => (
 <button
 key={c.id}
 type="button"
 data-testid="wiz-category"
 onClick={() => {
 track("dash_orders_order_select_category");
 goDish(c.id);
 }}
 className="w-full text-left flex items-center justify-between gap-3 px-5 py-3 select-none transition-colors md:hover:bg-primary/5"
 >
 <span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate">
 {getMlWithFallback(c.name, defaultLang, defaultLang)}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 ))}
 </div>
 )}
 </div>
 );
}

type WizardSubstep =
 | { kind: "required"; index: number }
 | { kind: "extras"; index: number }
 | { kind: "notes" };

function DishWizard({
 dish,
 defaultLang,
 currencySymbol,
 creating,
 onBack,
 onAdd,
 onRegisterBack,
 onTitleChange,
 onRegisterFooter,
 editing = false,
 initialOptions,
 initialNotes,
 initialBasePrice,
}: {
 dish: Dish;
 defaultLang: string;
 currencySymbol: string;
 creating: boolean;
 onBack: () => void;
 onAdd: (data: { options: OrderItemOptionSnapshot[]; notes: string }) => void;
 onRegisterBack?: (fn: (() => void) | null) => void;
 onTitleChange?: (title: string | null) => void;
 onRegisterFooter?: (node: React.ReactNode | null) => void;
 // Edit mode: prefill from an existing order item; the footer button says
 // "Save" instead of "Add".
 editing?: boolean;
 initialOptions?: OrderItemOptionSnapshot[];
 initialNotes?: string;
 // Item's saved base price — footer total must match what will be persisted
 // (the item keeps its snapshot even if the menu price changed since).
 initialBasePrice?: string;
}) {
 const t = useTranslations("dashboard.orders");
 const tc = useTranslations("dashboard.common");
 const requiredOpts = (dish.options || []).filter((o) => o.required);
 const extraOpts = (dish.options || []).filter((o) => !o.required);

 // Best-effort mapping of saved option snapshots back onto the live dish
 // options — snapshots store names (not ids), so match by default-language
 // text. Options renamed since the item was created simply come back
 // unselected.
 const mlKey = (ml: OrderItem["dishNameSnapshot"]) => getMlWithFallback(ml, defaultLang, defaultLang);
 const findSnap = (opt: DishOption, v: OptionVariant) =>
 (initialOptions ?? []).find(
 (s) => mlKey(s.optionName) === mlKey(opt.name) && mlKey(s.variantName) === mlKey(v.name),
 );

 const initialSubstep: WizardSubstep =
 requiredOpts.length > 0
 ? { kind: "required", index: 0 }
 : extraOpts.length > 0
 ? { kind: "extras", index: 0 }
 : { kind: "notes" };
 const [substep, setSubstep] = useState<WizardSubstep>(initialSubstep);

 const [reqSelections, setReqSelections] = useState<Record<string, string | string[] | null>>(() => {
 const init: Record<string, string | string[] | null> = {};
 requiredOpts.forEach((opt) => {
 if (opt.type === "single") {
 init[opt.id] = opt.variants.find((v) => findSnap(opt, v))?.id ?? null;
 } else {
 init[opt.id] = opt.variants.filter((v) => findSnap(opt, v)).map((v) => v.id);
 }
 });
 return init;
 });
 const [extraQty, setExtraQty] = useState<Record<string, number>>(() => {
 const init: Record<string, number> = {};
 extraOpts.forEach((opt) =>
 opt.variants.forEach((v) => {
 const snap = findSnap(opt, v);
 if (snap) init[v.id] = snap.quantity ?? 1;
 }),
 );
 return init;
 });
 const [notes, setNotes] = useState(initialNotes ?? "");
 // handleAdd (closed over by the registered footer) reads notes via a ref so
 // the footer-registration effect doesn't depend on `notes` — otherwise every
 // keystroke in the comment field re-registered the footer and re-rendered
 // the whole OrdersPage (visible input lag on cheap kiosk tablets).
 const notesRef = useRef(notes);
 notesRef.current = notes;

 function setQty(variantId: string, qty: number) {
 setExtraQty((s) => {
 const next = { ...s };
 if (qty <= 0) delete next[variantId];
 else next[variantId] = qty;
 return next;
 });
 }

 function buildSnapshots(): OrderItemOptionSnapshot[] {
 const items: OrderItemOptionSnapshot[] = [];
 requiredOpts.forEach((opt) => {
 const sel = reqSelections[opt.id];
 if (opt.type === "single" && typeof sel === "string") {
 const v = opt.variants.find((vv) => vv.id === sel);
 if (v) items.push({ optionName: opt.name, variantName: v.name, priceDelta: v.priceDelta });
 }
 if (opt.type === "multi" && Array.isArray(sel)) {
 sel.forEach((vid) => {
 const v = opt.variants.find((vv) => vv.id === vid);
 if (v) items.push({ optionName: opt.name, variantName: v.name, priceDelta: v.priceDelta });
 });
 }
 });
 extraOpts.forEach((opt) => {
 opt.variants.forEach((v) => {
 const qty = extraQty[v.id] ?? 0;
 if (qty > 0) {
 items.push({ optionName: opt.name, variantName: v.name, priceDelta: v.priceDelta, quantity: qty });
 }
 });
 });
 return items;
 }

 const snapshots = buildSnapshots();
 const totalPrice =
 (parseDecimal(editing ? initialBasePrice ?? dish.price : dish.price) || 0) +
 snapshots.reduce((sum, o) => sum + (parseDecimal(o.priceDelta) || 0) * (o.quantity ?? 1), 0);

 function goAfterRequired() {
 if (extraOpts.length > 0) setSubstep({ kind: "extras", index: 0 });
 else setSubstep({ kind: "notes" });
 }

 function advanceFromRequired(idx: number) {
 if (idx + 1 < requiredOpts.length) setSubstep({ kind: "required", index: idx + 1 });
 else goAfterRequired();
 }

 function advanceFromExtras(idx: number) {
 if (idx + 1 < extraOpts.length) setSubstep({ kind: "extras", index: idx + 1 });
 else setSubstep({ kind: "notes" });
 }

 function handleBack() {
 if (substep.kind === "required") {
 if (substep.index === 0) onBack();
 else setSubstep({ kind: "required", index: substep.index - 1 });
 } else if (substep.kind === "extras") {
 if (substep.index > 0) setSubstep({ kind: "extras", index: substep.index - 1 });
 else if (requiredOpts.length > 0) setSubstep({ kind: "required", index: requiredOpts.length - 1 });
 else onBack();
 } else {
 // notes
 if (extraOpts.length > 0) setSubstep({ kind: "extras", index: extraOpts.length - 1 });
 else if (requiredOpts.length > 0) setSubstep({ kind: "required", index: requiredOpts.length - 1 });
 else onBack();
 }
 }

 const stepIndex =
 substep.kind === "required" || substep.kind === "extras" ? substep.index : -1;

 useEffect(() => {
 if (!onRegisterBack) return;
 onRegisterBack(() => handleBack());
 return () => onRegisterBack(null);
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [substep.kind, stepIndex, requiredOpts.length, extraOpts.length]);

 // Set modal title per substep. Layout effect — a plain effect ran after
 // paint, flashing the generic "Add item" title for one frame on entry.
 useLayoutEffect(() => {
 if (!onTitleChange) return;
 if (substep.kind === "required") {
 const opt = requiredOpts[substep.index];
 const name = opt ? getMlWithFallback(opt.name, defaultLang, defaultLang) : "";
 onTitleChange(t("selectOption", { defaultValue: "Select {name}", name }));
 } else if (substep.kind === "extras") {
 const opt = extraOpts[substep.index];
 const name = opt ? getMlWithFallback(opt.name, defaultLang, defaultLang) : "";
 onTitleChange(t("selectOption", { defaultValue: "Select {name}", name }));
 } else {
 onTitleChange(t("commentStep", { defaultValue: "Comment" }));
 }
 return () => onTitleChange(null);
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [substep.kind, stepIndex]);

 function pickRequiredVariant(opt: DishOption, idx: number, variantId: string) {
 if (opt.type === "single") {
 setReqSelections((s) => ({ ...s, [opt.id]: variantId }));
 advanceFromRequired(idx);
 } else {
 setReqSelections((s) => {
 const cur = (s[opt.id] as string[]) || [];
 return {
 ...s,
 [opt.id]: cur.includes(variantId) ? cur.filter((v) => v !== variantId) : [...cur, variantId],
 };
 });
 }
 }

 function handleMultiContinue(opt: DishOption, idx: number) {
 const sel = reqSelections[opt.id];
 if (!Array.isArray(sel) || sel.length === 0) return;
 advanceFromRequired(idx);
 }

 function handleAdd() {
 onAdd({ options: snapshots, notes: notesRef.current.trim() });
 }

 const currentOpt = substep.kind === "required" ? requiredOpts[substep.index] : null;

 // Footer button (registered to modal footer).
 const multiEnabled =
 substep.kind === "required" &&
 currentOpt &&
 currentOpt.type === "multi" &&
 Array.isArray(reqSelections[currentOpt.id]) &&
 (reqSelections[currentOpt.id] as string[]).length > 0;
 const btnCls = primaryBtn + " inline-flex items-center gap-1.5";
 const footerNode: React.ReactNode = (() => {
 if (substep.kind === "required" && currentOpt && currentOpt.type === "multi") {
 return (
 <div className="flex justify-end">
 <button
 type="button"
 data-testid="wiz-continue"
 onClick={() => handleMultiContinue(currentOpt, substep.index)}
 disabled={!multiEnabled}
 className={btnCls}
 >
 <span className="truncate">{t("continue")}</span>
 </button>
 </div>
 );
 }
 if (substep.kind === "extras") {
 return (
 <div className="flex justify-end">
 <button
 type="button"
 data-testid="wiz-continue"
 onClick={() => advanceFromExtras(substep.index)}
 className={btnCls}
 >
 <span className="truncate">{t("continue")}</span>
 </button>
 </div>
 );
 }
 if (substep.kind === "notes") {
 return (
 <div className="flex justify-end">
 <button
 type="button"
 data-testid="wiz-add"
 onClick={handleAdd}
 disabled={creating}
 className={btnCls}
 >
 {creating ? (
 <span className="inline-block w-3 h-3 border-2 border-current border-r-transparent rounded-full animate-spin shrink-0" />
 ) : editing ? (
 <span className="truncate">{tc("save")} · {formatPrice(totalPrice, currencySymbol)}</span>
 ) : (
 <span className="truncate">{t("addPrice", { price: formatPrice(totalPrice, currencySymbol) })}</span>
 )}
 </button>
 </div>
 );
 }
 return null;
 })();

 // Layout effect for the same reason as the title above — the footer
 // otherwise pops in a frame late.
 useLayoutEffect(() => {
 if (!onRegisterFooter) return;
 onRegisterFooter(footerNode);
 return () => onRegisterFooter(null);
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [
 substep.kind,
 stepIndex,
 multiEnabled,
 creating,
 totalPrice,
 ]);

 if (substep.kind === "required" && currentOpt) {
 const isMulti = currentOpt.type === "multi";
 return (
 <div className="-m-5 divide-y divide-border">
 {currentOpt.variants.map((v) => {
 const sel = reqSelections[currentOpt.id];
 const isSelected = isMulti
 ? Array.isArray(sel) && sel.includes(v.id)
 : sel === v.id;
 const delta = parseDecimal(v.priceDelta) || 0;
 return (
 <button
 key={v.id}
 type="button"
 data-testid="wiz-variant"
 onClick={() => pickRequiredVariant(currentOpt, substep.index, v.id)}
 className="w-full text-left flex items-center justify-between gap-3 px-5 py-3 transition-colors"
 >
 <span className={"min-w-0 flex-1 text-sm truncate " + (isSelected ? "font-medium text-foreground" : "text-foreground")}>
 {getMlWithFallback(v.name, defaultLang, defaultLang)}
 </span>
 {delta > 0 ? (
 <span className="text-sm text-muted-foreground tabular-nums shrink-0">
 {`+${delta.toFixed(2)}`}
 </span>
 ) : null}
 {isMulti ? (
 <span
 className={
 "w-4 h-4 inline-flex items-center justify-center rounded border shrink-0 " +
 (isSelected
 ? "bg-primary border-primary text-primary-foreground"
 : "border-input")
 }
 >
 {isSelected ? <CheckIcon size={10} /> : null}
 </span>
 ) : (
 <ChevronRightIcon size={14} className="shrink-0 text-muted-foreground" />
 )}
 </button>
 );
 })}
 </div>
 );
 }

 if (substep.kind === "extras") {
 const opt = extraOpts[substep.index];
 if (!opt) return null;
 return (
 <div className="-m-5 divide-y divide-border">
 {opt.variants.map((v) => {
 const qty = extraQty[v.id] ?? 0;
 const delta = parseDecimal(v.priceDelta) || 0;
 return (
 <div
 key={v.id}
 data-testid="wiz-extra-row"
 className="flex items-center justify-between gap-3 px-5 py-3"
 >
 <div className="min-w-0 flex-1">
 <div className="text-sm text-foreground truncate">
 {getMlWithFallback(v.name, defaultLang, defaultLang)}
 </div>
 {delta > 0 ? (
 <div className="text-sm text-muted-foreground tabular-nums">
 {t("perEach", { amount: delta.toFixed(2) })}
 </div>
 ) : null}
 </div>
 <div className="flex items-center gap-2 shrink-0">
 <button
 type="button"
 onClick={() => setQty(v.id, qty - 1)}
 disabled={qty <= 0}
 className="w-8 h-8 rounded-md border border-border text-foreground transition-colors disabled:opacity-30"
 aria-label={t("decrease")}
 >
 −
 </button>
 <div className="w-6 text-center text-sm font-medium text-foreground tabular-nums">
 {qty}
 </div>
 <button
 type="button"
 onClick={() => setQty(v.id, qty + 1)}
 className="w-8 h-8 rounded-md border border-border text-foreground transition-colors"
 aria-label={t("increase")}
 >
 +
 </button>
 </div>
 </div>
 );
 })}
 </div>
 );
 }

 // notes
 const dishNameDisplay = getMlWithFallback(dish.name, defaultLang, defaultLang);
 return (
 <div className="-m-5 divide-y divide-border">
 <div className="px-5 py-3">
 <div className="flex items-start justify-between gap-3">
 <div className="text-sm font-medium text-foreground min-w-0 flex-1">
 {dishNameDisplay}
 </div>
 <div className="text-sm font-medium text-foreground tabular-nums shrink-0">
 {formatPrice(totalPrice, currencySymbol)}
 </div>
 </div>
 {snapshots.length > 0 ? (
 <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
 {snapshots.map((o, i) => {
 const name = getMlWithFallback(o.variantName, defaultLang, defaultLang);
 const delta = parseDecimal(o.priceDelta) || 0;
 const qty = o.quantity ?? 1;
 const parts: string[] = [name];
 if (delta > 0) parts.push(`+${formatPrice(delta, currencySymbol)}`);
 if (qty > 1) parts.push(`× ${qty}`);
 return <div key={i}>{parts.join(" ")}</div>;
 })}
 </div>
 ) : null}
 </div>
 <div className="px-5 py-3">
 <NotesTextarea
 value={notes}
 onChange={setNotes}
 placeholder={t("notesLabel") + ": " + t("notesPlaceholder")}
 />
 </div>
 </div>
 );
}

function NotesTextarea({
 value,
 onChange,
 placeholder,
}: {
 value: string;
 onChange: (v: string) => void;
 placeholder: string;
}) {
 const ref = useRef<HTMLTextAreaElement | null>(null);
 useEffect(() => {
 const el = ref.current;
 if (!el) return;
 el.style.height = "auto";
 el.style.height = Math.max(50, el.scrollHeight) + "px";
 }, [value]);
 return (
 <textarea
 ref={ref}
 id="item-notes"
 value={value}
 onChange={(e) => onChange(e.target.value)}
 onFocus={() => track("dash_orders_order_focus_note")}
 placeholder={placeholder}
 className="w-full bg-transparent border-0 outline-none resize-none text-sm text-foreground placeholder:text-muted-foreground p-0 m-0"
 style={{ minHeight: 50 }}
 />
 );
}

// ── Change-table modal ──

function ChangeTableModal({
 orderId,
 orders,
 tables,
 occupiedIds,
 onClose,
 onConfirm,
}: {
 orderId: string | null;
 orders: Order[];
 tables: TableEntity[];
 occupiedIds: Set<string>;
 onClose: () => void;
 onConfirm: (orderId: string, table: TableEntity) => void | Promise<void>;
}) {
 const t = useTranslations("dashboard.orders");
 const tc = useTranslations("dashboard.common");
 const order = orders.find((o) => o.id === orderId) || null;
 const [selectedId, setSelectedId] = useState<string | null>(null);
 useEffect(() => {
 setSelectedId(order?.tableId ?? null);
 }, [order?.id, order?.tableId]);

 if (!orderId || !order) return null;
 const selectedTable = selectedId ? tables.find((tbl) => tbl.id === selectedId) : null;
 const isSame = selectedTable && selectedTable.id === order.tableId;

 return (
 <Modal
 open={!!orderId}
 onClose={onClose}
 title={t("changeTable", { defaultValue: "Change table" })}
 size="sm"
 footer={
 <div className="flex items-center justify-end gap-2">
 <button
 type="button"
 onClick={onClose}
 className={secondaryBtn + " inline-flex items-center"}
 >
 <span className="truncate">{tc("cancel")}</span>
 </button>
 <button
 type="button"
 data-testid="change-table-save"
 onClick={() => {
 if (selectedTable) onConfirm(orderId, selectedTable);
 }}
 disabled={!selectedTable || isSame === true}
 className={primaryBtn + " inline-flex items-center"}
 >
 <span className="truncate">{tc("save")}</span>
 </button>
 </div>
 }
 >
 <div className="-m-5 aspect-square w-auto [&_.floor-map]:border-0 [&_.floor-map]:rounded-none">
 <FloorMap
 tables={tables}
 selectedId={selectedId}
 // Background taps report null — ignore them, a change-table pick
 // can only ever land on a real table.
 onSelectTable={(id) => { if (id) setSelectedId(id); }}
 occupiedIds={occupiedIds}
 wide
 ringAll
 // Chosen table stays solid, the rest fade — same look as the
 // table edit page. No-table orders start with nothing selected,
 // so only dim once a table is picked.
 dimUnselected={!!selectedId}
 />
 </div>
 </Modal>
 );
}

// ── Split-order modal ──

function SplitOrderModal({
 orderId,
 orders,
 defaultLang,
 currencySymbol,
 onClose,
 onConfirm,
}: {
 orderId: string | null;
 orders: Order[];
 defaultLang: string;
 currencySymbol: string;
 onClose: () => void;
 onConfirm: (orderId: string, itemIds: string[]) => void | Promise<void>;
}) {
 const t = useTranslations("dashboard.orders");
 const order = orders.find((o) => o.id === orderId) || null;
 const [picked, setPicked] = useState<Set<string>>(new Set());
 useEffect(() => {
 setPicked(new Set());
 }, [orderId]);

 if (!orderId || !order) return null;

 const items = order.items;
 const pickedItems = items.filter((it) => picked.has(it.id));
 const keptItems = items.filter((it) => !picked.has(it.id));
 const canSplit = pickedItems.length > 0 && keptItems.length > 0;

 function toggle(id: string) {
 setPicked((cur) => {
 const next = new Set(cur);
 if (next.has(id)) next.delete(id);
 else next.add(id);
 return next;
 });
 }

 return (
 <Modal
 open={!!orderId}
 onClose={onClose}
 title={t("splitOrder", { defaultValue: "Split order" })}
 size="sm"
 footer={
 <div className="flex items-center justify-end gap-2">
 <button
 type="button"
 data-testid="split-confirm"
 onClick={() => onConfirm(orderId, Array.from(picked))}
 disabled={!canSplit}
 className={primaryBtn + " inline-flex items-center gap-1.5"}
 >
 <SplitIcon size={15} className="shrink-0" />
 <span className="truncate">{t("splitOrder", { defaultValue: "Split order" })}</span>
 </button>
 </div>
 }
 >
 <div className="-m-5 divide-y divide-border">
 {items.map((item) => {
 const isPicked = picked.has(item.id);
 const price = calcItemPrice(item);
 return (
 <button
 key={item.id}
 type="button"
 data-testid="split-item"
 onClick={() => toggle(item.id)}
 className={
 "w-full flex items-center gap-3 px-5 py-3 text-left transition-colors " +
 (isPicked ? "bg-primary/5" : "")
 }
 >
 <span
 className={
 "w-4 h-4 rounded border inline-flex items-center justify-center shrink-0 " +
 (isPicked
 ? "bg-primary border-primary text-primary-foreground"
 : "border-input")
 }
 >
 {isPicked ? <CheckIcon size={10} /> : null}
 </span>
 <span className="min-w-0 flex-1 text-sm text-foreground truncate">
 {getMlWithFallback(item.dishNameSnapshot, defaultLang, defaultLang)}
 </span>
 <span className="text-sm text-muted-foreground tabular-nums shrink-0">
 {formatPrice(price, currencySymbol)}
 </span>
 </button>
 );
 })}
 </div>
 </Modal>
 );
}

// Select-style row shared by the item/order action modals — mirrors the
// "add" picker in the menu editor (full-bleed rows, desktop-only hover tint).
const actionRowCls =
 "w-full flex items-center gap-3 text-left py-3 px-5 select-none transition-colors md:hover:bg-primary/5";

// Select-style modal listing the actions for one order item: change status
// (opens the status picker below), then duplicate / discount / remove.
function ItemActionsModal({
 open,
 item,
 defaultLang,
 onClose,
 onChangeStatus,
 onEdit,
 onDuplicate,
 onDiscount,
 onRemove,
}: {
 open: boolean;
 item: OrderItem | null;
 defaultLang: string;
 onClose: () => void;
 onChangeStatus: () => void;
 // null → dish no longer exists in the menu, the edit row is hidden.
 onEdit: (() => void) | null;
 onDuplicate: () => void;
 onDiscount: () => void;
 onRemove: () => void;
}) {
 const t = useTranslations("dashboard.orders");
 const tc = useTranslations("dashboard.common");
 const statusKey = ITEM_STATUS_KEYS[item?.status ?? "pending"];
 return (
 <Modal
 open={open}
 onClose={onClose}
 title={item ? getMlWithFallback(item.dishNameSnapshot, defaultLang, defaultLang) : ""}
 size="sm"
 >
 <div className="-m-5">
 <button type="button" data-testid="item-act-status" onClick={onChangeStatus} className={actionRowCls}>
 <RefreshIcon size={16} className="shrink-0 text-muted-foreground" />
 <span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate">
 {t("changeStatus", { defaultValue: "Change status" })}
 </span>
 {/* Current status as a hint on the right. */}
 <span className="shrink-0 text-sm text-muted-foreground">{t(statusKey)}</span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 {onEdit ? (
 <button type="button" data-testid="item-act-edit" onClick={onEdit} className={actionRowCls}>
 <EditIcon size={16} className="shrink-0 text-muted-foreground" />
 <span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate">
 {tc("edit")}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 ) : null}
 <button type="button" data-testid="item-act-duplicate" onClick={onDuplicate} className={actionRowCls}>
 <CopyIcon size={16} className="shrink-0 text-muted-foreground" />
 <span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate">
 {t("duplicateItem", { defaultValue: "Duplicate" })}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 <button type="button" data-testid="item-act-discount" onClick={onDiscount} className={actionRowCls}>
 <PercentIcon size={16} className="shrink-0 text-muted-foreground" />
 <span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate">
 {item?.discount
 ? t("discountEdit", { defaultValue: "Edit discount" })
 : t("discountAdd", { defaultValue: "Add discount" })}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 <button type="button" data-testid="item-act-remove" onClick={onRemove} className={actionRowCls}>
 <TrashIcon size={16} className="shrink-0 text-red-600" />
 <span className="min-w-0 flex-1 text-sm font-medium text-red-600 truncate">
 {t("removeItem")}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 </div>
 </Modal>
 );
}

// Select-style status picker for one order item — opened from the "Change
// status" row of ItemActionsModal. The current status shows a check mark;
// picking another one applies it immediately.
function ItemStatusModal({
 open,
 item,
 onClose,
 onStatusChange,
}: {
 open: boolean;
 item: OrderItem | null;
 onClose: () => void;
 onStatusChange: (status: OrderItemStatus) => void;
}) {
 const t = useTranslations("dashboard.orders");
 return (
 <Modal
 open={open}
 onClose={onClose}
 title={t("changeStatus", { defaultValue: "Change status" })}
 size="sm"
 >
 <div className="-m-5">
 {STATUS_ORDER.map((s) => {
 const isActive = item?.status === s;
 return (
 <button
 key={s}
 type="button"
 data-testid={"item-status-" + s}
 onClick={() => {
 if (isActive) {
 onClose();
 return;
 }
 track("dash_orders_order_status_click");
 onStatusChange(s);
 }}
 className={actionRowCls + (isActive ? " bg-primary/5" : "")}
 >
 <span className={"w-2 h-2 rounded-full shrink-0 " + STATUS_DOT_CLS[s]} />
 <span className={"min-w-0 flex-1 text-sm text-foreground truncate" + (isActive ? " font-medium" : "")}>
 {t(ITEM_STATUS_KEYS[s])}
 </span>
 {isActive ? (
 <CheckIcon size={18} className="shrink-0 text-primary" />
 ) : (
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 )}
 </button>
 );
 })}
 </div>
 </Modal>
 );
}

// Select-style modal with the order-level actions — opened from the footer
// "Actions" button in the order detail modal (replaces the old dropdown).
function OrderActionsModal({
 open,
 order,
 hasTables,
 onClose,
 onChangeTable,
 onSplit,
 onDiscount,
 onDelete,
}: {
 open: boolean;
 order: Order | null;
 hasTables: boolean;
 onClose: () => void;
 onChangeTable: () => void;
 onSplit: () => void;
 onDiscount: () => void;
 onDelete: () => void;
}) {
 const t = useTranslations("dashboard.orders");
 return (
 <Modal
 open={open}
 onClose={onClose}
 title={t("orderActions", { defaultValue: "Actions" })}
 size="sm"
 >
 <div className="-m-5">
 {hasTables ? (
 <button type="button" data-testid="ord-act-change-table" onClick={onChangeTable} className={actionRowCls}>
 <SwapIcon size={16} className="shrink-0 text-muted-foreground" />
 <span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate">
 {t("changeTable", { defaultValue: "Change table" })}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 ) : null}
 {order && order.items.length >= 2 ? (
 <button type="button" data-testid="ord-act-split" onClick={onSplit} className={actionRowCls}>
 <SplitIcon size={16} className="shrink-0 text-muted-foreground" />
 <span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate">
 {t("splitOrder", { defaultValue: "Split order" })}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 ) : null}
 <button type="button" data-testid="ord-act-discount" onClick={onDiscount} className={actionRowCls}>
 <PercentIcon size={16} className="shrink-0 text-muted-foreground" />
 <span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate">
 {order?.discount
 ? t("discountEdit", { defaultValue: "Edit discount" })
 : t("discountAdd", { defaultValue: "Add discount" })}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 <button type="button" data-testid="ord-act-delete" onClick={onDelete} className={actionRowCls}>
 <TrashIcon size={16} className="shrink-0 text-red-600" />
 <span className="min-w-0 flex-1 text-sm font-medium text-red-600 truncate">
 {t("deleteOrder")}
 </span>
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 </button>
 </div>
 </Modal>
 );
}


function CompleteOrderModal({
 open,
 paymentMethods,
 onCancel,
 onConfirm,
}: {
 open: boolean;
 paymentMethods: string[];
 onCancel: () => void;
 onConfirm: (paymentMethodId: string | null) => void;
}) {
 const t = useTranslations("dashboard.orders");
 const tc = useTranslations("dashboard.common");
 const tpm = useTranslations("dashboard.paymentMethods");
 const [selected, setSelected] = useState<string | null>(paymentMethods[0] ?? null);
 // Reset only on open — `paymentMethods` identity churns with SSE ticks and
 // would knock the picked method back to the first one mid-selection.
 const paymentMethodsRef = useRef(paymentMethods);
 paymentMethodsRef.current = paymentMethods;
 useEffect(() => {
 if (open) setSelected(paymentMethodsRef.current[0] ?? null);
 }, [open]);
 const hasMethods = paymentMethods.length > 0;
 return (
 <Modal
 open={open}
 onClose={onCancel}
 title={t("completeOrder")}
 size="sm"
 footer={
 <div className="flex gap-2 justify-end">
 <button
 type="button"
 onClick={onCancel}
 className={secondaryBtn + " inline-flex items-center"}
 >
 <span className="truncate">{tc("cancel")}</span>
 </button>
 <button
 type="button"
 data-testid="complete-confirm"
 onClick={() => onConfirm(selected)}
 className={primaryBtn + " inline-flex items-center"}
 >
 <span className="truncate">{t("completeOrder")}</span>
 </button>
 </div>
 }
 >
 {hasMethods ? (
 <div className="-m-5 divide-y divide-border">
 {paymentMethods.map((code) => {
 const isOn = selected === code;
 return (
 <button
 key={code}
 type="button"
 data-testid={"pay-method-" + code}
 onClick={() => setSelected(code)}
 className={
 "w-full flex items-center gap-3 px-5 py-3 text-left transition-colors " +
 (isOn ? "bg-primary/5" : "")
 }
 >
 <span className="min-w-0 flex-1 text-sm text-foreground truncate">
 {tpm(code as never, { defaultValue: code })}
 </span>
 {isOn ? <CheckIcon size={14} className="shrink-0 text-primary" /> : null}
 </button>
 );
 })}
 </div>
 ) : null}
 </Modal>
 );
}

// Tiny inline badge rendered next to a price/total whenever a discount
// is set. Percent shows as "-10%"; fixed shows as "-3.00€" (formatted
// via the parent's currency symbol). Emerald colour because savings.
export function DiscountBadge({
 discount,
 currencySymbol,
}: {
 discount: Discount;
 currencySymbol: string;
}) {
 const label =
 discount.type === "percent"
 ? `-${Math.round(discount.value * 100) / 100}%`
 : `-${formatPrice(discount.value, currencySymbol)}`;
 return (
 <span className="inline-flex items-center h-[22px] px-1.5 rounded-md text-sm font-semibold tabular-nums bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 align-middle">
 {label}
 </span>
 );
}
