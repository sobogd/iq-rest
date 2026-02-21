import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getSubscriptionStatus, checkIsAdmin } from "../_lib/queries";
import { UpgradePage } from "../_pages/upgrade";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const [subscription, isAdmin] = await Promise.all([
    getSubscriptionStatus(companyId),
    checkIsAdmin(),
  ]);

  return <UpgradePage initialSubscription={subscription} isAdmin={isAdmin} />;
}
