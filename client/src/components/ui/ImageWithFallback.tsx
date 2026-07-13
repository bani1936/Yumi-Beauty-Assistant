import { useState, type SyntheticEvent } from "react";
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
