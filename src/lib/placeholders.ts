import type { SanityTeamMember } from "@/sanity/fetch";
import type { SanityListicle, SanityListicleCard, SanityListicleEntry } from "@/sanity/fetch";

const block = (text: string) => ({
  _type: "block",
  _key: Math.random().toString(36).slice(2),
  children: [{ _type: "span", _key: "1", text }],
  markDefs: [],
  style: "normal",
});

const workItem = (
  _id: string,
  _type: "listicle" | "article",
  title: string,
  slug: string,
  category: string,
  publishedAt: string
) => ({ _id, _type, title, slug, category, publishedAt, heroImage: null, image: null });

export const placeholderTeamMembers: SanityTeamMember[] = [
  {
    _id: "placeholder-1",
    name: "Emma Walsh",
    role: "Editor in Chief",
    bio: "Emma has covered food and neighborhoods in Mexico City for a decade. She started La Condesa Weekly to give the barrio a voice worth reading.",
    photo: null,
    slug: "emma-walsh",
    tagline: "Editor in chief and neighborhood obsessive.",
    expertise: ["Restaurants", "Bars & Nightlife", "Local History"],
    fullBio: [
      block("Emma has covered food, culture, and neighborhoods in Mexico City for over a decade. Before founding La Condesa Weekly, she was a contributing editor at Time Out Mexico City and wrote for Condé Nast Traveler."),
      block("She moved to La Condesa in 2014 and never left. What started as a personal newsletter to friends became the go-to guide for locals who want to know what's actually new—not what's being promoted."),
      block("Emma believes the best recommendations come from people who live somewhere, pay rent, and walk the streets every day. No press trips, no paid placements. Just opinions you can trust."),
    ],
    credentials: [
      { credential: "Former food editor at Time Out Mexico City" },
      { credential: "12 years living in La Condesa" },
      { credential: "Contributor to Condé Nast Traveler and Eater" },
    ],
    authorStatement: "La Condesa deserves more than generic listicles. I started this because I was tired of reading about the same five restaurants in every guide. The barrio is full of real places run by real people—those are the stories worth telling.",
    yearsActive: 2017,
    twitterUrl: "https://twitter.com/emmawalsh",
    instagramUrl: "https://instagram.com/emmawalsh_cdmx",
    linkedinUrl: "https://linkedin.com/in/emmawalsh",
    personalWebsite: "https://emmawalsh.com",
    featuredWork: [
      { _id: "pl-1", _type: "listicle", title: "The 10 Best Bars in La Condesa", slug: "best-bars-la-condesa", category: "Bars", publishedAt: "2025-02-01T12:00:00Z", heroImage: null, image: null },
      { _id: "pl-3", _type: "listicle", title: "The Best Restaurants in La Condesa", slug: "best-restaurants-la-condesa", category: "Restaurants", publishedAt: "2025-01-20T12:00:00Z", heroImage: null, image: null },
    ],
  },
  {
    _id: "placeholder-2",
    name: "Marcus Chen",
    role: "Deputy Editor",
    bio: "Marcus edits the weekend picks and new openings. He lives in Hipódromo and is always first in line when a new café opens.",
    photo: null,
    slug: "marcus-chen",
    tagline: "Keeps up with every new opening.",
    expertise: ["Coffee", "Restaurants", "Urban Culture"],
    fullBio: [
      block("Marcus moved to Mexico City in 2016 and has been covering the local food and drink scene ever since. He started as a freelance writer for Time Out Mexico City before joining La Condesa Weekly in 2019."),
      block("His beat is new openings and weekend picks — he visits every new café, bar, and restaurant in the neighborhood within the first week it opens. If it's worth recommending, he'll tell you. If it's not, he won't waste your time."),
      block("When he's not writing, Marcus is usually at Parque México with a cortado or testing the latest natural wine list in Roma Norte."),
    ],
    credentials: [
      { credential: "Former weekend editor at Time Out Mexico City" },
      { credential: "9 years living in Hipódromo and La Condesa" },
      { credential: "Studied journalism at UNAM" },
    ],
    authorStatement: "I believe the best neighborhood guides are written by people who actually live there. No press trips, no paid placements — just honest recommendations from someone who eats and drinks in these places every week.",
    yearsActive: 2019,
    twitterUrl: "https://twitter.com/marcuschencdmx",
    instagramUrl: "https://instagram.com/marcuschen.mx",
    linkedinUrl: "https://linkedin.com/in/marcuschen",
    personalWebsite: null,
    featuredWork: [
      { _id: "pl-2", _type: "listicle", title: "The Best Coffee Shops in Condesa", slug: "best-coffee-shops-condesa", category: "Cafés", publishedAt: "2025-01-28T12:00:00Z", heroImage: null, image: null },
    ],
  },
  {
    _id: "placeholder-3",
    name: "Sofia Reyes",
    role: "Food & Drink",
    bio: "Sofia writes the restaurant and bar guides. Former cook, current critic — she only recommends places she’d go back to.",
    photo: null,
    slug: "sofia-reyes",
    tagline: "Former cook, current restaurant skeptic.",
    expertise: ["Restaurants", "Bars & Nightlife", "Food History"],
    fullBio: [
      block("Sofia spent six years in professional kitchens before switching to food writing. She's worked at Contramar, trained in Oaxaca, and now only recommends places she'd actually return to."),
      block("Her approach is simple: if she wouldn't send a friend there, she won't write about it. No press dinners, no favors. Just honest opinions from someone who cooks and eats in CDMX every day."),
      block("Sofia believes the best Mexican food in La Condesa isn't always in the flashy spots—it's in the fondas, the mercados, and the places that have been doing it right for decades."),
    ],
    credentials: [
      { credential: "Former line cook at Contramar" },
      { credential: "Culinary studies in Oaxaca" },
      { credential: "7 years covering CDMX food scene" },
    ],
    authorStatement: "I write about restaurants the way I'd talk about them to a friend at a bar. No flowery language, no hype. Just: is it good? Would you go back? That's the only review that matters.",
    yearsActive: 2020,
    twitterUrl: "https://twitter.com/sofiareyesfood",
    instagramUrl: "https://instagram.com/sofiareyes.cdmx",
    linkedinUrl: null,
    personalWebsite: null,
    featuredWork: [
      workItem("pl-3", "listicle", "The Best Restaurants in La Condesa", "best-restaurants-la-condesa", "Restaurants", "2025-01-20T12:00:00Z"),
    ],
  },
  {
    _id: "placeholder-4",
    name: "James Okonkwo",
    role: "Culture & Events",
    bio: "James covers galleries, pop-ups, and what’s on in the neighborhood. He’s the one who knows about the show before the opening.",
    photo: null,
    slug: "james-okonkwo",
    tagline: "Your guide to what’s on this week.",
    expertise: ["Art & Design", "Music", "Urban Culture"],
    fullBio: [
      block("James has been covering arts, culture, and events in Mexico City since 2018. He previously wrote for Artforum and ran a small gallery in Roma Norte before joining La Condesa Weekly."),
      block("His beat is galleries, pop-ups, concerts, and what's on — he's usually the first to know about an opening or a new show. If it's worth your evening, he'll tell you. If it's not, he won't waste your time."),
      block("James believes the best neighborhood coverage connects what's happening to where you live. A gallery opening in Juárez, a pop-up in Condesa, a concert in Parque México — it's all part of the same city."),
    ],
    credentials: [
      { credential: "Former contributor at Artforum" },
      { credential: "8 years in Roma Norte and La Condesa" },
      { credential: "Ran a gallery in Roma Norte 2019–2022" },
    ],
    authorStatement: "La Condesa isn't just restaurants and parks — it's a neighborhood full of people making things happen. My job is to surface the shows, pop-ups, and moments that are worth your attention.",
    yearsActive: 2020,
    twitterUrl: "https://twitter.com/jamesokonkwo",
    instagramUrl: "https://instagram.com/jamesokonkwo.mx",
    linkedinUrl: null,
    personalWebsite: "https://jamesokonkwo.com",
    featuredWork: [
      workItem("pl-5", "listicle", "The Best Parks in La Condesa", "best-parks-la-condesa", "Parks", "2025-01-10T12:00:00Z"),
    ],
  },
  {
    _id: "placeholder-5",
    name: "Lily Park",
    role: "Contributing Editor",
    bio: "Lily writes the hidden gems and neighborhood stories. She’s lived in La Condesa for eight years and still finds new corners.",
    photo: null,
    slug: "lily-park",
    tagline: "Finds the corners everyone else walks past.",
    expertise: ["Local History", "Parks & Outdoors", "Retail & Shops"],
    fullBio: [
      block("Lily has lived in La Condesa for eight years and has been writing about the neighborhood since 2021. She focuses on hidden gems, local history, and the kind of places that don't make it into tourist guides."),
      block("Before writing for La Condesa Weekly, Lily was a researcher at UNAM and wrote a thesis on urban change in Colonia Condesa. She knows the history behind the art deco buildings and the stories of the people who've shaped the barrio."),
      block("Her recommendations are the ones you won't find on Google. The barbershop with no sign. The park bench with the best view. The tienda that's been there for forty years. That's the La Condesa she wants to share."),
    ],
    credentials: [
      { credential: "Master's in urban studies from UNAM" },
      { credential: "8 years living in La Condesa" },
      { credential: "Researcher on Colonia Condesa history" },
    ],
    authorStatement: "The best things about a neighborhood are often the ones you have to discover yourself. I write for people who want to know the stories behind the streets they walk every day.",
    yearsActive: 2021,
    twitterUrl: null,
    instagramUrl: "https://instagram.com/lilypark.condesa",
    linkedinUrl: "https://linkedin.com/in/lilypark",
    personalWebsite: null,
    featuredWork: [
      workItem("pl-4", "listicle", "The Best Barber Shops in the Neighborhood", "best-barber-shops-neighborhood", "Barber Shops", "2025-01-15T12:00:00Z"),
      workItem("pl-5", "listicle", "The Best Parks in La Condesa", "best-parks-la-condesa", "Parks", "2025-01-10T12:00:00Z"),
    ],
  },
];

