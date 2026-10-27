import { notFound } from "next/navigation";

/* Any address under a locale that no page answers: a 404 drawn by app/[lang]/not-found.tsx, inside the site's own
   layout (its fonts and <html lang>), instead of Next's bare default. */
export default function Missing() {
  notFound();
}
