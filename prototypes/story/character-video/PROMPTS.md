# Character video kit: inputs and prompts

Smooth, sharp Momo, Flip and Nori for the landing page, made as short video clips from the approved art.

The plan in one line: enlarge one front view per friend into a **master still**, then make every clip **start and end on that still**, so clips chain without a jump.

Make `momo_idle` first and send it before making the rest. It tests the whole pipeline.

## What to make

| # | File | What it is | Length |
|---|---|---|---|
| 1 | `masters/momo_master.png` | Momo, front rest pose, large | still |
| 2 | `masters/flip_master.png` | Flip, front rest pose, large | still |
| 3 | `masters/nori_master.png` | Nori, front rest pose, large | still |
| 4 | `clips/momo_idle.mp4` | Breathing, a blink, a glance | 5 s |
| 5 | `clips/momo_wave.mp4` | Big happy wave | 3 s |
| 6 | `clips/momo_hop.mp4` | Jump and catch (plays on Keep) | 3 s |
| 7 | `clips/momo_giggle.mp4` | Giggle | 3 s |
| 8 | `clips/flip_idle.mp4` | Breathing, curious glances | 5 s |
| 9 | `clips/flip_wave.mp4` | Quick cheeky wave | 3 s |
| 10 | `clips/flip_scratch.mp4` | Head tilt and scratch (plays on Skip, and in Common questions) | 4 s |
| 11 | `clips/flip_boing.mp4` | Springy bounce | 3 s |
| 12 | `clips/nori_idle.mp4` | Slow breathing, a slow blink | 5 s |
| 13 | `clips/nori_wave.mp4` | Gentle wave | 3 s |
| 14 | `clips/nori_nod.mp4` | Two slow nods (plays on Later) | 3 s |
| 15 | `clips/nori_hum.mp4` | Hands on belly, humming (trust section) | 6 s |
| 16 | `clips/trio_loop.mp4` | Optional. The three in their Polaroid | 5 s |

## Inputs (already in `inputs/`)

| File | Use it for |
|---|---|
| `momo_front_ref.png`, `flip_front_ref.png`, `nori_front_ref.png` | The image to enlarge. Cut from the pose strips, which are the sharpest front views we have (figures 407, 513 and 524 px tall). |
| `momo_sheet.png`, `flip_sheet.png`, `nori_sheet.png` | The approved character sheets. Attach as a second reference so the tool sees the texture, the eyes and the palette. |
| `trio_icon.png` | The app icon render. Start and end frame for the optional trio loop. |

## Step 1: master stills

**If your tool has a plain upscale (2x or 4x with no prompt), use that first** on `<name>_front_ref.png`. It changes the design least. Send me the result and I will place it on the square canvas with the right framing.

If the tool needs words, or the plain upscale comes out mushy, use the prompt below. Attach `<name>_front_ref.png` first and `<name>_sheet.png` second.

Settings: square image, as large as the tool allows, at least 2048 x 2048.

```text
Use the first attached image as the exact reference, and the attached character sheet for detail.
Recreate this same character as one large, sharp studio image. Same body shape and proportions, same colours, same hand carved painted wood surface, same googly eyes with one black pupil each, same face, hands and feet. Do not redesign, restyle or add anything.

Character: [CHARACTER LINE]

Pose: standing, straight front view, arms relaxed at the sides, feet flat on the ground.
Framing: square image, one full body figure, centred. The figure is about 55 percent of the image height and its feet are about 80 percent of the way down, so there is empty space above it and on both sides.
Background: one flat, even, warm off-white, colour #FAF7F1. No floor line, no gradient, no vignette, no props, no text. A very soft contact shadow under the feet is fine.
Light: soft warm studio light from the top left, the same as on the sheet.
Material: hand carved wood under matte paint, with visible chisel marks and grain. Not clay, not plastic, not flat vector, no outlines.
```

Character lines:

```text
Momo, the round mustard friend with a wide grin showing two rows of rounded cream teeth. Many shallow, overlapping scooped chisel facets across the belly, faint vertical wood grain, matte golden mustard paint (#B19738).
```

```text
Flip, the tall terracotta bean shaped friend with a small smile. Diagonal chisel cuts across the body, matte terracotta paint (#B85E4D).
```

```text
Nori, the tall calm teal friend with a soft closed smile. Flowing vertical wood grain showing through matte teal paint (#538D91).
```

Why the framing matters: the empty space is headroom for hops and room for waving arms. Every clip inherits this frame.

## Step 2: clips

Settings for every clip:

* Start frame: the master still. End frame: the same master still, if the tool accepts an end frame.
* Square, 1080 x 1080 or larger. 24 fps. Length as listed. No audio.
* Turn on "fixed camera" or "static shot" if the tool has it.

Paste this block first in every clip prompt, with the friend's name filled in:

