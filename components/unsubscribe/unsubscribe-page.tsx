import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Clauses } from "@/components/site/clauses";
import { Logo } from "@/components/site/logo";
import { RichText } from "@/components/site/rich-text";
import { localePath, type Locale } from "@/lib/i18n";
import "../privacy/privacy.css";
import "./unsubscribe.css";

/** Where the reader is: about to confirm, off the list, or holding a link that can't work. */
export type UnsubscribeState = { kind: "confirm"; email: string; token: string; failed: boolean } | { kind: "done" } | { kind: "broken" };

/* The page a welcome email's "Leave the list" link opens. Opening it changes nothing: link scanners in mail apps open
   links too, so the reader confirms with a button, which posts to /api/unsubscribe. Shares the privacy page's header. */
export function UnsubscribePage({ dict, lang, state }: { dict: Dictionary; lang: Locale; state: UnsubscribeState }) {
  const { unsubscribe: copy, privacy } = dict;
  const home = localePath(lang);
  const [before, after] = copy.body.split("{email}");

  return (
    <div className="privacy-page unsubscribe-page">
      <header className="bar">
        <div className="top wrap">
          <a className="lockup" href={home} aria-label={privacy.homeLabel}><Logo size={28} />{dict.brand}</a>
          {/* No language menu: the link already opens in the language they signed up in, and switching would drop it. */}
          <a className="back" href={home}>{privacy.back}</a>
        </div>
      </header>

      <main className="wrap head leave">
        {state.kind === "done" && (
          <>
            <h1><Clauses text={copy.doneTitle} /></h1>
            <p>{copy.doneBody}</p>
          </>
        )}
        {state.kind === "broken" && (
          <>
            <h1><Clauses text={copy.failedTitle} /></h1>
            <p><RichText text={copy.brokenBody} /></p>
          </>
        )}
        {state.kind === "confirm" && (
          <>
            <h1><Clauses text={copy.title} /></h1>
            <p>{before}<b>{state.email}</b>{after}</p>
            {state.failed && <p className="leave-failed" role="alert"><b>{copy.failedTitle}</b> <RichText text={copy.failedBody} /></p>}
            <form method="post" action="/api/unsubscribe">
              <input type="hidden" name="email" value={state.email} />
              <input type="hidden" name="token" value={state.token} />
              <input type="hidden" name="lang" value={lang} />
              <button type="submit">{copy.button}</button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
