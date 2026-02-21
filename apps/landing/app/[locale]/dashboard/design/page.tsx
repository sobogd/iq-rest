import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getRestaurant, getSubscriptionStatus, checkIsAdmin } from "../_lib/queries";
import { DesignPage } from "../_pages/design";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const [restaurant, subscription, isAdmin] = await Promise.all([
    getRestaurant(companyId),
    getSubscriptionStatus(companyId),
    checkIsAdmin(),
  ]);

  return (
    <DesignPage
      initialRestaurant={restaurant}
      plan={subscription?.plan ?? "FREE"}
      isAdmin={isAdmin}
    />
  );
}
