import { requireAuth } from "../_lib/require-auth";
import { getTables } from "../_lib/queries";
import { TablesPage } from "../_pages/tables";

export default async function Page() {
  const companyId = await requireAuth();

  const tables = await getTables(companyId);

  return <TablesPage initialTables={tables} />;
}
