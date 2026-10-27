"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* A section that, on phones, holds still while scrolling down slides its row sideways, so nobody has to swipe: How it
   works (three phones) and the beta parents' notes. Wider screens, and Reduce Motion, show the plain row.

   The pinning and the scroll room for the slide are CSS (story.css, per section), there from the first frame. Where the browser has
   scroll-driven animations (Safari 26, Chrome), the slide itself is a CSS animation tied to the page's scroll, so it
   moves in step with the finger; elsewhere a scroll handler moves it. This only measures where the slide starts and
   how far it runs, when the page's size changes: never while scrolling, and never on the iPhone's toolbar showing or
   hiding, which used to make the page jump. */
type PinnedSlideProps = {
  className: string;
  id?: string;
  labelledBy: string;
  /** The selector of the row that slides, inside the section. */
  row: string;
  children: ReactNode;
};

export function PinnedSlide({ className, id, labelledBy, row: rowSelector, children }: PinnedSlideProps) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const box = section.current!, row = box.querySelector<HTMLElement>(rowSelector)!;
    const narrow = matchMedia("(max-width: 759px)");
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeline = CSS.supports("animation-timeline: scroll()");
    // Where the slide starts and how far it runs, in page scroll, and where the row sits at each end.
    let from = 0, distance = 0, start = 0;

    function paint() {
      if (timeline || !box.classList.contains("pinned")) return;
      const p = Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, distance)));
      row.style.transform = `translateX(${(-(from + p * distance)).toFixed(1)}px)`;
    }
    function layout() {
      const on = narrow.matches && !calm;
      box.classList.toggle("pinned", on);
      if (!on) {
        row.style.transform = "";
        return;
      }
      const padTop = parseFloat(getComputedStyle(box).paddingTop);
      // The block that holds still, and where it holds: under the header (How it works) or centred in the view below
      // it (the notes), which needs its height (--pin-h, see story.css). Its sticky top, read back, is where the slide
      // starts.
      const pin = box.firstElementChild as HTMLElement;
      box.style.setProperty("--pin-h", `${pin.offsetHeight}px`);
      const barH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bar-h")) || 64;
      const pinTop = parseFloat(getComputedStyle(pin).top) || barH;
      // The slide runs from the first item centred in the view to the last one centred in the view.
      const offset = (step: HTMLElement) => step.offsetLeft + step.offsetWidth / 2 - row.clientWidth / 2;
      from = offset(row.firstElementChild as HTMLElement);
      distance = Math.max(0, offset(row.lastElementChild as HTMLElement) - from);
      start = box.getBoundingClientRect().top + scrollY - pinTop + padTop;
      box.style.setProperty("--slide-from", `${-from}px`);
      box.style.setProperty("--slide-to", `${-(from + distance)}px`);
      box.style.setProperty("--slide-start", `${start}px`);
      box.style.setProperty("--slide-end", `${start + distance}px`);
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
  }, [rowSelector]);

  return (
    <section className={className} id={id} ref={section} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
