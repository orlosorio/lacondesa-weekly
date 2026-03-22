import type { DayCode, Restaurant } from "@/types/restaurant";
import { sortHoursMonFirst } from "@/lib/restaurant-hours";

const DAY_FULL: Record<DayCode, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

function normalizeTelephoneJsonLd(phone?: string): string | undefined {
  if (!phone?.trim()) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  return `+${digits}`;
}

/** Groups rows with identical open/close into one OpeningHoursSpecification (Schema.org). */
function openingHoursGrouped(r: Restaurant) {
  const rows = sortHoursMonFirst(r.hours).filter((row) => !row.closed);
  const groups = new Map<
    string,
    { open: string; close: string; days: DayCode[] }
  >();
  for (const row of rows) {
    const key = `${row.open}|${row.close}`;
    const existing = groups.get(key);
    if (existing) {
      existing.days.push(row.day);
    } else {
      groups.set(key, {
        open: row.open,
        close: row.close,
        days: [row.day],
      });
    }
  }
  return [...groups.values()].map((g) => ({
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: g.days.map((d) => DAY_FULL[d]),
    opens: g.open,
    closes: g.close,
  }));
}

export function buildProfileMetaDescription(r: Restaurant): string {
  const hook = r.description.split("\n\n")[0]?.trim() ?? "";
  const short =
    hook.length > 120 ? `${hook.slice(0, 117).trim()}…` : hook;
  return `${r.name} in ${r.neighborhood.name}, Mexico City. Hours, menu, address, and more. ${short}`;
}

const FALLBACK_LISTING_IMAGE =
  "https://lacondesa.mx/images/hero-condesa.png";

/** Single JSON-LD graph: Restaurant + Review nodes (SSR). */
export function buildRestaurantPageJsonLd(
  r: Restaurant,
  canonicalUrl: string,
  heroImageUrl: string
): Record<string, unknown> {
  const restaurantId = `${canonicalUrl}#restaurant`;

  const imageUrl =
    heroImageUrl && heroImageUrl.length > 0
      ? heroImageUrl
      : FALLBACK_LISTING_IMAGE;

  const sameAs = [
    r.contact.instagram,
    r.contact.facebook,
    r.contact.tiktok,
    ...(r.schemaExtras?.sameAsExtra ?? []),
  ].filter(Boolean) as string[];

  const descFromSchema =
    r.schemaExtras?.restaurantDescription?.trim() ||
    r.description.replace(/\n\n/g, " ").slice(0, 5000);

  const locality = `${r.address.colonia}, ${r.address.city}`;

  const restaurant: Record<string, unknown> = {
    "@type": "Restaurant",
    "@id": restaurantId,
    name: r.name,
    description: descFromSchema,
    image: imageUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: r.address.street,
      addressLocality: locality,
      addressRegion: "CDMX",
      postalCode: r.address.postalCode,
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: r.address.coordinates.lat,
      longitude: r.address.coordinates.lng,
    },
    url: r.contact.website ?? canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
      url: canonicalUrl,
    },
  };

  const tel = normalizeTelephoneJsonLd(r.contact.phone);
  if (tel) {
    restaurant.telephone = tel;
  }

  if (r.schemaExtras?.servesCuisine?.length) {
    restaurant.servesCuisine = r.schemaExtras.servesCuisine;
  } else {
    restaurant.servesCuisine = r.category;
  }

  if (r.priceRange?.trim()) {
    restaurant.priceRange = r.priceRange.trim();
  }

  if (sameAs.length > 0) {
    restaurant.sameAs = [...new Set(sameAs)];
  }

  const hours = openingHoursGrouped(r);
  if (hours.length > 0) {
    restaurant.openingHoursSpecification = hours;
  }

  if (r.rating && r.rating.count > 0) {
    restaurant.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: r.rating.average,
      reviewCount: r.rating.count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  const graph: Record<string, unknown>[] = [restaurant];

  if (r.reviews?.length) {
    r.reviews.forEach((rev, i) => {
      graph.push({
        "@type": "Review",
        "@id": `${canonicalUrl}#review-${i + 1}`,
        itemReviewed: { "@id": restaurantId },
        author: { "@type": "Person", name: rev.author },
        reviewRating: {
          "@type": "Rating",
          ratingValue: rev.rating,
          bestRating: 5,
          worstRating: 1,
        },
        datePublished: rev.date,
        reviewBody: rev.text,
      });
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
