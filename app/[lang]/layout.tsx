import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, localePath, locales } from "@/lib/i18n";
import { SITE_ORIGIN } from "@/lib/site";
import { getDictionary } from "./dictionaries";
import { caveat, figtree, nunito } from "./fonts";
import "@/components/site/base.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// No dynamicParams = false here: app/[lang]/[...missing] answers addresses no page was built for. A locale that isn't
// one of ours never gets this far (proxy.ts sends it to English) and RootLayout below calls notFound() for it anyway.

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL(SITE_ORIGIN),
    alternates: {
      canonical: localePath(lang),
      languages: Object.fromEntries(locales.map((locale) => [locale, localePath(locale)]))
    },
    // A locale still in draft (or not yet translated) stays out of search until a native speaker has reviewed it.
    robots: dict.status !== "translated" ? { index: false, follow: true } : undefined,
    // The share image (public/og/): the logo and headline beside the friends in their Polaroid, 1200×630, one per language.
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      type: "website",
      // The name as written in a sentence, not the lowercase wordmark. No url: pages that inherit this (the privacy
      // policy, the 404) would otherwise all claim the home page's address.
      siteName: "Life in Photos",
      locale: lang === "zh-Hant" ? "zh_TW" : "en_US",
      images: [{ url: `/og/${lang}.jpg`, width: 1200, height: 630, alt: dict.meta.ogImageAlt }]
    },
    twitter: { card: "summary_large_image" }
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${nunito.variable} ${figtree.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
