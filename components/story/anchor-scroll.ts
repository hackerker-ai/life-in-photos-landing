/* In-page links (Find your moments, the footer's links) that always arrive. The browser's own smooth scroll aims at
   where the section was when the link was tapped; on an iPhone the toolbar can collapse and the page shift under it on
   the way, and it stops short. Here the page scrolls to the section, checks where it came to rest, and goes on from
   there until it is on target, unless the visitor takes over by touching or scrolling. */

const SETTLED_FRAMES = 6;
const MAX_CORRECTIONS = 3;

export function steerInPageLinks() {
  let journey = 0;

  const go = (id: string, jump = false) => {
    const target = id === "top" ? null : document.getElementById(id);
    if (id !== "top" && !target) return false;
    const mine = ++journey;
    const smooth = !jump && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const aim = () => (target ? Math.max(0, Math.round(target.getBoundingClientRect().top + scrollY - padding)) : 0);
    scrollTo({ top: aim(), behavior: smooth ? "smooth" : "auto" });

    let last = -1, steady = 0, corrections = 0;
    const check = () => {
      if (mine !== journey) return;
      steady = Math.abs(scrollY - last) < 1 ? steady + 1 : 0;
      last = scrollY;
      if (steady >= SETTLED_FRAMES) {
        const want = aim();
        // Within a couple of pixels, or nowhere further to go (the end of the page): arrived.
        if (Math.abs(scrollY - want) <= 2 || corrections >= MAX_CORRECTIONS) return;
        corrections++;
        steady = 0;
        scrollTo({ top: want, behavior: smooth ? "smooth" : "auto" });
      }
      requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
    return true;
  };

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest?.("a[href^='#']");
    const id = link?.getAttribute("href")?.slice(1);
    if (!id || !go(id)) return;
    event.preventDefault();
    if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
  };
  // The visitor taking over ends the journey.
  const takeOver = () => { journey++; };

  document.addEventListener("click", onClick);
  // Opened with a section in the address (a shared link, a reload after tapping Find your moments): the browser jumps
  // there while the page is still loading, before fonts and late layout settle, so settle the visit there once more,
  // unless the visitor has already started scrolling.
  const opened = location.hash.slice(1);
  if (opened) {
    const before = journey;
    document.fonts.ready.then(() => requestAnimationFrame(() => { if (journey === before) go(opened, true); }));
  }
  addEventListener("touchstart", takeOver, { passive: true });
  addEventListener("wheel", takeOver, { passive: true });
  return () => {
    document.removeEventListener("click", onClick);
    removeEventListener("touchstart", takeOver);
    removeEventListener("wheel", takeOver);
  };
}
