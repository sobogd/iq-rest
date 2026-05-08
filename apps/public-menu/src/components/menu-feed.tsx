import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useMenu } from "../lib/menu-context";
import { useCart } from "../lib/cart";
import { tField } from "../lib/translations";
import { formatPrice } from "../lib/currencies";
import { AllergenIcon } from "./allergen-icon";
import { MenuImage } from "./menu-image";

export function MenuFeed() {
  const { restaurant, categories, items } = useMenu();
  const { i18n, t } = useTranslation();
  const { cart, add, remove, totalQty } = useCart();
  const accent = restaurant.accentColor || "#000";
  const ordersEnabled = restaurant.ordersEnabled;
  const lang = i18n.language;

  // Group items by category — bucket once, then map each cat in O(1).
  const groups = useMemo(() => {
    const byCat = new Map<string, typeof items>();
    for (const it of items) {
      const arr = byCat.get(it.categoryId);
      if (arr) arr.push(it);
      else byCat.set(it.categoryId, [it]);
    }
    return categories.map((c) => ({
      id: c.id,
      name: tField(c.name, c.translations, "name", lang),
      items: byCat.get(c.id) ?? [],
    }));
  }, [categories, items, lang]);

  const [activeCategory, setActiveCategory] = useState(groups[0]?.id ?? "");
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const programmatic = useRef(false);

  const scrollTo = useCallback((id: string) => {
    const el = refs.current[id];
    const c = containerRef.current;
    if (!el || !c) return;
    programmatic.current = true;
    setActiveCategory(id);
    const top = el.getBoundingClientRect().top - c.getBoundingClientRect().top + c.scrollTop;
    c.scrollTo({ top, behavior: "smooth" });
    // `scrollend` fires when the smooth-scroll animation finishes (Chrome 114+,
    // Firefox 109+, Safari 18.2+). Safety timeout for older browsers.
    const release = () => {
      programmatic.current = false;
      c.removeEventListener("scrollend", release);
      clearTimeout(safety);
    };
    const safety = setTimeout(release, 1500);
    c.addEventListener("scrollend", release, { once: true });
  }, []);

  // Intersection observer to update active tab on scroll.
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (programmatic.current) return;
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("data-cat");
            if (id) setActiveCategory(id);
          }
        }
      },
      { root: c, rootMargin: "-10% 0px -80% 0px", threshold: 0 },
    );
    for (const g of groups) {
      const el = refs.current[g.id];
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [groups]);

  // Scroll active tab into view.
  useEffect(() => {
    const tab = tabsRef.current?.querySelector(`[data-cat="${activeCategory}"]`);
    if (tab) (tab as HTMLElement).scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeCategory]);

  if (groups.length === 0 || items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-400 px-4 text-center">
        {t("publicMenu.noCategories")}
      </div>
    );
  }

  const params = new URLSearchParams(window.location.search);
  const isPreview = params.get("preview") === "1";
  const tableNumber = params.get("table");

  return (
    <>
      {groups.length > 1 ? (
        <div className="shrink-0 flex justify-center relative" style={{ backgroundColor: "#fff" }}>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: "#e5e7eb" }} />
          <div
            ref={tabsRef}
            role="tablist"
            className="flex gap-2 px-5 overflow-x-auto hide-scrollbar max-w-[440px] w-full"
          >
            {groups.map((g) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={activeCategory === g.id}
                data-cat={g.id}
                onClick={() => scrollTo(g.id)}
                className="relative px-4 py-3 text-sm font-semibold whitespace-nowrap shrink-0 min-h-[44px]"
                style={{
                  backgroundColor: "transparent",
                  color: activeCategory === g.id ? "#000" : "#9ca3af",
                }}
              >
                {g.name}
                {activeCategory === g.id ? (
                  <span className="absolute left-0 right-0 h-1" style={{ backgroundColor: accent, bottom: 0 }} />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div
        ref={containerRef}
        className="flex-1 overflow-auto min-h-0 hide-scrollbar"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="flex justify-center px-0 min-[440px]:px-5">
          <div
            className={
              "max-w-[440px] w-full space-y-5 " +
              (groups.length <= 1 ? "pt-5" : "pt-0 min-[440px]:pt-5") +
              " " +
              (groups.length > 1 ? "pb-[60vh]" : "pb-5")
            }
          >
            {groups.map((g, gi) => (
              <div
                key={g.id}
                ref={(el) => {
                  refs.current[g.id] = el;
                }}
                data-cat={g.id}
                className="space-y-5"
              >
                {groups.length > 1 ? (
                  <h2 className="px-5 pt-8 pb-3">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wide border-b-2 border-gray-400 pb-1">
                      {g.name}
                    </span>
                  </h2>
                ) : null}
                {g.items.map((item, ii) => {
                  const qty = cart[item.id] || 0;
                  const name = tField(item.name, item.translations, "name", lang);
                  const description = tField(item.description, item.translations, "description", lang);
                  return (
                    <article key={item.id}>
                      {item.imageUrl ? (
                        <MenuImage src={item.imageUrl} alt={name} priority={gi === 0 && ii === 0} />
                      ) : null}
                      <div className={item.imageUrl ? "p-5" : "px-5 pb-5"}>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-semibold text-lg text-black">{name}</h3>
                          {!ordersEnabled ? (
                            <span className="font-bold text-lg shrink-0 text-black">
                              {formatPrice(item.price, restaurant.currency)}
                            </span>
                          ) : null}
                        </div>
                        {description ? (
                          <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">{description}</p>
                        ) : null}
                        {item.allergens?.length ? (
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                            {item.allergens.map((code) => (
                              <span
                                key={code}
                                className="text-sm text-gray-500 inline-flex items-center gap-1"
                                title={t(`publicMenu.allergenNames.${code}`, { defaultValue: code })}
                              >
                                <AllergenIcon code={code} className="w-4 h-4" />
                                <span>
                                  {t(`publicMenu.allergenNames.${code}`, { defaultValue: code })}
                                </span>
                              </span>
                            ))}
                          </div>
                        ) : null}
                        {ordersEnabled ? (
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-bold text-lg text-black">
                              {formatPrice(item.price, restaurant.currency)}
                            </span>
                            {qty === 0 ? (
                              <button
                                onClick={() => add(item.id)}
                                className="h-11 px-4 flex items-center justify-center gap-1.5 rounded-lg text-white text-sm font-semibold active:opacity-80"
                                style={{ backgroundColor: accent }}
                              >
                                <Plus className="w-4 h-4" />
                                {t("publicMenu.order.add", { defaultValue: "Add" })}
                              </button>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => remove(item.id)}
                                  className="w-11 h-11 flex items-center justify-center rounded-lg border-2 border-gray-200 text-gray-600 active:bg-gray-100"
                                  aria-label={`Remove ${name}`}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-bold w-7 text-center text-black">{qty}</span>
                                <button
                                  onClick={() => add(item.id)}
                                  className="w-11 h-11 flex items-center justify-center rounded-lg text-white active:opacity-80"
                                  style={{ backgroundColor: accent }}
                                  aria-label={`Add ${name}`}
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {ordersEnabled && totalQty > 0 ? (
        <Link
          to="/order"
          search={{ ...(isPreview ? { preview: "1" } : {}), ...(tableNumber ? { table: tableNumber } : {}) }}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-xl shadow-lg flex items-center justify-center text-white active:opacity-80"
          style={{ backgroundColor: accent }}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
            {totalQty}
          </span>
        </Link>
      ) : null}
    </>
  );
}
