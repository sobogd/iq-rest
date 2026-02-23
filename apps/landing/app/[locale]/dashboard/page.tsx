import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getItems, getCategories, getRestaurant, getChecklistStatus, getScanUsage, checkIsAdmin } from "./_lib/queries";
import { MenuPage } from "./_pages/menu";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const [items, categories, restaurant, checklist, scanUsage, isAdmin] = await Promise.all([
    getItems(companyId),
    getCategories(companyId),
    getRestaurant(companyId),
    getChecklistStatus(companyId),
    getScanUsage(companyId),
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
      scanUsage={scanUsage}
      isAdmin={isAdmin}
    />
  );
}
