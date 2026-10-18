# Waitlist

Visitors join early access by submitting an email on the hero or footer. The visible submit control is **Join the waitlist** (not “Find your moments”). The same `POST /api/waitlist` endpoint backs both forms.

## Sub-features

- `waitlist-hero` shows the hero form under the H1 **Find the moments worth keeping.**
- `waitlist-footer` shows the second form in `#join` (**Your family's moments are already in there.**).
- `waitlist-nav` uses header **Join the waitlist** to jump to `#join`.
- `waitlist-validate` rejects malformed email with 400 `Please enter a valid email address.`
- `waitlist-honeypot` accepts a filled `website` field with 200 success copy and does not require Resend.
- `waitlist-unconfigured` returns 503 `Early access is temporarily unavailable. Please try again later.` when Resend env is missing.
- `waitlist-success` (only with real Resend env) shows `You are on the list. Watch your inbox.` or already-joined copy.

## How to get to it (user POV)

- Load `/` and use the hero email field + **Join the waitlist**.
- Use header **Join the waitlist** or scroll to **Early access** / `#join`.
- Programmatic: `POST /api/waitlist` with JSON `{ "email": "…" }`.

## Driving it with control-landing

Preconditions:

- `control-landing doctor` prints `verdict=ok`.
- No production mailbox is targeted.
- `$EVIDENCE` is set.

- **Homepage CTA.** Run `control-landing get-home --out $EVIDENCE/waitlist/home.html`. HTML contains `Join the waitlist`, `Find the moments`, and `id="join"`.
- **Invalid email.** Run `control-landing post-waitlist --email "not-an-email" --out $EVIDENCE/waitlist/invalid.txt`. `http_status=400` and body error `Please enter a valid email address.`
- **Honeypot.** Run `control-landing post-waitlist --email "verify@example.com" --website "http://spam.test" --out $EVIDENCE/waitlist/honeypot.txt`. `http_status=200` and message `You are on the list. Watch your inbox.`
- **Valid email, no secrets.** Run `control-landing post-waitlist --email "verify@example.com" --out $EVIDENCE/waitlist/unconfigured.txt`. `http_status=503` and `Early access is temporarily unavailable. Please try again later.`
- **Browser (optional).** Open `/`, fill **Email address** on the hero, submit **Join the waitlist**. The form’s `role=alert` or `role=status` matches the HTTP outcome above. Footer form is a separate click path (`#join`).
- **Proof.** Keep the four HTTP captures. Homepage HTML alone is insufficient.

## Gotchas

- Headline copy is “Find the moments worth keeping.” The button label is **Join the waitlist**.
- Honeypot success is not a Resend subscribe.
- Do not invent `RESEND_API_KEY`. If secrets are present, use a disposable inbox and expect 200 success or already-joined.
- Two forms share the API; prove both placements in the browser if claiming both. HTTP POST cannot distinguish placement except via analytics `placement` in the JSON body (`hero` | `footer`) when using the real form.
- `X-Frame-Options: DENY` — do not embed the page in an iframe harness.
