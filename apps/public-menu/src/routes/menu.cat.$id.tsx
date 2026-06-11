import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SlidersHorizontal } from "lucide-react";
import { useMenu } from "../lib/menu-context";
import { MenuHeader } from "../components/menu-header";
import { CategoryDishes } from "../components/category-dishes";
import { DietFilterSheet } from "../components/diet-filter-sheet";
import { tField } from "../lib/translations";
import { useForwardedSearch } from "../lib/forward-search";

export const Route = createFileRoute("/menu/cat/$id")({ component: CategoryPage });

function CategoryPage() {
  const { id } = Route.useParams();
  const { restaurant, categories, items } = useMenu();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const search = useForwardedSearch();

  const [filterOpen, setFilterOpen] = useState(false);
  const [dietFilter, setDietFilter] = useState<string[]>([]);

  const category = useMemo(
    () => categories.find((c) => c.id === id && !c.isGroup),
    [categories, id],
  );

  // Diet codes actually present on this category's dishes.
  const catDietCodes = useMemo(() => {
    const set = new Set<string>();
    for (const it of items) {
      if (it.categoryId !== id) continue;
      for (const d of it.diets || []) set.add(d);
    }
    return Array.from(set);
  }, [items, id]);
  const showFilter = catDietCodes.length > 0;

  if (!category) {
    navigate({ to: "/menu", search });
    return null;
  }

  const backTo = category.parentId ? `/menu/group/${category.parentId}` : "/menu";

  const name = tField(category.name, category.translations, "name", i18n.language);

  return (
    <div className="h-dvh flex flex-col">
      <MenuHeader
        title={name}
        accentColor={restaurant.accentColor}
        sticky
        backTo={backTo}
        right={showFilter ? (
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="relative p-2 -mr-2 text-white"
            aria-label={t("publicMenu.dietFilter.title", { defaultValue: "Filters" })}
          >
            <SlidersHorizontal className="h-5 w-5" />
            {dietFilter.length > 0 ? (
              <span
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-[10px] font-bold flex items-center justify-center"
                style={{ color: restaurant.accentColor || "#000" }}
              >
                {dietFilter.length}
              </span>
            ) : null}
          </button>
        ) : null}
      />

      <CategoryDishes category={category} dietFilter={dietFilter} />

      <DietFilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        selected={dietFilter}
        accentColor={restaurant.accentColor}
        onApply={setDietFilter}
        availableCodes={catDietCodes}
      />
    </div>
  );
}
