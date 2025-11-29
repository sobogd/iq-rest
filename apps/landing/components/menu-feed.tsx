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
}

export function MenuFeed({ categories }: MenuFeedProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingToCategory = useRef(false);

  // Scroll to category when clicking tab
  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element && containerRef.current) {
      isScrollingToCategory.current = true;
      setActiveCategory(categoryId);

      const containerTop = containerRef.current.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const offset = elementTop - containerTop + containerRef.current.scrollTop;

      containerRef.current.scrollTo({
        top: offset,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrollingToCategory.current = false;
      }, 500);
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
        ref={tabsRef}
        className="flex gap-2 px-4 py-3 overflow-x-auto shrink-0 border-b hide-scrollbar"
        style={{
          backgroundColor: "#fff",
          borderColor: "#e5e7eb",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            data-category={category.id}
            onClick={() => scrollToCategory(category.id)}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shrink-0"
            style={{
              backgroundColor: activeCategory === category.id ? "#000" : "#f3f4f6",
              color: activeCategory === category.id ? "#fff" : "#000",
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Items feed - scrollable */}
      <div ref={containerRef} className="flex-1 overflow-auto min-h-0">
        <div className="p-6 space-y-6">
          {categories.map((category) => (
            <div
              key={category.id}
              ref={(el) => { categoryRefs.current[category.id] = el; }}
            >
              {/* Category header */}
              <h2 className="text-xl font-bold mb-4" style={{ color: "#000" }}>
                {category.name}
              </h2>

              {/* Items */}
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl overflow-hidden shadow-sm border"
                    style={{ borderColor: "#e5e7eb" }}
                  >
                    {item.imageUrl && (
                      <div className="relative aspect-square w-full">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    )}
                    <div className="p-5" style={{ backgroundColor: "#fff" }}>
                      <h3 className="font-semibold text-lg" style={{ color: "#000" }}>
                        {item.name}
                      </h3>
                      <span className="font-bold text-lg mt-1 block" style={{ color: "#000" }}>
                        €{Number(item.price).toFixed(2)}
                      </span>
                      {item.description && (
                        <p className="mt-2 text-sm" style={{ color: "#6b7280" }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
