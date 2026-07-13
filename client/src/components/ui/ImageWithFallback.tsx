import { useState, type SyntheticEvent } from "react";
import type { ImgHTMLAttributes } from "react";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc = "/favicon.png",
  alt,
  onError,
  ...rest
}: ImageWithFallbackProps) {
  const initialSrc = typeof src === "string" ? src : fallbackSrc;
  const shouldUseFallback =
    typeof initialSrc === "string" &&
    initialSrc.startsWith("/manus-storage") &&
    import.meta.env.PROD;

  const [currentSrc, setCurrentSrc] = useState<string>(
    shouldUseFallback ? fallbackSrc : initialSrc,
  );

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
    if (onError) {
      onError(event as any);
    }
  };

  return <img {...rest} src={currentSrc} alt={alt} onError={handleError} />;
}
