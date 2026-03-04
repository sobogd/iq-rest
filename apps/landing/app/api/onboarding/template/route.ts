import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

const TEMPLATES = {
  restaurant: {
    categories: [
      { name: "tplCatSalads", items: [{ name: "tplItemCaesarSalad", price: 12 }, { name: "tplItemGreekSalad", price: 11 }] },
      { name: "tplCatMainDishes", items: [{ name: "tplItemRibeyeSteak", price: 28 }, { name: "tplItemSalmonFillet", price: 24 }] },
      { name: "tplCatSideDishes", items: [{ name: "tplItemFrenchFries", price: 6 }, { name: "tplItemGrilledVegetables", price: 8 }] },
    ],
  },
  cafe: {
    categories: [
      { name: "tplCatBreakfasts", items: [{ name: "tplItemSalmonToast", price: 14 }, { name: "tplItemPancakes", price: 10 }] },
      { name: "tplCatCoffeeTea", items: [{ name: "tplItemCappuccino", price: 5 }, { name: "tplItemLatte", price: 5 }, { name: "tplItemEarlGrey", price: 4 }] },
      { name: "tplCatDesserts", items: [{ name: "tplItemCheesecake", price: 9 }, { name: "tplItemTiramisu", price: 10 }] },
    ],
  },
  bar: {
    categories: [
      { name: "tplCatCocktails", items: [{ name: "tplItemMargarita", price: 12 }, { name: "tplItemMojito", price: 11 }, { name: "tplItemOldFashioned", price: 14 }] },
      { name: "tplCatBeer", items: [{ name: "tplItemLager", price: 7 }, { name: "tplItemIPA", price: 8 }, { name: "tplItemStout", price: 8 }] },
      { name: "tplCatBarSnacks", items: [{ name: "tplItemNachos", price: 10 }, { name: "tplItemCroutons", price: 7 }, { name: "tplItemMixedNuts", price: 6 }] },
    ],
  },
} as const;

type TemplateId = keyof typeof TEMPLATES;

export async function POST(request: NextRequest) {
  const companyId = await getUserCompanyId();
  if (!companyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { templateId, translations } = await request.json();

  if (!templateId || !(templateId in TEMPLATES)) {
    return NextResponse.json({ error: "Invalid template" }, { status: 400 });
  }

  const template = TEMPLATES[templateId as TemplateId];
  const names: Record<string, string> = translations || {};

  for (let i = 0; i < template.categories.length; i++) {
    const cat = template.categories[i];
    const category = await prisma.category.create({
      data: {
        name: names[cat.name] || cat.name,
        sortOrder: i,
        isActive: true,
        companyId,
      },
    });

    const itemsData = cat.items.map((item, j) => ({
      name: names[item.name] || item.name,
      price: item.price,
      sortOrder: j,
      isActive: true,
      categoryId: category.id,
      companyId,
    }));

    await prisma.item.createMany({ data: itemsData });
  }

  // Mark onboarding complete + checklist
  await prisma.company.updateMany({
    where: { id: companyId, onboardingStep: { lt: 3 } },
    data: { onboardingStep: 3 },
  });

  await prisma.restaurant.updateMany({
    where: { companyId },
    data: { checklistMenuEdited: true },
  });

  return NextResponse.json({ ok: true });
}
