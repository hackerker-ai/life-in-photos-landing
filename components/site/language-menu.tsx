"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { localeNames, localePath, locales, type Locale } from "@/lib/i18n";

/* Language picker: a globe button in the header and footer. It opens a small card listing each language in its own
   script, the current one ticked: down from the header, up from the footer (`up`). Opening it focuses the other
   language; a click elsewhere, Escape or moving focus away closes it. Each link goes to the same page in that
   language. */

type LanguageMenuProps = {
  lang: Locale;
  /** The page's path without a locale, "/" or "/privacy". */
  path: string;
  label: string;
  up?: boolean;
  /** Anything that hangs from the globe: the home page's note that it's also in the visitor's language. */
  children?: ReactNode;
};

export function LanguageMenu({ lang, path, label, up = false, children }: LanguageMenuProps) {
  const [open, setOpen] = useState(false);
  const [fromLeft, setFromLeft] = useState(false);
  const pick = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const id = useId();

  // Near the left edge (the footer on phones) the menu opens rightward instead, so it stays on screen.
  useLayoutEffect(() => {
    if (!open) { setFromLeft(false); return; }
    if (!menu.current) return;
    if (menu.current.getBoundingClientRect().left < 8) setFromLeft(true);
    menu.current.querySelector<HTMLAnchorElement>("a:not([aria-current])")?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => { if (!pick.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <div
      className="lang-pick"
      ref={pick}
      onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); button.current?.focus(); } }}
      // Closes when focus moves to something else on the page. Focus going nowhere (relatedTarget null) is left to the
      // click handler: Safari doesn't focus a link it's tapped on, so tapping a language drops focus to nothing, and
      // closing then would hide the menu before the tap's click lands on the link.
      onBlur={(event) => { if (event.relatedTarget && !pick.current?.contains(event.relatedTarget as Node)) setOpen(false); }}
    >
      <button
        ref={button}
        className="globe-btn"
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={label}
        onClick={() => setOpen((now) => !now)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" /></svg>
      </button>
      <ul ref={menu} className={["lang-menu", up ? "up" : "", fromLeft ? "from-left" : ""].filter(Boolean).join(" ")} id={id} hidden={!open}>
        {locales.map((locale) => (
          <li key={locale}>
            <a href={localePath(locale, path)} lang={locale} hrefLang={locale} aria-current={locale === lang ? "page" : undefined}>
              {localeNames[locale]}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </a>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
