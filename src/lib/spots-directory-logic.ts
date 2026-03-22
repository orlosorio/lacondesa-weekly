import type { Restaurant } from "@/types/restaurant";
import { slugifyCategory } from "@/lib/restaurant-slug";
import { isOpenNow } from "@/lib/restaurant-hours";
import {
  SPOT_CATEGORY_FILTERS,
  SPOT_NEIGHBORHOODS,
  type SpotSortId,
} from "@/lib/spots-config";

export type SpotsFilterState = {
  neighborhood: string | null; // null = all
  categorySlugs: string[]; // filter keys from SPOT_CATEGORY_FILTERS
  sort: SpotSortId;
};

const DESC_PREVIEW_LEN = 80;

export function truncateSpotDescription(text: string): string {
  const first = text.split(/\n\n+/)[0]?.trim() ?? "";
  if (first.length <= DESC_PREVIEW_LEN) return first;
  return `${first.slice(0, DESC_PREVIEW_LEN - 1).trim()}…`;
}

function restaurantCategorySlugs(r: Restaurant): Set<string> {
  return new Set(r.category.map((c) => slugifyCategory(c)));
}

function matchesCategoryFilters(
  r: Restaurant,
  selectedFilterSlugs: string[]
): boolean {
  if (selectedFilterSlugs.length === 0) return true;
  const cats = restaurantCategorySlugs(r);
  for (const key of selectedFilterSlugs) {
    const def = SPOT_CATEGORY_FILTERS.find((f) => f.slug === key);
    if (!def) continue;
    if (def.matchSlugs.some((s) => cats.has(s))) return true;
  }
  return false;
}

function matchesNeighborhood(
  r: Restaurant,
  neighborhoodSlug: string | null
): boolean {
  if (!neighborhoodSlug) return true;
  return r.neighborhood.slug === neighborhoodSlug;
}

function sortSpots(list: Restaurant[], sort: SpotSortId): Restaurant[] {
  const out = [...list];
  switch (sort) {
    case "featured":
      return out.sort((a, b) => {
        const fa = a.featured ? 1 : 0;
        const fb = b.featured ? 1 : 0;
        if (fb !== fa) return fb - fa;
        return a.name.localeCompare(b.name);
      });
    case "newest":
      return out.sort((a, b) => {
        const da = a.listingAddedAt ?? "1970-01-01";
        const db = b.listingAddedAt ?? "1970-01-01";
        return db.localeCompare(da);
      });
    case "az":
      return out.sort((a, b) => a.name.localeCompare(b.name));
    case "rating":
      return out.sort((a, b) => {
        const ra = a.rating?.count ? a.rating.average : -1;
        const rb = b.rating?.count ? b.rating.average : -1;
        if (rb !== ra) return rb - ra;
        return a.name.localeCompare(b.name);
      });
    case "open":
      return out.sort((a, b) => {
        const oa = isOpenNow(a.hours) ? 1 : 0;
        const ob = isOpenNow(b.hours) ? 1 : 0;
        if (ob !== oa) return ob - oa;
        const fa = a.featured ? 1 : 0;
        const fb = b.featured ? 1 : 0;
        if (fb !== fa) return fb - fa;
        return a.name.localeCompare(b.name);
      });
    default:
      return out;
  }
}

export function filterAndSortSpots(
  all: Restaurant[],
  state: SpotsFilterState
): Restaurant[] {
  let list = all.filter(
    (r) =>
      matchesNeighborhood(r, state.neighborhood) &&
      matchesCategoryFilters(r, state.categorySlugs)
  );
  list = sortSpots(list, state.sort);
  return list;
}

/** Parse URL searchParams into filter state */
export function parseSpotsSearchParams(
  raw: Record<string, string | string[] | undefined>
): SpotsFilterState {
  const n = raw.neighborhood;
  const neighborhood =
    typeof n === "string" && n && n !== "all"
      ? SPOT_NEIGHBORHOODS.some((x) => x.slug === n)
        ? n
        : null
      : null;

  const c = raw.category;
  let categorySlugs: string[] = [];
  if (typeof c === "string" && c.length > 0) {
    categorySlugs = c
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }

  const s = raw.sort;
  const sort: SpotSortId =
    typeof s === "string" &&
    ["featured", "newest", "az", "rating", "open"].includes(s)
      ? (s as SpotSortId)
      : "featured";

  return { neighborhood, categorySlugs, sort };
}

/** Full path + query for shareable directory URLs */
export function buildSpotsUrl(
  state: SpotsFilterState,
  mode: { kind: "root" } | { kind: "neighborhood"; slug: string }
): string {
  const p = new URLSearchParams();
  if (mode.kind === "root" && state.neighborhood) {
    p.set("neighborhood", state.neighborhood);
  }
  if (state.categorySlugs.length > 0) {
    p.set("category", [...state.categorySlugs].sort().join(","));
  }
  if (state.sort !== "featured") p.set("sort", state.sort);
  const qs = p.toString();
  if (mode.kind === "neighborhood") {
    return `/spots/${mode.slug}${qs ? `?${qs}` : ""}`;
  }
  return `/spots${qs ? `?${qs}` : ""}`;
}
