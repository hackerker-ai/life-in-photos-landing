import type { ReactNode } from "react";
import { WaitlistForm } from "./waitlist-form";
import { ProductDemo, ProductThumbnail } from "./product-demo";
import s from "../app/designs/designs.module.css";

const directions = [
  { id: "journal", number: "01", name: "The Family Journal", mood: "Editorial / intimate / timeless", description: "A warm invitation to return to the moments you love. Paper tones and expressive serif type make the app feel personal and considered.", headline: "Find the moments worth keeping." },
  { id: "scrapbook", number: "02", name: "The Happy Scrapbook", mood: "Playful / tactile / full of life", description: "An easygoing home for big little moments. Painted memories and cheerful color give the app a light, approachable personality.", headline: "Big little moments." },
  { id: "cinema", number: "03", name: "The Everyday Film", mood: "Cinematic / atmospheric / emotional", description: "An emotional introduction to the app. Cinematic imagery gives weight to the feelings and memories held inside an ordinary photo.", headline: "They grow. The moments stay." },
  { id: "gallery", number: "04", name: "The Living Gallery", mood: "Modern / clear / photo-first", description: "A clear, contemporary promise: less scrolling, more moments. Electric blue and spacious composition keep the app visible and the value direct.", headline: "Less scrolling. More moments." },
] as const;

