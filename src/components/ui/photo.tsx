import type { CSSProperties } from "react";
import Image from "next/image";
import type { ResolvedPhoto } from "@/lib/photos";

export interface PhotoFrameProps {
  photo: ResolvedPhoto;
  /** Accurate `sizes` for the rendered width. */
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Treat as decorative (alt=""), e.g. when adjacent text already describes it. */
  decorative?: boolean;
  /** Parallax speed passed to MotionController. The image is over-scaled to hide edges. */
  parallax?: number;
}

/** Fills its (sized) parent. The parent must be `relative` with an aspect ratio or height. */
export function PhotoFrame({ photo, sizes, priority, className = "", imgClassName = "", decorative, parallax }: PhotoFrameProps) {
  const alt = decorative ? "" : photo.alt;

  if (!photo.available) {
    return (
      <div
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : alt}
        aria-hidden={decorative || undefined}
        className={`absolute inset-0 overflow-hidden bg-gradient-to-b from-slate via-dusk to-night ${className}`}
      >
        <div className="stars absolute inset-0 opacity-60" />
        <span className="display absolute inset-0 grid place-items-center text-[clamp(4rem,12vw,9rem)] italic text-pearl/15">J</span>
        {process.env.NODE_ENV === "development" && (
          <span className="absolute inset-x-3 bottom-3 rounded-sm bg-night/70 px-2 py-1 text-center text-[10px] tracking-wide text-pearl/70">
            Add public{photo.src}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={photo.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName}`}
        {...(parallax ? { "data-parallax": parallax, style: { "--ps": 1.14 } as CSSProperties } : {})}
      />
    </div>
  );
}
