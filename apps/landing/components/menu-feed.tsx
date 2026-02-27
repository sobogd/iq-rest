"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { getAllergenIcon } from "@/lib/allergens";
import { formatPrice } from "@/lib/currencies";
import { MenuImage } from "./menu-image";
import { Link } from "@/i18n/routing";
import { loadCartClient, saveCartClient } from "@/lib/cart";

interface Item {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  allergens: string[];
}

interface Category {
  id: string;
  name: string;
  items: Item[];
}

interface MenuFeedProps {
  categories: Category[];
  accentColor?: string;
  currency?: string;
  allergenNames: Record<string, string>;
  slug?: string;
  ordersEnabled?: boolean;
  addLabel?: string;
  isPreview?: boolean;
  tableNumber?: string;
  initialCart?: Record<string, number>;
}

export function MenuFeed({ categories, accentColor, currency = "EUR", allergenNames, slug, ordersEnabled, addLabel, isPreview, tableNumber, initialCart }: MenuFeedProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const [loadedImageIndex, setLoadedImageIndex] = useState(0);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingToCategory = useRef(false);

  // Cart state (persisted in cookie, SSR-preloaded via initialCart)
  const [cart, setCart] = useState<Map<string, number>>(() =>
    initialCart ? new Map(Object.entries(initialCart).map(([k, v]) => [k, v])) : new Map()
  );

  useEffect(() => {
    const fresh = loadCartClient();
    if (fresh.size > 0) setCart(fresh);
  }, []);

  const totalItems = useMemo(() => {
    let count = 0;
    cart.forEach((qty) => { count += qty; });
    return count;
  }, [cart]);

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

  // Build ordered list of item IDs with images for concurrent loading
  const MAX_CONCURRENT = 4;
  const imageOrder = useMemo(() => {
    const order: string[] = [];
    for (const category of categories) {
      for (const item of category.items) {
        if (item.imageUrl) {
          order.push(item.id);
        }
      }
    }
    return order;
  }, [categories]);

  // Get index of an item in the loading queue
  const getImageIndex = (itemId: string) => imageOrder.indexOf(itemId);

  // Handle image loaded - advance the window for concurrent loading
  const handleImageLoaded = () => {
    setLoadedImageIndex((prev) => prev + 1);
  };

  // Scroll to category when clicking tab
  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    const container = containerRef.current;
    if (element && container) {
      isScrollingToCategory.current = true;
      setActiveCategory(categoryId);

      const containerTop = container.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const offset = elementTop - containerTop + container.scrollTop;

      container.scrollTo({
        top: offset,
        behavior: "smooth",
      });

      // Check when scroll stops
      let lastScrollTop = container.scrollTop;
      let checkCount = 0;
      const checkInterval = setInterval(() => {
        if (container.scrollTop === lastScrollTop) {
          checkCount++;
          if (checkCount >= 2) {
            isScrollingToCategory.current = false;
            clearInterval(checkInterval);
          }
        } else {
          checkCount = 0;
          lastScrollTop = container.scrollTop;
        }
      }, 100);

      // Fallback timeout
      setTimeout(() => {
        isScrollingToCategory.current = false;
        clearInterval(checkInterval);
      }, 5000);
    }
  };

  // Update active category via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingToCategory.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-category-section");
            if (id) setActiveCategory(id);
          }
        }
      },
      { root: container, rootMargin: "-10% 0px -80% 0px", threshold: 0 }
    );

    for (const category of categories) {
      const el = categoryRefs.current[category.id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [categories]);

  // Scroll active tab into view
  useEffect(() => {
    const activeTab = tabsRef.current?.querySelector(`[data-category="${activeCategory}"]`);
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeCategory]);

  const queryParams = new URLSearchParams();
  if (isPreview) queryParams.set("preview", "1");
  if (tableNumber) queryParams.set("table", tableNumber);
  const queryString = queryParams.toString();
  const previewParam = queryString ? `?${queryString}` : "";

  return (
    <>
      {/* Category tabs - fixed (hidden when single category) */}
      {categories.length > 1 && (
        <div
          className="shrink-0 flex justify-center relative"
          style={{ backgroundColor: "#fff" }}
        >
          {/* Gray border line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ backgroundColor: "#e5e7eb" }}
          />
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Menu categories"
            className="flex gap-2 px-5 overflow-x-auto hide-scrollbar max-w-[440px] w-full"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                role="tab"
                aria-selected={activeCategory === category.id}
                aria-controls={`category-${category.id}`}
                data-category={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="relative px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors shrink-0 min-h-[44px]"
                style={{
                  backgroundColor: "transparent",
                  color: activeCategory === category.id ? "#000" : "#9ca3af",
                }}
              >
                {category.name}
                {activeCategory === category.id && (
                  <span
                    className="absolute left-0 right-0 h-1"
                    style={{ backgroundColor: accentColor || "#000", bottom: "0" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Items feed - scrollable */}
      <div ref={containerRef} className="flex-1 overflow-auto min-h-0 hide-scrollbar" style={{ backgroundColor: "#fff" }}>
        <div className="flex justify-center px-0 min-[440px]:px-5">
          <div className={`max-w-[440px] w-full ${categories.length <= 1 ? "pt-5" : "pt-0 min-[440px]:pt-5"} pb-[60vh] space-y-5`}>
            {categories.map((category) => (
              <div
                key={category.id}
                id={`category-${category.id}`}
                role="tabpanel"
                ref={(el) => { categoryRefs.current[category.id] = el; }}
                data-category-section={category.id}
                className="space-y-5"
              >
                {categories.length > 1 && (
                  <h2 className="px-5 pt-8 pb-3">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wide border-b-2 border-gray-400 pb-1">
                      {category.name}
                    </span>
                  </h2>
                )}
                {category.items.map((item) => {
                  const qty = cart.get(item.id) || 0;
                  const imgIdx = item.imageUrl ? getImageIndex(item.id) : -1;
                  return (
                    <article key={item.id}>
                      {item.imageUrl && (
                        <MenuImage
                          src={item.imageUrl}
                          alt={item.name}
                          canLoad={imgIdx < loadedImageIndex + MAX_CONCURRENT}
                          onLoaded={handleImageLoaded}
                          priority={imgIdx === 0}
                        />
                      )}
                      <div className={item.imageUrl ? "p-5" : "px-5 pb-5"}>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-semibold text-lg text-black">{item.name}</h3>
                          {!ordersEnabled && (
                            <span className="font-bold text-lg shrink-0 text-black">
                              {formatPrice(Number(item.price), currency)}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">{item.description}</p>
                        )}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                            {item.allergens.map((code) => (
                              <span key={code} className="text-sm text-gray-500 inline-flex items-center gap-1">
                                <span className="text-xs" role="img" aria-label={allergenNames[code] || code}>{getAllergenIcon(code)}</span> {allergenNames[code] || code}
                              </span>
                            ))}
                          </div>
                        )}
                        {/* Price + Add to cart button */}
                        {ordersEnabled && (
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-bold text-lg text-black">
                              {formatPrice(Number(item.price), currency)}
                            </span>
                            {qty === 0 ? (
                              <button
                                onClick={() => addToCart(item.id)}
                                className="h-11 px-4 flex items-center justify-center gap-1.5 rounded-lg text-white text-sm font-semibold active:opacity-80"
                                style={{ backgroundColor: accentColor || "#000" }}
                              >
                                <Plus className="w-4 h-4" />
                                {addLabel}
                              </button>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="w-11 h-11 flex items-center justify-center rounded-lg border-2 border-gray-200 text-gray-600 active:bg-gray-100"
                                  aria-label={`Remove ${item.name}`}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-bold w-7 text-center text-black">{qty}</span>
                                <button
                                  onClick={() => addToCart(item.id)}
                                  className="w-11 h-11 flex items-center justify-center rounded-lg text-white active:opacity-80"
                                  style={{ backgroundColor: accentColor || "#000" }}
                                  aria-label={`Add ${item.name}`}
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating cart button — link to order page */}
      {ordersEnabled && totalItems > 0 && slug && (
        <Link
          href={`/m/${slug}/order${previewParam}`}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white active:opacity-80"
          style={{ backgroundColor: accentColor || "#000" }}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
            {totalItems}
          </span>
        </Link>
      )}

    </>
  );
}
