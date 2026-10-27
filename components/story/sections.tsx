import type { Dictionary } from "@/app/[lang]/dictionaries";
import { RichText } from "@/components/site/rich-text";
import { Clauses } from "@/components/site/clauses";
import { FaqAccordion } from "./faq-accordion";
import { Friend } from "./friend";
import { Check, Go, Plus } from "./icons";
import { photoSrc } from "./photos";
import { PinnedSlide } from "./pinned-slide";

/* The quieter sections between the demo and the invitation: what the app does, the promise about the Photos library,
   the beta parents' notes and the common questions. */

const Thumb = ({ id, keep = false }: { id: number; keep?: boolean }) => (
  <img className={keep ? "th keep" : "th"} src={photoSrc(id, keep ? "m" : "s")} alt="" />
);

/* 3c. Strengths: four features, each with a small before-and-after drawn from real photos: many in, one moment out. */
export function Strengths({ strengths }: { strengths: Dictionary["strengths"] }) {
  const [gathered, duplicates, clutter, named] = strengths.feats;
  return (
    <section className="strengths" id="strengths" aria-labelledby="strengthsTitle">
      <div className="wrap str-wrap">
        <h2 className="display" id="strengthsTitle"><Clauses text={strengths.title} /></h2>
        <ul className="feats">
          <li>
            <div className="art" aria-hidden="true">
              <Thumb id={20269} /><Thumb id={20346} /><Thumb id={20299} /><Go />
              <figure className="pol mini-pol">
                <div className="mo-grid"><img src={photoSrc(20269, "m")} alt="" /><img src={photoSrc(20346)} alt="" /><img src={photoSrc(20299)} alt="" /></div>
                <figcaption>{strengths.gatheredCaption}</figcaption>
              </figure>
            </div>
            <h3>{gathered.title}</h3>
            <p>{gathered.body}</p>
          </li>
          <li>
            <div className="art" aria-hidden="true">
              <span className="fan"><Thumb id={26092} /><Thumb id={26094} /><Thumb id={26095} /><Thumb id={26091} /></span><Go /><Thumb id={26008} keep />
            </div>
            <h3>{duplicates.title}</h3>
            <p>{duplicates.body}</p>
          </li>
          <li>
            <div className="art" aria-hidden="true">
              <span className="junk" /><span className="junk receipt" /><span className="junk" /><Go /><Thumb id={24360} keep />
            </div>
            <h3>{clutter.title}</h3>
            <p>{clutter.body}</p>
          </li>
          <li>
            <div className="art" aria-hidden="true">
              <Thumb id={26711} keep /><Go /><span className="named">{strengths.namedTitle}<small>{strengths.namedNote}</small></span>
            </div>
            <h3>{named.title}</h3>
            <p>{named.body}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* 4. Trust */
export function Trust({ trust, friends }: { trust: Dictionary["trust"]; friends: Dictionary["friends"] }) {
  return (
    <section className="trust">
      <div className="wrap">
        <div className="trust-card">
          <div className="trust-copy">
            <h2 className="display"><Clauses text={trust.title} /></h2>
            <ul className="checks">
              {trust.checks.map((check) => <li key={check}><Check size={26} />{check}</li>)}
            </ul>
          </div>
          <div className="arch"><Friend who="nori" pose="hum" label={friends.nori} /></div>
        </div>
      </div>
    </section>
  );
}

/* 5. Voices: notes from beta parents, still placeholders. On phones the notes slide sideways as you scroll, like How it
   works. */
const NOTE_COLOURS = ["var(--blush)", "#F5E6B3", "var(--teal-tint)"];

export function Voices({ voices }: { voices: Dictionary["voices"] }) {
  return (
    <PinnedSlide className="voices" labelledBy="voicesTitle" row=".notes">
      <div className="wrap">
        <h2 className="display" id="voicesTitle"><Clauses text={voices.title} /></h2>
        <div className="notes">
          {voices.quotes.map((note, i) => (
            <figure key={i} className="pol">
              <blockquote style={{ background: NOTE_COLOURS[i % NOTE_COLOURS.length] }}>{note.quote}</blockquote>
              <figcaption>{note.by}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </PinnedSlide>
  );
}

/* 6. Common questions */
export function Faq({ faq, friends, privacyHref }: { faq: Dictionary["faq"]; friends: Dictionary["friends"]; privacyHref: string }) {
  return (
    <section className="faq" id="faq">
      <div className="wrap faq-grid">
        <div className="arch"><Friend who="flip" pose="tilt" label={friends.flip} /></div>
        <FaqAccordion>
          <h2 className="display"><Clauses text={faq.title} /></h2>
          {faq.items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>{item.q}<Plus /></summary>
              <p><RichText text={item.a.replaceAll("{privacy}", privacyHref)} /></p>
            </details>
          ))}
        </FaqAccordion>
      </div>
    </section>
  );
}
