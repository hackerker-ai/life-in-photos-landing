"use client";

import { useParams } from "next/navigation";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Clauses } from "@/components/site/clauses";
import { Logo } from "@/components/site/logo";
import { defaultLocale, hasLocale, localePath, type Locale } from "@/lib/i18n";
import "../privacy/privacy.css";
import "./not-found.css";

export type NotFoundCopy = Dictionary["notFound"] & { brand: string; homeLabel: string; back: string; cta: string };

/* The 404: Flip peeking over an empty Polaroid, the photo that isn't in the album, then the way back. Shares the
   privacy page's header. */
export function NotFoundPage({ copies }: { copies: Record<Locale, NotFoundCopy> }) {
  const lang = useParams<{ lang?: string }>()?.lang;
  const locale = lang && hasLocale(lang) ? lang : defaultLocale;
  const copy = copies[locale];
  const home = localePath(locale);

  return (
    <div className="privacy-page lost-page">
      <title>{copy.meta.title}</title>
      <header className="bar">
        <div className="top wrap">
          <a className="lockup" href={home} aria-label={copy.homeLabel}><Logo size={28} />{copy.brand}</a>
        </div>
      </header>

      <main className="wrap lost">
        <div className="lost-scene" role="img" aria-label={copy.frameLabel}>
          <img className="lost-flip" src="/friends/flip-peek.webp" width={1024} height={876} alt="" />
          <div className="lost-pol"><div className="lost-photo" /></div>
        </div>
        <h1><Clauses text={copy.title} /></h1>
        <p>{copy.body}</p>
        <div className="lost-acts">
          <a className="btn" href={home}>{copy.back}</a>
          <a className="btn ghost" href={`${home}#invite`}>{copy.cta}</a>
        </div>
      </main>
    </div>
  );
}
