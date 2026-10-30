"use client";

import { useEffect, useRef } from "react";
import { LanguageMenu } from "@/components/site/language-menu";
import { Logo } from "@/components/site/logo";
import type { Locale } from "@/lib/i18n";
import { pageTop } from "./freeze";
import { LanguageHint, type LanguageHintCopy } from "./language-hint";

/* One header that stays at the top. It shares the hero's yellow at rest and turns to paper once the page scrolls; its
   button shows only while neither the hero's button nor the invitation is on screen. */
type StoryHeaderProps = {
  lang: Locale;
  brand: string;
  homeLabel: string;
  cta: string;
  languageLabel: string;
  /** Another language this page offers to browsers that prefer it (language-hint.tsx). */
  hint?: LanguageHintCopy;
};

export function StoryHeader({ lang, brand, homeLabel, cta, languageLabel, hint }: StoryHeaderProps) {
  const bar = useRef<HTMLElement>(null);
  const barCta = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const heroCta = document.querySelector(".hero-copy .btn"), invite = document.getElementById("invite");
    // Page positions, measured only when the page's size changes, so scrolling never forces a layout.
    let heroCtaBottom = 0, inviteTop = Infinity, barH = 64, halfway = Infinity;
    const measure = () => {
      halfway = (document.documentElement.scrollHeight - innerHeight) / 2;
      if (!heroCta || !invite || !bar.current) return;
      heroCtaBottom = pageTop(heroCta as HTMLElement) + (heroCta as HTMLElement).offsetHeight;
      inviteTop = pageTop(invite);
      barH = bar.current.offsetHeight;
    };
    let queued = false, synced = false;
    const sync = () => {
      queued = false;
      if (!bar.current || !barCta.current) return;
      const heroGone = heroCtaBottom - scrollY < barH;
      const atInvite = inviteTop - scrollY < innerHeight * 0.8;
      const stuck = scrollY > 4;
      // The colour fade (story.css) plays from the first change after the page opens, not for the opening state.
      if (synced && stuck !== bar.current.classList.contains("stuck")) bar.current.classList.add("moved");
      bar.current.classList.toggle("stuck", stuck);
      synced = true;
      // What a pull past either end of the page shows: the hero's yellow above the top, the footer's walnut below the end.
      document.documentElement.classList.toggle("page-lower", scrollY > halfway);
      barCta.current.classList.toggle("on", heroGone && !atInvite);
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(sync); } };
    addEventListener("scroll", onScroll, { passive: true });
    const pageSize = new ResizeObserver(() => { measure(); sync(); });
    pageSize.observe(document.body);
    measure();
    sync();
    return () => {
      removeEventListener("scroll", onScroll);
      pageSize.disconnect();
      document.documentElement.classList.remove("page-lower");
    };
  }, []);

  return (
    <header className="bar" id="bar" ref={bar}>
      <div className="top wrap">
        <a className="lockup" href="#top" aria-label={homeLabel}>
          <Logo size={28} />
          <span className="lockup-word">{brand}</span>
        </a>
        <div className="top-end">
          <a className="btn small bar-cta" id="barCta" href="#invite" data-cta="header" ref={barCta}>{cta}</a>
          <LanguageMenu lang={lang} path="/" label={languageLabel}>
            {hint && <LanguageHint lang={lang} path="/" copy={hint} />}
          </LanguageMenu>
        </div>
      </div>
    </header>
  );
}
