"use client";

import { useLayoutEffect, useRef, type MouseEvent, type ReactNode } from "react";

/* The common questions as an accordion: one answer open at a time, sliding open and shut. The list keeps room for its
   longest answer, so opening or closing one never moves Flip's arch, the heading or the section's edge, and Flip's arch
   centres on the questions as they look closed. Without
   JavaScript the questions are plain <details> and still open and close. */

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function FaqAccordion({ children }: { children: ReactNode }) {
  const list = useRef<HTMLDivElement>(null);

  // Reserve the list's tallest state: each answer opened in turn, measured before paint, then put back.
  useLayoutEffect(() => {
    const el = list.current!;
    const reserve = () => {
      const items = [...el.querySelectorAll("details")];
      const was = items.map((item) => item.open);
      el.style.minHeight = "";
      // With every question closed: what Flip's arch centres on, beside the list (see .faq .arch in story.css).
      items.forEach((item) => { item.open = false; });
      el.parentElement?.style.setProperty("--faq-rest", `${el.offsetHeight}px`);
      let tallest = 0;
      for (const item of items) {
        items.forEach((other) => { other.open = other === item; });
        tallest = Math.max(tallest, el.offsetHeight);
      }
      items.forEach((item, i) => { item.open = was[i]; });
      el.style.minHeight = `${tallest}px`;
    };
    reserve();
    document.fonts?.ready.then(reserve);
    let width = innerWidth;
    const onResize = () => { if (innerWidth !== width) { width = innerWidth; reserve(); } };
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  }, []);

  function onClick(event: MouseEvent<HTMLDivElement>) {
    const summary = (event.target as Element).closest("summary");
    const item = summary?.parentElement;
    if (!summary || !(item instanceof HTMLDetailsElement)) return;
    event.preventDefault();
    const opening = !item.open || item.dataset.closing !== undefined;
    for (const other of list.current!.querySelectorAll("details")) {
      if (other !== item && other.open && other.dataset.closing === undefined) slide(other, false);
    }
    slide(item, opening);
  }

  return (
    <div className="faq-list" ref={list} onClick={onClick}>
      {children}
    </div>
  );
}

/** Slides one question open or shut by animating its height between the question alone and the question with its answer. */
function slide(item: HTMLDetailsElement, open: boolean) {
  const summary = item.querySelector("summary")!;
  const answer = item.querySelector("p");
  const from = item.offsetHeight;
  [...item.getAnimations(), ...(answer?.getAnimations() ?? [])].forEach((animation) => animation.cancel());
  item.style.overflow = "";
  if (open) {
    delete item.dataset.closing;
    item.open = true;
  } else {
    // The + turns back at once; the answer stays in place until it has slid shut.
    item.dataset.closing = "";
  }
  if (reduceMotion()) {
    if (!open) { item.open = false; delete item.dataset.closing; }
    return;
  }
  const to = open ? item.offsetHeight : summary.offsetHeight;
  item.style.overflow = "hidden";
  answer?.animate({ opacity: open ? [0, 1] : [1, 0] }, { duration: open ? 260 : 180, easing: "linear", fill: "forwards" });
  const motion = item.animate({ height: [`${from}px`, `${to}px`] }, { duration: open ? 300 : 240, easing: EASE });
  motion.onfinish = () => {
    item.style.overflow = "";
    answer?.getAnimations().forEach((animation) => animation.cancel());
    if (!open) { item.open = false; delete item.dataset.closing; }
  };
}
