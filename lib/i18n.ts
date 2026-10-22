/* The site's locales. English is the default and lives at the root (/, /privacy); every other locale lives under its
   own prefix (/zh-Hant, /zh-Hant/privacy). `proxy.ts` rewrites unprefixed paths to the English route segment. */
export const locales = ["en", "zh-Hant"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** The public path of a page in a locale: `localePath("zh-Hant", "/privacy")` is `/zh-Hant/privacy`. */
export function localePath(locale: Locale, path = "/") {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
