# Landing page verification map

This directory is the maintained source for verifying the Life in Photos public landing page (this repo). Read this index before driving, then use the matching feature file.

## Baseline preconditions

- Node 22+ and npm.
- Isolated port: `VERIFY_LANDING_PORT` (default 4317) on `127.0.0.1`.
- `helpers/control-landing launch` then `doctor` (`verdict=ok`).
- Do not put production Resend keys in the verification environment unless the recipe is an intentional live subscribe with a disposable inbox.
- Evidence: `/tmp/verify-landing-evidence/<run-id>/`. Cleanup must not delete it.

## Driving conventions

- Start from `GET /` unless a file says otherwise.
- Prefer accessible names: **Join the waitlist**, **How it works**, **Email address**.
- Hero and footer forms are separate entry points.
- HTTP helpers go through `control-landing`. Browser clicks are allowed in addition, not instead of capturing the API result when proving signup.

## Proof and skip reporting

- Capture HTML/JSON and status codes for HTTP drives; add a screenshot if a browser is available.
- A homepage 200 is not waitlist proof.
- 503 without secrets is the expected valid-email outcome, not a product outage, unless `.env.local` is supposed to be configured.
- Do not report footer as verified because hero worked.

## Feature entry contract

H1 + paragraph, then H2s: `Sub-features`, `How to get to it (user POV)`, `Driving it with control-landing`, `Gotchas`.

## Features

- [Waitlist](./waitlist.md) covers hero/footer **Join the waitlist**, validation, honeypot, and unconfigured Resend.
- [How it works](./how-it-works.md) covers nav to `#how-it-works` and the three steps.
- [Trust and review-first copy](./trust.md) covers “Review before changes” / no silent deletion claims on the page.
