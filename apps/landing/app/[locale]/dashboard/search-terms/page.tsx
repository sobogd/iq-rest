import { Suspense } from "react";
import { SearchTermsPage } from "../_pages/search-terms";
import { PageLoader } from "../_ui/page-loader";

export default function Page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <SearchTermsPage />
    </Suspense>
  );
}
