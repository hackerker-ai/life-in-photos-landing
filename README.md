# Life in Photos landing page

The marketing site for Life in Photos, built with Next.js, Resend and PostHog. The iOS app lives in its own repo, [hackerker-ai/life-in-photos](https://github.com/hackerker-ai/life-in-photos). This site moved out of `tools/marketing-automation/landing-page` there, on 2026-10-18.

## Design prototypes

`prototypes/` holds static HTML explorations, separate from the Next.js app. Open any `index.html` in a browser.

| Folder | What it is |
|---|---|
| `prototypes/story/` | The scroll-story page: a camera-roll river in the hero, a pinned scene that sorts 3,482 photos into ten moments, a Keep / Later / Skip demo and the invitation. Drawn stand-in scenes in the Polaroids. |
| `prototypes/story-real/` | The same page with real photos. The photos are not in git (see `.gitignore`), so this page shows empty frames until `assets/photos/` is filled with the face-swapped set. `face-swap/` holds the prompts and manifest for making that set. |
| `prototypes/story/character-video/` | Prompts and reference inputs for animating Momo, Flip and Nori as short video clips. |
| `prototypes/hero/` | An earlier hero study with the stop-motion friends. |

Never commit real family photos. Only face-swapped or otherwise approved images belong in this repo.

## Local setup

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and replace every placeholder.
3. Create a **Life in Photos Waitlist** Segment in Resend and use its ID for `RESEND_WAITLIST_SEGMENT_ID`.
4. Verify the sending domain configured in `WAITLIST_FROM_EMAIL` with Resend.
5. Run `npm run dev`.

## Waitlist behavior

- Validates and normalizes the submitted email on the server.
- Silently accepts honeypot submissions without adding them to Resend.
- Creates a Resend Contact and adds it to the configured Segment.
- Handles an existing Contact without sending duplicate welcome messages.
- Sends a concise welcome email to new subscribers.
- Optionally sends an anonymous signup notification to `WAITLIST_NOTIFICATION_EMAIL`.
- Never exposes the Resend API key to the browser.

## Analytics

When PostHog environment variables are present, the page records:

- `landing_page_viewed`
- `waitlist_signup_attempted`
- `waitlist_signup_completed`
- `waitlist_signup_failed`

Events include placement and UTM campaign parameters. Only the email domain, not the full address, is included in analytics events. Autocapture and session recording are disabled, and analytics persistence is memory-only.

## Deployment

Deploy the directory as a Next.js project on Vercel. Add the environment variables in the Vercel project settings and apply platform-level rate limiting to `/api/waitlist` before promoting the page broadly.

The placeholder metadata domain in `app/layout.tsx` must be replaced if the production URL is not `https://lifeinphotos.app`.