type Direction = (typeof directions)[number]["id"];

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function Mark() {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="3" y="6" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" /><rect x="8" y="2" width="22" height="22" rx="3" fill="currentColor" /><path d="m11 18 5-6 4 4 3-3 4 5" stroke="var(--logo-line, #fff)" strokeWidth="1.5" /><circle cx="23" cy="8" r="2" fill="var(--logo-line, #fff)" /></svg>;
}

function Wordmark() {
  return <a href="#top" className={s.wordmark} aria-label="Life in Photos, top of page"><Mark /><span>life in photos</span></a>;
}

function Header({ label = "Made for your family" }: { label?: string }) {
  return <header className={s.header}><Wordmark /><span className={s.headerNote}>{label}</span><a className={s.navCta} href="#join">Join the waitlist <Arrow /></a></header>;
}

function Explorer({ active }: { active: Direction }) {
  return <nav className={s.explorer} aria-label="Landing page design explorer"><a href="/designs" className={s.explorerBack}>All designs</a><span className={s.explorerDivider} aria-hidden="true" />{directions.map((d) => <a key={d.id} href={`/designs/${d.id}`} title={d.name} aria-label={`${d.number}: ${d.name}`} aria-current={active === d.id ? "page" : undefined}>{d.number}</a>)}</nav>;
}

function Photo({ name, className = "", priority = false }: { name: Direction; className?: string; priority?: boolean }) {
  const alt = {
    journal: "A mother and daughter laughing together while baking at home",
    scrapbook: "Hand-painted illustration of a family sharing a happy picnic",
    cinema: "A father and daughter sharing a quiet moment on the beach at sunset",
    gallery: "A father and son laughing together in a sunlit park",
  };
  return <img className={className} src={`/images/designs/${name}.png`} alt={alt[name]} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />;
}

function Signup({ children, placement = "footer" }: { children?: ReactNode; placement?: "hero" | "footer" }) {
  return <div className={s.signup}>{children}<WaitlistForm placement={placement} /></div>;
}

function Footer() {
  return <footer className={s.footer}><Wordmark /><span>Moments. Memories. Stories.</span><a href="/designs">Explore the four designs <Arrow /></a></footer>;
}

function Safety({ light = false }: { light?: boolean }) {
  return <p className={`${s.safety} ${light ? s.safetyLight : ""}`}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m10 2 6 3v5c0 4-6 7-6 7s-6-3-6-7V5l6-3Z" stroke="currentColor" strokeWidth="1.3" /><path d="m7 9 2 2 4-4" stroke="currentColor" strokeWidth="1.3" /></svg>You approve before any photos are removed.</p>;
}

export function Journal() {
  return <div className={`${s.scope} ${s.journal}`} id="top"><a className={s.skip} href="#main">Skip to content</a><Header label="A little closer to the moments that matter" /><main id="main">
    <section className={s.journalHero}>
      <div className={s.journalCopy}><p className={s.eyebrow}>An iPhone app for your life in photos</p><h1>Find the<br />moments<br /><em>worth keeping.</em></h1><p className={s.lead}>Your camera roll holds more than pictures. Find the moments that feel like your life, and make space to enjoy them again.</p><div id="join"><Signup placement="hero" /><Safety /></div></div>
      <figure className={s.journalPortrait}><div className={s.journalAppStage}><div className={s.journalMemory}><Photo name="journal" /><span>The moment behind the photos.</span></div><ProductDemo theme="journal" /></div><figcaption><span>THE APP / A CALMER CAMERA ROLL</span><span>A little closer to your memories.</span></figcaption></figure>
    </section>
    <div className={s.journalRule}><span>A growing family. A growing photo library.</span><span>A little help finding what matters.</span></div>
    <section className={s.journalProcess} id="how"><div><p className={s.eyebrow}>How it works</p><h2>You took the photos.<br /><em>Let us help with<br />the next part.</em></h2><p>Life in Photos brings similar photos together, so you can review them in small groups instead of facing your whole camera roll.</p></div><ol className={s.journalSteps}><li><span>01</span><div><h3>See the moment together.</h3><p>Similar shots, gathered into one group. No hunting back and forth.</p></div></li><li><span>02</span><div><h3>Make a little room.</h3><p>Review the repeats at your own pace. A small start is still a start.</p></div></li><li><span>03</span><div><h3>Keep the final say.</h3><p>Review what will be removed before you approve any changes.</p></div></li></ol></section>
    <section className={s.journalVision}><p className={s.eyebrow}>Where we are headed</p><h2>Moments become memories.<br /><em>Memories become stories.</em></h2><p>We are starting with a calmer photo library. Our longer-term vision is to help you turn the moments you keep into the stories of your life.</p><span className={s.futureNote}>Story creation is part of our vision, not the current MVP.</span></section>
    <section className={s.journalEnd}><p className={s.eyebrow}>Life in Photos is on its way</p><h2>Your everyday is<br /><em>worth coming back to.</em></h2><Signup /></section>
  </main><Footer /><Explorer active="journal" /></div>;
}

export function Scrapbook() {
  return <div className={`${s.scope} ${s.scrapbook}`} id="top"><a className={s.skip} href="#main">Skip to content</a><Header label="For perfectly imperfect family life" /><main id="main">
    <section className={s.scrapHero}><p className={s.scrapTag}>AN IPHONE APP FOR YOUR BIG LITTLE LIFE</p><h1>Big little<br /><span>moments.</span></h1><span className={s.scrapDoodle} aria-hidden="true">*</span><p className={s.lead}>For the laughs you want to hear again and the days you want to hold onto. Less time lost in your camera roll. More time with the memories that matter.</p><div id="join"><Signup placement="hero" /><Safety /></div><figure className={s.scrapPicture}><div className={s.scrapAppArt}><Photo name="scrapbook" /></div><ProductDemo theme="scrapbook" /><figcaption>More of the moments you love.</figcaption></figure></section>
    <div className={s.scrapRibbon} aria-hidden="true"><span>The tiny adventures</span><b>*</b><span>The big feelings</span><b>*</b><span>The everyday magic</span></div>
    <section className={s.scrapProcess} id="how"><p className={s.eyebrow}>How it works</p><h2>A calmer camera roll.<br />One little group at a time.</h2><div className={s.scrapCards}><article><span className={s.scrapNumber}>1</span><h3>Round up the repeats.</h3><p>We bring similar photos together, so the moment is easier to see.</p><span className={s.cardFoot}>A LITTLE LESS SEARCHING</span></article><article><span className={s.scrapNumber}>2</span><h3>Take one small step.</h3><p>Review a group when you have a moment. No need to tackle everything today.</p><span className={s.cardFoot}>A LITTLE LESS OVERWHELM</span></article><article><span className={s.scrapNumber}>3</span><h3>You&apos;re in charge.</h3><p>Nothing gets removed without your approval. Take your time.</p><span className={s.cardFoot}>A LITTLE MORE PEACE OF MIND</span></article></div></section>
    <section className={s.scrapVision}><span className={s.scrapStamp}>THE BIG<br />PICTURE</span><div><p className={s.eyebrow}>Today is just the beginning</p><h2>Moments. Memories.<br /><em>Someday, stories.</em></h2><p>First, a calmer photo library. Later, we want to help turn your family&apos;s moments into life stories.</p><span className={s.futureNote}>Story creation is a future ambition, not an MVP feature.</span></div></section>
    <section className={s.scrapEnd}><p className={s.eyebrow}>Something good is growing</p><h2>Make room<br />for the good stuff.</h2><Signup /><span className={s.scrapEndStar} aria-hidden="true">*</span></section>
  </main><Footer /><Explorer active="scrapbook" /></div>;
}

export function Cinema() {
  return <div className={`${s.scope} ${s.cinema}`} id="top"><a className={s.skip} href="#main">Skip to content</a><div className={s.cinemaOpening}><Photo name="cinema" className={s.cinemaBackdrop} priority /><Header label="The extraordinary, in your everyday" /><main id="main"><section className={s.cinemaHero}><p className={s.eyebrow}>AN IPHONE APP FOR THE MOMENTS THAT MATTER</p><h1>They grow.<br />The moments<br /><em>stay.</em></h1><p className={s.lead}>Some photos bring you right back. Life in Photos helps you make room for those moments, so the life you captured is easier to return to.</p><div id="join"><Signup placement="hero" /><Safety light /></div><div className={s.cinemaCaption}><span>THE APP / CHAPTER ONE</span><span>Less to sort.<br />More to come back to.</span></div><div className={s.cinemaAppStage}><ProductDemo theme="cinema" /></div></section></main></div>
    <section className={s.cinemaIntro}><p className={s.eyebrow}>THERE IS A LIFE IN THERE</p><h2>Somewhere between<br />the almosts and the outtakes,<br /><em>there&apos;s your moment.</em></h2><p>The photos you come back to are not always the perfect ones. They are the ones that bring back a voice, a feeling, a little piece of your life. Those are the moments worth making room for.</p></section>
    <section className={s.cinemaFrames} aria-label="Everyday family moments"><figure><Photo name="journal" /><figcaption><span>01</span> The mess we made.</figcaption></figure><figure><Photo name="gallery" /><figcaption><span>02</span> The way he laughed.</figcaption></figure><figure><Photo name="cinema" /><figcaption><span>03</span> The walk back.</figcaption></figure></section>
    <section className={s.cinemaProcess} id="how"><p className={s.eyebrow}>HOW IT WORKS</p><div><article><span>01 / GATHER</span><h3>One moment.<br />Its photos together.</h3><p>Similar shots are grouped so you can compare without the endless scroll.</p></article><article><span>02 / REVIEW</span><h3>A smaller task.<br />At your own pace.</h3><p>Review a group instead of taking on your whole library.</p></article><article><span>03 / APPROVE</span><h3>Your memories.<br />Your final say.</h3><p>You approve any removals before your photo library changes.</p></article></div></section>
    <section className={s.cinemaEnd}><p className={s.eyebrow}>THE NEXT CHAPTER</p><h2>Make space for<br /><em>what stays with you.</em></h2><Signup /><div className={s.cinemaVision}><span>Moments &rarr; Memories &rarr; Stories</span><p>Our journey starts with easier photo review. Helping you tell your life stories is our longer-term vision, not a feature of today&apos;s MVP.</p></div></section><Footer /><Explorer active="cinema" /></div>;
}

export function Gallery() {
  return <div className={`${s.scope} ${s.gallery}`} id="top"><a className={s.skip} href="#main">Skip to content</a><Header label="Your life, a little easier to find" /><main id="main">
    <section className={s.galleryHero}><div className={s.galleryHeading}><h1>Less scrolling.<br />More <span>moments.</span></h1><div><p className={s.eyebrow}>LIFE IN PHOTOS / IPHONE APP</p><p className={s.lead}>Your favorite moments deserve more than a place in an endless camera roll. Bring them closer, with less effort between you and the memories you love.</p><a className={s.galleryTextLink} href="#how">See how it works <Arrow /></a></div></div><div className={s.galleryBoard}><div className={s.galleryRail}><span>YOUR LIFE, WORTH COMING BACK TO</span><span>LESS OVERWHELM. MORE MEANING.</span></div><div className={s.galleryProductFlow}><div className={s.galleryInput}><span className={s.eyebrow}>THE EVERYDAY</span><div className={s.gallerySampleGrid}>{[0, 1, 2, 3].map((n) => <Photo key={n} name="gallery" />)}</div><h3>The laugh.<br />The look. The feeling.</h3><p>The little things that make a photo yours.</p></div><ProductDemo theme="gallery" /><div className={s.galleryOutput}><article><span className={s.eyebrow}>MORE MEANING</span><h3>Your memories.<br />Closer.</h3><p>Make room to enjoy the moments you captured, not just store them.</p></article><article><span className={s.eyebrow}>LESS PRESSURE</span><h3>A lighter<br />place to start.</h3><p>A growing photo library doesn&apos;t have to feel like another unfinished task.</p></article><a href="#join">Join the iPhone app waitlist <Arrow /></a></div></div><div className={s.galleryBoardBottom}><p>Less sorting. More meaningful moments.</p><span>Illustrative app preview. No photo access needed.</span></div></div><div className={s.gallerySignup} id="join"><div><span className={s.galleryDot} /> IN DEVELOPMENT FOR IPHONE<p>Be here for the first chapter.</p></div><Signup placement="hero" /></div></section>
    <section className={s.galleryProcess} id="how"><div className={s.gallerySectionTitle}><p className={s.eyebrow}>HOW IT WORKS</p><h2>Simple steps.<br />Meaningful space.</h2></div><div className={s.galleryRows}><article><span>01</span><h3>Bring similar<br />photos together.</h3><p>See related shots side by side, instead of searching through a crowded library.</p></article><article><span>02</span><h3>Make review<br />manageable.</h3><p>Start with one group. A tidier library does not have to be an all-day project.</p></article><article><span>03</span><h3>Stay in control<br />of what goes.</h3><p>Review and approve before photos are removed. You always make the final call.</p></article></div></section>
    <section className={s.galleryVision}><p className={s.eyebrow}>OUR DIRECTION</p><div><h2>Moments.<br />Memories.<br /><span>Stories.</span></h2><div><p>We&apos;re building toward a more meaningful relationship with your photos.</p><p>Our first step is simpler photo review. In the future, we want to help you turn what you keep into the stories of your life.</p><span className={s.futureNote}>Story creation is not included in the current MVP.</span></div></div></section>
    <section className={s.galleryEnd}><h2>Your life.<br />Worth another look.</h2><div><p>Join the waitlist for Life in Photos.</p><Signup /><Safety light /></div></section>
  </main><Footer /><Explorer active="gallery" /></div>;
}

export function DesignGallery() {
  return <div className={`${s.scope} ${s.index}`}><header className={s.indexHeader}><a href="/" className={s.wordmark}><Mark /><span>life in photos</span></a><span>DESIGN EXPLORATIONS / 01&ndash;04</span></header><main><section className={s.indexIntro}><p className={s.eyebrow}>ONE PURPOSE. FOUR PERSONALITIES.</p><h1>How should<br /><em>Life in Photos feel?</em></h1><p>Four distinct styles. One promise: less overwhelm between you and the moments that matter. Each introduces the app through its value, with the practical steps explained under How it works.</p></section><div className={s.designGrid}>{directions.map((d) => <article key={d.id} className={s.designCard}><a href={`/designs/${d.id}`} className={`${s.designPreview} ${s[`${d.id}Preview`]}`} aria-label={`Open ${d.name}`}><span className={s.previewBrand}>life in photos</span><Photo name={d.id} /><ProductThumbnail theme={d.id} /><span className={s.previewHeadline}>{d.headline}</span><span className={s.previewOpen}>Explore design <Arrow /></span></a><div className={s.designCardTitle}><div><span className={s.eyebrow}>{d.number} / {d.mood}</span><h2><a href={`/designs/${d.id}`}>{d.name}</a></h2></div><a className={s.designArrow} href={`/designs/${d.id}`} aria-label={`View ${d.name}`}><Arrow /></a></div><p>{d.description}</p></article>)}</div><section className={s.indexNotes}><div><p className={s.eyebrow}>WHAT STAYS THE SAME</p><h2>Moments first.<br />Less pressure. Your say.</h2><p>Every direction keeps the MVP grounded: similar-photo grouping, manageable review, and your approval before removal. Story creation belongs to the future vision.</p></div><div><p className={s.eyebrow}>THE REFERENCE SHELF</p><a href="https://land-book.com/websites/99846-ortolan" target="_blank" rel="noreferrer">Ortolan / Land-book <Arrow /></a><a href="https://dribbble.com/shots/15616909-Family-Landing-Page-Website" target="_blank" rel="noreferrer">Family Landing Page / Rizqi Adi Surya <Arrow /></a><a href="https://dribbble.com/shots/27309854-Family-Photographer-Landing-Page" target="_blank" rel="noreferrer">Family Photographer / Anton Kasatkin <Arrow /></a><p className={s.indexDisclaimer}>Original AI-generated imagery and interactive product illustrations. These previews explain the MVP workflow; they are not actual app screenshots or customer stories.</p></div></section></main><footer className={s.indexFooter}><a href="/">Back to the original landing page</a><span>Choose a direction. Then we make it yours.</span></footer></div>;
}
