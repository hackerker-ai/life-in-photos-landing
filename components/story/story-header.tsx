"use client";

import { useEffect, useRef } from "react";
import { Logo } from "@/components/site/logo";

/* One header that stays at the top. It shares the hero's yellow at rest and turns to frosted paper once the page
   scrolls; its button shows only while neither the hero's button nor the invitation is on screen. */
export function StoryHeader({ brand, homeLabel, cta }: { brand: string; homeLabel: string; cta: string }) {
  const bar = useRef<HTMLElement>(null);
  const barCta = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const heroCta = document.querySelector(".hero-copy .btn"), invite = document.getElementById("invite");
    let queued = false;
    const sync = () => {
      queued = false;
      if (!bar.current || !barCta.current || !heroCta || !invite) return;
      const heroGone = heroCta.getBoundingClientRect().bottom < bar.current.offsetHeight;
      const atInvite = invite.getBoundingClientRect().top < innerHeight * 0.8;
      bar.current.classList.toggle("stuck", scrollY > 4);
      barCta.current.classList.toggle("on", heroGone && !atInvite);
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(sync); } };
    addEventListener("scroll", onScroll, { passive: true });
    sync();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="bar" id="bar" ref={bar}>
      <div className="top wrap">
        <a className="lockup" href="#top" aria-label={homeLabel}>
          <Logo size={28} />
          {brand}
        </a>
        <a className="btn small bar-cta" id="barCta" href="#invite" ref={barCta}>{cta}</a>
      </div>
    </header>
  );
}
