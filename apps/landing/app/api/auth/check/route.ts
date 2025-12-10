import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const userEmail = cookieStore.get("user_email");

  const authenticated = !!(session?.value && userEmail?.value);

  return NextResponse.json({ authenticated });
}
