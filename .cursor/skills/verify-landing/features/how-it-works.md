# How it works

The landing page explains the product in three numbered steps under **How it works**: bring clutter into focus, see what deserves a closer look, and review before anything changes.

## Sub-features

- `how-nav` follows header **How it works** to `#how-it-works`.
- `how-heading` shows `The app does the sorting.` / `You notice the moments.`
- `how-steps` lists 01–03 with the copy in `app/page.tsx`.

## How to get to it (user POV)

- Click **How it works** in the primary nav.
- Scroll to the section `id="how-it-works"`.

## Driving it with control-landing

Preconditions:

- Doctor is green.
- `$EVIDENCE` is set.

- **Fetch.** Run `control-landing get-home --out $EVIDENCE/how-it-works/home.html`.
- **Anchor.** HTML contains `id="how-it-works"` and nav `href="#how-it-works"`.
- **Steps.** Body contains `Bring the clutter into focus`, `See what deserves a closer look`, and `Review before anything changes`.
- **Browser (optional).** Click **How it works**. The steps section is in view. Screenshot `$EVIDENCE/how-it-works/section.png` if a browser is available.
- **Proof.** Saved HTML with the three step titles. A waitlist POST is not this feature.

## Gotchas

- Step 03 is about review-before-change, not a second waitlist form.
- `/designs` is an internal gallery, not this section.
