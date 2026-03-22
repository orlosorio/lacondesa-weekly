/**
 * Demo / offline restaurant listings. At runtime the app prefers published
 * `restaurant` documents from Sanity when configured (`restaurants-service.ts`).
 */
import type { Restaurant } from "@/types/restaurant";
import { slugifyCategory } from "@/lib/restaurant-slug";
import { curiosaRestaurant } from "./restaurants-curiosa";

const defaultHours = (
  schedule: Partial<
    Record<
      "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun",
      { open: string; close: string } | "closed"
    >
  >
) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
  return days.map((day) => {
    const v = schedule[day];
    if (v === "closed" || !v) {
      return { day, open: "09:00", close: "18:00", closed: true };
    }
    return { day, open: v.open, close: v.close };
  });
};

export const RESTAURANTS: Restaurant[] = [
  {
    id: "r1",
    slug: "cafe-milpa",
    name: "Café Milpa",
    description:
      "Café Milpa is a calm Condesa spot where specialty coffee and same-day baking meet an almost editorial atmosphere. Tables are generous, light comes in sideways through the windows, and the staff remembers regulars.\n\nThe menu leans Mexican: beans from Veracruz and Chiapas, cold-pressed juices, and breakfast options that work for a quick meeting or a slow weekend read.\n\nIt’s one of those places where the city noise stays outside: quiet music, reliable Wi-Fi, and a small back patio if you want fresh air. Ideal for a few hours of work or a relaxed brunch.",
    category: ["Cafe", "Breakfast"],
    neighborhood: { name: "Condesa", slug: "condesa" },
    address: {
      street: "Av. Tamaulipas 45",
      colonia: "Hipódromo",
      city: "Mexico City",
      postalCode: "06170",
      coordinates: { lat: 19.4112, lng: -99.1689 },
    },
    contact: {
      phone: "+525555123456",
      website: "https://cafemilpa.mx",
      instagram: "https://www.instagram.com/cafemilpa",
      facebook: "https://www.facebook.com/cafemilpa",
      googleMaps: "https://maps.google.com/?q=19.4112,-99.1689",
    },
    hours: defaultHours({
      Mon: { open: "08:00", close: "20:00" },
      Tue: { open: "08:00", close: "20:00" },
      Wed: { open: "08:00", close: "20:00" },
      Thu: { open: "08:00", close: "21:00" },
      Fri: { open: "08:00", close: "21:30" },
      Sat: { open: "09:00", close: "21:30" },
      Sun: { open: "09:00", close: "18:00" },
    }),
    features: ["Patio", "Pet friendly", "Wi-Fi", "Reservations", "Cards accepted"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&q=80",
        alt: "Coffee bar interior with natural light",
        isCover: true,
      },
      {
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
        alt: "Coffee cup and croissant on a wood table",
      },
      {
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
        alt: "Café storefront on the street",
      },
      {
        url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80",
        alt: "Espresso detail in a ceramic cup",
      },
      {
        url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&q=80",
        alt: "Guests sharing breakfast at a table",
      },
      {
        url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&q=80",
        alt: "Outdoor patio with plants",
      },
    ],
    menu: [
      {
        category: "Drinks",
        items: [
          { name: "Espresso", price: 45, description: "Rotating single origin" },
          { name: "Cappuccino", price: 65, description: "Whole milk, double shot" },
          { name: "Cold brew", price: 70, description: "18-hour cold steep" },
        ],
      },
      {
        category: "Food",
        items: [
          {
            name: "Green chilaquiles",
            price: 145,
            description: "Shredded chicken, crema, and cheese",
          },
          { name: "Toast and avocado", price: 125, description: "Sourdough, lime, and chili" },
        ],
      },
    ],
    rating: { average: 4.7, count: 128 },
    reviews: [
      {
        author: "María G.",
        rating: 5,
        date: "2025-11-02",
        text: "Best cappuccino in the area. I come most Tuesdays after the gym—service is attentive without hovering. The patio is perfect when the weather’s nice.",
      },
      {
        author: "Luis R.",
        rating: 4,
        date: "2025-10-18",
        text: "Great coffee and bread. Weekends can mean a line but it’s worth the wait. I’d love more savory vegan options.",
      },
    ],
    featured: false,
    listingAddedAt: "2024-06-15",
    claimed: false,
  },
  {
    id: "r2",
    slug: "tacos-orilla",
    name: "Tacos Orilla",
    description:
      "Tacos Orilla is a neighborhood taquería in Condesa where the grill is in full view and the smell tells you you’re in the right line before you read the menu. Known for suadero and longaniza, with tortillas made to order and salsas that change with the season.\n\nThe room is small: low stools, good lighting, and a steady flow of locals. No reservations—order, eat standing or at a few front tables.\n\nLate hours on weekends make it a classic stop after a show or movie nearby.",
    category: ["Taqueria", "Mexican"],
    neighborhood: { name: "Condesa", slug: "condesa" },
    address: {
      street: "Calle Campeche 112",
      colonia: "Hipódromo",
      city: "Mexico City",
      postalCode: "06100",
      coordinates: { lat: 19.4134, lng: -99.1702 },
    },
    contact: {
      phone: "+525555987654",
      website: "https://tacosorilla.mx",
      instagram: "https://www.instagram.com/tacosorilla",
    },
    hours: defaultHours({
      Mon: "closed",
      Tue: { open: "13:00", close: "23:00" },
      Wed: { open: "13:00", close: "23:00" },
      Thu: { open: "13:00", close: "23:00" },
      Fri: { open: "13:00", close: "02:00" },
      Sat: { open: "13:00", close: "02:00" },
      Sun: { open: "13:00", close: "22:00" },
    }),
    features: ["Takeout", "Cash preferred", "Counter seating"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1600&q=80",
        alt: "Tacos on a plate with lime and salsa",
        isCover: true,
      },
      {
        url: "https://images.unsplash.com/photo-1599974579688-8dbddb9759c6?w=1200&q=80",
        alt: "Grill with meat cooking",
      },
      {
        url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1200&q=80",
        alt: "Table with tacos and drinks",
      },
      {
        url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80",
        alt: "Cook serving tacos",
      },
      {
        url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1200&q=80",
        alt: "Salsas in molcajetes",
      },
      {
        url: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=1200&q=80",
        alt: "Storefront lit up at night",
      },
    ],
    menu: [
      {
        category: "Tacos",
        items: [
          { name: "Suadero", price: 18, description: "Order of three" },
          { name: "Longaniza", price: 20, description: "Order of three" },
          { name: "Rib", price: 22, description: "Order of three" },
        ],
      },
    ],
    rating: { average: 4.5, count: 340 },
    reviews: [
      {
        author: "Ana P.",
        rating: 5,
        date: "2025-09-30",
        text: "Best suadero tacos for blocks. Come early on Friday or you’ll miss a seat.",
      },
    ],
    featured: false,
    listingAddedAt: "2024-08-01",
    claimed: true,
  },
  {
    id: "r3",
    slug: "vino-sotano",
    name: "Vino Sótano",
    description:
      "Vino Sótano is a small-plates wine bar in Condesa built for sharing bottles without white-tablecloth fuss. The list rotates between natural wines from Mexico and Europe, with light pairings: cheese, charcuterie, and one-pan dishes.\n\nThe room feels intimate: low tables, brick walls, and a visible cellar behind the bar. Staff helps you choose without jargon.\n\nWorks as well for a post-work glass as for a long Thursday dinner with friends.",
    category: ["Wine bar", "Tapas"],
    neighborhood: { name: "Condesa", slug: "condesa" },
    address: {
      street: "Calle Atlixco 58",
      colonia: "Hipódromo Condesa",
      city: "Mexico City",
      postalCode: "06140",
      coordinates: { lat: 19.4098, lng: -99.1654 },
    },
    contact: {
      phone: "+525555246802",
      website: "https://vinosotano.mx",
      instagram: "https://www.instagram.com/vinosotano",
    },
    hours: defaultHours({
      Mon: { open: "16:00", close: "23:00" },
      Tue: { open: "16:00", close: "23:00" },
      Wed: { open: "16:00", close: "23:00" },
      Thu: { open: "16:00", close: "00:00" },
      Fri: { open: "16:00", close: "01:00" },
      Sat: { open: "15:00", close: "01:00" },
      Sun: { open: "15:00", close: "22:00" },
    }),
    features: ["Reservations", "Live music", "21+"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&q=80",
        alt: "Glass of red wine at the bar",
        isCover: true,
      },
      {
        url: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1200&q=80",
        alt: "Cheese and charcuterie board",
      },
      {
        url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=80",
        alt: "Wine bottle wall",
      },
      {
        url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80",
        alt: "Toast at the table",
      },
      {
        url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80",
        alt: "Dim interior with warm lights",
      },
      {
        url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&q=80",
        alt: "White wine glass and bottle",
      },
    ],
    rating: { average: 4.8, count: 89 },
    reviews: [],
    featured: false,
    listingAddedAt: "2024-03-10",
    claimed: false,
  },
  {
    id: "r4",
    slug: "osteria-roma",
    name: "Ostería Roma",
    description:
      "Ostería Roma is a neighborhood Italian spot in Roma with house-made pasta and a short menu that changes monthly. Communal tables mix with quieter corners; the open kitchen shows off noodles and fillings.\n\nMade for unhurried dinners: shared antipasti, a main, and classic desserts. The wine list favors approachable Italian labels and a few Mexican bottles.\n\nReservations help on Friday and Saturday.",
    category: ["Italian", "Dinner"],
    neighborhood: { name: "Roma Norte", slug: "roma-norte" },
    address: {
      street: "Calle Orizaba 42",
      colonia: "Roma Norte",
      city: "Mexico City",
      postalCode: "06700",
      coordinates: { lat: 19.4193, lng: -99.1598 },
    },
    contact: {
      phone: "+525555334455",
      website: "https://osteriaroma.mx",
      instagram: "https://www.instagram.com/osteriaroma",
    },
    hours: defaultHours({
      Mon: "closed",
      Tue: { open: "13:00", close: "23:00" },
      Wed: { open: "13:00", close: "23:00" },
      Thu: { open: "13:00", close: "23:00" },
      Fri: { open: "13:00", close: "00:00" },
      Sat: { open: "13:00", close: "00:00" },
      Sun: { open: "13:00", close: "22:00" },
    }),
    features: ["Reservations", "Vegetarian options", "Wine list"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1600&q=80",
        alt: "Pasta plate with herbs",
        isCover: true,
      },
      {
        url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=80",
        alt: "Fresh pasta on a board",
      },
      {
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
        alt: "Set table with wine glasses",
      },
      {
        url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1200&q=80",
        alt: "Salad and bread",
      },
      {
        url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
        alt: "Grilled vegetables",
      },
      {
        url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80",
        alt: "Restaurant dining room",
      },
    ],
    menu: [
      {
        category: "Primi",
        items: [
          { name: "Tagliatelle al ragù", price: 195, description: "Slow-cooked, parmesan" },
          { name: "Mushroom risotto", price: 210 },
        ],
      },
    ],
    rating: { average: 4.6, count: 212 },
    reviews: [
      {
        author: "Diego M.",
        rating: 5,
        date: "2025-08-14",
        text: "Flawless pasta and a warm room. We did the tasting menu and pacing was spot on.",
      },
    ],
    featured: false,
    listingAddedAt: "2024-01-20",
    claimed: true,
  },
  curiosaRestaurant,
];

