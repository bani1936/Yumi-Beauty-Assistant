import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolve a local `public/` asset path so it works when the site is deployed
 * under a sub-path (e.g. GitHub Pages serves this project at
 * "/Yumi-Beauty-Assistant/"). A plain "/favicon.png" would otherwise resolve
 * to the domain root and 404 in production. Note: this is independent of
 * the hash-based page routing — it only affects static asset URLs (images).
 */
export function getAssetUrl(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return base && base !== "/" ? `${base}${normalizedPath}` : normalizedPath;
}
