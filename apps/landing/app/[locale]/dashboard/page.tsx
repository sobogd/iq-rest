import { requireAuth } from "./_lib/require-auth";
import { getItems, getCategories, getRestaurant } from "./_lib/queries";
import { MenuPage } from "./_pages/menu";

export default async function Page() {
  const companyId = await requireAuth();

  const [items, categories, restaurant] = await Promise.all([
    getItems(companyId),
    getCategories(companyId),
    getRestaurant(companyId),
  ]);

  // Orphaned items (category deleted → categoryId null) are managed in the new
  // dashboard's "No category" bucket. The legacy dashboard groups strictly by
  // category, so exclude them here rather than render a stray "null" group.
  type RawItem = (typeof items)[number];
  const menuItems = items.filter(
    (i): i is RawItem & { categoryId: string; category: NonNullable<RawItem["category"]> } =>
      i.categoryId !== null && i.category !== null,
  );

  return (
    <MenuPage
      initialItems={menuItems}
      initialCategories={categories}
      initialCurrency={restaurant?.currency ?? "EUR"}
      restaurantName={restaurant?.title ?? ""}
      slug={restaurant?.slug ?? null}
    />
  );
}
