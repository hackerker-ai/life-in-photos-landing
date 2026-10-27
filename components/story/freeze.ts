/* On phones the whole page below the header holds still while the parents' notes slide sideways (pinned-slide.tsx
   sets it up): the page content (.story-flow) is sticky for that stretch of scroll, so once the page moves on everything
   in it sits that stretch (data-freeze-held) lower than its layout says. These turn an element into the scroll position
   code should use for it, whatever the page is doing at the moment of measuring. */

/** Where an element sits in the page's layout, ignoring the hold. (The content is the offsetParent of what's in it, and
    while it holds its own offsetTop includes how far it has been held, so its unheld top, data-layout-top, is used.) */
export function layoutTop(el: HTMLElement) {
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
    if (n.classList.contains("freezing")) return y + Number(n.dataset.layoutTop);
    y += n.offsetTop;
  }
  return y;
}

/** Where an element shows on the page once you have scrolled it to the top of the view, under the header: its layout
    position, plus the hold's stretch for anything that only gets there after the page has moved on (whatever sits
    below the top of the held view, data-freeze-from). */
export function pageTop(el: HTMLElement) {
  const top = layoutTop(el);
  const flow = el.closest<HTMLElement>(".story-flow.freezing");
  if (!flow) return top;
  return top >= Number(flow.dataset.freezeFrom) ? top + Number(flow.dataset.freezeHeld) : top;
}
