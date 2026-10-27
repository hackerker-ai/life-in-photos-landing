"use client";

import { useImperativeHandle, useRef, useState, type Ref } from "react";

/* Friends: sharp still poses. A reaction swaps in its pose and moves the whole still once (hop, dip, tilt or bob), then
   returns to rest; with Reduce Motion only the pose changes. Every pose is already in place and decoded, stacked, so a
   reaction only switches which one is visible and there is never an empty frame while an image loads. */

export type Who = "momo" | "flip" | "nori";
type Move = "hop" | "dip" | "tilt" | "bob";

const ACTS: Record<Who, Record<string, [pose: string, move: Move, ms: number]>> = {
  momo: { hop: ["keep", "hop", 720], wave: ["wave", "bob", 900] },
  nori: { nod: ["later", "dip", 900], wave: ["wave", "bob", 900] },
  flip: { tilt: ["skip", "tilt", 800], boing: ["front", "hop", 720] }
};
/** A friend that rests in another pose than "front": Nori humming, Flip tilting his head, Flip peeking over the phone. */
const REST: Record<string, string> = { hum: "hum", tilt: "skip", peek: "peek" };

export type FriendHandle = { act: (name: string) => void };

type FriendProps = {
  who: Who;
  label: string;
  pose?: "hum" | "tilt" | "peek";
  id?: string;
  ref?: Ref<FriendHandle>;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function Friend({ who, label, pose, id, ref }: FriendProps) {
  const rest = (pose && REST[pose]) || "front";
  // The peek keeps its pose (it is half hidden by the phone) and only moves.
  const poses = [...new Set([rest, ...(rest === "peek" ? [] : Object.values(ACTS[who]).map(([name]) => name))])];
  const [shown, setShown] = useState(rest);
  const button = useRef<HTMLButtonElement>(null);
  const run = useRef(0);
  const last = useRef("");

  async function act(name: string) {
    const el = button.current;
    if (!el) return;
    const [next, move, ms] = ACTS[who][name] || [rest, "hop", 720];
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mine = ++run.current;
    if (poses.includes(next)) setShown(next);
    el.dataset.move = "";
    void el.offsetWidth;
    el.dataset.move = move;
    await sleep(calm ? 700 : ms);
    if (mine !== run.current) return;
    el.dataset.move = "";
    setShown(rest);
  }

  useImperativeHandle(ref, () => ({ act }));

  function tap() {
    const names = Object.keys(ACTS[who]).filter((name) => name !== last.current);
    last.current = names[Math.floor(Math.random() * names.length)];
    act(last.current);
  }

  return (
    <button
      ref={button}
      type="button"
      className={rest === "peek" ? "friend peek" : "friend"}
      id={id}
      data-who={who}
      data-pose={pose}
      aria-label={label}
      onClick={tap}
    >
      {poses.map((name) => (
        <img key={name} className={name === shown ? "on" : undefined} src={`/friends/${who}-${name}.webp`} alt="" decoding="async" />
      ))}
    </button>
  );
}
