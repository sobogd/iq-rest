import { NextResponse } from "next/server";
import { getUserCompanyId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const companyId = await getUserCompanyId();
  if (!companyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.company.update({
    where: { id: companyId },
    data: { upsellShownAt: new Date() },
  });

  return NextResponse.json({ success: true });
}
