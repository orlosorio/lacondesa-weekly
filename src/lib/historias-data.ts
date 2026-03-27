export type HistoriaCategory = "residentes" | "negocios" | "artistas" | "proyectos";

export interface HistoriaProfile {
  slug: string;
  name: string;
  tagline: string;
  category: HistoriaCategory;
  /** Spanish label for UI */
  categoryLabel: string;
  /** Unsplash image id segment, e.g. photo-1573496359142-b8d87734a5a2 */
  portraitPhotoId: string;
  summary: string;
  neighborhood: string;
  profession: string;
  yearsInCondesa: string;
  pullQuote: string;
  qa: { q: string; a: string }[];
  secondaryPhotoIds?: string[];
}

/** Portrait from Unsplash (placeholder stock — swap for your own photography). */
export function historiaPortraitUrl(photoId: string, w = 900, h = 1350) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;
}

export const HISTORIAS: HistoriaProfile[] = [
  {
    slug: "mariana-vega",
    name: "Mariana Vega",
    tagline: "She maps the neighborhood in notebooks before the city does.",
    category: "residentes",
    categoryLabel: "Residentes",
    portraitPhotoId: "photo-1573496359142-b8d87734a5a2",
    summary:
      "Mariana moved to La Condesa fifteen years ago and never stopped walking. A freelance editor and self-taught cartographer, she documents forgotten façades, new murals, and the sound of rain on Parque México — the small truths that never make the news but define how it feels to live here.",
    neighborhood: "Colonia Condesa",
    profession: "Editor & neighborhood chronicler",
    yearsInCondesa: "15 years",
    pullQuote:
      "This barrio taught me that a city is not plans and permits — it is the people who insist on staying kind in tight spaces.",
    qa: [
      {
        q: "What drew you to La Condesa first?",
        a: "The light between the trees on Avenida México. I arrived from Guadalajara with two suitcases and found a bench that felt like a living room. I stayed for the conversations strangers start when you sit long enough.",
      },
      {
        q: "How do you describe the neighborhood to someone who has never visited?",
        a: "Layered. You hear French in one café and corridos in the next. There is glamour and grit in the same block, and somehow it does not feel like contradiction — it feels honest.",
      },
      {
        q: "What worries you about its future?",
        a: "That we forget the small shops that give the streets their rhythm. A city can shine and still become hollow. I try to spend where roots run deep.",
      },
      {
        q: "Where do you go when you need quiet?",
        a: "The interior paths of Parque México at seven in the morning, before the runners arrive. The air still smells like wet leaves.",
      },
    ],
    secondaryPhotoIds: [
      "photo-1529156069898-49953e39b3ac",
      "photo-1517841905240-472988babdf9",
      "photo-1463453091185-61582044d556",
    ],
  },
  {
    slug: "roberto-saenz",
    name: "Roberto Sáenz",
    tagline: "Third-generation pan dulce, first-generation storyteller.",
    category: "negocios",
    categoryLabel: "Negocios",
    portraitPhotoId: "photo-1560250097-0b93528c311a",
    summary:
      "Roberto’s family opened their bakery on a quiet corner before “artisanal” was a marketing word. Today he runs the ovens before dawn, serves abuelas and architects alike, and believes a concha still has the power to slow a city down for five minutes.",
    neighborhood: "Hipódromo",
    profession: "Baker & shop owner",
    yearsInCondesa: "Born here",
    pullQuote:
      "Flour is patient. People are not — but when they taste something honest, they pause.",
    qa: [
      {
        q: "What is the first smell you remember from the bakery?",
        a: "Cinnamon and yeast rising together. My abuela would open the windows so the street could smell us coming.",
      },
      {
        q: "Has the clientele changed?",
        a: "Yes — languages, styles, phones in every hand. But hunger for something warm is the same. That is the test.",
      },
      {
        q: "What do you wish visitors understood?",
        a: "That “traditional” is not a museum piece. It is a promise we renew every morning at four.",
      },
    ],
    secondaryPhotoIds: ["photo-1521119989653-a83eee488004", "photo-1507003211169-0a1dd7228f2d"],
  },
  {
    slug: "lina-okonkwo",
    name: "Lina Okonkwo",
    tagline: "Ceramics fired in a garage studio the color of rain.",
    category: "artistas",
    categoryLabel: "Artistas",
    portraitPhotoId: "photo-1580489944761-15a19d654956",
    summary:
      "Lina is a sculptor and teacher whose work explores migration, memory, and the weight of hands. Her studio opens for small gatherings where art is discussed over tea — slowly, the way she believes neighborhoods themselves are formed.",
    neighborhood: "Condesa",
    profession: "Sculptor & educator",
    yearsInCondesa: "9 years",
    pullQuote:
      "Clay remembers every touch. A neighborhood does too — even the ones we think no one saw.",
    qa: [
      {
        q: "Why La Condesa for your practice?",
        a: "The textures. Stone, tile, graffiti, moss — the city offers a vocabulary I did not find elsewhere. And the community of makers here is quietly fierce.",
      },
      {
        q: "What role should art play on the street?",
        a: "Not decoration — invitation. Something that makes someone stop and remember they have a body in a place.",
      },
      {
        q: "What are you making right now?",
        a: "A series of bowls inscribed with routes people took to arrive here. Maps you can hold.",
      },
      {
        q: "A favorite moment in the neighborhood?",
        a: "Rain on tin roofs during a workshop. Everyone speaking softly so the thunder could join.",
      },
    ],
    secondaryPhotoIds: [
      "photo-1524504388940-b1c1722653e1",
      "photo-1508214751196-bcfd4ca60f91",
      "photo-1529626455594-4ff0802cfb7e",
    ],
  },
  {
    slug: "diego-miranda",
    name: "Diego Miranda",
    tagline: "Architect of community gardens in unlikely courtyards.",
    category: "proyectos",
    categoryLabel: "Proyectos",
    portraitPhotoId: "photo-1506794778202-cad84cf45f1d",
    summary:
      "Diego coordinates volunteer builds where soil was once only concrete. His projects are modest by skyline standards — trellises, compost, a bench — but he measures success in neighbors who learn each other’s names.",
    neighborhood: "Condesa & Roma Norte",
    profession: "Urban gardener & organizer",
    yearsInCondesa: "11 years",
    pullQuote:
      "If you want peace in a city, plant something where strangers must share water.",
    qa: [
      {
        q: "How does a garden start here?",
        a: "With permission, patience, and someone willing to carry soil up stairs. Always stairs.",
      },
      {
        q: "What breaks your heart?",
        a: "When we confuse “development” with erasure. Green can be luxury — but it should not be only luxury.",
      },
      {
        q: "What gives you hope?",
        a: "Kids who think cherry tomatoes are candy because they picked them ten meters from their door.",
      },
    ],
    secondaryPhotoIds: ["photo-1544723795-3fb6469f5b39", "photo-1519345182560-3f2917c472ef"],
  },
  {
    slug: "sofia-alarcon",
    name: "Sofía Alarcón",
    tagline: "Night-shift nurse, daylight flâneuse with a film camera.",
    category: "residentes",
    categoryLabel: "Residentes",
    portraitPhotoId: "photo-1551836022-d5d88e9218df",
    summary:
      "Sofía works twelve-hour shifts and still finds time to photograph doorways and dogs. Her prints — small, grainy, honest — line the walls of a friend's wine bar, a quiet exhibit of tenderness toward ordinary corners.",
    neighborhood: "Condesa",
    profession: "Nurse & photographer",
    yearsInCondesa: "6 years",
    pullQuote:
      "Healing is not only in hospitals. Sometimes it is a well-lit sidewalk and a familiar face.",
    qa: [
      {
        q: "Why film?",
        a: "It slows me down. Digital makes everything instant; film makes me choose what deserves a frame.",
      },
      {
        q: "Does the neighborhood look different after a night shift?",
        a: "Softer. Quieter. I see the same streets as everyone — but the shadows are longer, and the bakeries are opening as I go home.",
      },
    ],
    secondaryPhotoIds: [
      "photo-1509967419530-da38b4704bc6",
      "photo-1438761681033-6461ffad8d80",
      "photo-1494790108377-be9c29b29330",
    ],
  },
  {
    slug: "esteban-ruiz",
    name: "Esteban Ruiz",
    tagline: "His mezcalería is a listening room with no stage.",
    category: "negocios",
    categoryLabel: "Negocios",
    portraitPhotoId: "photo-1612349317150-e413f6a5b16d",
    summary:
      "Esteban left corporate hospitality to open a narrow room where bottles are labeled by village and stories are traded without a cover charge. He says mezcal is only an excuse — the real product is time shared.",
    neighborhood: "Condesa",
    profession: "Restaurateur",
    yearsInCondesa: "8 years",
    pullQuote:
      "A good room is not loud. It is porous — sound moves out, trust moves in.",
    qa: [
      {
        q: "What makes a bar feel like part of the neighborhood?",
        a: "When regulars defend the playlist like it is a public good. When someone slides olives to a stranger because the night asks for it.",
      },
      {
        q: "What do you refuse to compromise?",
        a: "Honest pours and honest prices. Glamour without warmth is just theater.",
      },
      {
        q: "Favorite sound in the room?",
        a: "Ice settling in a glass during a pause in conversation. It means people are actually listening.",
      },
      {
        q: "What is next?",
        a: "Afternoon tastings for neighbors who work nights. The city does not only live on a nine-to-five clock.",
      },
    ],
    secondaryPhotoIds: ["photo-1534528741775-53994a69daeb", "photo-1500648767791-00dcc994a43e"],
  },
  {
    slug: "valentina-cho",
    name: "Valentina Cho",
    tagline: "Choreographer who rehearses in plazas when studios are full.",
    category: "artistas",
    categoryLabel: "Artistas",
    portraitPhotoId: "photo-1531746020798-e6953c6e8e04",
    summary:
      "Valentina blends contemporary dance with everyday gestures — the way someone waits for a light, the way friends hug twice. Her performances appear without warning: a flash of movement, then the street returns to traffic.",
    neighborhood: "Hipódromo",
    profession: "Choreographer & performer",
    yearsInCondesa: "7 years",
    pullQuote:
      "The stage is a fiction. The sidewalk is a contract — we agree to share space, so I dance with that.",
    qa: [
      {
        q: "How do you work with the public space?",
        a: "I follow rules until art asks me to bend them — gently. I want surprise, not harm.",
      },
      {
        q: "What do you look for in a dancer?",
        a: "Curiosity about weight. Not only ballet weight — emotional weight. How a foot lands when someone is tired.",
      },
    ],
    secondaryPhotoIds: ["photo-1487412720507-e7ab37603c6f", "photo-1522071820081-009f0129c71c"],
  },
  {
    slug: "ignacio-fuentes",
    name: "Ignacio Fuentes",
    tagline: "He restores colonial tile while listening to podcasts about futures.",
    category: "proyectos",
    categoryLabel: "Proyectos",
    portraitPhotoId: "photo-1472099645785-5658abf4ff4e",
    summary:
      "Ignacio leads a small crew that repairs historic floors and facades for owners who care about craft. He documents patterns in a digital archive so patterns lost in one building might guide another — a quiet bridge between centuries.",
    neighborhood: "Condesa",
    profession: "Heritage restoration lead",
    yearsInCondesa: "13 years",
    pullQuote:
      "We are not preserving nostalgia. We are preserving skill — and skill is a form of love.",
    qa: [
      {
        q: "What is misunderstood about restoration?",
        a: "That it is slow because we are picky. It is slow because stone teaches you humility.",
      },
      {
        q: "How has La Condesa changed under your hands?",
        a: "I have seen beautiful buildings wake up. I have also seen shortcuts that age badly. I try to leave work that the rain will respect.",
      },
      {
        q: "A detail you love?",
        a: "The small blue tiles someone chose in 1923 because they missed the sea. I think about that when I match color.",
      },
    ],
    secondaryPhotoIds: [
      "photo-1607746886822-c5997e42cb4d",
      "photo-1599566150163-64194daf5d50",
      "photo-1519085360753-af011db8c8a7",
    ],
  },
];

export function getHistoriaBySlug(slug: string): HistoriaProfile | undefined {
  return HISTORIAS.find((h) => h.slug === slug);
}

export function getNextHistoriaSlug(currentSlug: string): string | undefined {
  const i = HISTORIAS.findIndex((h) => h.slug === currentSlug);
  if (i === -1) return undefined;
  return HISTORIAS[(i + 1) % HISTORIAS.length]?.slug;
}
