import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, localePath, locales } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";
import { caveat, figtree, nunito } from "./fonts";
import "@/components/site/base.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL("https://lifeinphotos.app"),
    alternates: {
      canonical: localePath(lang),
      languages: Object.fromEntries(locales.map((locale) => [locale, localePath(locale)]))
    },
    // A locale still in draft (or not yet translated) stays out of search until a native speaker has reviewed it.
    robots: dict.status !== "translated" ? { index: false, follow: true } : undefined,
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      type: "website"
    }
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
