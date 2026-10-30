import { notFound } from "next/navigation";
import { StoryPage } from "@/components/story/story-page";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  // The English page offers the Chinese one to browsers that prefer Chinese (components/story/language-hint.tsx).
  const offer = lang === "en" ? { lang: "zh-Hant" as const, dict: await getDictionary("zh-Hant") } : undefined;
  return <StoryPage dict={await getDictionary(lang)} lang={lang} offer={offer} />;
}
