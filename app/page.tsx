import { WaitlistForm } from "@/components/waitlist-form";

const steps = [
  {
    number: "01",
    title: "Bring the clutter into focus",
    copy: "Life in Photos gathers similar shots into small groups, so you never have to face the whole library at once."
  },
  {
    number: "02",
    title: "See what deserves a closer look",
    copy: "Compare the moment, not a wall of thumbnails. Keep the version that feels most like your family."
  },
  {
    number: "03",
    title: "Review before anything changes",
    copy: "Every cleanup choice stays visible until you approve it. No silent, automatic deletion."
  }
];

const benefits = [
  {
    icon: "stack",
    title: "Similar photos, side by side",
    copy: "Turn ten almost-identical shots into one clear, manageable decision."
  },
  {
    icon: "clock",
    title: "Small reviews that fit real life",
    copy: "Make useful progress in the spare minutes between everything else."
  },
  {
    icon: "shield",
    title: "Designed for careful choices",
    copy: "Suggestions stay suggestions. You review before the photo library changes."
  }
];

function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function FeatureIcon({ name }: { name: string }) {
  if (name === "clock") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="11" />
        <path d="M16 9v7l5 3" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 4 26 8v7c0 6.5-3.9 10.8-10 13-6.1-2.2-10-6.5-10-13V8l10-4Z" />
        <path d="m11.5 16 3 3 6-7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="7" y="5" width="18" height="20" rx="3" />
      <path d="M4 10v15a3 3 0 0 0 3 3h14" />
      <circle cx="18.5" cy="11.5" r="2.5" />
      <path d="m10 22 5-6 3 3 3-3 4 5" />
    </svg>
  );
}

function ProductMoment() {
  return (
    <div className="moment-stage" aria-label="Concept preview showing a small group of similar family photos ready for review">
      <div className="polaroid polaroid-back">
        <div className="mini-scene scene-one"><span /></div>
      </div>
      <div className="polaroid polaroid-middle">
        <div className="mini-scene scene-two"><span /></div>
      </div>
      <div className="review-panel">
        <div className="review-topline">
          <span className="review-back">Close</span>
          <span className="review-progress">4 of 7</span>
        </div>
        <div className="review-label">Sunday afternoon</div>
        <div className="hero-scene">
          <span className="sun" />
          <span className="hill hill-one" />
          <span className="hill hill-two" />
          <span className="person person-one" />
          <span className="person person-two" />
        </div>
        <div className="review-copy">
          <div>
            <strong>One moment, seven photos</strong>
            <span>Choose the one that feels like yours.</span>
          </div>
          <span className="count-pill">7 similar</span>
        </div>
        <div className="review-actions">
          <span>Keep looking</span>
          <span className="review-primary">Keep this one</span>
        </div>
      </div>
      <span className="hand-note">less sorting,<br />more remembering</span>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Life in Photos home">
          <Mark />
          <span>Life in Photos</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a className="nav-cta" href="#join">Join the waitlist</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-grain" />
        <div className="hero-copy reveal reveal-one">
          <p className="eyebrow"><span /> A calmer camera roll starts here</p>
          <h1>Find the moments<br /><em>worth keeping.</em></h1>
          <p className="hero-lede">
            Life in Photos brings similar photos together and guides you through one small review at a time, so meaningful family moments stop disappearing into the clutter.
          </p>
          <WaitlistForm placement="hero" />
          <div className="quiet-proof">
            <span>Built for iPhone</span>
            <i />
            <span>Review before changes</span>
            <i />
            <span>Early access</span>
          </div>
        </div>
        <div className="hero-visual reveal reveal-two">
          <ProductMoment />
        </div>
      </section>

      <section className="problem-section">
        <div className="section-tag">The familiar problem</div>
        <blockquote>
          “I know the photo is in here.<br />I just can’t <em>find it.</em>”
        </blockquote>
        <div className="problem-grid">
          <p>
            Birthdays, school days, family trips, ordinary afternoons. The moments add up quickly, then disappear behind bursts, screenshots, and ten versions of almost the same smile.
          </p>
          <p>
            Keeping everything does not make those moments easier to remember. But sorting the entire camera roll feels too big, too emotional, and too easy to postpone.
          </p>
        </div>
      </section>

      <section className="steps-section" id="how-it-works">
        <div className="section-intro">
          <p className="eyebrow"><span /> How it works</p>
          <h2>The app does the sorting.<br /><em>You notice the moments.</em></h2>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefit-lead">
          <span className="scribble">A lighter way through</span>
          <h2>Cleanup that feels less like a project.</h2>
          <p>Designed around how real family photo libraries grow: quickly, imperfectly, and with a lot of feeling attached.</p>
        </div>
        <div className="benefit-list">
          {benefits.map((benefit) => (
            <article className="benefit" key={benefit.title}>
              <div className="benefit-icon"><FeatureIcon name={benefit.icon} /></div>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-section">
        <div className="trust-card">
          <p className="eyebrow light"><span /> Thoughtful by default</p>
          <h2>Your family photos deserve careful decisions.</h2>
          <p className="trust-lede">
            Cleanup starts from a local photo catalog. Suggestions are presented for review before your library changes. Optional cloud-powered features are clearly disclosed and require your consent.
          </p>
          <div className="trust-facts">
            <span>Review first</span>
            <span>No silent deletion</span>
            <span>Clear cloud consent</span>
          </div>
        </div>
      </section>

      <section className="vision-section">
        <p className="section-tag">The larger idea</p>
        <div className="vision-line">
          <span>Moments</span><i />
          <span>Memories</span><i />
          <span>Stories</span>
        </div>
        <p>
          Today, Life in Photos begins by helping you find the moments hidden in the clutter. Because the photos we preserve become the memories, and eventually the stories, we carry forward.
        </p>
      </section>

      <section className="final-cta" id="join">
        <div className="final-cta-inner">
          <Mark />
          <p className="eyebrow centered"><span /> Early access</p>
          <h2>Your family's moments<br />are already in there.</h2>
          <p>Be among the first to find them with Life in Photos.</p>
          <WaitlistForm placement="footer" />
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">
          <Mark />
          <span>Life in Photos</span>
        </a>
        <p>Moments become memories. Memories become stories.</p>
        <p>Copyright 2026 Life in Photos</p>
      </footer>
    </main>
  );
}
