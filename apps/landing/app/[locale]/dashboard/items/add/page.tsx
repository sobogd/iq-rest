import { ItemFormPage } from "../../_pages/item-form";

export default async function Page({ searchParams }: { searchParams: Promise<{ categoryId?: string }> }) {
  const { categoryId } = await searchParams;
  return <ItemFormPage initialCategoryId={categoryId} />;
}
