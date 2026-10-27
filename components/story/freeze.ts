/* On phones the whole page below the header holds still while the beta parents' notes slide sideways (pinned-slide.tsx
   sets it up): over that stretch of scroll the page content (.story-flow) is moved down exactly as far as the page
   scrolled, then stays moved by the whole stretch (--freeze-d), so everything after it sits that much lower than its
   layout says. These turn an element into the scroll position code should use for it, whatever the page is doing at the
   moment of measuring. */

/** Where an element sits in the page's layout, ignoring any transform (the freeze's included). */
export function layoutTop(el: HTMLElement) {
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
  return y;
}

/** Where an element shows on the page once you have scrolled it to the top of the view, under the header: its layout
    position, plus the freeze's stretch for anything that only gets there after the page has moved on (whatever sits
    below the top of the held view, data-freeze-from). */
export function pageTop(el: HTMLElement) {
  const top = layoutTop(el);
  const flow = el.closest<HTMLElement>(".story-flow.freezing");
  if (!flow) return top;
  return top >= Number(flow.dataset.freezeFrom) ? top + Number(flow.dataset.freezeHeld) : top;
}
