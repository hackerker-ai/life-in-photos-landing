"use client";

import { useEffect, useRef } from "react";
import { LanguageMenu } from "@/components/site/language-menu";
import { Logo } from "@/components/site/logo";
import type { Locale } from "@/lib/i18n";
import { pageTop } from "./freeze";

/* One header that stays at the top. It shares the hero's yellow while the hero is under it and turns to paper once the
   hero has scrolled out from beneath it; its button shows only while neither the hero's button nor the invitation is on
   screen. */
type StoryHeaderProps = { lang: Locale; brand: string; homeLabel: string; cta: string; languageLabel: string };

export function StoryHeader({ lang, brand, homeLabel, cta, languageLabel }: StoryHeaderProps) {
  const bar = useRef<HTMLElement>(null);
  const barCta = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const hero = document.getElementById("top"), heroCta = document.querySelector(".hero-copy .btn"), invite = document.getElementById("invite");
    // Page positions, measured only when the page's size changes, so scrolling never forces a layout.
    let heroBottom = 0, heroCtaBottom = 0, inviteTop = Infinity, barH = 64, halfway = Infinity;
    const measure = () => {
      halfway = (document.documentElement.scrollHeight - innerHeight) / 2;
      if (!hero || !heroCta || !invite || !bar.current) return;
      heroBottom = pageTop(hero) + hero.offsetHeight;
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
      // The colour changes where the hero ends, never at the very top of the page: iPhone Safari copies the header's colour
      // into the strip behind the status bar, and a change just as a scroll comes to rest at the top reached the strip
      // only after the bounce settled, half a second late. Mid-scroll it keeps up.
      bar.current.classList.toggle("stuck", scrollY > heroBottom - barH);
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
