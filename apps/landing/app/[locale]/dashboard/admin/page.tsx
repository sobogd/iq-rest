import { Suspense } from "react";
import { AdminPage } from "../_pages/admin";
import { PageLoader } from "../_ui/page-loader";

export default function Page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AdminPage />
    </Suspense>
  );
}
