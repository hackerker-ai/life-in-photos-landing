import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Life in Photos | Design explorations",
  robots: { index: false, follow: false },
};

/* The design gallery keeps its own root layout and the first design's global styles, apart from the home page. */
export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
