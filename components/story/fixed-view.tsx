"use client";

import { useEffect } from "react";
import { InlineScript } from "@/components/site/inline-script";

/* The view's height, read once as the page opens and kept until the width changes (a rotation). Safari keeps its
   viewport units and height media queries fixed while its toolbar shows and hides, but in-app browsers (Instagram,
   Threads, LINE…) resize the whole page as their bars collapse, so every height laid out from the view changed with
   them and the page jumped by several times the bars' height. The page lays out from these instead (story.css):

   - --view-s and --view-l: 100svh and 100lvh, in px.
   - .view-680, .view-700, .view-760, .view-820: the view is at most that tall, as the media query would say.
   - .view-squat: the view is at least 393 wide to 880 tall.

   Set on <html> (whose attributes React leaves alone, see the layout), and left there: nothing else reads them.
   Self-contained: its source runs as is before the first paint (FIX_VIEW). */
function fixView() {
  const root = document.documentElement;
  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;top:0;width:0;visibility:hidden;pointer-events:none";
  document.body.append(probe);
  for (const [name, height] of [["--view-s", "100svh"], ["--view-l", "100lvh"]]) {
    probe.style.height = height;
    root.style.setProperty(name, probe.offsetHeight + "px");
  }
  probe.remove();
  for (const height of [680, 700, 760, 820]) root.classList.toggle("view-" + height, matchMedia("(max-height: " + height + "px)").matches);
  root.classList.toggle("view-squat", matchMedia("(min-aspect-ratio: 393 / 880)").matches);
}

const FIX_VIEW = `(${fixView.toString()})()`;

export function FixedView() {
  useEffect(() => {
    // Arrived from another page, where the script came as text and didn't run.
    if (!document.documentElement.style.getPropertyValue("--view-s")) fixView();
    // A mouse and a resizable window: follow the window as it is resized. On touch screens only a new width counts,
    // since that's a rotation and not the browser's bars.
    const desk = matchMedia("(hover: hover) and (pointer: fine)");
    let width = innerWidth;
    const onResize = () => {
      if (innerWidth === width && !desk.matches) return;
      width = innerWidth;
      fixView();
    };
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  }, []);

  return <InlineScript html={FIX_VIEW} />;
}
