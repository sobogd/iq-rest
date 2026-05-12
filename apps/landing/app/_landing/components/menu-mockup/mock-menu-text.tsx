import { ArrowLeft } from "lucide-react";
import { PhoneFrame } from "./phone-frame";
import { AllergenIcon } from "./allergen-icon";
import { CATEGORIES, ITEMS, RESTAURANT, formatPrice } from "./data";
import { getMockI18n } from "./chrome-i18n";

interface Props {
  locale: string;
  className?: string;
}

export function MockMenuText({ locale, className }: Props) {
  const i18n = getMockI18n(locale);
  const accent = RESTAURANT.accentColor;
  const VISIBLE_CATEGORIES = ["c5", "c6"];
  const activeCategoryId = "c6";

  const groups = CATEGORIES
    .filter((c) => VISIBLE_CATEGORIES.includes(c.id))
    .map((c) => ({
      id: c.id,
      name: i18n.categories[c.id] ?? c.id,
      items: ITEMS.filter((it) => it.categoryId === c.id),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <PhoneFrame className={className}>
      <div className="h-full flex flex-col">
        <header
          className="shrink-0 flex flex-col justify-end px-5 z-10"
          style={{ minHeight: 56, backgroundColor: accent }}
        >
          <div className="h-14 max-w-[440px] w-full flex items-center relative mx-auto">
            <span className="p-2 -ml-2 text-white z-10" aria-label="Back">
              <ArrowLeft className="h-6 w-6" />
            </span>
            <h1 className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
              {i18n.chrome.onlineMenu.toLowerCase().replace(/^./, (c) => c.toUpperCase())}
            </h1>
          </div>
        </header>

        <div className="shrink-0 flex justify-center relative bg-white">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e5e7eb]" />
          <div className="flex gap-2 px-5 overflow-hidden max-w-[440px] w-full">
            {groups.map((g) => (
              <div
                key={g.id}
                className="relative px-4 py-3 text-sm font-semibold whitespace-nowrap shrink-0 min-h-[44px]"
                style={{ color: activeCategoryId === g.id ? "#000" : "#9ca3af" }}
              >
                {g.name}
                {activeCategoryId === g.id ? (
                  <span className="absolute left-0 right-0 h-1 bottom-0" style={{ backgroundColor: accent }} />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-white">
          <div className="flex justify-center px-0">
            <div className="max-w-[440px] w-full space-y-5 pt-6">
              {groups.map((g, gi) => (
                <div key={g.id} className="space-y-5">
                  {gi > 0 ? (
                    <h2 className="px-5 pt-8 pb-3">
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-wide border-b-2 border-gray-400 pb-1">
                        {g.name}
                      </span>
                    </h2>
                  ) : null}
                  {g.items.map((item) => {
                    const texts = i18n.items[item.id];
                    const name = texts?.name ?? item.id;
                    const description = texts?.description;
                    return (
                      <article key={item.id} className="px-5 pb-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-lg text-black flex-1">{name}</h3>
                          {item.price > 0 ? (
                            <span className="font-bold text-lg text-black whitespace-nowrap shrink-0">
                              {formatPrice(item.price, RESTAURANT.currency)}
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
                              >
                                <AllergenIcon code={code} className="w-4 h-4" />
                                <span>{i18n.allergens[code] ?? code}</span>
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
