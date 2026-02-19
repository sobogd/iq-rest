import { GoogleAdsKeywordDetailPage } from "../../../_pages/google-ads-keyword-detail";

function decodeResourceName(encoded: string): string {
  // Restore base64 padding and URL-safe chars
  let b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  return atob(b64);
}

export default async function Page({
  params,
}: {
  params: Promise<{ resourceName: string }>;
}) {
  const { resourceName } = await params;
  const decoded = decodeResourceName(resourceName);
  return <GoogleAdsKeywordDetailPage resourceName={decoded} />;
}
