"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { InlineScript } from "@/components/site/inline-script";
import { escapeHtml } from "@/components/site/text";
import { ACCIDENTS, GROUPS, JUNK, photoSrc } from "./photos";
import { clamp, seeded } from "./river";
import { pageTop } from "./freeze";

/* 2. The dig: a pinned scene that sorts the roll as you scroll. Clutter falls away, near-duplicates fold into their
   moment, and the kept photos settle into ten Polaroids. With Reduce Motion, or on a screen tall enough to show it all,
   it shows the finished sort and doesn't pin. ?p=0.5 holds the scene at a set progress, for screenshots. */

const STOPS = [[0, 548], [0.12, 548], [0.36, 331], [0.58, 152], [0.84, 10], [1, 10]];
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/** Marks the scene still or held before the first paint, so it never pins and then jumps. */
const MARK = `(function(){var d=document.getElementById("dig");if(!d)return;if(new URLSearchParams(location.search).has("p"))d.classList.add("forced");else if(matchMedia("(prefers-reduced-motion: reduce)").matches||innerHeight>1700)d.classList.add("still")})()`;

type Tile = {
  el: HTMLElement; x: number; y: number; size: number; lag: number; q: number;
  type: 0 | 1 | 2; drift?: number; tx?: number; ty?: number; slot?: number[];
};

