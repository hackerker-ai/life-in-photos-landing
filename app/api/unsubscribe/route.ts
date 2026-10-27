import { NextResponse } from "next/server";
import { Resend } from "resend";
import { defaultLocale, hasLocale, localePath } from "@/lib/i18n";
import { contactPath, isValidUnsubscribeToken } from "@/lib/unsubscribe";

export const runtime = "nodejs";

/* Takes an address off the waitlist. Two callers post here: the confirm button on /unsubscribe (a form with email,
   token and lang, answered with a redirect back to that page), and a mail app's own Unsubscribe button (RFC 8058: the
   email and token are in the List-Unsubscribe URL, answered with a status only). The contact stays in Resend, marked
   unsubscribed, so it gets no more email and a later signup can bring it back. */
/* Someone opening the List-Unsubscribe address itself (an older mail app, or a copied link) lands on the confirm page,
   in the email's language, instead of an empty 405. */
export function GET(request: Request) {
  const url = new URL(request.url);
  const hl = url.searchParams.get("hl") ?? "";
  const query = new URLSearchParams({ email: url.searchParams.get("email") ?? "", token: url.searchParams.get("token") ?? "" });
  return new NextResponse(null, { status: 303, headers: { Location: `${localePath(hasLocale(hl) ? hl : defaultLocale, "/unsubscribe")}?${query}` } });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const form = await request.formData().catch(() => null);
  const field = (name: string) => form?.get(name)?.toString() ?? url.searchParams.get(name) ?? "";

  const email = field("email").trim().toLowerCase();
  const token = field("token");
  const lang = field("lang");

  const answer = (ok: boolean) => {
    if (!hasLocale(lang)) return NextResponse.json({ ok }, { status: ok ? 200 : 400, headers: { "Cache-Control": "no-store" } });
    const query = ok ? new URLSearchParams({ done: "1" }) : new URLSearchParams({ email, token, failed: "1" });
    // A relative Location, so the reader lands back on the host they came from (the server's own idea of its address
    // can differ behind a proxy).
    return new NextResponse(null, { status: 303, headers: { Location: `${localePath(lang, "/unsubscribe")}?${query}` } });
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !isValidUnsubscribeToken(email, token)) return answer(false);

  const result = await new Resend(apiKey).contacts.update({ email: contactPath(email), unsubscribed: true });
  return answer(!result.error);
}
