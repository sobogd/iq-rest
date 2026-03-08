"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { PlayCircle, CheckCheck, Loader2, X, Settings, PowerOff } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { PageHeader } from "../_ui/page-header";
import { useDashboard } from "../_context/dashboard-context";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { formatPrice } from "@/lib/currencies";
import { DashboardContent } from "../_ui/dashboard-content";
import { useRouter } from "@/i18n/routing";

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  items: unknown;
  total: number;
  currency: string;
  customerName: string | null;
  customerPhone: string | null;
  customerAddress: string | null;
  comment: string | null;
  tableNumber: number | null;
  status: string;
  createdAt: string;
}

type FilterTab = "new" | "in_progress" | "all";

const POLLING_INTERVAL = 15000;

interface OrdersPageProps {
  initialOrders: Order[];
  ordersEnabled: boolean;
}

export function OrdersPage({ initialOrders, ordersEnabled }: OrdersPageProps) {
  const t = useTranslations("orders");
  const { translations } = useDashboard();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [updating, setUpdating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("new");
  const [pollKey, setPollKey] = useState(0);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch {
      // silent fail for polling
    }
  }, []);

  useEffect(() => {
    track(DashboardEvent.SHOWED_ORDERS);
  }, []);

  useEffect(() => {
    if (!ordersEnabled) return;
    const interval = setInterval(fetchOrders, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchOrders, pollKey, ordersEnabled]);

  const filteredOrders = useMemo(() => {
    if (activeTab === "all") return orders;
    return orders.filter((o) => o.status === activeTab);
  }, [orders, activeTab]);

  const newCount = useMemo(() => orders.filter((o) => o.status === "new").length, [orders]);
  const inProgressCount = useMemo(() => orders.filter((o) => o.status === "in_progress").length, [orders]);

  async function handleUpdateStatus(id: string, status: string) {
    setUpdating(id);

    const prevOrders = orders;
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );

    const eventMap: Record<string, DashboardEvent> = {
      in_progress: DashboardEvent.CLICKED_START_ORDER,
      completed: DashboardEvent.CLICKED_COMPLETE_ORDER,
      cancelled: DashboardEvent.CLICKED_CANCEL_ORDER,
    };
    if (eventMap[status]) track(eventMap[status]);

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        setOrders(prevOrders);
        track(DashboardEvent.ERROR_SAVE, { page: "orders" });
        toast.error(t("error"));
      } else {
        setPollKey((k) => k + 1);
        toast.success(t("statusUpdated"));
      }
    } catch {
      setOrders(prevOrders);
      track(DashboardEvent.ERROR_SAVE, { page: "orders" });
      toast.error(t("error"));
    } finally {
      setUpdating(null);
    }
  }

  function renderOrder(order: Order) {
    const isUpdating = updating === order.id;
    const items = (Array.isArray(order.items) ? order.items : []) as OrderItem[];

    return (
      <div key={order.id} className="rounded-xl border border-border bg-muted/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center h-11 px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex-1 min-w-0 truncate">
            {order.tableNumber != null && `${t("table")} ${order.tableNumber}`}
            {order.tableNumber != null && order.customerName && " — "}
            {order.customerName}
            {!order.tableNumber && !order.customerName && format(new Date(order.createdAt), "HH:mm")}
          </span>
          <span className="text-xs text-muted-foreground shrink-0 ml-2">
            {format(new Date(order.createdAt), "HH:mm")}
          </span>
          {(order.status === "new" || order.status === "in_progress") && (
            <button
              onClick={() => !isUpdating && handleUpdateStatus(order.id, "cancelled")}
              className="flex items-center justify-center w-8 h-8 ml-2 -mr-1 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
              disabled={isUpdating}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Items */}
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center h-11 px-4 border-t border-border/50"
          >
            <span className="text-sm font-medium flex-1 min-w-0 truncate">{item.name}</span>
            <span className="text-sm text-muted-foreground ml-2 shrink-0">
              {item.qty} × {formatPrice(item.price, order.currency)}
            </span>
          </div>
        ))}

        {/* Total */}
        <div className="flex items-center h-11 px-4 border-t border-border/50">
          <span className="text-sm font-semibold flex-1">{t("total")}</span>
          <span className="text-sm font-bold">{formatPrice(order.total, order.currency)}</span>
        </div>

        {/* Customer info */}
        {order.customerPhone && (
          <div className="flex items-center h-11 px-4 border-t border-border/50">
            <span className="text-sm text-muted-foreground/60 truncate">{order.customerPhone}</span>
          </div>
        )}
        {order.customerAddress && (
          <div className="flex items-center h-11 px-4 border-t border-border/50">
            <span className="text-sm text-muted-foreground truncate">{order.customerAddress}</span>
          </div>
        )}
        {order.comment && (
          <div className="flex items-center h-11 px-4 border-t border-border/50">
            <span className="text-sm text-muted-foreground italic truncate">{order.comment}</span>
          </div>
        )}

        {/* Status badges */}
        {order.status === "completed" && (
          <div className="flex items-center h-11 px-4 border-t border-border/50">
            <span className="text-xs text-muted-foreground/50 uppercase tracking-wider">{t("completed")}</span>
          </div>
        )}
        {order.status === "in_progress" && activeTab === "all" && (
          <div className="flex items-center h-11 px-4 border-t border-border/50">
            <span className="text-xs text-muted-foreground/50 uppercase tracking-wider">{t("inProgress")}</span>
          </div>
        )}
        {order.status === "cancelled" && (
          <div className="flex items-center h-11 px-4 border-t border-border/50">
            <span className="text-xs text-red-400/70 uppercase tracking-wider">{t("cancelled")}</span>
          </div>
        )}

        {/* Action: start order */}
        {order.status === "new" && (
          <div
            onClick={() => !isUpdating && handleUpdateStatus(order.id, "in_progress")}
            className={`flex items-center h-11 px-4 border-t border-border/50 transition-colors hover:bg-muted/50 ${isUpdating ? "opacity-50" : "cursor-pointer"}`}
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 mr-2 text-success animate-spin" />
            ) : (
              <PlayCircle className="h-4 w-4 mr-2 text-success" />
            )}
            <span className="text-sm font-medium text-success">{t("startOrder")}</span>
          </div>
        )}

        {/* Action: complete order */}
        {order.status === "in_progress" && (
          <div
            onClick={() => !isUpdating && handleUpdateStatus(order.id, "completed")}
            className={`flex items-center h-11 px-4 border-t border-border/50 transition-colors hover:bg-muted/50 ${isUpdating ? "opacity-50" : "cursor-pointer"}`}
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 mr-2 text-success animate-spin" />
            ) : (
              <CheckCheck className="h-4 w-4 mr-2 text-success" />
            )}
            <span className="text-sm font-medium text-success">{t("complete")}</span>
          </div>
        )}
      </div>
    );
  }

  const tabs: { key: FilterTab; label: string; count?: number }[] = [
    { key: "new", label: t("new"), count: newCount },
    { key: "in_progress", label: t("inProgress"), count: inProgressCount },
    { key: "all", label: t("all") },
  ];

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.orders}>
        <button
          onClick={() => { track(DashboardEvent.CLICKED_ORDER_SETTINGS); router.push("/dashboard/order-settings"); }}
          className="flex items-center justify-center h-10 w-10 -mr-2"
        >
          <Settings className="h-5 w-5" />
        </button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-4 flex flex-col min-h-full">

          {!ordersEnabled ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <PowerOff className="h-10 w-10 text-primary" />
              <p className="text-muted-foreground/60">{t("ordersDisabled")}</p>
              <button
                onClick={() => { track(DashboardEvent.CLICKED_ORDER_SETTINGS); router.push("/dashboard/order-settings"); }}
                className="flex items-center gap-2 h-10 px-5 rounded-xl text-white text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(to right, hsl(9,100%,58%), #f59e0b)" }}
              >
                <Settings className="h-4 w-4" />
                {t("configureOrders")}
              </button>
            </div>
          ) : (
            <>
              {/* Segmented control */}
              <div className="rounded-xl border border-border bg-muted/30 overflow-hidden flex">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 flex items-center justify-center gap-1.5 h-9 text-sm font-medium transition-colors ${
                      index > 0 ? "border-l border-border/50" : ""
                    } ${activeTab === tab.key ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted/50"}`}
                  >
                    {tab.label}
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className="text-xs text-muted-foreground">({tab.count})</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Orders list */}
              {filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1">
                  <p className="text-sm text-muted-foreground">{t("noOrders")}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => renderOrder(order))}
                </div>
              )}
            </>
          )}
        </DashboardContent>
      </div>
    </div>
  );
}
