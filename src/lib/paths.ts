/**
 * Prefixes a site-absolute path with the configured `base` (e.g. /TRVLWEB
 * on GitHub Pages project sites). Use for every internal href and every
 * asset path that starts with "/".
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return base + (path.startsWith('/') ? path : `/${path}`);
}
