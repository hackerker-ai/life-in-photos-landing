import { Fragment, type ReactNode } from "react";

/* Dictionary strings may carry four tags and nothing else: <b>bold</b>, <strong>important</strong>, <a href="…">a link</a>
   and <ph>a placeholder still to be filled in</ph>. Tags don't nest. Anything else is shown as plain text. */
const TAG = /<b>(.*?)<\/b>|<strong>(.*?)<\/strong>|<a href="([^"]+)">(.*?)<\/a>|<ph>(.*?)<\/ph>/g;

export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TAG)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    const [, bold, strong, href, link, placeholder] = match;
    if (bold !== undefined) parts.push(<b key={index}>{bold}</b>);
    else if (strong !== undefined) parts.push(<strong key={index}>{strong}</strong>);
    else if (href !== undefined) parts.push(<a key={index} href={href}>{link}</a>);
    else parts.push(<span key={index} className="ph">{placeholder}</span>);
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
