---
name: verify-landing
description: Drive the Life in Photos Next.js landing page (waitlist CTAs, How it works, page copy) in a browser or with curl the way a visitor does. Use when proving marketing-page or waitlist API behavior, not the iOS PhotoAgent app.
---

# Verify Life in Photos landing page

Project-local control skill for this repo, the Life in Photos landing page (Next.js 16, React 19). The iOS app lives in a separate repo (hackerker-ai/life-in-photos) with its own `verify-photoagent` skill; this skill covers the public waitlist site only.

## Interview (ground truth)

- **Surface:** Public marketing page at `/`. Hero H1 **Find the moments worth keeping.** Primary actions are **Join the waitlist** (hero + footer `#join`) and nav **How it works** (`#how-it-works`). There is no button labeled “Find your moments”; that phrase is headline copy only.
- **Run:** `npm install` then `npm run dev` (Next default port **3000**). Isolated verification uses `VERIFY_LANDING_PORT` (default **4317**) bound to `127.0.0.1`.
- **Drive:** HTTP (`curl`) for HTML and `POST /api/waitlist`. Browser/CDP for clicking the real form. No Playwright in this repo — do not add it.
- **Observe:** HTML, JSON error/success bodies, HTTP status, screenshots. Resend/PostHog are production boundaries; without `.env.local` secrets a valid signup returns **503**.
- **Isolate:** Always use a dedicated port and PID file. Do not kill a `next` process you did not start. Two agents must pick different `VERIFY_LANDING_PORT` values.

Do not invent Resend or PostHog credentials. Honeypot and validation paths work without secrets.

## Launch

From repo root:

```sh
export VERIFY_LANDING_PORT="${VERIFY_LANDING_PORT:-4317}"
export VERIFY_LANDING_HOST=127.0.0.1
.cursor/skills/verify-landing/helpers/control-landing launch
```

The helper runs `npm install` if needed, then `npx next dev --hostname 127.0.0.1 --port "$VERIFY_LANDING_PORT"` from the repo root, records PID/log under `/tmp/verify-landing-$PORT.*`.

Ready when `GET http://127.0.0.1:$PORT/` returns 200 and the HTML contains `Find the moments` and `Join the waitlist`.

Optional production-like run: `npm run build && npm run start -- --hostname 127.0.0.1 --port $PORT`. Prefer `dev` for verification unless proving the production server.

Teardown: `helpers/control-landing cleanup` (kills only the PID in the pidfile).

## Doctor

```sh
.cursor/skills/verify-landing/helpers/control-landing doctor
```

Must confirm:

- pidfile process is alive and listening on `VERIFY_LANDING_PORT`
- `GET /` is 200
- `<title>` is `Life in Photos | Find the moments worth keeping`
- response is this Next app (hero copy), not some other server on the port

If doctor fails, relaunch or pick another port. Never drive an unknown listener.

## Drive

Stable handles:

- Landmark: `main`, header brand `Life in Photos home`
- Nav: `How it works` → `#how-it-works`; `Join the waitlist` → `#join`
- Hero H1: `Find the moments worth keeping.`
- Forms: two `.waitlist-form` instances (`placement` hero vs footer). Email field accessible name **Email address**. Submit **Join the waitlist** (disabled label **Joining...**).
- Success/error: `role="status"` or `role="alert"` with `.form-message`
- Honeypot: hidden `Website` input (`name="website"`), `aria-hidden`
- API: `POST /api/waitlist` JSON `{ email, website?, campaign? }`
- Trust copy: `Review before changes`, `No silent deletion`
- Internal gallery (optional): `/designs`

Browser: open `http://127.0.0.1:$PORT/`, click by accessible name. Do not use coordinates.

HTTP helper:

```sh
.cursor/skills/verify-landing/helpers/control-landing get-home --out "$EVIDENCE/home.html"
.cursor/skills/verify-landing/helpers/control-landing post-waitlist --email "not-an-email" --out "$EVIDENCE/invalid.json"
.cursor/skills/verify-landing/helpers/control-landing post-waitlist --email "verify@example.com" --website "http://spam.test" --out "$EVIDENCE/honeypot.json"
.cursor/skills/verify-landing/helpers/control-landing post-waitlist --email "verify@example.com" --out "$EVIDENCE/signup.json"
```

Read `features/waitlist.md` before claiming waitlist proof. Hero submit is not proof of the footer form.

## Evidence

Directory: `$VERIFY_LANDING_EVIDENCE` or `/tmp/verify-landing-evidence/<run-id>/`. Cleanup must not delete it.

Proof standards:

- Visitor path: load `/`, see the CTA, submit or call the same `POST` the form uses.
- Capture action **and** result (HTML before, JSON/status after). A 200 on `/` alone is not waitlist proof.
- Side effects: without `RESEND_API_KEY` + `RESEND_WAITLIST_SEGMENT_ID` + `WAITLIST_FROM_EMAIL`, a valid email must be **503** `Early access is temporarily unavailable. Please try again later.` Do not treat that as a successful subscribe.
- Honeypot (`website` non-empty) returns 200 `You are on the list. Watch your inbox.` **without** calling Resend — that is anti-bot behavior, not a real signup.
- Invalid email → 400 `Please enter a valid email address.`
- Do not commit secrets. Do not POST real personal emails to a configured production Resend project from a verification run; use a disposable address only when secrets are intentionally present.

## Cleanup

```sh
.cursor/skills/verify-landing/helpers/control-landing cleanup
```

Kills only the PID recorded at launch. Removes pidfile/logfile scratch. Leaves `$VERIFY_LANDING_EVIDENCE` in place. Does not `pkill node` or `pkill next`.

## Helpers

From repo root; script is executable.

| Command | Purpose |
|---|---|
| `helpers/control-landing launch` | Install deps if needed, start Next on the isolated port |
| `helpers/control-landing doctor` | Process + `GET /` identity check |
| `helpers/control-landing get-home [--out FILE]` | Save homepage HTML |
| `helpers/control-landing post-waitlist --email ADDR [--website URL] [--out FILE]` | POST `/api/waitlist` |
| `helpers/control-landing cleanup` | Stop the instance this run started |

Feature map: [`features/README.md`](features/README.md). Keep it honest with `/maintain-verification-skill`.
