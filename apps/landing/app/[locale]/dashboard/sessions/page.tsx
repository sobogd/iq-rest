import { Suspense } from "react";
import { SessionsPage } from "../_pages/sessions";
import { PageLoader } from "../_ui/page-loader";

export default function Page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <SessionsPage />
    </Suspense>
  );
}
