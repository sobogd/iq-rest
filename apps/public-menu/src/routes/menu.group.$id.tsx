import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SlidersHorizontal } from "lucide-react";
import { useMenu } from "../lib/menu-context";
import { MenuHeader } from "../components/menu-header";
import { MenuFeed } from "../components/menu-feed";
import { DrillList } from "../components/drill-list";
import { DietFilterSheet } from "../components/diet-filter-sheet";
import { tField } from "../lib/translations";
import { useForwardedSearch } from "../lib/forward-search";

export const Route = createFileRoute("/menu/group/$id")({ component: GroupPage });

function GroupPage() {
  const { id } = Route.useParams();
  const { restaurant, categories, items } = useMenu();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const search = useForwardedSearch();

  const [filterOpen, setFilterOpen] = useState(false);
  const [dietFilter, setDietFilter] = useState<string[]>([]);

  const group = useMemo(
    () => categories.find((c) => c.id === id && c.isGroup),
    [categories, id],
  );
  const childCats = useMemo(() => {
    const ids = new Set<string>();
    for (const it of items) ids.add(it.categoryId);
    return categories.filter((c) => c.parentId === id && !c.isGroup && ids.has(c.id));
  }, [categories, items, id]);

  if (!group) {
    navigate({ to: "/menu", search });
    return null;
  }

  const groupName = tField(group.name, group.translations, "name", i18n.language);
  const layout = restaurant.menuLayout === "drill" ? "drill" : "flat";

  // Diet codes actually used by dishes in this group's child categories.
  const groupDietCodes = useMemo(() => {
    const catIds = new Set(childCats.map((c) => c.id));
    const set = new Set<string>();
    for (const it of items) {
      if (!catIds.has(it.categoryId)) continue;
      for (const d of it.diets || []) set.add(d);
    }
    return Array.from(set);
  }, [items, childCats]);
  const showFilter = layout === "flat" && groupDietCodes.length > 0;

  return (
    <div className="h-dvh flex flex-col">
      <MenuHeader
        title={groupName}
        accentColor={restaurant.accentColor}
        sticky
        backTo="/menu"
        right={
          showFilter ? (
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
          ) : null
        }
      />

      {layout === "drill" ? (
        <DrillList items={childCats} kind="cat" />
      ) : (
        <MenuFeed dietFilter={dietFilter} categoryIds={childCats.map((c) => c.id)} />
      )}

      <DietFilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        selected={dietFilter}
        accentColor={restaurant.accentColor}
        onApply={setDietFilter}
        availableCodes={groupDietCodes}
      />
    </div>
  );
}
