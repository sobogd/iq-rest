import { createLazyFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SlidersHorizontal } from "lucide-react";
import { useMenu } from "../lib/menu-context";
import { MenuFeed } from "../components/menu-feed";
import { MenuHeader } from "../components/menu-header";
import { RouteSeo } from "../components/route-seo";
import { DietFilterSheet } from "../components/diet-filter-sheet";
import { DrillList } from "../components/drill-list";
import { tField } from "../lib/translations";

export const Route = createLazyFileRoute("/menu")({ component: MenuPage });

function MenuPage() {
  // Child routes (/menu/group/$id, /menu/cat/$id) are nested under /menu in
  // TanStack's file-based router (dot-separated filenames). When the URL hits
  // a child, render only the outlet so the child screen fully replaces this
  // index view.
  const loc = useLocation();
  const isIndex = loc.pathname === "/menu" || loc.pathname === "/menu/";
  if (!isIndex) return <Outlet />;
  return <MenuIndex />;
}

function MenuIndex() {
  const { restaurant, categories, items } = useMenu();
  const { t, i18n } = useTranslation();
  const label = t("publicMenu.onlineMenu");
  const [filterOpen, setFilterOpen] = useState(false);
  const [dietFilter, setDietFilter] = useState<string[]>([]);

  const lang = i18n.language;
  const layout = restaurant.menuLayout === "drill" ? "drill" : "flat";

  // A leaf category is "useful" only when it has at least one dish to show.
  const leavesWithItems = useMemo(() => {
    const ids = new Set<string>();
    for (const it of items) ids.add(it.categoryId);
    return new Set(categories.filter((c) => !c.isGroup && ids.has(c.id)).map((c) => c.id));
  }, [categories, items]);

  // Skip empty groups — a group is renderable only if it contains at least
  // one non-empty leaf category.
  const topGroups = useMemo(
    () =>
      categories.filter(
        (c) =>
          c.isGroup &&
          !c.parentId &&
          categories.some((ch) => ch.parentId === c.id && leavesWithItems.has(ch.id)),
      ),
    [categories, leavesWithItems],
  );
  const ungroupedLeaves = useMemo(
    () => categories.filter((c) => !c.isGroup && !c.parentId && leavesWithItems.has(c.id)),
    [categories, leavesWithItems],
  );

  // Set of diet codes actually used by ungrouped (top-level) dishes when the
  // top-level itself renders the feed (no groups + flat layout).
  const topLevelDietCodes = useMemo(() => {
    if (topGroups.length > 0) return [] as string[];
    const set = new Set<string>();
    const catIds = new Set(ungroupedLeaves.map((c) => c.id));
    for (const it of items) {
      if (!catIds.has(it.categoryId)) continue;
      for (const d of it.diets || []) set.add(d);
    }
    return Array.from(set);
  }, [items, ungroupedLeaves, topGroups]);

  // Diet filter button: only when a dish list renders here AND at least one
  // dish in that list has any diet tag.
  const showFilterHere =
    topGroups.length === 0 && layout === "flat" && topLevelDietCodes.length > 0;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${restaurant.title} — ${label}`,
    hasMenuSection: categories
      .filter((c) => !c.isGroup)
      .map((cat) => ({
        "@type": "MenuSection",
        name: tField(cat.name, cat.translations, "name", lang),
        hasMenuItem: items
          .filter((it) => it.categoryId === cat.id)
          .map((it) => ({
            "@type": "MenuItem",
            name: tField(it.name, it.translations, "name", lang),
            ...(it.description && {
              description: tField(it.description, it.translations, "description", lang),
            }),
            ...(it.imageUrl && { image: it.imageUrl }),
            offers: { "@type": "Offer", price: it.price, priceCurrency: restaurant.currency },
          })),
      })),
  };

  const hasAnything = topGroups.length > 0 || ungroupedLeaves.length > 0;

  function renderBody() {
    if (!hasAnything) {
      return (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400 px-4 text-center bg-white">
          {t("publicMenu.noCategories")}
        </div>
      );
    }

    // No groups configured — single-screen menu.
    if (topGroups.length === 0) {
      if (layout === "drill") {
        return <DrillList items={ungroupedLeaves} kind="cat" />;
      }
      return <MenuFeed dietFilter={dietFilter} categoryIds={ungroupedLeaves.map((c) => c.id)} />;
    }

    // Groups exist — show groups as drill rows. Ungrouped leaves stack below.
    // In flat mode, the trailing ungrouped block becomes a horizontal-tab feed;
    // in drill mode it stays as more drill rows.
    return (
      <div className="flex-1 overflow-auto min-h-0 hide-scrollbar bg-white flex flex-col">
        <DrillList items={topGroups} kind="group" embedded />
        {ungroupedLeaves.length > 0 ? (
          layout === "drill" ? (
            <DrillList items={ungroupedLeaves} kind="cat" embedded />
          ) : (
            <div className="border-t border-gray-100">
              <MenuFeed dietFilter={dietFilter} categoryIds={ungroupedLeaves.map((c) => c.id)} />
            </div>
          )
        ) : null}
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col">
      <RouteSeo routeLabel={label} jsonLd={jsonLd} />
      <MenuHeader
        title={label}
        accentColor={restaurant.accentColor}
        sticky
        right={
          showFilterHere ? (
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
      {renderBody()}
      <DietFilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        selected={dietFilter}
        accentColor={restaurant.accentColor}
        onApply={setDietFilter}
        availableCodes={topLevelDietCodes}
      />
    </div>
  );
}
