import { existsSync } from "node:fs";
import path from "node:path";
import type { Photo } from "@/lib/content";

export interface ResolvedPhoto extends Photo {
  /** False when a local file hasn't been added to /public yet. */
  available: boolean;
}

/** Server-only: checks local photos exist so a missing file renders a fallback frame, not a broken image. */
export function resolvePhoto(photo: Photo): ResolvedPhoto {
  if (/^https?:\/\//.test(photo.src)) return { ...photo, available: true };
  const file = path.join(/*turbopackIgnore: true*/ process.cwd(), "public", photo.src);
  return { ...photo, available: existsSync(file) };
}
