import { createHmac, timingSafeEqual } from "node:crypto";
import { localePath, type Locale } from "@/lib/i18n";
import { SITE_ORIGIN } from "@/lib/site";

/* Every welcome email carries a link that takes its reader off the waitlist. The link names the address and carries a
   signature only this server can make, so nobody can take someone else off the list by guessing their address. The
   signature key is WAITLIST_UNSUBSCRIBE_SECRET, or the Resend API key when that isn't set (changing the key then
   retires the links in emails already sent; people can still write in to leave). Server code only. */
function signingKey() {
  return process.env.WAITLIST_UNSUBSCRIBE_SECRET || process.env.RESEND_API_KEY || "";
}

function signature(email: string) {
  return createHmac("sha256", signingKey()).update(`waitlist-unsubscribe:${email}`).digest("base64url").slice(0, 32);
}

export function isValidUnsubscribeToken(email: string, token: string) {
  if (!signingKey() || !email || !token) return false;
  const expected = Buffer.from(signature(email));
  const given = Buffer.from(token);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

/** The Resend SDK puts a contact's email straight into the request path (contacts/<email>), so an address with # ? / or %
    in it, which the signup form accepts, would reach the wrong URL. Pass this instead of the raw email to the calls that
    take one (contacts.update, contacts.segments.add). "@" is fine in a path and stays as is, so an ordinary address
    makes exactly the request it always did. */
export const contactPath = (email: string) => encodeURIComponent(email).replaceAll("%40", "@");

/* The links point at the site's own address, never at whatever host a signup request claims to come from, so a forged
   request can't send someone an email whose link leads elsewhere. SITE_URL overrides it for previews. */
const siteOrigin = () => process.env.SITE_URL || SITE_ORIGIN;

/**
 * The two ways out for one address: `page` asks the reader to confirm (link scanners open links, so opening it alone
 * changes nothing), and `oneClick` is the List-Unsubscribe address mail apps post to from their own Unsubscribe button.
 */
export function unsubscribeLinks(locale: Locale, email: string) {
  const origin = siteOrigin();
  const query = new URLSearchParams({ email, token: signature(email) });
  return {
    page: `${origin}${localePath(locale, "/unsubscribe")}?${query}`,
    // `hl` only says which language's page a plain visit (GET) should land on.
    oneClick: `${origin}/api/unsubscribe?${query}&hl=${locale}`
  };
}
