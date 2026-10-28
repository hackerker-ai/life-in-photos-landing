import type { MetadataRoute } from "next";
import { getDictionary } from "./[lang]/dictionaries";
import { localePath, locales, type Locale } from "@/lib/i18n";
import { SITE_ORIGIN } from "@/lib/site";

/* The home page in each locale that's ready for search (status "translated"), each listing the others. A draft locale
   joins once its dictionary is marked translated. The privacy policy joins once it's published (it's noindex while a
   draft). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ready: Locale[] = [];
  for (const locale of locales) if ((await getDictionary(locale)).status === "translated") ready.push(locale);
  const url = (locale: Locale) => SITE_ORIGIN + localePath(locale);
  return ready.map((locale) => ({
    url: url(locale),
    changeFrequency: "monthly",
    priority: 1,
    alternates: ready.length > 1 ? { languages: Object.fromEntries(ready.map((other) => [other, url(other)])) } : undefined
  }));
}
