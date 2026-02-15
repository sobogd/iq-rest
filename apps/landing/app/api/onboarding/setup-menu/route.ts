import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";
import { getMenuTemplate } from "@/lib/menu-templates";

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();
    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type } = await request.json();
    const template = getMenuTemplate(type);
    if (!template) {
      return NextResponse.json({ error: "Invalid restaurant type" }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      for (let catIndex = 0; catIndex < template.categories.length; catIndex++) {
        const cat = template.categories[catIndex];
        const category = await tx.category.create({
          data: {
            name: cat.name,
            sortOrder: catIndex,
            isActive: true,
            companyId,
          },
        });

        for (let itemIndex = 0; itemIndex < cat.items.length; itemIndex++) {
          const item = cat.items[itemIndex];
          await tx.item.create({
            data: {
              name: item.name,
              price: item.price,
              description: item.description || null,
              sortOrder: itemIndex,
              isActive: true,
              categoryId: category.id,
              companyId,
            },
          });
        }
      }

      // Mark onboarding step 2 complete (type done)
      await tx.company.update({
        where: { id: companyId },
        data: { onboardingStep: 2 },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error setting up menu:", error);
    return NextResponse.json(
      { error: "Failed to set up menu" },
      { status: 500 }
    );
  }
}
