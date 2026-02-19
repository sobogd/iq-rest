import { Suspense } from "react";
import { KeywordsPage } from "../_pages/keywords";
import { PageLoader } from "../_ui/page-loader";

export default function Page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <KeywordsPage />
    </Suspense>
  );
}
