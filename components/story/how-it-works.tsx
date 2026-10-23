import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Logo } from "@/components/site/logo";
import { HowPinned } from "./how-pinned";
import { Chevron, FindIcon, MomentsIcon, SettingsIcon } from "./icons";
import { photoSrc } from "./photos";

/* 3b. How it works: three screens from the app mockup, one line under each, all in one view. On phones the three sit
   in a row that slides sideways as you scroll. The screens are drawings of the app (aria-hidden); the captions carry
   the meaning. */

const SESSION_MOSAIC = [
  [[26711, 300], [26756, 200]],
  [[26718, 200], [26751, 360]],
  [[26734, 340], [26745, 220]]
];
const MOMENTS_THIS_WEEK = [24360, 28887, 20269, 15113];
const MOMENTS_LAST_WEEK = [27064, 26711];

function Tabs({ tabs, on, className }: { tabs: Dictionary["how"]["tabs"]; on: "find" | "moments"; className: string }) {
  return (
    <p className={className}>
      <span className={on === "find" ? "on" : undefined}><FindIcon />{tabs.find}</span>
      <span className={on === "moments" ? "on" : undefined}><MomentsIcon />{tabs.moments}</span>
      <span><SettingsIcon />{tabs.settings}</span>
    </p>
  );
}

function ScreenPol({ id, caption }: { id: number; caption: string }) {
  return <figure className="pol"><img src={photoSrc(id, "m")} alt="" /><figcaption>{caption}</figcaption></figure>;
}

export function HowItWorks({ how, brand }: { how: Dictionary["how"]; brand: string }) {
  const [find, session, moments] = how.steps;
  return (
    <HowPinned labelledBy="howTitle">
      <div className="wrap">
        <div className="how-head">
          <h2 className="display" id="howTitle">{how.title}</h2>
          <p>{how.body}</p>
        </div>
        <ol className="how-steps" tabIndex={0} aria-label={how.stepsLabel}>
          <li className="how-step">
            <div className="device" aria-hidden="true"><div className="screen scaled">
              <p className="f-lockup"><Logo size={26} /> {brand}</p>
              <p className="f-date">{how.find.date}</p>
              <div className="f-deck">
                <img className="pal" src="/friends/flip-hang.webp" alt="" style={{ width: 74, top: -64, right: -4 }} />
                <div className="f-card c2" /><div className="f-card c1" />
                <div className="f-card c0">
                  <div className="mo-grid"><img src={photoSrc(11914, "m")} alt="" /><img src={photoSrc(11900)} alt="" /><img src={photoSrc(11986)} alt="" /></div>
                  <span>{how.find.card}</span>
                </div>
              </div>
              <p className="f-ready">{how.find.ready}</p>
              <p className="f-sub">{how.find.sub}</p>
              <p className="f-start">{how.find.start}</p>
              <p className="f-later">{how.find.later}<b>5 <Chevron /></b></p>
              <Tabs tabs={how.tabs} on="find" className="f-tabs" />
            </div></div>
            <div className="how-cap"><h3>{find.title}</h3><p>{find.body}</p></div>
          </li>
          <li className="how-step">
            <div className="device" aria-hidden="true"><div className="screen scaled">
              <div className="s-top">
                <Chevron back />
                <div className="s-ticks">
                  {Array.from({ length: 10 }, (_, i) => <b key={i} className={i < 3 ? "done" : i === 3 ? "now" : undefined} />)}
                </div>
                <span className="s-count">{how.session.count}</span>
              </div>
              <p className="s-title">{how.session.title}</p>
              <p className="s-meta">{how.session.meta}</p>
              <p className="s-notes">{how.session.notes}</p>
              <div className="s-mosaic">
                {SESSION_MOSAIC.map((column, c) => (
                  <div key={c} className="s-col">
                    {column.map(([id, flex]) => <i key={id} style={{ flex }}><img src={photoSrc(id)} alt="" /></i>)}
                  </div>
                ))}
              </div>
              <div className="s-acts"><span>{how.session.keep}</span><span>{how.session.later}</span><span>{how.session.skip}</span></div>
            </div></div>
            <div className="how-cap"><h3>{session.title}</h3><p>{session.body}</p></div>
          </li>
          <li className="how-step">
            <div className="device" aria-hidden="true"><div className="screen scaled">
              <img className="pal" src="/friends/momo-front.webp" alt="" style={{ width: 112, top: 6, right: 4 }} />
              <p className="m-kept">{how.moments.kept}</p>
              <p className="m-title">{how.moments.title}</p>
              <p className="m-week">{how.moments.thisWeek}<i /><small>{how.moments.thisWeekCount}</small></p>
              <div className="m-grid">
                {MOMENTS_THIS_WEEK.map((id, i) => <ScreenPol key={id} id={id} caption={how.moments.captions[i]} />)}
              </div>
              <p className="m-week m-last">{how.moments.lastWeek}<i /><small>{how.moments.lastWeekCount}</small></p>
              <div className="m-grid">
                {MOMENTS_LAST_WEEK.map((id, i) => <ScreenPol key={id} id={id} caption={how.moments.captions[MOMENTS_THIS_WEEK.length + i]} />)}
              </div>
              <Tabs tabs={how.tabs} on="moments" className="f-tabs m-tabs" />
            </div></div>
            <div className="how-cap"><h3>{moments.title}</h3><p>{moments.body}</p></div>
          </li>
        </ol>
      </div>
    </HowPinned>
  );
}
