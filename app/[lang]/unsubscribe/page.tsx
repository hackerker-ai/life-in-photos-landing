import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UnsubscribePage, type UnsubscribeState } from "@/components/unsubscribe/unsubscribe-page";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]/unsubscribe">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  // A page for one person's email link, never for search.
  return { title: dict.unsubscribe.meta.title, robots: { index: false, follow: false } };
}

export default async function Unsubscribe({ params, searchParams }: PageProps<"/[lang]/unsubscribe">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const query = await searchParams;
  const value = (name: string) => (typeof query[name] === "string" ? query[name] : "");

  const email = value("email");
  const token = value("token");
  const state: UnsubscribeState = value("done")
    ? { kind: "done" }
    : email && token
      ? { kind: "confirm", email, token, failed: Boolean(value("failed")) }
      : { kind: "broken" };

  return <UnsubscribePage dict={await getDictionary(lang)} lang={lang} state={state} />;
}
