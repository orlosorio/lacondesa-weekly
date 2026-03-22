import type { Restaurant } from "@/types/restaurant";

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

/** Curiosa Juice Bar & Café — Hipódromo directory profile */
export const curiosaRestaurant: Restaurant = {
  id: "r-curiosa-juice-bar-cafe",
  slug: "curiosa-juice-bar-cafe",
  name: "Curiosa Juice Bar & Café",
  tagline: "The healthiest ingredients for the best people",
  description:
    "A neighborhood wellness café in the heart of Hipódromo, Condesa. Curiosa blends Southern California juice bar culture with a warm CDMX community spirit. Everything is made fresh daily in small batches — cold-pressed juices, superfood smoothies, healing lattes, and all-day breakfast. Opened in 2025, it's already become a staple for locals looking for clean, inventive food without sacrificing flavor.",
  category: ["Juice Bar", "Café", "Breakfast & Brunch"],
  neighborhood: { name: "Hipódromo", slug: "hipodromo" },
  priceRange: "$$",
  address: {
    street: "Aguascalientes 214 B",
    colonia: "Hipódromo",
    city: "Mexico City",
    postalCode: "06100",
    coordinates: { lat: 19.4135, lng: -99.1669 },
  },
  contact: {
    phone: "+52 56 1855 2013",
    website: "https://www.curiosacafe.mx",
    instagram: "https://www.instagram.com/curiosacafe",
    facebook:
      "https://www.facebook.com/p/Curiosa-Juice-Bar-Cafe-61573098625185",
    tiktok: "https://www.tiktok.com/@curiosa.cafe",
    uberEats:
      "https://www.ubereats.com/mx/store/curiosa-mexico-city/N08oiT4HX6SBgMxq06I3Hg",
    googleMaps: "https://maps.app.goo.gl/VcnBaW8GNhfwgGhv5",
  },
  hours: defaultHours({
    Mon: { open: "08:00", close: "19:00" },
    Tue: { open: "08:00", close: "19:00" },
    Wed: { open: "08:00", close: "19:00" },
    Thu: { open: "08:00", close: "19:00" },
    Fri: { open: "08:00", close: "19:00" },
    Sat: { open: "09:00", close: "18:00" },
    Sun: { open: "09:00", close: "18:00" },
  }),
  features: [
    "Pet friendly",
    "Vegan options",
    "Gluten-free options",
    "Good for work",
    "Cards accepted",
    "Takeaway",
    "Uber Eats delivery",
    "Breakfast all day",
    "Superfood add-ons",
  ],
  images: [],
  menu: [
    {
      category: "Smoothies",
      items: [
        {
          name: "Nutty Power",
          description:
            "Banana, dates, maca, almond milk, almond butter, peanut butter, vegan protein, sea salt, cacao nibs",
          price: 157,
        },
        {
          name: "Choco-Brain",
          description:
            "Organic cacao, banana, dates, almond butter, reishi, maca, almond milk, cinnamon, puffed quinoa",
          price: 152,
        },
        {
          name: "Lassi Tropical",
          description:
            "Mango, banana, date, cashew yogurt, orange juice, lucuma, turmeric, coconut milk, bee pollen",
          price: 145,
        },
        {
          name: "Campo Verde",
          description:
            "Cucumber, celery, parsley, spinach, chlorella, orange juice, dates, banana, cashew yogurt, bee pollen",
          price: 148,
        },
        {
          name: "Berry AB & J",
          description:
            "Blueberry, strawberry, banana, almond butter, coconut water, dates, chia, bee pollen",
          price: 150,
        },
        {
          name: "Inspirulina",
          description:
            "Blue spirulina, ashwagandha, coconut, dates, maca, almond butter, vanilla, goji",
          price: 165,
        },
      ],
    },
    {
      category: "Toasties & Wraps",
      items: [
        {
          name: "Berry Almond Butter Toast",
          description:
            "Almond butter, raspberry chia compote, bee pollen, cinnamon, banana on sourdough",
          price: 130,
        },
        {
          name: "Lemony Avo-Egg Toast",
          description:
            "Sourdough, avocado mash, organic egg, radish, cherry tomato, chili flakes, lemon zest",
          price: 145,
        },
        {
          name: "Tuna Avo Red Pepper Wrap",
          description:
            "Tuna salad, avocado mayo, roasted pepper, black sesame, cucumber",
          price: 152,
        },
        {
          name: "Turkey Spinach Wrap",
          description:
            "Artisanal turkey, spinach, cherry tomato, cracked pepper, avocado oil mayo",
          price: 152,
        },
        {
          name: "Chicken Caesar Wrap",
          description:
            "Pulled chicken, crispy lettuce, avocado, cherry tomato, house Caesar dressing",
          price: 152,
        },
      ],
    },
    {
      category: "All Day Breakfast",
      items: [
        {
          name: "Blueberry Parfait Yogurt Bowl",
          description:
            "Coconut cashew yogurt, fresh blueberries, agave-roasted cashews",
          price: 115,
        },
        {
          name: "Maple Apple Mini-Waffles",
          description:
            "Gluten-free waffles with apple and cinnamon, blueberries, toasted nuts, honey-maple drizzle",
          price: 135,
        },
        {
          name: "Herb & Egg Mini Omelette",
          description:
            "Free-range organic eggs, spinach, tomato, parsley, side salad",
          price: 142,
        },
        {
          name: "Veggie Breakfast Tacos",
          description:
            "Pea protein, organic eggs, steamed spinach, cherry tomato, vegan cheese",
          price: 158,
        },
        {
          name: "Apple Blueberry Oatmeal",
          description:
            "Organic oatmeal, almond & coconut milk, apple purée, cinnamon, date syrup, blueberries",
          price: 142,
        },
      ],
    },
    {
      category: "Healing Lattes",
      items: [
        {
          name: "Matcha Latte",
          description: "Organic Japanese matcha",
          price: 80,
        },
        {
          name: "Golden Milk Latte",
          description: "Turmeric, ginger, cinnamon, pepper",
          price: 70,
        },
        {
          name: "Masala Chai Latte",
          description:
            "Black tea, cardamom, cinnamon, ginger, fennel, clove, pepper",
          price: 75,
        },
        {
          name: "Pink Rose Latte",
          description: "Cinnamon, vanilla, beet, ginger, clove",
          price: 75,
        },
        {
          name: "Charcoal Latte",
          description: "Activated charcoal detox, date syrup",
          price: 80,
        },
        {
          name: "Cacao Adaptogen Latte",
          description: "Cacao, reishi, maca, ashwagandha, cinnamon",
          price: 90,
        },
      ],
    },
    {
      category: "Coffee",
      items: [
        { name: "Espresso", price: 45 },
        { name: "Americano", price: 50 },
        { name: "Macchiato", price: 55 },
        { name: "Flat White", price: 55 },
        { name: "Cappuccino", price: 60 },
        { name: "Latte", price: 65 },
        { name: "Vanilla Latte", price: 75 },
        { name: "Maple Latte", price: 75 },
        { name: "Mocha Latte", price: 80 },
        { name: "Espresso Tonic", price: 80 },
        { name: "Bulletproof Latte (MCT)", price: 85 },
        {
          name: "Alt milks (oat / coconut / almond)",
          price: 10,
          note: "add-on",
        },
      ],
    },
    {
      category: "Cold-Pressed Juices",
      items: [
        {
          name: "Daily Greens — Detox",
          description:
            "Celery, cucumber, parsley, ginger, green apple, lemon · 350ml",
          price: 120,
        },
        {
          name: "Dulce Raíz — Revive",
          description: "Beet, apple, ginger, cucumber, lemon · 350ml",
          price: 120,
        },
        {
          name: "Sidra Natural — Digest",
          description:
            "Golden/Macintosh/Smith apple, ginger, cinnamon, lemon, apple cider vinegar · 350ml",
          price: 120,
        },
        {
          name: "Puro Sol — Energy",
          description: "Carrot, apple, ginger · 350ml",
          price: 120,
        },
        { name: "Juice Tasting — 3 flavors", price: 140 },
      ],
    },
    {
      category: "Shots",
      items: [
        {
          name: "Ginger Shot — Full",
          description:
            "Ginger, citrus, echinacea, camu camu, lucuma, bee pollen",
          price: 65,
        },
        {
          name: "The Hulk Logan",
          description: "Spirulina, celery, citrus, sea salt",
          price: 55,
        },
        {
          name: "Ginger Shot — Pure",
          description: "Pure ginger",
          price: 40,
        },
      ],
    },
  ],
  seo: {
    title:
      "Curiosa Juice Bar & Café - Hipódromo, Mexico City | La Condesa",
    description:
      "Curiosa Juice Bar & Café in Hipódromo, Mexico City. Cold-pressed juices, superfood smoothies, healing lattes, and all-day breakfast. Hours, menu, location and more.",
    ogTitle: "Curiosa Juice Bar & Café | La Condesa",
    ogDescription:
      "Cold-pressed juices, superfood smoothies, and all-day breakfast in Hipódromo Condesa, CDMX.",
  },
  schemaExtras: {
    restaurantDescription:
      "Superfood café and juice bar in Hipódromo Condesa, Mexico City. Cold-pressed juices, smoothies, healing lattes, and all-day breakfast.",
    servesCuisine: ["Juice Bar", "Healthy", "Breakfast", "Vegan"],
  },
  featured: true,
  listingAddedAt: "2025-06-01",
  claimed: false,
};
