"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* How it works on phones: the section holds still while scrolling down slides the three phones sideways, so nobody has
   to swipe. Wider screens, and Reduce Motion, show the plain row.

   Where the browser has scroll-driven animations (Safari 26, Chrome), the slide is a CSS animation tied to the page's
   scroll (see .how.pinned in story.css), so it moves in step with the finger. Elsewhere a scroll handler moves it.
   Both only measure when the page's size changes, never while scrolling, and never on the iPhone's toolbar showing or
   hiding, which used to make the page jump. */
export function HowPinned({ labelledBy, children }: { labelledBy: string; children: ReactNode }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const how = section.current!, wrap = how.querySelector<HTMLElement>(":scope > .wrap")!, row = how.querySelector<HTMLElement>(".how-steps")!;
    const narrow = matchMedia("(max-width: 759px)");
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeline = CSS.supports("animation-timeline: scroll()");
    // Where the slide starts and how far it runs, in page scroll, and where the row sits at each end.
    let from = 0, distance = 0, start = 0;

    function paint() {
      if (timeline || !how.classList.contains("pinned")) return;
      const p = Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, distance)));
      row.style.transform = `translateX(${(-(from + p * distance)).toFixed(1)}px)`;
    }
    function layout() {
      const on = narrow.matches && !calm;
      how.classList.toggle("pinned", on);
      if (!on) {
        row.style.transform = "";
        how.style.height = "";
        return;
      }
      const cs = getComputedStyle(how);
      const pad = [parseFloat(cs.paddingTop), parseFloat(cs.paddingBottom)];
      const barH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bar-h")) || 64;
      // The slide runs from the first phone centred in the view to the last phone centred in the view.
      const offset = (step: HTMLElement) => step.offsetLeft + step.offsetWidth / 2 - row.clientWidth / 2;
      from = offset(row.firstElementChild as HTMLElement);
      distance = Math.max(0, offset(row.lastElementChild as HTMLElement) - from);
      // Scroll distance while pinned: the slide itself, then a short hold on the last phone.
      how.style.height = `${pad[0] + wrap.offsetHeight + distance + 80 + pad[1]}px`;
      start = how.getBoundingClientRect().top + scrollY - barH + pad[0];
      how.style.setProperty("--how-from", `${-from}px`);
      how.style.setProperty("--how-to", `${-(from + distance)}px`);
      how.style.setProperty("--how-start", `${start}px`);
      how.style.setProperty("--how-end", `${start + distance}px`);
      paint();
    }

    let queued = false;
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; paint(); }); } };
    addEventListener("scroll", onScroll, { passive: true });
    // The page's own size changing (a new width, fonts arriving, the demo above changing height) moves the section;
    // the toolbar showing or hiding doesn't change it, so it never triggers a re-measure.
    const pageSize = new ResizeObserver(layout);
    pageSize.observe(document.body);
    narrow.addEventListener("change", layout);
    return () => {
      removeEventListener("scroll", onScroll);
      pageSize.disconnect();
      narrow.removeEventListener("change", layout);
    };
  }, []);

  return (
    <section className="how" id="how" ref={section} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
