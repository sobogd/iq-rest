import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

export async function POST() {
  const companyId = await getUserCompanyId();
  if (!companyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.company.updateMany({
    where: { id: companyId, onboardingStep: { lt: 3 } },
    data: { onboardingStep: 3 },
  });

  return NextResponse.json({ ok: true });
}