export function getPlaceholderAuthorContent(authorId: string): {
  listicles: { _id: string; _type: "listicle" | "article"; title: string; slug: string; category?: string | null; publishedAt?: string | null }[];
  articles: { _id: string; _type: "listicle" | "article"; title: string; slug: string; category?: string | null; publishedAt?: string | null }[];
} {
  const member = placeholderTeamMembers.find((m) => m._id === authorId);
  if (!member?.featuredWork?.length) return { listicles: [], articles: [] };
  const listicles = member.featuredWork.filter((w) => w._type === "listicle");
  const articles = member.featuredWork.filter((w) => w._type === "article");
  return { listicles, articles };
}

export const placeholderListicleSlugs = [
  "best-bars-la-condesa",
  "best-coffee-shops-condesa",
  "best-restaurants-la-condesa",
  "best-barber-shops-neighborhood",
  "best-parks-la-condesa",
];

type EntryExtras = {
  pullQuote?: string;
  address?: string;
  hours?: string;
  priceRange?: string;
  externalUrl?: string;
  externalLinkLabel?: string;
};

const listicleEntry = (
  name: string,
  tagline: string,
  description: string,
  extras: EntryExtras = {}
): SanityListicleEntry => ({
  _key: `entry-${name.toLowerCase().replace(/\s/g, "-")}`,
  name,
  tagline,
  photo: null,
  description: [block(description)],
  pullQuote: extras.pullQuote ?? null,
  address: extras.address ?? null,
  hours: extras.hours ?? null,
  priceRange: extras.priceRange ?? null,
  externalUrl: extras.externalUrl ?? null,
  externalLinkLabel: extras.externalLinkLabel ?? null,
});

