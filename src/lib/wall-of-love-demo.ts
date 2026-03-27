/**
 * Sample Wall of Love rows for local development. IDs use prefix `wol-demo-`
 * so the client can handle votes locally without calling the Sanity-backed API.
 */

export const WOL_DEMO_PREFIX = "wol-demo-" as const;

export type WallOfLoveDemoRow = {
  _id: string;
  name: string;
  slug?: string | null;
  submittedBy?: string | null;
  description: string;
  cuisine?: string | null;
  photo?: unknown;
  upvotes: number;
  downvotes: number;
  submittedAt?: string;
  month?: string | null;
};

export function isWallOfLoveDemoId(id: string): boolean {
  return id.startsWith(WOL_DEMO_PREFIX);
}

/** Example spots (CDMX / Condesa–Roma flavor) for the current YYYY-MM bucket. */
export function getWallOfLoveDemoRestaurants(month: string): WallOfLoveDemoRow[] {
  const base = (day: number, h: number, m = 0) =>
    new Date(`${month}-${String(day).padStart(2, "0")}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00.000Z`).toISOString();

  return [
    {
      _id: `${WOL_DEMO_PREFIX}contramar`,
      month,
      name: "Contramar",
      slug: "contramar",
      submittedBy: "Mariana",
      description:
        "Iconic seafood on Roma Norte’s edge — the tuna tostadas and pescado a la talla are worth every minute of the wait.",
      cuisine: "seafood",
      upvotes: 24,
      downvotes: 2,
      submittedAt: base(3, 14, 30),
    },
    {
      _id: `${WOL_DEMO_PREFIX}rosetta`,
      month,
      name: "Rosetta",
      slug: "rosetta",
      submittedBy: "Diego",
      description:
        "Elena Reygadas magic in a townhouse — pastas and breads that feel like a quiet celebration.",
      cuisine: "italian",
      upvotes: 19,
      downvotes: 1,
      submittedAt: base(5, 11, 0),
    },
    {
      _id: `${WOL_DEMO_PREFIX}lardo`,
      month,
      name: "Lardo",
      slug: "lardo",
      submittedBy: "Ana",
      description:
        "Morning pastries, mortadella sandwiches, and the best kind of chaos before noon on Michoacán.",
      cuisine: "cafe",
      upvotes: 16,
      downvotes: 3,
      submittedAt: base(7, 9, 45),
    },
    {
      _id: `${WOL_DEMO_PREFIX}maximo`,
      month,
      name: "Máximo Bistrot",
      slug: "maximo-bistrot",
      submittedBy: "Orlando",
      description:
        "Bistro energy with Mexican ingredients — special occasion dinner that still feels neighborhood.",
      cuisine: "other",
      upvotes: 14,
      downvotes: 2,
      submittedAt: base(10, 20, 15),
    },
    {
      _id: `${WOL_DEMO_PREFIX}mog`,
      month,
      name: "Mog Bistro",
      slug: "mog-bistro",
      submittedBy: "Yuki",
      description:
        "Cozy Japanese comfort on Álvaro Obregón — curries, teishoku sets, and a calm room after a long day.",
      cuisine: "japanese",
      upvotes: 11,
      downvotes: 4,
      submittedAt: base(12, 19, 0),
    },
    {
      _id: `${WOL_DEMO_PREFIX}contramar-cafe`,
      month,
      name: "Café Nin",
      slug: "cafe-nin",
      submittedBy: "Bethany",
      description:
        "Bright corner for coffee and a croissant — the kind of place you run into half the neighborhood.",
      cuisine: "cafe",
      upvotes: 9,
      downvotes: 1,
      submittedAt: base(15, 8, 20),
    },
  ];
}

/**
 * In development, if Sanity has no approved rows for this month, inject demo
 * entries so the UI is usable without seeding. When Sanity has data (e.g. after
 * `npm run seed:wall-of-love`), only real documents are shown.
 */
export function mergeWallOfLoveDemoRows<T extends { _id: string }>(
  month: string,
  fromSanity: T[]
): T[] {
  if (process.env.NODE_ENV !== "development") return fromSanity;
  if (fromSanity.length > 0) return fromSanity;
  return getWallOfLoveDemoRestaurants(month) as unknown as T[];
}
