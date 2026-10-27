"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { layoutTop } from "./freeze";

/* A section that, on phones, holds still while scrolling down slides its row sideways, so nobody has to swipe. Wider
   screens, and Reduce Motion, show the plain row. Two ways to hold:

   - "section" (How it works, three phones): the section's own content pins under the header (CSS sticky), with the
     scroll room for the slide inside the section.
   - "page" (the beta parents' notes): the whole page below the header holds still, the sections before and after
     staying in sight, with the notes centred in the view. The page content (.story-flow) is moved down exactly as far
     as the page scrolls for the stretch of the slide (see freeze.ts), and the scroll room is at the page's end.

   The scroll room is CSS (story.css), there from the first frame. Where the browser has scroll-driven animations
   (Safari 26, Chrome), the slide and the hold are CSS animations tied to the page's scroll, so they move in step with
   the finger; elsewhere a scroll handler moves them. This only measures where the slide starts and how far it runs,
   when the page's size changes: never while scrolling, and never on the iPhone's toolbar showing or hiding, which used
   to make the page jump. */

// After the last item arrives, the view stays held this much longer before the page moves on.
const HOLD_AFTER = 80;

type PinnedSlideProps = {
  className: string;
  id?: string;
  labelledBy: string;
  /** The selector of the row that slides, inside the section. */
  row: string;
  hold?: "section" | "page";
  children: ReactNode;
};

export function PinnedSlide({ className, id, labelledBy, row: rowSelector, hold = "section", children }: PinnedSlideProps) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const box = section.current!, row = box.querySelector<HTMLElement>(rowSelector)!;
    const pin = box.firstElementChild as HTMLElement;
    const flow = hold === "page" ? box.closest<HTMLElement>(".story-flow") : null;
    const room = flow ? document.querySelector<HTMLElement>(".story-room") : null;
    const narrow = matchMedia("(max-width: 759px)");
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeline = CSS.supports("animation-timeline: scroll()");
    // Where the slide starts and how far it runs, in page scroll, where the row sits at each end, and (holding the page)
    // how long the page holds.
    let from = 0, distance = 0, start = 0, held = 0;

    function paint() {
      if (timeline || !box.classList.contains("pinned")) return;
      const p = Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, distance)));
      row.style.transform = `translateX(${(-(from + p * distance)).toFixed(1)}px)`;
      if (flow) flow.style.transform = `translateY(${Math.min(held, Math.max(0, scrollY - start)).toFixed(1)}px)`;
    }
    function release() {
      row.style.transform = "";
      if (!flow) return;
      flow.classList.remove("freezing");
      flow.style.transform = "";
      for (const name of ["--freeze-start", "--freeze-end", "--freeze-d"]) flow.style.removeProperty(name);
      room?.style.removeProperty("--freeze-d");
    }
    function layout() {
      const on = narrow.matches && !calm;
      box.classList.toggle("pinned", on);
      if (!on) return release();

      const barH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bar-h")) || 64;
      // Where the held block sits in the layout, from the section (a stuck sticky block reports where it is stuck).
      const pinAt = layoutTop(box) + parseFloat(getComputedStyle(box).paddingTop);
      // The slide runs from the first item centred in the view to the last one centred in the view.
      const offset = (step: HTMLElement) => step.offsetLeft + step.offsetWidth / 2 - row.clientWidth / 2;
      from = offset(row.firstElementChild as HTMLElement);
      distance = Math.max(0, offset(row.lastElementChild as HTMLElement) - from);
      if (flow) {
        // Hold when the content is centred in the view below the header (the small viewport, which the iPhone's
        // toolbar doesn't change), or right under the header if it's taller than that.
        const probe = document.createElement("div");
        probe.style.cssText = "position:absolute;top:0;height:100svh;visibility:hidden;pointer-events:none";
        document.body.append(probe);
        const view = probe.offsetHeight;
        probe.remove();
        start = pinAt - barH - Math.max(0, (view - barH - pin.offsetHeight) / 2);
        held = distance + HOLD_AFTER;
        flow.style.setProperty("--freeze-start", `${start}px`);
        flow.style.setProperty("--freeze-end", `${start + held}px`);
        flow.style.setProperty("--freeze-d", `${held}px`);
        room?.style.setProperty("--freeze-d", `${held}px`);
        flow.dataset.freezeFrom = String(start + barH);
        flow.dataset.freezeHeld = String(held);
        flow.classList.add("freezing");
      } else {
        // Holds where its sticky top, read back, puts it.
        const pinTop = parseFloat(getComputedStyle(pin).top) || barH;
        start = pinAt - pinTop;
      }
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
      release();
    };
  }, [rowSelector, hold]);

  return (
    <section className={className} id={id} ref={section} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
