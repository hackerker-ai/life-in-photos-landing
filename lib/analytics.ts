"use client";

import posthog from "posthog-js";

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

export function capture(event: string, properties: Record<string, unknown> = {}) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || typeof window === "undefined") {
    return;
  }

  if (!initialized) {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      disable_session_recording: true,
      persistence: "memory"
    });
    initialized = true;
  }

  posthog.capture(event, properties);
}
