import { ArrowLeft, Plus } from "lucide-react";
import Image from "next/image";
import { PhoneFrame } from "./phone-frame";
import { AllergenIcon } from "./allergen-icon";
import { CATEGORIES, ITEMS, RESTAURANT, formatPrice } from "./data";
import { getMockI18n } from "./chrome-i18n";

interface Props {
  locale: string;
  className?: string;
}

export function MockMenu({ locale, className }: Props) {
  const i18n = getMockI18n(locale);
  const accent = RESTAURANT.accentColor;
  const activeCategoryId = CATEGORIES[0]?.id;

  const groups = CATEGORIES.map((c) => ({
    id: c.id,
    name: i18n.categories[c.id] ?? c.id,
    items: ITEMS.filter((it) => it.categoryId === c.id),
  })).filter((g) => g.items.length > 0);

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
            <div className="max-w-[440px] w-full space-y-5 pt-0">
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
                      <article key={item.id}>
                        {item.imageUrl ? (
                          <div className="relative w-full aspect-square overflow-hidden">
                            <Image
                              src={item.imageUrl}
                              alt={name}
                              fill
                              sizes="440px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : null}
                        <div className={item.imageUrl ? "p-5" : "px-5 pb-5"}>
                          <h3 className="font-semibold text-lg text-black">{name}</h3>
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
                          <div className="mt-3 flex items-center justify-between">
                            {item.price > 0 ? (
                              <span className="font-bold text-lg text-black">
                                {formatPrice(item.price, RESTAURANT.currency)}
                              </span>
                            ) : (
                              <span />
                            )}
                            <span
                              className="h-11 px-4 flex items-center justify-center gap-1.5 rounded-lg text-white text-sm font-semibold"
                              style={{ backgroundColor: accent }}
                            >
                              <Plus className="w-4 h-4" />
                              {i18n.chrome.add}
                            </span>
                          </div>
                        </div>
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
