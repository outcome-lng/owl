const BASE = import.meta.env.BASE_URL;

/**
 * Prefix an internal root-relative path (e.g. "/services") with the Astro
 * `base` value, so internal links work under a GitHub Pages project path
 * like `https://lng-boomworks.github.io/<slug>/`.
 *
 * Pass-through for absolute URLs and non-"/"-leading values. Every internal
 * <a href> and image/favicon path in this template must go through here —
 * Astro does not auto-prefix href values, so raw "/services" would 404 in
 * production when `base` is set.
 */
export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  return path === "/" ? BASE : `${BASE.replace(/\/$/, "")}${path}`;
}
