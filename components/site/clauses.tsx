import { Fragment } from "react";

/* A Chinese headline should break between its clauses (換你試試看。/ 試著決定這三段回憶吧！), not just anywhere between
   words (換你試試看。試著 / 決定…). Each clause becomes a unit that stays on one line when it fits (base.css), and wraps
   between its words only when it can't. Text without Chinese clause punctuation comes back unchanged. */
const CLAUSE = /[^。，！？；：]+[。，！？；：]*/g;

export function Clauses({ text }: { text: string }) {
  const clauses = text.match(CLAUSE) ?? [text];
  if (clauses.length < 2) return text;
  return (
    <Fragment>
      {clauses.map((clause, i) => <span key={i} className="clause">{clause.replace(/^​/, "")}</span>)}
    </Fragment>
  );
}
