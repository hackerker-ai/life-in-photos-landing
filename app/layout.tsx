import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Life in Photos | Find the moments worth keeping",
  description:
    "Life in Photos helps you bring similar photos together and review the moments worth keeping, one small decision at a time.",
  metadataBase: new URL("https://lifeinphotos.app"),
  openGraph: {
    title: "Find the moments worth keeping",
    description:
      "A calmer way to work through photo clutter and bring meaningful family moments forward.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
