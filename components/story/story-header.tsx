"use client";

import { useEffect, useRef } from "react";
import { LanguageMenu } from "@/components/site/language-menu";
import { Logo } from "@/components/site/logo";
import type { Locale } from "@/lib/i18n";
import { pageTop } from "./freeze";

/* One header that stays at the top. It shares the hero's yellow at rest and turns to paper once the page scrolls; its
   button shows only while neither the hero's button nor the invitation is on screen. */
type StoryHeaderProps = { lang: Locale; brand: string; homeLabel: string; cta: string; languageLabel: string };

export function StoryHeader({ lang, brand, homeLabel, cta, languageLabel }: StoryHeaderProps) {
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
    let queued = false;
    const sync = () => {
      queued = false;
      if (!bar.current || !barCta.current) return;
      const heroGone = heroCtaBottom - scrollY < barH;
      const atInvite = inviteTop - scrollY < innerHeight * 0.8;
      bar.current.classList.toggle("stuck", scrollY > 4);
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
          <a className="btn small bar-cta" id="barCta" href="#invite" ref={barCta}>{cta}</a>
          <LanguageMenu lang={lang} path="/" label={languageLabel} />
        </div>
      </div>
    </header>
  );
}
