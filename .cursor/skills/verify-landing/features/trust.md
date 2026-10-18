# Trust and review-first copy

The page tells visitors that cleanup suggestions stay suggestions until they review, with quiet-proof chips **Review before changes** and trust facts **No silent deletion** / **Clear cloud consent**.

## Sub-features

- `trust-quiet-proof` shows `Built for iPhone`, `Review before changes`, `Early access` under the hero form.
- `trust-card` shows `Your family photos deserve careful decisions.` and `Review first`.
- `trust-no-silent-delete` includes `No silent deletion` and `Suggestions stay suggestions.`

## How to get to it (user POV)

- Load `/` and read the hero quiet-proof row.
- Scroll to **Thoughtful by default**.

## Driving it with control-landing

Preconditions:

- Doctor is green.
- `$EVIDENCE` is set.

- **Fetch.** `control-landing get-home --out $EVIDENCE/trust/home.html`.
- **Assert copy.** File contains `Review before changes`, `No silent deletion`, `Suggestions stay suggestions`, and `Optional cloud-powered features are clearly disclosed`.
- **Proof.** Saved HTML. Do not call `/api/waitlist` as proof of this feature.

## Gotchas

- This is marketing copy on the landing page, not in-app Settings legal text.
- Matching strings in HTML is the HTTP proof; a screenshot of the trust card is stronger if a browser is available.
