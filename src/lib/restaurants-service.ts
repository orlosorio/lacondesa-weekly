import { client } from "@/sanity/client";
import {
  allPublishedRestaurantsQuery,
  restaurantBySlugsQuery,
} from "@/sanity/queries";
import type { Restaurant } from "@/types/restaurant";
import { RESTAURANTS } from "@/lib/restaurants-data";
import { slugifyCategory } from "@/lib/restaurant-slug";
import {
  mapSanityRestaurant,
  type SanityRestaurantDoc,
} from "@/lib/map-sanity-restaurant";

function isSanityConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return !!projectId && projectId !== "your-project-id";
}

function mapList(raw: SanityRestaurantDoc[]): Restaurant[] {
  return raw.map(mapSanityRestaurant).filter((r): r is Restaurant => r != null);
}

/**
 * All published restaurants: from Sanity when configured and at least one
 * published document exists; otherwise fallback demo data in `RESTAURANTS`.
 */
export async function getAllRestaurants(): Promise<Restaurant[]> {
  if (!isSanityConfigured()) return RESTAURANTS;

  try {
    const raw = await client.fetch<SanityRestaurantDoc[]>(
      allPublishedRestaurantsQuery,
      {},
      { next: { revalidate: 120 } }
    );
    const list = mapList(raw ?? []);
    if (list.length === 0) return RESTAURANTS;
    return list;
  } catch {
    return RESTAURANTS;
  }
}

export async function getRestaurantBySlugs(
  neighborhoodSlug: string,
  restaurantSlug: string
): Promise<Restaurant | undefined> {
  const n = neighborhoodSlug.toLowerCase();
  const s = restaurantSlug.toLowerCase();

  if (isSanityConfigured()) {
    try {
      const doc = await client.fetch<SanityRestaurantDoc | null>(
        restaurantBySlugsQuery,
        { neighborhoodSlug: n, restaurantSlug: s },
        { next: { revalidate: 120 } }
      );
      if (doc) {
        const mapped = mapSanityRestaurant(doc);
        if (mapped) return mapped;
      }
    } catch {
      /* use fallback */
    }
  }

  return RESTAURANTS.find(
    (r) => r.neighborhood.slug === n && r.slug === s
  );
}

export async function getRestaurantsByNeighborhood(
  neighborhoodSlug: string
): Promise<Restaurant[]> {
  const s = neighborhoodSlug.toLowerCase();
  const all = await getAllRestaurants();
  return all.filter((r) => r.neighborhood.slug === s);
}

export async function getRestaurantsByCategorySlug(
  categorySlug: string
): Promise<Restaurant[]> {
  const target = categorySlug.toLowerCase();
  const all = await getAllRestaurants();
  return all.filter((r) =>
    r.category.some((c) => slugifyCategory(c) === target)
  );
}

export async function getNearbyRestaurants(
  restaurant: Restaurant,
  limit = 3
): Promise<Restaurant[]> {
  const all = await getAllRestaurants();
  return all
    .filter(
      (r) =>
        r.id !== restaurant.id &&
        r.neighborhood.slug === restaurant.neighborhood.slug
    )
    .slice(0, limit);
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const all = await getAllRestaurants();
  const set = new Set<string>();
  for (const r of all) {
    for (const c of r.category) {
      set.add(slugifyCategory(c));
    }
  }
  return [...set];
}
