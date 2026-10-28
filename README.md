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

## Pages and languages

The home page and the privacy policy are the story design from `prototypes/story-real/`, rebuilt as components in `components/story/`, `components/privacy/` and `components/site/`.

| Path | Page |
|---|---|
| `/`, `/privacy` | English |
| `/zh-Hant`, `/zh-Hant/privacy` | Traditional Chinese (still the English text, kept out of search until translated) |
| `/designs` | The earlier design explorations |

Every user-facing string, alt text included, lives in `app/[lang]/dictionaries/` (one file per locale). `proxy.ts` serves English at the root and redirects `/en/...` there. The page's photos in `public/photos/`: every photo with the family in it is from the face-swapped set (`s/`, `m/`); `x/` holds the clutter (screenshots, photos of stuff, a few blurry shots), small square tiles checked for anything personal, and `s/` also has the few accidental shots with nobody in them. Metadata is stripped.

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
- Sends a concise welcome email to new subscribers, in the language of the page they joined from (English or Traditional Chinese).
- Every welcome email has a signed "Leave the list" link to `/unsubscribe`, plus one-click `List-Unsubscribe` headers. Leaving marks the Resend Contact unsubscribed; signing up again brings it back. Links are signed with `WAITLIST_UNSUBSCRIBE_SECRET`, or `RESEND_API_KEY` when that is not set.
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

The site's address, `https://lifeinphotos.app`, lives in `lib/site.ts`: canonical links, share images, `robots.txt`, `sitemap.xml` and (unless `SITE_URL` is set) the links in welcome emails.

Icons are `app/favicon.ico`, `app/icon.svg` (the tilted-frame mark on the brand yellow) and `app/apple-icon.png` (the app icon). Each language's share image is `public/og/<locale>.jpg` (1200×630): the logo, headline and description beside the three friends in their Polaroid, on the brand yellow. It was designed on the "Life in Photos share image" Design canvas (board E); re-render it if the headline or description changes. The sitemap lists only locales whose dictionary `status` is `"translated"`.
