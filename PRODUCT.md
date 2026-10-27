# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Parents with children of different ages, not only newborns, whose iPhone camera rolls hold thousands of photos they rarely look back at. The landing page's visitor wants to know what the app does with those photos and whether it is safe to try.

## Product Purpose

Life in Photos is an iPhone app (iOS 26 or later, in beta through TestFlight) that finds the moments buried in a camera roll. It serves moments in small sessions of ten, about five minutes each, so a review never gets long. Keep saves a moment to Moments, Later holds it to decide another time, and Skip leaves it out. Over weeks the kept moments become a wall you can flip through and share. This site collects emails for the TestFlight invite.

## Positioning

Ten ready moments at a time, already gathered and written up, instead of a cleanup chore. The library itself is never changed: Keep, Later and Skip only change what is in the app.

## Capabilities and Constraints

- Ten moments per session (not a daily quota), about five minutes; you can stop partway and come back. Later keeps what you can't decide on.
- Near-duplicate takes fold into one; screenshots and utility frames stay out of a moment.
- Finding moments runs on the iPhone. Indexing pauses when the phone gets warm and picks up where it left off.
- Each moment gets a title and notes by default, written by Meta's Muse Spark model through the developer's own account. The request carries up to five small previews (location and camera data removed) plus a short text description: place name, time of day, number of people, activity, and the names of people labelled in Photos. An off switch is planned for a later version; the visitor can edit what comes back.
- Place names come from Apple's reverse geocoding of photo locations, so the page must not say that only the notes step leaves the phone.
- Privacy (titles are on by default, confirmed by the owner): "Your photos stay on your phone and in your own iCloud. To write each moment's title and note, a few small previews, with location and camera data removed, are sent to an AI model. We don't run servers that keep your photos."
- Pricing is decided after the beta. Every beta tester gets an exclusive discount offer.

## Legal and contact

- Published under the developer's own name (exact name still to be filled in on the privacy page). Privacy and general contact: contact@hackerker.com. No postal address on the site.
- Retention: waitlist emails are kept until the person asks to be removed; site analytics follow PostHog's standard retention.

## Brand Commitments

- The three wooden friends Momo, Flip and Nori are part of the brand.
- Screens shown on the site come from the app mockup in `public/screens/` (Find, a moment's session screen, Later, Kept, Moments). Never show an app screen the mockup does not have.
- Real family photos never go in git. Pages use the face-swapped family in `prototypes/story-real/face-swap/swapped/`.

## Evidence on Hand

- App mockup screens: `public/screens/find-home.png`, `session.png`, `later.png`, `kept.png`, `moments.png`.
- Face-swapped photo set (115 photos, an invented family of four), kept out of git.
- Testimonials: three quotes from parents the owner talked to (Tiffany, Sunny, Ami), added 2026-10-27. Only add quotes real parents gave; never invent them.

## Product Principles

- Show the app doing its job rather than describing it.
- Every claim on the page is one the app can back today.
- Calm and few: the family's moments lead, the interface stays quiet.
