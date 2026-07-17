import { useEffect, useState, type SyntheticEvent } from "react";
import type { ImgHTMLAttributes } from "react";
import { getAssetUrl } from "@/lib/utils";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

// Local public assets (e.g. "/favicon.png", "/xxx.jpg") need the deployment
// base path prefixed so they resolve correctly on sub-path hosts like
// GitHub Pages. External URLs (http/https) are left as-is.
function resolveLocalSrc(path: string) {
  return path.startsWith("/") ? getAssetUrl(path) : path;
}

export function ImageWithFallback({
  src,
  fallbackSrc = "/favicon.png",
  alt,
  onError,
  ...rest
}: ImageWithFallbackProps) {
  const initialSrc = typeof src === "string" ? src : fallbackSrc;

  const [currentSrc, setCurrentSrc] = useState<string>(
    resolveLocalSrc(initialSrc),
  );

  // Keep the displayed image in sync when the caller swaps `src` on an
  // already-mounted instance (e.g. lightbox "next/prev" without a key
  // change) — otherwise the old image would stay stuck on screen.
  useEffect(() => {
    setCurrentSrc(resolveLocalSrc(initialSrc));
  }, [initialSrc]);

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const resolvedFallback = resolveLocalSrc(fallbackSrc);
    if (currentSrc !== resolvedFallback) {
      setCurrentSrc(resolvedFallback);
    }
    if (onError) {
      onError(event as any);
    }
  };

  return <img {...rest} src={currentSrc} alt={alt} onError={handleError} />;
}
