import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site";

/* Everything is open to search except the API and the old design explorations. Pages that aren't ready (a locale still
   in draft, the privacy policy, the leave-the-list page) say noindex themselves, so they can still be crawled. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/designs"] },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`
  };
}
