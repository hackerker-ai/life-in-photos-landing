/* Chinese has no spaces, so browsers break a line between any two characters, which splits words in headings
   ("忘記、卻深 / 愛的照片"). For the headings and short display lines listed in app/[lang]/dictionaries.ts, mark the
   word boundaries with zero-width spaces when the page is built; with `word-break: keep-all` (components/site/base.css)
   lines then break only there. Words come from the runtime's own dictionary (Intl.Segmenter), so the copy stays plain
   text in the dictionary files. */

const ZWSP = "​";
const PUNCTUATION = /^\p{P}+$/u;
const OPENING = /[「『（《〈【〔(“‘]$/u;
const SINGLE_HAN = /^\p{Script=Han}$/u;

/** Adds break points between the words of a Chinese line: never before punctuation, never after an opening bracket,
    and never between two single characters, which the segmenter sometimes splits out of one word (圖|庫). */
export function markPhrases(text: string, locale: string) {
  const segments = [...new Intl.Segmenter(locale, { granularity: "word" }).segment(text)].map((s) => s.segment);
  let out = "";
  segments.forEach((segment, i) => {
    const before = segments[i - 1];
    const breakHere =
      i > 0 &&
      !/\s$/.test(before) && !/^\s/.test(segment) &&
      !PUNCTUATION.test(segment) &&
      !OPENING.test(before) &&
      !(SINGLE_HAN.test(before) && SINGLE_HAN.test(segment));
    out += (breakHere ? ZWSP : "") + segment;
  });
  return out;
}
