export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  body?: string[];
}

export interface Testimonial {
  name: string;
  initials: string;
  quote: string;
  detail: string;
}

export interface ArchiveIssue {
  number: number;
  title: string;
  date: string;
  slug: string;
}

export const categories = [
  "All",
  "New Openings",
  "Weekend Picks",
  "Hidden Gems",
  "Events",
  "Food & Drink",
  "Culture & Art",
] as const;

export const articles: Article[] = [
  {
    slug: "new-natural-wine-bar-tamaulipas",
    title: "A New Natural Wine Bar on Tamaulipas Everyone's Talking About",
    excerpt:
      "The latest addition to La Condesa's wine scene brings Orange wines, local producers, and a cozy atmosphere to one of our favorite streets.",
    category: "New Openings",
    date: "March 14, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
    body: [
      "There's a new spot on Tamaulipas that's been generating buzz for the past few weeks, and we finally made it in to see what all the fuss is about.",
      "Located in a beautifully restored building with exposed brick and original tile floors, this intimate wine bar focuses exclusively on natural and organic wines from small producers across Mexico and Spain.",
      "## The Space",
      "The interior strikes that perfect balance between casual and curated. There's seating for maybe 30 people max, with a beautiful wooden bar as the centerpiece. The lighting is warm without being dark, and the playlist leans towards jazz and Brazilian bossa nova.",
      "\"We wanted to create a space where people could learn about natural wine without feeling intimidated,\" says the owner, who previously worked at some of the city's best restaurants.",
      "## The Wines",
      "The list changes frequently, but expect to find orange wines from Baja, pet-nats from small Mexican producers, and a rotating selection of Spanish wines that you won't find anywhere else in the city.",
      "Prices are reasonable for the quality - glasses start around 150 pesos, and bottles range from 400 to 1,200 pesos.",
      "## The Food",
      "The menu is small but thoughtful. Think tinned fish from Spain, local cheeses, and a few small plates designed to pair with wine. The burrata with heirloom tomatoes was a standout.",
      "## The Details",
      "Address: Tamaulipas 142, La Condesa\n\nHours: Tuesday-Sunday, 5pm-12am\n\nReservations: Walk-ins only, but they open a waitlist via WhatsApp",
    ],
  },
  {
    slug: "weekend-market-parque-mexico",
    title: "The Weekend Market at Parque Mexico You've Been Missing",
    excerpt:
      "Every Saturday morning, a small but mighty market sets up near the park's south entrance. Here's what to look for.",
    category: "Weekend Picks",
    date: "March 12, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80",
    body: [
      "Saturday mornings in La Condesa belong to the markets. Whether you're after fresh produce, handmade ceramics, or just a really good cup of coffee to sip while you wander, this weekend has plenty to offer.",
      "The Mercado del Parque returns to its usual spot on the south side of Parque Mexico with over 40 vendors. Highlights include Ceramica Luna's new collection of hand-painted planters, single-origin beans from Cafe Avellaneda's Chiapas lot, and the always-popular tlayudas from Dona Carmen.",
      "For something different, head two blocks east to the Bazaar Condesa on Calle Atlixco, where a curated mix of independent fashion designers, jewelry makers, and illustrators set up shop every other Saturday.",
      "And if you're up early, the organic farmers' market on Calle Pachuca opens at 7am with the best selection of seasonal produce in the neighborhood.",
    ],
  },
  {
    slug: "hidden-japanese-cafe-roma-norte",
    title: "A Hidden Japanese Cafe in Roma Norte Worth the Detour",
    excerpt:
      "Down a narrow passageway, through a courtyard, and up a flight of stairs - this tiny cafe is serving some of the best matcha in the city.",
    category: "Hidden Gems",
    date: "March 10, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    body: [
      "Down a narrow passageway, through a courtyard, and up a flight of stairs - this tiny cafe is serving some of the best matcha in the city.",
      "There's no sign outside. No Instagram account. Just word of mouth and the faint smell of freshly whisked matcha that tells you you're in the right place.",
      "The owner, a former barista from Kyoto, decided to bring the precision and ritual of Japanese tea culture to Mexico City. The result is a six-seat counter where every cup is made to order with ceremonial-grade matcha from Uji.",
      "Don't skip the hojicha latte or the seasonal wagashi - traditional Japanese sweets that change with the calendar.",
    ],
  },
  {
    slug: "art-opening-galeria-condesa",
    title: "This Weekend: Art Opening at Galeria Condesa",
    excerpt:
      "A new exhibition featuring emerging Mexican photographers opens Friday night with free mezcal and live music.",
    category: "Events",
    date: "March 8, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80",
  },
  {
    slug: "best-tacos-al-pastor-condesa",
    title: "We Found the Best Tacos Al Pastor in Condesa (Finally)",
    excerpt:
      "After months of research, we've crowned a winner. Here's where to find the perfect pastor in the neighborhood.",
    category: "Food & Drink",
    date: "March 6, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
  },
  {
    slug: "live-jazz-condesa-guide",
    title: "Where to Find Live Jazz in Condesa This Month",
    excerpt:
      "A roundup of the best spots for live jazz in the neighborhood, from intimate clubs to unexpected venues.",
    category: "Culture & Art",
    date: "March 4, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Maria G.",
    initials: "MG",
    quote:
      "I've discovered more great spots in Condesa through this newsletter than in my first two years living here. It's become my Thursday morning ritual.",
    detail: "Condesa resident, 3 years",
  },
  {
    name: "Carlos R.",
    initials: "CR",
    quote:
      "As a restaurant owner on Tamaulipas, I love seeing what else is opening in the neighborhood. It's the pulse of La Condesa in your inbox.",
    detail: "Local business owner",
  },
  {
    name: "Sofia L.",
    initials: "SL",
    quote:
      "Finally, a newsletter that feels like getting recommendations from a friend who actually lives here. No tourist traps, just real finds.",
    detail: "Roma Norte local",
  },
];

