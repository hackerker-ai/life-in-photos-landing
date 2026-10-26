import type { Dictionary } from "@/app/[lang]/dictionaries";
import { LanguageMenu } from "@/components/site/language-menu";
import { Logo } from "@/components/site/logo";
import { RichText } from "@/components/site/rich-text";
import { SiteFooter } from "@/components/site/site-footer";
import { localePath, type Locale } from "@/lib/i18n";
import { Clauses } from "@/components/site/clauses";
import "./privacy.css";

const Check = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#36686D" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

/* The draft privacy policy. Ported from prototypes/story-real/privacy.html. */
export function PrivacyPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const { privacy } = dict;
  const home = localePath(lang);

  return (
    <div className="privacy-page">
      <header className="bar">
        <div className="top wrap">
          <a className="lockup" href={home} aria-label={privacy.homeLabel}><Logo size={28} />{dict.brand}</a>
          <div className="top-end">
            <a className="back" href={home}>{privacy.back}</a>
            <LanguageMenu lang={lang} path="/privacy" label={dict.languageLabel} />
          </div>
        </div>
      </header>

      <main>
        <div className="wrap head">
          <p className="draft" role="note"><span><RichText text={privacy.draft} /></span></p>
          <h1><Clauses text={privacy.title} /></h1>
          <p className="updated"><RichText text={privacy.updated} /></p>
          <div className="short">
            <h2><Clauses text={privacy.shortTitle} /></h2>
            <ul>
              {privacy.short.map((point) => <li key={point}><Check /><span>{point}</span></li>)}
            </ul>
          </div>
        </div>

        <div className="wrap body">
          <nav className="toc" aria-label={privacy.tocLabel}>
            <p>{privacy.tocLabel}</p>
            <ol>
              {privacy.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}
            </ol>
          </nav>
          <article className="policy">
            {privacy.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2><Clauses text={section.title} /></h2>
                {section.blocks.map((block, i) => {
                  if ("p" in block) return <p key={i}><RichText text={block.p} /></p>;
                  if ("h3" in block) return <h3 key={i}>{block.h3}</h3>;
                  if ("ul" in block) return <ul key={i}>{block.ul.map((item) => <li key={item}><RichText text={item} /></li>)}</ul>;
                  return (
                    <div key={i} className="who">
                      {block.who.map((provider) => <div key={provider.name}><b>{provider.name}</b><span>{provider.job}</span></div>)}
                    </div>
                  );
                })}
              </section>
            ))}
          </article>
        </div>
      </main>

      <SiteFooter footer={dict.footer} brand={dict.brand} home={home} privacyHref={localePath(lang, "/privacy")} onPrivacy lang={lang} path="/privacy" languageLabel={dict.languageLabel} />
    </div>
  );
}
