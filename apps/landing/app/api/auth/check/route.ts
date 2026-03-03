import { NextResponse } from "next/server";
import { getUserCompanyId } from "@/lib/auth";

export async function GET() {
  const companyId = await getUserCompanyId();
  return NextResponse.json({ authenticated: !!companyId });
}
