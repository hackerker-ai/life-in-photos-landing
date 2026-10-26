/* The photos the page shows: file ids only. Every name, note and caption lives in the locale dictionaries.
   The family is the face-swapped set (see prototypes/story-real/face-swap). The clutter (/photos/x) and the accidental
   frames have nobody in them and are used as they are. 15176, a photo of our daughter that the face swap left
   unchanged, stays out; 15111 takes its place. */

export type MomentKey =
  | "kingsCanyonLake"
  | "sequoiaTrail"
  | "hokkaidoSnow"
  | "tamsuiRiverside"
  | "shoufeng"
  | "hualienDaylilies"
  | "abbyTurnsOne"
  | "beimenSaltFields"
  | "taipeiWinter"
  | "summer2019";

export type PhotoGroup = {
  key: MomentKey;
  /** The three photos the moment shows (output only). Each has a larger copy in /photos/m. */
  keep: number[];
  /** Other photos from the same day, near-identical, blurry or accidental: all the camera roll ever shows (input only). */
  takes: number[];
};

/** Ten real moments from our own library, in the order the sorting scene and the hero session show them. */
export const GROUPS: PhotoGroup[] = [
  { key: "kingsCanyonLake", keep: [11914, 11900, 11986], takes: [11947, 11840, 11897, 11998, 12001, 11910] },
  { key: "sequoiaTrail", keep: [11983, 11819, 11863], takes: [11941, 11804, 11981, 11891, 11890] },
  { key: "hokkaidoSnow", keep: [15113, 15111, 15107], takes: [15162, 15179] },
  { key: "tamsuiRiverside", keep: [15620, 15617, 15667], takes: [15630, 15608, 15627, 15664, 15680, 15676, 15679, 15598, 15622, 15611, 15599, 15619] },
  { key: "shoufeng", keep: [20269, 20346, 20299], takes: [20279, 20330, 20328, 20231, 20248, 20209, 20296, 20369, 20260, 20370, 20259, 20258] },
  { key: "hualienDaylilies", keep: [24360, 24342, 24275], takes: [24283, 24339, 24323, 24425, 24455, 24221, 24477, 24433, 24444, 24223, 24222, 24441] },
  { key: "abbyTurnsOne", keep: [25998, 26008, 26022], takes: [26043, 26090, 26027, 26063, 26028, 26044, 26000, 26095, 26037, 26094, 26092, 26091, 26089, 26053] },
  { key: "beimenSaltFields", keep: [26711, 26718, 26734], takes: [26756, 26764, 26791, 26751, 26748, 26745, 26744, 26777] },
  { key: "taipeiWinter", keep: [27064, 27058, 27083], takes: [27043, 27046, 27001, 27026, 27077, 27028, 27031, 27081, 27070, 27053, 27051, 27079] },
  { key: "summer2019", keep: [28887, 28862, 28824], takes: [28803, 28820, 28802, 28890, 28829, 28846] }
];

/** Every camera-roll photo the river carries in, in order. */
export const POOL = GROUPS.flatMap((group) => group.takes);

/** The pile the app looks past, mixed as a camera roll would: sharp screenshots, photos of stuff (menus, labels, price
    tags) and the odd out-of-focus shot. Square tiles from the owner's library, checked for anything personal. */
export const JUNK = [12681, 18593, 1861, 22380, 21654, 2466, 1965, 31736, 2536, 28388, 32901, 32598, 33338, 34510, 3762, 33661, 426, 7906, 4427, 12944, 1476, 4796, 1681, 8432, 4829, 35329, 4860, 5422, 838];

/** Accidental shots from those days (the ground, a plate, the sky). They fall away with the clutter. */
export const ACCIDENTS = [11840, 11897, 11804, 24433, 27026];

/** The Polaroids that ride out of the hero phone. */
export const RIVER_OUT = [7502, 15113, 24360, 25998];

/** The three moments in the "Now you try" demo: the cover and the five photos its card shows. */
export const PLAY = [
  { cover: 11914, photos: [11914, 11986, 11900, 11983, 11819] },
  { cover: 20269, photos: [20269, 20346, 20299, 20300, 20392] },
  { cover: 24360, photos: [24360, 24342, 24275, 24471, 24481] }
];

export type PhotoSize = "s" | "m" | "x";

export const photoSrc = (id: number, size: PhotoSize = "s") => `/photos/${size}/${id}.jpg`;

/** All the photos in a moment (accidental frames left out), the kept ones first, as the hero session scrolls through them. */
export const momentShots = (group: PhotoGroup) => [
  ...group.keep.map((id) => ({ id, size: "m" as const })),
  ...group.takes.filter((id) => !ACCIDENTS.includes(id)).map((id) => ({ id, size: "s" as const }))
];
