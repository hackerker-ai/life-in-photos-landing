import type { Dictionary } from "@/app/[lang]/dictionaries";
import { escapeHtml as esc, fill } from "@/components/site/text";
import { GROUPS, momentShots, photoSrc, type PhotoGroup } from "./photos";

/* Hero phone: a review session in the app, playing through the ten moments from the sorting scene. Each moment comes up,
   a fingertip taps Keep, Later or Skip, the ticks fill in, and the next one arrives. The screen is laid out at the app's
   390 pt and scaled to the phone. It is aria-hidden (the phone carries the description), so it is built as markup. */

type Copy = { session: Dictionary["hero"]["session"]; moments: Dictionary["moments"]; acts: { keep: string; later: string; skip: string } };
type Act = "keep" | "later" | "skip";

const CHOICES: Act[] = ["keep", "keep", "later", "keep", "skip", "keep", "keep", "later", "keep", "keep"];
// The moments that also get opened full screen.
const FULL = [0, 3, 6];
const SPANS = [4, 3, 3, 3, 4, 3, 3, 3, 4, 3, 4, 3];
const BACK = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
const photo = (id: number, size: "s" | "m") => `<img src="${photoSrc(id, size)}" alt="" decoding="async">`;

function momentMarkup(g: PhotoGroup, copy: Copy) {
  const shots = momentShots(g), m = copy.moments[g.key];
  return `<p class="s-title">${esc(m.name)}</p><p class="s-meta">${esc(fill(copy.session.photos, { n: shots.length }))}</p><p class="s-notes">${esc(m.note)}</p><div class="s-mosaic"><div class="s-track">${shots.map((s, k) => `<i style="grid-row: span ${SPANS[k % SPANS.length]}">${photo(s.id, s.size)}</i>`).join("")}</div></div>`;
}

function fullMarkup(g: PhotoGroup, copy: Copy) {
  const shots = momentShots(g);
  return `<div class="fs-inner"><div class="fs-strip">${shots.map((s, k) => `<img src="${photoSrc(s.id, s.size)}" alt=""${k > 2 ? ' loading="lazy"' : ""}>`).join("")}</div></div><div class="fs-nav">${BACK}${esc(copy.moments[g.key].name)}</div><span class="fs-count">1 / ${shots.length}</span><div class="fs-dots">${shots.slice(0, 9).map((_, k) => `<b${k ? "" : ' class="on"'}></b>`).join("")}</div>`;
}

/** The screen as it first appears (the first moment, waiting), rendered on the server. */
export function heroScreenMarkup(copy: Copy) {
  const ticks = Array.from({ length: 10 }, (_, k) => (k ? "<b></b>" : '<b class="now"></b>')).join("");
  const acts = (["keep", "later", "skip"] as const).map((a) => `<span data-a="${a}">${esc(copy.acts[a])}<i class="tap"></i></span>`).join("");
  return `<div class="s-top">${BACK}<div class="s-ticks">${ticks}</div><span class="s-count">${esc(fill(copy.session.count, { n: 1, total: 10 }))}</span></div><div class="hm">${momentMarkup(GROUPS[0], copy)}</div><div class="s-acts">${acts}</div><div class="fs"></div><i class="finger"></i>`;
}

/** The scale (--z) that fits the 390 pt screen into the phone; also run inline before the first paint. */
export const FIT_HERO = `(function(){var s=document.getElementById("heroScreen");if(!s)return;var p=s.parentElement,c=getComputedStyle(p);s.style.setProperty("--z",((p.clientWidth-parseFloat(c.paddingLeft)-parseFloat(c.paddingRight))/390).toFixed(4))})()`;

export function fitHero(screen: HTMLElement) {
  const phone = screen.parentElement!, cs = getComputedStyle(phone);
  screen.style.setProperty("--z", ((phone.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) / 390).toFixed(4));
}

