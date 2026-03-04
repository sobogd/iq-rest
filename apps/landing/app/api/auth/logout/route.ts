import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
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

  return NextResponse.json({ ok: true });
}
