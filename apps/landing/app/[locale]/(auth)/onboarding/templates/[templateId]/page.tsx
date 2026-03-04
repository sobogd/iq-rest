import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getOnboardingData } from "../../../_lib/onboarding-data";

const TEMPLATES = {
  restaurant: {
    categories: [
      { nameKey: "tplCatSalads", items: [{ nameKey: "tplItemCaesarSalad", price: 12 }, { nameKey: "tplItemGreekSalad", price: 11 }] },
      { nameKey: "tplCatMainDishes", items: [{ nameKey: "tplItemRibeyeSteak", price: 28 }, { nameKey: "tplItemSalmonFillet", price: 24 }] },
      { nameKey: "tplCatSideDishes", items: [{ nameKey: "tplItemFrenchFries", price: 6 }, { nameKey: "tplItemGrilledVegetables", price: 8 }] },
    ],
  },
  cafe: {
    categories: [
      { nameKey: "tplCatBreakfasts", items: [{ nameKey: "tplItemSalmonToast", price: 14 }, { nameKey: "tplItemPancakes", price: 10 }] },
      { nameKey: "tplCatCoffeeTea", items: [{ nameKey: "tplItemCappuccino", price: 5 }, { nameKey: "tplItemLatte", price: 5 }, { nameKey: "tplItemEarlGrey", price: 4 }] },
      { nameKey: "tplCatDesserts", items: [{ nameKey: "tplItemCheesecake", price: 9 }, { nameKey: "tplItemTiramisu", price: 10 }] },
    ],
  },
  bar: {
    categories: [
      { nameKey: "tplCatCocktails", items: [{ nameKey: "tplItemMargarita", price: 12 }, { nameKey: "tplItemMojito", price: 11 }, { nameKey: "tplItemOldFashioned", price: 14 }] },
      { nameKey: "tplCatBeer", items: [{ nameKey: "tplItemLager", price: 7 }, { nameKey: "tplItemIPA", price: 8 }, { nameKey: "tplItemStout", price: 8 }] },
      { nameKey: "tplCatBarSnacks", items: [{ nameKey: "tplItemNachos", price: 10 }, { nameKey: "tplItemCroutons", price: 7 }, { nameKey: "tplItemMixedNuts", price: 6 }] },
    ],
  },
} as const;

type TemplateId = keyof typeof TEMPLATES;

export default async function Page({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = await params;

  if (!(templateId in TEMPLATES)) redirect("/onboarding/menu");

  const data = await getOnboardingData();
  if (!data.isAuthenticated) redirect("/login?from=onboarding");
  if (data.onboardingStep >= 3) redirect("/dashboard");
  if (data.onboardingStep < 2) redirect("/onboarding/name");

  const template = TEMPLATES[templateId as TemplateId];
  const t = await getTranslations("dashboard.onboarding");

  // Create categories and items directly in DB
  for (let i = 0; i < template.categories.length; i++) {
    const cat = template.categories[i];
    const category = await prisma.category.create({
      data: {
        name: t(cat.nameKey as Parameters<typeof t>[0]),
        sortOrder: i,
        isActive: true,
        companyId: data.companyId!,
      },
    });

    const itemsData = cat.items.map((item, j) => ({
      name: t(item.nameKey as Parameters<typeof t>[0]),
      price: item.price,
      sortOrder: j,
      isActive: true,
      categoryId: category.id,
      companyId: data.companyId!,
    }));

    await prisma.item.createMany({ data: itemsData });
  }

  // Mark onboarding complete
  await prisma.company.update({
    where: { id: data.companyId! },
    data: { onboardingStep: 3 },
  });

  await prisma.restaurant.updateMany({
    where: { companyId: data.companyId! },
    data: { checklistMenuEdited: true },
  });

  redirect("/dashboard");
}
