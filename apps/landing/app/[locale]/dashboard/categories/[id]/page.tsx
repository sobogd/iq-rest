import { CategoryFormPage } from "../../_pages/category-form";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CategoryFormPage id={id} />;
}
