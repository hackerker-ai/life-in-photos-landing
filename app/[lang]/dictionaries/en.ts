/* English copy for the home page and the privacy policy. Every user-facing string on the site lives here, including
   alt text and labels read by screen readers.

   Conventions:
   - `{name}` is filled in at render time (counts, links).
   - Rich text allows <b>, <strong>, <a href="…"> and <ph> (a highlighted placeholder still to be filled in). Nothing else. */

const en = {
  /** "translated" once a native speaker has reviewed the whole file. A draft or untranslated locale is kept out of search. */
  status: "translated" as "translated" | "draft" | "untranslated",

  /** Built from the hero's own words until the owner writes search copy. */
  meta: {
    title: "Life in Photos | Find the photos you forgot you loved",
    description: "An iPhone app for the moments buried in your camera roll.",
    ogTitle: "Find the photos you forgot you loved.",
    ogDescription: "An iPhone app for the moments buried in your camera roll.",
    ogImageAlt: "The Life in Photos app on an iPhone: a messy camera roll flows in, ten of life’s moments flow out, and three wooden friends look on."
  },

  brand: "life in photos",
  /** The globe button's label for screen readers: in both languages, so either reader can find the other language. */
  languageLabel: "Language · 語言",
  friends: {
    momo: "Momo. Tap to play.",
    flip: "Flip. Tap to play.",
    nori: "Nori. Tap to play."
  },

  header: {
    homeLabel: "Life in Photos, back to top",
    cta: "Find your moments"
  },

  hero: {
    title: "Find the photos you forgot you loved.",
    lede: "An iPhone app for the moments buried in your camera roll.",
    cta: "Find your moments",
    tagIn: "548 photos in",
    tagOut: "ten moments out",
    phoneLabel: "The Life in Photos app on an iPhone, going through ten moments one at a time: each comes up with its photos and title, and gets kept, saved for later or skipped.",
    session: {
      photos: "{n} photos",
      count: "{n} of {total}",
      endKept: "moments kept",
      endRest: "{later} saved for later · {skipped} skipped"
    }
  },

  /** The ten moments the sorting scene gathers and the hero session plays through. Notes are first-person family
      journal lines. */
  moments: {
    kingsCanyonLake: { name: "Kings Canyon lake", note: "We claimed the red chairs by the lake and stayed far longer than we planned. By the drive home, both kids were fast asleep in the back." },
    sequoiaTrail: { name: "Sequoia trail", note: "We kept tipping our heads back to see the tops of the trees. The best part was all of us squeezing inside a hollow trunk together." },
    hokkaidoSnow: { name: "Hokkaido snow", note: "Her first real snow. She ran straight into it and didn't want to come back inside, even when her cheeks turned pink." },
    tamsuiRiverside: { name: "Tamsui riverside", note: "The sky stayed grey, but we didn't mind. We took selfie after selfie by the water, and the kids insisted on a peace sign every time." },
    shoufeng: { name: "Shoufeng", note: "A slow afternoon by the pond. We shared a little cake with a strawberry on top, and she twirled around in her new purple dress." },
    hualienDaylilies: { name: "Hualien daylilies", note: "We drove up into the hills just as the daylilies bloomed. The baby rode in the carrier the whole way, and we warmed up in a little café after." },
    abbyTurnsOne: { name: "Abby turns one", note: "Our girl turned one. We hung the banner, filled the bed with balloons, and she wore the lace bonnet all morning." },
    beimenSaltFields: { name: "Beimen salt fields", note: "We waited for the sun to set over the salt fields. The baby stayed snug between us while the sky turned soft and pink." },
    taipeiWinter: { name: "Taipei winter", note: "We bundled up for a chilly day in the city, shared a bunny-shaped dessert at our favourite café, and strolled home through the park." },
    summer2019: { name: "Summer 2019", note: "Those first slow weeks at home with our newest one. We barely left the bed, and we couldn't stop kissing those cheeks." }
  },

  dig: {
    label: "How a camera roll becomes ten moments",
    lines: [
      "Say your camera roll holds 548 photos.",
      "Life in Photos looks past the screenshots and the photos of stuff.",
      "It folds eleven takes of one candle into one.",
      "It gathers the photos that belong together.",
      "Ten moments are ready."
    ],
    unitPhotos: "photos",
    unitMoments: "moments",
    foot: "The rest wait their turn. Nothing is deleted."
  },

  play: {
    title: "Now you try. Here are three of ours.",
    body: "This is the whole app in miniature. A moment comes up, you decide, and the next one arrives.",
    cards: [
      { name: "Kings Canyon", title: "A late summer day in Sequoia and Kings Canyon", meta: "200 photos, Sunday, September 15, 2024", why: "We drove up into Sequoia and Kings Canyon. Abby got a shoulder ride up the trail, Abby and Cody squeezed onto the red chairs by the lake, and the giant trees made all of us look tiny." },
      { name: "Shoufeng", title: "A winter afternoon in Shoufeng, Hualien", meta: "133 photos, Sunday, January 8, 2023", why: "We spent a slow afternoon by the pond in Shoufeng. Abby twirled around in her purple dress, Cody stayed snug in Mom's arms, and we shared a little cake with a strawberry on top." },
      { name: "Hualien daylilies", title: "Daylily season in Yuli and Fuli", meta: "60 photos, Sunday, September 6, 2020", why: "We drove into the hills to see the daylilies. Abby rode in the carrier the whole way, the fields were orange as far as we could see, and the clouds rolled in just as we left." }
    ],
    count: "{n} of {total}",
    keep: "Keep",
    later: "Later",
    skip: "Skip",
    keepWhy: "Save to Moments",
    laterWhy: "Decide another time",
    skipWhy: "Not this moment",
    nudge: "Your turn! Tap one to decide.",
    trayLabel: "Moments you kept",
    trayKept: "Kept",
    endTitle: "That's the ritual.",
    endBody: "You {tally}. In the app it's ten moments from your own camera roll, in about five minutes.",
    tallyKept: "kept {n}",
    tallyLater: "saved {n} for later",
    tallyJoin: " and ",
    tallyNone: "skipped all three",
    endCta: "Find your moments",
    again: "Play again"
  },

  how: {
    title: "Ten moments at a time. That’s the whole app.",
    body: "Open it whenever you have five minutes, look through ten moments, and keep the ones that feel like yours.",
    stepsLabel: "Three screens from the app",
    steps: [
      { title: "Open Find", body: "Ten moments from your camera roll are ready, about five minutes’ worth." },
      { title: "Keep, Later or Skip", body: "Each moment arrives with its title and story already written." },
      { title: "Look back", body: "What you keep becomes your Moments, week by week." }
    ],
    tabs: { find: "Find", moments: "Moments", settings: "Settings" },
    find: {
      date: "TUESDAY, OCT 6",
      card: "Kings Canyon lake",
      ready: "Your next 10 are ready",
      sub: "About 5 minutes. Your Photos library stays untouched.",
      start: "Start these 10",
      later: "Waiting in Later"
    },
    session: {
      count: "4 of 10",
      title: "Sunset at the Beimen salt fields",
      meta: "11 photos · Saturday · Beimen",
      notes: "We stayed for the last light at the salt fields. The salt piles turned pink, and the baby slept through the whole sunset in the carrier.",
      keep: "Keep",
      later: "Later",
      skip: "Skip"
    },
    moments: {
      kept: "12 KEPT",
      title: "Moments",
      thisWeek: "This week",
      thisWeekCount: "4 new",
      lastWeek: "Last week",
      lastWeekCount: "3",
      captions: ["Hualien daylilies", "Summer 2019", "Shoufeng", "Hokkaido snow", "Taipei winter", "Beimen salt fields"]
    }
  },

  strengths: {
    title: "Less scrolling, more remembering.",
    feats: [
      { title: "Your photos, already put together.", body: "We gather your photos into moments, like a Saturday at the park or a weekend away, so you see the day, not 400 separate shots." },
      { title: "Less of the same photo.", body: "Ten almost-identical shots become one, so the good one isn’t buried." },
      { title: "Only the memories.", body: "Receipts, screenshots and parking-spot photos stay out of the way." },
      { title: "A name for every moment.", body: "Each moment gets a warm title and a short note, so you remember why you took it." }
    ],
    gatheredCaption: "Shoufeng",
    namedTitle: "Sunset at the salt fields",
    namedNote: "We stayed for the last light…"
  },

  trust: {
    title: "Your Photos library stays untouched.",
    checks: [
      "Keep, Later and Skip only change what's in this app.",
      "Nothing is deleted or moved in Photos.",
      "You look at every moment before you decide."
    ]
  },

  voices: {
    title: "What parents told us",
    /** What real parents told the owner, in their words. Never add invented quotes. */
    quotes: [
      { quote: "Honestly, I would take more photos if I didn’t have to pick my favorites.", by: "Tiffany, parent of two" },
      { quote: "Just thinking about picking the good ones, I realized it would take a whole day, so I gave up.", by: "Sunny, parent of one" },
      { quote: "All my pictures, 90% of that is trash. There’s only a few that are really good.", by: "Ami, parent of two" }
    ]
  },

  faq: {
    title: "Common questions",
    items: [
      { q: "Will it delete my photos?", a: "No. Your photos stay exactly where they are. Choosing which moments to keep never deletes anything from your phone." },
      { q: "What if I have tens of thousands of photos?", a: "That’s who it’s for. You start seeing moments right away while the rest get ready." },
      { q: "Do my photos leave my phone?", a: "Your photos stay on your phone and in your own iCloud. To write each moment’s title and note, a few small previews, with location and camera data removed, are sent to an AI model. We don’t run servers that keep your photos. <a href=\"{privacy}\">Read the privacy policy</a>." },
      { q: "Do I have to organize first?", a: "No setup and no albums to make. Open it and start." },
      { q: "What does it cost?", a: "We’ll decide pricing after the beta. Everyone who joins the beta gets an exclusive discount offer." }
    ]
  },

  invite: {
    title: "Your family's moments are already in there.",
    wallLabel: "A wall of kept moments",
    wallNote: "Three of ours. Yours go in the empty ones.",
    wallNoteKeptOne: "You kept this one just now. Yours go in the empty ones.",
    wallNoteKeptMany: "You kept these just now. Yours go in the empty ones.",
    empty: "yours",
    mine: "you're in",
    label: "TestFlight opens soon, for iPhones on iOS 26 or later. Leave your email and we'll send the invite.",
    placeholder: "name@example.com",
    submit: "Send invite",
    honeypot: "Website",
    trioAlt: "Nori, Momo and Flip, three painted wood friends, holding a Polaroid frame together",
    /** What the form says after sending, keyed by the code /api/waitlist returns. */
    status: {
      invalid: "Enter a valid email address.",
      joined: "You are on the list. Watch your inbox.",
      alreadyJoined: "You are already on the list. We will keep you posted.",
      joinedEmailDelayed: "You are on the list. Your confirmation email may take a little longer.",
      unavailable: "Early access is temporarily unavailable. Please try again later.",
      failed: "We could not add you right now. Please try again."
    }
  },

  footer: {
    about: "Life in Photos is an iPhone app that finds the moments buried in your camera roll. It gathers your photos into moments, writes each one a title and a short note, and brings them to you ten at a time, so looking back takes minutes, not a whole weekend.",
    navLabel: "Footer",
    appHeading: "The app",
    how: "How it works",
    strengths: "What it does",
    faq: "Common questions",
    invite: "Join the beta",
    contactHeading: "Get in touch",
    email: "contact@hackerker.com",
    privacy: "Privacy policy",
    copyright: "© 2026 Life in Photos. All rights reserved.",
    backToTop: "Back to top"
  },

  notFound: {
    meta: { title: "Page not found · Life in Photos" },
    title: "This photo isn’t in the album.",
    body: "The page may have moved, or the link has a typo.",
    frameLabel: "An empty Polaroid frame"
  },
  unsubscribe: {
    meta: { title: "Leave the waitlist · Life in Photos" },
    title: "Leave the waitlist?",
    body: "We’ll take {email} off the Life in Photos beta waitlist and stop emailing you.",
    button: "Leave the waitlist",
    doneTitle: "You’re off the list.",
    doneBody: "We won’t email you again. If you change your mind, you can join again from the home page any time.",
    failedTitle: "That link didn’t work.",
    failedBody: "Try the button again, or write to us at <a href=\"mailto:contact@hackerker.com\">contact@hackerker.com</a> and we’ll take you off the list ourselves.",
    brokenBody: "This link is missing part of its address. Write to us at <a href=\"mailto:contact@hackerker.com\">contact@hackerker.com</a> and we’ll take you off the list ourselves."
  },
  privacy: {
    meta: { title: "Privacy policy · Life in Photos" },
    homeLabel: "Life in Photos home",
    back: "Back to home",
    draft: "<b>Draft for review.</b> This policy describes the app and site as they work today. The items in <ph>highlighted brackets</ph> are filled in on the day it’s published, and the whole text needs a legal review before then.",
    title: "Privacy policy",
    updated: "Last updated <ph>[DATE OF PUBLISHING]</ph>",
    shortTitle: "The short version",
    short: [
      "Your photos stay on your phone and in your own iCloud. We don’t run servers that keep your photos.",
      "The app never deletes, moves or changes anything in your Photos library. Keep, Later and Skip only change what’s in the app.",
      "To write each moment’s title and note, a few small previews and a short description of the moment are sent to an AI model.",
      "We don’t sell your information, show ads, or track you across other apps and websites."
    ],
    tocLabel: "On this page",
    /** Each section is a list of blocks: a paragraph (p), a subheading (h3), a list (ul) or the service providers (who). */
    sections: [
      {
        id: "covers",
        title: "What this policy covers",
        blocks: [
          { p: "This policy covers the Life in Photos iPhone app, which is in beta through Apple’s TestFlight, and this website. “We” means <ph>[YOUR FULL NAME]</ph>, the independent developer of Life in Photos. “You” means anyone who uses the app or visits the site." }
        ]
      },
      {
        id: "photos",
        title: "Your photos",
        blocks: [
          { p: "The app asks for access to your Photos library so it can find the moments in it. It reads your photos on your iPhone and builds its catalog of moments there. Finding and gathering moments runs on the phone itself." },
          { p: "Your photos stay where they already are: on your phone, and in your own iCloud if you use iCloud Photos. The app doesn’t copy your library to us, and we don’t run servers that keep your photos." },
          { p: "The app never deletes, moves or edits anything in your Photos library. Keep, Later and Skip only change what’s in the app. What you keep, and any titles and notes you edit, are saved inside the app on your phone." }
        ]
      },
      {
        id: "titles",
        title: "Titles and notes",
        blocks: [
          { p: "Each moment comes with a title and a short note, written by an AI model: Muse Spark, made by Meta. This is on by default. A setting to turn it off is coming in a later version." },
          { p: "To write them, the app sends the AI model:" },
          {
            ul: [
              "<strong>Up to five small previews</strong> of the moment’s photos, with location and camera data removed.",
              "<strong>A short description of the moment:</strong> the place name, the time of day, how many people appear, what seems to be happening, and the names of any people you’ve labelled in the Photos app."
            ]
          },
          { p: "These requests go through our own account with Meta, so you don’t need an account of your own. The model sends back a title and a note, which you can change. We use the requests only to write that title and note, and Meta handles them under its terms for developers who use its models." }
        ]
      },
      {
        id: "places",
        title: "Place names",
        blocks: [
          { p: "To name where a moment happened, the app sends the approximate location of a group of photos to Apple’s location service and gets a place name back. The place names are saved inside the app on your phone." }
        ]
      },
      {
        id: "website",
        title: "This website and the beta",
        blocks: [
          { h3: "The beta waitlist" },
          { p: "When you join the beta, we keep your email address so we can send you a welcome email and your TestFlight invite. We use it for nothing else, and you can ask us to remove it at any time." },
          { h3: "Site analytics" },
          { p: "We count a few events on this site, such as a page view or a waitlist signup, along with the campaign that brought you here, if there was one. These counts include only the domain of an email address, never the full address. We don’t record sessions or set analytics cookies." },
          { h3: "TestFlight" },
          { p: "Apple runs TestFlight. When you install the beta, Apple may share information with us as the app’s developer, such as your email address and basic crash and usage reports, under <a href=\"https://www.apple.com/legal/privacy/\">Apple’s privacy policy</a>." }
        ]
      },
      {
        id: "sharing",
        title: "Who we share with",
        blocks: [
          { p: "We use a few service providers, only for the jobs below." },
          {
            who: [
              { name: "Meta", job: "Its Muse Spark model writes each moment’s title and note from the previews and description above." },
              { name: "Apple", job: "Turns approximate photo locations into place names, and runs TestFlight and iCloud." },
              { name: "Resend", job: "Sends the waitlist welcome email and the TestFlight invite, and stores the waitlist." },
              { name: "PostHog", job: "Counts the site events described above." }
            ]
          },
          { p: "We don’t sell your information or share it for advertising. We would share it with others only if the law required it." }
        ]
      },
      {
        id: "keeping",
        title: "How long we keep things",
        blocks: [
          {
            ul: [
              "Everything the app saves stays on your phone until you delete it or delete the app.",
              "We keep your waitlist email until you ask us to remove it.",
              "Site analytics are kept for PostHog’s standard retention period."
            ]
          }
        ]
      },
      {
        id: "choices",
        title: "Your choices",
        blocks: [
          {
            ul: [
              "You can turn off the app’s access to your photos at any time in the iPhone’s Settings.",
              "Deleting the app removes everything it saved on your phone. Your Photos library is untouched either way.",
              "You can leave the waitlist through the link in any email we send, or by writing to us.",
              "Depending on where you live, you may have the right to see, correct or delete the information we hold about you. Write to us and we’ll help."
            ]
          }
        ]
      },
      {
        id: "children",
        title: "Children",
        blocks: [
          { p: "Life in Photos is made for parents. The app and this site are not meant for children under 13, and we don’t knowingly collect information from them. Family photos, including photos of your children, stay on your phone as described above." }
        ]
      },
      {
        id: "security",
        title: "Security",
        blocks: [
          { p: "The app keeps its data in its own private storage on your phone, protected by your iPhone’s security. Requests to the services above are sent over encrypted connections." }
        ]
      },
      {
        id: "changes",
        title: "Changes to this policy",
        blocks: [
          { p: "If we change this policy, we’ll update the date at the top. If the change is significant, we’ll tell you in the app or by email before it takes effect." }
        ]
      },
      {
        id: "contact",
        title: "Contact us",
        blocks: [
          { p: "Questions, or a request about your information: <a href=\"mailto:contact@hackerker.com\">contact@hackerker.com</a>." }
        ]
      }
    ] as PolicySection[]
  }
};

export type PolicyBlock =
  | { p: string }
  | { h3: string }
  | { ul: string[] }
  | { who: { name: string; job: string }[] };

export type PolicySection = { id: string; title: string; blocks: PolicyBlock[] };

export type Dictionary = typeof en;

export default en;