const placeholderListicleEntries = (
  names: string[],
  taglines: string[],
  descriptions: string[],
  extrasList?: EntryExtras[]
): SanityListicleEntry[] =>
  names.map((name, i) =>
    listicleEntry(names[i] ?? name, taglines[i] ?? "", descriptions[i] ?? "", extrasList?.[i])
  );

export const placeholderListicles: SanityListicleCard[] = [
  {
    _id: "pl-1",
    title: "The 10 Best Bars in La Condesa",
    slug: "best-bars-la-condesa",
    category: "Bars",
    publishedAt: "2025-02-01T12:00:00Z",
    seoDescription: "A curated guide to the best bars in La Condesa, from mezcalerías to cocktail spots.",
    heroImage: null,
  },
  {
    _id: "pl-2",
    title: "The Best Coffee Shops in Condesa",
    slug: "best-coffee-shops-condesa",
    category: "Cafés",
    publishedAt: "2025-01-28T12:00:00Z",
    seoDescription: "Where to get the best coffee in La Condesa — single-origin, pour-over, and neighborhood favorites.",
    heroImage: null,
  },
  {
    _id: "pl-3",
    title: "The Best Restaurants in La Condesa",
    slug: "best-restaurants-la-condesa",
    category: "Restaurants",
    publishedAt: "2025-01-20T12:00:00Z",
    seoDescription: "Editor-picked restaurants in La Condesa: from breakfast to dinner, these are the spots we actually go.",
    heroImage: null,
  },
  {
    _id: "pl-4",
    title: "The Best Barber Shops in the Neighborhood",
    slug: "best-barber-shops-neighborhood",
    category: "Barber Shops",
    publishedAt: "2025-01-15T12:00:00Z",
    seoDescription: "Where to get a great cut in La Condesa and Roma — classic barbers and modern spots.",
    heroImage: null,
  },
  {
    _id: "pl-5",
    title: "The Best Parks in La Condesa",
    slug: "best-parks-la-condesa",
    category: "Parks",
    publishedAt: "2025-01-10T12:00:00Z",
    seoDescription: "A guide to the best parks and green spaces in La Condesa — where to run, picnic, or just sit.",
    heroImage: null,
  },
];

