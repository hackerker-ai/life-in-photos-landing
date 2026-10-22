"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* How it works on phones: the section holds still while scrolling down slides the three phones sideways, so nobody has
   to swipe. Wider screens, and Reduce Motion, show the plain row. */
export function HowPinned({ labelledBy, children }: { labelledBy: string; children: ReactNode }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const how = section.current!, wrap = how.querySelector<HTMLElement>(":scope > .wrap")!, row = how.querySelector<HTMLElement>(".how-steps")!;
    const narrow = matchMedia("(max-width: 759px)");
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let start = 0, distance = 0, pad = [0, 0];

    function paint() {
      if (!how.classList.contains("pinned")) return;
      const barH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bar-h")) || 64;
      const p = Math.min(1, Math.max(0, (barH - pad[0] - how.getBoundingClientRect().top) / Math.max(1, distance)));
      row.style.transform = `translateX(${(-(start + p * distance)).toFixed(1)}px)`;
    }
    function layout() {
      const on = narrow.matches && !calm;
      how.classList.toggle("pinned", on);
      row.style.transform = "";
      how.style.height = "";
      if (!on) return;
      const cs = getComputedStyle(how);
      pad = [parseFloat(cs.paddingTop), parseFloat(cs.paddingBottom)];
      // The slide runs from the first phone centred in the view to the last phone centred in the view.
      const offset = (step: HTMLElement) => step.offsetLeft + step.offsetWidth / 2 - row.clientWidth / 2;
      start = offset(row.firstElementChild as HTMLElement);
      distance = Math.max(0, offset(row.lastElementChild as HTMLElement) - start);
      // Scroll distance while pinned: the slide itself, then a short hold on the last phone.
      how.style.height = `${pad[0] + wrap.offsetHeight + distance + 80 + pad[1]}px`;
      paint();
    }

    let queued = false;
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; paint(); }); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", layout);
    narrow.addEventListener("change", layout);
    layout();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", layout);
      narrow.removeEventListener("change", layout);
    };
  }, []);

  return (
    <section className="how" id="how" ref={section} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
