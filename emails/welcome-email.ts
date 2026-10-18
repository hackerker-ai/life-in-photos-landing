export function welcomeEmail() {
  const subject = "You are on the Life in Photos early-access list";
  const text = `Thank you for joining Life in Photos.

We are building a calmer way to work through photo clutter and bring meaningful family moments forward, one small review at a time.

What is the hardest part of managing your photo library today? Reply and tell me. I read every response.

Roy
Builder of Life in Photos`;

  const html = `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#f3eee3;color:#24352d;font-family:Georgia,'Times New Roman',serif;">
        <div style="display:none;max-height:0;overflow:hidden;">A calmer way to find the moments worth keeping.</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3eee3;padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#fffdf7;border:1px solid #d8cfbe;border-radius:24px;overflow:hidden;">
                <tr>
                  <td style="padding:40px 42px 18px;">
                    <p style="margin:0 0 34px;color:#b7593f;font:700 13px Arial,sans-serif;letter-spacing:1.8px;text-transform:uppercase;">Life in Photos</p>
                    <h1 style="margin:0 0 20px;font-size:38px;line-height:1.05;font-weight:500;">Welcome. Let's find the moments worth keeping.</h1>
                    <p style="margin:0 0 18px;font-size:18px;line-height:1.65;color:#4d5b54;">Thank you for joining our early-access list.</p>
                    <p style="margin:0 0 18px;font-size:18px;line-height:1.65;color:#4d5b54;">We're building a calmer way to work through photo clutter and bring meaningful family moments forward, one small review at a time.</p>
                    <div style="margin:30px 0;padding:24px;background:#f3eee3;border-radius:16px;">
                      <p style="margin:0 0 8px;font:700 13px Arial,sans-serif;letter-spacing:1.3px;text-transform:uppercase;color:#b7593f;">One question</p>
                      <p style="margin:0;font-size:20px;line-height:1.45;">What is the hardest part of managing your photo library today?</p>
                    </div>
                    <p style="margin:0 0 30px;font-size:18px;line-height:1.65;color:#4d5b54;">Reply and tell me. I read every response.</p>
                    <p style="margin:0;font-size:17px;line-height:1.55;">Roy<br><span style="color:#758078;">Builder of Life in Photos</span></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:22px 42px;background:#24352d;color:#dbe3dc;font:13px/1.5 Arial,sans-serif;">You received this because you joined the Life in Photos early-access list.</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;

  return { subject, text, html };
}