```text
Static locked off camera. No zoom, no pan, no cuts. The background stays a flat, even, warm off-white and never changes. The lighting stays the same.
One character only: [NAME], a hand carved painted wood toy with googly eyes. It keeps exactly the same shape, colours, face and wood texture as in the first frame for the whole clip. The texture stays fixed to the body and does not shimmer or crawl.
It moves like a soft, springy handmade toy, with gentle squash and stretch. It stays centred, and its feet come back to the same spot.
No new objects, no text, no extra arms, legs, eyes or teeth.
The clip ends in exactly the same pose as the first frame.
```

If the tool has a negative prompt field:

```text
camera movement, zoom, pan, cut, background change, floor, props, text, extra limbs, extra eyes, deformed face, melting, texture flicker, glossy plastic, clay, heavy motion blur
```

### Momo: bouncy and giggly, quick and happy

`momo_idle` (5 s)

```text
Momo stands in place and breathes: the round body rises and settles gently. It rocks from one foot to the other, once. It blinks once, with eyelids the same mustard colour as its body. Its eyes glance to one side and come back. Its arms hang relaxed and sway a little. Happy grin the whole time. Small, calm motion only.
```

`momo_wave` (3 s)

```text
Momo lifts one arm high beside its head and waves an open hand quickly from side to side three times, with a small happy bounce of the whole body on each wave. Then it lowers the arm back to its side.
```

`momo_hop` (3 s)

```text
Momo crouches low, its body squashing wider, arms swinging back. It jumps straight up, body stretching taller, both arms straight up with open hands as if catching something falling from above, eyes looking up. It lands in the same spot with a soft squash, knees bent, arms out for balance, eyes squeezed happily shut. Then it straightens up and its arms return to its sides.
```

`momo_giggle` (3 s)

```text
Momo puts both hands on its belly, squeezes its eyes shut and giggles. Its body leans to one side and then the other, shoulders shaking in quick small bounces, mouth open in a wide grin. Then it opens its eyes and its hands drop back to its sides.
```

### Flip: quick and cheeky, springy

`flip_idle` (5 s)

```text
Flip stands in place and breathes gently. It is curious: its eyes dart to the left, then to the right, and its body leans slightly the same way each time. It blinks once, with terracotta eyelids. Its arms hang loose. Small smile the whole time.
```

`flip_wave` (3 s)

```text
Flip raises one long arm and gives a quick, cheeky wave, the hand flicking from side to side three times, its body tilted a little toward the waving arm. Then it drops the arm back to its side.
```

`flip_scratch` (4 s)

```text
Flip tilts its whole body to one side, lifts one long arm and scratches the top of its head, puzzled. Its eyes roll up toward the hand and its smile goes crooked. It holds that for a moment, then straightens up and lowers the arm.
```

`flip_boing` (3 s)

```text
Flip drops into a deep squat like a coiled spring, arms swung back. It springs straight up, body stretched tall, both arms straight up and feet together. It lands in the same spot, body squashing shorter and wider, arms flung out, mouth open in a happy O. It wobbles once and settles.
```

### Nori: calm and patient, the slowest of the three

`nori_idle` (5 s)

```text
Nori stands in place and breathes slowly. Its whole body sways very slightly to one side and back, like a tree in a light breeze. Its eyelids lower halfway, then close, then open again: one slow blink, with teal eyelids. Its arms hang relaxed. Soft smile the whole time. Very little motion.
```

`nori_wave` (3 s)

```text
Nori slowly raises one long arm to about shoulder height and gives a gentle wave, the open hand tilting from side to side twice. Then it lowers the arm calmly.
```

`nori_nod` (3 s)

```text
Nori gives two slow nods: the top of its body bows forward slightly and comes back, twice. Its eyes half close on each nod and its smile grows a little. Its feet stay flat.
```

`nori_hum` (6 s)

```text
Nori brings both hands together to rest on its belly, closes its eyes with a small content smile, and sways gently from side to side as if humming a tune, for about three seconds. Then it opens its eyes and lowers its arms back to its sides.
```

### Optional: the trio

`trio_loop` (5 s). Start and end frame: `inputs/trio_icon.png`. Do not use the shared block for this one.

```text
Static locked off camera. Plain white background that never changes. Three hand carved painted wood friends in a cream wooden picture frame. The frame stays still.
The red friend hanging upside down from the top edge swings very slightly. The yellow friend sitting on the bottom edge waves its raised hand twice and kicks its feet once. The teal friend gives the yellow friend's shoulder a gentle squeeze and blinks slowly.
All three keep exactly the same shapes, colours, faces and wood texture. No new objects, no text. The clip ends in exactly the same pose as the first frame.
```

## Check each take before keeping it

Make four to six takes per clip and keep the best. Reject a take if any of these fail:

* Flip back and forth between the first and last frame. Nothing should jump.
* The feet land where they started and the figure never leaves the frame.
* Two eyes, one pupil each, all the way through. Momo keeps two rows of teeth.
* Colour and wood texture do not change or shimmer.
* The background stays flat and nothing else appears.

## Where to put the results

Save into `masters/` and `clips/` next to this file, with the names from the table at the top. The clips do not need a transparent background. I remove it afterwards.
