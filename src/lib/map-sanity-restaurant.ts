import type {
  DayCode,
  Restaurant,
  RestaurantHoursRow,
  RestaurantImage,
} from "@/types/restaurant";
import { urlFor } from "@/sanity/image";

const DAYS: DayCode[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export interface SanityRestaurantDoc {
  _id: string;
  name: string;
  slug: string;
  neighborhoodName: string;
  neighborhoodSlug: string;
  category: string[];
  description: string;
  features?: string[] | null;
  street: string;
  colonia: string;
  city?: string | null;
  postalCode?: string | null;
  latitude: number;
  longitude: number;
  phone?: string | null;
  website?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  uberEats?: string | null;
  googleMaps?: string | null;
  hours?: {
    day: string;
    open?: string | null;
    close?: string | null;
    closed?: boolean | null;
  }[] | null;
  images?: {
    image: unknown;
    alt?: string | null;
    isCover?: boolean | null;
  }[] | null;
  menu?: {
    category: string;
    items?: {
      name: string;
      description?: string | null;
      price?: number | null;
    }[] | null;
  }[] | null;
  ratingAverage?: number | null;
  ratingCount?: number | null;
  reviews?: {
    author: string;
    rating: number;
    date: string;
    text: string;
  }[] | null;
  claimed?: boolean | null;
  featured?: boolean | null;
  listingAddedAt?: string | null;
}

function isDayCode(d: string): d is DayCode {
  return DAYS.includes(d as DayCode);
}

function normalizeHours(
  rows: SanityRestaurantDoc["hours"]
): RestaurantHoursRow[] {
  const byDay = new Map<
    string,
    {
      day: string;
      open?: string | null;
      close?: string | null;
      closed?: boolean | null;
    }
  >();
  for (const r of rows ?? []) {
    if (r?.day && isDayCode(r.day)) byDay.set(r.day, r);
  }
  return DAYS.map((day) => {
    const r = byDay.get(day);
    if (!r || r.closed) {
      return { day, open: "09:00", close: "18:00", closed: true };
    }
    return {
      day,
      open: (r.open ?? "09:00").trim(),
      close: (r.close ?? "18:00").trim(),
      closed: false,
    };
  });
}

function mapImages(
  images: SanityRestaurantDoc["images"]
): RestaurantImage[] {
  const out: RestaurantImage[] = [];
  for (const row of images ?? []) {
    if (!row?.image) continue;
    try {
      const url = urlFor(row.image).width(1600).quality(85).url();
      if (!url) continue;
      out.push({
        url,
        alt: (row.alt?.trim() || "Venue photo").slice(0, 200),
        isCover: Boolean(row.isCover),
      });
    } catch {
      continue;
    }
  }
  return out;
}

export function mapSanityRestaurant(doc: SanityRestaurantDoc): Restaurant | null {
  if (!doc.slug || !doc.name) return null;
  const images = mapImages(doc.images);
  if (images.length === 0) return null;

  const nh = (doc.neighborhoodName ?? "").trim();
  const ns = (doc.neighborhoodSlug ?? "").toLowerCase().trim();

  const rating =
    doc.ratingAverage != null &&
    doc.ratingCount != null &&
    doc.ratingCount > 0
      ? { average: doc.ratingAverage, count: doc.ratingCount }
      : undefined;

  const menu = doc.menu
    ?.map((m) => ({
      category: m.category,
      items: (m.items ?? [])
        .filter((it) => it?.name)
        .map((it) => ({
          name: it.name,
          description: it.description ?? undefined,
          price: it.price ?? undefined,
        })),
    }))
    .filter((m) => m.category && m.items.length > 0);

  return {
    id: doc._id,
    slug: doc.slug,
    name: doc.name,
    description: doc.description ?? "",
    category: Array.isArray(doc.category) ? doc.category.filter(Boolean) : [],
    neighborhood: {
      name: nh,
      slug: ns.replace(/\s+/g, "-"),
    },
    address: {
      street: doc.street ?? "",
      colonia: doc.colonia ?? "",
      city: doc.city ?? "Mexico City",
      postalCode: doc.postalCode ?? "",
      coordinates: { lat: doc.latitude, lng: doc.longitude },
    },
    contact: {
      phone: doc.phone ?? undefined,
      website: doc.website ?? undefined,
      instagram: doc.instagram ?? undefined,
      facebook: doc.facebook ?? undefined,
      tiktok: doc.tiktok ?? undefined,
      uberEats: doc.uberEats ?? undefined,
      googleMaps: doc.googleMaps ?? undefined,
    },
    hours: normalizeHours(doc.hours),
    features: doc.features?.filter(Boolean) ?? [],
    images,
    menu: menu?.length ? menu : undefined,
    rating,
    reviews: doc.reviews?.map((r) => ({
      author: r.author,
      rating: r.rating,
      date: typeof r.date === "string" ? r.date.slice(0, 10) : "",
      text: r.text,
    })),
    claimed: Boolean(doc.claimed),
    featured: doc.featured ?? undefined,
    listingAddedAt: doc.listingAddedAt ?? undefined,
  };
}