export const archiveIssues: ArchiveIssue[] = [
  { number: 47, title: "The New Natural Wine Bar on Tamaulipas Everyone's Talking About", date: "March 14, 2026", slug: "issue-47" },
  { number: 46, title: "Weekend Markets, Jazz Nights, and the Best New Taqueria", date: "March 7, 2026", slug: "issue-46" },
  { number: 45, title: "A Hidden Japanese Cafe, Art Openings, and Spring in the Parks", date: "February 28, 2026", slug: "issue-45" },
  { number: 44, title: "Valentine's Week: Where to Take Your Date in Condesa", date: "February 21, 2026", slug: "issue-44" },
  { number: 43, title: "New Mezcal Bar Alert, Plus the Best Brunch Spots", date: "February 14, 2026", slug: "issue-43" },
  { number: 42, title: "Rooftop Season is Here: Our Top Picks", date: "February 7, 2026", slug: "issue-42" },
  { number: 41, title: "The Michelin Guide Just Hit CDMX. Here's What It Means for Condesa.", date: "January 31, 2026", slug: "issue-41" },
  { number: 40, title: "January Reset: Dry Month Spots and Healthy Eats", date: "January 24, 2026", slug: "issue-40" },
  { number: 39, title: "New Year, New Openings: What's Coming to the Neighborhood", date: "January 17, 2026", slug: "issue-39" },
  { number: 38, title: "The Best of 2025: Our Favorite Openings of the Year", date: "January 10, 2026", slug: "issue-38" },
  { number: 37, title: "Holiday Dining Guide: Where to Celebrate in Condesa", date: "December 20, 2025", slug: "issue-37" },
  { number: 36, title: "Gift Guide: Shop Local This Season", date: "December 13, 2025", slug: "issue-36" },
];

export const contentPillars = [
  {
    title: "New Openings",
    description: "Be the first to know about restaurants, cafes, and bars opening in the neighborhood. We scout them so you don't have to.",
    icon: "utensils",
  },
  {
    title: "Weekend Picks",
    description: "Curated things to do every weekend. From markets to pop-ups to cultural events, we've got your social calendar covered.",
    icon: "calendar",
  },
  {
    title: "Hidden Gems",
    description: "Under-the-radar spots that locals love. The places you won't find on tourist lists but shouldn't miss.",
    icon: "gem",
  },
  {
    title: "Events & Markets",
    description: "Weekend markets, art openings, live music, and community events happening around La Condesa and Roma.",
    icon: "map-pin",
  },
];
