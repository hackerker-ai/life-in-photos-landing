"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/site/logo";
import { localePath, locales, type Locale } from "@/lib/i18n";
import { photoSrc } from "./photos";

/* A note that this page is also in the visitor's language, for a browser that prefers it. Flip drops from the header's
   globe, swings and settles, holding a Polaroid whose photo is the other page's opening: its headline on the yellow and
   the hero's phone. Going there or staying is remembered, so it asks once; "Stay" swings it back up into the globe, and
   opening the language menu just puts it away. Rendered inside the header's language menu
   (components/site/language-menu.tsx), so it hangs from the globe. */

const KEY = "lip-lang-hint";
// Long enough after the page opens that it arrives on its own, not as part of the page loading.
const DELAY = 700;

export type LanguageHintCopy = {
  /** The language offered, and its copy: the offer and the button are in that language. */
  to: Locale;
  offer: string;
  go: string;
  /** The offered page's headline, for the picture. */
  title: string;
  /** Turning it down, in this page's language. */
  stay: string;
  brand: string;
};

/** The headline in two lines, as it sits beside the phone on the page: broken at the space or word break nearest its
    middle (the Chinese dictionary's headlines carry zero-width spaces between words, see lib/phrases.ts). */
function halves(title: string) {
  const breaks = [...title.matchAll(/[\u200b ]/g)].map((match) => match.index);
  if (!breaks.length) return [title];
  const middle = title.length / 2;
  const cut = breaks.reduce((best, at) => (Math.abs(at - middle) < Math.abs(best - middle) ? at : best));
  return [title.slice(0, cut), title.slice(cut + 1)];
}

const base = (tag: string) => tag.split("-")[0].toLowerCase();
const recall = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const remember = (answer: Locale) => { try { localStorage.setItem(KEY, answer); } catch {} };

export function LanguageHint({ lang, path, copy }: { lang: Locale; path: string; copy: LanguageHintCopy }) {
  const [shown, setShown] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Shown when, of the languages the site has, the browser lists the offered one first, and it hasn't been answered.
  useEffect(() => {
    const ours = new Set(locales.map(base));
    const first = (navigator.languages?.length ? navigator.languages : [navigator.language]).find((tag) => ours.has(base(tag)));
    if (!first || base(first) !== base(copy.to) || recall()) return;
    const timer = setTimeout(() => setShown(true), DELAY);
    return () => clearTimeout(timer);
  }, [copy.to]);

  // While it hangs there the globe is lit, and opening the language menu puts it away.
  useEffect(() => {
    const globe = root.current?.parentElement?.querySelector<HTMLButtonElement>(".globe-btn");
    if (!shown || !globe) return;
    globe.classList.add("hinted");
    const onGlobe = () => setShown(false);
    globe.addEventListener("click", onGlobe);
    return () => { globe.classList.remove("hinted"); globe.removeEventListener("click", onGlobe); };
  }, [shown]);

  const stay = () => { remember(lang); setLeaving(true); };

  return (
    <div
      className={leaving ? "lang-hint out" : "lang-hint"}
      ref={root}
      role="region"
      aria-labelledby="langHintOffer"
      lang={copy.to}
      hidden={!shown}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        stay();
        root.current?.parentElement?.querySelector<HTMLButtonElement>(".globe-btn")?.focus();
      }}
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget || !leaving) return;
        setShown(false);
        setLeaving(false);
      }}
    >
      {/* Nothing inside until it shows, so its pictures load only for the visitors who see it. */}
      {shown && (
        <>
          <img className="hint-flip" src="/friends/flip-hang.webp" width={732} height={1024} alt="" />
          <figure className="hint-pol">
            <div className="hint-snap" aria-hidden="true">
              <span className="snap-lockup"><Logo size={13} />{copy.brand}</span>
              <span className="snap-phone"><img src={photoSrc(11914, "m")} alt="" /></span>
              <p className="snap-head">{halves(copy.title).map((half) => <span key={half}>{half}</span>)}</p>
            </div>
            <figcaption>
              <strong id="langHintOffer">{copy.offer}</strong>
              <div className="hint-acts">
                <a className="btn" href={localePath(copy.to, path)} hrefLang={copy.to} onClick={() => remember(copy.to)}>{copy.go}</a>
                <button className="hint-stay" type="button" lang={lang} onClick={stay}>{copy.stay}</button>
              </div>
            </figcaption>
          </figure>
        </>
      )}
    </div>
  );
}
