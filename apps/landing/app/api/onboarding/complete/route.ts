import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

export async function POST(request: Request) {
  const companyId = await getUserCompanyId();
  if (!companyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const categoryName = typeof body.categoryName === "string" ? body.categoryName.trim() : "";

  await prisma.company.updateMany({
    where: { id: companyId, onboardingStep: { lt: 3 } },
    data: { onboardingStep: 3 },
  });

  // Create default category if none exist and a name was provided
  if (categoryName) {
    const count = await prisma.category.count({ where: { companyId } });
    if (count === 0) {
      await prisma.category.create({
        data: { name: categoryName, companyId, sortOrder: 0, isActive: true },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
