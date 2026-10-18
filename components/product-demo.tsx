"use client";

import { useState } from "react";
import p from "./product-demo.module.css";

type Theme = "journal" | "scrapbook" | "cinema" | "gallery";

export function ProductDemo({ theme }: { theme: Theme }) {
  const [step, setStep] = useState<"group" | "review" | "approve" | "done">("group");
  const [selected, setSelected] = useState<number[]>([]);
  const image = theme === "gallery" ? "gallery" : "journal";
  const name = theme === "gallery" ? "An afternoon together" : "Sunday baking";
  const reset = () => { setStep("group"); setSelected([]); };

  return <div className={`${p.demo} ${p[theme]}`}>
    <div className={p.phone}>
      <div className={p.status} aria-hidden="true"><span>9:41</span><span className={p.island} /><span>LTE ▰</span></div>
      <div className={p.appBar}><span className={p.appIcon}>lp</span><span>Life in Photos</span><span className={p.appMenu} aria-hidden="true">•••</span></div>
      <div className={p.screen}>
        {step === "group" && <>
          <p className={p.eyebrow}>YOUR PHOTO LIBRARY, A LITTLE LIGHTER</p>
          <h3>A little less<br />to sort.</h3>
          <p className={p.description}>Start with one moment.</p>
          <div className={p.groupPhoto}><img src={`/images/designs/${image}.png`} alt={`Sample photo group: ${name}`} /><span>4 similar photos</span></div>
          <div className={p.groupCaption}><strong>{name}</strong><span>One moment. Its photos together.</span></div>
          <button className={p.primary} onClick={() => setStep("review")}>Explore the review <span aria-hidden="true">→</span></button>
          <p className={p.reassurance}>One small group. At your own pace.</p>
        </>}
        {step === "review" && <>
          <button className={p.back} onClick={reset}>← Back to groups</button>
          <h3>A closer look.</h3>
          <p className={p.description}>Select sample photos to remove.</p>
          <div className={p.photoChoices}>{[0, 1, 2, 3].map((index) => <label key={index} className={p.choice}>
            <img src={`/images/designs/${image}.png`} alt={`Illustrative similar photo ${index + 1}`} style={{ objectPosition: `${42 + index * 6}% ${35 + index * 8}%` }} />
            <input type="checkbox" checked={selected.includes(index)} aria-label={`Select sample photo ${index + 1} for removal`} onChange={() => setSelected((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index])} />
          </label>)}</div>
          <p className={p.selection} aria-live="polite">{selected.length} of 4 selected for removal</p>
          <button className={p.primary} disabled={!selected.length} onClick={() => setStep("approve")}>Preview approval <span aria-hidden="true">→</span></button>
          <p className={p.reassurance}>Nothing is removed at this step.</p>
        </>}
        {step === "approve" && <>
          <button className={p.back} onClick={() => setStep("review")}>← Back to review</button>
          <div className={p.approvalIcon} aria-hidden="true">✓</div><h3>You have<br />the final say.</h3>
          <p className={p.description}>In the app, you approve removals before your library changes.</p>
          <div className={p.summary}><span>Sample photos selected</span><strong>{selected.length}</strong></div>
          <button className={p.primary} onClick={() => setStep("done")}>Finish this demo <span aria-hidden="true">→</span></button>
          <p className={p.reassurance}>This preview cannot access or delete photos.</p>
        </>}
        {step === "done" && <div className={p.done} role="status"><div className={p.approvalIcon} aria-hidden="true">✓</div><h3>A small step.<br />A calmer library.</h3><p className={p.description}>That&apos;s the idea behind Life in Photos. Your real photos haven&apos;t been accessed or changed.</p><button className={p.primary} onClick={reset}>Explore again</button></div>}
      </div>
      <div className={p.homeBar} aria-hidden="true" />
    </div>
    <p className={p.disclaimer}>Interactive illustration · Not an app screenshot</p>
  </div>;
}

export function ProductThumbnail({ theme }: { theme: Theme }) {
  const image = theme === "gallery" ? "gallery" : "journal";
  return <span className={`${p.thumbnail} ${p[theme]}`} aria-hidden="true"><span className={p.miniIsland} /><span className={p.miniBrand}>Life in Photos</span><strong>A little less<br />to sort.</strong><img src={`/images/designs/${image}.png`} alt="" loading="lazy" /><span className={p.miniCaption}>Similar photos, together</span><span className={p.miniButton}>Review a group →</span></span>;
}