export function getPlaceholderListicleBySlug(slug: string): SanityListicle | null {
  const list: Record<
    string,
    { title: string; category: string; summary: unknown[]; seoDescription: string; entries: SanityListicleEntry[] }
  > = {
    "best-bars-la-condesa": {
      title: "The 10 Best Bars in La Condesa",
      category: "Bars",
      seoDescription: "A curated guide to the best bars in La Condesa, from mezcalerías to cocktail spots.",
      summary: [
        block("La Condesa has no shortage of places to drink. This list is the one we give friends who ask where to go — no filler, no paid spots. Every bar here is somewhere we’d go back."),
      ],
      entries: placeholderListicleEntries(
        ["Botánico", "Licorería Limantour", "Xaman Bar", "Felina", "Páramo"],
        ["Cocktail bar · Jules Verne", "Cocktail bar · Colonia Juárez", "Mezcalería · Roma Norte", "Wine bar · La Condesa", "Bar · La Condesa"],
        [
          "A neighborhood staple for cocktails and a relaxed crowd. The terrace is the move on weekend evenings.",
          "One of the city’s best cocktail programs. Book ahead or show up early.",
          "Mezcal-focused with a short food menu. Perfect for a late-night stop.",
          "Natural wine and small plates. Intimate and unpretentious.",
          "A proper neighborhood bar with good drinks and better conversation.",
        ],
        [
          { address: "Av. Michoacán 25, Condesa", hours: "Mon–Sat 6pm–2am", priceRange: "$$", pullQuote: "The terrace is the move on weekend evenings." },
          { address: "Av. Álvaro Obregón 106, Juárez", hours: "Tue–Sat 6pm–1am", priceRange: "$$$", pullQuote: "One of the city's best cocktail programs." },
          { address: "Calle Zacatecas 126, Roma Norte", hours: "Daily 5pm–midnight", priceRange: "$$", pullQuote: "Perfect for a late-night stop." },
          { address: "Av. Tamaulipas 60, Condesa", hours: "Wed–Sun 6pm–12am", priceRange: "$$", pullQuote: "Intimate and unpretentious." },
          { address: "Plaza Popocatépetl 54, Condesa", hours: "Daily 4pm–2am", priceRange: "$", pullQuote: "Good drinks and better conversation." },
        ]
      ),
    },
    "best-coffee-shops-condesa": {
      title: "The Best Coffee Shops in Condesa",
      category: "Cafés",
      seoDescription: "Where to get the best coffee in La Condesa — single-origin, pour-over, and neighborhood favorites.",
      summary: [
        block("We take our coffee seriously. These are the spots where we actually buy beans and sit down with a cup. All in the neighborhood, no chains."),
      ],
      entries: placeholderListicleEntries(
        ["Buna", "Café Nin", "Quentin Café", "Almanac", "Café Avellaneda"],
        ["Roastery · Multiple", "Pour-over · Roma Norte", "All-day · La Condesa", "Minimal · Hipódromo", "Single-origin · La Condesa"],
        [
          "Local roaster with a few locations. Consistent and good for working.",
          "Quiet spot with excellent pour-over. Get a seat by the window.",
          "Breakfast and coffee all day. The kind of place you can camp for hours.",
          "Minimal space, serious coffee. No wifi — come to drink and go.",
          "Single-origin focus and a small but solid food menu. Great for a slow morning.",
        ],
        [
          { address: "Multiple locations", hours: "Mon–Fri 7am–7pm", pullQuote: "Consistent and good for working." },
          { address: "Av. Álvaro Obregón 88, Roma Norte", hours: "Daily 8am–6pm", pullQuote: "Get a seat by the window." },
          { address: "Av. Amsterdam 73, Condesa", hours: "Mon–Sun 8am–9pm", pullQuote: "Camp for hours." },
          { address: "Calle Campeche 378, Hipódromo", hours: "Tue–Sun 8am–4pm", pullQuote: "Come to drink and go." },
          { address: "Av. Tamaulipas 126, Condesa", hours: "Mon–Sat 8am–6pm", pullQuote: "Great for a slow morning." },
        ]
      ),
    },
    "best-restaurants-la-condesa": {
      title: "The Best Restaurants in La Condesa",
      category: "Restaurants",
      seoDescription: "Editor-picked restaurants in La Condesa: from breakfast to dinner, these are the spots we actually go.",
      summary: [
        block("Restaurant lists in CDMX can feel endless. This one is short and opinionated: places we’ve eaten at more than once and would send a friend to without hesitation."),
      ],
      entries: placeholderListicleEntries(
        ["Rosetta", "Contramar", "Lardo", "Máximo Bistrot", "Fonda Fina"],
        ["Italian · Roma Norte", "Seafood · Condesa", "Mediterranean · La Condesa", "French-Mexican · Roma Norte", "Mexican · Roma Norte"],
        [
          "Elena Reygadas’ flagship. Pasta and pastries that live up to the hype. Reserve.",
          "The tuna tostadas are famous for a reason. Go for lunch and sit outside.",
          "Open kitchen, great bread, and a menu that works for any meal.",
          "Refined but not stuffy. One of the city’s best kitchens.",
          "Traditional Mexican with a modern touch. Consistently good.",
        ],
        [
          { address: "Calle Colima 166, Roma Norte", hours: "Mon–Sat 8am–10pm", priceRange: "$$$", pullQuote: "Pasta and pastries that live up to the hype." },
          { address: "Calle Durango 200, Condesa", hours: "Daily 12pm–6pm", priceRange: "$$$", pullQuote: "The tuna tostadas are famous for a reason." },
          { address: "Av. Orizaba 106, Roma Norte", hours: "Daily 8am–11pm", priceRange: "$$", pullQuote: "A menu that works for any meal." },
          { address: "Calle Tonalá 133, Roma Norte", hours: "Tue–Sat 1pm–11pm", priceRange: "$$$$", pullQuote: "One of the city's best kitchens." },
          { address: "Av. Yucatán 84, Roma Norte", hours: "Mon–Sat 1pm–11pm", priceRange: "$$", pullQuote: "Consistently good." },
        ]
      ),
    },
    "best-barber-shops-neighborhood": {
      title: "The Best Barber Shops in the Neighborhood",
      category: "Barber Shops",
      seoDescription: "Where to get a great cut in La Condesa and Roma — classic barbers and modern spots.",
      summary: [
        block("A good barber is worth keeping. These are the spots we recommend when someone asks where to get a cut in the neighborhood."),
      ],
      entries: placeholderListicleEntries(
        ["Barbería Condesa", "Roma Barbershop", "Hipódromo Barbers", "Classic Cut", "Neighborhood Barbers"],
        ["Classic · La Condesa", "Modern · Roma Norte", "Traditional · Hipódromo", "No-frills · La Condesa", "Walk-in · Roma Sur"],
        [
          "Old-school vibe and solid cuts. Cash preferred.",
          "Book online, get a sharp cut. Good for a tidy-up before a night out.",
          "No Instagram, just good barbering. A neighborhood secret.",
          "Simple and reliable. In and out in under an hour.",
          "Walk-ins welcome. No appointment needed — just show up.",
        ],
        [
          { address: "Av. Juan Escutia 108, Condesa", hours: "Tue–Sat 9am–7pm", pullQuote: "Cash preferred." },
          { address: "Calle Colima 268, Roma Norte", hours: "Mon–Sat 10am–8pm", pullQuote: "Good for a tidy-up before a night out." },
          { address: "Av. Amsterdam 78, Hipódromo", hours: "Tue–Fri 9am–6pm", pullQuote: "A neighborhood secret." },
          { address: "Av. Michoacán 42, Condesa", hours: "Mon–Sat 8am–6pm", pullQuote: "In and out in under an hour." },
          { address: "Calle Tabasco 118, Roma Sur", hours: "Daily 9am–7pm", pullQuote: "Just show up." },
        ]
      ),
    },
    "best-parks-la-condesa": {
      title: "The Best Parks in La Condesa",
      category: "Parks",
      seoDescription: "A guide to the best parks and green spaces in La Condesa — where to run, picnic, or just sit.",
      summary: [
        block("La Condesa is one of the greenest parts of the city. Here’s where we run, read, and meet friends when the weather’s good."),
      ],
      entries: placeholderListicleEntries(
        ["Parque México", "Parque España", "Parque San Miguel Chapultepec", "Jardín Pushkin", "Plaza Popocatépetl"],
        ["Landmark · La Condesa", "Central · La Condesa", "Running · San Miguel", "Quiet · Roma Norte", "Square · Condesa"],
        [
          "The big one. A lap around the pond, people-watching, or a coffee at the edge. The heart of the neighborhood.",
          "Smaller than México but just as loved. Good for a short walk or a bench with a book.",
          "Best for runners. Long paths and shade. Go early on weekends.",
          "A small, quiet garden. Fewer crowds, good for reading.",
          "A classic Condesa square. Sit on the steps and watch the neighborhood pass by.",
        ],
        [
          { address: "Av. México s/n, between Michoacán and Sonora", hours: "Open 24/7", pullQuote: "The heart of the neighborhood." },
          { address: "Av. Sonora, between Nuevo León and Tamaulipas", hours: "Open 24/7", pullQuote: "Good for a bench with a book." },
          { address: "Av. Constituyentes, San Miguel Chapultepec", hours: "6am–6pm", pullQuote: "Go early on weekends." },
          { address: "Calle Orizaba 91, Roma Norte", hours: "Open 24/7", pullQuote: "Fewer crowds, good for reading." },
          { address: "Plaza Popocatépetl, Condesa", hours: "Open 24/7", pullQuote: "Watch the neighborhood pass by." },
        ]
      ),
    },
  };

  const data = list[slug];
  if (!data) return null;

  const card = placeholderListicles.find((l) => l.slug === slug);
  const authorMap: Record<string, { _id: string; name: string; role: string; slug: string }> = {
    "best-bars-la-condesa": { _id: "placeholder-1", name: "Emma Walsh", role: "Editor in Chief", slug: "emma-walsh" },
    "best-coffee-shops-condesa": { _id: "placeholder-2", name: "Marcus Chen", role: "Deputy Editor", slug: "marcus-chen" },
    "best-restaurants-la-condesa": { _id: "placeholder-3", name: "Sofia Reyes", role: "Food & Drink", slug: "sofia-reyes" },
    "best-barber-shops-neighborhood": { _id: "placeholder-5", name: "Lily Park", role: "Contributing Editor", slug: "lily-park" },
    "best-parks-la-condesa": { _id: "placeholder-4", name: "James Okonkwo", role: "Culture & Events", slug: "james-okonkwo" },
  };
  return {
    _id: card?._id ?? `pl-${slug}`,
    title: data.title,
    slug,
    category: data.category,
    publishedAt: card?.publishedAt ?? "2025-01-01T12:00:00Z",
    author: authorMap[slug] ?? null,
    heroImage: null,
    summary: data.summary,
    seoDescription: data.seoDescription,
    entries: data.entries,
  };
}
