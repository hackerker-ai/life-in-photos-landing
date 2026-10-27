"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { fill } from "@/components/site/text";
import { Clauses } from "@/components/site/clauses";
import { Friend, type FriendHandle } from "./friend";
import { PLAY, photoSrc } from "./photos";
import { Polaroid } from "./polaroid";
import { useStory } from "./story-state";

/* 3. Your turn: three moments, Keep, Later or Skip. The whole app in miniature. A kept moment's cover lifts out of the
   card into the tray below, and later lands on the invitation's wall. */

type Act = "keep" | "later" | "skip";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Play({ play, friends }: { play: Dictionary["play"]; friends: Dictionary["friends"] }) {
  const { kept, setKept } = useStory();
  const [turn, setTurn] = useState(0);
  const [later, setLater] = useState(0);
  const [leaving, setLeaving] = useState<Act | null>(null);
  const [fresh, setFresh] = useState(false);
  const [hinting, setHinting] = useState(true);
  const [inView, setInView] = useState(false);
  const deck = useRef<HTMLDivElement>(null);
  const tray = useRef<HTMLDivElement>(null);
  const nori = useRef<FriendHandle>(null), momo = useRef<FriendHandle>(null), flip = useRef<FriendHandle>(null);
  const locked = useRef(false);
  const hintingNow = useRef(true);
  const flight = useRef<DOMRect | "calm" | null>(null);

  // The hint: while nobody has tapped yet and the card is in view, the buttons glow in turn; Nori waves the first time.
  useEffect(() => {
    let waved = false;
    const watch = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (hintingNow.current && entry.isIntersecting && !waved && !reduceMotion()) { waved = true; nori.current?.act("wave"); }
    }, { threshold: 0.6 });
    watch.observe(deck.current!);
    return () => watch.disconnect();
  }, []);

  /* Keep: the cover photo lifts out of the card and shrinks into its place in the tray, already a Polaroid (FLIP). */
  useLayoutEffect(() => {
    const from = flight.current;
    flight.current = null;
    const pol = tray.current?.querySelector<HTMLElement>(".pol:last-of-type");
    if (!from || !pol) return;
    if (from === "calm") { pol.animate({ opacity: [0, 1] }, { duration: 150 }); return; }
    const image = pol.querySelector("img")!;
    const to = image.getBoundingClientRect(), box = pol.getBoundingClientRect();
    const cx = to.left + to.width / 2, cy = to.top + to.height / 2;
    pol.classList.add("flying");
    pol.style.transformOrigin = `${cx - box.left}px ${cy - box.top}px`;
    const rest = getComputedStyle(pol).rotate;
    pol.animate([
      { transform: `translate(${from.left + from.width / 2 - cx}px, ${from.top + from.height / 2 - cy}px) scale(${from.width / to.width})`, rotate: "0deg" },
      { transform: "none", rotate: rest }
    ], { duration: 480, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }).finished.then(() => { pol.classList.remove("flying"); pol.style.transformOrigin = ""; });
  }, [kept]);

  async function choose(act: Act | "again") {
    if (locked.current) return;
    if (act === "again") { setTurn(0); setKept([]); setLater(0); setFresh(true); return; }
    locked.current = true;
    const calm = reduceMotion();
    if (hintingNow.current) { hintingNow.current = false; setHinting(false); }
    if (act === "keep") {
      const cover = deck.current!.querySelector(".mosaic img")!;
      flight.current = calm ? "calm" : cover.getBoundingClientRect();
      setKept((list) => [...list, turn]);
      momo.current?.act("hop");
    }
    if (act === "later") { setLater((n) => n + 1); nori.current?.act("nod"); }
    if (act === "skip") flip.current?.act("tilt");
    setLeaving(act);
    await sleep(calm ? 150 : 250);
    setTurn((n) => n + 1);
    setLeaving(null);
    setFresh(true);
    locked.current = false;
  }

  const card = turn < PLAY.length ? PLAY[turn] : null;
  const copy = card ? play.cards[turn] : null;
  const tally = [kept.length && fill(play.tallyKept, { n: kept.length }), later && fill(play.tallyLater, { n: later })].filter(Boolean).join(play.tallyJoin) || play.tallyNone;
  // Keep lifts the cover out to the tray, so the card's own copy hides; with Reduce Motion it just fades.
  const lifted = leaving === "keep" && !reduceMotionSafe();
  const cardClass = ["card", card ? "" : "end", fresh ? "in" : "", leaving ?? ""].filter(Boolean).join(" ");

  return (
    <section className={hinting && inView ? "play hint" : "play"} id="play">
      <div className="wrap play-grid">
        <div className="play-copy">
          <h2 className="display"><Clauses text={play.title} /></h2>
          <p>{play.body}</p>
          <div className="crew">
            <Friend who="nori" id="playNori" label={friends.nori} ref={nori} />
            <Friend who="momo" id="playMomo" label={friends.momo} ref={momo} />
            <Friend who="flip" id="playFlip" label={friends.flip} ref={flip} />
          </div>
        </div>
        <div>
          <div className="deck" id="deck" ref={deck} aria-live="polite">
            {card && copy ? (
              <article key={turn} className={cardClass}>
                <div className="ticks">
                  {PLAY.map((_, i) => <b key={i} className={i < turn ? "done" : undefined} />)}
                  <span>{fill(play.count, { n: turn + 1, total: PLAY.length })}</span>
                </div>
                <h3>{copy.title}</h3>
                <p className="meta">{copy.meta}</p>
                <p className="why">{copy.why}</p>
                <div className="mosaic">
                  {card.photos.map((id, i) => <img key={id} className={i === 0 && lifted ? "lifted" : undefined} src={photoSrc(id, "m")} alt="" decoding="async" />)}
                </div>
                <div className="acts">
                  <button type="button" data-act="keep" onClick={() => choose("keep")}>{play.keep}</button>
                  <button type="button" data-act="later" onClick={() => choose("later")}>{play.later}</button>
                  <button type="button" data-act="skip" onClick={() => choose("skip")}>{play.skip}</button>
                </div>
                <div className="acts-why"><span>{play.keepWhy}</span><span>{play.laterWhy}</span><span>{play.skipWhy}</span></div>
              </article>
            ) : (
              <article key="end" className={cardClass}>
                <h3>{play.endTitle}</h3>
                <p>{fill(play.endBody, { tally })}</p>
                <div className="row">
                  <a className="btn" href="#invite">{play.endCta}</a>
                  <button className="btn ghost" type="button" data-act="again" onClick={() => choose("again")}>{play.again}</button>
                </div>
              </article>
            )}
          </div>
          <div className="deck tray" id="tray" ref={tray} aria-label={play.trayLabel}>
            {hinting ? (
              <div className="nudge" id="nudge">
                <svg className="curl" width="44" height="46" viewBox="0 0 44 46" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 44C5 35 8 24 18 26c9 2 8 13 0 12-8-1-4-20 6-33" /><path d="M16.5 7.8L24 5l-1.3 7.9" /></svg>
                <p className="bubble">{play.nudge}</p>
              </div>
            ) : null}
            <span id="trayLabel" hidden={!kept.length}>{play.trayKept}</span>
            {kept.map((i) => <Polaroid key={i} id={PLAY[i].cover} caption={play.cards[i].name} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function reduceMotionSafe() {
  return typeof window !== "undefined" && reduceMotion();
}
