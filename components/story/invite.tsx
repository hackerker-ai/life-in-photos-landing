"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Logo } from "@/components/site/logo";
import { useWaitlistSignup } from "@/components/waitlist-form";
import { Clauses } from "@/components/site/clauses";
import { PLAY } from "./photos";
import { Polaroid } from "./polaroid";
import { useStory } from "./story-state";

/* 7. The wall and the invitation. The wall shows our three moments until the visitor keeps some in the demo; theirs
   wait off the wall until it comes into view, then get pressed on one by one. Joining the beta puts the visitor's own
   Polaroid in the first empty frame, developing like an instant photo. */

type InviteProps = { invite: Dictionary["invite"]; cards: Dictionary["play"]["cards"]; lang: string };

export function Invite({ invite, cards, lang }: InviteProps) {
  const { kept, signedUp, setSignedUp } = useStory();
  const wall = useRef<HTMLDivElement>(null);
  const [wallInView, setWallInView] = useState(false);
  // Kept moments already pressed onto the wall, with the delay each one used.
  const [pinned, setPinned] = useState<Record<number, number>>({});

  useEffect(() => {
    const watch = new IntersectionObserver(([entry]) => setWallInView(entry.isIntersecting), { threshold: 0.5 });
    watch.observe(wall.current!);
    return () => watch.disconnect();
  }, []);

  useEffect(() => {
    // Play again empties the wall's kept moments, so the next ones get pressed on afresh.
    if (!kept.length) { setPinned((now) => (Object.keys(now).length ? {} : now)); return; }
    if (!wallInView) return;
    const waiting = kept.filter((i) => !(i in pinned));
    if (!waiting.length) return;
    setPinned((now) => ({ ...now, ...Object.fromEntries(waiting.map((i, n) => [i, Math.min(n * 0.12, 0.3)])) }));
  }, [kept, wallInView, pinned]);

  const shown = kept.length ? kept : PLAY.map((_, i) => i);
  const empties = Math.max(0, Math.max(1, 5 - shown.length) - (signedUp ? 1 : 0));
  const note = kept.length ? (kept.length === 1 ? invite.wallNoteKeptOne : invite.wallNoteKeptMany) : invite.wallNote;

  return (
    <section className="invite" id="invite">
      <div className="wrap invite-grid">
        <div className="invite-copy">
          <h2 className="display"><Clauses text={invite.title} /></h2>
          <div className="wall" id="wall" ref={wall} aria-label={invite.wallLabel}>
            {shown.map((i) => {
              const state = !kept.length ? undefined : i in pinned ? "pin" : "waiting";
              const style = state === "pin" ? ({ "--delay": `${pinned[i]}s` } as CSSProperties) : undefined;
              return <Polaroid key={i} id={PLAY[i].cover} caption={cards[i].name} className={state} style={style} />;
            })}
            {signedUp ? (
              <figure className="pol mine pin develop">
                <div className="dev"><Logo size={24} /></div>
                <figcaption>{invite.mine}</figcaption>
              </figure>
            ) : null}
            {Array.from({ length: empties }, (_, i) => <div key={`empty-${i}`} className="empty">{invite.empty}</div>)}
          </div>
          <p className="wall-note" id="wallNote">{note}</p>
          <InviteForm invite={invite} lang={lang} onJoined={() => setSignedUp(true)} />
        </div>
        <img className="trio" src="/friends/trio-polaroid.webp" width={1229} height={1400} alt={invite.trioAlt} />
      </div>
    </section>
  );
}

function InviteForm({ invite, lang, onJoined }: { invite: Dictionary["invite"]; lang: string; onJoined: () => void }) {
  const { state, submit } = useWaitlistSignup("invite", lang);
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("email") as HTMLInputElement;
    if (!input.checkValidity()) { setStatus(invite.status.invalid); return; }
    setStatus("");
    const result = await submit(input.value.trim(), new FormData(form).get("website"));
    setStatus(invite.status[result.code] ?? result.message);
    if (result.ok) { input.value = ""; onJoined(); }
  }

  return (
    <form id="inviteForm" noValidate onSubmit={onSubmit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="inviteWebsite">{invite.honeypot}</label>
        <input id="inviteWebsite" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor="inviteEmail">{invite.label}</label>
      <div className="field">
        <input id="inviteEmail" className="ph-no-capture" name="email" type="email" placeholder={invite.placeholder} autoComplete="email" required disabled={state === "submitting"} />
        <button className="btn" type="submit" disabled={state === "submitting"}>{invite.submit}</button>
      </div>
      <p className="status" id="inviteStatus" role="status">{status}</p>
    </form>
  );
}
