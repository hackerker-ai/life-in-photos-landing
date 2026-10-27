/* A script that runs while the browser parses the server HTML, before the first paint, so client-only layout (the hero
   screen's zoom, a still sorting scene for Reduce Motion) is right from the first frame. On the client it renders as
   text/plain, so React never runs it twice. See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md. */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
