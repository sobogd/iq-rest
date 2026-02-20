import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ exists: false }, { status: 400 });
  }

  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: { id: true },
  });

  if (!restaurant) {
    return NextResponse.json({ exists: false }, { status: 404 });
  }

  return NextResponse.json({ exists: true });
}
