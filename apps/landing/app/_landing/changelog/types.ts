// Strongly-typed shape of one changelog entry's localized content.
// Stored per-locale in app/<locale>/changelog/texts.ts as Record<entryId, ChangelogEntryTexts>.

export type ChangelogEntrySection = {
  title: string;
  body: string; // 2–4 sentences, ~80–120 words
};

export type ChangelogEntryTexts = {
  meta: {
    title: string; // up to ~60 chars
    description: string; // up to ~160 chars
  };
  title: string;
  subtitle: string; // short description shown on list card and at top of entry
  intro: string; // 1 paragraph, ~80 words
  sections: ChangelogEntrySection[]; // 3–4 sections recommended
  benefitsTitle: string;
  benefits: string[]; // 5–7 bullets
  conclusionTitle: string;
  conclusionBody: string;
  ctaText: string; // sentence above the CTA button
  ctaButton: string; // button label
};

export type ChangelogTexts = {
  meta: {
    title: string;
    description: string;
  };
  pageTitle: string;
  pageSubtitle: string;
  readMore: string;
  backToList: string;
  publishedOn: string; // "Published on" prefix
  entries: Record<string, ChangelogEntryTexts>;
};
