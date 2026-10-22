import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((module) => module.default),
  "zh-Hant": () => import("./dictionaries/zh-Hant").then((module) => module.default)
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type { Dictionary };