export function Dig({ dig, moments, lang }: { dig: Dictionary["dig"]; moments: Dictionary["moments"]; lang: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const pin = section.querySelector<HTMLElement>(".dig-pin")!, field = section.querySelector<HTMLElement>(".dig-field")!, foot = section.querySelector<HTMLElement>(".dig-foot")!;
    const digNum = section.querySelector<HTMLElement>(".dig-num")!, digUnit = section.querySelector<HTMLElement>(".dig-unit")!;
    const digLines = [...section.querySelectorAll<HTMLElement>(".dig-lines li")];
    const query = new URLSearchParams(location.search);
    const forced = query.has("p") ? Number(query.get("p")) : null;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (forced !== null) section.classList.add("forced");
    else if (calm || innerHeight > 1700) section.classList.add("still");
    const still = () => section.classList.contains("still");
    const rand = seeded(20261013);
    let tiles: Tile[] = [], frames: HTMLElement[] = [], fieldW = 0, fieldH = 0, painted = -1;

    function build() {
      field.textContent = "";
      tiles = []; frames = []; painted = -1;
      const W = (fieldW = field.clientWidth), H = (fieldH = field.clientHeight);
      const wide = W > 700;
      // Every tile is a different photo, so the grid holds at most as many tiles as there are photos.
      const shuffle = <T,>(list: T[]) => { for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; } return list; };
      const extras = shuffle([
        ...JUNK.map((id) => ({ src: photoSrc(id, "x"), fall: true, group: -1 })),
        ...ACCIDENTS.map((id) => ({ src: photoSrc(id), fall: true, group: -1 })),
        ...GROUPS.flatMap((g, group) => g.takes.filter((id) => !ACCIDENTS.includes(id)).map((id) => ({ src: photoSrc(id), fall: false, group })))
      ]);
      const total = 30 + extras.length;
      let cell = clamp(Math.floor(Math.sqrt((W * H) / total)), wide ? 48 : 34, wide ? 96 : 64);
      while (Math.floor(W / cell) * Math.floor(H / cell) > total) cell++;
      const cols = Math.floor(W / cell), rows = Math.floor(H / cell);
      const ox = (W - cols * cell) / 2, oy = (H - rows * cell) / 2, size = cell - Math.max(4, Math.round(cell * 0.09));
      const order = shuffle(Array.from({ length: cols * rows }, (_, i) => i));
      const keepers = order.slice(0, 30);
      let next = 0;
      const spot = (i: number) => [ox + (i % cols) * cell + 3, oy + Math.floor(i / cols) * cell + 3];

      // Where the ten Polaroids sit, and the three photo slots inside each one.
      const layout = wide ? [5, 5] : [2, 3, 3, 2];
      const colW = Math.min(W / Math.max(...layout), wide ? 220 : 150), rowH = H / layout.length;
      const pw = Math.min(colW * 0.88, (rowH * 0.9) / 1.08), ph = pw * 1.08;
      const pad = pw * 0.065, cw = pw - pad * 2, chh = cw * 0.86, gap = pw * 0.02;
      const slots: number[][][] = [];
      layout.forEach((n, r) => {
        for (let j = 0; j < n; j++) {
          const x = W / 2 + (j - (n - 1) / 2) * Math.min(colW, pw * 1.16) - pw / 2;
          const y = H / 2 + (r - (layout.length - 1) / 2) * Math.min(rowH, ph * 1.12) - ph / 2;
          slots.push([
            [x + pad, y + pad, cw * 0.62, chh],
            [x + pad + cw * 0.62 + gap, y + pad, cw * 0.38 - gap, (chh - gap) / 2],
            [x + pad + cw * 0.62 + gap, y + pad + (chh + gap) / 2, cw * 0.38 - gap, (chh - gap) / 2]
          ]);
          const frame = document.createElement("div");
          frame.className = "frame";
          frame.style.cssText = `width:${pw}px;height:${ph}px;transform:translate(${x}px,${y}px)`;
          frame.innerHTML = `<span style="font-size:${Math.max(11, pw * 0.125)}px">${escapeHtml(moments[GROUPS[slots.length - 1].key].name)}</span>`;
          field.appendChild(frame);
          frames.push(frame);
        }
      });

      for (let i = 0; i < cols * rows; i++) {
        const [x, y] = spot(i);
        const k = keepers.indexOf(i);
        const el = document.createElement("i");
        let tile: Pick<Tile, "type" | "drift" | "tx" | "ty" | "slot">;
        if (k >= 0) {
          const group = Math.floor(k / 3), part = k % 3;
          el.className = "t keep";
          el.innerHTML = `<img src="${photoSrc(GROUPS[group].keep[part], "m")}" alt="" decoding="async">`;
          tile = { type: 2, slot: slots[group][part] };
        } else {
          const extra = extras[next++];
          el.innerHTML = `<img src="${extra.src}" alt="" decoding="async">`;
          if (extra.fall) {
            el.className = "t shot";
            tile = { type: 0, drift: rand() - 0.5 };
          } else {
            const [tx, ty] = spot(keepers[extra.group * 3]);
            el.className = "t dup";
            tile = { type: 1, tx, ty };
          }
        }
        el.style.width = el.style.height = size + "px";
        field.appendChild(el);
        tiles.push({ el, x, y, size, lag: rand(), q: -1, ...tile });
      }
      // Decode every photo now, while the page is still on the hero, so none is decoded only as it scrolls into view.
      for (const img of field.querySelectorAll("img")) img.decode().catch(() => {});
      measure();
      shown = target = still() ? 1 : progress();
      paint(shown);
    }

    // Where the scene sits on the page, measured only when the page's size changes, so scrolling never forces a layout.
    // The view height is the pinned scene's own (the small viewport), not the window's, which grows and shrinks as the
    // iPhone's toolbar hides and shows and used to make the sort lurch.
    let top = 0, span = 1, bar = 64;
    function measure() {
      bar = document.getElementById("bar")?.offsetHeight ?? 64;
      top = pageTop(section);
      span = Math.max(1, section.offsetHeight - pin.offsetHeight);
    }
    function progress() {
      if (forced !== null) return forced;
      return clamp((scrollY + bar - top) / span);
    }

    function paint(p: number) {
      if (Math.abs(p - painted) < 0.0004) return;
      painted = p;
      // The ground lightens to paper and the footnote fades in as the moments form. Set on the two elements directly, not
      // as an inherited variable, so a frame restyles only them rather than every tile.
      const m = ease(clamp((p - 0.4) / 0.5));
      pin.style.background = `color-mix(in oklab, var(--dull), var(--paper) ${(m * 100).toFixed(1)}%)`;
      foot.style.opacity = m.toFixed(3);
      for (const t of tiles) {
        const s = t.el.style;
        if (t.type === 0) {
          const q = clamp((p - 0.12 - t.lag * 0.15) / 0.09);
          if (q === t.q) continue; t.q = q;
          s.transform = `translate(${t.x + t.drift! * 60 * q}px,${t.y + q * q * (fieldH - t.y + 60)}px) rotate(${t.drift! * 80 * q}deg)`;
          s.opacity = String(1 - q * q);
        } else if (t.type === 1) {
          const q = ease(clamp((p - 0.36 - t.lag * 0.13) / 0.09));
          if (q === t.q) continue; t.q = q;
          s.transform = `translate(${t.x + (t.tx! - t.x) * q}px,${t.y + (t.ty! - t.y) * q}px) scale(${1 - q})`;
          s.opacity = q > 0.97 ? "0" : "1";
        } else {
          const q = ease(clamp((p - 0.58 - t.lag * 0.08) / 0.16));
          if (q === t.q) continue; t.q = q;
          const [sx, sy, sw, sh] = t.slot!;
          s.transform = `translate(${t.x + (sx - t.x) * q}px,${t.y + (sy - t.y) * q}px)`;
          s.width = t.size + (sw - t.size) * q + "px";
          s.height = t.size + (sh - t.size) * q + "px";
          s.borderRadius = 16 - 13 * q + "%";
          s.zIndex = "2";
        }
      }
      frames.forEach((frame, i) => { frame.style.opacity = String(ease(clamp((p - 0.68 - i * 0.008) / 0.1))); });
      let n = 10;
      for (let i = 1; i < STOPS.length; i++) {
        if (p <= STOPS[i][0]) { const [a, va] = STOPS[i - 1], [b, vb] = STOPS[i]; n = Math.round(va + (vb - va) * ((p - a) / (b - a))); break; }
      }
      digNum.textContent = n.toLocaleString(lang);
      digUnit.textContent = n <= 10 ? dig.unitMoments : dig.unitPhotos;
      const line = p < 0.12 ? 0 : p < 0.36 ? 1 : p < 0.58 ? 2 : p < 0.84 ? 3 : 4;
      digLines.forEach((li, i) => li.classList.toggle("on", i === line));
    }

    // The scene eases toward the scroll position rather than jumping to it, so a frame that arrives late on a phone
    // reads as motion, not a stutter.
    let shown = 0, target = 0, frame = 0, following = false;
    const follow = () => {
      const gap = target - shown;
      shown = Math.abs(gap) < 0.001 ? target : shown + gap * 0.25;
      paint(shown);
      if (shown !== target) frame = requestAnimationFrame(follow);
      else following = false;
    };
    const onScroll = () => {
      if (still()) return;
      target = progress();
      if (!following) { following = true; frame = requestAnimationFrame(follow); }
    };
    const onResize = () => { if (Math.abs(field.clientWidth - fieldW) > 30) build(); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    const pageSize = new ResizeObserver(() => { measure(); onScroll(); });
    pageSize.observe(document.body);
    // The tiles' own layers, only while the scene is on screen (story.css, .dig-field.live).
    // The last entry is the newest, when a fast scroll brings more than one at once.
    const onScreen = new IntersectionObserver((entries) => field.classList.toggle("live", entries.at(-1)!.isIntersecting && !still()));
    onScreen.observe(field);
    build();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      pageSize.disconnect();
      onScreen.disconnect();
    };
    // The copy is fixed for the page's lifetime, so this runs once.
  }, []);

  return (
    <>
      <section className="dig" id="dig" ref={sectionRef} aria-label={dig.label} suppressHydrationWarning>
        <div className="dig-pin">
          <div className="dig-head">
            <p className="dig-count"><span className="dig-num">548</span> <small className="dig-unit">{dig.unitPhotos}</small></p>
            <ol className="dig-lines">
              {dig.lines.map((line, i) => <li key={i} className={i ? undefined : "on"}>{line}</li>)}
            </ol>
          </div>
          <div className="dig-field" />
          <p className="dig-foot">{dig.foot}</p>
        </div>
      </section>
      <InlineScript html={MARK} />
    </>
  );
}
