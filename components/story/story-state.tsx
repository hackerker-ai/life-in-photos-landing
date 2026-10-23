"use client";

import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { capture, getCampaignParameters } from "@/lib/analytics";
import { steerInPageLinks } from "./anchor-scroll";

/* What the "Now you try" demo and the invitation's wall share: the demo moments the visitor kept (indexes into PLAY, in
   the order kept) and whether they joined the beta, which puts their own Polaroid on the wall. */
type StoryState = {
  kept: number[];
  setKept: Dispatch<SetStateAction<number[]>>;
  signedUp: boolean;
  setSignedUp: Dispatch<SetStateAction<boolean>>;
};

const StoryContext = createContext<StoryState | null>(null);

export function StoryProvider({ lang, children }: { lang: string; children: ReactNode }) {
  const [kept, setKept] = useState<number[]>([]);
  const [signedUp, setSignedUp] = useState(false);

  useEffect(() => {
    capture("landing_page_viewed", { locale: lang, ...getCampaignParameters() });
  }, [lang]);

  useEffect(() => steerInPageLinks(), []);

  return <StoryContext value={{ kept, setKept, signedUp, setSignedUp }}>{children}</StoryContext>;
}

export function useStory() {
  const state = useContext(StoryContext);
  if (!state) throw new Error("useStory needs a StoryProvider above it.");
  return state;
}
