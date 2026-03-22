export type DayCode = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type RestaurantHoursRow = {
  day: DayCode;
  open: string;
  close: string;
  closed?: boolean;
};

export type RestaurantImage = {
  url: string;
  alt: string;
  isCover?: boolean;
};

export type MenuItem = {
  name: string;
  description?: string;
  price?: number;
  /** e.g. "add-on" — shown next to price */
  note?: string;
};

export type MenuCategory = {
  category: string;
  items: MenuItem[];
};

export type RestaurantReview = {
  author: string;
  rating: number;
  date: string;
  text: string;
};

export type Restaurant = {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Short line under the title (optional) */
  tagline?: string;
  category: string[];
  neighborhood: {
    name: string;
    slug: string;
  };
  address: {
    street: string;
    colonia: string;
    city: string;
    postalCode: string;
    coordinates: { lat: number; lng: number };
  };
  contact: {
    phone?: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    googleMaps?: string;
    tiktok?: string;
    uberEats?: string;
  };
  hours: RestaurantHoursRow[];
  features: string[];
  images: RestaurantImage[];
  menu?: MenuCategory[];
  /** Shown in JSON-LD `priceRange` when set */
  priceRange?: string;
  /** Per-page SEO overrides (optional) */
  seo?: {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  /** Extra structured data for JSON-LD */
  schemaExtras?: {
    restaurantDescription?: string;
    servesCuisine?: string[];
    sameAsExtra?: string[];
  };
  rating?: {
    average: number;
    count: number;
  };
  reviews?: RestaurantReview[];
  claimed: boolean;
  /** Directory: pinned in featured sort */
  featured?: boolean;
  /** ISO date for “Newest” sort */
  listingAddedAt?: string;
};
