import { GoogleAdsKeywordDetailPage } from "../../../_pages/google-ads-keyword-detail";

function decodeResourceName(encoded: string): string {
  let b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  return atob(b64);
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ resourceName: string }>;
  searchParams: Promise<{ kw?: string }>;
}) {
  const { resourceName } = await params;
  const { kw } = await searchParams;
  const decoded = decodeResourceName(resourceName);

  return <GoogleAdsKeywordDetailPage resourceName={decoded} keyword={kw || "Keyword"} />;
}
