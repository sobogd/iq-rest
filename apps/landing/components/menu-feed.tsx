"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface Item {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
}

interface Category {
  id: string;
  name: string;
  items: Item[];
}

interface MenuFeedProps {
  categories: Category[];
  accentColor?: string;
}

export function MenuFeed({ categories, accentColor }: MenuFeedProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingToCategory = useRef(false);

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
      {/* Category tabs - fixed */}
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

      {/* Items feed - scrollable */}
      <div ref={containerRef} className="flex-1 overflow-auto min-h-0 hide-scrollbar" style={{ backgroundColor: "#fff" }}>
        <div className="flex justify-center px-0 min-[440px]:px-5">
          <div className="max-w-[440px] w-full pt-0 min-[440px]:pt-5 pb-[40vh] space-y-5">
            {categories.map((category) => (
              <div
                key={category.id}
                ref={(el) => { categoryRefs.current[category.id] = el; }}
                className="space-y-5"
              >
                {category.items.map((item) => (
                  <article key={item.id}>
                    {item.imageUrl && (
                      <div className="relative aspect-square w-full min-[440px]:rounded-lg overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="1000px"
                        />
                      </div>
                    )}
                    <div className="p-5 flex justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg text-black">{item.name}</h3>
                        {item.description && (
                          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        )}
                      </div>
                      <span className="font-bold text-lg shrink-0 text-black">
                        €{Number(item.price).toFixed(2)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
