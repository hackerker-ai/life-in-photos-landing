import type { CSSProperties } from "react";
import { photoSrc } from "./photos";

/** A kept moment as a Polaroid: the cover photo and its name in handwriting. */
export function Polaroid({ id, caption, className, style }: { id: number; caption: string; className?: string; style?: CSSProperties }) {
  return (
    <figure className={className ? `pol ${className}` : "pol"} style={style}>
      <img src={photoSrc(id, "m")} alt="" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
