/* Line icons drawn on a 24-point grid, taking the text colour. All decorative. */

const line = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const Chevron = ({ back = false }: { back?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...line} strokeWidth="2" aria-hidden="true"><path d={back ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} /></svg>
);

export const FindIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...line} strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
);

export const MomentsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...line} strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="15.5" cy="9.5" r="1.5" /><path d="M4 17l5-5 4 4 2-2 5 4" /></svg>
);

export const SettingsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" {...line} strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" /></svg>
);

/** The arrow between a feature's before and after. */
export const Go = () => (
  <svg className="go" width="22" height="22" viewBox="0 0 24 24" {...line} strokeWidth="2.2" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
);

export const Check = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} stroke="#36686D" strokeWidth="2.6" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export const Plus = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
);

/** A wavy edge between two sections: `fill` is the colour below the curve, `background` the one above it. */
export function Curve({ d, fill, background, className }: { d: string; fill: string; background?: string; className?: string }) {
  return (
    <svg className={className ? `curve ${className}` : "curve"} viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" style={background ? { background } : undefined}>
      <path d={d} style={{ fill }} />
    </svg>
  );
}
