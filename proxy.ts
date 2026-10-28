import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

/* English lives at the root and every other locale under its prefix. App routes all sit under app/[lang], so an
   unprefixed path is rewritten to the English segment, and an explicit /en path redirects to the root. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const prefixed = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (prefixed) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: not the API, Next's own files or anything in public/ (paths with a file extension).
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
