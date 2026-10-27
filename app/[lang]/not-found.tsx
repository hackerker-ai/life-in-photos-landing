import { NotFoundPage, type NotFoundCopy } from "@/components/not-found/not-found-page";
import { locales } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

/* The site's 404, in the visitor's language. A not-found page gets no params, so this hands the page both languages'
   few lines and the page picks by the address (useParams). Reading the request instead would make every page under
   [lang] dynamic. Next marks a 404 noindex on its own. */
export default async function NotFound() {
  const entries = await Promise.all(
    locales.map(async (locale) => {
      const dict = await getDictionary(locale);
      const copy: NotFoundCopy = { ...dict.notFound, brand: dict.brand, homeLabel: dict.privacy.homeLabel, back: dict.privacy.back, cta: dict.header.cta };
      return [locale, copy] as const;
    })
  );
  return <NotFoundPage copies={Object.fromEntries(entries) as Record<(typeof locales)[number], NotFoundCopy>} />;
}
