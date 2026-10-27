import type { Locale } from "@/lib/i18n";

type WelcomeCopy = {
  subject: string;
  preheader: string;
  eyebrow: string;
  /** Lines of the heading; a new line starts at each item. */
  heading: string[];
  thanks: string;
  building: string;
  /** The plain-text version's opening lines. */
  textThanks: string;
  textBuilding: string;
  questionLabel: string;
  question: string;
  reply: string;
  signature: string;
  role: string;
  why: string;
  leave: string;
  leaveText: string;
};

const copy: Record<Locale, WelcomeCopy> = {
  en: {
    subject: "You are on the Life in Photos early-access list",
    preheader: "A calmer way to find the moments worth keeping.",
    eyebrow: "Life in Photos",
    heading: ["Welcome. Let's find the moments worth keeping."],
    thanks: "Thank you for joining our early-access list.",
    building: "We're building a calmer way to work through photo clutter and bring meaningful family moments forward, one small review at a time.",
    textThanks: "Thank you for joining Life in Photos.",
    textBuilding: "We are building a calmer way to work through photo clutter and bring meaningful family moments forward, one small review at a time.",
    questionLabel: "One question",
    question: "What is the hardest part of managing your photo library today?",
    reply: "Reply and tell me. I read every response.",
    signature: "Roy",
    role: "Builder of Life in Photos",
    why: "You received this because you joined the Life in Photos early-access list.",
    leave: "Leave the list",
    leaveText: "To leave the list:"
  },
  "zh-Hant": {
    subject: "你已加入 Life in Photos 的 Beta 測試候補名單",
    preheader: "找回那些被遺忘但你深愛的照片。",
    eyebrow: "Life in Photos",
    heading: ["歡迎你。", "一起找出值得留下的回憶吧。"],
    thanks: "謝謝你加入我們的 Beta 測試候補名單。",
    building: "我們正在打造一款 iPhone App，把相簿裡的照片整理成一段段回憶，每次回顧幾段，把你有感覺的留下來。",
    textThanks: "謝謝你加入 Life in Photos。",
    textBuilding: "我們正在打造一款 iPhone App，把相簿裡的照片整理成一段段回憶，每次回顧幾段，把你有感覺的留下來。",
    questionLabel: "想問你一個問題",
    question: "現在整理照片時，你覺得最困難的是什麼？",
    reply: "直接回信告訴我吧，每一封我都會親自讀。",
    signature: "Roy",
    role: "Life in Photos 開發者",
    why: "你收到這封信，是因為你加入了 Life in Photos 的 Beta 測試候補名單。",
    leave: "退出候補名單",
    leaveText: "退出候補名單："
  }
};

/* Chinese characters fill their whole square and read larger than Latin at the same size (see components/site/base.css),
   so the Chinese email sets its type a step smaller. Latin words in it (Life in Photos, Roy) keep Georgia. */
const type: Record<Locale, { family: string; heading: number; body: number; question: number }> = {
  en: { family: "Georgia,'Times New Roman',serif", heading: 38, body: 18, question: 20 },
  "zh-Hant": { family: "Georgia,'PingFang TC','Noto Sans TC','Microsoft JhengHei',sans-serif", heading: 32, body: 17, question: 19 }
};

/** The welcome email for a new waitlist signup, in the language of the page they joined from. */
export function welcomeEmail(locale: Locale, unsubscribeUrl: string) {
  const t = copy[locale];
  const { family, heading, body, question } = type[locale];
  const lineHeight = locale === "en" ? 1.65 : 1.75;
  const headingLine = locale === "en" ? 1.05 : 1.25;
  const href = unsubscribeUrl.replaceAll("&", "&amp;");

  const text = `${t.textThanks}

${t.textBuilding}

${t.question}${locale === "en" ? " " : ""}${t.reply}

${t.signature}
${t.role}

${t.why}
${t.leaveText} ${unsubscribeUrl}`;

  const html = `
    <!doctype html>
    <html lang="${locale}">
      <body style="margin:0;background:#f3eee3;color:#24352d;font-family:${family};">
        <div style="display:none;max-height:0;overflow:hidden;">${t.preheader}</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3eee3;padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#fffdf7;border:1px solid #d8cfbe;border-radius:24px;overflow:hidden;">
                <tr>
                  <td style="padding:40px 42px 18px;">
                    <p style="margin:0 0 34px;color:#b7593f;font:700 13px Arial,sans-serif;letter-spacing:1.8px;text-transform:uppercase;">${t.eyebrow}</p>
                    <h1 style="margin:0 0 20px;font-size:${heading}px;line-height:${headingLine};font-weight:500;">${t.heading.join("<br>")}</h1>
                    <p style="margin:0 0 18px;font-size:${body}px;line-height:${lineHeight};color:#4d5b54;">${t.thanks}</p>
                    <p style="margin:0 0 18px;font-size:${body}px;line-height:${lineHeight};color:#4d5b54;">${t.building}</p>
                    <div style="margin:30px 0;padding:24px;background:#f3eee3;border-radius:16px;">
                      <p style="margin:0 0 8px;font:700 13px Arial,sans-serif;letter-spacing:1.3px;text-transform:uppercase;color:#b7593f;">${t.questionLabel}</p>
                      <p style="margin:0;font-size:${question}px;line-height:1.45;">${t.question}</p>
                    </div>
                    <p style="margin:0 0 30px;font-size:${body}px;line-height:${lineHeight};color:#4d5b54;">${t.reply}</p>
                    <p style="margin:0;font-size:17px;line-height:1.55;">${t.signature}<br><span style="color:#758078;">${t.role}</span></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:22px 42px;background:#24352d;color:#dbe3dc;font:13px/1.5 Arial,sans-serif;">${t.why} <a href="${href}" style="color:#dbe3dc;text-decoration:underline;white-space:nowrap;">${t.leave}</a></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;

  return { subject: t.subject, text, html };
}
