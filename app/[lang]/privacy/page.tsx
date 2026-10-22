import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyPage } from "@/components/privacy/privacy-page";
import { hasLocale, localePath, locales } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.privacy.meta.title,
    alternates: {
      canonical: localePath(lang, "/privacy"),
      languages: Object.fromEntries(locales.map((locale) => [locale, localePath(locale, "/privacy")]))
    },
    // Still a draft waiting for legal review, as in the prototype.
    robots: { index: false, follow: true }
  };
}

export default async function Privacy({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <PrivacyPage dict={await getDictionary(lang)} lang={lang} />;
}
