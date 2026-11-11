import type { SiteImage } from "@/config/images";
import { cn } from "@/lib/utils";

type Props = {
  image: SiteImage;
  /** Aspect ratio of the frame, e.g. "4 / 3". Omit to keep the image's own proportions. */
  ratio?: string;
  /** cover = professional crop that fills the frame; contain = show the whole image */
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Responsive image that adapts any photo (portrait, landscape, square) to its frame
 * without distortion. Uses WebP srcset with a JPG/PNG fallback and reserves space
 * via width/height + aspect-ratio to avoid layout shift.
 */
export function SmartImage({ image, ratio, fit = "cover", sizes = "100vw", priority = false, className, imgClassName }: Props) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-strong", className)} style={{ aspectRatio: ratio ?? `${image.width} / ${image.height}` }}>
      <picture>
        {image.webp && <source type="image/webp" srcSet={image.webp} sizes={sizes} />}
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className={cn("absolute inset-0 size-full", fit === "cover" ? "object-cover" : "object-contain", imgClassName)}
          style={{ objectPosition: image.focus ?? "50% 50%" }}
        />
      </picture>
    </div>
  );
}