export function getRestaurantBySlugs(
  neighborhoodSlug: string,
  restaurantSlug: string
): Restaurant | undefined {
  return RESTAURANTS.find(
    (r) =>
      r.neighborhood.slug === neighborhoodSlug.toLowerCase() &&
      r.slug === restaurantSlug.toLowerCase()
  );
}

export function getRestaurantsByNeighborhood(neighborhoodSlug: string): Restaurant[] {
  const s = neighborhoodSlug.toLowerCase();
  return RESTAURANTS.filter((r) => r.neighborhood.slug === s);
}

export function getRestaurantsByCategorySlug(categorySlug: string): Restaurant[] {
  const target = categorySlug.toLowerCase();
  return RESTAURANTS.filter((r) =>
    r.category.some((c) => slugifyCategory(c) === target)
  );
}

export function getNearbyRestaurants(
  restaurant: Restaurant,
  limit = 3
): Restaurant[] {
  return RESTAURANTS.filter(
    (r) =>
      r.id !== restaurant.id && r.neighborhood.slug === restaurant.neighborhood.slug
  ).slice(0, limit);
}

export function getAllCategorySlugs(): string[] {
  const set = new Set<string>();
  for (const r of RESTAURANTS) {
    for (const c of r.category) {
      set.add(slugifyCategory(c));
    }
  }
  return [...set];
}
