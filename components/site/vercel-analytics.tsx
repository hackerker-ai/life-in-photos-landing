"use client";

import { Analytics } from "@vercel/analytics/next";
import { isInternal, scrub } from "@/lib/analytics";

/* Vercel Web Analytics: a second, independent visitor count to check PostHog's against. Cookie-free and keeps no
   personal data. Our own browsers (?internal=1, the same flag PostHog uses) aren't counted, and the unsubscribe
   link's email and token never leave the page. Rendered once, in the root layout. */
export function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => (isInternal() ? null : { ...event, url: scrub(event.url) as string })}
    />
  );
}
