/**
 * Equirectangular projection shared with the generated Europe map
 * (src/lib/europe-map.json). Destination pins are projected from real
 * [longitude, latitude] frontmatter so they land on the right country.
 */
export const MAP = {
  lonMin: -12,
  lonMax: 34,
  latMin: 34,
  latMax: 66,
  width: 1000,
  height: 860,
};

export function project([lon, lat]: [number, number]): { x: number; y: number } {
  const x = ((lon - MAP.lonMin) / (MAP.lonMax - MAP.lonMin)) * MAP.width;
  const y = ((MAP.latMax - lat) / (MAP.latMax - MAP.latMin)) * MAP.height;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}
