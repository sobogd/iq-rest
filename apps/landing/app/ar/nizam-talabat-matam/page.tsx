import type { Metadata } from "next";
import { FeatureLandingTemplate } from "@/app/_landing/templates/feature-landing-template";
import { buildFeatureMetadata } from "@/app/_landing/templates/build-feature-metadata";
import { TEXTS as CHROME } from "../texts";
import { CONTENT } from "./content";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = buildFeatureMetadata(CONTENT);

export default function Page() {
  return <FeatureLandingTemplate content={CONTENT} chrome={CHROME} />;
}
