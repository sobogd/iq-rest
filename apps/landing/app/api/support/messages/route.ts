import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserWithCompany } from "@/lib/auth";

export async function GET() {
  try {
    const userCompany = await getUserWithCompany();

    if (!userCompany) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await prisma.supportMessage.findMany({
      where: { companyId: userCompany.companyId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        message: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching support messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userCompany = await getUserWithCompany();

    if (!userCompany) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await request.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message is too long (max 2000 characters)" },
        { status: 400 }
      );
    }

    const supportMessage = await prisma.supportMessage.create({
      data: {
        message: message.trim(),
        companyId: userCompany.companyId,
        userId: userCompany.userId,
        isAdmin: false,
      },
      select: {
        id: true,
        message: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    return NextResponse.json(supportMessage, { status: 201 });
  } catch (error) {
    console.error("Error creating support message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
