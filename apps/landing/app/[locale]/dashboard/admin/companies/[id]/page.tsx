import { AdminCompanyPage } from "../../../_pages/admin-company";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminCompanyPage companyId={id} />;
}
