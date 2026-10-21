# Character stills kit: shot list and prompts

Sharp still images of Momo, Flip and Nori that replace the stop-motion sprite sheets on the landing page. The sprite frames are 420 px tall and get stretched 2 to 2.5 times on retina screens, and frame swapping looks jittery. Each friend now gets a few still poses at 2048 px. Reactions on the page move the whole still with a small CSS hop, tilt or squash.

Each friend has a job, and it matches the app: **Flip finds** (he lives on the Find screen), **Nori waits** (Later), **Momo keeps** (Moments). The poses below act those jobs out.

## Shot list

| # | File | Pose | Used on the page |
|---|---|---|---|
| 1 | `momo-front.png` | Standing front, resting grin | Hero, demo (at rest), Moments screen |
| 2 | `momo-keep.png` | Jumping for joy, arms up | Demo, plays on Keep |
| 3 | `momo-wave.png` | Big happy wave | Hero greeting, invite |
| 4 | `nori-front.png` | Standing front, calm smile | Hero, demo (at rest) |
| 5 | `nori-later.png` | Content slow nod, hands clasped | Demo, plays on Later |
| 6 | `nori-wave.png` | Gentle wave | The demo's "Your turn" hint |
| 7 | `flip-front.png` | Standing front, small smile | Demo (at rest) |
| 8 | `flip-skip.png` | Head tilt, scratching head | Demo, plays on Skip |
| 9 | `flip-peek.png` | Peeking over an edge, hands on it | Hero, over the top of the phone |
| 10 | `flip-hang.png` | Hanging upside down from an edge | Find screen, over the Polaroid deck (as in the mockup) |
| 11 | `trio-polaroid.png` | The three with an empty Polaroid frame | Invite section |

Optional, only if the friends stay in the trust and questions sections: `nori-hum.png` (hands on belly, eyes closed, humming).

## How to make each image

- **Attach two references to every prompt:**
  - **The character sheet:** `/Users/Shared/LifeInPhotos/StopMotionKit/2026-10-08/material-refinements/momo_character_sheet_icon_matched.png`, `flip_character_sheet_carved_wood.png` or `nori_character_sheet_approved.png`.
  - **The studio still:** `/Users/Shared/LifeInPhotos/Brand/2026-10-13/<name>-studio/<name>-front-studio.png`.

  For the trio, attach all three studio stills plus `prototypes/story-real/assets/trio-cutout.png`.
- **Size and framing:** square 2048 × 2048. The single-friend poses 1 to 8 share one framing, so the page can swap them without the friend jumping: head top near 14% of the height, foot soles on a baseline at 90%, centred. Poses 9, 10 and 11 say their own framing.
- **Background:**
  - **Best:** a transparent background (PNG with alpha), no shadow.
  - **If the tool can't do transparency:** a perfectly flat uniform #FAF7F1 background with **no** contact shadow, and I'll cut it out. Flat and shadowless matters more than anything else here.
- **Save** into `prototypes/story/character-stills/` with the file names above, and keep each prompt in a `<file>.txt` beside it.

## Shared block (paste at the start of every prompt)

```text
Recreate EXACTLY the character shown in the attached character sheet and studio still, in a new pose. This is the same character, not a reinterpretation: same silhouette and proportions, same colours, same hand-carved painted wood surface, same raised cream googly eyes with exactly ONE black pupil each, same face, hands and feet. Do not redesign, restyle or add features.
Material: hand-carved solid wood under matte paint, crisp physical chisel facets and wood grain through the paint, exactly as in the sheet. No clay, plasticine, plastic, plush, flat vector or outlines.
Lighting: soft warm studio light from the upper left, matching the studio still.
Background: fully transparent (PNG alpha). If transparency is not possible, a perfectly flat uniform warm off-white #FAF7F1 edge to edge. No shadow, no floor line, gradient, vignette, props, text, labels or swatches.
Output: one square 2048 x 2048 image, very sharp, with one character only unless stated.
```

## Character lines (paste after the shared block)

**Momo**
```text
CHARACTER: Momo, the round mustard friend. Rounded pear-like belly, no neck, short sturdy legs, rounded feet, drooping rounded arms. Broad grin with TWO rows of rounded cream teeth. Paint: matte golden mustard (#B19738 base, warm lit areas around #E39E39, shade around #7E4A0A), with many shallow overlapping scooped chisel facets, about 6 to 8 across the belly.
```

**Flip**
```text
CHARACTER: Flip, the tall rounded terracotta bean. Short feet, long relaxed rounded arms, small closed curved smile, two raised cream googly eyes. Paint: matte warm muted brick terracotta #B85E4D, shadows #8C4337, lights #CF8675, with long diagonal knife cuts and crisp ridges.
```

