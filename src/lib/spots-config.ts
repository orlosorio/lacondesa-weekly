/** Directory neighborhoods (crawlable sub-routes under /spots/[slug]). */
export const SPOT_NEIGHBORHOODS = [
  {
    slug: "condesa",
    name: "Condesa",
    intro:
      "Condesa is the postcard version of Mexico City — leafy avenues, Art Deco corners, and a café culture that runs from early espresso to late natural wine. Here’s where English speakers tend to land first, and for good reason.",
  },
  {
    slug: "hipodromo",
    name: "Hipódromo",
    intro:
      "Hipódromo is one of Mexico City’s most livable neighborhoods — tree-lined streets, a thriving café scene, and a strong expat community. Here’s what’s worth your time.",
  },
  {
    slug: "roma-norte",
    name: "Roma Norte",
    intro:
      "Roma Norte blends creative studios, indie galleries, and serious dining in walkable blocks. It’s fast-paced but still neighborhood-y — ideal for long lunches and spontaneous bar hops.",
  },
  {
    slug: "roma-sur",
    name: "Roma Sur",
    intro:
      "Roma Sur feels a touch quieter than its northern sibling — residential streets, local markets, and neighborhood spots that reward a slower stroll. A good grid for weeknight dinners and weekend coffee.",
  },
  {
    slug: "juarez",
    name: "Juárez",
    intro:
      "Juárez (including the Zona Rosa edge) mixes offices, hotels, and old-school institutions with new openings. It’s central, well connected, and handy when you’re threading work and play in the same day.",
  },
] as const;

export type SpotNeighborhoodSlug = (typeof SPOT_NEIGHBORHOODS)[number]["slug"];

export function isSpotNeighborhoodSlug(
  s: string
): s is SpotNeighborhoodSlug {
  return SPOT_NEIGHBORHOODS.some((n) => n.slug === s);
}

export function getNeighborhoodBySlug(slug: string) {
  return SPOT_NEIGHBORHOODS.find((n) => n.slug === slug);
}

/** UI filter labels → slugs that match `slugifyCategory` on restaurant categories */
export const SPOT_CATEGORY_FILTERS: {
  slug: string;
  label: string;
  /** category slugs from slugifyCategory() */
  matchSlugs: string[];
}[] = [
  { slug: "cafe", label: "Café", matchSlugs: ["cafe"] },
  { slug: "juice-bar", label: "Juice Bar", matchSlugs: ["juice-bar"] },
  {
    slug: "breakfast-brunch",
    label: "Breakfast & Brunch",
    matchSlugs: ["breakfast-brunch", "breakfast"],
  },
  {
    slug: "restaurants",
    label: "Restaurants",
    matchSlugs: ["italian", "mexican", "dinner", "tapas"],
  },
  { slug: "bars", label: "Bars", matchSlugs: ["wine-bar"] },
  { slug: "bakery", label: "Bakery", matchSlugs: ["bakery", "pasteleria"] },
  { slug: "tacos", label: "Tacos", matchSlugs: ["taqueria"] },
  {
    slug: "fine-dining",
    label: "Fine Dining",
    matchSlugs: ["dinner", "wine-bar", "italian"],
  },
];

export type SpotSortId =
  | "featured"
  | "newest"
  | "az"
  | "rating"
  | "open";

export const SPOT_SORT_OPTIONS: { id: SpotSortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "az", label: "A–Z" },
  { id: "rating", label: "Highest rated" },
  { id: "open", label: "Open now" },
];
