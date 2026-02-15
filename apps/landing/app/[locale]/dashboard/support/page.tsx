import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getSupportMessages } from "../_lib/queries";
import { SupportPage } from "../_pages/support";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const messages = await getSupportMessages(companyId);

  return <SupportPage initialMessages={messages} />;
}
