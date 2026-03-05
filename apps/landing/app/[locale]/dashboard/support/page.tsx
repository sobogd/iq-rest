import { requireAuth } from "../_lib/require-auth";
import { getSupportMessages } from "../_lib/queries";
import { SupportPage } from "../_pages/support";

export default async function Page() {
  const companyId = await requireAuth();

  const messages = await getSupportMessages(companyId);

  return <SupportPage initialMessages={messages} />;
}
