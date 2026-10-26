import type { Locale } from "@/lib/i18n";
import { markPhrases } from "@/lib/phrases";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((module) => module.default),
  "zh-Hant": () => import("./dictionaries/zh-Hant").then((module) => phrased(module.default, "zh-Hant"))
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

/** The headings and short display lines of a Chinese dictionary, with break points between words (see lib/phrases.ts).
    Paragraphs keep the usual Chinese line breaking. */
function phrased(source: Dictionary, locale: string): Dictionary {
  const dict = structuredClone(source);
  const mark = (text: string) => markPhrases(text, locale);
  dict.hero.title = mark(dict.hero.title);
  dict.hero.lede = mark(dict.hero.lede);
  dict.dig.lines = dict.dig.lines.map(mark);
  dict.play.title = mark(dict.play.title);
  dict.play.cards = dict.play.cards.map((card) => ({ ...card, title: mark(card.title) }));
  dict.play.nudge = mark(dict.play.nudge);
  dict.play.endTitle = mark(dict.play.endTitle);
  dict.how.title = mark(dict.how.title);
  dict.how.steps = dict.how.steps.map((step) => ({ ...step, title: mark(step.title) }));
  dict.strengths.title = mark(dict.strengths.title);
  dict.strengths.feats = dict.strengths.feats.map((feat) => ({ ...feat, title: mark(feat.title) }));
  dict.trust.title = mark(dict.trust.title);
  dict.voices.title = mark(dict.voices.title);
  dict.faq.title = mark(dict.faq.title);
  dict.faq.items = dict.faq.items.map((item) => ({ ...item, q: mark(item.q) }));
  dict.invite.title = mark(dict.invite.title);
  dict.invite.wallNote = mark(dict.invite.wallNote);
  dict.invite.wallNoteKeptOne = mark(dict.invite.wallNoteKeptOne);
  dict.invite.wallNoteKeptMany = mark(dict.invite.wallNoteKeptMany);
  dict.privacy.title = mark(dict.privacy.title);
  dict.privacy.shortTitle = mark(dict.privacy.shortTitle);
  dict.privacy.sections = dict.privacy.sections.map((section) => ({
    ...section,
    title: mark(section.title),
    blocks: section.blocks.map((block) => ("h3" in block ? { h3: mark(block.h3) } : block))
  }));
  return dict;
}

export type { Dictionary };
