"use client";

import posthog from "posthog-js";

/* Site analytics (PostHog). instrumentation-client.ts starts it on every page before the page is interactive; the
   pages' own events go through capture() below. Visitors keep one anonymous ID and session across pages and reloads
   (localStorage, no cookie), so the switch to the other language stays inside the visit that started it. */

/** Session replay, off until Roy says otherwise. Turning it on is this line plus the project's recording switch. */
const SESSION_RECORDING = false;

// Opening any page with ?internal=1 marks this browser as ours (Roy's devices, the team) until ?internal=0.
const INTERNAL_KEY = "lip-internal";
// Never sent anywhere: the unsubscribe link carries the reader's email address and its signature.
const PRIVATE_PARAMS = ["email", "token"];

let initialized = false;

export type CampaignParameters = Record<string, string>;

export function getCampaignParameters(): CampaignParameters {
  if (typeof window === "undefined") {
    return {};
  }

  const search = new URLSearchParams(window.location.search);
  const names = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  return Object.fromEntries(
    names
      .map((name) => [name, search.get(name)] as const)
      .filter((entry): entry is readonly [string, string] => Boolean(entry[1]))
  );
}

/** The live site, a Vercel preview (or the vercel.app address) or a computer running it locally. */
function siteEnv() {
  const host = window.location.hostname;
  if (host === "lifeinphotos.app" || host === "www.lifeinphotos.app") return "production";
  if (host === "localhost" || host === "127.0.0.1") return "development";
  return "preview";
}

export function isInternal() {
  try {
    const flag = new URLSearchParams(window.location.search).get("internal");
    if (flag === "1") localStorage.setItem(INTERNAL_KEY, "1");
    if (flag === "0") localStorage.removeItem(INTERNAL_KEY);
    return localStorage.getItem(INTERNAL_KEY) === "1";
  } catch {
    return false;
  }
}

/** A URL with the unsubscribe link's email and token taken out; anything else comes back as it was. */
export function scrub(value: unknown) {
  if (typeof value !== "string" || !PRIVATE_PARAMS.some((name) => value.includes(`${name}=`))) return value;
  try {
    const url = new URL(value);
    PRIVATE_PARAMS.forEach((name) => url.searchParams.delete(name));
    return url.toString();
  } catch {
    return value;
  }
}

const scrubAll = (properties?: Record<string, unknown>) =>
  properties && Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, scrub(value)]));

/* The clicks worth naming, from one listener: the calls to join (links marked data-cta), a link to the same page in
   the other language, and any link to the App Store or TestFlight. Autocapture records every click besides. */
function onClick(event: MouseEvent) {
  const link = (event.target as Element).closest?.("a");
  if (!link) return;
  const locale = document.documentElement.lang;
  const href = link.getAttribute("href") ?? "";

  if (link.dataset.cta) {
    posthog.capture("cta_clicked", { cta: link.dataset.cta, target: href, locale });
  }
  const to = link.getAttribute("hreflang");
  if (to && to !== locale) {
    const source = link.closest(".lang-hint") ? "hint" : link.closest(".lang-menu") ? (link.closest("footer") ? "footer_menu" : "header_menu") : "other";
    posthog.capture("language_switched", { from: locale, to, source });
  }
  const store = /(^|\.)testflight\.apple\.com$/.test(link.hostname) ? "testflight" : /(^|\.)apps\.apple\.com$/.test(link.hostname) ? "app_store" : null;
  if (store) {
    posthog.capture("app_link_clicked", { store, target: link.href, locale });
  }
}

export function initAnalytics() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (initialized || !key || typeof window === "undefined") {
    return initialized;
  }

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    persistence: "localStorage",
    person_profiles: "identified_only",
    // The pages are plain links, but this also counts any App Router navigation.
    capture_pageview: "history_change",
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: !SESSION_RECORDING,
    session_recording: { maskAllInputs: true },
    before_send: (event) => {
      if (!event) return event;
      event.properties = scrubAll(event.properties) ?? event.properties;
      event.$set = scrubAll(event.$set);
      event.$set_once = scrubAll(event.$set_once);
      return event;
    }
  });
  posthog.register({
    is_internal: isInternal(),
    site_env: siteEnv(),
    vercel_env: process.env.NEXT_PUBLIC_VERCEL_ENV || "none"
  });
  document.addEventListener("click", onClick, true);
  initialized = true;
  return initialized;
}

export function capture(event: string, properties: Record<string, unknown> = {}) {
  if (initAnalytics()) {
    posthog.capture(event, properties);
  }
}
