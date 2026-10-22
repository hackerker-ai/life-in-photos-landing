import { POOL, RIVER_OUT, photoSrc } from "./photos";

/* The river: thumbnails ride the ribbon into the phone, Polaroids ride out. Built straight into the SVG, since it is
   decorative (aria-hidden) and moves every frame. Photos of stuff are drawn as grey cards with two bars, the same look as
   the sorting scene's clutter tiles, never photographed. */

const SHOTS = ["#EAE6DC", "#DDD7CA", "#D2CBBB"];
const PHOTOS = ["#B9CC92", "#E6B7A6", "#F0D49A", "#B4C2E0", "#9FC0B8", "#CFE0B4"];
const BAR = "#C6BEAD";

export const seeded = (seed: number) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

type Point = [number, number];

function sample(path: SVGPathElement, n = 260): Point[] {
  const length = path.getTotalLength();
  return Array.from({ length: n + 1 }, (_, i) => {
    const p = path.getPointAtLength((length * i) / n);
    return [p.x, p.y];
  });
}

function along(points: Point[], t: number): [number, number, number] {
  const f = clamp(t) * (points.length - 1);
  const i = Math.min(points.length - 2, Math.floor(f));
  const [ax, ay] = points[i], [bx, by] = points[i + 1];
  return [ax + (bx - ax) * (f - i), ay + (by - ay) * (f - i), Math.atan2(by - ay, bx - ax) * 57.3];
}

/** Fills one river map and returns a painter that places every item at a time in seconds. */
export function makeRiver(svg: SVGSVGElement, rand: () => number) {
  const NS = svg.namespaceURI;
  const lanes = { in: sample(svg.querySelector<SVGPathElement>(".in")!), out: sample(svg.querySelector<SVGPathElement>(".out")!) };
  const size = Number(svg.dataset.tile), count = Number(svg.dataset.count);
  const layer = svg.querySelector(".flow")!;
  layer.replaceChildren();
  svg.querySelector("clipPath")?.remove();
  const items: { g: SVGGElement; lane: Point[]; offset: number; period: number; spin: number; tilt: number }[] = [];
  const clip = "tile-" + svg.classList[1];
  layer.insertAdjacentHTML("beforebegin", `<clipPath id="${clip}" clipPathUnits="objectBoundingBox"><rect width="1" height="1" rx="0.18"/></clipPath>`);
  const add = (markup: string, item: Omit<(typeof items)[number], "g">) => {
    const g = document.createElementNS(NS, "g") as SVGGElement;
    g.innerHTML = markup;
    layer.appendChild(g);
    items.push({ g, ...item });
  };
  const h = size / 2;
  for (let i = 0; i < count; i++) {
    const shot = rand() < 0.6;
    const fill = (shot ? SHOTS : PHOTOS)[Math.floor(rand() * (shot ? 3 : 6))];
    // The two bars sit where the sorting scene's .t.shot background puts them.
    const picture = shot
      ? `<rect x="${-h + size * 0.0864}" y="${-h + size * 0.273}" width="${size * 0.52}" height="${size * 0.09}" fill="${BAR}"/><rect x="${-h + size * 0.1188}" y="${-h + size * 0.4732}" width="${size * 0.34}" height="${size * 0.09}" fill="${BAR}"/>`
      : `<image href="${photoSrc(POOL[i % POOL.length])}" x="${-h}" y="${-h}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clip})"/>`;
    add(
      `<rect x="${-h}" y="${-h}" width="${size}" height="${size}" rx="${size * 0.18}" fill="${fill}"/>${picture}<rect x="${-h}" y="${-h}" width="${size}" height="${size}" rx="${size * 0.18}" fill="none" stroke="#fff" stroke-width="${size * 0.09}"/>`,
      { lane: lanes.in, offset: i / count, period: 30, spin: 1, tilt: 0 }
    );
  }
  const w = size * 2.1, ph = w * 1.2;
  RIVER_OUT.forEach((id, i) => {
    add(
      `<rect x="${-w / 2}" y="${-ph / 2 + 3}" width="${w}" height="${ph}" rx="${w * 0.04}" fill="rgba(41,36,24,.16)"/><rect x="${-w / 2}" y="${-ph / 2}" width="${w}" height="${ph}" rx="${w * 0.04}" fill="#fff"/><image href="${photoSrc(id)}" x="${-w * 0.43}" y="${-ph / 2 + w * 0.07}" width="${w * 0.86}" height="${w * 0.86}" preserveAspectRatio="xMidYMid slice"/>`,
      { lane: lanes.out, offset: i / RIVER_OUT.length, period: 22, spin: 0, tilt: i % 2 ? 7 : -6 }
    );
  });
  return (seconds: number) => {
    for (const item of items) {
      const [x, y, angle] = along(item.lane, (item.offset + seconds / item.period) % 1);
      item.g.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(angle * item.spin + item.tilt).toFixed(1)})`);
    }
  };
}
