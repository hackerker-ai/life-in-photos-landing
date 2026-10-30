import type { Dictionary } from "@/app/[lang]/dictionaries";
import { SiteFooter } from "@/components/site/site-footer";
import { localePath, type Locale } from "@/lib/i18n";
import { Clauses } from "@/components/site/clauses";
import { Dig } from "./dig";
import { HeroRiver } from "./hero-river";
import { HowItWorks } from "./how-it-works";
import { Curve } from "./icons";
import { Invite } from "./invite";
import { Play } from "./play";
import { FixedView } from "./fixed-view";
import { Faq, Strengths, Trust, Voices } from "./sections";
import { StoryHeader } from "./story-header";
import { StoryProvider } from "./story-state";
import "./story.css";

/* The home page: one story told by scrolling. A river of camera-roll thumbnails flows into the phone and comes out as
   Polaroids; a pinned scene sorts 548 photos into ten moments; the visitor keeps a few; those land on the wall beside
   the invitation. Ported from prototypes/story-real/index.html. */
export function StoryPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const privacyHref = localePath(lang, "/privacy");
  const acts = { keep: dict.play.keep, later: dict.play.later, skip: dict.play.skip };

  return (
    <StoryProvider lang={lang}>
      <FixedView />
      <StoryHeader lang={lang} brand={dict.brand} homeLabel={dict.header.homeLabel} cta={dict.header.cta} languageLabel={dict.languageLabel} />

      {/* Everything below the header, which holds still on phones while the parents' notes slide (freeze.ts). */}
      <div className="story-flow">
        <div className="hero" id="top">
          <div className="wrap hero-copy">
            <h1 className="display"><Clauses text={dict.hero.title} /></h1>
            <p className="lede">{dict.hero.lede}</p>
            <a className="btn" href="#invite">{dict.hero.cta}</a>
          </div>
          <HeroRiver hero={dict.hero} moments={dict.moments} acts={acts} friends={dict.friends} />
        </div>

        <Dig dig={dict.dig} moments={dict.moments} lang={lang} />
        <Play play={dict.play} friends={dict.friends} />
        <HowItWorks how={dict.how} brand={dict.brand} />

        <Curve d="M0 90V30c360 54 1080-60 1440 0v60z" fill="var(--butter)" />
        <Strengths strengths={dict.strengths} />
        <Curve className="to-trust" d="M0 92V36c420 60 1000-64 1440 0v56z" fill="var(--paper)" background="var(--butter)" />
        <Trust trust={dict.trust} friends={dict.friends} />

        <Curve d="M0 90V26c420-44 1020 78 1440-4v68z" fill="var(--butter)" />
        <Voices voices={dict.voices} />

        <Curve d="M0 92V30c400 70 1040-54 1440 4v58z" fill="var(--blush)" background="var(--butter)" />
        <Faq faq={dict.faq} friends={dict.friends} privacyHref={privacyHref} />

        <Curve d="M0 92V40c460-60 940 70 1440-10v62z" fill="var(--sun)" background="var(--blush)" />
        <Invite invite={dict.invite} cards={dict.play.cards} lang={lang} />

        <SiteFooter footer={dict.footer} brand={dict.brand} home="" privacyHref={privacyHref} lang={lang} path="/" languageLabel={dict.languageLabel} />
      </div>
      {/* The scroll room for that hold: the content, sticky, stays put for as long as this takes to scroll past. */}
      <div className="story-room" aria-hidden="true" />
    </StoryProvider>
  );
}
