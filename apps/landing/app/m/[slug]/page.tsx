import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function MenuRedirect({ params }: PageProps) {
  const { slug } = await params;

  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: { defaultLanguage: true },
  });

  if (!restaurant) {
    notFound();
  }

  const locale = restaurant.defaultLanguage || "en";
  redirect(`/${locale}/m/${slug}`);
}
