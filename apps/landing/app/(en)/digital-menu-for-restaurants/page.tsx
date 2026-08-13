import type { Metadata } from "next";
import { FeatureLandingTemplate } from "@/app/_landing/templates/feature-landing-template";
import { buildFeatureMetadata } from "@/app/_landing/templates/build-feature-metadata";
import type { LandingTexts } from "@/app/_landing/types";
import type { FeatureContent } from "@/app/_landing/templates/types";
import { restaurantCount } from "@/lib/restaurant-count";
import CHROME_JSON from "../texts.json";
import CONTENT_JSON from "./content.json";

export const dynamic = "force-static";
export const revalidate = false;

const CHROME = CHROME_JSON as unknown as LandingTexts;
const CONTENT = CONTENT_JSON as unknown as FeatureContent;

export const metadata: Metadata = buildFeatureMetadata(CONTENT);

export default function Page() {
  return <FeatureLandingTemplate content={CONTENT} chrome={CHROME} count={restaurantCount()} />;
}