/** Plays the session in a loop while `visible()` is true; stops for good once `alive()` turns false. */
export async function runHeroSession(screen: HTMLElement, copy: Copy, visible: () => boolean, alive: () => boolean) {
  const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = screen) => r.querySelector<T>(s)!;
  const $$ = (s: string, r: ParentNode = screen) => [...r.querySelectorAll<HTMLElement>(s)];
  class Stopped extends Error {}
  const sleep = async (ms: number) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    if (!alive()) throw new Stopped();
  };
  const wait = async (ms: number) => {
    await sleep(ms);
    while (!visible() || document.hidden) await sleep(300);
  };
  const fs = $(".fs"), finger = $(".finger"), ticks = $$(".s-ticks b"), count = $(".s-count"), acts = $(".s-acts");
  // Where an element sits in the screen's own 390-point space.
  const at = (el: Element, fx = 0.5, fy = 0.5): [number, number] => {
    const z = Number(screen.style.getPropertyValue("--z")) || 1, s = screen.getBoundingClientRect(), r = el.getBoundingClientRect();
    return [(r.left + r.width * fx - s.left) / z, (r.top + r.height * fy - s.top) / z];
  };
  const moveFinger = (x: number, y: number) => { finger.style.left = `${x}px`; finger.style.top = `${y}px`; };
  const heroAt = (i: number, results: Act[]) => {
    ticks.forEach((b, k) => { b.className = k < i ? { keep: "k", later: "l", skip: "s" }[results[k]] : k === i ? "now" : ""; });
    count.textContent = fill(copy.session.count, { n: Math.min(i + 1, 10), total: 10 });
  };
  const hm = () => $(".hm");

  // Every photo the session shows, decoded ahead so a moment never arrives half-loaded.
  GROUPS.forEach((g) => momentShots(g).forEach((s) => { new Image().src = photoSrc(s.id, s.size); }));

  try {
    for (;;) {
      const results: Act[] = [];
      for (let i = 0; i < 10; i++) {
        heroAt(i, results);
        const body = hm();
        body.className = "hm in";
        body.innerHTML = momentMarkup(GROUPS[i], copy);
        await wait(1300);
        // Scroll through the moment's photos, as a thumb would.
        const mosaic = $(".s-mosaic", body), track = $(".s-track", body);
        const reach = Math.max(0, track.scrollHeight - mosaic.clientHeight);
        const full = FULL.includes(i);
        // Only scroll when there is a real screenful more to see.
        if (reach > 60) {
          const [mx, my] = at(mosaic, 0.5, 0.82);
          finger.classList.remove("slow"); moveFinger(mx, my);
          await sleep(40);
          finger.classList.add("on", "slow");
          track.style.transform = `translateY(${-reach}px)`;
          moveFinger(mx, my - Math.min(reach, 240));
          await wait(1300);
          finger.classList.remove("on");
          await wait(500);
          if (full) {
            track.style.transform = "";
            await wait(1250);
          }
        }
        // Open the first photo full screen, swipe to the next, then go back.
        if (full) {
          finger.classList.remove("slow");
          fs.innerHTML = fullMarkup(GROUPS[i], copy);
          moveFinger(...at($(".s-track i", body)));
          await sleep(60);
          finger.classList.add("on");
          await wait(520);
          finger.classList.add("down");
          await sleep(160);
          finger.classList.remove("down", "on");
          fs.classList.add("on");
          await wait(1100);
          moveFinger(300, 470);
          await sleep(60);
          finger.classList.add("on");
          await sleep(220);
          moveFinger(90, 470);
          $(".fs-strip", fs).style.transform = "translateX(-100%)";
          $(".fs-count", fs).textContent = `2 / ${momentShots(GROUPS[i]).length}`;
          $$(".fs-dots b", fs).forEach((b, k) => b.classList.toggle("on", k === 1));
          await sleep(480);
          finger.classList.remove("on");
          await wait(1100);
          moveFinger(28, 84);
          await sleep(60);
          finger.classList.add("on");
          await wait(520);
          finger.classList.add("down");
          await sleep(160);
          finger.classList.remove("down", "on");
          fs.classList.remove("on");
          await wait(500);
        }
        const act = CHOICES[i], button = $(`[data-a="${act}"]`, acts), tap = $(".tap", button);
        tap.classList.add("on");
        await wait(380);
        tap.classList.add("down"); button.classList.add("press");
        await sleep(160);
        tap.classList.remove("down", "on"); button.classList.remove("press");
        body.className = `hm out-${act}`;
        results.push(act);
        await sleep(340);
      }
      heroAt(10, results);
      const kept = results.filter((r) => r === "keep").length, later = results.filter((r) => r === "later").length;
      const body = hm();
      body.className = "hm in";
      body.innerHTML = `<div class="hm-end"><b>${kept}</b><strong>${esc(copy.session.endKept)}</strong><span>${esc(fill(copy.session.endRest, { later, skipped: 10 - kept - later }))}</span></div>`;
      await wait(2600);
      body.className = "hm out-keep";
      await sleep(340);
    }
  } catch (error) {
    if (!(error instanceof Stopped)) throw error;
  }
}
