"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { X } from "lucide-react";
import { getAllergenIcon, ALLERGENS } from "@/lib/allergens";
import { formatPrice } from "@/lib/currencies";
import { MenuImage } from "./menu-image";

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

interface AllergenTranslations {
  title: string;
  info: string;
  names: Record<string, string>;
}

interface MenuFeedProps {
  categories: Category[];
  accentColor?: string;
  currency?: string;
  allergenTranslations: AllergenTranslations;
}

export function MenuFeed({ categories, accentColor, currency = "EUR", allergenTranslations }: MenuFeedProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const [selectedAllergens, setSelectedAllergens] = useState<string[] | null>(null);
  const [loadedImageIndex, setLoadedImageIndex] = useState(0);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingToCategory = useRef(false);

  // Build ordered list of item IDs with images for sequential loading
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

  // Handle image loaded - allow next image to load
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

  // Update active category on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrollingToCategory.current) return;

      const containerTop = container.getBoundingClientRect().top;

      for (const category of categories) {
        const element = categoryRefs.current[category.id];
        if (element) {
          const rect = element.getBoundingClientRect();
          const relativeTop = rect.top - containerTop;

          if (relativeTop <= 100 && relativeTop + rect.height > 100) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [categories]);

  // Scroll active tab into view
  useEffect(() => {
    const activeTab = tabsRef.current?.querySelector(`[data-category="${activeCategory}"]`);
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeCategory]);

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
            className="flex gap-2 px-5 overflow-x-auto hide-scrollbar max-w-[440px] w-full"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                data-category={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="relative px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors shrink-0"
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
            {categories.map((category, index) => (
              <div
                key={category.id}
                ref={(el) => { categoryRefs.current[category.id] = el; }}
                className="space-y-5"
              >
                {categories.length > 1 && (
                  <h2 className="px-5 pt-8 pb-3">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wide border-b-2 border-gray-400 pb-1">
                      {category.name}
                    </span>
                  </h2>
                )}
                {category.items.map((item) => (
                  <article key={item.id}>
                    {item.imageUrl && (
                      <MenuImage
                        src={item.imageUrl}
                        alt={item.name}
                        canLoad={getImageIndex(item.id) <= loadedImageIndex}
                        onLoaded={handleImageLoaded}
                      />
                    )}
                    <div className={item.imageUrl ? "p-5" : "px-5 pb-5"}>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-semibold text-lg text-black">{item.name}</h3>
                        <span className="font-bold text-lg shrink-0 text-black">
                          {formatPrice(Number(item.price), currency)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">{item.description}</p>
                      )}
                      {item.allergens && item.allergens.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                          {item.allergens.map((code) => (
                            <span key={code} className="text-sm text-gray-500 inline-flex items-center gap-1">
                              <span className="text-xs" role="img" aria-label={allergenTranslations.names[code] || code}>{getAllergenIcon(code)}</span> {allergenTranslations.names[code] || code}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Allergens Modal */}
      {selectedAllergens && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={() => setSelectedAllergens(null)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative bg-white w-full max-w-[440px] rounded-t-2xl p-6 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-semibold text-black">
                {allergenTranslations.title}
              </h3>
              <button
                onClick={() => setSelectedAllergens(null)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {allergenTranslations.info}
            </p>
            <div className="flex flex-col gap-2">
              {selectedAllergens.map((code) => {
                const allergen = ALLERGENS.find((a) => a.code === code);
                return (
                  <div
                    key={code}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xl" role="img" aria-label={allergenTranslations.names[code] || code}>{allergen?.icon || "⚠️"}</span>
                    <span className="text-sm text-black">
                      {allergenTranslations.names[code] || code}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
