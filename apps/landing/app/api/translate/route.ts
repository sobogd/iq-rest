import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserCompanyId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();
    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text, targetLanguage, sourceLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: "Text and target language are required" },
        { status: 400 }
      );
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Check plan and free translations
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;
    const isUnlimited = isAdminEmail(userEmail);

    const [company, restaurant] = await Promise.all([
      prisma.company.findUnique({
        where: { id: companyId },
        select: { plan: true, subscriptionStatus: true },
      }),
      prisma.restaurant.findFirst({
        where: { companyId },
        select: { id: true, freeTranslationsLeft: true, translationsUsed: true },
      }),
    ]);

    if (!company || !restaurant) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const isActive = company.subscriptionStatus === "ACTIVE";
    const isPro = isUnlimited || (isActive && company.plan === "PRO");
    const isBasic = isActive && company.plan === "BASIC";
    const isPaidSubscriber = isPro || isBasic;

    if (!isPaidSubscriber && restaurant.freeTranslationsLeft <= 0) {
      return NextResponse.json(
        { error: "limit_reached" },
        { status: 403 }
      );
    }

    const BASIC_TRANSLATION_LIMIT = 100;
    if (isBasic) {
      if (restaurant.translationsUsed >= BASIC_TRANSLATION_LIMIT) {
        return NextResponse.json(
          { error: "limit_reached" },
          { status: 403 }
        );
      }
    }

    const languageNames: Record<string, string> = {
      en: "English",
      es: "Spanish",
      de: "German",
      fr: "French",
      it: "Italian",
      pt: "Portuguese",
      nl: "Dutch",
      pl: "Polish",
      ru: "Russian",
      uk: "Ukrainian",
      sv: "Swedish",
      da: "Danish",
      no: "Norwegian",
      fi: "Finnish",
      cs: "Czech",
      el: "Greek",
      tr: "Turkish",
      ro: "Romanian",
      hu: "Hungarian",
      bg: "Bulgarian",
      hr: "Croatian",
      sk: "Slovak",
      sl: "Slovenian",
      et: "Estonian",
      lv: "Latvian",
      lt: "Lithuanian",
      sr: "Serbian",
      ca: "Catalan",
      ga: "Irish",
      is: "Icelandic",
      fa: "Persian",
      ar: "Arabic",
      ja: "Japanese",
      ko: "Korean",
      zh: "Chinese",
    };

    const targetLangName = languageNames[targetLanguage] || targetLanguage;
    const sourceLangName = sourceLanguage ? (languageNames[sourceLanguage] || sourceLanguage) : "the source language";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the given text from ${sourceLangName} to ${targetLangName}. Only return the translated text, nothing else. Keep the same tone and style. If it's a menu item name or description, make it sound natural and appetizing in the target language.`,
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      return NextResponse.json(
        { error: "Translation failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const translatedText = data.choices[0]?.message?.content?.trim();

    if (!translatedText) {
      return NextResponse.json(
        { error: "No translation received" },
        { status: 500 }
      );
    }

    // Track usage
    let freeTranslationsLeft = restaurant.freeTranslationsLeft;
    if (!isPaidSubscriber) {
      // Free user: decrement trial counter
      const updated = await prisma.restaurant.update({
        where: { id: restaurant.id },
        data: { freeTranslationsLeft: { decrement: 1 } },
        select: { freeTranslationsLeft: true },
      });
      freeTranslationsLeft = updated.freeTranslationsLeft;
    } else if (!isPro) {
      // BASIC subscriber: increment monthly counter
      await prisma.restaurant.update({
        where: { id: restaurant.id },
        data: { translationsUsed: { increment: 1 } },
      });
    }

    return NextResponse.json({ translatedText, freeTranslationsLeft });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
