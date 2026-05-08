import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashSessionToken } from "@/lib/session-utils";

export async function POST() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email")?.value;
  const sessionCookie = cookieStore.get("session")?.value;

  if (sessionCookie) {
    const tokenHash = hashSessionToken(sessionCookie);
    await prisma.session
      .deleteMany({ where: { tokenHash } })
      .catch((err) => console.error("Logout session row error:", err));
    if (userEmail) {
      // Legacy compat: only clear User.sessionToken if it matches the cookie
      // we're logging out (otherwise we'd kick a different device of the same
      // user that's still logged in via the legacy column).
      await prisma.user
        .updateMany({
          where: { email: userEmail, sessionToken: tokenHash },
          data: { sessionToken: null },
        })
        .catch((err) => console.error("Logout legacy clear error:", err));
    }
  }

  cookieStore.delete("session");
  cookieStore.delete("user_email");
  cookieStore.delete("user_id");
  cookieStore.delete("dashboard-active-page");

  return NextResponse.json({ ok: true });
}
