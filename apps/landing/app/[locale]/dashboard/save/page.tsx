import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";
import { getUserWithCompany } from "@/lib/auth";
import { isAnonymousEmail } from "@/lib/anonymous";
import { SaveMenuPage } from "../_pages/save-menu";

export default async function Page() {
  const auth = await getUserWithCompany();

  if (!auth) {
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }

  const cookieStore = await cookies();
  const currentEmail = cookieStore.get("user_email")?.value;

  if (!currentEmail || !isAnonymousEmail(currentEmail)) {
    redirect("/dashboard");
  }

  return <SaveMenuPage />;
}
