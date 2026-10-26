/* Traditional Chinese (zh-Hant, Taiwan) copy. DRAFT: a first translation for the owner to correct. Once it has been
   reviewed, set `status` to "translated" so the page can be indexed.

   Keep the {placeholders} and the <b>, <strong>, <a> and <ph> tags. The structure must match en.ts; TypeScript checks it
   against the English dictionary.

   Terms used throughout, to keep the page consistent (and to match the app's when it is translated):
   moment(s) 回憶（段）· camera roll 相簿 · Photos library 照片圖庫 · Keep / Later / Skip 保留 / 稍後 / 略過 ·
   Find / Moments / Settings 尋找 / 回憶 / 設定 · beta Beta 測試 · screenshot 截圖 */

import type { Dictionary } from "./en";

const zhHant: Dictionary = {
  status: "draft",

  meta: {
    title: "Life in Photos｜找回你早已忘記、卻深愛的照片",
    description: "一款 iPhone App，幫你找出埋在相簿裡的回憶。",
    ogTitle: "找回你早已忘記、卻深愛的照片。",
    ogDescription: "一款 iPhone App，幫你找出埋在相簿裡的回憶。"
  },

  brand: "life in photos",
  languageLabel: "Language · 語言",
  friends: {
    momo: "Momo。點一下來玩。",
    flip: "Flip。點一下來玩。",
    nori: "Nori。點一下來玩。"
  },

  header: {
    homeLabel: "Life in Photos，回到頁首",
    cta: "找出你的回憶"
  },

  hero: {
    title: "找回那些被遺忘但你深愛的照片。",
    lede: "一款 iPhone App，幫你找出埋在相簿裡的回憶。",
    cta: "找出你的回憶",
    tagIn: "輸入 548 張照片",
    tagOut: "找回十段回憶",
    phoneLabel: "iPhone 上的 Life in Photos App，正一段一段瀏覽十段回憶：每段回憶連同照片和標題一起出現，然後被保留、留待稍後，或略過。",
    session: {
      photos: "{n} 張照片",
      count: "{n} / {total}",
      endKept: "段回憶已保留",
      endRest: "{later} 篇稍後再看 · {skipped} 篇已略過"
    }
  },

  moments: {
    kingsCanyonLake: { name: "Kings Canyon lake", note: "我們佔了湖邊的紅椅子，待得比原本打算的久多了。開車回家的路上，兩個孩子都在後座睡熟了。" },
    sequoiaTrail: { name: "紅杉步道", note: "我們一直仰著頭，想看清楚樹頂。最棒的是全家一起擠進一棵中空的樹幹裡。" },
    hokkaidoSnow: { name: "北海道的雪", note: "她第一次看到真正的雪。她直接衝進雪地，臉頰都凍紅了還不肯進屋。" },
    tamsuiRiverside: { name: "淡水河畔", note: "天空一直灰灰的，但我們不在意。在河邊自拍了一張又一張，孩子們每一張都堅持要比 YA。" },
    shoufeng: { name: "壽豐", note: "在池塘邊度過慢悠悠的午後。我們分吃一個放著草莓的小蛋糕，她穿著新的紫色洋裝轉圈圈。" },
    hualienDaylilies: { name: "六十石山金針花", note: "金針花剛開，我們就開車上山。寶寶在揹巾裡好開心，之後我們躲進一間小咖啡館取暖。" },
    abbyTurnsOne: { name: "Abby 一歲了", note: "我們的女兒滿一歲了。我們掛上生日布條，在床上擺滿氣球，她一整個早上都戴著那頂蕾絲小帽。" },
    beimenSaltFields: { name: "北門鹽田", note: "我們等著太陽落在鹽田上。寶寶窩在我們中間，天空慢慢變成柔和的粉紅色。" },
    taipeiWinter: { name: "台北的冬天", note: "我們穿得暖暖的，在城裡度過微涼的一天，在最愛的咖啡館分吃一份兔子造型的甜點，再散步穿過公園回家。" },
    summer2019: { name: "2019 夏天", note: "家裡剛多了一個小傢伙的那幾週，日子過得好慢。我們幾乎沒下過床，一直忍不住親那圓嘟嘟的臉頰。" }
  },

  dig: {
    label: "相簿如何變成十段回憶",
    lines: [
      "假設你的相簿裡有 548 張照片。",
      "Life in Photos 會自動略過截圖，和其他雜訊照片。",
      "同一個姿勢拍了十一張，它只留下一張。",
      "它把屬於同一段回憶的照片收在一起。",
      "找回那十段回憶。"
    ],
    unitPhotos: "張照片",
    unitMoments: "段回憶",
    foot: "其餘的照片等著下一輪。照片都不會被刪除。"
  },

  play: {
    title: "換你試試看。試著決定這三段回憶吧！",
    body: "這就是整個 App 的流程。一段回憶出現，你做決定，然後繼續下一個。",
    cards: [
      { name: "國王峽谷", title: "夏末的一天，在紅杉與國王峽谷", meta: "200 張照片・2024 年 9 月 15 日（星期日）", why: "我們開車上了紅杉和國王峽谷國家公園。Abby 一路騎在肩膀上走步道，Abby 和 Cody 擠在湖邊的紅椅子上，巨大的樹讓我們每個人都顯得好小。" },
      { name: "壽豐", title: "冬日午後，在花蓮壽豐", meta: "133 張照片・2023 年 1 月 8 日（星期日）", why: "我們在壽豐的池塘邊度過慢悠悠的午後。Abby 穿著紫色洋裝轉圈圈，Cody 窩在媽媽懷裡，我們還分吃了一個放著草莓的小蛋糕。" },
      { name: "花蓮金針花", title: "玉里與富里的金針花季", meta: "60 張照片・2020 年 9 月 6 日（星期日）", why: "我們開車上山去看金針花。我們一路揹著 Abby，放眼望去整片都是橘色，我們要離開時，雲剛好飄了進來。" }
    ],
    count: "{n} / {total}",
    keep: "保留",
    later: "稍後",
    skip: "略過",
    keepWhy: "存進回憶",
    laterWhy: "之後再決定",
    skipWhy: "捨棄這一段",
    nudge: "換你了！點一個來決定。",
    trayLabel: "保留的回憶",
    trayKept: "已保留",
    endTitle: "這就是每天的小儀式。",
    endBody: "你{tally}。在 App 裡，會是你自己相簿裡的十段回憶，大約五分鐘就能看完。",
    tallyKept: "保留了 {n} 段",
    tallyLater: "留了 {n} 段稍後再看",
    tallyJoin: "，",
    tallyNone: "三段都略過了",
    endCta: "找出你的回憶",
    again: "再玩一次"
  },

  how: {
    title: "一次回顧十段回憶。整個 App 就是這樣。",
    body: "只需要五分鐘空檔，回顧十段回憶，留下那些有感覺的。",
    stepsLabel: "App 裡的三個畫面",
    steps: [
      { title: "打開「尋找」", body: "相簿裡的十段回憶已經準備好，大約五分鐘就能看完。" },
      { title: "保留、稍後或略過", body: "每段回憶出現時，標題和故事都已經寫好了。" },
      { title: "回顧", body: "你保留的，會一週一週累積成你的「回憶」。" }
    ],
    tabs: { find: "尋找", moments: "回憶", settings: "設定" },
    find: {
      date: "10 月 6 日 星期二",
      card: "國王峽谷湖畔",
      ready: "下一批 10 段已經準備好",
      sub: "大約 5 分鐘。你的照片圖庫完全不會被更動。",
      start: "開始這 10 段",
      later: "稍後再看"
    },
    session: {
      count: "4 / 10",
      title: "北門鹽田的夕陽",
      meta: "11 張照片 · 星期六 · 北門",
      notes: "我們在鹽田待到最後一道光。鹽堆被染成粉紅色，寶寶在揹巾裡睡過了整場夕陽。",
      keep: "保留",
      later: "稍後",
      skip: "略過"
    },
    moments: {
      kept: "已保留 12 段",
      title: "回憶",
      thisWeek: "本週",
      thisWeekCount: "4 段新的",
      lastWeek: "上週",
      lastWeekCount: "3",
      captions: ["花蓮金針花", "2019 夏天", "壽豐", "北海道的雪", "台北的冬天", "北門鹽田"]
    }
  },

  strengths: {
    title: "少一點滑動，多一點回味。",
    feats: [
      { title: "你的照片，已經幫你整理好。", body: "我們把照片集合成一段段回憶，像是公園裡的一個星期六，或一趟週末小旅行，讓你看到的是那一天，而不是 400 張零散的照片。" },
      { title: "同一個畫面，不再重複。", body: "幾乎一樣的照片只留一張，好照片不再被埋沒。" },
      { title: "只留下回憶。", body: "收據、截圖和記停車位置的照片，我們可以忘掉那些不重要的。" },
      { title: "每段回憶都有名字。", body: "每段回憶都會有一個溫暖的標題和一段短短的記錄，讓你記得當初為什麼拍下它。" }
    ],
    gatheredCaption: "壽豐",
    namedTitle: "鹽田的夕陽",
    namedNote: "我們待到最後一道光…"
  },

  trust: {
    title: "你的照片圖庫不會被更動。",
    checks: [
      "保留、稍後和略過，只會改變這個 App 裡的內容。",
      "照片 App 裡的任何東西都不會被刪除或移動。",
      "每段回憶，都由你看過之後才決定。"
    ]
  },

  voices: {
    title: "來自 Beta 測試家長的話",
    /** Placeholders until real beta parents send quotes. Never fill these with invented quotes. */
    quotes: [
      { quote: "[一位 Beta 家長的推薦，用他們自己的話寫一兩句。]", by: "[姓名，兩個孩子的家長]" },
      { quote: "[一位 Beta 家長的推薦，用他們自己的話寫一兩句。]", by: "[姓名，三個孩子的家長]" },
      { quote: "[一位 Beta 家長的推薦，用他們自己的話寫一兩句。]", by: "[姓名，一個孩子的家長]" }
    ]
  },

  faq: {
    title: "常見問題",
    items: [
      { q: "它會刪掉我的照片嗎？", a: "不會。你的照片會原封不動地待在原處。選擇要保留哪些回憶，並不會刪除你手機裡的任何東西。" },
      { q: "如果我有好幾萬張照片呢？", a: "這正是為你設計的，越多照片代表越有價值找出那些值得的回憶。" },
      { q: "我的照片會被傳到雲端嗎？", a: "你的照片會留在你的手機和你自己的 iCloud 裡。為了替每段回憶寫標題和記錄，會把幾張已移除位置與相機資料的小預覽圖傳送給 AI 模型。我們沒有架設保存你照片的伺服器。詳情請<a href=\"{privacy}\">閱讀隱私權政策</a>。" },
      { q: "我需要先整理照片嗎？", a: "什麼也不用設定。打開 App 就能開始。" },
      { q: "要多少錢？", a: "我們會在 Beta 測試結束後決定價格。每位加入 Beta 測試的人，都會收到專屬的日後購買優惠。" }
    ]
  },

  invite: {
    title: "你家的回憶，早就都在裡面了。",
    wallLabel: "一面保留回憶的牆",
    wallNote: "這三段是我們的。你的會放進空格裡。",
    wallNoteKeptOne: "你剛剛保留了這一段。你的回憶會放進空格裡。",
    wallNoteKeptMany: "你剛剛保留了這些。你的回憶會放進空格裡。",
    empty: "你的",
    mine: "你加入了",
    label: "TestFlight 即將開放，適用 iOS 26 以上的 iPhone。留下你的 Email，我們會寄邀請給你。",
    placeholder: "name@example.com",
    submit: "寄邀請給我",
    honeypot: "網站",
    trioAlt: "Nori、Momo 和 Flip，三個彩繪木頭小夥伴，一起捧著一個拍立得相框",
    status: {
      invalid: "請輸入有效的 Email 地址。",
      joined: "你已經在名單上了，請留意你的信箱。",
      alreadyJoined: "你已經在名單上了，有消息我們會通知你。",
      joinedEmailDelayed: "你已經在名單上了，確認信可能會晚一點才寄到。",
      unavailable: "搶先體驗暫時無法使用，請稍後再試。",
      failed: "現在無法把你加入名單，請再試一次。"
    }
  },

  footer: {
    about: "Life in Photos 是一款 iPhone App，幫你找出埋在相簿裡的回憶。它把照片集合成一段段回憶，為每一段寫上標題和短短的記錄，每次把十段回憶呈現給你，回顧只需要幾分鐘，而不是一整個週末。",
    navLabel: "頁尾",
    appHeading: "關於 App",
    how: "運作方式",
    strengths: "功能特色",
    faq: "常見問題",
    invite: "加入 Beta 測試",
    contactHeading: "聯絡我們",
    email: "contact@hackerker.com",
    privacy: "隱私權政策",
    copyright: "© 2026 Life in Photos. 保留所有權利。",
    backToTop: "回到頁首"
  },

  privacy: {
    meta: { title: "隱私權政策 · Life in Photos" },
    homeLabel: "Life in Photos 首頁",
    back: "回到首頁",
    draft: "<b>審閱用草稿。</b>本政策說明 App 和網站目前的運作方式。<ph>標示中括號</ph>的項目會在發布當天填入，全文也需要在發布前經過法律審閱。",
    title: "隱私權政策",
    updated: "最後更新：<ph>[發布日期]</ph>",
    shortTitle: "重點摘要",
    short: [
      "你的照片會留在你的手機和你自己的 iCloud 裡。我們不會保存你的照片在任何伺服器。",
      "App 不會未經使用者決定刪除、移動或更改你照片圖庫中的任何內容。保留、稍後和略過，只會改變 App 裡的內容。",
      "為了替每段回憶寫標題和記錄，會把幾張小預覽圖和一段簡短的描述傳送給 AI 模型，但不會用為模型訓練素材。",
      "我們不會販售你的資訊、不放廣告，也不會在其他 App 和網站上追蹤你。"
    ],
    tocLabel: "本頁內容",
    sections: [
      {
        id: "covers",
        title: "本政策的適用範圍",
        blocks: [
          { p: "本政策適用於 Life in Photos iPhone App（目前透過 Apple 的 TestFlight 進行 Beta 測試）以及本網站。「我們」指 Life in Photos 的獨立開發者 <ph>[你的全名]</ph>。「你」指任何使用本 App 或造訪本網站的人。" }
        ]
      },
      {
        id: "photos",
        title: "你的照片",
        blocks: [
          { p: "App 會請求取用你的照片圖庫，以便從中找出回憶。它在你的 iPhone 上讀取照片，並在手機上建立回憶目錄。尋找與整理回憶的工作都在手機本身進行。" },
          { p: "你的照片會留在原本的地方：你的手機，以及你使用 iCloud 照片時你自己的 iCloud。App 不會把你的圖庫複製給我們，我們也沒有架設保存你照片的伺服器。" },
          { p: "App 絕不會刪除、移動或編輯你照片圖庫中的任何內容。保留、稍後和略過，只會改變 App 裡的內容。你保留的回憶，以及你編輯過的標題和記錄，都儲存在你手機上的 App 裡。" }
        ]
      },
      {
        id: "titles",
        title: "標題與記錄",
        blocks: [
          { p: "每段回憶都附有一個標題和一段簡短的記錄，由 AI 模型撰寫：Meta 開發的 Muse Spark。此功能預設開啟，關閉此功能的設定會在之後的版本推出。" },
          { p: "為了撰寫這些內容，App 會傳送以下資料給 AI 模型：" },
          {
            ul: [
              "<strong>最多五張小預覽圖</strong>，取自該段回憶的照片，已移除位置與相機資料。",
              "<strong>一段簡短的回憶描述：</strong>地點名稱、時段、照片中有幾個人、看起來在做什麼，以及你在照片 App 中標記過的人名。"
            ]
          },
          { p: "這些請求透過我們自己的 Meta 帳號送出，所以你不需要有自己的帳號。模型會回傳標題和記錄，你可以自行修改。我們只用這些請求來撰寫標題和記錄，Meta 則依其開發者使用條款處理這些請求。" }
        ]
      },
      {
        id: "places",
        title: "地點名稱",
        blocks: [
          { p: "為了標示回憶發生的地點，App 會把一組照片的大致位置傳送給 Apple 的定位服務，並取回地點名稱。地點名稱會儲存在你手機上的 App 裡。" }
        ]
      },
      {
        id: "website",
        title: "本網站與 Beta 測試",
        blocks: [
          { h3: "Beta 測試候補名單" },
          { p: "你加入 Beta 測試時，我們會保留你的 Email 地址，用來寄送歡迎信和你的 TestFlight 邀請。我們不會將它用於其他用途，你也可以隨時要求我們刪除。" },
          { h3: "網站分析" },
          { p: "我們會統計本網站上的少數事件，例如頁面瀏覽或加入候補名單，以及帶你來到這裡的行銷活動（如果有的話）。這些統計只包含 Email 地址的網域，絕不包含完整地址。我們不會錄製瀏覽過程，也不會設定分析用的 Cookie。" },
          { h3: "TestFlight" },
          { p: "TestFlight 由 Apple 營運。你安裝 Beta 版時，Apple 可能會依照 <a href=\"https://www.apple.com/tw/legal/privacy/\">Apple 的隱私權政策</a>，與身為 App 開發者的我們分享資訊，例如你的 Email 地址，以及基本的當機與使用報告。" }
        ]
      },
      {
        id: "sharing",
        title: "我們與誰分享資訊",
        blocks: [
          { p: "我們只為了下列工作，使用少數幾家服務供應商。" },
          {
            who: [
              { name: "Meta", job: "它的 Muse Spark 模型會根據上述的預覽圖和描述，撰寫每段回憶的標題和記錄。" },
              { name: "Apple", job: "將照片的大致位置轉換成地點名稱，並營運 TestFlight 和 iCloud。" },
              { name: "Resend", job: "寄送候補名單的歡迎信和 TestFlight 邀請，並儲存候補名單。" },
              { name: "PostHog", job: "統計上述的網站事件。" }
            ]
          },
          { p: "我們不會販售你的資訊，也不會為了廣告而分享。只有在法律要求時，我們才會與他人分享。" }
        ]
      },
      {
        id: "keeping",
        title: "我們保留資料多久",
        blocks: [
          {
            ul: [
              "App 儲存的所有內容都會留在你的手機上，直到你刪除它們或刪除 App。",
              "我們會保留你的候補名單 Email，直到你要求我們刪除。",
              "網站分析資料依 PostHog 的標準保存期限保留。"
            ]
          }
        ]
      },
      {
        id: "choices",
        title: "你的選擇",
        blocks: [
          {
            ul: [
              "你隨時可以在 iPhone 的「設定」中，關閉 App 取用照片的權限。",
              "刪除 App 會移除它儲存在你手機上的所有內容。無論如何，你的照片圖庫都不會被更動。",
              "你可以透過我們寄出的任何一封 Email 中的連結退出候補名單，或直接寫信給我們。",
              "依你居住地的不同，你可能有權查看、更正或刪除我們持有的你的資訊。寫信給我們，我們會協助你。"
            ]
          }
        ]
      },
      {
        id: "children",
        title: "兒童",
        blocks: [
          { p: "Life in Photos 是為父母設計的。本 App 和本網站並非為 13 歲以下的兒童設計，我們也不會在知情的情況下收集兒童的資訊。家庭照片，包括你孩子的照片，都會如上所述留在你的手機上。" }
        ]
      },
      {
        id: "security",
        title: "安全性",
        blocks: [
          { p: "App 會把資料存放在你手機上它自己的私人儲存空間中，受到 iPhone 安全機制的保護。傳送給上述服務的請求都經過加密連線。" }
        ]
      },
      {
        id: "changes",
        title: "本政策的變更",
        blocks: [
          { p: "如果我們變更本政策，會更新頁首的日期。如果變更幅度重大，我們會在變更生效前，透過 App 或 Email 通知你。" }
        ]
      },
      {
        id: "contact",
        title: "聯絡我們",
        blocks: [
          { p: "有任何問題，或關於你個人資訊的要求：<a href=\"mailto:contact@hackerker.com\">contact@hackerker.com</a>。" }
        ]
      }
    ]
  }
};

export default zhHant;
