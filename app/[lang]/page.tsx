import { notFound } from "next/navigation";
import { StoryPage } from "@/components/story/story-page";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <StoryPage dict={await getDictionary(lang)} lang={lang} />;
}
