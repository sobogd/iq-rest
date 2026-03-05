import { requireAuth } from "./_lib/require-auth";
import { getItems, getCategories, getRestaurant, getChecklistStatus, checkIsAdmin } from "./_lib/queries";
import { MenuPage } from "./_pages/menu";

export default async function Page() {
  const companyId = await requireAuth();

  const [items, categories, restaurant, checklist, isAdmin] = await Promise.all([
    getItems(companyId),
    getCategories(companyId),
    getRestaurant(companyId),
    getChecklistStatus(companyId),
    checkIsAdmin(),
  ]);

  return (
    <MenuPage
      initialItems={items}
      initialCategories={categories}
      initialCurrency={restaurant?.currency ?? "EUR"}
      restaurantName={restaurant?.title ?? ""}
      slug={restaurant?.slug ?? null}
      checklist={checklist}
      isAdmin={isAdmin}
      showOrders={!!restaurant?.ordersEnabled && (restaurant.orderMode === "internal" || restaurant.orderMode === "both")}
    />
  );
}
