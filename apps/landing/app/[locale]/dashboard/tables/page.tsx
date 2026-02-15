import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getTables } from "../_lib/queries";
import { TablesPage } from "../_pages/tables";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const tables = await getTables(companyId);

  return <TablesPage initialTables={tables} />;
}
