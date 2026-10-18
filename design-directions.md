# Landing page design directions

Created September 11, 2026. Design explorations only; the original homepage is unchanged.

## Preview

- Comparison: /designs
- 01 The Family Journal: /designs/journal
- 02 The Happy Scrapbook: /designs/scrapbook
- 03 The Everyday Film: /designs/cinema
- 04 The Living Gallery: /designs/gallery

Each page has a persistent comparison switcher and uses the existing waitlist component and API. Provider credentials are still required for live waitlist behavior. No email submissions were made during this design task. The design routes are marked noindex. These designs have not been build-tested or browser-validated in this task.

## Positioning held constant

Parents with children of different ages, not only newborns. Meaningful moments are the outcome; cleanup is the first practical step. MVP promises are limited to similar-photo grouping, manageable review and explicit approval before removal. Story creation is clearly described as future vision. No fake customer stories, adoption counts, automatic best-photo claims or unlimited recovery promises.

## References studied

Land-book initially returned a security screen to the web fetcher, but its browser gallery subsequently loaded normally. Its public gallery and Ortolan detail preview were visually studied. No security controls or paid preview restrictions were bypassed.

- [Ortolan, Land-book](https://land-book.com/websites/99846-ortolan): oversized serif type over imagery, paired photographic panels, warm neutral palette, thin editorial divisions. Adapted into the Family Journal's typography and photo-led hierarchy, not copied verbatim.
- [Family Landing Page Website, Rizqi Adi Surya for Pelorous, Dribbble](https://dribbble.com/shots/15616909-Family-Landing-Page-Website): approachable family imagery and cheerful yellow/blue/pink accents. Informed the Happy Scrapbook's friendliness; the cut-paper illustration, painted-paper palette and layout are original.
- [Family Photographer Landing Page, Anton Kasatkin, Dribbble](https://dribbble.com/shots/27309854-Family-Photographer-Landing-Page): large monochrome family photograph, spare white typography, olive framing and editorial spacing. Informed the Everyday Film's immersive composition; our teal-and-amber photograph and content are original.
- [Land-book gallery](https://land-book.com/): contrasted the compact product presentation of Formable with Ortolan's photo-led composition and the restrained chapter-like portfolio presentation of Khanh Nguyen. The Living Gallery is an original synthesis emphasizing order, photo hierarchy and electric blue rather than a replica of a reference.

No third-party reference artwork was downloaded into the site. Reference links are also available on the comparison page.

## The four directions

### 01 / The Family Journal

Cream paper, rust accents, Cormorant Garamond with DM Sans, oversized italic headline, candid kitchen portrait and numbered editorial review steps. Best fit for warmth and long-term emotional brand positioning. Tradeoff: less overtly app-like.

### 02 / The Happy Scrapbook

Butter-yellow paper, cobalt and red, Fraunces headings, gouache family picnic, imperfect rotated cards and playful printed ephemera. Best fit for approachability and family personality. Tradeoff: the illustrative style may skew younger than the full parent audience.

### 03 / The Everyday Film

Full-bleed dusk photography, deep teal, champagne accents, Archivo with italic Cormorant Garamond, film-frame sequence and spacious dark sections. Best fit for an emotional first impression. Tradeoff: requires supporting copy to establish what the product does.

### 04 / The Living Gallery

Manrope typography, electric blue, pale gray, ordered photo compositions and spare numbered information. Best fit for clarity and a contemporary consumer product. Tradeoff: less handmade warmth than the journal.

## Image generation

Mode: built-in image generation. The tool has no exposed model selector or returned model identifier; GPT Image 2.5 could not be selected or verified. No claim is made that this specific model was used.

Four separately generated assets were copied into the project. Original generated files remain in the Codex generated-images directory. Photography is synthetic illustration of the brand idea, not real customer evidence. The original image outputs are used without programmatic image edits.

### journal

Saved asset: `/Users/loroy/Developer/PersonalWork/SideProjects/LifeInPhotos/tools/marketing-automation/landing-page/public/images/designs/journal.png`

Final prompt:

> Use case: photorealistic-natural. Create a premium editorial family photograph for the Life in Photos landing page, portrait 4:5 composition. A candid overhead and slightly side-on view of a mother and her seven-year-old daughter baking at a sunlit home kitchen table; child laughing, flour-dusted hands, small bowl and lemons. Subjects have believable natural anatomy, relaxed unposed gestures, fully clothed. Frame close enough for authentic affection, not a stock-photo advertising smile, do not look at camera. Gentle afternoon light, butter yellow, warm brown wood, faded cream, muted tomato red details. Analog 35mm film texture, subtle grain, imperfect real home. The whole image is photography edge to edge, no borders, no montage, no typography, no logo, no watermark. This should make a parent recognize the ordinary moment they want to keep, not a cleaning utility.

### scrapbook

Saved asset: `/Users/loroy/Developer/PersonalWork/SideProjects/LifeInPhotos/tools/marketing-automation/landing-page/public/images/designs/scrapbook.png`

Final prompt:

> Use case: illustration-story. Create a joyful original cut-paper and gouache illustration for a playful Life in Photos family-memory website, landscape 3:2. A paper-collage family picnic: parent with short dark hair, another parent and two kids ages six and thirteen laughing together on a checkered picnic blanket. Show a few scattered instant-photo paper frames around them containing close details of a kite, a strawberry, and a child's grin. The collage itself is the artwork, not a website mockup. Chunky friendly imperfect shapes, tactile cut edges, hand-painted colored-pencil detail, sophisticated children's picture-book art. Strong cobalt blue, cherry red, buttery yellow, leaf green, warm ivory paper background. Joyful lively composition centered in image with a little cream breathing room around outer edges. No letters, no text, no numbers, no logos, no watermark, no 3D render. Warm human connection, never cleaning imagery.

### cinema

Saved asset: `/Users/loroy/Developer/PersonalWork/SideProjects/LifeInPhotos/tools/marketing-automation/landing-page/public/images/designs/cinema.png`

Final prompt:

> Use case: photorealistic-natural. Create a cinematic wide 16:9 family photograph for a premium Life in Photos landing-page hero. A father and his twelve-year-old daughter seen from behind, walking ankle-deep along a quiet ocean shoreline at dusk. Daughter leans into dad, both fully clothed in casual summer clothing, slightly windblown hair, ordinary intimate unposed moment. People placed in right third, medium distance, silhouettes still readable; leave left half as atmospheric negative space of dark teal water and subdued horizon for white website text overlay, but generate no text. Rich moody deep teal shadows, soft amber rim light, pale peach sunset strip on horizon, subtle 35mm film grain. Natural photograph, not fantasy, understated emotional film still. No borders, no logo, no watermark, no interface, no beach crowds.

### gallery

Saved asset: `/Users/loroy/Developer/PersonalWork/SideProjects/LifeInPhotos/tools/marketing-automation/landing-page/public/images/designs/gallery.png`

Final prompt:

> Use case: photorealistic-natural. Create a luminous contemporary editorial photograph for a modern photo-gallery website called Life in Photos, square composition. A young Black father in a faded cobalt blue shirt sitting on a grassy park lawn, his eight-year-old son wearing a warm orange t-shirt leaping into a hug; both laughing naturally, candid imperfect beautiful family moment. Frame upper bodies with generous pale sky and softly blurred sage trees, natural anatomy, fully clothed. Clean art-directed color photography with spring afternoon daylight, sky blue and warm orange complementary colors, crisp but gentle, premium magazine quality, no artificial glow. Subjects centered so image can crop into portrait or landscape. This is one edge-to-edge photo, not a collage, no text, no logo, no border, no watermark, no phone or UI.

## Implementation

- Original homepage, existing form, waitlist endpoint and global styles were not edited.
- New design components: components/design-directions.tsx.
- Scoped CSS and responsive breakpoints: app/designs/designs.module.css.
- Comparison route: app/designs/page.tsx.
- Four variant routes: app/designs/[direction]/page.tsx.
- Search-engine exclusion metadata: app/designs/layout.tsx.
- Font families load through Google Fonts with local fallbacks. A final production direction can self-host its chosen fonts.
- Includes keyboard focus styles, skip links and reduced-motion support. No build, automated tests or responsive validation were run during this task.


## Product-focused revision

All four directions now explicitly identify Life in Photos as an iPhone app and place an interactive, illustrative phone UI in the hero. The demo walks through grouping, sample-photo selection and approval without accessing a real library. It is labelled as an illustration, not a screenshot. Family imagery is supporting context. Current grouping/review capabilities remain separate from future memory/story creation. Comparison thumbnails and descriptions were updated too. Existing waitlist behavior is unchanged. No tests or validation were run for this revision.

## Value-led messaging revision

The four heroes now lead with meaningful moments, easier access to memories and less overwhelm, while retaining explicit iPhone-app positioning. Feature explanations in surrounding hero copy were removed. The Gallery hero now describes emotional outcomes instead of grouping/review/approval. All practical process sections are explicitly titled How it works; the illustrative phone UI remains visible as product context. Future storytelling stays in the vision sections rather than being presented as an existing capability. Visual styles, demo interactions and waitlist behavior are unchanged. No tests or validation were run.
