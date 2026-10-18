# Face swap kit: a new family for the landing page

Goal: replace the four people in every photo on the page with four new, invented people. Everything else stays the same: background, clothes, pose, framing, light, expressions.

`to-process/` holds all 115 photos with people in them, with no location or camera data. `manifest.csv` lists each one with its moment, date, the kids' ages and how it is shown on the page:

* **large** (35 photos, 2048 px): the ten Polaroids, the three play cards and the hero. These are seen up close, so they matter most.
* **small** (80 photos, 1024 px): the camera roll tiles, shown about 45 px wide. Faces only need to be different, not perfect.

Save each edited photo into `swapped/` with the **same file name**. Both folders are ignored by git; never commit them.

## Step 1: make the new family (reference sheets)

Use an image tool that can create and edit images from reference images. Make one sheet per person, so every later edit can attach the same four sheets and the faces stay consistent.

Shared block for every sheet:

```text
Create a character reference sheet of one invented person. This must not look like any real or famous person.
Natural, candid photographic style like an iPhone family photo, soft daylight, plain light grey background.
Show the same person several times in one row: front view, three quarter view, and a big natural smile with teeth showing. Head and shoulders only. No text, no labels.
```

Then one of these per sheet. Change the details if you want a different look; keep them consistent once chosen.

```text
Person: the dad. East Asian man, about 35, round face, short black hair with a soft side part, thin black rectangular glasses, clean shaven, warm wide smile.
```

```text
Person: the mom. East Asian woman, about 33, oval face, straight dark brown hair just past the shoulders with light face-framing layers, no glasses, bright open smile.
```

```text
Person: the older child, a girl. East Asian, show her at four ages in the row: about 6 months, about 1 year, about 4 years and about 6 years. Round cheeks, dark brown eyes, black hair; at 4 and 6 years a short bob with straight bangs.
```

```text
Person: the younger child, a boy. East Asian, show him at three ages in the row: about 6 months, about 1 and a half years and about 2 and a half years. Chubby cheeks, short black hair, big dark eyes.
```

Save the sheets as `swapped/_ref_dad.png`, `swapped/_ref_mom.png`, `swapped/_ref_girl.png`, `swapped/_ref_boy.png` and send them to me before Step 2.

## Step 2: swap each photo

Attach the photo from `to-process/` first, then the four reference sheets. Settings: keep the original size and aspect ratio.

```text
Edit the first image. Replace each person in it with the matching person from the attached reference sheets: the man with the dad, the woman with the mom, the older child with the girl, the younger child or baby with the boy, at the age shown in this photo.
Change only faces and hair. Keep everything else exactly as it is: the background, clothes, hats, hands, poses, head angles, where each person is looking, the expressions (open mouths, wide smiles, closed eyes), the framing, the light, the colours and the photo quality, including any blur or grain.
Keep it a believable, unretouched phone photo. No new people, objects or text.
```

If only some of the people appear, the same prompt works; it replaces only who is there.

## Ages by moment

`manifest.csv` has this for every file. Ages are my reading of the dates; fix them in the prompt if they are off.

| Moment | Large photos | Date | Kids' ages |
|---|---|---|---|
| Kings Canyon lake | 11914, 11900, 11986 | Sep 15, 2024 | girl ~5, boy ~2 |
| Sequoia trail | 11983, 11819, 11863 | Sep 15, 2024 | girl ~5, boy ~2 |
| Hokkaido snow | 15113, 15176, 15107 | Jan 16, 2024 | girl ~4½ |
| Tamsui riverside | 15620, 15617, 15667 | Nov 26, 2023 | girl ~4½, boy ~1½ |
| Shoufeng | 20269, 20346, 20299, 20300, 20392 | Jan 8, 2023 | girl ~3½, boy (baby) |
| Hualien daylilies | 24360, 24342, 24275, 24471, 24481 | Sep 6, 2020 | girl ~1½ |
| Girl turns one | 25998, 26008, 26022 | Apr 21, 2020 | girl 1 |
| Beimen salt fields | 26711, 26718, 26734 | Mar 1, 2020 | girl ~1 |
| Taipei winter | 27064, 27058, 27083 | Feb 2, 2020 | girl ~10 months |
| Summer 2019 | 28887, 28862, 28824 | Aug 19, 2019 | girl ~4 months |
| Cherry picking (hero) | 7502 | May 25, 2025 | girl ~6 |

## Check each result before keeping it

* Nobody looks like the real person. Compare side by side with the original.
* The same person looks the same across photos of one moment.
* Hands, teeth and eyes look right; no extra fingers or doubled features.
* The background and clothes did not change.
* The photo still looks like a phone snapshot, not a polished render.

When `swapped/` has all 115, tell me and I will make the page copies and republish. Do the 35 large ones first if you want to see them on the page sooner.
