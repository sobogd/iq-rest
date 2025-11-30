import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email");

    if (!userEmail?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail.value },
      include: {
        companies: {
          include: { company: true },
          take: 1,
        },
      },
    });

    const company = user?.companies[0]?.company;

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    await prisma.company.update({
      where: { id: company.id },
      data: { paymentProcessing: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error setting payment processing:", error);
    return NextResponse.json(
      { error: "Failed to set payment processing" },
      { status: 500 }
    );
  }
}
