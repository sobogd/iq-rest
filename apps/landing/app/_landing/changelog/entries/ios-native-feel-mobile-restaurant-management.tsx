import type { LandingTexts } from "../../types";
import type { ChangelogTexts } from "../types";
import { BaseEntryLayout } from "../base-entry-layout";
import { findEntryMeta } from "../entries-meta";

interface Props {
  texts: ChangelogTexts;
  headerTexts: LandingTexts["header"];
  footerTexts: LandingTexts["footer"];
  locale: string;
}

const ENTRY_ID = "ios-native-feel-mobile-restaurant-management";

export function Entry(props: Props) {
  const meta = findEntryMeta(ENTRY_ID)!;
  const entry = props.texts.entries[ENTRY_ID];
  if (!entry) return null;
  return <BaseEntryLayout meta={meta} entry={entry} {...props} />;
}
