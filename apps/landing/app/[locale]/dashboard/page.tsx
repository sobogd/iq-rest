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

  return (
    <MenuPage
      initialItems={items}
      initialCategories={categories}
      initialCurrency={restaurant?.currency ?? "EUR"}
      restaurantName={restaurant?.title ?? ""}
      slug={restaurant?.slug ?? null}
    />
  );
}
