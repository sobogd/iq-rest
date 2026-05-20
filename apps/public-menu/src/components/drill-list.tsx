import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { tField } from "../lib/translations";
import { useForwardedSearch } from "../lib/forward-search";

interface DrillItem {
  id: string;
  name: string;
  translations: Record<string, { name?: string }> | null;
}

interface Props {
  items: DrillItem[];
  /** Which leaf-style route to navigate into when an item is tapped. */
  kind: "group" | "cat";
  emptyKey?: string;
  /** Optional sticky header (e.g. category-group name when nested). */
  prependHeading?: string | null;
  /**
   * When two DrillLists are stacked inside a shared scroller, this one
   * should not own its own flex-1/overflow — otherwise each list eats half
   * the screen and short lists get a huge empty gap.
   */
  embedded?: boolean;
}

/**
 * Vertical list of tappable cards used at every drill level.
 * Each row is a full-width card; the whole row is the hit-target.
 */
export function DrillList({ items, kind, emptyKey, prependHeading, embedded }: Props) {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const search = useForwardedSearch();
  const lang = i18n.language;

  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-400 px-4 text-center">
        {t(emptyKey || "publicMenu.noCategories")}
      </div>
    );
  }

  return (
    <div
      className={
        embedded
          ? "bg-white"
          : "flex-1 overflow-auto min-h-0 hide-scrollbar bg-white"
      }
    >
      {prependHeading ? (
        <div className="flex justify-center px-[8%]">
          <h2 className="max-w-[440px] w-full pt-5 pb-2 text-sm font-bold text-gray-400 uppercase tracking-wide">
            {prependHeading}
          </h2>
        </div>
      ) : null}
      {items.map((it) => {
        const name = tField(it.name, it.translations, "name", lang);
        return (
          <button
            key={it.id}
            type="button"
            onClick={() =>
              navigate({
                to: kind === "group" ? "/menu/group/$id" : "/menu/cat/$id",
                params: { id: it.id },
                search,
              })
            }
            className="w-full border-t border-gray-300/25 flex justify-center px-[8%]"
          >
            <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
              <span
                className="flex-1 min-w-0 text-left leading-tight"
                style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
              >
                {name}
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
            </span>
          </button>
        );
      })}
    </div>
  );
}
