import { useMemo } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useMenu } from "../lib/menu-context";
import { useCart } from "../lib/cart";
import { tField } from "../lib/translations";
import { formatPrice } from "../lib/currencies";
import { AllergenIcon } from "./allergen-icon";
import { DietIcon } from "./diet-icon";
import { MenuImage } from "./menu-image";
import { useForwardedSearch } from "../lib/forward-search";
import type { CategoryPayload } from "../lib/types";

interface Props {
  category: CategoryPayload;
  dietFilter?: string[];
}

/**
 * Vertical list of dishes for a single category. No horizontal category tabs
 * (this is the leaf "drill" screen). Layout mirrors menu-feed.tsx's dish rows.
 */
export function CategoryDishes({ category, dietFilter = [] }: Props) {
  const { restaurant, items } = useMenu();
  const { i18n, t } = useTranslation();
  const { cart, add, remove, totalQty } = useCart();
  const accent = restaurant.accentColor || "#000";
  const ordersEnabled = restaurant.ordersEnabled;
  const lang = i18n.language;
  const cartSearch = useForwardedSearch();

  const filteredDishes = useMemo(() => {
    return items.filter((it) => {
      if (it.categoryId !== category.id) return false;
      if (dietFilter.length === 0) return true;
      const diets = it.diets || [];
      return dietFilter.every((d) => diets.includes(d));
    });
  }, [items, category.id, dietFilter]);

  if (filteredDishes.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-400 px-4 text-center bg-white">
        {dietFilter.length > 0
          ? t("publicMenu.dietFilter.empty", { defaultValue: "No dishes match the selected filters." })
          : t("publicMenu.noCategories")}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto min-h-0 hide-scrollbar bg-white">
      <div className="flex justify-center px-0 min-[440px]:px-5">
        <div
          className={
            "max-w-[440px] w-full pb-[20vh] space-y-5 " +
            (filteredDishes[0]?.imageUrl ? "" : "pt-5")
          }
        >
          {filteredDishes.map((item, ii) => {
            const qty = cart[item.id] || 0;
            const name = tField(item.name, item.translations, "name", lang);
            const description = tField(item.description, item.translations, "description", lang);
            return (
              <article key={item.id}>
                {item.imageUrl ? (
                  <MenuImage src={item.imageUrl} alt={name} priority={ii === 0} />
                ) : null}
                <div className={item.imageUrl ? "p-5" : "px-5 pb-5"}>
                  {item.diets?.length ? (
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {item.diets.map((code) => (
                        <DietIcon
                          key={code}
                          code={code}
                          className="w-[18px] h-[18px]"
                          style={{ color: accent }}
                          aria-label={t(`publicMenu.dietNames.${code}`, { defaultValue: code })}
                        />
                      ))}
                    </div>
                  ) : null}
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-semibold text-lg text-black flex-1 min-w-0">
                      {name}
                    </h3>
                    {!ordersEnabled && Number(item.price) > 0 ? (
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
                          <AllergenIcon code={code} className="w-4 h-4 shrink-0" />
                          <span className="leading-none">
                            {t(`publicMenu.allergenNames.${code}`, { defaultValue: code })}
                          </span>
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {ordersEnabled ? (
                    <div className="mt-3 flex items-center justify-between">
                      {Number(item.price) > 0 ? (
                        <span className="font-bold text-lg text-black">
                          {formatPrice(item.price, restaurant.currency)}
                        </span>
                      ) : (
                        <span />
                      )}
                      {qty === 0 ? (
                        <button
                          data-testid="pm-dish-add"
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
      </div>

      {ordersEnabled && totalQty > 0 ? (
        <Link
          to="/order"
          search={cartSearch}
          data-testid="pm-cart"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-xl shadow-lg flex items-center justify-center text-white active:opacity-80"
          style={{ backgroundColor: accent }}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
            {totalQty}
          </span>
        </Link>
      ) : null}
    </div>
  );
}
