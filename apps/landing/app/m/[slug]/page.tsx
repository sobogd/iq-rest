import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

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

  console.log(`[MenuRedirect] slug: ${slug}, defaultLanguage: ${restaurant?.defaultLanguage}`);

  if (!restaurant) {
    notFound();
  }

  const locale = restaurant.defaultLanguage || "en";
  redirect(`/${locale}/m/${slug}`);
}
