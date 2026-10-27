import localFont from "next/font/local";

/* The three brand faces, self-hosted from public/fonts (latin subsets, SIL OFL). Each exposes a CSS variable that the
   --display, --text and --hand stacks in components/site/base.css start with. */
export const nunito = localFont({
  src: [
    { path: "../../public/fonts/nunito-latin-800-normal.woff2", weight: "800", style: "normal" },
    { path: "../../public/fonts/nunito-latin-900-normal.woff2", weight: "900", style: "normal" }
  ],
  variable: "--font-nunito",
  display: "swap"
});

export const figtree = localFont({
  src: [
    { path: "../../public/fonts/figtree-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/figtree-latin-600-normal.woff2", weight: "600", style: "normal" }
  ],
  variable: "--font-figtree",
  display: "swap"
});

export const caveat = localFont({
  src: [{ path: "../../public/fonts/caveat-latin-600-normal.woff2", weight: "600", style: "normal" }],
  variable: "--font-caveat",
  display: "swap"
});