**Nori**
```text
CHARACTER: Nori, the tallest, calm teal friend. Long soft column body, short legs, relaxed arms, gentle closed smile, two raised cream googly eyes. Paint: matte teal #538D91, shade #36686D, light #80AAAD, with brown-gold exposed wood grain in mostly VERTICAL narrow recessed channels that follow the body.
```

## Pose lines (paste last)

**1. momo-front.png**
```text
POSE: standing straight, front view, arms relaxed at the sides, feet flat, the resting broad grin, eyes looking at the viewer. Framing: whole body, head top at 14% of canvas height, foot soles at 90%, centred.
```

**2. momo-keep.png**
```text
POSE: jumping for joy. Both arms thrown straight up, feet tucked a little off the ground, body slightly stretched upward, the widest happy grin, eyes looking up. A joyful catch-the-moment jump. Framing: same scale as momo-front; head top at 8% of canvas height, the lowest foot at 86%, centred. No motion lines or effects.
```

**3. momo-wave.png**
```text
POSE: big happy wave. Front view, his right arm raised high and bent at the elbow, waving; left arm relaxed at his side; feet flat; broad grin; eyes at the viewer. Framing: same as momo-front (head top 14%, foot soles 90%, centred).
```

**4. nori-front.png**
```text
POSE: standing straight, front view, arms relaxed at the sides, feet flat, gentle calm smile, eyes at the viewer. Framing: whole body, head top at 10% of canvas height (Nori is the tallest), foot soles at 90%, centred.
```

**5. nori-later.png**
```text
POSE: a calm, content slow nod. Front view, head tipped slightly forward, eyes gently closed as soft curved lids, a warm small smile, both hands loosely clasped in front of the lower belly, feet flat. Reads as "no rush, it can wait". Framing: same as nori-front (head top 10%, foot soles 90%, centred).
```

**6. nori-wave.png**
```text
POSE: a gentle, friendly wave. Front view, one arm raised to shoulder height with an open soft hand, the other relaxed at the side, eyes at the viewer, warm smile. Calm, not excited. Framing: same as nori-front (head top 10%, foot soles 90%, centred).
```

**7. flip-front.png**
```text
POSE: standing straight, front view, arms relaxed at the sides, feet flat, small closed curved smile, eyes at the viewer. Framing: whole body, head top at 12% of canvas height, foot soles at 90%, centred.
```

**8. flip-skip.png**
```text
POSE: puzzled and cheeky. Head and upper body tilted about 15 degrees to his left, one hand raised and scratching the side of his head, the other arm relaxed, a small lopsided smile, one eye slightly squinted, as if saying "hmm, not this one". Feet flat. Framing: same as flip-front (head top 12%, foot soles 90%, centred).
```

**9. flip-peek.png**
```text
POSE: peeking over a ledge. Front view of only the upper half of the body rising above an invisible straight horizontal edge, both hands resting flat on that edge, curious eyes looking down and to the viewer's left, small smile. The body is cut off cleanly along a perfectly straight horizontal line at 78% of canvas height (that is where the ledge is; do not draw the ledge). Framing: head top at 18% of canvas height, centred.
```

**10. flip-hang.png**
```text
POSE: hanging upside down from an edge, playful, like the Flip in the attached trio image. Fully upside down: his feet and lower legs hooked over an invisible straight horizontal edge at the TOP of the figure, body hanging down, head at the bottom, both eyes looking at the viewer (pupils correct for upside down), arms dangling loosely. Do not draw the edge. Framing: feet at 10% of canvas height, head bottom at 85%, centred.
```

**11. trio-polaroid.png**
```text
Use the attached trio image as the composition reference and the three studio stills as the identity references. Recreate the same scene at higher resolution and with each friend matching their studio still exactly: Nori on the left hugging the left side of a large empty cream Polaroid frame with one arm around it; Momo sitting on the bottom-right of the frame, legs dangling over the front, waving with his free arm and grinning; Flip hanging upside down from the top-right corner, feet hooked over the frame, eyes looking at the viewer. The Polaroid frame is carved, painted cream wood (#F1E8D2) with the same chisel texture, and its photo window is EMPTY and fully transparent. Slight 4-degree clockwise tilt to the whole group. Framing: the group fills about 86% of the canvas, centred. Transparent background, no shadow.
```

**Optional: nori-hum.png**
```text
POSE: humming contentedly. Front view, both hands resting on the belly, eyes closed in soft curved lids, mouth a small round "o" as if humming, feet flat. Framing: same as nori-front (head top 10%, foot soles 90%, centred).
```

## When they are ready

Send me the files, or tell me they're in this folder. I'll cut out any non-transparent ones, export 2x WebP at the page's display sizes, swap them in for the sprites, and add the CSS reactions: a hop on Keep, a slow dip on Later, a tilt on Skip, and a small bob for the waves.
