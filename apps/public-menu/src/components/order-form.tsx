import { useMemo, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { useMenu } from "../lib/menu-context";
import { useCart } from "../lib/cart";
import { tField } from "../lib/translations";
import { formatPrice } from "../lib/currencies";
import { getTableNumber, getPreview, useForwardedSearch } from "../lib/forward-search";

export function OrderForm() {
  const { restaurant, items } = useMenu();
  const { t, i18n } = useTranslation();
  const { cart, add, remove, clear } = useCart();
  const navigate = useNavigate();
  const accentColor = restaurant.accentColor || "#000";
  const isPreview = getPreview() === "1";
  const tableQ = getTableNumber();
  const tableNumber = tableQ ? parseInt(tableQ, 10) : undefined;
  const search = useForwardedSearch();

  const [name, setName] = useState(isPreview && restaurant.orderNameEnabled ? "John" : "");
  const [phone, setPhone] = useState(isPreview && restaurant.orderPhoneEnabled ? "+1 234 567 890" : "");
  const [address, setAddress] = useState(isPreview && restaurant.orderAddressEnabled ? "123 Main St" : "");
  const [comment, setComment] = useState(isPreview ? "No onions please" : "");
  const [sending, setSending] = useState(false);

  const showWhatsApp = restaurant.orderMode === "whatsapp" || restaurant.orderMode === "both";
  const lang = i18n.language;

  const cartItems = useMemo(() => {
    return items
      .filter((it) => (cart[it.id] || 0) > 0)
      .map((it) => {
        // Multi-locale snapshot for dashboard rendering. Includes default
        // (en) plus any translated names so the dashboard can show the dish
        // name in the owner's language.
        const snapshot: Record<string, string> = { en: it.name };
        if (it.translations) {
          for (const [lc, fields] of Object.entries(it.translations)) {
            if (fields?.name) snapshot[lc] = fields.name;
          }
        }
        return {
          id: it.id,
          name: tField(it.name, it.translations, "name", lang),
          price: it.price,
          qty: cart[it.id] || 0,
          snapshot,
        };
      });
  }, [items, cart, lang]);

  const total = cartItems.reduce((s, it) => s + it.price * it.qty, 0);

  const canSubmit =
    cartItems.length > 0
    && (!restaurant.orderNameEnabled || name.trim())
    && (!restaurant.orderPhoneEnabled || phone.trim())
    && (!restaurant.orderAddressEnabled || address.trim());

  function openWhatsApp() {
    const lines: string[] = [];
    lines.push(`*${restaurant.title}*`);
    lines.push("");
    if (tableNumber) {
      lines.push(`${t("publicMenu.order.tableLabel")}: ${tableNumber}`);
      lines.push("");
    }
    for (const it of cartItems) {
      lines.push(`${it.qty}x ${it.name} — ${formatPrice(it.price * it.qty, restaurant.currency)}`);
    }
    lines.push("");
    lines.push(`*${t("publicMenu.order.total")}: ${formatPrice(total, restaurant.currency)}*`);
    if (name.trim()) {
      lines.push("");
      lines.push(`${t("publicMenu.order.yourName")}: ${name.trim()}`);
    }
    if (phone.trim()) lines.push(`${t("publicMenu.order.yourPhone")}: ${phone.trim()}`);
    if (address.trim()) lines.push(`${t("publicMenu.order.yourAddress")}: ${address.trim()}`);
    if (comment.trim()) lines.push(`${t("publicMenu.order.comment")}: ${comment.trim()}`);
    const text = encodeURIComponent(lines.join("\n"));
    const waPhone = (restaurant.whatsapp || "").replace(/[^0-9]/g, "");
    if (waPhone) window.open(`https://wa.me/${waPhone}?text=${text}`, "_blank");
  }

  async function handleSend() {
    if (sending || !canSubmit) return;
    setSending(true);
    try {
      // Expand cart entries with qty>1 into individual item rows that match
      // the dashboard's expected shape (one entry per ordered unit, with
      // dishId / multi-locale name snapshot / base price / options / notes /
      // per-unit status). This is what the dashboard kitchen + orders pages
      // render off of.
      const nowIso = new Date().toISOString();
      const orderItems: Array<Record<string, unknown>> = [];
      for (const ci of cartItems) {
        for (let i = 0; i < ci.qty; i++) {
          orderItems.push({
            // Flat shape — read by the legacy soqrmenuweb dashboard.
            name: ci.name,
            qty: 1,
            price: ci.price,
            // Fat shape — read by the new dashboard's kitchen + orders pages.
            id: "id_" + Math.random().toString(36).slice(2, 9),
            dishId: ci.id,
            dishNameSnapshot: ci.snapshot,
            basePriceSnapshot: String(ci.price),
            options: [],
            notes: comment.trim() || "",
            status: "pending",
            createdAt: nowIso,
          });
        }
      }
      const res = await fetch("/api/public/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: restaurant.slug,
          items: orderItems,
          total,
          customerName: name.trim() || null,
          customerPhone: phone.trim() || null,
          customerAddress: address.trim() || null,
          comment: comment.trim() || null,
          tableNumber: tableNumber ?? null,
          isPreview,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSending(false);
        return;
      }
      if (data.mode === "whatsapp" || data.mode === "both") openWhatsApp();
      clear();
      navigate({ to: "/order/success", search });
    } catch {
      setSending(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-gray-400 text-lg">{t("publicMenu.order.emptyCart")}</p>
      </div>
    );
  }

  const inputCls = "w-full h-12 px-4 border-2 border-gray-200 rounded-lg text-base bg-white text-black focus:outline-none";
  const textareaCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-white text-black focus:outline-none resize-none";

  return (
    <div className="space-y-6 pb-[100px]">
      {tableNumber ? (
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
          <span className="text-sm font-semibold text-black">
            {t("publicMenu.order.tableLabel")} {tableNumber}
          </span>
        </div>
      ) : null}

      <div className="space-y-3">
        {cartItems.map((it) => (
          <div key={it.id} className="flex items-center gap-3 border-2 border-gray-200 rounded-lg px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-black truncate">{it.name}</p>
              <p className="text-sm text-gray-500">
                {formatPrice(it.price, restaurant.currency)} × {it.qty} = {formatPrice(it.price * it.qty, restaurant.currency)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => remove(it.id)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-gray-200 text-gray-600 active:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold w-7 text-center text-black">{it.qty}</span>
              <button
                onClick={() => add(it.id)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white active:opacity-80"
                style={{ backgroundColor: accentColor }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-black">{t("publicMenu.order.total")}:</span>
        <span className="text-xl font-bold text-black">{formatPrice(total, restaurant.currency)}</span>
      </div>

      {restaurant.orderNameEnabled ? (
        <div className="space-y-2">
          <label htmlFor="order-name" className="text-base font-semibold text-black">
            {t("publicMenu.order.yourName")}: *
          </label>
          <input id="order-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("publicMenu.order.namePlaceholder")} required readOnly={isPreview} autoComplete="off" className={inputCls} style={{ borderColor: name ? accentColor : undefined }} />
        </div>
      ) : null}

      {restaurant.orderPhoneEnabled ? (
        <div className="space-y-2">
          <label htmlFor="order-phone" className="text-base font-semibold text-black">
            {t("publicMenu.order.yourPhone")}: *
          </label>
          <input id="order-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("publicMenu.order.phonePlaceholder")} required readOnly={isPreview} autoComplete="off" className={inputCls} style={{ borderColor: phone ? accentColor : undefined }} />
        </div>
      ) : null}

      {restaurant.orderAddressEnabled ? (
        <div className="space-y-2">
          <label htmlFor="order-address" className="text-base font-semibold text-black">
            {t("publicMenu.order.yourAddress")}: *
          </label>
          <input id="order-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t("publicMenu.order.addressPlaceholder")} required readOnly={isPreview} autoComplete="off" className={inputCls} style={{ borderColor: address ? accentColor : undefined }} />
        </div>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="order-comment" className="text-base font-semibold text-black">{t("publicMenu.order.comment")}:</label>
        <textarea id="order-comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t("publicMenu.order.commentPlaceholder")} rows={3} readOnly={isPreview} autoComplete="off" className={textareaCls} style={{ borderColor: comment ? accentColor : undefined }} />
      </div>

      <button
        onClick={handleSend}
        disabled={!canSubmit || sending}
        className="w-full h-14 rounded-lg font-bold text-lg flex items-center justify-center gap-3 text-white active:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {showWhatsApp ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
          </svg>
        ) : null}
        {showWhatsApp ? t("publicMenu.order.sendWhatsApp") : t("publicMenu.order.sendOrder")}
      </button>
    </div>
  );
}
