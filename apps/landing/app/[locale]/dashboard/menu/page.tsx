import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getItems, getCategories, getRestaurant } from "../_lib/queries";
import { MenuPage } from "../_pages/menu";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

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
      checklistMenuEdited={restaurant?.checklistMenuEdited ?? false}
    />
  );
}
