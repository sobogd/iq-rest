"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/currencies";

interface OrderItem {
  id: string;
  name: string;
  price: number;
}

interface OrderFormProps {
  items: OrderItem[];
  initialCart: Record<string, number>;
  currency: string;
  whatsapp: string;
  restaurantTitle: string;
  accentColor: string;
  slug: string;
  isPreview: boolean;
  nameEnabled: boolean;
  phoneEnabled: boolean;
  addressEnabled: boolean;
  orderMode: string;
  tableNumber?: number;
  needsTableStep: boolean;
  translations: {
    yourOrder: string;
    emptyCart: string;
    total: string;
    yourName: string;
    namePlaceholder: string;
    yourPhone: string;
    phonePlaceholder: string;
    yourAddress: string;
    addressPlaceholder: string;
    comment: string;
    commentPlaceholder: string;
    sendWhatsApp: string;
    sendOrder: string;
    tableLabel: string;
    continue: string;
    clearCart: string;
    orderLimitReached: string;
  };
}

import { loadCartClient, saveCartClient, clearCartClient } from "@/lib/cart";

const ORDER_DRAFT_KEY = "iqrest_order_draft";

export function OrderForm({
  items,
  initialCart,
  currency,
  whatsapp,
  restaurantTitle,
  accentColor,
  slug,
  isPreview,
  nameEnabled,
  phoneEnabled,
  addressEnabled,
  orderMode,
  tableNumber,
  needsTableStep,
  translations: t,
}: OrderFormProps) {
  const [cart, setCart] = useState<Map<string, number>>(() => new Map(Object.entries(initialCart).map(([k, v]) => [k, v])));
  const [name, setName] = useState(isPreview && nameEnabled ? "John" : "");
  const [phone, setPhone] = useState(isPreview && phoneEnabled ? "+1 234 567 890" : "");
  const [address, setAddress] = useState(isPreview && addressEnabled ? "123 Main St" : "");
  const [comment, setComment] = useState(isPreview ? "No onions please" : "");
  const [sending, setSending] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const showWhatsApp = orderMode === "whatsapp" || orderMode === "both";

  // Sync with cookie on mount (in case it changed between SSR and client)
  useEffect(() => {
    const fresh = loadCartClient();
    if (fresh.size > 0) setCart(fresh);
  }, []);

  const addToCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = new Map(prev);
      next.set(id, (next.get(id) || 0) + 1);
      saveCartClient(next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = new Map(prev);
      const qty = next.get(id) || 0;
      if (qty <= 1) {
        next.delete(id);
      } else {
        next.set(id, qty - 1);
      }
      saveCartClient(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    clearCartClient();
    setCart(new Map());
  }, []);

  const cartItems = useMemo(() => {
    return items
      .filter((item) => (cart.get(item.id) || 0) > 0)
      .map((item) => ({
        ...item,
        qty: cart.get(item.id) || 0,
      }));
  }, [items, cart]);

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cartItems]);

  const canContinue = useMemo(() => {
    if (cartItems.length === 0) return false;
    if (nameEnabled && !name.trim()) return false;
    if (phoneEnabled && !phone.trim()) return false;
    if (addressEnabled && !address.trim()) return false;
    return true;
  }, [cartItems, nameEnabled, phoneEnabled, addressEnabled, name, phone, address]);

  const handleContinue = () => {
    if (!canContinue) return;

    if (needsTableStep) {
      // Save full order draft to sessionStorage so table page can submit it
      const draft = {
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          qty: item.qty,
          price: item.price,
        })),
        total,
        customerName: name.trim() || null,
        customerPhone: phone.trim() || null,
        customerAddress: address.trim() || null,
        comment: comment.trim() || null,
      };
      sessionStorage.setItem(ORDER_DRAFT_KEY, JSON.stringify(draft));
      // Navigate to table selection page
      const previewParam = isPreview ? "&preview=1" : "";
      window.location.href = `${window.location.pathname}/table?slug=${slug}${previewParam}`;
    } else {
      handleSendOrder();
    }
  };

  const handleSendOrder = async () => {
    if (sending) return;
    setSending(true);

    try {
      if (!isPreview) {
        const orderPayload = {
          slug,
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            qty: item.qty,
            price: item.price,
          })),
          total,
          customerName: name.trim() || null,
          customerPhone: phone.trim() || null,
          customerAddress: address.trim() || null,
          comment: comment.trim() || null,
          tableNumber: tableNumber ?? null,
        };

        const res = await fetch("/api/public/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.error === "limit_reached") {
            setLimitReached(true);
            setSending(false);
            return;
          }
          setSending(false);
          return;
        }

        if (data.mode === "whatsapp" || data.mode === "both") {
          openWhatsApp();
        }
      } else if (showWhatsApp) {
        openWhatsApp();
      }

      clearCart();
      const previewParam = isPreview ? "?preview=1" : "";
      window.location.href = `${window.location.pathname}/success${previewParam}`;
    } catch {
      setSending(false);
    }
  };

  function openWhatsApp() {
    const lines: string[] = [];
    lines.push(`*${restaurantTitle}*`);
    lines.push("");

    if (tableNumber) {
      lines.push(`${t.tableLabel}: ${tableNumber}`);
      lines.push("");
    }

    for (const item of cartItems) {
      lines.push(
        `${item.qty}x ${item.name} — ${formatPrice(item.price * item.qty, currency)}`
      );
    }

    lines.push("");
    lines.push(`*${t.total}: ${formatPrice(total, currency)}*`);

    if (name.trim()) {
      lines.push("");
      lines.push(`${t.yourName}: ${name.trim()}`);
    }
    if (phone.trim()) {
      lines.push(`${t.yourPhone}: ${phone.trim()}`);
    }
    if (address.trim()) {
      lines.push(`${t.yourAddress}: ${address.trim()}`);
    }
    if (comment.trim()) {
      lines.push(`${t.comment}: ${comment.trim()}`);
    }

    const text = encodeURIComponent(lines.join("\n"));
    const waPhone = whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${waPhone}?text=${text}`, "_blank");
  }

  if (limitReached) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-gray-400 text-lg">{t.orderLimitReached}</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-gray-400 text-lg">{t.emptyCart}</p>
      </div>
    );
  }

  // If table is from URL → button sends directly; otherwise → "Continue" to table page
  const buttonLabel = needsTableStep ? t.continue : (showWhatsApp ? t.sendWhatsApp : t.sendOrder);

  return (
    <div className="space-y-6 pb-[100px]">
      {/* Table number badge (from URL) */}
      {tableNumber && (
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
          <span className="text-sm font-semibold text-black">{t.tableLabel} {tableNumber}</span>
        </div>
      )}

      {/* Cart items */}
      <div className="space-y-3">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 border-2 border-gray-200 rounded-lg px-4 py-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-black truncate">{item.name}</p>
              <p className="text-sm text-gray-500">
                {formatPrice(item.price, currency)} &times; {item.qty} = {formatPrice(item.price * item.qty, currency)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => removeFromCart(item.id)}
                className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-gray-200 text-gray-600 active:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold w-7 text-center text-black">{item.qty}</span>
              <button
                onClick={() => addToCart(item.id)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white active:opacity-80"
                style={{ backgroundColor: accentColor }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-black">{t.total}:</span>
        <span className="text-xl font-bold text-black">
          {formatPrice(total, currency)}
        </span>
      </div>

      {/* Name input */}
      {nameEnabled && (
        <div className="space-y-2">
          <label htmlFor="order-name" className="text-base font-semibold text-black">
            {t.yourName}: *
          </label>
          <Input
            id="order-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            required
            readOnly={isPreview}
            className="h-12 border-2 border-gray-200 text-base focus-visible:ring-0 focus-visible:ring-offset-0 bg-white text-black"
            style={{ borderColor: name ? accentColor : undefined }}
          />
        </div>
      )}

      {/* Phone input */}
      {phoneEnabled && (
        <div className="space-y-2">
          <label htmlFor="order-phone" className="text-base font-semibold text-black">
            {t.yourPhone}: *
          </label>
          <Input
            id="order-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.phonePlaceholder}
            required
            readOnly={isPreview}
            className="h-12 border-2 border-gray-200 text-base focus-visible:ring-0 focus-visible:ring-offset-0 bg-white text-black"
            style={{ borderColor: phone ? accentColor : undefined }}
          />
        </div>
      )}

      {/* Address input */}
      {addressEnabled && (
        <div className="space-y-2">
          <label htmlFor="order-address" className="text-base font-semibold text-black">
            {t.yourAddress}: *
          </label>
          <Input
            id="order-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t.addressPlaceholder}
            required
            readOnly={isPreview}
            className="h-12 border-2 border-gray-200 text-base focus-visible:ring-0 focus-visible:ring-offset-0 bg-white text-black"
            style={{ borderColor: address ? accentColor : undefined }}
          />
        </div>
      )}

      {/* Comment */}
      <div className="space-y-2">
        <label htmlFor="order-comment" className="text-base font-semibold text-black">
          {t.comment}:
        </label>
        <Textarea
          id="order-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t.commentPlaceholder}
          rows={3}
          readOnly={isPreview}
          className="border-2 border-gray-200 resize-none text-base focus-visible:ring-0 focus-visible:ring-offset-0 bg-white text-black"
          style={{ borderColor: comment ? accentColor : undefined }}
        />
      </div>

      {/* Continue / Send button */}
      <button
        onClick={handleContinue}
        disabled={!canContinue || sending}
        className="w-full h-14 rounded-lg font-bold text-lg flex items-center justify-center gap-3 text-white active:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {!needsTableStep && showWhatsApp && (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
        {buttonLabel}
      </button>
    </div>
  );
}
