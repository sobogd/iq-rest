import { MetadataRoute } from "next";

// Same crawl policy for everyone, but AI search / answer engines are named
// explicitly so they clearly see they are welcome to index and cite the
// marketing pages (GEO — being quoted in ChatGPT, Perplexity, Google AI
// Overviews, Claude, etc.). Private surfaces stay disallowed for all.
const DISALLOW = ["/api/", "/*/dashboard/", "/*/m/", "/detect-lang", "/d/"];

// AI crawlers we explicitly welcome (search/answer + training). Listing them
// removes ambiguity now that several default to not indexing without an opt-in.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
  "cohere-ai",
  "DuckAssistBot",
  "YouBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_BOTS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: "https://iq-rest.com/sitemap.xml",
  };
}
