import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";
import { LanguageMenu } from "./language-menu";
import { Logo } from "./logo";

type SiteFooterProps = {
  footer: Dictionary["footer"];
  brand: string;
  /** The home page's path in this locale, with nothing after it ("" on the home page itself, so links stay in-page). */
  home: string;
  privacyHref: string;
  onPrivacy?: boolean;
  lang: Locale;
  /** This page's path without a locale, for the language menu. */
  path: string;
  languageLabel: string;
};

/* Footer: what the app is and where to go, then the wordmark as the page's last word, with the three friends standing
   on the tops of its letters. The wordmark is the brand's lowercase name and stays the same in every language. */
export function SiteFooter({ footer, brand, home, privacyHref, onPrivacy = false, lang, path, languageLabel }: SiteFooterProps) {
  return (
    <footer id="footer">
      <div className="wrap foot">
        <div className="foot-brand">
          <a className="foot-lockup" href={home || "#top"}><Logo size={26} />{brand}</a>
          <p className="foot-about">{footer.about}</p>
        </div>
        <nav className="foot-nav" aria-label={footer.navLabel}>
          <div>
            <p className="foot-h">{footer.appHeading}</p>
            <ul>
              <li><a href={`${home}#how`}>{footer.how}</a></li>
              <li><a href={`${home}#strengths`}>{footer.strengths}</a></li>
              <li><a href={`${home}#faq`}>{footer.faq}</a></li>
              <li><a href={`${home}#invite`}>{footer.invite}</a></li>
            </ul>
          </div>
          <div>
            <p className="foot-h">{footer.contactHeading}</p>
            <ul>
              <li><a href={`mailto:${footer.email}`}>{footer.email}</a></li>
              <li><a href={privacyHref} aria-current={onPrivacy ? "page" : undefined}>{footer.privacy}</a></li>
            </ul>
          </div>
        </nav>
        <div className="foot-row">
          <span>{footer.copyright}</span>
          <div className="foot-end">
            <LanguageMenu lang={lang} path={path} label={languageLabel} up />
            <a className="foot-top" href="#top">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
              {footer.backToTop}
            </a>
          </div>
        </div>
      </div>
      <div className="wordmark" aria-hidden="true">
        life i<span className="perch"><img className="tall" src="/friends/nori-wave.webp" alt="" />n</span> ph<span className="perch"><img src="/friends/momo-wave.webp" alt="" />o</span>to<span className="perch"><img src="/friends/flip-front.webp" alt="" />s</span>
      </div>
    </footer>
  );
}
