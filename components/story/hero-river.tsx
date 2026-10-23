"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { InlineScript } from "@/components/site/inline-script";
import { Friend } from "./friend";
import { FIT_HERO, fitHero, heroScreenMarkup, runHeroSession } from "./hero-session";
import { makeRiver, seeded } from "./river";

type HeroRiverProps = {
  hero: Dictionary["hero"];
  moments: Dictionary["moments"];
  acts: { keep: string; later: string; skip: string };
  friends: Dictionary["friends"];
};

/* 1. The river flowing through the hero, the phone playing a review session, and the friends around it. */
export function HeroRiver({ hero, moments, acts, friends }: HeroRiverProps) {
  const riverRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const copy = { session: hero.session, moments, acts };

  useEffect(() => {
    const river = riverRef.current!, screen = screenRef.current!, phone = screen.parentElement!;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isWide = matchMedia("(min-width: 760px)");
    let alive = true, riverOn = true, heroOn = false, frame = 0;

    // Each map gets its own seeded sequence, so the river looks the same on every visit.
    const painters: Partial<Record<"wide" | "narrow", (seconds: number) => void>> = {};
    const paint = () => {
      const key = isWide.matches ? "wide" : "narrow";
      return (painters[key] ||= makeRiver(river.querySelector<SVGSVGElement>(".map." + key)!, seeded(20261013)));
    };
    const flow = (now: number) => {
      if (riverOn) paint()(now / 1000 + 7);
      if (!calm) frame = requestAnimationFrame(flow);
    };
    paint()(7);
    if (!calm) frame = requestAnimationFrame(flow);

    const onBreakpoint = () => { paint()(7); fitHero(screen); };
    const onResize = () => fitHero(screen);
    isWide.addEventListener("change", onBreakpoint);
    addEventListener("resize", onResize);
    fitHero(screen);

    const riverWatch = new IntersectionObserver(([entry]) => { riverOn = entry.isIntersecting; });
    riverWatch.observe(river);
    const phoneWatch = new IntersectionObserver(([entry]) => { heroOn = entry.isIntersecting; }, { threshold: 0.25 });
    phoneWatch.observe(phone);

    // With Reduce Motion the phone shows the first moment and holds.
    if (!calm) runHeroSession(screen, copy, () => heroOn, () => alive);

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      isWide.removeEventListener("change", onBreakpoint);
      removeEventListener("resize", onResize);
      riverWatch.disconnect();
      phoneWatch.disconnect();
    };
    // The copy is fixed for the page's lifetime, so this runs once.
  }, []);

  return (
    <div className="river" id="river" ref={riverRef}>
      {/* On a short laptop window the scene shrinks and centres, so both beds run on past the grid (from x = -80 and
          x = 1520 in the design) to reach the screen edges. data-ref-* are the design's own bed lengths: the river keeps
          the same spacing and speed along the longer beds. */}
      <svg className="map wide" viewBox="0 0 1440 965" data-tile="34" data-count="26" data-ref-in="1084" data-ref-out="459" aria-hidden="true">
        <path className="bed in" strokeWidth="62" d="M-800 870C-500 870-300 900-80 820C140 740 320 880 500 820c160-55 200-318 360-318" />
        <path className="bed out" strokeWidth="62" d="M1130 432c80 0 90-150 180-150 60 0 80 30 210 30h700" />
        <g className="flow" />
      </svg>
      <svg className="map narrow" viewBox="0 0 390 580" data-tile="20" data-count="18" aria-hidden="true">
        <path className="bed in" strokeWidth="34" d="M-30 70C60 10 170 30 190 90c15 50 140-10 155 70 13 70-45 90-83 90" />
        <path className="bed out" strokeWidth="34" d="M130 330c-60 0-80 50-170 62" />
        <g className="flow" />
      </svg>
      <p className="tag" id="tagIn">{hero.tagIn}</p>
      <p className="tag" id="tagOut">{hero.tagOut}</p>
      <Friend who="flip" pose="peek" id="heroFlip" label={friends.flip} />
      <div className="phone live" role="img" aria-label={hero.phoneLabel}>
        <div
          className="screen hero-screen"
          id="heroScreen"
          ref={screenRef}
          aria-hidden="true"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: heroScreenMarkup(copy) }}
        />
      </div>
      <InlineScript html={FIT_HERO} />
      <Friend who="nori" id="heroNori" label={friends.nori} />
      <Friend who="momo" id="heroMomo" label={friends.momo} />
      <svg className="hill" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 100V40c380 70 980-50 1440 16v44z" style={{ fill: "var(--dull)" }} />
      </svg>
    </div>
  );
}
