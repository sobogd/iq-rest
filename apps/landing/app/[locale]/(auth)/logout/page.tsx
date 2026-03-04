import { cookies } from "next/headers";
import { redirect } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";

export default async function LogoutPage() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email")?.value;

  if (userEmail) {
    await prisma.user
      .update({
        where: { email: userEmail },
        data: { sessionToken: null },
      })
      .catch((err) => console.error("Logout DB error:", err));
  }

  cookieStore.delete("session");
  cookieStore.delete("user_email");
  cookieStore.delete("user_id");
  cookieStore.delete("dashboard-active-page");

  redirect("/login");
}
