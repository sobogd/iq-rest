import { requireAuth } from "../_lib/require-auth";
import { getRestaurant, getTables } from "../_lib/queries";
import { QrMenuPage } from "../_pages/qr-menu";

export default async function Page() {
  const companyId = await requireAuth();

  const [restaurant, tables] = await Promise.all([
    getRestaurant(companyId),
    getTables(companyId),
  ]);

  const tableNumbers = tables
    .filter((t) => t.isActive)
    .sort((a, b) => a.number - b.number)
    .map((t) => t.number);

  return <QrMenuPage initialSlug={restaurant?.slug ?? null} tableNumbers={tableNumbers} />;
}
